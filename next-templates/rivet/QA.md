# Rivet verification

Reviewed 10 October 2026.

## Build and portability

- Fresh buyer-shaped copy excludes QA, design notes, generated output, and the marketplace export helper; its package script is removed, following the buyer packaging rules.
- `npm ci --no-audit --no-fund`, `npm run typecheck`, `npm run verify:content`, and the normal `npm run build` pass in the independent copy.
- Final shipped source matches the independently built copy byte for byte, apart from the deliberate package-script removal.
- `npm run export:demo` passes with the static route flag and `/demos/rivet` base path. All 12 content pages and the custom 404 are exported.
- Recursive export audit passes: 13 HTML files, 418 local route, anchor, image, font, stylesheet, and script references.
- Marketplace source passes TypeScript with templates and unrelated standalone projects excluded from the integration check. `/demo/rivet` renders the static export and device controls work. The sandbox permits brief downloads.
- Fonts and images are local; the production builds make no font requests. No animation-library dependency.
- 75 buyer files, 5,811 source/config lines excluding the lockfile. Largest source file: `styles/base.css`, 383 lines. Sections, artwork, editorial pages, and responsive styles are divided into focused files.

## Browser review

- Homepage reviewed at 1440×960, 768×1024, 390×844, and 320×740. No horizontal document overflow after correcting intrinsic sizing in the client-mark grid. Narrow Forma artwork and Goodwell typography remain inside their compositions.
- Finite hero entrance, section reveals, bounded photograph drift, project hover/focus, progress rail, and fullscreen navigation inspected. Native disclosures interpolate height in supporting browsers and retain native operation elsewhere.
- Motion preference toggles, persists across navigation, exposes all content when off, and disables native smooth scrolling. System reduced-motion behavior is implemented in both CSS and the provider; an OS preference change was not emulated in browser QA.
- Fullscreen menu locks background scrolling, makes page content inert, contains keyboard focus, closes on Escape, and returns focus to its trigger.
- Services open in place and share an exclusive native details group. FAQ responds to Enter and preserves readable answers.
- Engagement action opens the contact route with `engagement=launch`; the corresponding option is selected.
- Dummy inquiry validates, prepares an inline local brief, and downloads a real text file matching the entered name, email, company, engagement, budget, and message. No inquiry is reported as sent without a configured endpoint. Whitespace-only message fails trimmed validation and preserves the entered fields.
- Goodwell case study, journal index, and article reading page reviewed on phone. Case studies include full narratives and next-project links; all exported destinations are covered by the link audit.
- Final desktop, phone, card, full-page, and OG previews saved under `public/previews/` and `public/og/`. Proof captures remain under `work/rivet-*.jpg`.

## Launch requirements

The portfolio, studio identities, and engagements are fictional examples. Buyers replace these, configure their URL and destinations, connect and validate their own inquiry endpoint, and publish a reviewed privacy notice. Endpoint delivery has not been tested against a live business service. The local brief flow works without a backend.

No changes were committed or pushed. The standard buyer zip can be produced after these new source files are tracked; the independently installed copy verifies the source that will ship.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.

## 2026-10-10 — white-label redesign

- New hero (steel headline, anodized highlight word, riveted seam, scroll-opening image plate), rivet-head buttons, inline desktop navigation, riveted client strip, left-set section headings, philosophy strip, steel closing, new section order. No framed photo hero, rail, barcode, floating card, circular badges or highlight box remain.
- Reviewed at 1440×900 and 390×844, full page on both: no horizontal overflow; headline stays on two lines on desktop and four on phone; descenders clear of the steel clip.
- Motion sampled in headless Chromium: lines rise (0–1.2s), rivets set with overshoot, sheen sweeps once and rests off-canvas; on hover the light follows the pointer and glides off on leave; plate `--open` reaches ~0.95 after 500px of scroll. Reduced motion: `data-motion="off"`, zero running animations, all content visible.
- Buyer zip: the standalone build (Next's default PostCSS with autoprefixer) crashed on `@supports … and selector(::details-content)`; local builds hid it because the repository's PostCSS config applies inside the monorepo. The condition is now `@supports (interpolate-size: allow-keywords)`; browsers without `::details-content` drop those selectors. `package-template.mjs rivet --verify` passes (clean install, typecheck, build).
- Template typecheck, `verify:content`, static export to the demo, and catalog previews (card, full, mobile, OG) regenerated from the export. Largest source file now `styles/base.css`, 504 lines.
