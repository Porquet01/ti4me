import { byId } from "./dom.js";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  const button = byId("theme-toggle");
  if (button) {
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}

export function initTheme(): void {
  applyTheme(currentTheme());
  const button = byId("theme-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage can be blocked; the theme still changes for this visit. */
    }
  });
}
