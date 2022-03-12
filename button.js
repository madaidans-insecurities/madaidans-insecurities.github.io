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
    window.dispatchEvent(change);
}

const button = document.querySelector("button");
button.style.visibility = "visible";
button.addEventListener("click", () => changeTheme());
