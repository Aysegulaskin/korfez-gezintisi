const apiUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:5004"
        : "https://korfez-backend.onrender.com";

// Şifre env'den gelmiyor, basit koruma — production'da değiştir
const ADMIN_PASSWORD = "korfez2620*";

const regionLabels = {
    kucukkuyu: "Küçükkuyu",
    altinoluk: "Altınoluk",
    gure: "Güre",
    akcay: "Akçay",
    ayvalik: "Ayvalık",
    cunda: "Cunda Adası"
};

// ─── Login ───────────────────────────────────────────────────────────────────

const loginPanel = document.getElementById("loginPanel");
const adminPanel = document.getElementById("adminPanel");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (sessionStorage.getItem("adminLoggedIn") === "true") {
    showAdmin();
}

loginBtn.addEventListener("click", () => {
    if (passwordInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminLoggedIn", "true");
        showAdmin();
    } else {
        passwordInput.style.border = "2px solid #ef4444";
        setTimeout(() => passwordInput.style.border = "", 1000);
        alert("Şifre yanlış");
    }
});

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
});

logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("adminLoggedIn");
    location.reload();
});

function showAdmin() {
    loginPanel.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    loadPlaces();
}

// ─── Koordinat Harita Seçici ─────────────────────────────────────────────────

let pickerMap = null;
let pickerMarker = null;

const coordPickerToggle = document.getElementById("coordPickerToggle");
const coordPickerMap    = document.getElementById("coordPickerMap");
const coordPickerInfo   = document.getElementById("coordPickerInfo");
const latInput          = document.getElementById("latitude");
const lngInput          = document.getElementById("longitude");

coordPickerToggle.addEventListener("click", () => {
    const isHidden = coordPickerMap.classList.contains("hidden");

    if (isHidden) {
        coordPickerMap.classList.remove("hidden");
        coordPickerToggle.textContent = "✕ Haritayı Kapat";
        coordPickerToggle.classList.add("active");

        // Haritayı başlat (sadece bir kez)
        if (!pickerMap) {
            pickerMap = L.map("coordPickerMap").setView([39.50, 26.85], 10);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19
            }).addTo(pickerMap);

            pickerMap.on("click", function(e) {
                const { lat, lng } = e.latlng;

                // Önceki marker'ı kaldır
                if (pickerMarker) pickerMap.removeLayer(pickerMarker);

                pickerMarker = L.marker([lat, lng]).addTo(pickerMap);

                // Input'lara yaz
                latInput.value = lat.toFixed(6);
                lngInput.value = lng.toFixed(6);

                // Bilgi göster
                coordPickerInfo.classList.remove("hidden");
                coordPickerInfo.textContent = `📍 Seçilen: ${lat.toFixed(5)}° K, ${lng.toFixed(5)}° D`;
            });
        }

        // Haritanın boyutunu doğru hesaplaması için
        setTimeout(() => pickerMap.invalidateSize(), 100);

    } else {
        coordPickerMap.classList.add("hidden");
        coordPickerToggle.textContent = "🗺️ Haritadan Konum Seç";
        coordPickerToggle.classList.remove("active");
    }
});

// ─── Fotoğraf Seçimi ─────────────────────────────────────────────────────────

let selectedFile = null;

const fileInput  = document.getElementById("fileInput");
const dropZone   = document.getElementById("dropZone");
const preview    = document.getElementById("preview");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) setFile(fileInput.files[0]);
});

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
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
});

function setFile(file) {
    selectedFile = file;
    preview.src = URL.createObjectURL(file);
    preview.classList.remove("hidden");
    dropZone.style.borderColor = "#22c55e";
}

// ─── Yer Ekle ────────────────────────────────────────────────────────────────

const uploadBtn  = document.getElementById("uploadBtn");
const uploadMsg  = document.getElementById("uploadMsg");

uploadBtn.addEventListener("click", async () => {
    const title       = document.getElementById("placeTitle").value.trim();
    const description = document.getElementById("placeDescription").value.trim();
    const region      = document.getElementById("regionSelect").value;
    const lat         = document.getElementById("latitude").value.trim();
    const lng         = document.getElementById("longitude").value.trim();

    if (!selectedFile) { showMsg("❌ Fotoğraf seçmelisin", "error"); return; }
    if (!title)        { showMsg("❌ Yer adı gerekli", "error"); return; }
    if (!description)  { showMsg("❌ Açıklama gerekli", "error"); return; }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Yükleniyor...";

    const formData = new FormData();
    formData.append("photo",       selectedFile);
    formData.append("region",      region);  // key gönder: kucukkuyu, cunda vs.
    formData.append("title",       title);
    formData.append("description", description);
    formData.append("lat",         lat);
    formData.append("lng",         lng);

    try {
        const res = await fetch(`${apiUrl}/upload`, { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Yükleme başarısız");

        showMsg("✅ Yer başarıyla eklendi!", "success");
        resetForm();
        loadPlaces();
    } catch (err) {
        showMsg("❌ " + err.message, "error");
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = "✅ Yeri Ekle";
    }
});

function resetForm() {
    document.getElementById("placeTitle").value = "";
    document.getElementById("placeDescription").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("regionSelect").value = "kucukkuyu";
    selectedFile = null;
    preview.src = "";
    preview.classList.add("hidden");
    fileInput.value = "";
    dropZone.style.borderColor = "";
}

function showMsg(text, type) {
    uploadMsg.textContent = text;
    uploadMsg.className = "msg " + type;
    setTimeout(() => { uploadMsg.textContent = ""; uploadMsg.className = ""; }, 4000);
}

// ─── Yer Listesi ─────────────────────────────────────────────────────────────

const filterRegion = document.getElementById("filterRegion");
filterRegion.addEventListener("change", loadPlaces);

async function loadPlaces() {
    const placesList = document.getElementById("placesList");
    placesList.innerHTML = "<p class='loading'>Yükleniyor...</p>";

    try {
        const res = await fetch(`${apiUrl}/places`);
        let places = await res.json();

        const filter = filterRegion.value;
        if (filter) {
            places = places.filter(p => p.region === filter);
        }

        if (places.length === 0) {
            placesList.innerHTML = "<p class='empty'>Henüz yer eklenmemiş.</p>";
            return;
        }

        placesList.innerHTML = places.map(place => {
            const imgSrc = place.image_mime
                ? `${apiUrl}/photo/${place.id}`
                : `${apiUrl}/images/${place.image}`;

            return `
                <div class="place-row" id="place-${place.id}">
                    <img src="${imgSrc}" alt="${place.title}" onerror="this.src='https://via.placeholder.com/80x60?text=?'">
                    <div class="place-info">
                        <strong>${place.title}</strong>
                        <span class="region-tag">${regionLabels[place.region] || place.region}</span>
                        <p>${place.description}</p>
                        ${place.lat ? `<small>📍 ${place.lat}, ${place.lng}</small>` : ""}
                    </div>
                    <div class="place-actions">
                        ${!place.static ? `<button class="btn-danger" onclick="deletePlace(${place.id})">🗑️ Sil</button>` : `<span class="static-badge">Sabit</span>`}
                    </div>
                </div>
            `;
        }).join("");

    } catch (err) {
        placesList.innerHTML = `<p class='error'>Hata: ${err.message}</p>`;
    }
}

async function deletePlace(id) {
    if (!confirm("Bu yeri silmek istediğine emin misin?")) return;

    try {
        const res = await fetch(`${apiUrl}/places/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Silme başarısız");
        document.getElementById(`place-${id}`)?.remove();
    } catch (err) {
        alert("❌ " + err.message);
    }
}
