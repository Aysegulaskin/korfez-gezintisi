const map = L.map('map', {
    zoomControl: true,
    attributionControl: false
}).setView([39.50, 26.85], 10);

// ─── API URL (en üstte tanımlanmalı) ────────────────────────────────────────
const apiUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : window.location.origin;

const bounds = [
    [39.20, 26.45],
    [39.75, 27.20]
];

map.setMaxBounds(bounds);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 20
    }).addTo(map);

const regionData = {

    "Küçükkuyu": {
        konaklama: [
            "🏨 Palm Beach Hotel",
            "🏨 Glenn Hotel & Beach",
            "🏨 Gürel Garden House"
        ],
        yemek: [
            "🍴 Alp Balık Evi",
            "🍴 Ege Cafe"
        ],
        plaj: [
            "🌊 Mıhlı Plajı",
            "🌊 Küçükkuyu Sahili"
        ],
        aktivite: [
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
        konaklama: ["🏨 Rawda Resort Hotel"],
        yemek: ["🍴 Sahil Cafe"],
        plaj: ["🌊 Altınoluk Sahili"],
        aktivite: ["🚤 Tekne Turu"]
    },

    "Güre": {
        konaklama: ["🏨 Güre Termal"],
        yemek: ["🍴 Kazdağı Sofrası"],
        plaj: ["🌊 Güre Sahili"],
        aktivite: ["♨️ Termal Spa"]
    },

    "Akçay": {
        konaklama: ["🏨 Akçayhan Hotel"],
        yemek: ["🍴 Deniz Restaurant"],
        plaj: ["🌊 Akçay Plajı"],
        aktivite: ["🚴 Bisiklet Turu"]
    },

    "Ayvalık": {
        konaklama: ["🏨 Bacacan Otel"],
        yemek: ["🍴 Tik Mustafa"],
        plaj: ["🌊 Sarımsaklı"],
        aktivite: ["🌅 Gün Batımı"]
    },

    "Cunda Adası": {
        konaklama: ["🏨 Cunda Labris Hotel"],
        yemek: ["🍴 Taş Kahve"],
        plaj: ["🌊 Patriça Koyu"],
        aktivite: ["🏛 Taş Sokak Gezisi"]
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

const regionMap = {
    kucukkuyu: "Küçükkuyu",
    altinoluk: "Altınoluk",
    gure: "Güre",
    akcay: "Akçay",
    ayvalik: "Ayvalık",
    cunda: "Cunda Adası"
};

const locations =
document.querySelectorAll("[data-region]");

const customIcon = L.icon({

    iconUrl:
        'https://cdn-icons-png.flaticon.com/512/684/684908.png',

    iconSize: [38, 38],

    iconAnchor: [19, 38],

    popupAnchor: [0, -38]

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

function renderTab(tab) {

    const data = regionData[currentRegion]?.[tab] || [];

    let html = "<ul>";

    data.forEach(item => {
        html += `<li>${item}</li>`;
    });

    html += "</ul>";

    tabContent.innerHTML = html;
}

function renderTravelSection(region) {

    if (!travelSection || !travelTitle || !travelGrid) {
        return;
    }

    // Grid'i temizle (loadPlaces dolduracak)
    travelGrid.innerHTML = "";

    const titleSuffix = region === "Altınoluk" ? "ta" : region === "Güre" ? "de" : "da";
    travelTitle.innerText = `🌅 ${region}'${titleSuffix} Gezilecek Yerler`;

    travelSection.classList.remove("hidden");
}
// Seyahat kartları yalnızca bir bölge seçildiğinde gösterilecek
if (closeCard) {

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

// Button locations event listeners - BUTTON CLICKS
locations.forEach(location => {

    location.addEventListener("click", () => {

        console.log("BUTTON CLICKED");

        const regionKey = location.dataset.region;

        console.log("regionKey:", regionKey);

        const regionName = regionMap[regionKey] || regionKey;

        console.log("regionName:", regionName);

        currentRegion = regionName;

        renderTravelSection(regionName);

        loadPlaces(regionName);

    });

});


const searchInput = document.getElementById("searchInput");

let allPlaces = []; // Tüm yerler cache'de tutulacak

// Sayfa yüklenince tüm yerleri önceden çek
async function preloadAllPlaces() {
    try {
        const res = await fetch(`${apiUrl}/places`);
        allPlaces = await res.json();
    } catch (err) {
        console.log("Yerler önceden yüklenemedi:", err);
    }
}
preloadAllPlaces();

if (searchInput) {
    searchInput.addEventListener("input", async () => {
        const value = searchInput.value.trim().toLowerCase();

        if (!travelSection || !travelGrid) return;

        // Boşsa mevcut görünümü koru
        if (value === "") {
            document.querySelectorAll(".travel-card").forEach(card => {
                card.style.display = "block";
            });
            return;
        }

        // Tüm yerler arasında ara
        const results = allPlaces.filter(place => {
            const title = (place.title || "").toLowerCase();
            const desc  = (place.description || "").toLowerCase();
            const region = (place.region || "").toLowerCase();
            return title.includes(value) || desc.includes(value) || region.includes(value);
        });

        // Sonuçları göster
        travelSection.classList.remove("hidden");
        travelGrid.innerHTML = "";

        if (results.length === 0) {
            travelGrid.innerHTML = `<p style="color:#aaa; padding:20px;">Sonuç bulunamadı.</p>`;
            return;
        }

        results.forEach(place => {
            const isUploaded = !place.static;
            const imgSrc = isUploaded
                ? `${apiUrl}/uploads/${place.image}`
                : `${apiUrl}/images/${place.image}`;

            const regionLabel = regionMap[place.region] || place.region;

            travelGrid.innerHTML += `
                <div class="travel-card">
                    <img src="${imgSrc}" alt="${place.title}" loading="lazy" decoding="async">
                    <div class="travel-content">
                        <span style="font-size:11px; color:#aaa; text-transform:uppercase; letter-spacing:1px;">📍 ${regionLabel}</span>
                        <h2>${place.title}</h2>
                        <p>${place.description}</p>
                    </div>
                </div>
            `;
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

    console.log("loginOpenBtn:", loginOpenBtn);
    console.log("registerOpenBtn:", registerOpenBtn);
    console.log("loginModal:", loginModal);
    console.log("registerModal:", registerModal);

    const loginBtn =
        document.getElementById("loginBtn");

    const registerBtn =
        document.getElementById("registerBtn");

    const authLoginCard =
        document.getElementById("authLoginCard");

    const authRegisterCard =
        document.getElementById("authRegisterCard");

    const apiUrl_unused = null; // yukarıda tanımlandı

    function getLocalAuthUsers() {
        return JSON.parse(localStorage.getItem("authUsers") || "[]");
    }

    function saveLocalAuthUsers(users) {
        localStorage.setItem("authUsers", JSON.stringify(users));
    }

    function findLocalUserByUsername(username) {
        return getLocalAuthUsers().find(user => user.username.toLowerCase() === username.toLowerCase());
    }

    function findLocalUserByEmail(email) {
        return getLocalAuthUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    function registerLocalUser(username, email, password) {
        const users = getLocalAuthUsers();

        if (findLocalUserByUsername(username)) {
            return { success: false, error: "Bu kullanıcı adı zaten kullanılıyor." };
        }

        if (findLocalUserByEmail(email)) {
            return { success: false, error: "Bu e-posta zaten kayıtlı." };
        }

        users.push({
            username,
            email,
            password: btoa(password)
        });

        saveLocalAuthUsers(users);
        return { success: true };
    }

    function loginLocalUser(username, password) {
        const user = findLocalUserByUsername(username);
        if (!user) {
            return { success: false, error: "Kullanıcı bulunamadı." };
        }
        if (user.password !== btoa(password)) {
            return { success: false, error: "Şifre yanlış." };
        }
        return { success: true, username: user.username };
    }

    async function handleRegister(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor.");
            return;
        }

        try {
            const response = await fetch(
                `${apiUrl}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                setLoggedIn(data.username || username);
                if (registerModal) { registerModal.classList.add("hidden"); }
                alert("Kayıt başarılı 😄");
                return;
            }

            if (response.status === 404) {
                const localResult = registerLocalUser(username, email, password);
                if (!localResult.success) {
                    alert(localResult.error);
                    return;
                }
                setLoggedIn(username);
                if (registerModal) { registerModal.classList.add("hidden"); }
                alert("Kayıt başarılı (yerel mod) 😄");
                return;
            }

            const data = await response.json();
            alert(data.error || "Kayıt başarısız 😢");

        } catch (err) {
            console.log(err);
            const localResult = registerLocalUser(username, email, password);
            if (localResult.success) {
                setLoggedIn(username);
                if (registerModal) { registerModal.classList.add("hidden"); }
                alert("Kayıt başarılı (yerel mod) 😄");
                return;
            }
            alert(localResult.error || "Kayıt başarısız 😢");
        }
    }

    async function handleLogin(username, password) {
        if (!username || !password) {
            alert("Lütfen kullanıcı adı ve şifre girin.");
            return;
        }

        try {
            const response = await fetch(
                `${apiUrl}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                const usernameToUse = data.username || username;
                setLoggedIn(usernameToUse);
                if (loginModal) { loginModal.classList.add("hidden"); }
                alert("Giriş başarılı 😄");
                return;
            }

            if (response.status === 404) {
                const localResult = loginLocalUser(username, password);
                if (localResult.success) {
                    setLoggedIn(localResult.username);
                    if (loginModal) { loginModal.classList.add("hidden"); }
                    alert("Giriş başarılı (yerel mod) 😄");
                    return;
                }
                alert(localResult.error);
                return;
            }

            const data = await response.json();
            alert(data.error || "Giriş başarısız 😢");

        } catch (err) {
            console.log(err);
            const localResult = loginLocalUser(username, password);
            if (localResult.success) {
                setLoggedIn(localResult.username);
                if (loginModal) { loginModal.classList.add("hidden"); }
                alert("Giriş başarılı (yerel mod) 😄");
                return;
            }
            alert(localResult.error || "Giriş başarısız 😢\n" + (err.message || "Sunucuya bağlanılamıyor."));
        }
    }

    function normalizeUsername(username) {
        const normalized = typeof username === "string" ? username.trim() : "";
        return normalized && normalized.toLowerCase() !== "undefined" ? normalized : "";
    }

    function setLoggedIn(username) {
        const safeUsername = normalizeUsername(username) || "Kullanıcı";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", safeUsername);

        if (loginOpenBtn) {
            loginOpenBtn.style.display = "none";
        }

        if (registerOpenBtn) {
            registerOpenBtn.style.display = "none";
        }

        const oldUser = document.querySelector(".user-box");

        if (!oldUser) {
            const userDiv = document.createElement("div");
            userDiv.className = "user-box";
            userDiv.innerText = "👤 " + safeUsername;
            document.body.appendChild(userDiv);
        } else {
            oldUser.innerText = "👤 " + safeUsername;
        }
    }

    if (loginOpenBtn) {

        loginOpenBtn.addEventListener("click", () => {
            console.log("Login button clicked");
            if (loginModal) {
                loginModal.classList.remove("hidden");
            }
        });

    }

    if (registerOpenBtn) {

        registerOpenBtn.addEventListener("click", () => {
            console.log("Register button clicked");
            if (registerModal) {
                registerModal.classList.remove("hidden");
            }
        });

    }

    if (loginBtn) {

        loginBtn.addEventListener("click", async () => {

            const username =
                document.getElementById("loginUsername").value;

            const password =
                document.getElementById("loginPassword").value;

            await handleLogin(username, password);

        });

    }

    if (registerBtn) {

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

    if (forgotPasswordLink) {

        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Forgot password link clicked");
            if (loginModal) {
                loginModal.classList.add("hidden");
            }
            if (forgotModal) {
                forgotModal.classList.remove("hidden");
            }
        });

    }

    if (loginCloseBtn) {
        loginCloseBtn.addEventListener("click", () => {
            if (loginModal) {
                loginModal.classList.add("hidden");
            }
        });
    }

    if (registerCloseBtn) {
        registerCloseBtn.addEventListener("click", () => {
            if (registerModal) {
                registerModal.classList.add("hidden");
            }
        });
    }

    if (forgotCloseBtn) {
        forgotCloseBtn.addEventListener("click", () => {
            if (forgotModal) {
                forgotModal.classList.add("hidden");
            }
        });
    }

    if (forgotBtn) {

        forgotBtn.addEventListener("click", async () => {

            const email = document.getElementById("forgotEmail").value;

            if (!email) {
                alert("Lütfen e-posta adresinizi girin.");
                return;
            }

            try {
                const response = await fetch(
                    `${apiUrl}/forgot-password`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email
                        })
                    }
                );

                if (response.ok) {
                    alert("Şifre sıfırlama bağlantısı gönderildi 😄");
                    if (forgotModal) {
                        forgotModal.classList.add("hidden");
                    }
                    return;
                }

                if (response.status === 404) {
                    const user = findLocalUserByEmail(email);
                    if (user) {
                        alert("Şifre sıfırlama bağlantısı gönderildi (yerel mod) 😄");
                        if (forgotModal) {
                            forgotModal.classList.add("hidden");
                        }
                    } else {
                        alert("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
                    }
                    return;
                }

                const data = await response.json();
                alert(data.error || "Şifre sıfırlama başarısız 😢");

            } catch (err) {
                console.log(err);
                const user = findLocalUserByEmail(email);
                if (user) {
                    alert("Şifre sıfırlama bağlantısı gönderildi (yerel mod) 😄");
                    if (forgotModal) {
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
        if (e.target.classList.contains("auth-modal")) {
            e.target.classList.add("hidden");
        }
    });

    console.log("SCRIPT ÇALIŞTI 😄");

    // Modal kapatma için overlay click
    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const username =
        normalizeUsername(localStorage.getItem("username"));

    if (!username) {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

    }

    if (isLoggedIn === "true" && username) {

        if (loginOpenBtn) {
            loginOpenBtn.style.display = "none";
        }

        if (registerOpenBtn) {
            registerOpenBtn.style.display = "none";
        }

        let oldUser =
            document.querySelector(".user-box");

        if (!oldUser) {

            const userDiv =
                document.createElement("div");

            userDiv.className = "user-box";

            userDiv.innerHTML = `
            👤 ${username}

            <button id="logoutBtn">
                Çıkış Yap
            </button>
        `;

            document.body.appendChild(userDiv);

        }

    }

    document.addEventListener("click", (e) => {

        if (e.target.id === "logoutBtn") {

            localStorage.removeItem("token");

            localStorage.removeItem("username");

            localStorage.removeItem("isLoggedIn");

            location.reload();

        }
    
    });

// Aktif marker'ları takip etmek için
let activePlaceMarkers = [];

function clearPlaceMarkers() {
    activePlaceMarkers.forEach(m => map.removeLayer(m));
    activePlaceMarkers = [];
}

function normalizeRegion(str) {
    return str
        .toString()
        .toLowerCase()
        .replaceAll("ı", "i")
        .replaceAll("ü", "u")
        .replaceAll("ş", "s")
        .replaceAll("ğ", "g")
        .replaceAll("ö", "o")
        .replaceAll("ç", "c")
        .replace(/\s+/g, "");
}

function makePlaceIcon(color) {
    return L.divIcon({
        className: "",
        html: `<div style="
            background: ${color};
            border-radius: 50% 50% 50% 0;
            width: 32px;
            height: 32px;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            transition: background 0.2s;
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -34]
    });
}

const defaultIcon = makePlaceIcon("#e74c3c");   // kırmızı
const activeIcon  = makePlaceIcon("#f1c40f");   // sarı

function resetAllMarkers() {
    activePlaceMarkers.forEach(m => m.setIcon(defaultIcon));
}

async function loadPlaces(regionName) {

    console.log("loadPlaces çalıştı:", regionName);

    clearPlaceMarkers();

    if (!travelGrid) {
        console.log("travelGrid bulunamadı");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/places`);
        const places = await response.json();

        const selectedRegion = normalizeRegion(regionName);

        const filteredPlaces = places.filter(place => {
            const placeRegion = normalizeRegion(
                Array.isArray(place.region) ? place.region[0] : place.region
            );
            return placeRegion === selectedRegion;
        });

        console.log("Filtrelenen:", filteredPlaces);

        // Önce tüm kartları ve marker'ları oluştur, sonra event'leri bağla
        const markerMap = {}; // index -> marker

        filteredPlaces.forEach((place, idx) => {
            const isUploaded = !place.static;
            const imgSrc = isUploaded
                ? `${apiUrl}/uploads/${place.image}`
                : `${apiUrl}/images/${place.image}`;

            const lat = parseFloat(place.lat);
            const lng = parseFloat(place.lng);
            const hasCoord = !isNaN(lat) && !isNaN(lng);

            const locationBtn = hasCoord
                ? `<button class="goto-location" data-idx="${idx}" style="
                    margin-top:10px;
                    background: none;
                    border: 1px solid rgba(255,255,255,0.4);
                    color: #fff;
                    padding: 5px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 13px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    transition: background 0.2s;
                  ">📍 Konuma Git</button>`
                : '';

            travelGrid.innerHTML += `
                <div class="travel-card">
                    <img src="${imgSrc}" alt="${place.title}" loading="lazy" decoding="async">
                    <div class="travel-content">
                        <h2>${place.title}</h2>
                        <p>${place.description}</p>
                        ${locationBtn}
                    </div>
                </div>
            `;

            if (hasCoord) {
                const marker = L.marker([lat, lng], { icon: defaultIcon })
                    .addTo(map)
                    .bindPopup(`
                        <div style="min-width:160px; text-align:center;">
                            <strong style="font-size:14px;">${place.title}</strong><br>
                            <span style="font-size:12px; color:#555;">${place.description}</span>
                        </div>
                    `);

                // Marker'a tıklayınca sadece popup açılsın, scroll yok
                marker.on("click", function() {
                    this.openPopup();
                });

                markerMap[idx] = marker;
                activePlaceMarkers.push(marker);
            }
        });

        // "Konuma Git" butonlarına event ekle
        travelGrid.querySelectorAll('.goto-location').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const idx = parseInt(this.getAttribute('data-idx'));
                const marker = markerMap[idx];
                if (!marker) return;

                // Tüm marker'ları sıfırla, sadece bu marker'ı sarıya çevir
                resetAllMarkers();
                marker.setIcon(activeIcon);

                // Haritayı o marker'a götür ve popup aç
                map.setView(marker.getLatLng(), 15, { animate: true });
                marker.openPopup();

                // Sayfayı haritaya scroll et
                document.getElementById("map").scrollIntoView({ behavior: "smooth" });
            });
        });

        // İlk yüklemede haritayı tüm marker'lara sığdır
        if (activePlaceMarkers.length > 0) {
            const group = L.featureGroup(activePlaceMarkers);
            map.fitBounds(group.getBounds().pad(0.3));
        }

    } catch(err) {
        console.log("API Hatası, travelCards fallback'i kullanılıyor:", err);
        
        // API başarısız olursa hardcoded travelCards kullan
        const cardsForRegion = travelCards[regionName] || [];
        
        cardsForRegion.forEach((card, idx) => {
            travelGrid.innerHTML += `
                <div class="travel-card">
                    <img src="${card.image}" alt="${card.title}">
                    <div class="travel-content">
                        <h2>${card.title}</h2>
                        <p>${card.description}</p>
                    </div>
                </div>
            `;
        });
    }
}

    