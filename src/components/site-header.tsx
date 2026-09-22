import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo — clean typographic mark */}
        <Link to="/" className="group flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-colors duration-200"
            style={{
              border: "1.5px solid #111111",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#111111";
              const span = e.currentTarget.querySelector("span") as HTMLElement | null;
              if (span) span.style.color = "#FBFBFA";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              const span = e.currentTarget.querySelector("span") as HTMLElement | null;
              if (span) span.style.color = "#111111";
            }}
          >
            <span
              className="font-display text-xs font-bold transition-colors duration-200"
              style={{ color: "#111111" }}
            >
              SZ
            </span>
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            Shahzad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="nav-item">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Download CV */}
          <a
            href="/Shahzad_CV.pdf"
            download="Shahzad_CV.pdf"
            aria-label="Download CV"
            className="hidden items-center gap-1.5 rounded px-3 py-1.5 transition-all duration-200 sm:flex"
            style={{
              border: "1px solid #EAEAEA",
              color: "#111111",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#F7F6F3";
              (e.currentTarget as HTMLElement).style.borderColor = "#D0CFCC";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "#EAEAEA";
            }}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2v8M5 7l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            CV
          </a>

          <button
            type="button"
            aria-label="Open command menu"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
            className="group flex items-center gap-2 rounded px-3 py-1.5 transition-colors hover:bg-accent"
            style={{ border: "1px solid var(--border)" }}
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
            <span className="mono-label hidden sm:inline">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
