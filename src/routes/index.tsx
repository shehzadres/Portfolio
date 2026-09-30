import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({ component: Index });

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;
const clean = (s: string) => s.replace(/\s*[^\x00-\x7F]\s*/g, " / ");

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="lg:pl-80">
        <main>
          <Hero />
          <Work />
          <Stack />
          <Experience />
          <About />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

const FACTS = [
  { Icon: MapPin, label: "Based in", value: "Karachi, Pakistan" },
  { Icon: GraduationCap, label: "Studying", value: "Computer Science, NED University, 2026" },
  { Icon: Briefcase, label: "Looking for", value: "Software, backend or full-stack roles" },
];

function Hero() {
  return (
    <section className="px-6 pt-10 pb-16 lg:px-12 lg:pt-20">
      <p className="enter inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm" style={d(0)}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Available now, Karachi or remote
      </p>
      <h1 className="enter mt-6 max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl" style={d(1)}>
        I build software that pushes what a browser can do.
      </h1>
      <p className="enter mt-5 max-w-2xl text-lg text-muted-foreground" style={d(2)}>
        Real-time collaboration, applied cryptography, WebGL rendering and full-stack systems, shipped as working products.
      </p>
      <div className="enter mt-8 flex flex-wrap gap-3" style={d(3)}>
        <Button asChild size="lg"><a href="#work">View projects</a></Button>
        <Button asChild size="lg" variant="outline"><a href="/Shahzad_CV.pdf" download>Download CV</a></Button>
      </div>
      <div className="enter mt-12 grid gap-4 sm:grid-cols-3" style={d(4)}>
        {FACTS.map(({ Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="flex gap-3 p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-t px-6 py-16 lg:px-12">
      <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
      <p className="mt-1 mb-8 text-muted-foreground">Pick a project to preview it, then open the full case study.</p>
      <Tabs defaultValue={projects[0].slug} orientation="vertical" className="grid gap-6 xl:grid-cols-[15rem_1fr]">
        <TabsList className="h-auto flex-row gap-1 overflow-x-auto bg-transparent p-0 xl:flex-col xl:items-stretch">
          {projects.map((p) => (
            <TabsTrigger
              key={p.slug}
              value={p.slug}
              className="h-auto shrink-0 justify-start rounded-lg border border-transparent px-3 py-2.5 text-left data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <span>
                <span className="block text-sm font-semibold">{p.shortTitle}</span>
                <span className="hidden text-xs font-normal text-muted-foreground xl:block">{clean(p.category)}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {projects.map((p) => (
          <TabsContent key={p.slug} value={p.slug} className="mt-0">
            <Card className="pane overflow-hidden">
              <div className="group overflow-hidden border-b">
                <img src={p.cover} alt={`${p.title} cover`} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <CardContent className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 7).map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild size="sm"><Link to="/work/$slug" params={{ slug: p.slug }}>Read case study</Link></Button>
                  {p.liveUrl && <Button asChild size="sm" variant="outline"><a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo</a></Button>}
                  {p.githubUrl && <Button asChild size="sm" variant="outline"><a href={p.githubUrl} target="_blank" rel="noreferrer">Source code</a></Button>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

const STACK = [
  ["Languages", ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C/C++", "GLSL"]],
  ["Frontend", ["React.js", "Next.js", "Three.js", "React Three Fiber", "D3.js", "Tailwind CSS", "Vite", "Zustand"]],
  ["Backend", ["Node.js", "Express.js", "Flask", "REST API", "WebSocket", "Socket.IO", "WebRTC", "JWT Auth"]],
  ["Databases", ["PostgreSQL", "MongoDB", "Redis", "SQL Server", "Prisma ORM", "Mongoose"]],
  ["AI / ML", ["TensorFlow", "Scikit-learn", "YOLO", "OpenCV", "OpenVINO", "ByteTrack", "EasyOCR", "Pandas", "NumPy"]],
  ["DevOps", ["Docker", "Docker Compose", "Git", "GitHub Actions", "Vercel", "Railway", "Netlify"]],
] as const;

function Stack() {
  return (
    <section id="stack" className="border-t px-6 py-16 lg:px-12">
      <h2 className="text-2xl font-semibold tracking-tight">Stack</h2>
      <p className="mt-1 mb-8 text-muted-foreground">From shaders to schema. Choose a layer.</p>
      <Tabs defaultValue="Languages">
        <TabsList className="h-auto flex-wrap justify-start">
          {STACK.map(([area, items]) => (
            <TabsTrigger key={area} value={area}>{area} <span className="ml-1.5 text-xs text-muted-foreground">{items.length}</span></TabsTrigger>
          ))}
        </TabsList>
        {STACK.map(([area, items]) => (
          <TabsContent key={area} value={area}>
            <div className="pane flex flex-wrap gap-2 rounded-xl border bg-card p-5">
              {items.map((t) => <Badge key={t} variant="outline" className="px-3 py-1 text-sm font-medium">{t}</Badge>)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

const EXP = [
  { org: "Decodelabs", role: "Full Stack Development Intern", date: "Aug - Sep 2026", note: "Developed features for an enterprise logistics and order management platform. Built RESTful APIs with Node.js and SQL, implemented data validation, filtering, pagination, and transactional DB operations for core business workflows." },
  { org: "Progree", role: "Full Stack Development Intern", date: "Jul - Aug 2026", note: "Contributed to a multi-tenant B2B SaaS platform using Next.js, TypeScript, Node.js, and PostgreSQL. Implemented RBAC-based access control, REST APIs, and server-side validation across organization and role boundaries." },
];

function Experience() {
  return (
    <section id="experience" className="border-t px-6 py-16 lg:px-12">
      <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
      <Accordion type="single" collapsible defaultValue={EXP[0].org} className="mt-8 max-w-3xl space-y-3">
        {EXP.map((e) => (
          <AccordionItem key={e.org} value={e.org} className="rounded-xl border bg-card px-5 data-[state=open]:shadow-sm">
            <AccordionTrigger className="hover:no-underline">
              <div className="text-left">
                <p className="font-semibold">{e.org}</p>
                <p className="text-sm font-normal text-muted-foreground">{e.role}, {e.date}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{e.note}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
    <section id="about" className="border-t px-6 py-16 lg:px-12">
      <h2 className="text-2xl font-semibold tracking-tight">About</h2>
      <div className="mt-8 grid gap-10 xl:grid-cols-[1.4fr_1fr]">
        <div className="max-w-2xl space-y-4 text-muted-foreground">
          <p>I&apos;m Shahzad, a computer science student at NED University in Karachi. I build things at the hard end of the browser: real-time collaboration engines, applied cryptography over raw WebRTC, and cinematic WebGL rendering pipelines with custom GLSL shaders.</p>
          <p>My projects span compilers (a regex builder that goes from Thompson NFA to Hopcroft DFA), real-time systems (a collaborative IDE with CRDT sync and Docker-isolated execution), security (peer-to-peer encrypted transfer with libsodium), and 3D data visualization (a WebGL Earth globe).</p>
          <p>I&apos;ve completed two full-stack internships, at Progree (B2B SaaS) and Decodelabs (enterprise logistics), and I&apos;m open to software, backend or full-stack roles in Karachi or remote.</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium">Certifications</p>
          {CERTS.map((c) => (
            <Card key={c} className="transition-colors hover:border-primary/50">
              <CardContent className="flex items-center gap-3 p-4 text-sm">
                <Award className="h-5 w-5 shrink-0 text-primary" /> {c}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}