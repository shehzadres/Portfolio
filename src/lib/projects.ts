/**
 * Project data — sourced from Shahzad's pinned GitHub repositories.
 * https://github.com/shehzadres
 */

import coverVisualRegex from "@/assets/cover-visual-regex-builder.jpg";
import coverWhiteboard from "@/assets/cover-collaborative-whiteboard.jpg";
import coverNexus from "@/assets/cover-nexus-transfer.jpg";
import coverCollabIde from "@/assets/cover-collab-ide.jpg";
import coverGlobe from "@/assets/cover-globe3d.jpg";

import vrbWorkspace from "@/assets/gallery/visual-regex-builder/main-workspace.png";
import vrbBuilder from "@/assets/gallery/visual-regex-builder/builder.png";
import vrbDebugger from "@/assets/gallery/visual-regex-builder/debugger.png";
import vrbAutomata from "@/assets/gallery/visual-regex-builder/automata.png";
import vrbBenchmark from "@/assets/gallery/visual-regex-builder/benchmark.png";

import nexusHome from "@/assets/gallery/nexus-transfer/home.png";
import nexusQr from "@/assets/gallery/nexus-transfer/qr-pairing.png";
import nexusDiagnostics from "@/assets/gallery/nexus-transfer/diagnostics.png";

import ideLogin from "@/assets/gallery/collab-ide/login.png";
import ideDashboard from "@/assets/gallery/collab-ide/dashboard.png";
import ideEditor from "@/assets/gallery/collab-ide/editor.png";
import ideMulticursor from "@/assets/gallery/collab-ide/multicursor.png";
import ideTerminal from "@/assets/gallery/collab-ide/terminal.png";
import ideMembers from "@/assets/gallery/collab-ide/members.png";
import ideCommandPalette from "@/assets/gallery/collab-ide/command-palette.png";

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  cover: string;
  year: string | null;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  stack: string[];
  challenges: { challenge: string; solution: string }[];
  takeaways: string[];
  gallery?: GalleryImage[];
  liveUrl: string | null;
  githubUrl: string | null;
}

