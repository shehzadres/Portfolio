import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ProjectGallery } from "@/components/project-gallery";
import { getProject, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found · Shahzad" }, { name: "robots", content: "noindex" }] };
    const { project } = loaderData;
    const title = `${project.title} · Shahzad`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div>
        <p className="mono-label-accent mb-4">404</p>
        <h1 className="font-display text-5xl font-bold text-foreground">Project not found</h1>
        <Link to="/" hash="work" className="mono-label-accent mt-8 inline-block hover:underline">
          ← Work
        </Link>
      </div>
    </div>
  ),
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <CaseHero project={project} />
        <CaseBody project={project} />
        <NextProject next={next} />
      </main>
      <SiteFooter />
    </div>
  );
}

function CaseHero({ project }: { project: Project }) {
  return (
    <section className="relative border-b" style={{ borderColor: "var(--border)" }}>
      {/* Cyan glow strip at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--cyan), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-14">
          <Link to="/" hash="work" className="mono-label glow-link">
            ← Work
          </Link>
          <span className="mono-label opacity-30">/</span>
          <span className="mono-label">{project.index}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="mono-label-accent mb-4">{project.category}</p>
            <h1
              className="animate-rise font-display font-bold text-foreground"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
              }}
            >
              {project.title}
            </h1>
            <p className="animate-rise-1 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <div className="animate-rise-2 mt-8 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-sys">
                  View live ↗
                </a>
              ) : (
                <span className="mono-label opacity-40">Demo soon</span>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-sys"
                >
                  Source ↗
                </a>
              )}
            </div>
          </div>

          {/* Stack column */}
          <div
            className="rounded-lg p-5"
            style={{ border: "1px solid var(--border)", background: "var(--card)" }}
          >
            <p className="mono-label-accent mb-4">Built with</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="tag-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cover */}
        <div
          className="mt-14 overflow-hidden rounded-lg"
          style={{
            border: "1px solid rgba(0,229,195,0.15)",
            boxShadow: "0 0 60px -10px rgba(0,229,195,0.08)",
          }}
        >
          <img
            src={project.cover}
            alt={`${project.title} cover`}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function CaseBody({ project }: { project: Project }) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      {/* Problem / Solution */}
      <Section num="01" label="Context" title="Problem & solution" variant="quiet" density="tight">
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <DataBlock label="The problem" text={project.problem} muted />
          <DataBlock label="The solution" text={project.solution} />
        </div>
      </Section>

      {/* Architecture */}
      <Section num="02" label="System" title="Architecture" variant="num">
        <div className="overflow-hidden rounded-lg" style={{ border: "1px solid var(--border)" }}>
          {project.architecture.map((item, i) => (
            <div
              key={i}
              className="grid items-start transition-colors hover:bg-accent"
              style={{
                gridTemplateColumns: "3.5rem 1fr",
                borderBottom:
                  i < project.architecture.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="flex items-start justify-center px-4 py-5">
                <span className="mono-label-accent">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p
                className="border-l py-5 pr-6 pl-5 text-[0.95rem] leading-relaxed text-muted-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features: a running numbered list, not a grid of identical cards */}
      <Section num="03" label="Detail" title="Key features" variant="run-in" density="airy">
        <ol className="divide-y" style={{ borderColor: "var(--border)" }}>
          {project.features.map((f, i) => (
            <li
              key={i}
              className="flex gap-6 py-5 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="font-display shrink-0 text-3xl font-bold leading-none opacity-25"
                style={{ minWidth: "2.5ch" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-[0.95rem] leading-relaxed text-muted-foreground">{f}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <Section num="04" label="Gallery" title="Screenshots" variant="num">
          <ProjectGallery images={project.gallery} title={project.title} />
        </Section>
      )}

      {/* Challenges: a log, not a stack of feature cards */}
      <Section num="05" label="Hard parts" title="Engineering challenges" variant="quiet" density="airy">
        <div className="relative space-y-0 pl-6" style={{ borderLeft: "1px solid var(--border)" }}>
          {project.challenges.map((c, i) => (
            <div key={i} className="relative py-6 first:pt-0 last:pb-0">
              <span
                className="absolute top-6 -left-[calc(1.5rem+3.5px)] h-[7px] w-[7px] rounded-full"
                style={{ background: "var(--cyan)" }}
              />
              <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                {c.challenge}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {c.solution}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Takeaways: a flowing list with dividers, not N bordered boxes */}
      <Section num="06" label="Reflection" title="Takeaways" variant="run-in">
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {project.takeaways.map((t, i) => (
            <li key={i} className="flex gap-5 py-5 first:pt-0 last:pb-0">
              <span className="font-mono text-sm" style={{ color: "var(--cyan)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{t}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function DataBlock({ label, text, muted = false }: { label: string; text: string; muted?: boolean }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        border: "1px solid var(--border)",
        background: muted ? "transparent" : "var(--card)",
      }}
    >
      <p className={muted ? "mono-label mb-3" : "mono-label-accent mb-3"}>{label}</p>
      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Section({
  num,
  label,
  title,
  variant = "num",
  density = "normal",
  children,
}: {
  num: string;
  label: string;
  title: string;
  variant?: "num" | "quiet" | "run-in";
  density?: "tight" | "normal" | "airy";
  children: React.ReactNode;
}) {
  const pad =
    density === "tight" ? "py-12 lg:py-16" : density === "airy" ? "py-20 lg:py-32" : "py-16 lg:py-24";

  if (variant === "run-in") {
    // Number folded straight into the heading line, no separate eyebrow row.
    return (
      <section className={`border-t ${pad}`} style={{ borderColor: "var(--border)" }}>
        <Reveal>
          <h2 className="mb-10 flex items-baseline gap-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
            <span className="font-mono text-lg font-normal" style={{ color: "var(--cyan)" }}>
              {num}
            </span>
            {title}
          </h2>
          {children}
        </Reveal>
      </section>
    );
  }

  if (variant === "quiet") {
    // No number at all here, a small right-aligned note instead, understated.
    return (
      <section className={`border-t ${pad}`} style={{ borderColor: "var(--border)" }}>
        <Reveal>
          <div className="mb-10 grid gap-2 md:grid-cols-[1fr_12rem] md:items-end">
            <h2 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {title}
            </h2>
            <p className="mono-label md:text-right">{label}</p>
          </div>
          {children}
        </Reveal>
      </section>
    );
  }

  // "num": the original numbered-manifest-line treatment, now used sparingly.
  return (
    <section className={`border-t ${pad}`} style={{ borderColor: "var(--border)" }}>
      <Reveal>
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 className="font-display text-3xl font-bold text-foreground lg:text-4xl">{title}</h2>
          <span className="mono-label">
            {num} · {label}
          </span>
        </div>
        {children}
      </Reveal>
    </section>
  );
}

function NextProject({ next }: { next: Project }) {
  return (
    <section
      className="border-t"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="mono-label-accent mb-4">Next project · {next.index}</p>
          <h2
            className="font-display font-bold text-foreground transition-colors group-hover:text-primary"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            {next.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{next.tagline}</p>
          <span className="mono-label-accent mt-8 inline-block transition-all group-hover:translate-x-1">
            Read case study →
          </span>
        </div>
      </Link>
    </section>
  );
}
