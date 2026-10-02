import { useEffect, useState } from "react";

// Theme is applied to <html data-theme> by the inline script in index.html before first paint.
// "aifyn-theme" in localStorage holds an explicit choice; without one we follow the OS setting.
const KEY = "aifyn-theme";
const EVENT = "aifyn-theme-change";
const META_COLORS = { light: "#F7FAFA", dark: "#061414" };

const systemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export const getTheme = () => document.documentElement.dataset.theme || "light";

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

export function setTheme(theme) {
  try { localStorage.setItem(KEY, theme); } catch {}
  apply(theme);
}

export function useTheme() {
  const [theme, set] = useState(getTheme);
  useEffect(() => {
    const onChange = (e) => set(e.detail);
    window.addEventListener(EVENT, onChange);
    // follow OS changes until the visitor picks a theme explicitly
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      let saved = null;
      try { saved = localStorage.getItem(KEY); } catch {}
      if (!saved) apply(systemTheme());
    };
    mq.addEventListener("change", onSystem);
    return () => {
      window.removeEventListener(EVENT, onChange);
      mq.removeEventListener("change", onSystem);
    };
  }, []);
  return [theme, setTheme];
}
