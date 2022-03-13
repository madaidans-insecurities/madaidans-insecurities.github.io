const change = new Event("change");
const key = "mode";
const media = window.matchMedia("(prefers-color-scheme: light)");
const style = document.createElement("style");

const dark = `body {
    background-color: #252627;
    color: #a9a9b3;
}`
const light = `body {
    background-color: #fefefe;
    color: #222;
}`

function matchSystem() { localStorage.setItem(key, media.matches ? "light" : "dark"); }

window.addEventListener("change", () => {
    switch (localStorage.getItem(key)) {
        case "light":
            style.textContent = media.matches ? null : light;
            break;
        case "dark":
            style.textContent = media.matches ? dark : null;
            break;
        default:
            matchSystem();
            window.dispatchEvent(change);
    }
});

// Set page theme to change when the system theme is changed
media.onchange = (e) => {
    localStorage.setItem(key, e.matches ? "light" : "dark");
    window.dispatchEvent(change);
};

window.onstorage = (e) => {
    if (e.key != key) {
        return;
    }
    window.dispatchEvent(change);
};

localStorage.getItem(key) ?  window.dispatchEvent(change) : matchSystem();
document.head.appendChild(style);
