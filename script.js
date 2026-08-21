const body = document.body;
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const themeToggle = document.getElementById("theme-toggle");
const backTop = document.getElementById("back-top");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => navMenu.classList.add("show"));
navClose.addEventListener("click", () => navMenu.classList.remove("show"));

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("show"));
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.innerHTML = '<i class="uil uil-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  localStorage.setItem("portfolio-theme", light ? "light" : "dark");
  themeToggle.innerHTML = light
    ? '<i class="uil uil-sun"></i>'
    : '<i class="uil uil-moon"></i>';
});

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav__link");
  let current = "home";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
