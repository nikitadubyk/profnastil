import "./style.scss";
import "./media.scss";

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const menu = document.querySelector(".header-menu");
const info = document.querySelector(".header-info");
const burger = document.querySelector(".header-burger");
burger.addEventListener("click", () => {
  burger.classList.toggle("header-burger-active");
  menu.classList.toggle("header-menu-active");
  info.classList.toggle("header-info-active");
});
