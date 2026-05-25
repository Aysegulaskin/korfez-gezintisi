require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

const app = express();

// ─── PostgreSQL Bağlantısı ───────────────────────────────────────────────────

// Render'da DATABASE_URL, lokalde ayrı değişkenler
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    : new Pool({
        host:     process.env.DB_HOST     || "localhost",
        port:     parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME     || "korfez_db",
        user:     process.env.DB_USER     || "postgres",
        password: process.env.DB_PASSWORD || "korfez123",
    });

// Tabloyu oluştur (yoksa)
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS places (
                id          SERIAL PRIMARY KEY,
                region      VARCHAR(100) NOT NULL,
                title       VARCHAR(255) NOT NULL,
                description TEXT,
                image       VARCHAR(255),
                lat         NUMERIC(10, 7),
                lng         NUMERIC(10, 7),
                static      BOOLEAN DEFAULT false,
                created_at  TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("✅ Veritabanı tablosu hazır");

        // places.json varsa ve tablo boşsa, verileri aktar
        const result = await pool.query("SELECT COUNT(*) FROM places");
        const count = parseInt(result.rows[0].count);

        if (count === 0) {
            const placesPath = path.join(__dirname, "data", "places.json");
            if (fs.existsSync(placesPath)) {
                const places = JSON.parse(fs.readFileSync(placesPath, "utf8"));
                for (const p of places) {
                    await pool.query(
                        `INSERT INTO places (region, title, description, image, lat, lng, static)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            p.region,
                            p.title,
                            p.description,
                            p.image,
                            p.lat ? parseFloat(p.lat) : null,
                            p.lng ? parseFloat(p.lng) : null,
                            p.static === true
                        ]
                    );
                }
                console.log(`✅ ${places.length} yer places.json'dan aktarıldı`);
            }
        } else {
            console.log(`ℹ️  Veritabanında ${count} yer mevcut`);
        }
    } catch (err) {
        console.error("❌ Veritabanı başlatma hatası:", err.message);
        console.error("   .env dosyasındaki DB_PASSWORD değerini kontrol edin.");
    }
}

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// Statik dosyalar - 7 günlük cache ile
const staticOptions = {
    maxAge: "7d",
    etag: true,
    lastModified: true
};
// Uploads klasörü: Render'da /opt/render/project/uploads, lokalde client/uploads
const UPLOADS_DIR = process.env.UPLOADS_DIR
    || path.join(__dirname, "../client/uploads");

app.use("/images",  express.static(path.join(__dirname, "../images"),  staticOptions));
app.use("/uploads", express.static(UPLOADS_DIR, staticOptions));

// index.html ve diğer frontend dosyalarını da sun
app.use(express.static(path.join(__dirname, ".."), staticOptions));

// ─── Multer (Fotoğraf Yükleme) ───────────────────────────────────────────────

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// Tüm yerleri getir
app.get("/places", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM places ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("GET /places hatası:", err.message);
        res.status(500).json({ error: "Veriler alınamadı" });
    }
});

// Bölgeye göre yerleri getir
app.get("/places/:region", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM places WHERE region = $1 ORDER BY id ASC",
            [req.params.region]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("GET /places/:region hatası:", err.message);
        res.status(500).json({ error: "Veriler alınamadı" });
    }
});

// Yeni yer ekle (fotoğraf yükleme ile)
app.post("/upload", upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Fotoğraf gerekli" });
        }

        const { title, description, lat, lng } = req.body;
        const rawRegion = req.body.region || "";

        if (!rawRegion || !title || !description) {
            return res.status(400).json({ error: "Bölge, başlık ve açıklama gerekli" });
        }

        // Bölge adını normalize et
        const normalizedRegion = rawRegion
            .toLowerCase()
            .replace(/ı/g, "i")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ğ/g, "g")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/\s+/g, "");

        const result = await pool.query(
            `INSERT INTO places (region, title, description, image, lat, lng, static)
             VALUES ($1, $2, $3, $4, $5, $6, false)
             RETURNING *`,
            [
                normalizedRegion,
                title,
                description,
                req.file.filename,
                lat ? parseFloat(lat) : null,
                lng ? parseFloat(lng) : null
            ]
        );

        res.json({ success: true, place: result.rows[0] });

    } catch (err) {
        console.error("POST /upload hatası:", err.message);
        res.status(500).json({ error: "Yükleme başarısız" });
    }
});

// Yer sil
app.delete("/places/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM places WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Yer bulunamadı" });
        }
        res.json({ success: true, deleted: result.rows[0] });
    } catch (err) {
        console.error("DELETE /places/:id hatası:", err.message);
        res.status(500).json({ error: "Silme başarısız" });
    }
});

// Yer güncelle
app.put("/places/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, lat, lng, region } = req.body;

        const result = await pool.query(
            `UPDATE places
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 lat = COALESCE($3, lat),
                 lng = COALESCE($4, lng),
                 region = COALESCE($5, region)
             WHERE id = $6
             RETURNING *`,
            [title, description, lat, lng, region, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Yer bulunamadı" });
        }

        res.json({ success: true, place: result.rows[0] });
    } catch (err) {
        console.error("PUT /places/:id hatası:", err.message);
        res.status(500).json({ error: "Güncelleme başarısız" });
    }
});

// ─── Sunucuyu Başlat ─────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`🚀 Sunucu port ${PORT}'de çalışıyor`);
    await initDB();
});
