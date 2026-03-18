const tambah = document.getElementById("tambah");
const kurang = document.getElementById("kurang");
const listKontainer = document.getElementById("history-list");
const totalDisplay = document.getElementById("total");
const totalTambah = document.getElementById("total-tambah");
const totalKurang = document.getElementById("total-kurang");
let riwayat = JSON.parse(localStorage.getItem("myMoney")) || [];
let total = parseInt(localStorage.getItem("total")) || 0;

let totalTambahValue = parseInt(localStorage.getItem("totalTambah")) || 0;
let totalKurangValue = parseInt(localStorage.getItem("totalKurang")) || 0;

totalTambah.textContent = totalTambahValue;
totalKurang.textContent = totalKurangValue;

riwayat.forEach((item) => {
  const li = document.createElement("li");
  if (item.tambah) {
    li.innerHTML = `${item.catatan}: + Rp${item.tambah}`;
    total += parseInt(item.tambah);
  } else if (item.kurang) {
    li.innerHTML = `${item.catatan}: - Rp${item.kurang}`;
    total -= parseInt(item.kurang);
  }
  listKontainer.appendChild(li);
});

totalDisplay.textContent = total;

tambah.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(tambah);
  const dataObjek = Object.fromEntries(data.entries());
  total += parseInt(dataObjek.tambah) || 0;
  const li = document.createElement("li");
  li.innerHTML = `${dataObjek.catatan}: + Rp${dataObjek.tambah}`;
  listKontainer.appendChild(li);
  tambah.reset();
  totalDisplay.textContent = total;
  totalTambah.textContent =
    parseInt(totalTambah.textContent) + parseInt(dataObjek.tambah);

  riwayat.push(dataObjek);
  localStorage.setItem("myMoney", JSON.stringify(riwayat));
  localStorage.setItem("total", total);
  localStorage.setItem("totalTambah", totalTambah.textContent);
});

kurang.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(kurang);
  const dataObjek = Object.fromEntries(data.entries());
  total -= parseInt(dataObjek.kurang) || 0;
  const li = document.createElement("li");
  li.innerHTML = `${dataObjek.catatan}: - Rp${dataObjek.kurang}`;
  listKontainer.appendChild(li);
  kurang.reset();
  totalDisplay.textContent = total;
  totalKurang.textContent =
    parseInt(totalKurang.textContent) + parseInt(dataObjek.kurang);

  riwayat.push(dataObjek);
  localStorage.setItem("myMoney", JSON.stringify(riwayat));
  localStorage.setItem("total", total);
  localStorage.setItem("totalKurang", totalKurang.textContent);
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