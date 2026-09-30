import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Menu, Search } from "lucide-react";
import { OPEN_COMMAND_PALETTE } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollProgress } from "@/components/motion";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import portrait from "@/assets/portrait.jpg";

const NAV = [
  ["work", "Projects"],
  ["stack", "Stack"],
  ["experience", "Experience"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

export function SiteHeader() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? "border-border bg-background/90 backdrop-blur" : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
          <Link to="/" aria-label="Home" className="flex items-center gap-3">
            <img src={portrait} alt="" className="h-9 w-9 rounded-full border object-cover object-top" />
            <span className="text-[0.95rem] leading-none font-semibold tracking-tight">
              Shahzad
              <span className="mt-1 block text-[0.7rem] font-normal text-muted-foreground">Full stack engineer</span>
            </span>
          </Link>

          <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`/#${id}`}
                aria-current={active === id ? "true" : undefined}
                className="relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:bg-secondary aria-[current=true]:font-medium aria-[current=true]:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <button
              type="button"
              aria-label="Search (Ctrl K)"
              onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
              className="hidden h-9 items-center gap-2 rounded-full border bg-card px-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Search size={14} />
              <kbd className="font-mono text-[0.68rem]">Ctrl K</kbd>
            </button>
            <a
              href="https://github.com/shehzadres"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Github size={16} />
            </a>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" aria-label="Open menu" className="flex h-9 w-9 items-center justify-center rounded-full border bg-card md:hidden">
                  <Menu size={17} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background">
                <SheetTitle className="text-base">Menu</SheetTitle>
                <nav aria-label="Mobile sections" className="mt-6 flex flex-col gap-1">
                  {NAV.map(([id, label]) => (
                    <SheetClose asChild key={id}>
                      <a href={`/#${id}`} className="rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary">
                        {label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
