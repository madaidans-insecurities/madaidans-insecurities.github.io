const MEDIA_LIGHT = window.matchMedia("(prefers-color-scheme: light)");
const MEDIA_DARK = window.matchMedia("(prefers-color-scheme: dark)");
const STORE = localStorage;
const STORE_KEY = "mode";

function matchSystem(): void {
    if (MEDIA_LIGHT.matches) {
        STORE.setItem(STORE_KEY, "light");
        return;
    }
    STORE.setItem(STORE_KEY, "dark");
}

// Disable element by setting the `disabled` attribute
function disableElement(element: HTMLElement | null): void {
    if (element) {
        element.setAttribute("disabled", "");
    }
}

function disableStyles(): void {
    const STYLES = [
        document.getElementById("light-theme"),
        document.getElementById("dark-theme")
    ];
    STYLES.forEach((style) => {
        disableElement(style);
    });
}

// Add a stylesheet
function addStyle(src: string, id: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.href = src;
        link.id = id;
        link.rel = "stylesheet";
        
        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error("could not load stylesheet"));
        document.head.append(link);
    })
}

/*
 * Takes user agent's `prefers-color-scheme` color into account
 * when switching themes
 */
function switchTheme(mediaColor: MediaQueryList, styleID: string, styleSrc: string): void {
    const STYLE = document.getElementById(styleID);
    if (mediaColor.matches) {
        disableStyles();
        return;
    }
    if (STYLE) {
        STYLE.removeAttribute("disabled");
        return;
    }
    addStyle(styleSrc, styleID).catch((error) => {
        console.error(error);
    });
}

function toDark(): void {
    switchTheme(MEDIA_DARK, "dark-theme", "/stylesheets/dark.css");
}

function toLight(): void {
    switchTheme(MEDIA_LIGHT, "light-theme", "/stylesheets/light.css");
}

function changeTheme(): void {
    switch (STORE.getItem(STORE_KEY)) {
        case "light":
            toDark();
            STORE.setItem(STORE_KEY, "dark");
            break;
        case "dark":
            toLight();
            STORE.setItem(STORE_KEY, "light");
            break;
        default:
            matchSystem();
    }
}

// Listen for theme changes in other documents
window.onstorage = (event: StorageEvent) => {
    if (event.key === STORE_KEY) {
        switch (STORE.getItem(STORE_KEY)) {
            case "light":
                toLight();
                break;
            case "dark":
                toDark();
                break;
            default:
                matchSystem();
        }
    }
};

// Set page theme to change when the system theme is changed
MEDIA_LIGHT.onchange = () => {
    disableStyles();
    matchSystem();
};

(() => {
    const BUTTON = document.querySelector("button");
    if (BUTTON) {
        BUTTON.addEventListener("click", () => changeTheme());
        // Show theme toggle if JavaScript is enabled
        BUTTON.style.visibility = "visible";
    }

    matchSystem();
})();
