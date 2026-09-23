const EMAIL = "shehzadres@gmail.com";
const GITHUB = "https://github.com/shehzadres";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "var(--neo-base-dark)",
        boxShadow: "inset 0 4px 16px rgba(0,0,0,0.35)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Big CTA */}
        <div className="mb-16">
          <p className="mono-label mb-5" style={{ color: "#6b7a99" }}>Get in touch</p>
          <h2
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "#e8eaf6",
            }}
          >
            {"Let's build something "}
            <span className="gradient-text" style={{ fontStyle: "italic" }}>
              worth shipping.
            </span>
          </h2>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${EMAIL}`} className="btn-glow">
              {EMAIL}
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="btn-ghost-sys">
              GitHub ↗
            </a>
            <a
              href="/Shahzad_CV.pdf"
              download="Shahzad_CV.pdf"
              className="btn-ghost-sys"
              aria-label="Download CV as PDF"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.3)",
            boxShadow: "0 -1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <span className="mono-label" style={{ color: "#3d4a66" }}>
            © {year} Shahzad · Karachi, Pakistan
          </span>
          <div className="flex items-center gap-6">
            {["About", "Work", "Stack"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="mono-label glow-link">
                {item}
              </a>
            ))}
            <a href="tel:+923126423009" className="mono-label glow-link">
              +92 312 6423009
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
