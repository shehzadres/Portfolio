import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";

const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="header-logo">
        <span className="header-logo-mark">SZ</span>
        <span className="header-logo-name">Shahzad</span>
      </Link>

      <nav className="header-nav">
        {NAV.map((n) => (
          <a key={n.label} href={n.href}>{n.label}</a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          href="/Shahzad_CV.pdf"
          download
          className="btn-secondary"
          style={{ padding: "9px 20px", fontSize: "0.8rem" }}
        >
          Download CV
        </a>
        <button
          type="button"
          aria-label="Search"
          className="header-icon-btn"
          onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
        >
          <Search size={15} />
        </button>
      </div>
    </header>
  );
}
