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
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <Stack />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TERMINAL WIDGET — used in the About section
══════════════════════════════════════════════════════════════ */

const TERMINAL_LINES = [
  { cmd: "$ git clone collab-ide && cd collab-ide", delay: 0 },
  { cmd: "$ docker compose up --build", delay: 600 },
  { cmd: "> yjs CRDT room initialized  [session:a9f2]", delay: 1400, accent: true },
  { cmd: "> monaco editor mounted  [workers:4]", delay: 1900, accent: true },
  { cmd: "> container ws-a9f2  [cpu:0.2%  mem:48MB]", delay: 2400, accent: true },
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
        const t = setTimeout(() => {
          if (cancelled) return;
          setVisibleLines((prev) => [...prev, i]);
        }, line.delay);
        timers.push(t);
      });

      const t = setTimeout(() => {
        if (cancelled) return;
        run();
      }, 5000);
      timers.push(t);
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(0,229,195,0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />

      {/* Title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "rgba(0,229,195,0.12)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(0,229,195,0.6)" }} />
        <span className="mono-label ml-4 text-foreground/30">collab-ide — production stack</span>
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
              color: line.success
                ? "var(--cyan)"
                : line.accent
                  ? "rgba(0,229,195,0.65)"
                  : "rgba(232,237,245,0.75)",
            }}
          >
            {line.cmd}
          </div>
        ))}
        <span
          className="cursor-blink inline-block h-3 w-1.5 align-middle"
          style={{ background: "var(--cyan)" }}
        />
      </div>
    </div>
  );
}

/* Ambient dot-grid background */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(0,229,195,0.09) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 80%)",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — Portrait + name/bio/CTAs + stats
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 73px)" }}
    >
      <DotGrid />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,229,195,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-20 lg:px-10 lg:py-0"
        style={{ minHeight: "calc(100vh - 73px)" }}
      >
        {/* 2-column: left = name/copy/CTAs, right = portrait */}
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-center lg:gap-16">
          {/* ── LEFT ── */}
          <div>
            <p className="mono-label-accent animate-rise flex items-center gap-2.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)" }}
              />
              Open to 2026 roles · Karachi / Remote
            </p>

            <h1
              className="animate-rise-1 mt-6 font-display font-bold tracking-tight text-foreground"
              style={{
                fontSize: "clamp(3.2rem,8vw,6.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.04em",
              }}
            >
              Shahzad<span style={{ color: "var(--cyan)" }}>.</span>
            </h1>

            <div
              className="animate-rise-2 mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: "var(--cyan-dim)", border: "1px solid var(--cyan-border)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)" }} />
              <span
                className="font-mono font-semibold uppercase"
                style={{ color: "var(--cyan)", fontSize: "0.78rem", letterSpacing: "0.14em" }}
              >
                Software Engineer
              </span>
            </div>

            <p
              className="animate-rise-2 mt-5 max-w-lg font-display text-xl font-semibold leading-snug"
              style={{ color: "rgba(232,237,245,0.75)" }}
            >
              I build things at the edge of the browser. Real-time collaboration, applied
              cryptography, and WebGL rendering pipelines.
            </p>

            <p className="animate-rise-3 mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Final-year CS at NED University. Two remote internships (CoreTech Innovations &
              EVsim). Five production projects across computer vision, real-time collaboration,
              applied cryptography, full-stack platforms, and data engineering.
            </p>

            {/* CTA row */}
            <div className="animate-rise-4 mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-sys">
                View work
              </a>

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

              <a
                href="https://github.com/shehzadres"
                target="_blank"
                rel="noreferrer"
                className="mono-label glow-link ml-1"
              >
                GitHub ↗
              </a>
            </div>

            {/* Stat strip */}
            <div
              className="animate-rise-4 mt-10 grid grid-cols-3 gap-px"
              style={{ background: "var(--border)" }}
            >
              {[
                { n: "5", l: "Systems shipped" },
                { n: "2", l: "Internships" },
                { n: "2026", l: "Graduating" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="stat-item px-5 py-4 text-center"
                  style={{ background: "var(--card)" }}
                >
                  <div
                    className="stat-num font-display text-2xl font-bold transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {s.n}
                  </div>
                  <div className="mono-label mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: portrait only (terminal moved to About) ── */}
          <div className="animate-rise-2 flex flex-col gap-4">
            <div className="relative">
              {/* Ambient glow halo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(0,229,195,0.10) 0%, transparent 68%)",
                }}
              />

              <div
                className="relative overflow-hidden rounded-lg"
                style={{ border: "1px solid rgba(0,229,195,0.22)" }}
              >
                <span className="corner-tl" />
                <span className="corner-tr" />
                <span className="corner-bl" />
                <span className="corner-br" />

                {/* Cyan glow line along top edge */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-px"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--cyan), transparent)",
                  }}
                />

                <img
                  src={portrait}
                  alt="Shahzad — Software Engineer"
                  className="w-full object-cover object-top"
                  style={{
                    aspectRatio: "4/5",
                    display: "block",
                    filter: "saturate(0.88) contrast(1.05)",
                  }}
                />

                {/* Bottom gradient name tag */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10 px-4 pb-3 pt-10"
                  style={{
                    background: "linear-gradient(to top, rgba(8,12,16,0.88) 0%, transparent 100%)",
                  }}
                >
                  <p className="mono-label" style={{ color: "rgba(232,237,245,0.50)" }}>
                    Karachi, Pakistan · NED University of Engineering & Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="mono-label" style={{ fontSize: "0.58rem" }}>
            scroll
          </span>
          <span className="h-6 w-px" style={{ background: "var(--border)" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TICKER — scrolling tech tags
══════════════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "React",
  "TypeScript",
  "Node.js",
  "WebRTC",
  "Yjs CRDT",
  "Docker",
  "PostgreSQL",
  "Redis",
  "Three.js",
  "GLSL",
  "libsodium",
  "D3.js",
  "Monaco Editor",
  "Socket.IO",
  "React-Konva",
  "MongoDB",
  "WebRTC",
  "React Three Fiber",
  "GSAP",
  "Zustand",
  "Vite",
  "Tailwind CSS",
  "Express",
  "React",
  "TypeScript",
  "Node.js",
  "WebRTC",
  "Yjs CRDT",
  "Docker",
  "PostgreSQL",
  "Redis",
  "Three.js",
  "GLSL",
  "libsodium",
  "D3.js",
  "Monaco Editor",
  "Socket.IO",
  "React-Konva",
  "MongoDB",
  "WebRTC",
  "React Three Fiber",
  "GSAP",
  "Zustand",
  "Vite",
  "Tailwind CSS",
  "Express",
];

function Ticker() {
  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{ borderColor: "var(--border)", background: "rgba(0,229,195,0.024)" }}
    >
      <div className="ticker-track flex items-center gap-8" style={{ width: "max-content" }}>
        {TICKER_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="mono-label whitespace-nowrap text-foreground/60">{item}</span>
            <span
              className="h-1 w-1 rounded-full shrink-0"
              style={{ background: "var(--cyan)", opacity: 0.4 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK — project grid with Live Demo + GitHub links
══════════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mono-label-accent mb-3">Selected work</p>
            <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
              What I've built
            </h2>
          </div>
          <span className="mono-label text-foreground/30">{projects.length} projects</span>
        </div>
      </Reveal>

      <div className="proj-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div
        className="proj-cell group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cover image — links to detail page */}
        <Link to="/work/$slug" params={{ slug: project.slug }} className="block">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <img
              src={project.cover}
              alt={project.title}
              className="proj-cover-img h-full w-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,12,16,0.95) 0%, rgba(8,12,16,0.3) 50%, transparent 100%)",
              }}
            />
            {/* Cyan tint on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,195,0.06) 0%, transparent 60%)",
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="mono-label-accent">{project.index}</span>
                  <span className="mono-label opacity-50">·</span>
                  <span className="mono-label">{project.category}</span>
                </div>

                <h3 className="font-display text-xl font-bold leading-tight text-foreground lg:text-2xl">
                  {project.title}
                </h3>

                <p
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  style={{
                    maxHeight: hovered ? "4rem" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.stack.slice(0, 4).map((t) => (
                    <span key={t} className="tag-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Action bar — Live Demo + GitHub links */}
        <div
          className="flex items-center justify-between border-t px-6 py-3"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="mono-label transition-colors"
            style={{ color: "rgba(232,237,245,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,237,245,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,237,245,0.35)")}
          >
            Case study →
          </Link>

          <div className="flex items-center gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 mono-label transition-colors"
                style={{ color: "var(--cyan)" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                title="Live Demo"
              >
                {/* Globe/live icon */}
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5M1.5 8h13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                Live Demo ↗
              </a>
            ) : (
              <span className="mono-label" style={{ color: "rgba(232,237,245,0.18)" }}>
                No live demo
              </span>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 mono-label transition-opacity"
                style={{ color: "rgba(232,237,245,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,237,245,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,237,245,0.55)")}
                title="GitHub Repository"
              >
                {/* GitHub icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub ↗
              </a>
            ) : (
              <span className="mono-label" style={{ color: "rgba(232,237,245,0.18)" }}>
                Private repo
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   STACK — technical capabilities table
══════════════════════════════════════════════════════════════ */
const STACK_ROWS = [
  {
    area: "Frontend",
    items: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "D3.js", "Zustand", "React-Konva"],
  },
  {
    area: "WebGL / 3D",
    items: ["Three.js", "React Three Fiber", "GLSL", "GSAP", "BufferGeometry", "Custom Shaders"],
  },
  {
    area: "Real-Time",
    items: ["Yjs CRDTs", "Socket.IO", "WebRTC DataChannels", "WebSocket", "Monaco Editor"],
  },
  {
    area: "Backend",
    items: ["Node.js", "Express", "REST API Design", "JWT Auth", "Docker", "Nginx"],
  },
  {
    area: "Data",
    items: ["PostgreSQL", "Prisma ORM", "MongoDB", "Mongoose", "Redis", "Upstash"],
  },
  {
    area: "Security",
    items: ["libsodium (X25519, XChaCha20-Poly1305)", "RBAC", "httpOnly cookies", "DTLS-SRTP"],
  },
  {
    area: "Infra",
    items: ["Railway", "Vercel", "Neon PostgreSQL", "Docker Compose", "GitHub Actions", "Netlify"],
  },
];

function Stack() {
  return (
    <section
      id="stack"
      className="border-t"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-14">
            <p className="mono-label-accent mb-3">Capabilities</p>
            <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
              Full stack,
              <br />
              <span className="text-gradient">top to bottom</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-lg" style={{ border: "1px solid var(--border)" }}>
            {STACK_ROWS.map((row, i) => (
              <div
                key={row.area}
                className="grid items-start transition-colors duration-200 hover:bg-accent"
                style={{
                  gridTemplateColumns: "10rem 1fr",
                  borderBottom: i < STACK_ROWS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="px-6 py-5" style={{ borderRight: "1px solid var(--border)" }}>
                  <span className="mono-label-accent">{row.area}</span>
                </div>
                <div className="flex flex-wrap gap-2 px-6 py-5">
                  {row.items.map((item) => (
                    <span key={item} className="tag-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Experience line */}
        <Reveal delay={160}>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <ExperienceCard
              org="CoreTech Innovations"
              role="Frontend Development Intern"
              type="Remote · Oct – Nov 2025"
              note="Built 8 reusable React components for a responsive dashboard, deployed to Netlify. Collaborated async in a remote-first team on UI delivery."
            />
            <ExperienceCard
              org="EVsim"
              role="Simulation & Modelling Intern"
              type="Remote · Oct – Dec 2025"
              note="Developed 20+ electric motor simulation scenarios in MATLAB/Xcos. Produced technical documentation and validation reports."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceCard({
  org,
  role,
  type,
  note,
}: {
  org: string;
  role: string;
  type: string;
  note: string;
}) {
  return (
    <div
      className="relative rounded-lg p-6 transition-colors hover:bg-accent"
      style={{ border: "1px solid var(--border)" }}
    >
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />
      <p className="mono-label-accent mb-2">{type}</p>
      <h3 className="font-display text-lg font-bold text-foreground">{org}</h3>
      <p className="mono-label mt-1">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT — bio text + terminal widget (portrait removed from here)
══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_28rem] lg:items-start">
            {/* Text */}
            <div>
              <p className="mono-label-accent mb-4">About</p>
              <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
                I write the code
                <br />
                <span className="text-gradient">nobody else wants to</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I'm Shahzad, Computer Science graduate from NED University in Karachi. I build
                  things at the hard end of the browser. Real-time collaboration engines, applied
                  cryptography over raw WebRTC, and cinematic WebGL rendering pipelines with custom
                  GLSL shaders.
                </p>
                <p>
                  Five shipped projects spanning compilers (regex builder with Thompson NFA →
                  Hopcroft DFA), real-time systems (collaborative whiteboard, Collab IDE with CRDT
                  sync and kernel-isolated Docker execution), security (P2P E2E-encrypted file
                  transfer with libsodium), and 3D data visualization (WebGL Earth globe).
                </p>
                <p>
                  Two remote internships at CoreTech Innovations and EVsim. Meta, HKUST, and Google
                  Cloud certified. Open to software engineering, backend, or full-stack roles in
                  Karachi or remote.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:shehzadres@gmail.com" className="btn-sys">
                  shehzadres@gmail.com
                </a>
                <a
                  href="https://github.com/shehzadres"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-sys"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Terminal widget — replaces portrait here */}
            <Reveal delay={100}>
              <div className="flex flex-col gap-4">
                <p className="mono-label text-foreground/30 mb-1">// how the sausage gets made</p>
                <TerminalWidget />

                {/* Certifications mini-strip */}
                <div
                  className="rounded-lg p-5 mt-2"
                  style={{
                    border: "1px solid var(--border)",
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  <p className="mono-label-accent mb-3">Certifications</p>
                  <div className="space-y-2">
                    {[
                      "Meta — Front-End Developer Professional Certificate",
                      "HKUST — Full-Stack Web Development",
                      "Google Cloud — Associate Cloud Engineer",
                    ].map((cert) => (
                      <div key={cert} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--cyan)" }}
                        />
                        <span className="text-sm text-muted-foreground">{cert}</span>
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
