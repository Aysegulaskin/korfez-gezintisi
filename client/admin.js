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
        regionSelect.value
    );

    formData.append(
        "title",
        placeTitle.value
    );

    formData.append(
        "description",
        placeDescription.value
    );

    const response =
    console.log(formData);
    await fetch("http://localhost:3000/upload", {

        method:"POST",

        body:formData

    });

    const data =
    await response.json();

    console.log(data);

    alert("Yer başarıyla eklendi 😄");

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