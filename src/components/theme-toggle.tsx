import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-accent"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Avoid hydration mismatch by showing a neutral icon until mounted */}
      {!mounted ? (
        <span className="h-3.5 w-3.5" />
      ) : theme === "dark" ? (
        <Sun className="h-3.5 w-3.5 text-muted-foreground" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  );
}
