function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.toggleMenu = toggleMenu;

const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const themeStorageKey = "preferred-color-scheme";
const prefersDarkScheme =
  typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

const getStoredTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null;
  }
};

const updateToggleButtons = (theme) => {
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggleButtons.forEach((button) => {
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    const icon = button.querySelector(".theme-toggle__icon");
    const text = button.querySelector(".theme-toggle__text");
    if (icon) {
      icon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    if (text) {
      text.textContent = `${nextTheme.charAt(0).toUpperCase()}${nextTheme.slice(1)} mode`;
    }
  });
};

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  updateToggleButtons(theme);
};

let storedPreference = getStoredTheme();
const initialTheme =
  storedPreference || (prefersDarkScheme && prefersDarkScheme.matches ? "dark" : "light");

applyTheme(initialTheme);

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    storedPreference = newTheme;
    applyTheme(newTheme);
    try {
      localStorage.setItem(themeStorageKey, newTheme);
    } catch (error) {
      storedPreference = null;
    }
  });
});

if (prefersDarkScheme) {
  const handleSystemThemeChange = (event) => {
    if (storedPreference === null) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof prefersDarkScheme.addEventListener === "function") {
    prefersDarkScheme.addEventListener("change", handleSystemThemeChange);
  } else if (typeof prefersDarkScheme.addListener === "function") {
    prefersDarkScheme.addListener(handleSystemThemeChange);
  }
}
