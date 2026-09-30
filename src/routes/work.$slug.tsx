import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, Lightbulb } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProject, projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found | Shahzad" }, { name: "robots", content: "noindex" }] };
    const { project } = loaderData;
    const title = `${project.title} | Shahzad`;
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
    <div className="flex min-h-screen items-center justify-center px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Project not found</h1>
        <Link to="/" hash="work" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">Back to projects</Link>
      </div>
    </div>
  ),
});

const clean = (s: string) => s.replace(/\s*[^\x00-\x7F]\s*/g, " / ");

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-2xl font-semibold tracking-tight">{children}</h2>;
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const next: Project = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  const facts = [
    { k: "Category", v: clean(p.category) },
    ...(p.year ? [{ k: "Year", v: p.year }] : []),
    { k: "Technologies", v: `${p.stack.length}` },
    { k: "Key features", v: `${p.features.length}` },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl space-y-16 px-5 py-10 sm:px-8 lg:py-16">
        <Link to="/" hash="work" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All projects
        </Link>

        <header className="enter space-y-6">
          <p className="font-mono text-sm text-primary">{p.index}</p>
          <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">{p.title}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
          <div className="flex flex-wrap gap-3">
            {p.liveUrl ? (
              <Button asChild className="h-10 rounded-full px-5"><a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a></Button>
            ) : (
              <Badge variant="outline" className="rounded-full px-3 py-1.5 font-normal">Demo coming soon</Badge>
            )}
            {p.githubUrl && (
              <Button asChild variant="outline" className="h-10 rounded-full px-5"><a href={p.githubUrl} target="_blank" rel="noreferrer"><Github /> Source code</a></Button>
            )}
          </div>
        </header>

        <Reveal>
          <img src={p.cover} alt={`${p.title} cover`} className="aspect-[16/9] w-full rounded-3xl border object-cover" />
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="rounded-2xl border bg-card p-4">
                <dt className="text-xs text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 text-sm font-semibold">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((t) => <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>)}
          </div>
        </Reveal>

        <section className="grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border bg-card p-7">
              <h2 className="mb-3 text-lg font-semibold">The problem</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.problem}</p>
            </div>
          </Reveal>
          <Reveal index={1} className="h-full">
            <div className="h-full rounded-3xl border border-primary/40 bg-primary/5 p-7">
              <h2 className="mb-3 text-lg font-semibold">The solution</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.solution}</p>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal><H2>How it works</H2></Reveal>
          <ol className="relative space-y-4 border-l pl-8">
            {p.architecture.map((a: string, i: number) => (
              <li key={i} className="relative">
                <span aria-hidden className="absolute top-4 -left-[2.75rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-4 ring-background">{i + 1}</span>
                <Reveal>
                  <p className="rounded-2xl border bg-card p-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <Reveal><H2>Key features</H2></Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.features.map((f: string, i: number) => (
              <Reveal as="li" key={i} index={i % 2} className="lift flex gap-3 rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={12} /></span> {f}
              </Reveal>
            ))}
          </ul>
        </section>

        {p.gallery && p.gallery.length > 0 && (
          <section>
            <Reveal><H2>Screenshots</H2></Reveal>
            <ProjectGallery images={p.gallery} title={p.title} />
          </section>
        )}

        <section>
          <Reveal><H2>Engineering challenges</H2></Reveal>
          <Accordion type="multiple" defaultValue={["c0"]} className="space-y-3">
            {p.challenges.map((c: { challenge: string; solution: string }, i: number) => (
              <AccordionItem key={i} value={`c${i}`} className="rounded-2xl border bg-card px-5 data-[state=open]:border-primary/40">
                <AccordionTrigger className="text-left hover:no-underline">{c.challenge}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{c.solution}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <Reveal><H2>What I took from it</H2></Reveal>
          <ul className="space-y-3">
            {p.takeaways.map((t: string, i: number) => (
              <Reveal as="li" key={i} className="flex gap-3 rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal>
          <Link to="/work/$slug" params={{ slug: next.slug }} className="group lift block rounded-3xl border bg-card p-7 sm:p-9">
            <p className="text-sm text-muted-foreground">Next project</p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{next.title}</p>
              <ArrowRight className="shrink-0 text-primary transition-transform group-hover:translate-x-1.5" />
            </div>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{next.tagline}</p>
          </Link>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
