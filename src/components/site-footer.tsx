const EMAIL = "shehzadres@gmail.com";
const GITHUB = "https://github.com/shehzadres";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="border-t"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Big CTA */}
        <div className="mb-16">
          <p className="mono-label-accent mb-5">Get in touch</p>
          <h2
            className="font-display font-bold leading-tight text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            Have a hard problem
            <br />
            <span style={{ color: "var(--cyan)" }}>worth building?</span>
          </h2>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${EMAIL}`} className="btn-sys">
              {EMAIL}
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="btn-ghost-sys">
              GitHub ↗
            </a>
            {/* One-click CV download */}
            <a
              href="/Shahzad_CV.pdf"
              download="Shahzad_CV.pdf"
              className="btn-ghost-sys"
              aria-label="Download CV as PDF"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M8 2v8M5 7l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12.5h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="mono-label">© {year} Shahzad. All systems nominal.</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="mono-label glow-link">
              About
            </a>
            <a href="#work" className="mono-label glow-link">
              Work
            </a>
            <a href="#stack" className="mono-label glow-link">
              Stack
            </a>
            <a href={`tel:+923126423009`} className="mono-label glow-link">
              +92 312 6423009
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
