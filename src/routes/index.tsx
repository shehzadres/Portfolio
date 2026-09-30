import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, Brain, Briefcase, Code, Container, Database,
  Github, GraduationCap, MapPin, Monitor, Server, type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CountUp, Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/projects";
import portraitSrc from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({ component: Index });

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;
const clean = (s: string) => s.replace(/\s*[^\x00-\x7F]\s*/g, " / ");

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Experience />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionHead({ title, aside }: { title: string; aside?: string }) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {aside && <p className="hidden pb-1 text-sm text-muted-foreground sm:block">{aside}</p>}
    </Reveal>
  );
}

const chip =
  "bob absolute flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm font-medium shadow-[var(--shadow-lift)]";

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-10 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16 lg:pb-24">
      <div>
        <h1 className="enter max-w-2xl text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-6xl" style={d(0)}>
          I build software that pushes <span className="mark">what a browser can do.</span>
        </h1>
        <p className="enter mt-6 max-w-xl text-lg text-muted-foreground" style={d(1)}>
          Real-time collaboration, applied cryptography, WebGL rendering and full-stack systems, shipped as working products.
        </p>
        <div className="enter mt-8 flex flex-wrap gap-3" style={d(2)}>
          <Button asChild size="lg" className="h-11 rounded-full px-6">
            <a href="#work">View projects <ArrowDown /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-6">
            <a href="/Shahzad_CV.pdf" download>Download CV</a>
          </Button>
        </div>
        <dl className="enter mt-12 grid max-w-md grid-cols-3 divide-x border-y py-5" style={d(3)}>
          {[
            { n: projects.length, label: "Projects shipped" },
            { n: EXP.length, label: "Internships" },
            { n: CERTS.length, label: "Certifications" },
          ].map((s, i) => (
            <div key={s.label} className={i === 0 ? "pr-4" : "px-4"}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight"><CountUp to={s.n} /></dd>
              <dd className="mt-0.5 text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="enter relative mx-auto w-full max-w-sm lg:max-w-none" style={d(2)}>
        <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-primary/50" />
        <img src={portraitSrc} alt="Portrait of Shahzad" className="relative aspect-[4/5] w-full rounded-[2rem] border object-cover object-top" />
        <span className={`${chip} -left-3 top-8`} style={d(0)}><MapPin size={15} className="text-primary" /> Karachi, Pakistan</span>
        <span className={`${chip} -right-3 top-1/2`} style={d(1)}><GraduationCap size={15} className="text-primary" /> NED University, 2026</span>
        <span className={`${chip} -left-3 bottom-10`} style={d(2)}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to full-stack roles
        </span>
      </div>
    </section>
  );
}

function ProjectMeta({ p }: { p: Project }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="font-mono text-primary">{p.index}</span>
      <span>{clean(p.category)}</span>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-2">
      {p.liveUrl && (
        <Button asChild size="sm" className="rounded-full">
          <a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a>
        </Button>
      )}
      {p.githubUrl && (
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <a href={p.githubUrl} target="_blank" rel="noreferrer"><Github /> Source</a>
        </Button>
      )}
    </div>
  );
}

