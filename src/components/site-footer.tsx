import { Github, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMAIL = "shehzadres@gmail.com";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t px-6 py-16 lg:px-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-2 text-muted-foreground">
          I&apos;m available now for full-time software engineering roles in Karachi or remote. Email is the fastest way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><a href={`mailto:${EMAIL}`}><Mail /> {EMAIL}</a></Button>
          <Button asChild variant="outline"><a href="tel:+923126423009"><Phone /> +92 312 6423009</a></Button>
          <Button asChild variant="outline"><a href="https://github.com/shehzadres" target="_blank" rel="noreferrer"><Github /> GitHub</a></Button>
          <Button asChild variant="outline"><a href="https://linkedin.com/in/shehzadres" target="_blank" rel="noreferrer">LinkedIn</a></Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Shahzad. Built with React and TanStack Start.</p>
      </div>
    </footer>
  );
}