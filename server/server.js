const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../client/uploads")
    )
);

const storage = multer.diskStorage({

    destination: function(req, file, cb){

        const uploadPath =
        path.join(
            __dirname,
            "../client/uploads"
        );

        if(!fs.existsSync(uploadPath)){

            fs.mkdirSync(
                uploadPath,
                { recursive:true }
            );

        }

        cb(null, uploadPath);

    },

    filename: function(req, file, cb){

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const upload = multer({ storage });

app.get("/", (req, res) => {

    res.send("Körfez Backend 😄");

});

app.post(
    "/upload",
    upload.single("photo"),
    (req, res) => {

        if (!req.file) {
            return res.status(400).json({ error: "Fotoğraf gerekli" });
        }

        const { region, title, description, lat, lng } = req.body;

        if (!region || !title || !description) {
            return res.status(400).json({ error: "Bölge, başlık ve açıklama gerekli" });
        }

        const placesPath =
        path.join(
            __dirname,
            "data",
            "places.json"
        );

        if(!fs.existsSync(placesPath)){

            fs.mkdirSync(
                path.dirname(placesPath),
                { recursive:true }
            );

            fs.writeFileSync(
                placesPath,
                "[]"
            );

        }

        const places =
        JSON.parse(
            fs.readFileSync(
                placesPath,
                "utf8"
            )
        );

        const rawRegion = req.body.region || "";
        const normalizedRegion = rawRegion
            .toLowerCase()
            .replace(/ı/g, "i")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ğ/g, "g")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c")
            .replace(/\s+/g, "");

        const newPlace = {

            region: normalizedRegion,

            title:req.body.title,

            description:req.body.description,

            image:req.file.filename,

            lat:req.body.lat,

            lng:req.body.lng,

            static: false

        };

        places.push(newPlace);

        fs.writeFileSync(
            placesPath,
            JSON.stringify(
                places,
                null,
                2
            )
        );

        res.json({
            success:true,
            place:newPlace
        });

    }
);

app.get("/places", (req, res) => {

    const placesPath =
    path.join(
        __dirname,
        "data",
        "places.json"
    );

    if(!fs.existsSync(placesPath)){

        return res.json([]);

    }

    const places =
    JSON.parse(
        fs.readFileSync(
            placesPath,
            "utf8"
        )
    );

    res.json(places);

});

app.listen(3000, () => {

    console.log("SERVER AKTİF 😄");

});

setInterval(() => {}, 1000);