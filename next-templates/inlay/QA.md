# Inlay QA (maintainers only, not shipped)

Checked 10 October 2026 with headless Chromium (Playwright from the npx cache) against `next dev` on :3470 and the static export served from `public/demos/inlay`.

## Builds and checks

- `npx tsc --noEmit`: clean.
- `npm run verify:content`: 138 checks pass.
- `npm run build`: 4 static routes (home, privacy, terms, 404); home page 131 kB first-load JS.
- `npm run export:demo`: 2.3 MB static export. Under `/demos/inlay` every link resolves to its `.html` file, no image fails, no console errors.

## Layout

- Desktop 1440 × 900: every section reviewed in scroll captures; the hero tiles wait in the margins clear of the headline and land in their slots by the time the page frame reaches the top.
- Phone 390 × 844 (mobile emulation): the page can't scroll sideways. Two fixes on the way: the fanned tile band widened the hero's grid track (now stretched with negative margins), and the Connect tiles meant for desktop showed on phones (`display: grid` overrode `hidden`). The Build board's 3D overflow is clipped by its section.
- Reduced motion: tiles sit in their slots, no pinning or looping, the checkout shows the receipt, every story chapter at full strength, the carousel doesn't advance.
- No JavaScript: every section renders; only the platform hover labels are hidden.

## Interactions

- Claim field: "ab" → "At least three characters"; "@Ines Park" cleans to `inespark` → "inlay.me/inespark looks good"; the example page's address, the dock ("Claim inlay.me/inespark") and the footer wordmark follow; Enter scrolls to pricing when there's no sign-up link.
- Balance: payments fly in and roll the balance (€2,486.40 → €2,521.40 after one arrival); Pay out → "Paying out" → "Sent to •••• 4021" with the balance at €0.00; the Paid out tab rolls to the new total.
- Pricing: yearly switches Plus to €7 with "€84 billed yearly"; plan buttons fall back to an email without a sign-up link.
- FAQ: one answer open at a time, `aria-expanded` follows.
- Carousel: Next moves one card; it advances on its own every 6 s while on screen; Pause holds it and morphs to Play.

## Images

All pictures are rendered from HTML/SVG in `work/inlay-shots/` (`render.cjs`) at 2x and converted to WebP; 27 files. No photographs: image generation wasn't reachable from the session that built it.
