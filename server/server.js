require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

const app = express();

// ─── PostgreSQL Bağlantısı ───────────────────────────────────────────────────

const pool = process.env.DATABASE_URL
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
    : new Pool({
        host:     process.env.DB_HOST     || "localhost",
        port:     parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME     || "korfez_db",
        user:     process.env.DB_USER     || "postgres",
        password: process.env.DB_PASSWORD || "luna1234567",
    });

// ─── Veritabanı Başlat ───────────────────────────────────────────────────────

async function initDB() {
    try {
        // image_data: resim binary, image_mime: image/jpeg gibi
        await pool.query(`
            CREATE TABLE IF NOT EXISTS places (
                id          SERIAL PRIMARY KEY,
                region      VARCHAR(100) NOT NULL,
                title       VARCHAR(255) NOT NULL,
                description TEXT,
                image       VARCHAR(255),
                image_data  BYTEA,
                image_mime  VARCHAR(50),
                lat         NUMERIC(10, 7),
                lng         NUMERIC(10, 7),
                static      BOOLEAN DEFAULT false,
                created_at  TIMESTAMP DEFAULT NOW()
            );
        `);

        // Eski tabloda image_data yoksa ekle
        await pool.query(`
            ALTER TABLE places ADD COLUMN IF NOT EXISTS image_data BYTEA;
            ALTER TABLE places ADD COLUMN IF NOT EXISTS image_mime VARCHAR(50);
        `);

        const result = await pool.query("SELECT COUNT(*) FROM places");
        console.log(`✅ Veritabanı hazır — ${result.rows[0].count} yer mevcut`);
    } catch (err) {
        console.error("❌ DB hatası:", err.message);
    }
}

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Statik dosyalar
const staticOptions = { maxAge: "7d", etag: true };
app.use("/images", express.static(path.join(__dirname, "../images"), staticOptions));
app.use(express.static(path.join(__dirname, ".."), staticOptions));

// ─── Multer — memory storage (diske yazmıyor) ────────────────────────────────

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/admin.html"));
});

// Tüm yerleri getir (image_data hariç — büyük olduğu için)
app.get("/places", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, region, title, description, image, image_mime, lat, lng, static, created_at FROM places ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("GET /places hatası:", err.message);
        res.status(500).json({ error: "Veriler alınamadı" });
    }
});

// Bölgeye göre yerleri getir
app.get("/places/region/:region", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, region, title, description, image, image_mime, lat, lng, static, created_at FROM places WHERE region = $1 ORDER BY id ASC",
            [req.params.region]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Veriler alınamadı" });
    }
});

// Resmi getir — DB'den binary olarak sun
app.get("/photo/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT image_data, image_mime FROM places WHERE id = $1",
            [req.params.id]
        );
        if (!result.rows[0] || !result.rows[0].image_data) {
            return res.status(404).send("Resim bulunamadı");
        }
        const mime = result.rows[0].image_mime || "image/jpeg";
        res.set("Content-Type", mime);
        res.set("Cache-Control", "public, max-age=604800");
        res.send(result.rows[0].image_data);
    } catch (err) {
        res.status(500).send("Resim alınamadı");
    }
});

// Yeni yer ekle
app.post("/upload", upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "Fotoğraf gerekli" });

        const { title, description, lat, lng } = req.body;
        const rawRegion = req.body.region || "";

        if (!rawRegion || !title || !description) {
            return res.status(400).json({ error: "Bölge, başlık ve açıklama gerekli" });
        }

        const normalizedRegion = rawRegion.toLowerCase().replace(/\s+/g, "");

        const result = await pool.query(
            `INSERT INTO places (region, title, description, image, image_data, image_mime, lat, lng, static)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)
             RETURNING id, region, title, description, image, image_mime, lat, lng, static, created_at`,
            [
                normalizedRegion,
                title,
                description,
                req.file.originalname,
                req.file.buffer,        // Binary veri DB'ye
                req.file.mimetype,
                lat ? parseFloat(lat) : null,
                lng ? parseFloat(lng) : null
            ]
        );

        console.log(`✅ Yer eklendi: ${title} (${normalizedRegion}), id=${result.rows[0].id}`);
        res.json({ success: true, place: result.rows[0] });

    } catch (err) {
        console.error("POST /upload hatası:", err.message);
        res.status(500).json({ error: "Yükleme başarısız: " + err.message });
    }
});

// Yer sil
app.delete("/places/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM places WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: "Yer bulunamadı" });
        res.json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Silme başarısız" });
    }
});

// Yer güncelle
app.put("/places/:id", async (req, res) => {
    try {
        const { title, description, lat, lng, region } = req.body;
        const result = await pool.query(
            `UPDATE places SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                lat = COALESCE($3, lat),
                lng = COALESCE($4, lng),
                region = COALESCE($5, region)
             WHERE id = $6 RETURNING *`,
            [title, description, lat, lng, region, req.params.id]
        );
        if (result.rowCount === 0) return res.status(404).json({ error: "Yer bulunamadı" });
        res.json({ success: true, place: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Güncelleme başarısız" });
    }
});

// ─── Sunucuyu Başlat ─────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5004;
app.listen(PORT, async () => {
    console.log(`🚀 Sunucu port ${PORT}'de çalışıyor`);
    await initDB();
});
