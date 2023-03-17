const btnHamburger = document.querySelector("#btnHamburger");
const body = document.querySelector("body");
const header = document.querySelector(".navbar__container");
const fadeElements = document.querySelectorAll(".has-fade");
const sidebarMobile = document.querySelector(".sidebar-mobile");
const overlay = document.querySelector(".overlay");
const mainSection = document.querySelector(".main-section");

function showSideBar() {
  sidebarMobile.classList.remove("sidebar-mobile--hidden");
  sidebarMobile.classList.add("sidebar-mobile--shown");
}

function hideSideBar() {
  sidebarMobile.classList.remove("sidebar-mobile--shown");
  sidebarMobile.classList.add("sidebar-mobile--hidden");
}

const closeHamburgerMenu = () => {
  body.classList.remove("no-scroll");
  header.classList.remove("open");
  mainSection.classList.remove("hide");
  fadeElements.forEach(function (element) {
    element.classList.remove("fade-in");
    element.classList.add("fade-out");
  });
};

const openHamburgerMenu = () => {
  body.classList.add("no-scroll");
  header.classList.add("open");
  mainSection.classList.add("hide");
  fadeElements.forEach(function (element) {
    element.classList.remove("fade-out");
    element.classList.add("fade-in");
  });
};

const handleResizeWindow = () => {
  if (window.innerWidth > 1023) {
    closeHamburgerMenu();
  }
};

btnHamburger.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    closeHamburgerMenu();
  } else {
    openHamburgerMenu();
  }
});

btnHamburger.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    showSideBar();
  } else {
    hideSideBar();
  }
});

overlay.addEventListener("click", () => {
  closeHamburgerMenu();
  hideSideBar();
});

window.onresize = handleResizeWindow;

export { closeHamburgerMenu };
