import IMask from "imask";
import MicroModal from "micromodal";
import JustValidate from "just-validate";

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

const validator = new JustValidate("#basic_form");

IMask(document.getElementById("basic_phone"), {
  mask: "+{7}(000)000-00-00",
});

function escapeMarkdownV2(text) {
  const escapeChars = "_*[]()~`>#+-=|{}.!";
  return text
    .split("")
    .map((char) => (escapeChars.includes(char) ? "\\" + char : char))
    .join("");
}

validator
  .addField("#basic_name", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя",
    },
    {
      value: 3,
      rule: "minLength",
      errorMessage: "Имя слишком короткое",
    },
    {
      value: 30,
      rule: "maxLength",
      errorMessage: "Имя слишком длинное",
    },
  ])
  .addField("#basic_phone", [
    {
      rule: "required",
      errorMessage: "Введите ваш телефон",
    },
    {
      rule: "customRegexp",
      errorMessage: "Телефон не правильный",
      value: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/,
    },
  ])
  .onSuccess(async (event) => {
    event.preventDefault();

    const name = document.getElementById("basic_name").value;
    const phone = document.getElementById("basic_phone").value;
    const text = document.getElementById("basic_text").value;

    const TELEGRAM_KEY = import.meta.env.VITE_TELEGRAM_KEY;
    const CHAT_ID = import.meta.env.VITE_CHAT_ID;
    const message = `*Пришла новая заявка\\!*  *Имя:* ${name}  *Телефон:* ${escapeMarkdownV2(
      phone
    )}  *Сообщение:* ${text}`;
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${message}&parse_mode=MarkdownV2`
      ).then((result) => console.log(result));
    } catch (error) {
      console.error("Catch Error:", error);
    }
  });
