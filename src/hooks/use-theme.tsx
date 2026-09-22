import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Light-first theme hook.
 * The <html> element has NO class by default = light (our :root tokens).
 * When dark mode is active, we add the "dark" class to <html>.
 */
function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getCurrentTheme());
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      const root = document.documentElement;
      if (next === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}
