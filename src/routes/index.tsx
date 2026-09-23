import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "#050918" }}>
      {/* Ambient background orbs */}
      <div aria-hidden="true" className="orb orb-1" />
      <div aria-hidden="true" className="orb orb-2" />
      <div aria-hidden="true" className="orb orb-3" />
      {/* Mesh grid */}
      <div aria-hidden="true" className="mesh-grid" />

      {/* Content layer */}
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Work />
          <Stack />
          <About />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TERMINAL WIDGET
══════════════════════════════════════════════════════════════ */
const TERMINAL_LINES = [
  { cmd: "$ git clone collab-ide && cd collab-ide", delay: 0 },
  { cmd: "$ docker compose up --build", delay: 600 },
  { cmd: "> yjs CRDT room initialized  [session:a9f2]", delay: 1400, accent: true },
  { cmd: "> monaco editor mounted  [workers:4]", delay: 1900, accent: true },
  { cmd: "> RBAC enforced at WebSocket layer  [role:owner]", delay: 2400, accent: true },
  { cmd: "$ ready on :4000", delay: 3000, success: true },
];

function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    function run() {
      setVisibleLines([]);
      TERMINAL_LINES.forEach((line, i) => {
        const t = setTimeout(() => { if (!cancelled) setVisibleLines((p) => [...p, i]); }, line.delay);
        timers.push(t);
      });
      const t = setTimeout(() => { if (!cancelled) run(); }, 5000);
      timers.push(t);
    }
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(5,9,24,0.85)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 0 1px rgba(124,58,237,0.12) inset",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
        <span className="font-mono text-xs ml-4" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
          collab-ide · production
        </span>
      </div>
      {/* Terminal body */}
      <div className="p-4 font-mono text-xs leading-relaxed" style={{ minHeight: "10rem" }}>
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
              color: line.success ? "#34D399" : line.accent ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.35)",
            }}
          >
            {line.cmd}
          </div>
        ))}
        <span className="cursor-blink inline-block h-3 w-1.5 align-middle" style={{ background: "rgba(167,139,250,0.6)" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 73px)" }}>
      <div
        className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-20 lg:px-10 lg:py-0"
        style={{ minHeight: "calc(100vh - 73px)" }}
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-center lg:gap-16">

          {/* ── LEFT ── */}
          <div className="lg:pt-4">
            {/* Status pill */}
            <div className="animate-rise inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                border: "1px solid rgba(6,182,212,0.3)",
                background: "rgba(6,182,212,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#06B6D4" }} />
              <span className="mono-label" style={{ color: "#67E8F9", letterSpacing: "0.1em" }}>
                Open to SWE roles · Karachi / Remote
              </span>
            </div>

            <h1
              className="animate-rise-1 font-display font-black text-foreground"
              style={{ fontSize: "clamp(3.5rem,9vw,7rem)", lineHeight: "0.93", letterSpacing: "-0.04em" }}
            >
              Shahzad
              <span className="gradient-text">.</span>
            </h1>

            <p
              className="animate-rise-2 mt-5 font-semibold uppercase tracking-widest"
              style={{ color: "#7C8DB0", fontSize: "0.78rem", letterSpacing: "0.22em" }}
            >
              Software Engineer
            </p>

            <p
              className="animate-rise-2 mt-6 max-w-lg text-xl font-medium leading-snug"
              style={{ color: "#C7D2FE" }}
            >
              I build things at the edge of the browser — real-time collaboration, applied
              cryptography, WebGL rendering pipelines, and production full-stack systems.
            </p>

            <p className="animate-rise-3 mt-5 max-w-lg text-base leading-relaxed" style={{ color: "#7C8DB0" }}>
              CS graduate from NED University. Two full-stack internships at Progree and Decodelabs.
              Six production projects spanning collaborative tools, applied cryptography,
              compilers, 3D data visualization, and enterprise SaaS.
            </p>

            {/* CTAs */}
            <div className="animate-rise-4 mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-glow">View work</a>
              <a href="/Shahzad_CV.pdf" download="Shahzad_CV.pdf" className="btn-ghost-sys" aria-label="Download CV">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Download CV
              </a>
              <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" className="mono-label glow-link ml-1">
                GitHub ↗
              </a>
            </div>

            {/* Stats */}
            <div className="animate-rise-4 mt-10 grid gap-3" style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}>
              {[
                { n: "6", l: "Projects shipped" },
                { n: "2", l: "Internships" },
                { n: "2026", l: "Graduating" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`stat-item text-center rounded-2xl ${i === 0 ? "py-5 px-4" : "py-4 px-3"}`}
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className={`font-display font-bold transition-colors ${i === 0 ? "text-3xl" : "text-2xl"}`}
                    style={{ color: i === 0 ? "#A78BFA" : "#EEF2FF" }}
                  >
                    {s.n}
                  </div>
                  <div className="mono-label mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: portrait ── */}
          <div className="animate-rise-2 flex flex-col gap-4 lg:mt-0">
            <div className="relative">
              {/* Glow ring behind portrait */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(6,182,212,0.2) 100%)",
                  filter: "blur(24px)",
                  transform: "scale(0.95) translateY(8px)",
                  zIndex: 0,
                }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 0 0 1px rgba(124,58,237,0.15)",
                  zIndex: 1,
                }}
              >
                <img
                  src={portrait}
                  alt="Shahzad, Software Engineer"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "4/5", display: "block" }}
                />
                {/* Bottom gradient name tag */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 pt-16"
                  style={{ background: "linear-gradient(to top, rgba(5,9,24,0.92) 0%, transparent 100%)" }}
                >
                  <p className="mono-label" style={{ color: "rgba(167,139,250,0.8)" }}>
                    Karachi, Pakistan · NED University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="mono-label" style={{ fontSize: "0.58rem" }}>scroll</span>
          <span className="h-6 w-px" style={{ background: "rgba(124,58,237,0.5)" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK · project grid
══════════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <div className="mb-14 flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
            What I've built
          </h2>
          <p className="mono-label">
            <span style={{ color: "#A78BFA", fontWeight: 600 }}>{String(projects.length).padStart(2, "0")}</span>{" "}
            shipped systems, most recent first
          </p>
        </div>
      </Reveal>

      <div className="proj-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} lead={i === 0} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project, index, lead = false,
}: {
  project: (typeof projects)[0];
  index: number;
  lead?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div
        className={`proj-cell group ${lead ? "proj-cell--lead" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cover image */}
        <Link to="/work/$slug" params={{ slug: project.slug }} className="block">
          <div className="relative overflow-hidden" style={{ aspectRatio: lead ? "21/9" : "16/10" }}>
            <img src={project.cover} alt={project.title} className="proj-cover-img h-full w-full object-cover" />
            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-400"
              style={{ background: "linear-gradient(to top, rgba(5,9,24,0.95) 0%, rgba(5,9,24,0.3) 50%, transparent 100%)" }}
            />

            {/* Content overlay */}
            <div className={`absolute inset-0 flex flex-col justify-end p-6 lg:p-8 ${lead ? "lg:p-10" : ""}`}>
              <div className={lead ? "max-w-2xl" : ""}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="mono-label-accent">{project.index}</span>
                  <span className="mono-label opacity-40">·</span>
                  <span className="mono-label">{project.category}</span>
                </div>
                <h3 className={`font-display font-bold leading-tight text-foreground ${lead ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"}`}>
                  {project.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: "#94A3B8",
                    maxHeight: lead ? "4rem" : hovered ? "4rem" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.stack.slice(0, lead ? 6 : 4).map((t) => (
                    <span key={t} className="tag-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Action bar */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(5,9,24,0.4)" }}
        >
          <Link to="/work/$slug" params={{ slug: project.slug }} className="mono-label transition-colors"
            style={{ color: "#7C8DB0" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A78BFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7C8DB0")}
          >
            Case study →
          </Link>
          <div className="flex items-center gap-4">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 mono-label transition-colors"
                style={{ color: "#06B6D4" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5M1.5 8h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Live Demo ↗
              </a>
            ) : (
              <span className="mono-label" style={{ color: "#2D3748" }}>No live demo</span>
            )}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 mono-label transition-colors"
                style={{ color: "#7C8DB0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A78BFA")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7C8DB0")}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub ↗
              </a>
            ) : (
              <span className="mono-label" style={{ color: "#2D3748" }}>Private repo</span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   STACK · technical capabilities table
══════════════════════════════════════════════════════════════ */
const STACK_ROWS = [
  { area: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C/C++", "GLSL"] },
  { area: "Frontend", items: ["React.js", "Next.js", "Three.js", "React Three Fiber", "D3.js", "Tailwind CSS", "Vite", "Zustand"] },
  { area: "Backend", items: ["Node.js", "Express.js", "Flask", "REST API", "WebSocket", "Socket.IO", "WebRTC", "JWT Auth"] },
  { area: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "SQL Server", "Prisma ORM", "Mongoose"] },
  { area: "AI / ML", items: ["TensorFlow", "Scikit-learn", "YOLO (Ultralytics)", "OpenCV", "OpenVINO", "ByteTrack", "EasyOCR", "Pandas", "NumPy"] },
  { area: "DevOps", items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "Postman", "Vercel", "Railway", "Netlify"] },
];

function Stack() {
  return (
    <section
      id="stack"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
              Full stack,{" "}
              <span className="gradient-text">top to bottom</span>
            </h2>
            <p className="mono-label max-w-xs text-right" style={{ color: "#7C8DB0" }}>
              Six layers, one person. From shaders to schema.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
            }}
          >
            {STACK_ROWS.map((row, i) => (
              <div
                key={row.area}
                className="grid items-start transition-colors duration-200"
                style={{
                  gridTemplateColumns: "10rem 1fr",
                  borderBottom: i < STACK_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="px-6 py-5" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="mono-label-accent">{row.area}</span>
                </div>
                <div className="flex flex-wrap gap-2 px-6 py-5">
                  {row.items.map((item) => (
                    <span key={item} className="tag-badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Experience cards */}
        <Reveal delay={160}>
          <div className="mt-16 grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <ExperienceCard
              org="Decodelabs"
              role="Full Stack Development Intern"
              type="Aug – Sep 2026"
              note="Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows."
              emphasis
            />
            <ExperienceCard
              org="Progree"
              role="Full Stack Development Intern"
              type="Jul – Aug 2026"
              note="Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceCard({
  org, role, type, note, emphasis = false,
}: {
  org: string; role: string; type: string; note: string; emphasis?: boolean;
}) {
  return (
    <div
      className="relative p-6 transition-all duration-300 lg:p-8"
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(124,58,237,0.12)";
        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
      }}
    >
      {emphasis && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, #7C3AED, #06B6D4)" }}
        />
      )}
      <h3 className={`font-display font-bold text-foreground ${emphasis ? "text-2xl lg:text-3xl" : "text-lg"}`}>
        {org}
      </h3>
      <p className="mono-label-accent mt-2">{role}</p>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: "#7C8DB0" }}>{note}</p>
      <p className="mono-label mt-5" style={{ color: "#4B5A7A" }}>{type}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_28rem] lg:items-start">
            {/* Text */}
            <div>
              <h2 className="font-display text-4xl font-bold lg:text-5xl" style={{ color: "#EEF2FF" }}>
                <span className="gradient-text">About</span>: I write the code nobody else
                wants to
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: "#7C8DB0" }}>
                <p>
                  I'm Shahzad, a Computer Science graduate from NED University in Karachi. I
                  build things at the hard end of the browser: real-time collaboration engines,
                  applied cryptography over raw WebRTC, and cinematic WebGL rendering pipelines
                  with custom GLSL shaders.
                </p>
                <p>
                  Six shipped projects spanning compilers (regex builder with Thompson NFA →
                  Hopcroft DFA), real-time systems (collaborative whiteboard, Collab IDE with CRDT
                  sync and kernel-isolated Docker execution), security (P2P E2E-encrypted file
                  transfer with libsodium), and 3D data visualization (WebGL Earth globe).
                </p>
                <p>
                  Two full-stack internships at Progree (B2B SaaS) and Decodelabs (enterprise
                  logistics). Meta, HKUST, and Google Cloud certified. Open to software engineering,
                  backend, or full-stack roles in Karachi or remote.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:shehzadres@gmail.com" className="btn-glow">
                  shehzadres@gmail.com
                </a>
                <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" className="btn-ghost-sys">
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Terminal + certs */}
            <Reveal delay={100}>
              <div className="flex flex-col gap-4">
                <p className="mono-label mb-1" style={{ color: "#4B5A7A" }}>
                  // how the sausage gets made
                </p>
                <TerminalWidget />

                {/* Certifications glass card */}
                <div
                  className="rounded-2xl p-5 mt-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="mono-label-accent mb-3">Certifications</p>
                  <div className="space-y-3">
                    {[
                      "Meta: Front-End Developer Professional Certificate",
                      "HKUST: Full-Stack Web Development with React",
                      "Google Cloud: Machine Learning with TensorFlow",
                    ].map((cert) => (
                      <div key={cert} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
                        />
                        <span className="text-sm" style={{ color: "#7C8DB0" }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
