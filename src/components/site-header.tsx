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
        background: scrolled
          ? "rgba(5, 9, 24, 0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.4)"
          : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
              boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            }}
          >
            <span className="font-display text-xs font-bold text-white tracking-wider">SZ</span>
          </span>
          <span
            className="font-display text-sm font-semibold"
            style={{ color: "#EEF2FF", letterSpacing: "-0.02em" }}
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
          {/* Download CV */}
          <a
            href="/Shahzad_CV.pdf"
            download="Shahzad_CV.pdf"
            aria-label="Download CV"
            className="hidden items-center gap-1.5 rounded-lg px-4 py-2 transition-all duration-200 sm:flex"
            style={{
              border: "1px solid rgba(124,58,237,0.3)",
              background: "rgba(124,58,237,0.08)",
              color: "#C4B5FD",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.18)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.55)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(124,58,237,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            CV
          </a>

          <button
            type="button"
            aria-label="Open command menu"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
            className="group flex items-center gap-2 rounded-lg px-3 py-2 transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <Search className="h-3.5 w-3.5" style={{ color: "#7C8DB0" }} />
            <span className="mono-label hidden sm:inline">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
