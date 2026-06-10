// SLIDER STATE
let index = 0;
const slides = document.querySelectorAll(".slide");
let slideTimer; // FIX: Variabel untuk menyimpan timer agar tidak stack/tabrakan

function showSlide(newIndex) {
  // Matikan slide yang aktif sekarang
  slides[index].classList.remove("active");
  
  // Set index baru (pake rumus modul supaya muter balik kalau abis)
  index = (newIndex + slides.length) % slides.length;
  
  // Aktifkan slide baru
  slides[index].classList.add("active");
  
  // Hapus timer sebelumnya agar tidak terjadi percepatan otomatis
  clearTimeout(slideTimer);
  
  // Cek apakah slide ini ada gambarnya
  const hasImage = slides[index].querySelector(".slide-img");
  let delay = hasImage ? 5000 : 7000; // Foto = 5 detik, Teks = 7 detik
  
  // Jalankan slide berikutnya otomatis setelah delay selesai
  slideTimer = setTimeout(() => {
    showSlide(index + 1);
  }, delay);
}

// Fungsi tombol manual "Next"
function nextSlideManual() {
  showSlide(index + 1);
}

// Fungsi tombol manual "Prev"
function prevSlide() {
  showSlide(index - 1);
}

// Mulai slide pertama kali setelah 7 detik
slideTimer = setTimeout(() => {
  showSlide(index + 1);
}, 7000);


// FIX: MUSIC TOGGLE SYSTEM (Play & Pause dengan indikator tombol)
const audio = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic() {
  if (audio.paused) {
    audio.play().then(() => {
      musicBtn.innerText = "⏸️";
      musicBtn.style.animation = "none"; // bisa ditambah efek putar di css jika mau
    }).catch(err => {
      console.log("Audio play diblokir browser, butuh interaksi user.");
    });
  } else {
    audio.pause();
    musicBtn.innerText = "🎵";
  }
}


//////////////////////////////////////////////////
// ⭐ STAR BACKGROUND ANIMATION (Sudah dioptimalkan)
//////////////////////////////////////////////////
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

// Generate bintang
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

  stars.forEach(star => {
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();

// RESPONSIVE RESIZE
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});