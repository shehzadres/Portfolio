@echo off
cd /d "C:\Users\Dell\Documents\shahzad-portfolio\portfolio-modified"
git add -A
git commit -m "redesign: dark neomorphism v3 — unique layout per section, Syne font, mosaic bento, timeline rail, magazine about, marquee footer"
git push
echo.
echo ✓ Pushed. Vercel will build and deploy automatically.
pause
