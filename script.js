const map = L.map('map', {
    zoomControl: true,
    attributionControl: false
}).setView([39.50, 26.85], 10);

const bounds = [
    [39.20, 26.45],
    [39.75, 27.20]
];

map.setMaxBounds(bounds);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    maxZoom:20
}).addTo(map);

const regionData = {

    "Küçükkuyu": {
        konaklama:[
            "🏨 Palm Beach Hotel",
            "🏨 Glenn Hotel & Beach",
            "🏨 Gürel Garden House"
        ],
                yemek:[
            "🍴 Alp Balık Evi",
            "🍴 Ege Cafe"
        ],
        plaj:[
            "🌊 Mıhlı Plajı",
            "🌊 Küçükkuyu Sahili"
        ],
        aktivite:[
            "🥾 Kaz Dağları Yürüyüşü",
            "🚤 Tekne Turu",
            "🏛️ Zeus Altarı (Adatepe)",
            "🏘️ Adatepe Köyü",
            "🏘️ Yeşilyurt Köyü",
            "🌊 Mıhlı Şelalesi (Başdeğirmen)",
            "🏛️ Adatepe Zeytinyağı Müzesi",
            "🏛️ Assos (Behramkale)",
            "🌊 Kadırga Koyu",
            "🏔️ Şahindere Kanyonu",
            "⚓ Küçükkuyu Limanı ve Mübadele Anıtı",
            "♨️ Afrodit Kaplıcaları"
        ]
    },

    "Altınoluk": {
        konaklama:["🏨 Rawda Resort Hotel"],
        yemek:["🍴 Sahil Cafe"],
        plaj:["🌊 Altınoluk Sahili"],
        aktivite:["🚤 Tekne Turu"]
    },

    "Güre": {
        konaklama:["🏨 Güre Termal"],
                yemek:["🍴 Kazdağı Sofrası"],
        plaj:["🌊 Güre Sahili"],
        aktivite:["♨️ Termal Spa"]
    },

    "Akçay": {
        konaklama:["🏨 Akçayhan Hotel"],
        yemek:["🍴 Deniz Restaurant"],
        plaj:["🌊 Akçay Plajı"],
        aktivite:["🚴 Bisiklet Turu"]
    },

    "Ayvalık": {
        konaklama:["🏨 Bacacan Otel"],
        yemek:["🍴 Tik Mustafa"],
        plaj:["🌊 Sarımsaklı"],
        aktivite:["🌅 Gün Batımı"]
    },

    "Cunda Adası": {
        konaklama:["🏨 Cunda Labris Hotel"],
        yemek:["🍴 Taş Kahve"],
        plaj:["🌊 Patriça Koyu"],
        aktivite:["🏛 Taş Sokak Gezisi"]
    }

};
const locations = document.querySelectorAll(".location-item");

const customIcon = L.icon({

    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/684/684908.png',

    iconSize:[38,38],

    iconAnchor:[19,38],

    popupAnchor:[0,-38]

});

locations.forEach(location => {

    const lat = location.dataset.lat;
       const lng = location.dataset.lng;
    const name = location.dataset.name;

    L.marker([lat,lng], {
        icon:customIcon
    })
    .addTo(map)
    .bindPopup(`<b>${name}</b>`);

});

const infoCard = document.getElementById("infoCard");
const cardTitle = document.getElementById("cardTitle");
const cardImage = document.getElementById("cardImage");
const cardText = document.getElementById("cardText");
const closeCard = document.getElementById("closeCard");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContent = document.getElementById("tabContent");

let currentRegion = "Küçükkuyu";

function renderTab(tab){

    const data = regionData[currentRegion]?.[tab] || [];

    let html = "<ul>";

    data.forEach(item => {
     html += `<li>${item}</li>`;
    });

    html += "</ul>";

    tabContent.innerHTML = html;
}

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
        favoriteBtn.innerText =
"❤️ Favorilere Ekle";

        const kucukkuyuSection =
        document.getElementById("kucukkuyuSection");

        if(kucukkuyuSection){
            if(name === "Küçükkuyu"){
                kucukkuyuSection.classList.remove("hidden");
            } else {
                kucukkuyuSection.classList.add("hidden");
            }
        }

    });

});

if(closeCard){

    closeCard.addEventListener("click", () => {
        infoCard.classList.add("hidden");
    });

}

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

const themeToggle = document.getElementById("themeToggle");

let darkMode = false;

if(themeToggle){

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

            themeToggle.innerText = "☀️ Gündüz Modu Aktif";
        }

    });

}

const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");
const openFavorites = document.getElementById("openFavorites");
const favoritesPanel = document.getElementById("favoritesPanel");

function renderFavorites(){

    const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesList.innerHTML = "";

    favorites.forEach(fav => {
        favoritesList.innerHTML += `
            <li>❤️ ${fav}</li>
        `;

    });

}

if(favoriteBtn){

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

}

if(openFavorites){

    openFavorites.addEventListener("click", () => {

       if(favoritesPanel){

    favoritesPanel.classList.toggle("hidden");

}

    });

}

