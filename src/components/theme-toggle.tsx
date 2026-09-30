import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground"
    >
      {/* Avoid hydration mismatch by showing a neutral icon until mounted */}
      {!mounted ? <span className="h-4 w-4" /> : theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
