const tambah = document.getElementById("tambah");
const kurang = document.getElementById("kurang");
const listKontainer = document.getElementById("history-list");
const totalDisplay = document.getElementById("total");
const totalTambah = document.getElementById("total-tambah");
const totalKurang = document.getElementById("total-kurang");

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID').format(angka);
};

let riwayat = JSON.parse(localStorage.getItem("myMoney")) || [];
let total = parseInt(localStorage.getItem("total")) || 0;

let totalTambahValue = parseInt(localStorage.getItem("totalTambah")) || 0;
let totalKurangValue = parseInt(localStorage.getItem("totalKurang")) || 0;

totalTambah.textContent = formatRupiah(totalTambahValue);
totalKurang.textContent = formatRupiah(totalKurangValue);

total = 0;

riwayat.forEach((item) => {
  const li = document.createElement("li");
  if (item.tambah) {
    li.innerHTML = `${item.catatan}: + Rp ${formatRupiah(item.tambah)}`;
    total += parseInt(item.tambah);
  } else if (item.kurang) {
    li.innerHTML = `${item.catatan}: - Rp ${formatRupiah(item.kurang)}`;
    total -= parseInt(item.kurang);
  }
  listKontainer.appendChild(li);
});

totalDisplay.textContent = formatRupiah(total);

tambah.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(tambah);
  const dataObjek = Object.fromEntries(data.entries());
  
  const nominal = parseInt(dataObjek.tambah) || 0;
  total += nominal;
  
  const li = document.createElement("li");
  li.innerHTML = `${dataObjek.catatan}: + Rp ${formatRupiah(nominal)}`;
  listKontainer.appendChild(li);
  tambah.reset();
  
  totalDisplay.textContent = formatRupiah(total);
  
  totalTambahValue += nominal;
  totalTambah.textContent = formatRupiah(totalTambahValue);

  riwayat.push({ ...dataObjek, tambah: nominal }); // memastikan simpan integer
  localStorage.setItem("myMoney", JSON.stringify(riwayat));
  localStorage.setItem("total", total);
  localStorage.setItem("totalTambah", totalTambahValue);
});

kurang.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(kurang);
  const dataObjek = Object.fromEntries(data.entries());
  
  const nominal = parseInt(dataObjek.kurang) || 0;
  total -= nominal;
  
  const li = document.createElement("li");
  li.innerHTML = `${dataObjek.catatan}: - Rp ${formatRupiah(nominal)}`;
  listKontainer.appendChild(li);
  kurang.reset();
  
  totalDisplay.textContent = formatRupiah(total);
  
  totalKurangValue += nominal;
  totalKurang.textContent = formatRupiah(totalKurangValue);

  riwayat.push({ ...dataObjek, kurang: nominal }); // memastikan simpan integer
  localStorage.setItem("myMoney", JSON.stringify(riwayat));
  localStorage.setItem("total", total);
  localStorage.setItem("totalKurang", totalKurangValue);
});

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", function () {
  if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
    localStorage.removeItem("myMoney");
    localStorage.removeItem("total");
    localStorage.removeItem("totalTambah");
    localStorage.removeItem("totalKurang");

    riwayat = [];
    total = 0;
    totalTambahValue = 0;
    totalKurangValue = 0;

    listKontainer.innerHTML = ""; 
    totalDisplay.textContent = "0";
    totalTambah.textContent = "0";
    totalKurang.textContent = "0";

    alert("Data berhasil direset!");
  }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('app-theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if(currentTheme === 'dark-mode') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('app-theme', 'dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('app-theme', 'light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

function autoScaleText() {
    const scaleElements = [
        { id: 'total', parentSelector: '.balance-card h1', defaultRem: 2.2, minRem: 1.0, threshold: 9, step: 0.15 },
        { id: 'total-tambah', parentSelector: '.income h3', defaultRem: 1.05, minRem: 0.65, threshold: 8, step: 0.05 },
        { id: 'total-kurang', parentSelector: '.expense h3', defaultRem: 1.05, minRem: 0.65, threshold: 8, step: 0.05 }
    ];

    scaleElements.forEach(item => {
        const el = document.getElementById(item.id);
        const parent = document.querySelector(item.parentSelector);
        if (el && parent) {
            const length = el.textContent.replace(/[^0-9-]/g, '').length; 
            if (length > item.threshold) {
                const newSize = Math.max(item.minRem, item.defaultRem - (length - item.threshold) * item.step);
                parent.style.fontSize = newSize + 'rem';
            } else {
                parent.style.fontSize = '';
            }
        }
    });
}

const observerScale = new MutationObserver(() => {
    autoScaleText();
});

['total', 'total-tambah', 'total-kurang'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        observerScale.observe(el, { childList: true, characterData: true, subtree: true });
    }
});


autoScaleText();