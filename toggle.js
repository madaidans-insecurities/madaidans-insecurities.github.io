function setDarkMode() {
    if (localStorage.getItem("mode") === "dark") {
        localStorage.setItem("mode", "white");
        document.body.classList.remove("dark-mode");
    } else {
        localStorage.setItem("mode", "dark");
        document.body.classList.add("dark-mode");
    }
}

function detectDarkMode() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage.getItem("mode") === null) {
        localStorage.setItem("mode", "dark");
    } if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
}
detectDarkMode();

const button = document.querySelector('button');

button.addEventListener('click', event => {
  setDarkMode();
});
