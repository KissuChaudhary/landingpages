# Turnout QA (maintainers only, not shipped)

Checked 10 October 2026 with headless Chromium (Playwright from the npx cache) against `next dev` on :3460 and the static export served from `public/demos/turnout`.

## Builds and checks

- `npx tsc --noEmit`: clean.
- `npm run verify:content`: 123 checks pass.
- `npm run build`: 17 static pages; home page 128 kB first-load JS.
- `npm run export:demo`: 4.1 MB static export. Under `/demos/turnout` every link resolves to its `.html` file, no image or request fails, no console errors.

## Layout

- Desktop 1440 × 900 and 1280 × 800: every section reviewed in scroll captures.
- Phone 390 × 844 (mobile emulation): document width is exactly 390 px on home, /work, /work/halfmoon, /contact and an article. Two overflows were fixed on the way: the comparison card's fly-in start position (section now clips horizontally) and photos zoomed before their reveal (mask frames clip to their corners).
- No JavaScript: every section is visible; pinned scenes fall back to their static layouts; figures show their real values.
- Reduced motion: no pinning, looping or sliding; the problem scene is a crossed-out list followed by the answer; services stack in normal flow.

## Interactions

- Photo deck: advances on its CSS timer (caption morphs), on the arrow button and on swipe; the leaving card flicks out and tucks behind. Pause stops the deck, ribbon and logo strip and is remembered (`turnout-motion` in localStorage).
- Problem scene: background darkens, five cards pass and are crossed out in turn, headline morphs to the answer, background returns to paper.
- Pricing: quarterly $6,800 / $12,500 → yearly $5,780 / $10,625 with rolling digits; notes read "$69,360 a year" and "$127,500 a year". Plan buttons open /contact with the plan shown.
- FAQ: one answer open at a time, `aria-expanded` follows.
- Navigation: compacts after 48 px of scroll; the active section gets the highlight and dot; the phone menu opens from the bar, closes on Escape and returns focus to its button.
- /work filter: "Community" shows one card and the count rolls to 1.
- Contact: empty submit shows three inline errors and focuses the first field; with no endpoint the form opens a filled-in email.

## Images

26 fal generations (`openai/gpt-image-2.5/flare/text-to-image`, quality low). Raw files in `work/turnout-art/`, converted by `work/turnout-assets.cjs`; 1.8 MB of WebP in all, largest 155 KB.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.
