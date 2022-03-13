let firstLoad = true;

window.addEventListener("pageshow", () => {
    if (!firstLoad) {
        localStorage.getItem(key) ?  applyTheme() : matchSystem();
        return
    }
    firstLoad = false;
});

function changeTheme() {
    const theme = localStorage.getItem(key);
    if (!theme) {
        matchSystem();
    }

    switch (localStorage.getItem(key)) {
        case "light":
            localStorage.setItem(key, "dark");
            break;
        case "dark":
            localStorage.setItem(key, "light");
    }
    const transition = document.createElement("style");
    transition.textContent = "body { transition: all .25s ease-in-out; }";
    document.head.appendChild(transition);
    applyTheme();
    setTimeout(() => {document.head.removeChild(transition)}, 250);
}

const button = document.querySelector("button");
button.style.visibility = "visible";
button.addEventListener("click", () => changeTheme());
