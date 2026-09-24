import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";

const NAV = [
  { label: "Work",       href: "/#work" },
  { label: "Stack",      href: "/#stack" },
  { label: "Experience", href: "/#experience" },
  { label: "About",      href: "/#about" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`hdr ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="hdr-logo">
        <span className="hdr-disc">SZ</span>
        <span className="hdr-wordmark">Shahzad</span>
      </Link>

      <nav className="hdr-nav">
        {NAV.map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
      </nav>

      <div className="hdr-actions">
        <a href="/Shahzad_CV.pdf" download className="btn btn-ghost btn-sm">CV ↓</a>
        <button
          type="button" aria-label="Search"
          className="hdr-icon"
          onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
        >
          <Search size={14} />
        </button>
      </div>
    </header>
  );
}
