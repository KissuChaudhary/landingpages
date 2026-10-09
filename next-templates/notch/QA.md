# Notch QA log

2026-10-10, local dev server on :3417, headless Chromium (Playwright).

- Desktop 1440×900: scroll-through of every section, hero load frames at 100–2600ms, no console or page errors.
- Phone 390×844: full scroll-through; bento images, curtain height and logo strip checked after fixes.
- Reduced motion: page renders fully in place, product shot flat, curtain static, marquee wraps and stops.
- Interactions: workflow advances every 7s while in view (0,0,1,1 over 16s), stops after a click; deck tab click and ArrowRight; billing toggle rolls $18→$15 and $30→$25 with "Billed $180 a year. You save $36."; plan buttons fall back to mailto with plan and period; button labels roll on hover.
- Pages: /journal, /journal/the-75-percent-rule, /privacy return 200; unknown path returns the custom 404.
- `npm run typecheck`, `npm run verify:content`, static export build.
