# Bounce QA log

2026-10-10, local dev server on :3427, headless Chromium (Playwright).

- Desktop 1440×900: full scroll-through, no console or page errors.
- Phone 390×844: full scroll-through; 8-step pad, arrangement with week tabs (fixed a zero-width lane column), rail, pricing and closing checked.
- Beat pad: playhead advances, Boom bap preset sets 90 BPM, pad toggles (aria-pressed false to true), ArrowRight moves focus to the next pad, pause holds the playhead.
- Pricing: Cohort + mentor with 3 payments shows $269 × 3 monthly, seats meter and features; CTA falls back to a mailto naming the plan.
- FAQ: expands on click with aria-expanded.
- Closing: wordmark fits the panel; countdown shows days, hours and minutes.
- Fixed: reveal state moved from a class to a `data-shown` attribute, because React re-renders that change `className` were removing the class and hiding the pricing tiers. The same fix went into Notch.
- `npm run typecheck`, `npm run verify:content`, static export build.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.
