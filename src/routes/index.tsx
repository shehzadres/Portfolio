import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <div style={{ background: "var(--s0)", minHeight: "100vh", position: "relative" }}>
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
   TERMINAL
══════════════════════════════════════════════════════════════ */
const TERM_LINES = [
  { t: "cmd", s: "$ git clone collab-ide && cd collab-ide" },
  { t: "cmd", s: "$ docker compose up --build", d: 600 },
  { t: "ok",  s: "  ✓ yjs crdt room  [session:a9f2]",  d: 1300 },
  { t: "ok",  s: "  ✓ monaco editor  [workers:4]",      d: 1800 },
  { t: "ok",  s: "  ✓ rbac at ws layer  [role:owner]",  d: 2300 },
  { t: "cmd", s: "$ ready on :4000",                    d: 2900 },
];

function Terminal() {
  const [vis, setVis] = useState<number[]>([]);
  useEffect(() => {
    let dead = false;
    const ts: ReturnType<typeof setTimeout>[] = [];
    function run() {
      setVis([]);
      TERM_LINES.forEach((l, i) => {
        const t = setTimeout(() => { if (!dead) setVis(p => [...p, i]); }, (l as any).d ?? 0);
        ts.push(t);
      });
      ts.push(setTimeout(() => { if (!dead) run(); }, 5000));
    }
    run();
    return () => { dead = true; ts.forEach(clearTimeout); };
  }, []);

  return (
    <div className="term-wrap">
      <div className="term-bar">
        <span className="term-dot" style={{ background: "#ff5f57" }} />
        <span className="term-dot" style={{ background: "#ffbd2e" }} />
        <span className="term-dot" style={{ background: "#28c840" }} />
        <span className="term-lbl">collab-ide · production</span>
      </div>
      <div className="term-body">
        {TERM_LINES.map((l, i) => (
          <div key={i} className={`term-${l.t}`} style={{
            opacity: vis.includes(i) ? 1 : 0,
            transform: vis.includes(i) ? "none" : "translateY(4px)",
            transition: "opacity 0.3s, transform 0.3s",
          }}>
            {l.s}
          </div>
        ))}
        <span className="term-cursor" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — diagonal split, big name, floating chips
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        {/* — LEFT — */}
        <div>
          {/* status badge — pressed pill */}
          <div className="hero-badge" style={{ animationDelay: "0s" }}>
            <span className="hero-badge-dot" />
            <span className="mono-xs-t">Open to SWE roles · Karachi / Remote</span>
          </div>

          <h1 className="hero-name">
            Shahzad
            <span className="hero-name-sub">
              Full Stack Engineer · NED University · 2026
            </span>
          </h1>

          <p className="hero-desc">
            I build production systems at the hard edge of the browser —{" "}
            <strong>real-time collaboration</strong>, <strong>applied cryptography</strong>,{" "}
            <strong>WebGL rendering pipelines</strong>, and scalable full-stack architecture.
          </p>

          <div className="hero-links">
            <a href="#work" className="btn btn-v">View my work</a>
            <a href="/Shahzad_CV.pdf" download className="btn btn-ghost">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              Download CV
            </a>
            <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer"
              className="mono-xs-v" style={{ alignSelf: "center", marginLeft: 4 }}>
              github.com/shehzadres ↗
            </a>
          </div>

          <div className="hero-stats">
            {[
              { n: "6",    l: "Projects\nshipped" },
              { n: "2",    l: "Internships\ncompleted" },
              { n: "'26",  l: "Graduating\nNED Uni" },
            ].map(s => (
              <div key={s.n} className="hero-stat">
                <div className="hero-stat-n">{s.n}</div>
                <div className="hero-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* — RIGHT — */}
        <div className="hero-portrait">
          {/* floating neo chips */}
          <div className="hero-float-chip hero-float-chip-1">crdt sync ✓</div>
          <div className="hero-float-chip hero-float-chip-2">webgl · glsl · three.js</div>

          <div className="hero-portrait-well">
            <img src={portrait} alt="Shahzad — Software Engineer" />
          </div>
          <div className="hero-caption">
            <span className="mono-xs">Karachi, Pakistan · NED University of Engineering & Technology</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK — mosaic bento (5 unique cell shapes)
══════════════════════════════════════════════════════════════ */
const MOSAIC_CLASSES = ["mosaic-a", "mosaic-b", "mosaic-c", "mosaic-d", "mosaic-e"];

function WorkSection() {
  return (
    <section id="work" className="work">
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow">
            <span className="sec-num">01</span>
            <h2 className="sec-title">What I've built</h2>
          </div>
        </Reveal>

        <div className="mosaic">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 55} as="div" className={`mc ${MOSAIC_CLASSES[i] ?? "mosaic-d"}`}>
              <Link to="/work/$slug" params={{ slug: p.slug }} style={{ display: "contents" }}>
                <div className="mc-img">
                  <img src={p.cover} alt={p.title} loading="lazy" />
                  <span className="mc-idx">{p.index}</span>
                </div>
                <div className="mc-body">
                  <span className="mc-cat">{p.category}</span>
                  <h3 className="mc-title">{p.title}</h3>
                  <p className="mc-tag">{p.tagline}</p>
                  <div className="mc-chips">
                    {p.stack.slice(0, i === 0 ? 5 : 3).map(t => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  <div className="mc-links">
                    <span className="mc-link mc-link-v">Case study →</span>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()} className="mc-link">Live ↗</a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()} className="mc-link">GitHub ↗</a>
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
   STACK — interactive sidebar + pressed chip panel
══════════════════════════════════════════════════════════════ */
const STACK_DATA = [
  { area: "Languages",  color: "var(--av)", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C/C++", "GLSL"] },
  { area: "Frontend",   color: "var(--at)", items: ["React.js", "Next.js", "Three.js", "React Three Fiber", "D3.js", "Tailwind CSS", "Vite", "Zustand"] },
  { area: "Backend",    color: "var(--av)", items: ["Node.js", "Express.js", "Flask", "REST API", "WebSocket", "Socket.IO", "WebRTC", "JWT Auth"] },
  { area: "Databases",  color: "var(--at)", items: ["PostgreSQL", "MongoDB", "Redis", "SQL Server", "Prisma ORM", "Mongoose"] },
  { area: "AI / ML",    color: "var(--av)", items: ["TensorFlow", "Scikit-learn", "YOLO", "OpenCV", "OpenVINO", "ByteTrack", "EasyOCR", "Pandas", "NumPy"] },
  { area: "DevOps",     color: "var(--at)", items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "Vercel", "Railway", "Netlify"] },
];

function StackSection() {
  const [active, setActive] = useState(0);
  const row = STACK_DATA[active];

  return (
    <section id="stack" className="stk">
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow">
            <span className="sec-num">02</span>
            <h2 className="sec-title">
              Full stack,{" "}
              <span className="grad-vt">top to bottom</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="stk-inner">
            {/* category selector */}
            <div className="stk-cats">
              {STACK_DATA.map((s, i) => (
                <button
                  key={s.area} type="button"
                  className={`stk-cat-btn ${active === i ? "active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="stk-cat-dot" style={{ color: s.color }} />
                  {s.area}
                </button>
              ))}
            </div>

            {/* chip panel */}
            <div className="stk-panel">
              <div className="stk-panel-label">
                <span className="mono-xs-v">— {String(active + 1).padStart(2, "0")} / {String(STACK_DATA.length).padStart(2, "0")}</span>
                <div className="stk-panel-title">{row.area}</div>
              </div>
              <div className="stk-chips">
                {row.items.map((item, i) => (
                  <span key={item} className="stk-chip"
                    style={{ transitionDelay: `${i * 30}ms` }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE — vertical timeline rail
══════════════════════════════════════════════════════════════ */
const EXP = [
  {
    org: "Decodelabs",
    role: "Full Stack Development Intern",
    date: "Aug – Sep 2026",
    note: "Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows.",
    featured: false,
  },
  {
    org: "Progree",
    role: "Full Stack Development Intern",
    date: "Jul – Aug 2026",
    note: "Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries.",
    featured: true,
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="exp">
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Experience</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="exp-rail">
            {EXP.map((e) => (
              <div key={e.org} className={`exp-item ${e.featured ? "featured" : ""}`}>
                <div className="exp-dot" />
                <div className="exp-card">
                  <div className="exp-card-top">
                    <div>
                      <div className="exp-card-org">{e.org}</div>
                      <div className="mono-xs-v exp-card-role">{e.role}</div>
                    </div>
                    <span className="exp-card-date">{e.date}</span>
                  </div>
                  <div className="exp-card-body">{e.note}</div>
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
   ABOUT — magazine layout: pull-quote + two-col bio + terminal
══════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about" className="abt">
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow">
            <span className="sec-num">04</span>
            <h2 className="sec-title">About</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="abt-well">
            {/* magazine pull-quote */}
            <p className="abt-pull">
              "I write the code{" "}
              <span className="grad-vt">nobody else</span>{" "}
              wants to."
            </p>

            <div className="abt-cols">
              {/* bio */}
              <div>
                <div className="abt-body">
                  <p>I'm Shahzad, a CS graduate from NED University in Karachi. I build things at the hard end of the browser: real-time collaboration engines, applied cryptography over raw WebRTC, and cinematic WebGL rendering pipelines with custom GLSL shaders.</p>
                  <p>Six shipped projects spanning compilers (regex builder: Thompson NFA → Hopcroft DFA), real-time systems (Collab IDE with CRDT sync and kernel-isolated Docker execution), security (P2P E2E-encrypted transfer with libsodium), and 3D data visualization (WebGL Earth globe).</p>
                  <p>Two full-stack internships at Progree (B2B SaaS) and Decodelabs (enterprise logistics). Meta, HKUST, and Google Cloud certified. Open to SWE, backend, or full-stack roles — Karachi or remote.</p>
                </div>
                <div className="abt-actions">
                  <a href="mailto:shehzadres@gmail.com" className="btn btn-v">shehzadres@gmail.com</a>
                  <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub ↗</a>
                </div>
              </div>

              {/* right: terminal + certs */}
              <div>
                <p className="mono-xs" style={{ marginBottom: 12 }}>// collab-ide · live deploy</p>
                <Terminal />

                <div className="cert-well-inner" style={{ marginTop: 0 }}>
                  <p className="mono-xs-v" style={{ marginBottom: 8 }}>Certifications</p>
                  {[
                    "Meta: Front-End Developer Professional Certificate",
                    "HKUST: Full-Stack Web Development with React",
                    "Google Cloud: Machine Learning with TensorFlow",
                  ].map(c => (
                    <div key={c} className="cert-row">
                      <span className="cert-pip" />
                      <span className="cert-txt">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