renderFavorites();

const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        locations.forEach(location => {

            const name =
            location.dataset.name.toLowerCase();

            if(name.includes(value)){
                location.style.display = "block";
            }else{
                location.style.display = "none";
            }

        });

    });

}

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

const authLoginCard =
document.getElementById("authLoginCard");

const authRegisterCard =
document.getElementById("authRegisterCard");

const apiUrl = "http://localhost:3000";

async function handleRegister(username, email, password){
    if(!username || !email || !password){
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    try{
        const response = await fetch(
            `${apiUrl}/register`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if(!response.ok){
            alert(data.error || "Kayıt başarısız 😢");
            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        setLoggedIn(data.username || username);
        if(registerModal){
            registerModal.classList.add("hidden");
        }

        alert("Kayıt başarılı 😄");

    }catch(err){
        console.log(err);
        alert("Kayıt başarısız 😢\n" + (err.message || "Sunucuya bağlanılamıyor."));
    }
}

async function handleLogin(username, password){
    if(!username || !password){
        alert("Lütfen kullanıcı adı ve şifre girin.");
        return;
    }

    try{
        const response = await fetch(
            `${apiUrl}/login`,
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

        if(!response.ok){
            alert(data.error || "Giriş başarısız 😢");
            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        const usernameToUse = data.username || username;
        setLoggedIn(usernameToUse);
        if(loginModal){
            loginModal.classList.add("hidden");
        }

        alert("Giriş başarılı 😄");

    }catch(err){
        console.log(err);
        alert("Giriş başarısız 😢\n" + (err.message || "Sunucuya bağlanılamıyor."));
    }
}

function normalizeUsername(username){
    const normalized = typeof username === "string" ? username.trim() : "";
    return normalized && normalized.toLowerCase() !== "undefined" ? normalized : "";
}

function setLoggedIn(username){
    const safeUsername = normalizeUsername(username) || "Kullanıcı";

    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("username", safeUsername);

    if(loginOpenBtn){
        loginOpenBtn.style.display = "none";
    }

    if(registerOpenBtn){
        registerOpenBtn.style.display = "none";
    }

    const oldUser =
    document.querySelector(".user-box");

    if(!oldUser){

        const userDiv = document.createElement("div");

userDiv.className = "user-box";

userDiv.innerHTML = `

    👤 ${data.username}

    <button id="logoutBtn">
        Çıkış Yap
    </button>

`;

document.body.appendChild(userDiv);

}

if(loginOpenBtn){

    loginOpenBtn.addEventListener("click", () => {
        if(loginModal){

    loginModal.classList.remove("hidden");

}
    });

}

if(registerOpenBtn){

    registerOpenBtn.addEventListener("click", () => {
        if(registerModal){

    registerModal.classList.remove("hidden");

}
        
    });

}

if(loginModal){

    loginModal.addEventListener("click", (e) => {

        if(e.target === loginModal){
            loginModal.classList.add("hidden");
        }

    });

}

if(registerModal){

    registerModal.addEventListener("click", (e) => {

        if(e.target === registerModal){
            registerModal.classList.add("hidden");
        }

    });
    }

if(registerBtn){

    registerBtn.addEventListener("click", async () => {

        const username =
        document.getElementById("registerUsername").value;

        const email =
        document.getElementById("registerEmail").value;

        const password =
        document.getElementById("registerPassword").value;

        await handleRegister(username, email, password);

    });

}

if(authRegisterCard){

    authRegisterCard.addEventListener("click", () => {
        if(registerModal){
            registerModal.classList.remove("hidden");
        }
    });

}

if(loginBtn){

    loginBtn.addEventListener("click", async () => {

        const username =
        document.getElementById("loginUsername").value;

        const password =
        document.getElementById("loginPassword").value;

        await handleLogin(username, password);

    });

}

if(authLoginCard){

    authLoginCard.addEventListener("click", () => {
        if(loginModal){
            loginModal.classList.remove("hidden");
        }
    });

}

console.log("SCRIPT ÇALIŞTI 😄");
window.addEventListener("load", () => {

    const isLoggedIn =
    localStorage.getItem("isLoggedIn");

    const username =
    normalizeUsername(localStorage.getItem("username"));

    if(!username){
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
    }
    if(isLoggedIn === "true" && username){

        if(loginOpenBtn){
            loginOpenBtn.style.display = "none";
        }

        if(registerOpenBtn){
            registerOpenBtn.style.display = "none";
        }

        const oldUser =
        document.querySelector(".user-box");

        if(!oldUser){

            const userDiv =
            document.createElement("div");

            userDiv.className = "user-box";

            userDiv.innerText =
            "👤 " + username;

            document.body.appendChild(userDiv);

        }

    }

});
document.addEventListener("click", (e) => {

    if(e.target.id === "logoutBtn"){

        localStorage.removeItem("token");

        localStorage.removeItem("username");

        localStorage.removeItem("isLoggedIn");

        location.reload();

    }

});