const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const toast = document.getElementById("toast");
const connectBtn = document.getElementById("connectBtn");

// غيّر هذا الرابط إلى رابط اتصال FiveM الخاص بسيرفرك
const serverConnect = "fivem://connect/YOUR-SERVER-IP";

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

connectBtn.addEventListener("click", () => {
  window.location.href = serverConnect;
});

["discordTop","discordFooter"].forEach(id => {
  document.getElementById(id).addEventListener("click", e => {
    e.preventDefault();
    const discord = "https://discord.gg/YOUR-DISCORD";
    window.open(discord, "_blank");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// تمييز القسم الحالي في القائمة
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
});

// محاكاة تحديث عدد اللاعبين - استبدلها لاحقاً بـ API حقيقي
const players = document.getElementById("players");
let playerCount = 128;
setInterval(() => {
  const change = Math.random() > .55 ? 1 : -1;
  playerCount = Math.max(0, Math.min(500, playerCount + change));
  players.textContent = playerCount;
}, 8000);