export const projects: Project[] = [
  /* ── 01 · Visual Regex Builder ──────────────────────────── */
  {
    slug: "visual-regex-builder",
    index: "01",
    title: "Visual Regex Builder & Debugger",
    shortTitle: "Visual Regex Builder",
    tagline:
      "A drag-and-drop regex builder wired to a live debugger and a from-scratch automata compiler.",
    category: "Developer Tool · Compilers",
    cover: coverVisualRegex,
    year: null,
    summary:
      "Build a pattern visually from blocks, watch it match live against your own text, and inspect exactly how that pattern becomes a tokenizer → parser → AST → NFA → DFA → minimized DFA — all as interactive D3 diagrams.",
    problem:
      "Regex tools usually solve only one part of the problem: some are pattern editors, some visualize automata, some benchmark performance, and educational tools demonstrate compiler theory disconnected from real workflows.",
    solution:
      "A single dark-first, IDE-style application that combines a visual pattern builder, a real-time debugger, a full educational compiler pipeline, and a benchmarking suite that flags catastrophic backtracking before it can freeze the browser.",
    architecture: [
      "Tokenizer lexes regex syntax (literals, escapes, classes, groups, quantifiers, alternation).",
      "Recursive-descent parser produces an AST; a D3 tree diagram renders it interactively.",
      "Thompson construction converts the AST to an NFA; subset construction converts the NFA to a DFA; Hopcroft's algorithm minimizes the DFA — each step visualized as a live D3 automata diagram.",
      "The matching engine runs the minimized DFA against the input string and reports match positions and groups in real time.",
      "A benchmarking suite runs the pattern against large inputs, measures steps-per-character, and flags exponential backtracking risk.",
    ],
    features: [
      "Drag-and-drop visual regex builder with block-based pattern assembly.",
      "Live debugger showing match positions, groups, and match/no-match highlighting in real time.",
      "Full compiler pipeline visualization: Tokenizer → AST → NFA → DFA → minimized DFA as interactive D3 diagrams.",
      "Catastrophic backtracking detector with a benchmarking suite.",
      "Dark-first IDE-style UI with syntax highlighting and multi-panel layout.",
    ],
    stack: ["React 19", "TypeScript", "D3.js", "Zustand", "Tailwind CSS", "Vite"],
    challenges: [
      {
        challenge:
          "Rendering large automata graphs (hundreds of nodes/edges) without tangling or performance degradation.",
        solution:
          "Custom D3 force-simulation layout with collision detection, link-distance tuning per graph size, and WebWorker-offloaded layout computation to keep the UI thread unblocked.",
      },
      {
        challenge:
          "Detecting catastrophic backtracking in a browser environment without running for seconds.",
        solution:
          "A step-count instrumented NFA simulation — rather than timing wall-clock execution, the engine counts NFA transitions per input character and flags patterns exceeding a threshold, giving an instant deterministic signal.",
      },
    ],
    takeaways: [
      "Visualizing each compiler stage separately makes the theory immediately intuitive — the diagrams are the documentation.",
      "D3 force simulation requires careful tuning per graph topology; a single layout config rarely works across all automata sizes.",
    ],
    gallery: [
      { src: vrbWorkspace, caption: "Main workspace — split-panel IDE layout" },
      { src: vrbBuilder, caption: "Drag-and-drop pattern builder" },
      { src: vrbDebugger, caption: "Live debugger with match highlighting" },
      { src: vrbAutomata, caption: "NFA → DFA → minimized DFA visualization" },
      { src: vrbBenchmark, caption: "Benchmarking suite — backtracking detection" },
    ],
    liveUrl: "https://visual-regex-builder.vercel.app/",
    githubUrl: "https://github.com/shehzadres/visual-regex-builder",
  },

  /* ── 02 · Collaborative Whiteboard ──────────────────────── */
  {
    slug: "collaborative-whiteboard",
    index: "02",
    title: "Real-Time Collaborative Whiteboard",
    shortTitle: "Collaborative Whiteboard",
    tagline:
      "A multiplayer whiteboard where every action is an event, synchronized instantly over WebSockets with per-user undo/redo.",
    category: "Real-Time · Collaboration",
    cover: coverWhiteboard,
    year: null,
    summary:
      "A fully real-time multiplayer whiteboard built with Next.js, React-Konva, and Socket.IO. Every drawing action is broadcast as an event to all connected peers; the canvas re-renders optimistically on the local client before the server echo arrives. Includes per-user undo/redo, shape tools, live cursors, and room-based sessions persisted to MongoDB.",
    problem:
      "Most collaborative canvas tools are either purely local or use coarse-grained synchronization (full-canvas re-renders on change), causing visible flicker and high bandwidth usage.",
    solution:
      "An event-sourcing architecture where each user action (draw, erase, move, resize) is the unit of sync. The server rebroadcasts individual events; clients apply them to a local Konva stage, giving smooth real-time updates with per-user undo stacks.",
    architecture: [
      "Next.js app router frontend with React-Konva for canvas rendering; Konva stages are managed imperatively to avoid React re-render overhead on every pointer event.",
      "Socket.IO server broadcasts action events (not canvas state) to all peers in a room — keeping payloads tiny and latency low.",
      "Each user maintains a local undo stack of their own actions; undo/redo only replay or remove that user's events from the shared canvas.",
      "Room state (all actions since creation) is persisted to MongoDB so late-joining users can replay history and see the full canvas.",
      "Optimistic updates: the local client applies an action immediately; the server echo is idempotent and deduplicated by action ID.",
    ],
    features: [
      "Real-time multi-user collaboration with live cursors and user presence indicators.",
      "Per-user undo/redo — each user can undo only their own actions without affecting others.",
      "Shape tools: freehand pen, rectangle, ellipse, arrow, text, and eraser.",
      "Room-based sessions with persistent canvas history replayed for late joiners.",
      "Optimistic local rendering keeps the feel instantaneous even at high latency.",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "React-Konva",
      "Socket.IO",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
    ],
    challenges: [
      {
        challenge:
          "Socket.IO transport locking to polling instead of upgrading to WebSocket, causing high latency.",
        solution:
          "Forced WebSocket-only transport on client initialization (`transports: ['websocket']`) and ensured the Railway deployment's proxy passed the Upgrade header correctly.",
      },
      {
        challenge: "CORS errors between the Vercel frontend and the Railway backend on production.",
        solution:
          "Explicit CORS config on the Express server allowing the production Vercel origin, and Socket.IO's `cors` option set to the same value — both needed independently.",
      },
    ],
    takeaways: [
      "Event-sourcing (syncing actions, not state) is the right model for collaborative canvas — it keeps payloads small, enables per-user undo, and makes replay trivial.",
      "Real-time WebSocket apps need explicit transport and CORS configuration at every layer (HTTP server, Socket.IO, proxy) — each is independent.",
    ],
    gallery: [],
    liveUrl: "https://collaborative-whiteboard-zeta-nine.vercel.app/",
    githubUrl: "https://github.com/shehzadres/collaborative-whiteboard",
  },

  /* ── 03 · P2P Encrypted File Transfer (Nexus) ───────────── */
  {
    slug: "nexus-transfer",
    index: "03",
    title: "P2P Encrypted File Transfer",
    shortTitle: "Nexus Transfer",
    tagline:
      "End-to-end encrypted peer-to-peer file transfer where files never pass through the server.",
    category: "Security · Networking",
    cover: coverNexus,
    year: null,
    summary:
      "A browser-based P2P file transfer application where files travel directly between peers over WebRTC DataChannels. The server only brokers the initial connection and never sees file bytes. Application-layer encryption uses libsodium X25519 key exchange and XChaCha20-Poly1305, layered on top of WebRTC's built-in DTLS.",
    problem:
      "File sharing services typically store files server-side, creating privacy risks, storage costs, and a centralised point of failure. Even 'encrypted' services often control the keys.",
    solution:
      "WebRTC DataChannels for direct browser-to-browser transfer — the server only handles WebSocket signalling. Application-layer libsodium crypto (X25519 + XChaCha20-Poly1305) ensures the server can't read content even during signalling.",
    architecture: [
      "A lightweight Node.js/WebSocket signalling server brokers ICE candidate exchange and SDP negotiation to establish the peer connection. It never touches file data.",
      "Once the WebRTC DataChannel is open, the sender derives a shared secret via X25519 ECDH (libsodium) with the recipient's ephemeral public key, then encrypts each chunk with XChaCha20-Poly1305.",
      "The recipient decrypts each chunk on arrival and writes it to a local buffer, assembling the file client-side without any server involvement.",
      "QR code pairing allows mobile-to-desktop transfers without manual IP entry — the receiver scans the sender's QR, which encodes the ephemeral public key and signalling room ID.",
    ],
    features: [
      "Files travel directly browser-to-browser over WebRTC DataChannels — zero bytes stored on the server.",
      "X25519 key exchange + XChaCha20-Poly1305 encryption (libsodium) layered above WebRTC's own DTLS.",
      "Real-time transfer progress, speed, and ETA displayed during chunked streaming.",
      "QR code pairing for seamless mobile ↔ desktop transfers.",
      "Diagnostics panel showing ICE candidates, data channel state, and transfer metrics.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "WebRTC",
      "libsodium.js",
      "Node.js",
      "WebSocket",
      "Tailwind CSS",
    ],
    challenges: [
      {
        challenge: "Transfer state becoming inconsistent when the DataChannel closed mid-transfer.",
        solution:
          "An explicit state machine (IDLE → PAIRING → CONNECTED → TRANSFERRING → COMPLETE / ERROR) with teardown handlers for every DataChannel and ICE lifecycle event.",
      },
      {
        challenge: "Chunking large files without overwhelming the DataChannel's send buffer.",
        solution:
          "File streamed via the File API in 64 KB chunks, with backpressure by checking DataChannel.bufferedAmount before each send.",
      },
    ],
    takeaways: [
      "WebRTC DataChannels combined with libsodium provide a serverless, E2E-encrypted data pipe with no infrastructure cost.",
      "Explicit state machines for connection lifecycle make WebRTC apps dramatically easier to reason about and debug.",
    ],
    gallery: [
      { src: nexusHome, caption: "Home — initiate or receive a transfer" },
      { src: nexusQr, caption: "QR code pairing for mobile transfers" },
      { src: nexusDiagnostics, caption: "Diagnostics — ICE state and transfer metrics" },
    ],
    liveUrl: "https://p2p-encrypted-file-transfer-fronten.vercel.app/",
    githubUrl: "https://github.com/shehzadres/p2p-encrypted-file-transfer",
  },

  /* ── 04 · Collab IDE ─────────────────────────────────────── */
  {
    slug: "collab-ide",
    index: "04",
    title: "Browser-Based Collaborative IDE",
    shortTitle: "Collab IDE",
    tagline:
      "A production-grade collaborative IDE with Yjs CRDT sync, Monaco editor, and kernel-isolated Docker execution per session.",
    category: "Real-Time · Infrastructure",
    cover: coverCollabIde,
    year: null,
    summary:
      "A browser-based collaborative code editor with real-time CRDT synchronization, multi-cursor presence, sandboxed multi-language execution, session recording & replay, and role-based access control. Deployed on Railway (backend), Neon (PostgreSQL), Upstash (Redis), and Vercel (frontend).",
    problem:
      "Most collaborative coding tools are either cloud-locked, oversimplified, or don't give you access to real execution environments. There's a gap between lightweight pair-programming tools and full cloud IDEs.",
    solution:
      "A conflict-free-by-design editor powered by Yjs CRDTs, with real, kernel-isolated Docker execution per session, protocol-level permission enforcement, and full self-hostability via a single docker compose up.",
    architecture: [
      "A single HTTP server on port 4000 handles REST plus both the Yjs and terminal WebSocket endpoints, routed by URL on upgrade.",
      "The Yjs room is simply the sessionId string — one Y.Doc per room, with Redis pub/sub broadcasting updates across backend replicas.",
      "Each session gets a persistent Docker container (ws-<sessionId>) with memory, CPU, PID and network limits enforced at the kernel level.",
      "VIEWER enforcement happens at the protocol layer: mutating Yjs frames are inspected with y-protocols and dropped before reaching the shared Y.Doc.",
      "Access tokens live in memory (Zustand); refresh tokens live in an httpOnly cookie — out of localStorage to defeat XSS token theft.",
    ],
    features: [
      "Conflict-free real-time collaboration via Yjs CRDTs with multi-cursor presence and online-user avatars.",
      "Monaco editor (the VS Code engine) with 10+ languages, per-file undo/redo, themes, and multi-file tabs.",
      "Sandboxed terminal with a real shell in a per-session Docker container across Shell, Node.js 20, Python 3.12, and Go 1.23.",
      "Dual-token auth with silent refresh, per-session RBAC (OWNER / EDITOR / VIEWER), and token-based invite links.",
      "Session recording & replay: CRDT frames, snapshots every 10s, and terminal I/O, with snapshot-accelerated seeking.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Monaco Editor",
      "Yjs (CRDT)",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    challenges: [
      {
        challenge:
          "Preventing a VIEWER from injecting code changes even via a raw WebSocket client.",
        solution:
          "Enforcing permissions at the Yjs protocol layer — the server decodes raw frames with y-protocols and drops mutating updates before they reach the shared Y.Doc.",
      },
      {
        challenge:
          "Providing real execution environments safely and keeping them available across reconnects.",
        solution:
          "Per-session Docker containers named deterministically (ws-<sessionId>), reattached on reconnect, with an idle reaper destroying them after 4 hours of inactivity under strict kernel-level resource caps.",
      },
    ],
    takeaways: [
      "Enforcing security at the protocol layer, not just the API, is what makes viewer/editor roles genuinely safe.",
      "The codebase is intentionally production-grade: typed end-to-end, modular, properly layered, and self-hostable.",
    ],
    gallery: [
      { src: ideLogin, caption: "Authentication — dual-token sign-in" },
      { src: ideDashboard, caption: "Dashboard — sessions overview" },
      { src: ideEditor, caption: "Monaco editor with multi-file tabs" },
      { src: ideMulticursor, caption: "Multi-cursor CRDT collaboration" },
      { src: ideTerminal, caption: "Sandboxed per-session Docker terminal" },
      { src: ideMembers, caption: "Role-based access control (OWNER/EDITOR/VIEWER)" },
      { src: ideCommandPalette, caption: "Command palette navigation" },
    ],
    liveUrl: null,
    githubUrl: "https://github.com/shehzadres/collab-ide",
  },

  /* ── 05 · WebGL Data Globe ───────────────────────────────── */
  {
    slug: "globe3d",
    index: "05",
    title: "WebGL 3D Earth Data Visualization",
    shortTitle: "WebGL Data Globe",
    tagline: "A cinematic, WebGL-powered 3D Earth for scroll-driven geospatial storytelling.",
    category: "WebGL · Data Visualization",
    cover: coverGlobe,
    year: null,
    summary:
      "A production-quality interactive 3D globe built with React, Three.js, and custom GLSL shaders — a cinematic, scroll-driven storytelling experience with geospatial data, flight-route animation, particle systems, and a fully custom camera engine.",
    problem:
      "Delivering a realistic, cinematic 3D globe with data visualization that stays smooth even on integrated GPUs demands careful rendering architecture, not just off-the-shelf controls.",
    solution:
      "A custom React Three Fiber pipeline with a spherical-coordinate camera engine, a modular GLSL shader framework, allocation-free particle systems, and a centralized Scene Director coordinating camera, layers, and transitions.",
    architecture: [
      "Custom React Three Fiber rendering pipeline with centralized renderer configuration and a frame-rate-independent loop.",
      "A fully custom spherical-coordinate camera engine (no OrbitControls) with GSAP-driven transitions and 5 named presets.",
      "A Scene Director coordinates camera movement, animation, UI state, and visualization layers to avoid tight coupling.",
      "A modular GLSL shader framework (Fresnel atmosphere, animated FBM noise, glow) with centralized uniform management.",
      "Particle systems built on BufferGeometry with shared resources and zero per-frame heap allocations.",
    ],
    features: [
      "Realistic Earth: day/night texture compositing, specular ocean maps, normal-mapped terrain, and a GLSL atmosphere shader.",
      "Cinematic camera with smooth-damp interpolation and five named presets.",
      "Scroll storytelling: GSAP ScrollTrigger drives a 5-scene progression that reveals layers progressively.",
      "Data visualization: 25 world cities with animated markers, value-driven spike charts, and billboard labels.",
      "Flight routes: 35 great-circle arcs with draw-range reveal animation and traveling particles.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "GLSL",
      "GSAP",
      "Zustand",
      "Vite",
    ],
    challenges: [
      {
        challenge: "Rendering thousands of visual elements at 60 FPS on integrated GPUs.",
        solution:
          "Reusable BufferGeometry-based systems with zero per-frame allocations, geometry/material reuse, cached textures, and adaptive device pixel ratio.",
      },
      {
        challenge: "Creating realistic flight paths across a sphere.",
        solution:
          "Great-circle interpolation instead of linear interpolation, generating accurate globe-spanning routes revealed via draw-range animation.",
      },
    ],
    takeaways: [
      "Isolating WebGL rendering from the React tree (Zustand + memoization) keeps both performant.",
      "A centralized Scene Director keeps a complex, multi-system 3D app maintainable and extensible.",
    ],
    gallery: [],
    liveUrl: "https://webgl-data-globe.vercel.app/",
    githubUrl: "https://github.com/shehzadres/Webgl-Data-Globe",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
