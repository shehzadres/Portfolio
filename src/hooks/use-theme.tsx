import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Dark-first theme hook.
 * The <html> element has NO class by default = dark (our :root tokens).
 * When light mode is active, we add the "light" class to <html>.
 */
function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getCurrentTheme());
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      if (next === "light") {
        root.classList.add("light");
      } else {
        root.classList.remove("light");
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
