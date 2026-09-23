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
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--neo-base)" : "transparent",
        boxShadow: scrolled
          ? "-4px -4px 10px var(--neo-shadow-light), 4px 4px 16px var(--neo-shadow-dark)"
          : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo — neomorphic badge */}
        <Link to="/" className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
            style={{
              background: "var(--neo-base)",
              boxShadow: "var(--shadow-convex)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "var(--shadow-concave), 0 0 14px rgba(99,102,241,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-convex)";
            }}
          >
            <span
              className="font-display text-xs font-bold tracking-wider"
              style={{ color: "#a5b4fc" }}
            >
              SZ
            </span>
          </span>
          <span
            className="font-display text-sm font-semibold"
            style={{ color: "#e8eaf6", letterSpacing: "-0.02em" }}
          >
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
          {/* Download CV — neomorphic pill button */}
          <a
            href="/Shahzad_CV.pdf"
            download="Shahzad_CV.pdf"
            aria-label="Download CV"
            className="hidden items-center gap-1.5 rounded-xl px-4 py-2 transition-all duration-250 sm:flex"
            style={{
              background: "var(--neo-base)",
              boxShadow: "var(--shadow-convex)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#a5b4fc",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "-5px -5px 14px var(--neo-shadow-light), 5px 5px 14px var(--neo-shadow-dark), 0 0 12px rgba(99,102,241,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#c7d2fe";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-convex)";
              (e.currentTarget as HTMLElement).style.color = "#a5b4fc";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-concave)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-convex)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            CV
          </a>

          {/* Search — neomorphic icon button */}
          <button
            type="button"
            aria-label="Open command menu"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
            className="group flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200"
            style={{
              background: "var(--neo-base)",
              boxShadow: "var(--shadow-convex)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "-5px -5px 14px var(--neo-shadow-light), 5px 5px 14px var(--neo-shadow-dark)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-convex)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-concave)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-convex)";
            }}
          >
            <Search className="h-3.5 w-3.5" style={{ color: "#6b7a99" }} />
            <span className="mono-label hidden sm:inline">⌘K</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
