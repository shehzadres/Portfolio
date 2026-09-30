import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronLeft, Lightbulb } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectGallery } from "@/components/project-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        <h1 className="text-3xl font-bold tracking-tight">Project not found</h1>
        <Link to="/" hash="work" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">Back to projects</Link>
      </div>
    </div>
  ),
});

const clean = (s: string) => s.replace(/\s*[^\x00-\x7F]\s*/g, " / ");

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-xl font-semibold tracking-tight">{children}</h2>;
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const next: Project = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="lg:pl-80">
        <main className="max-w-4xl space-y-14 px-6 py-10 lg:px-12 lg:py-16">
          <Link to="/" hash="work" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft size={16} /> All projects
          </Link>

          <header className="enter space-y-5">
            <p className="text-sm text-muted-foreground">{clean(p.category)}</p>
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{p.title}</h1>
            <p className="text-lg text-muted-foreground">{p.summary}</p>
            <div className="flex flex-wrap gap-1.5">{p.stack.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
            <div className="flex flex-wrap gap-3">
              {p.liveUrl ? <Button asChild><a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo</a></Button> : <Badge variant="outline">Demo coming soon</Badge>}
              {p.githubUrl && <Button asChild variant="outline"><a href={p.githubUrl} target="_blank" rel="noreferrer">Source code</a></Button>}
            </div>
          </header>

          <img src={p.cover} alt={`${p.title} cover`} className="aspect-[16/9] w-full rounded-xl border object-cover" />

          <section className="grid gap-4 md:grid-cols-2">
            <Card><CardContent className="p-6"><h2 className="mb-2 font-semibold">The problem</h2><p className="text-sm text-muted-foreground">{p.problem}</p></CardContent></Card>
            <Card className="border-primary/40"><CardContent className="p-6"><h2 className="mb-2 font-semibold">The solution</h2><p className="text-sm text-muted-foreground">{p.solution}</p></CardContent></Card>
          </section>

          <section>
            <H2>How it works</H2>
            <ol className="space-y-3">
              {p.architecture.map((a, i) => (
                <li key={i} className="flex gap-4 rounded-lg border bg-card p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                  <p className="text-sm text-muted-foreground">{a}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <H2>Key features</H2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <li key={i} className="flex gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}
                </li>
              ))}
            </ul>
          </section>

          {p.gallery && p.gallery.length > 0 && (
            <section>
              <H2>Screenshots</H2>
              <ProjectGallery images={p.gallery} title={p.title} />
            </section>
          )}

          <section>
            <H2>Engineering challenges</H2>
            <Accordion type="multiple" defaultValue={["c0"]} className="space-y-3">
              {p.challenges.map((c, i) => (
                <AccordionItem key={i} value={`c${i}`} className="rounded-xl border bg-card px-5">
                  <AccordionTrigger className="text-left hover:no-underline">{c.challenge}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{c.solution}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <H2>What I took from it</H2>
            <ul className="space-y-3">
              {p.takeaways.map((t, i) => (
                <li key={i} className="flex gap-3 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" /> {t}
                </li>
              ))}
            </ul>
          </section>

          <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
            <Card className="transition-colors group-hover:border-primary/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Next project</p>
                <p className="mt-1 text-xl font-semibold tracking-tight group-hover:text-primary">{next.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{next.tagline}</p>
              </CardContent>
            </Card>
          </Link>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}