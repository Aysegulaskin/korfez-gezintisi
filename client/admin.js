const latitude =
document.getElementById("latitude");

const longitude =
document.getElementById("longitude");

const passwordInput =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");

const uploadArea =
document.getElementById("uploadArea");

const fileInput =
document.getElementById("fileInput");

const uploadBtn =
document.getElementById("uploadBtn");

const preview =
document.getElementById("preview");

const regionSelect =
document.getElementById("regionSelect");

const placeTitle =
document.getElementById("placeTitle");

const placeDescription =
document.getElementById("placeDescription");

let selectedFile = null;

const apiUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://korfez-backend.onrender.com";

const regionNames = {

    kucukkuyu: "Küçükkuyu",
    altinoluk: "Altınoluk",
    gure: "Güre",
    akcay: "Akçay",
    ayvalik: "Ayvalık",
    cunda: "Cunda Adası"

};

loginBtn.addEventListener("click", () => {

    if(passwordInput.value === "12345"){

        uploadArea.classList.remove("hidden");

    }else{

        alert("Şifre yanlış");

    }

});

fileInput.addEventListener("change", () => {

    selectedFile = fileInput.files[0];

    preview.src =
    URL.createObjectURL(selectedFile);

});

uploadBtn.addEventListener("click", async () => {

    if(!selectedFile){

        alert("Dosya seç");

        return;

    }

    const formData = new FormData();

    formData.append(
        "photo",
        selectedFile
    );

    formData.append(
        "region",
        regionNames[regionSelect.value]
    );

    formData.append(
        "title",
        placeTitle.value
    );

    formData.append(
        "description",
        placeDescription.value
    );

    formData.append(
        "lat",
        latitude.value
    );

    formData.append(
        "lng",
        longitude.value
    );

    const response = await fetch(`${apiUrl}/upload`, {

        method: "POST",

        body: formData

    });

    if (!response.ok) {

        const errorText = await response.text();

        console.error("Upload failed:", errorText);

        alert("Yükleme başarısız oldu. Lütfen tekrar deneyin.");

        return;

    }

    const data = await response.json();

    console.log(data);

    alert("Yer başarıyla eklendi 😄");

    selectedFile = null;

    preview.src = "";

    fileInput.value = "";

    placeTitle.value = "";

    placeDescription.value = "";

    latitude.value = "";

    longitude.value = "";

    regionSelect.value = "kucukkuyu";

});

const dropZone =
document.getElementById("dropZone");

dropZone.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropZone.classList.add("dragging");

});

dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("dragging");

});

dropZone.addEventListener("drop", (e) => {

    e.preventDefault();

    dropZone.classList.remove("dragging");

    selectedFile = e.dataTransfer.files[0];

    preview.src =
    URL.createObjectURL(selectedFile);

});