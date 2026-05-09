const map = L.map('map', {
    zoomControl: true,
    attributionControl: false
}).setView([39.50, 26.85], 10);

// KÖRFEZ SINIRI

const bounds = [
    [39.20, 26.45],
    [39.75, 27.20]
];

map.setMaxBounds(bounds);

// HARİTA

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    maxZoom:20
}).addTo(map);
// BÖLGE VERİLERİ

const regionData = {

    "Küçükkuyu": {

        konaklama: [
            "🏨 Palm Beach Hotel",
            "🏨 Glenn Hotel & Beach",
            "🏨 Gürel Garden House",
            "🏨 Sarissa Butik Otel"
        ],

        yemek: [
            "🍴 Alp Balık Evi",
            "🍴 Sahil Balıkçısı",
            "🍴 Ege cafe",
            "🍴 Laden kahvaltı ",
            "🍴 Zeytin Cafe"
        ],

        plaj: [
            "🌊 Mıhlı Plajı",
            "🌊 Küçükkuyu Sahili",
            "🌊 Adatepe Sahili"
        ],

        aktivite: [
            "🎣 Balık Tutma",
            "🥾 Kaz Dağları Yürüyüşü",
            "🚤 Tekne Turu"
        ]
    },

    "Altınoluk": {

        konaklama: [
            "🏨 Rawda Resort Hotel",
            "🏨 Altın Cesmeli Konak",
            "🏨 Platanus Hotel"
        ],

        yemek: [
            "🍴 Altınoluk Balık Evi",
            "🍴 Sahil Cafe",
            "🍴 Zeytin Restoran"
        ],

        plaj: [
            "🌊 Altınoluk Sahili",
            "🌊 Antandros Plajı"
        ],

        aktivite: [
            "🥾 Doğa Yürüyüşü",
            "🚤 Tekne Turu"
        ]
    },

    "Güre": {

        konaklama: [
            "🏨 Ramada Resort Kazdağları",
            "🏨 Güre Termal"
        ],

        yemek: [
            "🍴 Güre Köftecisi",
            "🍴 Kazdağı Sofrası"
        ],

        plaj: [
            "🌊 Güre Sahili"
        ],

        aktivite: [
            "♨️ Termal Spa",
            "🥾 Doğa Gezisi"
        ]
    },

    "Akçay": {

        konaklama: [
            "🏨 Akçayhan Hotel",
            "🏨 Set Aria Hotel"
        ],

        yemek: [
            "🍴 Akçay Sahil Cafe",
            "🍴 Deniz Restaurant"
        ],

        plaj: [
            "🌊 Akçay Plajı"
        ],

        aktivite: [
            "🚴 Bisiklet Turu",
            "🚤 Tekne Turu"
        ]
    },

    "Zeytinli": {

        konaklama: [
            "🏨 Zeytinli Pansiyon"
        ],

        yemek: [
            "🍴 Zeytinli Cafe"
        ],

        plaj: [
            "🌊 Zeytinli Sahili"
        ],

        aktivite: [
            "🎵 Festival Alanı"
        ]
    },

    "Edremit": {

        konaklama: [
            "🏨 L'opera Deluxe Hotel"
        ],

        yemek: [
            "🍴 Edremit Köftecisi"
        ],

        plaj: [
            "🌊 Edremit Sahili"
        ],

        aktivite: [
            "🏛 Tarihi Gezi"
        ]
    },

    "Burhaniye": {

        konaklama: [
            "🏨 Burhaniye Otel"
        ],

        yemek: [
            "🍴 İskele Balıkçısı"
        ],

        plaj: [
            "🌊 Ören Plajı"
        ],

        aktivite: [
            "🚴 Sahil Turu"
        ]
    },

    "Gömeç": {

        konaklama: [
            "🏨 Gömeç Pansiyon"
        ],

        yemek: [
            "🍴 Sahil Cafe"
        ],

        plaj: [
            "🌊 Gömeç Sahili"
        ],

        aktivite: [
            "🎣 Balıkçılık"
        ]
    },

    "Ayvalık": {

        konaklama: [
            "🏨 Bacacan Otel",
            "🏨 Orchis Hotel",
            "🏨 Ayvalık Sea Resort"
        ],

        yemek: [
            "🍴 Tik Mustafa",
            "🍴 Deniz Yıldızı Restaurant"
        ],

        plaj: [
            "🌊 Sarımsaklı",
            "🌊 Badavut"
        ],

        aktivite: [
            "🚤 Tekne Turu",
            "🌅 Gün Batımı"
        ]
    },

    "Cunda Adası": {

        konaklama: [
            "🏨 Cunda Labris Hotel",
            "🏨 Mai Pension"
        ],

        yemek: [
            "🍴 Cunda Balıkçısı",
            "🍴 Taş Kahve"
        ],

        plaj: [
            "🌊 Patriça Koyu"
        ],

        aktivite: [
            "🏛 Taş Sokak Gezisi"
        ]
    }

};

// YERLER

const locations = document.querySelectorAll(".location-item");

// MARKERLAR

// ÖZEL MARKER

const customIcon = L.icon({

    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/684/684908.png',

    iconSize:[38,38],

    iconAnchor:[19,38],

    popupAnchor:[0,-38]

});

// MARKERLAR

locations.forEach(location => {

    const lat = location.dataset.lat;

    const lng = location.dataset.lng;

    const name = location.dataset.name;

    L.marker([lat,lng], {

        icon:customIcon

    })

    .addTo(map)

    .bindPopup(`

        <b style="font-size:18px;">
            ${name}
        </b>

    `);
});

// CARD

const infoCard = document.getElementById("infoCard");

const cardTitle = document.getElementById("cardTitle");

