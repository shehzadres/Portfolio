import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Home,
  User,
  FolderGit2,
  Wrench,
  Mail,
  Github,
  ExternalLink,
  SunMoon,
  ArrowRight,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { projects } from "@/lib/projects";
import { useTheme } from "@/hooks/use-theme";

const EMAIL = "shehzadres@gmail.com";
const GITHUB = "https://github.com/shehzadres";

export const OPEN_COMMAND_PALETTE = "open-command-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toggle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    requestAnimationFrame(fn);
  }, []);

  const goToSection = useCallback(
    (hash: string) =>
      run(() => {
        navigate({ to: "/", hash }).then(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }),
    [navigate, run],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, projects, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => goToSection("about")}>
            <User />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => goToSection("work")}>
            <FolderGit2 />
            <span>Selected Work</span>
          </CommandItem>
          <CommandItem onSelect={() => goToSection("stack")}>
            <Wrench />
            <span>Stack</span>
          </CommandItem>
          <CommandItem onSelect={() => goToSection("contact")}>
            <Mail />
            <span>Contact</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate({ to: "/" }))}>
            <Home />
            <span>Home</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.slug}
              value={`${project.title} ${project.shortTitle} ${project.category}`}
              onSelect={() =>
                run(() => navigate({ to: "/work/$slug", params: { slug: project.slug } }))
              }
            >
              <ArrowRight />
              <span>{project.shortTitle}</span>
              <CommandShortcut>{project.index}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem value="toggle theme dark light" onSelect={() => run(toggle)}>
            <SunMoon />
            <span>Toggle theme</span>
          </CommandItem>
          <CommandItem
            value="email contact hire"
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${EMAIL}`;
              })
            }
          >
            <Mail />
            <span>Email me</span>
            <CommandShortcut>{EMAIL}</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="github source code"
            onSelect={() => run(() => window.open(GITHUB, "_blank", "noreferrer"))}
          >
            <Github />
            <span>GitHub</span>
            <ExternalLink className="ml-auto opacity-50" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
