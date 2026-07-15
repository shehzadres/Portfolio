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

const SITE_TITLE = "Shahzad's Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Shahzad, a software engineer specialising in real-time collaboration, applied cryptography, WebGL data visualisation, and production-grade infrastructure.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md">
        <p className="mono-label-accent mb-4">Error 404</p>
        <h1 className="font-display text-5xl font-bold text-foreground">Not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="mono-label-accent mt-8 inline-flex items-center gap-2 hover:underline"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Hook up your error-tracking service of choice here (Sentry, etc).
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md">
        <p className="mono-label-accent mb-4">Runtime error</p>
        <h1 className="font-display text-4xl font-bold text-foreground">Something broke</h1>
        <div className="mt-8 flex gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-ghost-sys"
          >
            Retry
          </button>
          <a href="/" className="btn-ghost-sys">
            Home
          </a>
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
      { name: "theme-color", content: "#080c10" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500&family=JetBrains+Mono:wght@400;500&display=swap",
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
        {/* Prevent FOUC — default to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}/* no class needed for dark – it is the default */}catch(e){}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {/* Atmospheric overlays */}
        <div className="scanlines" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
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
