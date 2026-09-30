import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Download, Github, Search } from "lucide-react";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import portrait from "@/assets/portrait.jpg";

const EMAIL = "shehzadres@gmail.com";
const NAV = [
  ["work", "Projects"],
  ["stack", "Stack"],
  ["experience", "Experience"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

export function SiteHeader() {
  const [active, setActive] = useState<string>("work");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <aside className="border-b bg-card lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-80 lg:overflow-y-auto lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-6 p-6 lg:min-h-full lg:p-8">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start">
          <Link to="/" aria-label="Home">
            <img src={portrait} alt="Shahzad" className="h-16 w-16 rounded-2xl border object-cover lg:h-28 lg:w-28" />
          </Link>
          <div>
            <p className="text-xl font-semibold tracking-tight">Shahzad</p>
            <p className="text-sm text-muted-foreground">Full stack engineer, Karachi</p>
          </div>
          <div className="ml-auto flex gap-2 lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label="Sections" className="-mx-1 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`/#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="rounded-md border-l-2 border-transparent px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:bg-accent aria-[current=true]:font-medium aria-[current=true]:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden flex-col gap-2 lg:mt-auto lg:flex">
          <button
            type="button"
            onClick={copy}
            className="flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
          >
            <span className="truncate">{copied ? "Email copied" : EMAIL}</span>
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-muted-foreground" />}
          </button>
          <div className="flex gap-2">
            <a href="/Shahzad_CV.pdf" download className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              <Download size={14} /> CV
            </a>
            <a href="https://github.com/shehzadres" target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-accent">
              <Github size={16} />
            </a>
            <button type="button" aria-label="Search (Ctrl K)" onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))} className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-accent">
              <Search size={16} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}