function Featured({ p }: { p: Project }) {
  return (
    <article className="group lift relative grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-[1.2fr_1fr]">
      <div className="zoom overflow-hidden border-b lg:border-r lg:border-b-0">
        <img src={p.cover} alt={`${p.title} cover`} className="aspect-[16/10] h-full w-full object-cover lg:aspect-auto" />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <ProjectMeta p={p} />
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <Link to="/work/$slug" params={{ slug: p.slug }} className="after:absolute after:inset-0">{p.title}</Link>
        </h3>
        <p className="text-muted-foreground">{p.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, 6).map((t) => <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>)}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <Links p={p} />
          <span aria-hidden className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article className="group lift relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card">
      <div className="zoom overflow-hidden border-b">
        <img src={p.cover} alt={`${p.title} cover`} className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <ProjectMeta p={p} />
        <h3 className="text-xl font-semibold tracking-tight">
          <Link to="/work/$slug" params={{ slug: p.slug }} className="after:absolute after:inset-0">{p.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((t) => <Badge key={t} variant="secondary" className="rounded-full text-xs font-normal">{t}</Badge>)}
          {p.stack.length > 4 && <Badge variant="outline" className="rounded-full text-xs font-normal">+{p.stack.length - 4}</Badge>}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <Links p={p} />
          <ArrowRight aria-hidden size={16} className="text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}

function Work() {
  const [first, ...rest] = projects;
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead title="Selected projects" aside={`${projects.length} projects, all shipped`} />
      <Reveal><Featured p={first} /></Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.slug} index={i % 2} className="h-full"><Card p={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}

const STACK: readonly (readonly [string, LucideIcon, readonly string[]])[] = [
  ["Languages", Code, ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C/C++", "GLSL"]],
  ["Frontend", Monitor, ["React.js", "Next.js", "Three.js", "React Three Fiber", "D3.js", "Tailwind CSS", "Vite", "Zustand"]],
  ["Backend", Server, ["Node.js", "Express.js", "Flask", "REST API", "WebSocket", "Socket.IO", "WebRTC", "JWT Auth"]],
  ["Databases", Database, ["PostgreSQL", "MongoDB", "Redis", "SQL Server", "Prisma ORM", "Mongoose"]],
  ["AI / ML", Brain, ["TensorFlow", "Scikit-learn", "YOLO", "OpenCV", "OpenVINO", "ByteTrack", "EasyOCR", "Pandas", "NumPy"]],
  ["DevOps", Container, ["Docker", "Docker Compose", "Git", "GitHub Actions", "Vercel", "Railway", "Netlify"]],
];

function Stack() {
  return (
    <section id="stack" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead title="Stack" aside="From shaders to schema" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map(([area, Icon, items], i) => (
            <Reveal key={area} index={i % 3} className="h-full">
              <div className="lift h-full rounded-2xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(items.length).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{area}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <li key={t} className="rounded-full border bg-background px-2.5 py-1 text-xs">{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXP = [
  { org: "Decodelabs", role: "Full Stack Development Intern", date: "Aug - Sep 2026", note: "Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows.", tags: ["Node.js", "SQL", "REST"] },
  { org: "Progree", role: "Full Stack Development Intern", date: "Jul - Aug 2026", note: "Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries.", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
];

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Experience</h2>
          <p className="mt-3 max-w-xs text-muted-foreground">Two full-stack internships, both in 2026.</p>
        </Reveal>
        <ol className="relative space-y-6 border-l pl-8">
          {EXP.map((e, i) => (
            <li key={e.org} className="relative">
              <span aria-hidden className="absolute top-7 -left-[2.375rem] h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <Reveal index={i}>
                <div className="lift rounded-2xl border bg-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{e.org}</h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground"><Briefcase size={14} /> {e.role}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs">{e.date}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.note}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => <Badge key={t} variant="outline" className="rounded-full text-xs font-normal">{t}</Badge>)}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const CERTS = [
  "Meta: Front-End Developer Professional Certificate",
  "HKUST: Full-Stack Web Development with React",
  "Google Cloud: Machine Learning with TensorFlow",
];

function About() {
  return (
    <section id="about" className="bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead title="About" />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5">
            <p className="text-xl leading-snug font-medium tracking-tight sm:text-2xl">
              I&apos;m Shahzad, a computer science student at NED University in Karachi. I build things at the hard end of the browser: real-time collaboration engines, applied cryptography over raw WebRTC, and cinematic WebGL rendering pipelines with custom GLSL shaders.
            </p>
            <p className="text-muted-foreground">
              My projects span compilers (a regex builder that goes from Thompson NFA to Hopcroft DFA), real-time systems (a collaborative IDE with CRDT sync and Docker-isolated execution), security (peer-to-peer encrypted transfer with libsodium), and 3D data visualization (a WebGL Earth globe).
            </p>
            <p className="text-muted-foreground">
              I&apos;ve completed two full-stack internships, at Progree (B2B SaaS) and Decodelabs (enterprise logistics), and I&apos;m open to software, backend or full-stack roles in Karachi or remote.
            </p>
          </Reveal>
          <div className="space-y-3">
            <Reveal><h3 className="text-sm font-medium text-muted-foreground">Certifications</h3></Reveal>
            {CERTS.map((c, i) => (
              <Reveal key={c} index={i + 1}>
                <div className="lift flex items-center gap-4 rounded-2xl border bg-card p-4 text-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award size={19} />
                  </span>
                  {c}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
