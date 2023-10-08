let menu = document.querySelector("#menu-icon");
let nav = document.querySelector(".nav__ul");

menu.onclick = () => {
    menu.classList.toggle("fa-xmark");
    nav.classList.toggle("show-menu");
}
