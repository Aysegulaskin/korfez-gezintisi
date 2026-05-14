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

const travelCards = {
    "Küçükkuyu": [
        {
            title: "Zeus Altarı",
            image: "/images/zeus-altari.jpg",
            description: "Edremit Körfezi manzarasına sahip efsanevi bir nokta. Gün batımında eşsiz görüntüler sunar."
        },
        {
            title: "Adatepe Köyü",
            image: "/images/adatepe-koyu.jpg",
            description: "Taş evleri ve huzurlu sokaklarıyla bölgenin en güzel köylerinden biri."
        },
        {
            title: "Mıhlı Şelalesi",
            image: "/images/mihli-selalesi.jpg",
            description: "Kaz Dağları'nın serin doğasında bulunan büyüleyici bir şelale."
        },
        {
            title: "Assos",
            image: "/images/assos.jpg",
            description: "Antik limanı, taş sokakları ve Athena Tapınağı ile ünlü tarihi bölge."
        },
        {
            title: "Kadırga Koyu",
            image: "/images/kadirga-koyu.jpg",
            description: "Turkuaz denizi ve sakin atmosferiyle bölgenin en sevilen koylarından biri."
        },
        {
            title: "Kaz Dağları",
            image: "/images/kaz-daglari.jpg",
            description: "Temiz havası ve yemyeşil doğasıyla doğa severlerin vazgeçilmez noktası."
        }
    ],
    "Altınoluk": [
        {
            title: "Şahinderesi Kanyonu",
            image: "/images/sahinderesi-kanyonu.jpg",
            description: "Kaz Dağları'nın en etkileyici doğal alanlarından biri."
        },
        {
            title: "Antandros Antik Kenti",
            image: "/images/antandros-antik-kenti.jpg",
            description: "Tarihi mozaikleri ve antik kalıntılarıyla öne çıkan bir kültür noktası."
        },
        {
            title: "Altınoluk Sahili",
            image: "/images/altinoluk-sahili.jpg",
            description: "Gün batımı ve sahil yürüyüşleriyle ünlü Altınoluk'un en sevilen sahili."
        }
    ],
    "Güre": [
        {
            title: "Hasan Boğuldu Kaynağı",
            image: "/images/hasan-boguldu.jpg",
            description: "Güre'nin doğal güzelliği içinde etrafı çam ağaçlarıyla çevrili huzurlu bir kaynak."
        },
        {
            title: "Sütüven Şelalesi",
            image: "/images/sütüven-selalesi.jpg",
            description: "Fotoğraf tutkunları için muhteşem doğal bir şelale ve kısa yürüyüş rotası."
        },
        {
            title: "Güre Sahili",
            image: "/images/kucukkuyu-sahili.jpg",
            description: "Termal tatil sonrasında deniz kenarında dinlenebileceğiniz geniş bir sahil alanı."
        }
    ],
    "Ayvalık": [
        {
            title: "Cunda Adası Sokakları",
            image: "/images/assos2.jpg",
            description: "Taş evleri ve Ege manzaralı sokaklarıyla Cunda'da tarihi bir yürüyüş rotası."
        },
        {
            title: "Sarımsaklı Plajı",
            image: "/images/kucukkuyu-sahili3.jpg",
            description: "Uzun kumsalı ve sığ deniziyle Ayvalık'ın en popüler sahil alanlarından biri."
        },
        {
            title: "Ayvalık Çarşısı",
            image: "/images/assos3.jpg",
            description: "Zeytinyağı, deniz ürünleri ve el yapımı hediyeliklerle dolu sokak pazarı keyfi."
        }
    ],
    "Cunda Adası": [
        {
            title: "Taş Sokaklar",
            image: "/images/assos2.jpg",
            description: "Cunda’nın tarihi taş sokaklarında keyifli bir yürüyüş yapabilirsiniz."
        },
        {
            title: "Ada Manzarası",
            image: "/images/assos3.jpg",
            description: "Deniz kenarından adanın en güzel panoramik fotoğraflarını çekebileceğiniz bir nokta."
        },
        {
            title: "Sahil Yürüyüşü",
            image: "/images/kucukkuyu-sahili3.jpg",
            description: "Cunda sahilinde gün batımına doğru uzun bir yürüyüş rotası."
        },
        {
            title: "Rüzgar Değirmeni",
            image: "/images/kaz-daglari2.jpg",
            description: "Ege denizine bakan tarihi bir değirmenle adanın rüzgar dolu atmosferini keşfedin."
        }
    ],
    "Akçay": [
        {
            title: "Akçay Kordonu",
            image: "/images/kucukkuyu-sahili2.jpg",
            description: "Sahil boyunca yürüyüş ve bisiklet için ideal, akşam serinliğinde güzel bir gezinti yolu."
        },
        {
            title: "Akçay Seyir Terası",
            image: "/images/kaz-daglari2.jpg",
            description: "Körfez ve Kazdağları manzarasını sunan yemyeşil bir seyir noktası."
        }
    ]
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
const travelSection = document.getElementById("travelSection");
const travelTitle = document.getElementById("travelTitle");
const travelGrid = document.getElementById("travelGrid");

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

function renderTravelSection(region){
    const cards = travelCards[region] || [];

    if(!travelSection || !travelTitle || !travelGrid){
        return;
    }

    if(cards.length === 0){
        travelSection.classList.add("hidden");
        return;
    }

    const titleSuffix = region === "Altınoluk" ? "ta" : region === "Güre" ? "de" : "da";
    travelTitle.innerText = `🌅 ${region}'${titleSuffix} Gezilecek Yerler`;
    travelGrid.innerHTML = cards.map(card => `
        <div class="travel-card">
            <img src="${card.image}" alt="${card.title}">
            <div class="travel-content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
            </div>
        </div>
    `).join("");

    travelSection.classList.remove("hidden");
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

        renderTravelSection(name);
        renderTab("konaklama");
        infoCard.classList.remove("hidden");

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

const apiUrl = window.location.protocol === "file:"
    ? "http://localhost:3000"
    : (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ? "http://localhost:3000"
        : window.location.origin;

function getLocalAuthUsers(){
    return JSON.parse(localStorage.getItem("authUsers") || "[]");
}

function saveLocalAuthUsers(users){
    localStorage.setItem("authUsers", JSON.stringify(users));
}

function findLocalUserByUsername(username){
    return getLocalAuthUsers().find(user => user.username.toLowerCase() === username.toLowerCase());
}

function findLocalUserByEmail(email){
    return getLocalAuthUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}

function registerLocalUser(username, email, password){
    const users = getLocalAuthUsers();

    if(findLocalUserByUsername(username)){
        return { success:false, error:"Bu kullanıcı adı zaten kullanılıyor." };
    }

    if(findLocalUserByEmail(email)){
        return { success:false, error:"Bu e-posta zaten kayıtlı." };
    }

    users.push({
        username,
        email,
        password:btoa(password)
    });

    saveLocalAuthUsers(users);
    return { success:true };
}

function loginLocalUser(username, password){
    const user = findLocalUserByUsername(username);
    if(!user){
        return { success:false, error:"Kullanıcı bulunamadı." };
    }
    if(user.password !== btoa(password)){
        return { success:false, error:"Şifre yanlış." };
    }
    return { success:true, username:user.username };
}

async function handleRegister(username, email, password, confirmPassword){
    if(!username || !email || !password || !confirmPassword){
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    if(password !== confirmPassword){
        alert("Şifreler eşleşmiyor.");
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

        if(response.ok){
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setLoggedIn(data.username || username);
            if(registerModal){ registerModal.classList.add("hidden"); }
            alert("Kayıt başarılı 😄");
            return;
        }

        if(response.status === 404){
            const localResult = registerLocalUser(username, email, password);
            if(!localResult.success){
                alert(localResult.error);
                return;
            }
            setLoggedIn(username);
            if(registerModal){ registerModal.classList.add("hidden"); }
            alert("Kayıt başarılı (yerel mod) 😄");
            return;
        }

        const data = await response.json();
        alert(data.error || "Kayıt başarısız 😢");

    }catch(err){
        console.log(err);
        const localResult = registerLocalUser(username, email, password);
        if(localResult.success){
            setLoggedIn(username);
            if(registerModal){ registerModal.classList.add("hidden"); }
            alert("Kayıt başarılı (yerel mod) 😄");
            return;
        }
        alert(localResult.error || "Kayıt başarısız 😢");
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

        if(response.ok){
            const data = await response.json();
            localStorage.setItem("token", data.token);
            const usernameToUse = data.username || username;
            setLoggedIn(usernameToUse);
            if(loginModal){ loginModal.classList.add("hidden"); }
            alert("Giriş başarılı 😄");
            return;
        }

        if(response.status === 404){
            const localResult = loginLocalUser(username, password);
            if(localResult.success){
                setLoggedIn(localResult.username);
                if(loginModal){ loginModal.classList.add("hidden"); }
                alert("Giriş başarılı (yerel mod) 😄");
                return;
            }
            alert(localResult.error);
            return;
        }

        const data = await response.json();
        alert(data.error || "Giriş başarısız 😢");

    }catch(err){
        console.log(err);
        const localResult = loginLocalUser(username, password);
        if(localResult.success){
            setLoggedIn(localResult.username);
            if(loginModal){ loginModal.classList.add("hidden"); }
            alert("Giriş başarılı (yerel mod) 😄");
            return;
        }
        alert(localResult.error || "Giriş başarısız 😢\n" + (err.message || "Sunucuya bağlanılamıyor."));
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

    const oldUser = document.querySelector(".user-box");

    if(!oldUser){
        const userDiv = document.createElement("div");
        userDiv.className = "user-box";
        userDiv.innerText = "👤 " + safeUsername;
        document.body.appendChild(userDiv);
    } else {
        oldUser.innerText = "👤 " + safeUsername;
    }
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

if(loginBtn){

    loginBtn.addEventListener("click", async () => {

        const username =
        document.getElementById("loginUsername").value;

        const password =
        document.getElementById("loginPassword").value;

        await handleLogin(username, password);

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

        const confirmPassword =
        document.getElementById("registerConfirmPassword").value;

        await handleRegister(username, email, password, confirmPassword);

    });

}

const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotModal = document.getElementById("forgotModal");
const forgotBtn = document.getElementById("forgotBtn");
const loginCloseBtn = document.getElementById("loginCloseBtn");
const registerCloseBtn = document.getElementById("registerCloseBtn");
const forgotCloseBtn = document.getElementById("forgotCloseBtn");

if(forgotPasswordLink){

    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        if(loginModal){
            loginModal.classList.add("hidden");
        }
        if(forgotModal){
            forgotModal.classList.remove("hidden");
        }
    });

}

if(loginCloseBtn){
    loginCloseBtn.addEventListener("click", () => {
        if(loginModal){
            loginModal.classList.add("hidden");
        }
    });
}

if(registerCloseBtn){
    registerCloseBtn.addEventListener("click", () => {
        if(registerModal){
            registerModal.classList.add("hidden");
        }
    });
}

if(forgotCloseBtn){
    forgotCloseBtn.addEventListener("click", () => {
        if(forgotModal){
            forgotModal.classList.add("hidden");
        }
    });
}

if(forgotBtn){

    forgotBtn.addEventListener("click", async () => {

        const email = document.getElementById("forgotEmail").value;

        if(!email){
            alert("Lütfen e-posta adresinizi girin.");
            return;
        }

        try{
            const response = await fetch(
                `${apiUrl}/forgot-password`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email
                    })
                }
            );

            if(response.ok){
                alert("Şifre sıfırlama bağlantısı gönderildi 😄");
                if(forgotModal){
                    forgotModal.classList.add("hidden");
                }
                return;
            }

            if(response.status === 404){
                const user = findLocalUserByEmail(email);
                if(user){
                    alert("Şifre sıfırlama bağlantısı gönderildi (yerel mod) 😄");
                    if(forgotModal){
                        forgotModal.classList.add("hidden");
                    }
                } else {
                    alert("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
                }
                return;
            }

            const data = await response.json();
            alert(data.error || "Şifre sıfırlama başarısız 😢");

        }catch(err){
            console.log(err);
            const user = findLocalUserByEmail(email);
            if(user){
                alert("Şifre sıfırlama bağlantısı gönderildi (yerel mod) 😄");
                if(forgotModal){
                    forgotModal.classList.add("hidden");
                }
                return;
            }
            alert("Şifre sıfırlama başarısız 😢\n" + (err.message || "Sunucuya bağlanılamıyor."));
        }

    });

}

// Modal kapatma için overlay click
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("auth-modal")){
        e.target.classList.add("hidden");
    }
});

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