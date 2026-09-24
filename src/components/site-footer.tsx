const EMAIL = "shehzadres@gmail.com";
const GITHUB = "https://github.com/shehzadres";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="site-footer">
      <div className="page-wrap">
        <p className="footer-cta-label label-mono-accent">Get in touch</p>
        <h2 className="footer-heading">
          Let's build something<br />
          <span className="text-gradient" style={{ fontStyle: "italic" }}>worth shipping.</span>
        </h2>

        <div className="footer-actions">
          <a href={`mailto:${EMAIL}`} className="btn-primary">{EMAIL}</a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="btn-secondary">GitHub ↗</a>
          <a href="/Shahzad_CV.pdf" download className="btn-secondary">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Download CV
          </a>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {year} Shahzad · Karachi, Pakistan</span>
          <div className="footer-links">
            {["Work", "Stack", "About"].map(i => (
              <a key={i} href={`#${i.toLowerCase()}`}>{i}</a>
            ))}
            <a href="tel:+923126423009">+92 312 6423009</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
