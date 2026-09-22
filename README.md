# Shahzad — Portfolio

Personal portfolio site for **Shahzad**, Software Engineer. A dark-first,
IDE-styled single-page site with a detail page per project, built with
TanStack Start, React 19, and Tailwind CSS v4.

**Live site:** _add your deployed URL here once live_
**Contact:** shehzadres@gmail.com · [github.com/shehzadres](https://github.com/shehzadres)

---

## Features

- Cinematic hero with an animated terminal widget and a clear "Software
  Engineer" role badge
- Project grid with cover images, tech-stack tags, and direct **Live Demo**
  / **GitHub** links per project
- Per-project case-study page (`/work/$slug`) with problem/solution,
  architecture notes, feature list, challenges, takeaways, and an image
  gallery
- Command palette (⌘K / Ctrl+K) for fast navigation
- Light/dark theme toggle
- SSR via TanStack Start + Nitro, deployable as a Cloudflare Worker
- SEO basics: per-route meta tags, sitemap route, semantic headings

## Tech stack

| Layer        | Tech                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| Framework    | [TanStack Start](https://tanstack.com/start) (file-based routing, SSR)                |
| UI           | React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, shadcn-style components   |
| State / data | Zustand-free local state, TanStack Query (installed, available for future data needs) |
| Build        | Vite 8, Nitro (Cloudflare Worker output by default)                                   |
| Tooling      | ESLint, Prettier, TypeScript strict mode                                              |

## Project structure

```
src/
├── assets/            Cover images + per-project screenshot galleries
├── components/         Site header/footer, command palette, theme toggle,
│                       reveal-on-scroll wrapper, shadcn/ui primitives
├── hooks/              use-mobile, use-theme
├── lib/
│   ├── projects.ts     All project content — titles, taglines, descriptions,
│   │                   architecture notes, stack, gallery images, live/GitHub URLs
│   └── utils.ts
├── routes/
│   ├── __root.tsx       App shell, global <head> tags
│   ├── index.tsx         Home page (hero, work grid, stack, about)
│   ├── work.$slug.tsx    Project case-study detail page
│   └── sitemap[.]xml.ts  Sitemap route
├── server.ts / start.ts SSR entry points
└── styles.css           Design tokens + Tailwind layer
public/
└── Shahzad_CV.pdf       Downloadable CV (linked from hero + footer)
```

To edit project content (titles, descriptions, links, tech stack, gallery
captions), everything lives in **`src/lib/projects.ts`** — no need to touch
any route or component file.

## Getting started

**Requirements:** Node.js ≥ 20, npm (or bun — a `bunfig.toml` is included).

```bash
# 1. Clone
git clone https://github.com/shehzadres/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

The site runs at `http://localhost:3000` (or the port Vite prints) with hot
reload.

### Available scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the dev server                             |
| `npm run build`   | Production build (outputs to `.output/`)         |
| `npm run preview` | Preview the production build locally             |
| `npm run lint`    | Run ESLint                                       |
| `npm run format`  | Format the codebase with Prettier                |
| `npm run deploy`  | Build, then deploy via `nitro deploy --prebuilt` |

## Deployment

This project builds through **Nitro**, which targets **Cloudflare Workers**
by default (`cloudflare-module` preset) — no extra config file needed at the
repo root; Nitro generates the Worker + `wrangler.json` inside `.output/`
at build time.

**Option A — Cloudflare Workers (recommended, zero extra setup)**

```bash
npm run build
npx wrangler login        # first time only
npx wrangler deploy       # reads the generated .output/server/wrangler.json
```

or simply `npm run deploy`, which does both build + deploy in one step.

**Option B — Cloudflare Pages / GitHub integration**
Connect the repo in the Cloudflare dashboard, set:

- Build command: `npm run build`
- Output directory: `.output/public`
- Node version: 20+

**Option C — Any other Node host (Vercel, Railway, a VPS, etc.)**
TanStack Start + Nitro can target other presets (Node server, Vercel, Netlify,
etc.) — see the [Nitro deployment docs](https://nitro.build/deploy) for
swapping the preset in `vite.config.ts` if you don't want Cloudflare.

No environment variables are required for this site — it's fully static
content sourced from `src/lib/projects.ts`, with no external API calls or
secrets.

## License

Code in this repository is available under the [MIT License](./LICENSE).
The personal content — Shahzad's name, photo (`src/assets/portrait.jpg`),
CV (`public/Shahzad_CV.pdf`), and project write-ups — is **not** covered by
that license and shouldn't be reused as-is; feel free to use the site's code
and structure as a template for your own portfolio.
