
/* ══════════════════════════════════════════════════════════════
   STACK · technical capabilities
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
    <section id="stack" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
              Full stack, top to bottom
            </h2>
            <p className="mono-label max-w-xs text-right">Six layers, one person. From shaders to schema.</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden" style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}>
            {STACK_ROWS.map((row, i) => (
              <div
                key={row.area}
                className="grid items-start transition-colors duration-200"
                style={{ gridTemplateColumns: "10rem 1fr", borderBottom: i < STACK_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.07)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div className="px-6 py-5" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="mono-label-accent">{row.area}</span>
                </div>
                <div className="flex flex-wrap gap-2 px-6 py-5">
                  {row.items.map((item) => <span key={item} className="tag-badge">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Experience */}
        <Reveal delay={160}>
          <div
            className="mt-16 grid overflow-hidden md:grid-cols-[1.2fr_1fr]"
            style={{ gap: "1px", borderRadius: "16px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <ExperienceCard org="Decodelabs" role="Full Stack Development Intern" type="Aug – Sep 2026"
              note="Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows."
              emphasis />
            <ExperienceCard org="Progree" role="Full Stack Development Intern" type="Jul – Aug 2026"
              note="Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceCard({ org, role, type, note, emphasis = false }: { org: string; role: string; type: string; note: string; emphasis?: boolean; }) {
  return (
    <div
      className={`relative p-6 lg:p-8 ${emphasis ? "" : "flex flex-col justify-center"}`}
      style={{ background: "rgba(5,9,24,0.6)", backdropFilter: "blur(16px)", transition: "background 0.3s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(5,9,24,0.6)")}
    >
      {emphasis ? (
        <>
          <h3 className="font-display text-2xl font-bold text-foreground lg:text-3xl">{org}</h3>
          <p className="mono-label-accent mt-2">{role}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "#7C8DB0" }}>{note}</p>
          <p className="mono-label mt-5">{type}</p>
        </>
      ) : (
        <>
          <p className="mono-label">{type}</p>
          <h3 className="font-display mt-2 text-lg font-bold text-foreground">{org}</h3>
          <p className="mono-label-accent mt-1">{role}</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#7C8DB0" }}>{note}</p>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[1fr_28rem] lg:items-start">
            {/* Text */}
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">
                <span style={{ color: "#7C8DB0" }}>About</span>
                {": I write the code nobody else wants to"}
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
                  Hopcroft DFA), real-time systems (collaborative whiteboard, Collab IDE with
                  CRDT sync and kernel-isolated Docker execution), security (P2P E2E-encrypted
                  file transfer with libsodium), and 3D data visualization (WebGL Earth globe).
                </p>
                <p>
                  Two full-stack internships at Progree (B2B SaaS) and Decodelabs (enterprise
                  logistics). Meta, HKUST, and Google Cloud certified. Open to software
                  engineering, backend, or full-stack roles in Karachi or remote.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:shehzadres@gmail.com" className="btn-glow">shehzadres@gmail.com</a>
                <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" className="btn-ghost-sys">GitHub ↗</a>
              </div>
            </div>

            {/* Terminal + certs */}
            <Reveal delay={100}>
              <div className="flex flex-col gap-4">
                <p className="mono-label mb-1" style={{ color: "rgba(124,58,237,0.6)" }}>// how the sausage gets made</p>
                <TerminalWidget />

                {/* Certifications */}
                <div
                  className="rounded-2xl p-5 mt-2"
                  style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
                >
                  <p className="mono-label-accent mb-3">Certifications</p>
                  <div className="space-y-2">
                    {[
                      "Meta: Front-End Developer Professional Certificate",
                      "HKUST: Full-Stack Web Development with React",
                      "Google Cloud: Machine Learning with TensorFlow",
                    ].map((cert) => (
                      <div key={cert} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#7C3AED" }} />
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
