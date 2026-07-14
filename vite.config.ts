import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    // Keep a single copy of React/TanStack Query in the dep graph — avoids
    // "invalid hook call" / duplicate-context bugs from a second copy being
    // pulled in by a transitive dependency.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  // Vite uses PostCSS in dev and Lightning CSS at build time by default; pinning
  // both to Lightning CSS keeps `vite dev` and `vite build` output identical.
  css: { transformer: "lightningcss" },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Server-only modules (e.g. anything matching server-only imports)
      // must not leak into the client bundle.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // Nitro only runs at build time — targets Cloudflare Workers by default.
    // Swap the preset (e.g. "node-server", "vercel", "netlify") for a
    // different host: https://nitro.build/deploy
    ...(command === "build" ? [nitro({ preset: "cloudflare-module" })] : []),
    viteReact(),
  ],
}));
