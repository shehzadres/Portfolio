import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion";

const EMAIL = "shehzadres@gmail.com";

export function SiteFooter() {
  const [copied, setCopied] = useState(false);

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
    <footer id="contact" className="px-5 pt-10 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid gap-10 rounded-[1.75rem] bg-foreground p-8 text-background sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Open to full-time roles in Karachi or remote.
              </h2>
              <p className="mt-4 max-w-lg text-background/70">
                I&apos;m available now for software engineering work. Email is the fastest way to reach me.
              </p>
              <button
                type="button"
                onClick={copy}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-primary py-3 pr-4 pl-6 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {copied ? "Copied to clipboard" : EMAIL}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/20">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </span>
              </button>
            </div>

            <ul className="grid gap-2 text-sm">
              {[
                { href: `mailto:${EMAIL}`, Icon: ArrowUpRight, label: "Send an email" },
                { href: "tel:+923126423009", Icon: Phone, label: "+92 312 6423009" },
                { href: "https://github.com/shehzadres", Icon: Github, label: "github.com/shehzadres", ext: true },
                { href: "https://linkedin.com/in/shehzadres", Icon: Linkedin, label: "linkedin.com/in/shehzadres", ext: true },
                { href: "/Shahzad_CV.pdf", Icon: Download, label: "Download CV", dl: true },
              ].map(({ href, Icon, label, ext, dl }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    {...(dl ? { download: true } : {})}
                    className="flex items-center justify-between rounded-xl border border-background/15 px-4 py-3 transition-colors hover:border-background/40 hover:bg-background/10"
                  >
                    {label}
                    <Icon size={15} className="text-background/60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Shahzad. Built with React and TanStack Start.
        </p>
      </div>
    </footer>
  );
}
