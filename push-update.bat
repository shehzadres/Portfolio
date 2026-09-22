@echo off
cd /d "%~dp0"
echo.
echo === Staging all changes ===
git add -A
echo.
echo === Commit ===
git commit -m "redesign: minimalist editorial theme + sync CV content

- Light-first palette: warm off-white (#FBFBFA) canvas, near-black (#111111) text
- Removed cyan/teal accents throughout (hero, buttons, cards, overlays, borders)
- Replaced scanlines overlay with ultra-subtle grain texture
- Updated fonts: Archivo display + Space Grotesk body + JetBrains Mono labels
- Logo: clean typographic SZ mark (border box, no cyber corners)
- Dark mode: .dark class override (inverted monochrome), toggle hook inverted
- STACK_ROWS: updated to match CV exactly (Languages, Frontend, Backend, DBs, AI/ML, DevOps)
- Stats: 'Systems shipped' -> 'Projects shipped'
- Stack section kicker: 'Seven' -> 'Six layers'
- ProjectCard action bar: dark bg/text -> light bg/neutral text
- About heading, certifications card, footer CTA: all de-cyaned
- DotGrid, radial accents: cyan -> neutral #111 opacity
- TerminalWidget: dark bg retained (intentional contrast), cursor/lines updated
- __root.tsx: removed scanlines div, updated font link, theme-color, FOUC script
- use-theme.tsx: dark-first -> light-first (default = no class = light)
- site-header.tsx: cyber corner logo -> clean border-box SZ mark
- site-footer.tsx: cyan span -> muted italic span"
echo.
echo === Push ===
git push
echo.
echo Done! Check your remote repo.
pause
