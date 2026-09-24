import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { CommandPalette } from "../components/command-palette";

const SITE_TITLE = "Shahzad · Software Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Shahzad — full stack engineer specialising in real-time collaboration, applied cryptography, WebGL data visualisation, and production-grade systems.";

function NotFoundComponent() {
  return (
    <div style={{ display:"flex", minHeight:"100vh", alignItems:"center", justifyContent:"center", background:"var(--s0)", padding:"24px" }}>
      <div style={{ maxWidth:400 }}>
        <p className="mono-xs-v" style={{ marginBottom:16 }}>Error 404</p>
        <h1 style={{ fontFamily:"var(--ff-display)", fontSize:"3.5rem", fontWeight:800, letterSpacing:"-0.04em", color:"var(--tx0)", lineHeight:1 }}>Not found.</h1>
        <p style={{ marginTop:16, color:"var(--tx1)", fontSize:"0.9rem" }}>This page does not exist.</p>
        <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:32, fontFamily:"var(--ff-mono)", fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--av)" }}>
          ← Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ display:"flex", minHeight:"100vh", alignItems:"center", justifyContent:"center", background:"var(--s0)", padding:"24px" }}>
      <div style={{ maxWidth:400 }}>
        <p className="mono-xs-v" style={{ marginBottom:16 }}>Runtime error</p>
        <h1 style={{ fontFamily:"var(--ff-display)", fontSize:"2.5rem", fontWeight:800, letterSpacing:"-0.04em", color:"var(--tx0)", lineHeight:1 }}>Something broke.</h1>
        <div style={{ marginTop:28, display:"flex", gap:12 }}>
          <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-ghost btn-sm">Retry</button>
          <a href="/" className="btn btn-ghost btn-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Shahzad" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1e2132" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <CommandPalette />
    </QueryClientProvider>
  );
}
