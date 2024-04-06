import MicroModal from "micromodal";

import "./modal.scss";
import "./style.scss";
import "./media.scss";

MicroModal.init({
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
});

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
burger.addEventListener("click", () => {
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
  document.body.removeAttribute("style");
  burger.classList.remove("header-burger-active");
  menu.classList.remove("header-menu-mobile-active");
}

const button = document.querySelector("#send");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  const TELEGRAM_KEY = import.meta.env.VITE_TELEGRAM_KEY;
  const CHAT_ID = import.meta.env.VITE_CHAT_ID;
  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_KEY}/sendMessage?chat_id=${CHAT_ID}&text=test`
  );
});
