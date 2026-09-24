const EMAIL  = "shehzadres@gmail.com";
const GITHUB  = "https://github.com/shehzadres";
const LINKEDIN = "https://linkedin.com/in/shehzadres";

const MARQUEE_ITEMS = [
  "Full Stack Engineer",
  "·",
  "Real-Time Systems",
  "·",
  "Applied Cryptography",
  "·",
  "WebGL / Three.js",
  "·",
  "Open to Work",
  "·",
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const track = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // duplicate for seamless loop

  return (
    <footer id="contact" className="ftr">
      <div className="ftr-marquee" aria-hidden="true">
        <div className="ftr-marquee-track">
          {track.map((item, i) => (
            <div key={i} className="ftr-marquee-item">
              {item === "·" ? <span>·</span> : item}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="ftr-grid">
          {/* CTA — full width */}
          <div className="ftr-cta">
            <p className="ftr-cta-label mono-xs-v">Get in touch</p>
            <h2 className="ftr-heading">
              Let's build something<br />
              <span className="grad-vt" style={{ fontStyle: "italic" }}>worth shipping.</span>
            </h2>
            <div className="ftr-actions">
              <a href={`mailto:${EMAIL}`} className="btn btn-v">{EMAIL}</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub ↗</a>
              <a href="/Shahzad_CV.pdf" download className="btn btn-ghost">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Info block */}
          <div className="ftr-info">
            {[
              { l: "Location",  v: "Karachi, Pakistan" },
              { l: "Available", v: "Immediately · Full-time" },
              { l: "Phone",     v: "+92 312 6423009" },
              { l: "Email",     v: EMAIL },
            ].map(r => (
              <div key={r.l} className="ftr-info-row">
                <span className="ftr-info-label">{r.l}</span>
                <span className="ftr-info-val">{r.v}</span>
              </div>
            ))}
          </div>

          {/* External links block */}
          <div className="ftr-links-box">
            <p className="mono-xs" style={{ marginBottom: 4 }}>Profiles</p>
            {[
              { label: "GitHub",   href: GITHUB,   sub: "shehzadres" },
              { label: "LinkedIn", href: LINKEDIN,  sub: "shehzadres" },
              { label: "Vercel",   href: "https://vercel.com/shehzadres-projects", sub: "portfolio" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="ftr-ext-link">
                {l.label}
                <span>/{l.sub} ↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="ftr-bottom">
          <span className="ftr-copy">© {year} Shahzad · Built with React + TanStack Router · Deployed on Vercel</span>
          <div className="ftr-bottom-links">
            {["Work", "Stack", "Experience", "About"].map(i => (
              <a key={i} href={`#${i.toLowerCase()}`}>{i}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
