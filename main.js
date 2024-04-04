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

const menu = document.querySelector(".header-menu-mobile");
const burger = document.querySelector(".header-burger");
burger.addEventListener("click", (event) => {
  burger.classList.toggle("header-burger-active");
  menu.classList.toggle("header-menu-mobile-active");
  if (menu.classList.contains("header-menu-mobile-active")) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.removeAttribute("style");
  }
});

const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  burger.classList.remove("header-burger-active");
  menu.classList.remove("header-menu-mobile-active");
}