const cardImage = document.getElementById("cardImage");

const cardText = document.getElementById("cardText");

const closeCard = document.getElementById("closeCard");

const tabButtons = document.querySelectorAll(".tab-btn");

const tabContent = document.getElementById("tabContent");

let currentRegion = "Küçükkuyu";

// TAB İÇERİĞİ

function renderTab(tab){

    const data = regionData[currentRegion][tab];

    let html = "<ul>";

    data.forEach(item => {
        html += `<li>${item}</li>`;
    });

    html += "</ul>";

    tabContent.innerHTML = html;
}

// TIKLAMA

locations.forEach(location => {

    location.addEventListener("click", () => {

        const lat = location.dataset.lat;
        const lng = location.dataset.lng;

        const name = location.dataset.name;

        const image = location.dataset.image;

        const description = location.dataset.description;

        currentRegion = name;

        map.flyTo([lat,lng], 12, {
            duration:1.8
        });

        cardTitle.innerText = name;

        cardImage.src = image;

        cardText.innerText = description;

        infoCard.classList.remove("hidden");

        renderTab("konaklama");

    });

});

// TABLAR

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const tab = button.dataset.tab;

        renderTab(tab);

    });

});

// KAPAT

closeCard.addEventListener("click", () => {

    infoCard.classList.add("hidden");

});
const themeToggle = document.getElementById("themeToggle");

let darkMode = false;

themeToggle.addEventListener("click", () => {

    darkMode = !darkMode;

    const mapDiv = document.getElementById("map");

    if(darkMode){

        mapDiv.classList.remove("light-map");
        mapDiv.classList.add("dark-map");

        themeToggle.innerText = "🌙 Gece Modu Aktif";
    }else{

        mapDiv.classList.remove("dark-map");
        mapDiv.classList.add("light-map");

        themeToggle.innerText = "☀️ Gündüz Modu Aktif";    }

});
// FAVORİLER

// FAVORİLER

const favoriteBtn =
document.getElementById("favoriteBtn");

const favoritesList =
document.getElementById("favoritesList");

const openFavorites =
document.getElementById("openFavorites");

const favoritesPanel =
document.getElementById("favoritesPanel");

// FAVORİLERİ GÖSTER

function renderFavorites(){

    const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesList.innerHTML = "";

    favorites.forEach(fav => {

        favoritesList.innerHTML += `

            <li>
                ❤️ ${fav}
            </li>

        `;

    });

}

// FAVORİ EKLE

favoriteBtn.addEventListener("click", () => {

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(currentRegion)){

        favorites.push(currentRegion);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        renderFavorites();

        favoriteBtn.innerText =
        "❤️ Favorilere Eklendi";

    }

});

// FAVORİ PANELİ

openFavorites.addEventListener("click", () => {

    favoritesPanel.classList.toggle("hidden");

});

// SAYFA AÇILINCA FAVORİLERİ YÜKLE

renderFavorites();
const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


    if(!musicPlaying){

        bgMusic.play();

        musicBtn.innerText = "⏸ Müziği Durdur";

    }else{

        bgMusic.pause();

        musicBtn.innerText = "🎵 Müzik";
    }

    musicPlaying = !musicPlaying;

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();
s
    locations.forEach(location => {

        const name = location.dataset.name.toLowerCase();

        if(name.includes(value)){
            location.style.display = "block";
        }else{
            location.style.display = "none";
        }

    });

});
// FAVORİ PANELİ

openFavorites.addEventListener("click", () => {

    favoritesPanel.classList.toggle("hidden");

});
// MÜZİK

if(musicBtn){

    musicBtn.addEventListener("click", () => {

        if(!musicPlaying){

            bgMusic.play();

            musicBtn.innerText =
            "⏸ Müziği Durdur";

        }else{

            bgMusic.pause();

            musicBtn.innerText =
            "🎵 Müzik";
        }

        musicPlaying = !musicPlaying;

    });

}

// AUTH


const loginOpenBtn =
document.getElementById("loginOpenBtn");

const registerOpenBtn =
document.getElementById("registerOpenBtn");

const loginModal =
document.getElementById("loginModal");

const registerModal =
document.getElementById("registerModal");

const loginBtn =
document.getElementById("loginBtn");

const registerBtn =
document.getElementById("registerBtn");

// MODAL AÇ

loginOpenBtn.addEventListener("click", () => {

    loginModal.classList.remove("hidden");

});

registerOpenBtn.addEventListener("click", () => {

    registerModal.classList.remove("hidden");

});

// MODAL KAPAT

loginModal.addEventListener("click", (e) => {

    if(e.target === loginModal){

        loginModal.classList.add("hidden");

    }

});

registerModal.addEventListener("click", (e) => {

    if(e.target === registerModal){

        registerModal.classList.add("hidden");

    }

});

// REGISTER

registerBtn.addEventListener("click", async () => {

    const username =
    document.getElementById("registerUsername").value;

    const password =
    document.getElementById("registerPassword").value;

    const response = await fetch(

        "http://localhost:3000/register",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username,
                password

            })

        }

    );

    const data = await response.json();

    alert("Kayıt başarılı 😄");

});

// LOGIN

loginBtn.addEventListener("click", async () => {

    const username =
    document.getElementById("loginUsername").value;

    const password =
    document.getElementById("loginPassword").value;

    const response = await fetch(

        "http://localhost:3000/login",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username,
                password

            })

        }

    );

    const data = await response.json();

    localStorage.setItem(
        "token",
        data.token
    );

    localStorage.setItem(
        "username",
        data.username
    );

    alert("Giriş başarılı 😄");

});
console.log("SCRIPT ÇALIŞTI 😄");