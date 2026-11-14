# Shahzad | Software Engineer Portfolio

[![CI](https://github.com/shehzadres/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/shehzadres/Portfolio/actions/workflows/ci.yml)
[![Live portfolio](https://img.shields.io/badge/portfolio-live-2f765d)](https://portfolio-sand-eight-amcjbadefb.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A personal engineering portfolio built with **TanStack Start, React 19, TypeScript and Tailwind CSS v4**. It brings together software engineering and software quality assurance work in one place, with project case studies, implementation details, screenshots and source links.

**Live portfolio:** [portfolio-sand-eight-amcjbadefb.vercel.app](https://portfolio-sand-eight-amcjbadefb.vercel.app/)

**GitHub:** [github.com/shehzadres](https://github.com/shehzadres)

**Contact:** [shehzadres@gmail.com](mailto:shehzadres@gmail.com)

---

## Preview

The portfolio includes a project directory, detailed case studies, technical stack, experience and contact information.

![Visual Regex Builder project preview](src/assets/cover-visual-regex-builder.jpg)

## Projects

The site currently presents ten projects across software development, real-time systems, security and quality engineering.

|   # | Project                                         | Focus                                         | Case study                                                                                                                                                                                     | Source                                                                                      |
| --: | ----------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
|  01 | Visual Regex Builder & Debugger                 | Developer tools, compilers, automata          | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/visual-regex-builder)                                                                                                           | [GitHub](https://github.com/shehzadres/visual-regex-builder)                                |
|  02 | Real-Time Collaborative Whiteboard              | Real-time collaboration, WebSockets           | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/collaborative-whiteboard)                                                                                                       | [GitHub](https://github.com/shehzadres/collaborative-whiteboard)                            |
|  03 | P2P Encrypted File Transfer                     | WebRTC, applied cryptography                  | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/nexus-transfer) · [Live app](https://p2p-encrypted-file-transfer-fronten.vercel.app/)                                           | [GitHub](https://github.com/shehzadres/p2p-encrypted-file-transfer)                         |
|  04 | Browser-Based Collaborative IDE                 | CRDTs, Docker, infrastructure                 | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/collab-ide)                                                                                                                     | [GitHub](https://github.com/shehzadres/collab-ide)                                          |
|  05 | WebGL 3D Earth Data Visualization               | Three.js, WebGL, geospatial UI                | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/globe3d) · [Live app](https://webgl-data-globe.vercel.app/)                                                                     | [GitHub](https://github.com/shehzadres/Webgl-Data-Globe)                                    |
|  06 | End-to-End QA Automation Framework              | Playwright, TypeScript, cross-browser testing | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/e2e-qa-automation)                                                                                                              | [GitHub](https://github.com/shehzadres/end-to-end-qa-automation-framework)                  |
|  07 | API Testing & Validation Framework              | Pytest, Postman/Newman, OpenAPI               | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/api-testing-framework) · [Showcase](https://shehzadres.github.io/api-testing-validation-framework/)                             | [GitHub](https://github.com/shehzadres/api-testing-validation-framework)                    |
|  08 | Security Testing & Vulnerability Assessment Lab | OWASP ZAP, Burp Suite, security regression    | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/security-assessment-lab) · [Showcase](https://shehzadres.github.io/security-testing-vulnerability-assessment-framework/)        | [GitHub](https://github.com/shehzadres/security-testing-vulnerability-assessment-framework) |
|  09 | Performance & Load Testing Platform             | JMeter, Prometheus, Grafana                   | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/performance-load-testing) · [Showcase](https://shehzadres.github.io/performance-load-testing-platform/)                         | [GitHub](https://github.com/shehzadres/performance-load-testing-platform)                   |
|  10 | Software QA & Defect Management System          | Playwright, test design, traceability         | [View](https://portfolio-sand-eight-amcjbadefb.vercel.app/work/qa-defect-management) · [Showcase](https://shehzadres.github.io/software-qa-defect-management-system/reports/qa-dashboard.html) | [GitHub](https://github.com/shehzadres/software-qa-defect-management-system)                |

A live application or recruiter showcase is linked only where a hosted destination is available. The whiteboard and collaborative IDE entries intentionally link to their case studies and source repositories rather than to an unverified demo.

## What the portfolio includes

- Responsive project directory with custom project artwork and technology summaries.
- Individual case-study routes at `/work/$slug`.
- Problem, solution, architecture, features, engineering challenges and takeaways for each project.
- Screenshot galleries for projects with available product captures.
- Direct source-code links and verified live/showcase destinations.
- Keyboard-accessible command palette (`Ctrl+K` / `⌘K`).
- Light/dark theme support.
- Experience, technical skills, CV and contact sections.
- Route-level metadata and a generated sitemap.

## Technology

| Area                          | Tools                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Framework                     | [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router) |
| UI                            | React 19, TypeScript, Tailwind CSS v4                                                        |
| Components                    | Radix UI primitives, shadcn-style components, Lucide                                         |
| Interaction and visualization | CSS transitions, custom reveal and motion components                                         |
| Build and server output       | Vite 8, Nitro                                                                                |
| Quality and formatting        | ESLint, Prettier, TypeScript                                                                 |
| Hosting                       | Vercel                                                                                       |

## Repository layout

```text
.
├── public/
│   ├── Shahzad_CV.pdf
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── gallery/             Project screenshots
│   │   └── cover-*              Project cover artwork
│   ├── components/              Site shell, navigation and UI components
│   ├── hooks/                   Shared React hooks
│   ├── lib/
│   │   ├── projects.ts          Five software engineering case studies
│   │   ├── sqa-projects.ts      Five software QA case studies
│   │   └── utils.ts             Shared utilities
│   ├── routes/
│   │   ├── __root.tsx           Application shell and document metadata
│   │   ├── index.tsx            Portfolio homepage
│   │   ├── work.$slug.tsx       Dynamic project case-study route
│   │   └── sitemap[.]xml.ts     Sitemap endpoint
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── .github/
│   └── workflows/
│       └── ci.yml               Pull request and push checks
├── package.json
├── package-lock.json
└── vite.config.ts
```

### Updating project content

Project information is kept separate from page components:

- Edit `src/lib/projects.ts` for the five software engineering projects.
- Edit `src/lib/sqa-projects.ts` for the five QA projects.
- Add project artwork to `src/assets/` and import it in the corresponding data file.
- Use a unique `slug` for each project. The slug determines its case-study URL.
- Set `liveUrl` or `showcaseUrl` only when the destination is deployed and verified. Use `null` when no public demo exists.
- Keep `githubUrl` pointed at the actual source repository.

## Run locally

### Requirements

- Node.js 20 or newer
- npm
- Git

### Setup

```bash
git clone https://github.com/shehzadres/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Vite prints the local development URL in the terminal, usually [http://localhost:5173](http://localhost:5173).

### Available commands

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the local development server              |
| `npm run lint`         | Run ESLint across the repository                |
| `npm run build`        | Create the production build                     |
| `npm run preview`      | Preview the production build locally            |
| `npm run build:dev`    | Build using Vite's development mode             |
| `npm run format`       | Format supported repository files with Prettier |
| `npm run format:check` | Check formatting without changing files         |
| `npx tsc --noEmit`     | Run the TypeScript compiler check               |

There is currently no dedicated unit-test script in this repository. The CI workflow checks formatting, runs ESLint and TypeScript, and creates a production build rather than reporting a test suite that does not exist.

## Build and deployment

The application is configured to build with the **Vercel Nitro preset** in `vite.config.ts`.

```bash
npm ci
npm run lint
npm run build
npm run preview
```

The production site is connected to this GitHub repository through Vercel. Pushes to the production branch trigger a deployment through that integration. No application environment variables are currently required because the portfolio content is stored in the repository.

For a separate Vercel project, import this repository in the Vercel dashboard and use:

- Framework preset: Other / Vite-compatible
- Install command: `npm ci`
- Build command: `npm run build`
- Output: use the Nitro-generated Vercel output

## Continuous integration

GitHub Actions runs on pushes and pull requests to `main`. It installs the locked dependencies with `npm ci`, checks Prettier formatting, runs ESLint and TypeScript, and creates a production build. This catches common integration and build errors before changes are merged.

## License

This repository includes an MIT license. See [LICENSE](./LICENSE) for the license text.
