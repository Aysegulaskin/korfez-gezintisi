const express = require("express");

const cors = require("cors");

const { Pool } = require("pg");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const multer = require("multer");

const app = express();

app.use(cors());

app.use(express.json());

// POSTGRESQL BAĞLANTISI

   const pool = new Pool({
pool.query(`

CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(255) UNIQUE NOT NULL,

    password TEXT NOT NULL

)

`).then(() => {

    console.log("Users tablosu hazır 😄");

}).catch(err => {

    console.log(err);

});
    connectionString:
    "postgresql://korfez_db_user:2UYmsLZ03HOWHx8SZ7iCpMcTof0gbc6x@dpg-d7vcgjpj2pic73ec5pd0-a.oregon-postgres.render.com/korfez_db",

    ssl: {
        rejectUnauthorized: false
    }

});

    database:"korfez_db",

    password:"luna1234567",

    port:5432

});

// TEST

app.get("/", (req,res) => {

    res.send("Körfez Backend Çalışıyor 😄");

});

// KAYIT OL

app.post("/register", async (req,res) => {

    try{

        const { username, password } = req.body;

        const hashedPassword =
        await bcrypt.hash(password,10);

        const result = await pool.query(

            `
            INSERT INTO users(username,password)

            VALUES($1,$2)

            RETURNING *
            `,

            [username, hashedPassword]

        );

        res.json(result.rows[0]);

    }catch(err){

        console.log(err);

        res.status(500).json({

            error:"Kayıt başarısız"

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

// SERVER

app.listen(3000, () => {

    console.log("Server çalışıyor 😄");

});