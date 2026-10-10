# Plumb QA (maintainers only, not shipped)

Checked 10 October 2026 with headless Chromium (Playwright from the npx cache) against `next dev` on :3488 and the static export served from `public/demos/plumb` on :3419. The browser pane's animation timeline was frozen in this session, so every motion check ran headless.

## Builds and checks

- `npm run typecheck`: clean.
- `npm run verify:content`: 107 checks pass.
- `npm run export:demo`: 5 static pages; home page 135 kB first-load JS. Under `/demos/plumb` all 25 internal links resolve, no request fails, no console errors.

## Interactions (20 scripted checks, all pass on dev and on the export)

- The surface sits exactly on the headline token at load (within 1.5 px).
- Install chapter: the line layer is active and not inert; Copy writes the snippet to the clipboard and morphs to "Copied".
- Dashboard chapter: the counter lands on the screen's slot (x 0.759, y 0.041 of the image, as configured).
- Idle: 3–4 animation frames in 1.5 s after scrolling stops (the eased loop sleeps).
- Dock: at the end the surface hides on the nav button and `html[data-docked]` is set.
- Closing pill: opens into a focused email field; empty submit shows the hint; a valid email reaches the done state (email fallback).
- Pricing slider moves with the arrow keys (140K pageviews, $29).
- Changelog page renders the trace with anchors; no console errors.
- Phone (390 × 844): the menu opens downward, Escape closes it and returns focus to the button; document width is exactly 390.
- Reduced motion: no pin, the surface is hidden, the chapters render as a list, the token shows in the headline.
- No JavaScript: the hero, token and chapters are visible.

## Layout reviewed

1440 × 900, 1280 × 720, 768 × 1024 and 390 × 844 at every tour stop (token, line, dashboard, live view, email, phone, dock) and every section below. Fixed on the way: the comma after the token lost its space on phones; the install code slid under the counter mid-morph (the line layer now keeps to the surface's left edge); the footer clock's line-height let a rolling digit peek out; the tablet headline was too small.

## Library fixes found here

- `pricing-calculator` formatted prices with the default locale, so a server rendering "US$19" and a browser rendering "$19" broke hydration. Added a `locales` prop.
- Its thumb rider was a full-width box pushed right by the slider value, which widened the page on phones (453 px document on a 390 px screen). The rider now ends at the thumb and hangs to the left.

## Images

Five product screens rendered from HTML by `work/plumb-shots/render.cjs` (dark UI, 2×), 220 KB of WebP in all, largest 91 KB. No photographs, no image generation.
