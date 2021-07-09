if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "dark");
}
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
}
