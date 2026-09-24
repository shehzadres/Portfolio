@echo off
cd /d "C:\Users\Dell\Documents\shahzad-portfolio\portfolio-modified"
git add -A
git commit -m "redesign: ground-up neomorphism UI (light, DM Sans, new layout architecture)

BREAKING CHANGE: complete UI replacement — not a reskin.

Design system:
- Surface: #e8eaf0 mid-light base (true neomorphism tone)
- Shadow pair: #ffffff light / #b8bace dark
- 6 shadow recipes: raised, inset, float, raised-sm, inset-sm, pressed
- Font: DM Sans (variable) + DM Mono — replaces Inter/Space Grotesk
- Accent: indigo #5b5bd6

New layout:
- Header: floating pill strip (sticky, rounded, scrolled shadow)
- Hero: grid split (bio left / portrait inset frame right)
  Stats now in NEO INSET wells (pressed into surface)
  Portrait in deep inset frame — not a raised card
- Work: asymmetric 12-col bento grid (lead full-width, 2+2 below)
  Project index badge is a raised pill on the cover image
  Card footer with neo-raised chip links
- Stack: full-width INSET table container, rows with area/chip grid
- Experience: separate section with raised cards + accent top bar
- About: 2-col (bio text left, terminal + certs right)
  Terminal: inset well with dot controls
  Certs: inset well list
- Footer: large CTA heading + two-row link strip

All interactive states:
- Buttons: raised resting → pressed active → float on hover
- Cards: raised → float on hover (translateY -4px)
- Header nav items: inset on hover (pressed pill)
- Header icon buttons: inset on hover
- Stack-chip, work-card-link: raised → inset on hover"
git push
echo Done. Check Vercel for the new deployment.
pause
