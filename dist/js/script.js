// Hamburger

const hamburger = document.querySelector("#hamburger");
const menuNav = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  menuNav.classList.toggle("hidden");
});

// Klik di luar hamburger
window,
  addEventListener("click", function (e) {
    if (e.target != hamburger && e.target != menuNav) {
      hamburger.classList.remove("hamburger-active");
      menuNav.classList.add("hidden");
    }
  });

// Navbar Fixed

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.add("flex");
    toTop.classList.remove("hidden");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Darkmode toggle

const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindahkan posisi toggle sesuai mode

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// animasi teks
const typedText = "Full Stack Developer";
const typingDelay = 100;
const newTextDelay = 1500;

let textIndex = 0;
let isErasing = false;
let typingTimeout;

function type() {
  const currentText = typedText.substring(0, textIndex);
  document.querySelector(".typing-text").textContent = currentText;

  if (!isErasing) {
    if (textIndex < typedText.length) {
      textIndex++;
      typingTimeout = setTimeout(type, typingDelay);
    } else {
      setTimeout(() => {
        isErasing = true;
        clearTimeout(typingTimeout);
        type();
      }, newTextDelay);
    }
  } else {
    isErasing = false;
    clearTimeout(typingTimeout);
    localStorage.setItem("animationShown", "true");
    document.querySelector(".typing-text").classList.add("typing-complete");
  }
}

// Menghapus nilai dari localStorage sebelum halaman direload
window.addEventListener("beforeunload", function () {
  localStorage.removeItem("animationShown");
});

// Cek apakah efek animasi sudah pernah ditampilkan sebelumnya
const animationShown = localStorage.getItem("animationShown");

if (!animationShown) {
  type();
} else {
  document.querySelector(".typing-text").textContent = typedText;
}
