import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      <SiteHeader />
      <main>
        <HeroSection />
        <WorkSection />
        <StackSection />
        <ExperienceSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TERMINAL WIDGET
══════════════════════════════════════════════════════════════ */
const LINES = [
  { text: "$ docker compose up collab-ide", type: "cmd", delay: 0 },
  { text: "  ✓ yjs crdt room  [session:a9f2]", type: "ok", delay: 700 },
  { text: "  ✓ monaco editor  [workers:4]", type: "ok", delay: 1300 },
  { text: "  ✓ RBAC at ws layer  [role:owner]", type: "ok", delay: 1900 },
  { text: "$ ready on :4000", type: "cmd", delay: 2500 },
];

function TerminalWidget() {
  const [vis, setVis] = useState<number[]>([]);
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function run() {
      setVis([]);
      LINES.forEach((l, i) => {
        const t = setTimeout(() => { if (!cancelled) setVis(p => [...p, i]); }, l.delay);
        timers.push(t);
      });
      const t = setTimeout(() => { if (!cancelled) run(); }, 4500);
      timers.push(t);
    }
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: "#ff5f57" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#28c840" }} />
        <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-ghost)", letterSpacing: "0.08em" }}>
          collab-ide · production
        </span>
      </div>
      <div className="terminal-body">
        {LINES.map((l, i) => (
          <div key={i} style={{
            opacity: vis.includes(i) ? 1 : 0,
            transform: vis.includes(i) ? "none" : "translateY(4px)",
            transition: "opacity 0.3s, transform 0.3s",
          }} className={`terminal-line-${l.type}`}>
            {l.text}
          </div>
        ))}
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="about" className="hero">
      <div className="hero-inner">
        {/* Left column */}
        <div>
          <div className="hero-status animate-rise">
            <span className="hero-status-dot" />
            <span className="label-mono" style={{ color: "#22c55e" }}>Open to SWE roles · Karachi / Remote</span>
          </div>

          <h1 className="hero-name animate-rise-1">
            <span>Full Stack</span>
            <span className="dim">Engineer</span>
            <span className="text-gradient">Shahzad.</span>
          </h1>

          <p className="hero-role animate-rise-2">Software Engineer · NED University · 2026</p>

          <p className="hero-bio animate-rise-2">
            I build production systems at the hard end of the browser — real-time collaboration,
            applied cryptography, WebGL rendering pipelines, and scalable full-stack architecture.
          </p>

          <div className="hero-cta animate-rise-3">
            <a href="#work" className="btn-primary">View my work</a>
            <a href="/Shahzad_CV.pdf" download className="btn-secondary">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Download CV
            </a>
            <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer"
              className="label-mono" style={{ color: "var(--accent)", alignSelf: "center", marginLeft: 4 }}>
              GitHub ↗
            </a>
          </div>

          <div className="hero-stats animate-rise-4">
            {[
              { n: "6", l: "Projects shipped" },
              { n: "2", l: "Internships" },
              { n: "2026", l: "Graduating" },
            ].map(s => (
              <div key={s.l} className="hero-stat">
                <div className="hero-stat-n">{s.n}</div>
                <div className="hero-stat-l label-mono">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — portrait */}
        <div className="hero-portrait-wrap animate-rise-2">
          <div className="hero-portrait-frame">
            <img src={portrait} alt="Shahzad — Software Engineer" />
          </div>
          <div className="hero-portrait-caption">
            <span className="label-mono">Karachi, Pakistan · NED University</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════════════════ */
const CARD_CLASSES = [
  "work-card-lead",
  "work-card-a",
  "work-card-b",
  "work-card-c",
  "work-card-d",
];

function WorkSection() {
  return (
    <section id="work" className="work-section">
      <div className="page-wrap">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">What I've built</h2>
            <span className="section-meta">{String(projects.length).padStart(2, "0")} shipped systems</span>
          </div>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50} as="div" className={`work-card ${CARD_CLASSES[i] ?? "work-card-a"}`}>
              <Link to="/work/$slug" params={{ slug: p.slug }} style={{ display: "contents" }}>
                <div className="work-card-img">
                  <img src={p.cover} alt={p.title} loading="lazy" />
                  <span className="work-card-num">{p.index}</span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-cat">{p.category}</span>
                  <h3 className="work-card-title">{p.title}</h3>
                  <p className="work-card-tagline">{p.tagline}</p>
                  <div className="work-card-stack">
                    {p.stack.slice(0, i === 0 ? 6 : 4).map(t => (
                      <span key={t} className="stack-chip">{t}</span>
                    ))}
                  </div>
                  <div className="work-card-links">
                    <span className="work-card-link accent">Case study →</span>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="work-card-link">
                        Live ↗
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="work-card-link">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   STACK
══════════════════════════════════════════════════════════════ */
const STACK_ROWS = [
  { area: "Languages",  items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C/C++", "GLSL"] },
  { area: "Frontend",   items: ["React.js", "Next.js", "Three.js", "React Three Fiber", "D3.js", "Tailwind CSS", "Vite", "Zustand"] },
  { area: "Backend",    items: ["Node.js", "Express.js", "Flask", "REST API", "WebSocket", "Socket.IO", "WebRTC", "JWT Auth"] },
  { area: "Databases",  items: ["PostgreSQL", "MongoDB", "Redis", "SQL Server", "Prisma ORM", "Mongoose"] },
  { area: "AI / ML",    items: ["TensorFlow", "Scikit-learn", "YOLO", "OpenCV", "OpenVINO", "ByteTrack", "EasyOCR", "Pandas", "NumPy"] },
  { area: "DevOps",     items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "Vercel", "Railway", "Netlify"] },
];

function StackSection() {
  return (
    <section id="stack" className="stack-section">
      <div className="page-wrap">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">
              Full stack,{" "}
              <span className="text-gradient">top to bottom</span>
            </h2>
            <span className="section-meta">Six layers · one engineer</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="stack-table">
            {STACK_ROWS.map(row => (
              <div key={row.area} className="stack-row">
                <div className="stack-area">
                  <span className="label-mono-accent">{row.area}</span>
                </div>
                <div className="stack-chips">
                  {row.items.map(item => (
                    <span key={item} className="stack-chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  return (
    <section id="experience" style={{ padding: "100px 0" }}>
      <div className="page-wrap">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <span className="section-meta">2 internships · 2026</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="exp-grid">
            {[
              {
                org: "Decodelabs",
                role: "Full Stack Development Intern",
                date: "Aug – Sep 2026",
                note: "Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows.",
              },
              {
                org: "Progree",
                role: "Full Stack Development Intern",
                date: "Jul – Aug 2026",
                note: "Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries.",
              },
            ].map(e => (
              <div key={e.org} className="exp-card">
                <div className="exp-card-accent-bar" />
                <div className="exp-card-org">{e.org}</div>
                <div className="label-mono-accent exp-card-role">{e.role}</div>
                <p className="exp-card-note">{e.note}</p>
                <span className="exp-card-date label-mono">{e.date}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about-detail" style={{ padding: "100px 0" }}>
      <div className="page-wrap">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">About</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="about-grid">
            <div>
              <h3 className="about-heading">
                I write the code<br />
                <span className="text-gradient">nobody else wants to</span>
              </h3>
              <div className="about-body">
                <p>I'm Shahzad, a CS graduate from NED University in Karachi. I build things at the hard
                  end of the browser: real-time collaboration engines, applied cryptography over raw WebRTC,
                  and cinematic WebGL rendering pipelines with custom GLSL shaders.</p>
                <p>Six shipped projects spanning compilers (regex builder with Thompson NFA → Hopcroft DFA),
                  real-time systems (collaborative whiteboard, Collab IDE with CRDT sync and kernel-isolated
                  Docker execution), security (P2P E2E-encrypted file transfer with libsodium), and 3D data
                  visualization (WebGL Earth globe).</p>
                <p>Two full-stack internships at Progree (B2B SaaS) and Decodelabs (enterprise logistics).
                  Meta, HKUST, and Google Cloud certified. Open to SWE, backend, or full-stack roles in
                  Karachi or remote.</p>
              </div>
              <div className="about-actions">
                <a href="mailto:shehzadres@gmail.com" className="btn-primary">shehzadres@gmail.com</a>
                <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" className="btn-secondary">GitHub ↗</a>
              </div>
            </div>

            <div>
              <p className="label-mono" style={{ marginBottom: 12 }}>// how the sausage gets made</p>
              <TerminalWidget />

              <div className="cert-list">
                <p className="label-mono-accent" style={{ marginBottom: 4 }}>Certifications</p>
                {[
                  "Meta: Front-End Developer Professional Certificate",
                  "HKUST: Full-Stack Web Development with React",
                  "Google Cloud: Machine Learning with TensorFlow",
                ].map(c => (
                  <div key={c} className="cert-item">
                    <span className="cert-dot" />
                    <span className="cert-text">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
