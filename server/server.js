const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");

const cors = require("cors");

const { Pool } = require("pg");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const uploadPath = path.join(__dirname, "../client/uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../client/uploads")));

// POSTGRESQL BAĞLANTISI

const pool = new Pool({

    connectionString:
    "postgresql://korfez_db_user:2UYmsLZ03HOWHx8SZ7iCpMcTof0gbc6x@dpg-d7vcgjpj2pic73ec5pd0-a.oregon-postgres.render.com/korfez_db",

    ssl: {
        rejectUnauthorized: false
    }

});

pool.query(`

DROP TABLE IF EXISTS users;

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(255) UNIQUE NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password TEXT NOT NULL

)

`).then(() => {

    console.log("Users tablosu hazır 😄");

}).catch(err => {

    console.log(err);

});
// TEST

app.get("/", (req,res) => {

    res.send("Körfez Backend Çalışıyor 😄");

});

// KAYIT OL

app.post("/register", async (req,res) => {

    try{

        console.log("Register request body:", req.body);

        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ error: "Eksik kayıt verisi" });
        }

        const hashedPassword =
        await bcrypt.hash(password,10);

        const result = await pool.query(

            `
            INSERT INTO users(username,email,password)

            VALUES($1,$2,$3)

            RETURNING *
            `,

            [username, email, hashedPassword]

        );

        const token = jwt.sign(
            {
                id: result.rows[0].id
            },
            "korfez_secret"
        );

        res.json({
            token,
            username: result.rows[0].username
        });

    }catch(err){

        console.error("Register error:", err);

        if(err.code === "23505"){
            return res.status(400).json({
                error:"Kullanıcı adı veya e-posta zaten kayıtlı"
            });
        }

        res.status(500).json({

            error: err.message || "Kayıt başarısız"

        });

    }

});

// GİRİŞ YAP

app.post("/login", async (req,res) => {

    try{

        const { username, password } = req.body;

        const result = await pool.query(

            `
            SELECT * FROM users

            WHERE username=$1
            `,

            [username]

        );

        if(result.rows.length === 0){

            return res.status(400).json({

                error:"Kullanıcı bulunamadı"

            });

        }

        const user = result.rows[0];

        const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!validPassword){

            return res.status(400).json({

                error:"Şifre yanlış"

            });

        }

        const token = jwt.sign(

            {
                id:user.id
            },

            "korfez_secret"

        );

        res.json({

            token,
            username:user.username

        });

    }catch(err){

        console.log(err);

        res.status(500).json({

            error:"Giriş başarısız"

        });

    }

});

// ŞİFRE UNUTTUM

app.post("/forgot-password", async (req,res) => {

    try{

        const { email } = req.body;

        if(!email){
            return res.status(400).json({ error: "E-posta gerekli" });
        }

        const result = await pool.query(

            `
            SELECT * FROM users

            WHERE email=$1
            `,

            [email]

        );

        if(result.rows.length === 0){

            return res.status(400).json({

                error:"Bu e-posta ile kayıtlı kullanıcı bulunamadı"

            });

        }

        // Gerçekte burada email gönderme kodu olmalı
        // Şimdilik sadece başarı mesajı

        res.json({

            message: "Şifre sıfırlama bağlantısı gönderildi"

        });

    }catch(err){

        console.log(err);

        res.status(500).json({

            error:"Şifre sıfırlama başarısız"

        });

    }

});

// SERVER

app.listen(3000, () => {

    console.log("Server çalışıyor 😄");

});
app.post("/upload", upload.single("photo"), (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            error: "Dosya yüklenemedi"
        });

    }

    res.json({
        success: true,
        image: "/uploads/" + req.file.filename
    });

});