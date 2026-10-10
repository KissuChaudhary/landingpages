# Tessera verification (maintainers only, not shipped)

Checked 10 October 2026 with headless Chromium (Playwright from the npx cache) against `next dev` on :3490 and the static export served from `public/demos/tessera`.

## Builds and checks

- `npx tsc --noEmit`: clean.
- `npm run verify:content`: valid (3 system studies, 2 notes, 4 capabilities, 2 offers).
- `npm run export:demo` (production build with the demo base path): 11 static pages including three system studies and two journal notes; 103 kB shared first-load JS. Re-exported after the last edit to the study pages.
- Static demo under `/demos/tessera`: every link resolves to its `.html` file (including the engagement-prefilled contact links), no broken images, no console errors.

## Layout

- Desktop 1440 × 900: every section reviewed in scroll captures. The block-wipe headlines finish about a second after each line enters (earlier captures taken mid-wipe looked like stuck blocks; captures 2.6 s after scrolling show every line clear).
- Phone 390 × 844 (mobile emulation): document width is exactly 390 px; sections stack cleanly, offers and FAQ read in one column.
- Reduced motion: no wipes, no breathing tiles, no scroll drift; every headline is complete from the start.
- No JavaScript: no element is hidden.

## Interactions

- Capability explorer: clicking the third tab selects it and swaps the panel; ArrowDown moves selection and focus to the next tab; Home returns to the first.
- Engagements: switching to "Ongoing partner" rolls $4,800 → $3,600 and $9,200 → $7,800 per month; `aria-pressed` follows; offer buttons link to `/contact?engagement=…` and the contact select picks the value up (unknown values are added as an option rather than lost).
- FAQ: one answer open at a time, `aria-expanded` follows.
- Contact: an empty submit is stopped by native validation and focuses the name field; without an endpoint the brief opens as an email draft, never claiming it was sent.
- Pages: three system studies, two journal notes, privacy and terms return 200; unknown paths show the custom 404.
- Phone menu opens from the header and closes on Escape.
