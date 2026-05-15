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

    formData.append("photo", selectedFile);

    const response =
    await fetch("http://localhost:3000/upload", {

        method:"POST",

        body:formData

    });

    const data =
    await response.json();

    console.log(data);

    alert("Fotoğraf yüklendi 😄");

});