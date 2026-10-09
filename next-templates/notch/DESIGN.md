# Notch design direction

Reference: https://herospark.framer.website/ (home), inspected on 9 October 2026 with headless Chromium: full-page captures, timed load frames, and sampled transforms while scrolling.

Observed in the reference: an orange "reeded glass" curtain image whose white centre opens on load; Inter Display headline, 88px, -0.05em; a dashboard image that starts at scale 1.2 and shrinks to 1.0 over the first ~430px of scroll; logo marquee; two-tone section headings that fade up 50px; a four-card bento sliding in from the sides; a photo with a floating card next to a three-item list with an orange progress line under the first item (static, it never advances); pills over a stacked deck of screens (clicking a pill brings its screen forward); a dark testimonials band with count-up stats; pricing with a dark first card and two plans sharing a white panel; two blog cards; an app-download CTA panel with the curtain behind it; a giant gradient wordmark footer. Buttons roll their letters on hover. The yearly toggle raises prices while advertising a discount.

Notch keeps that section order and rhythm but is its own product: operations software for agencies and studios (timesheets drafted from calendars and commits, capacity, invoices, payouts). The concept ties the curtain to the product: vertical bars of light read as tally marks, the brand mark is a tally, and the hero badge draws its strokes on load.

What changed on purpose:
- Cobalt light instead of orange (the catalog already has many orange templates, and the owner avoids orange accents). The curtain is CSS, not an image: 22 bars with a fluted highlight, a white bowl that scales open, bars rising edge-first, and pointer light on hover.
- The product shot tilts back (rotateX 20°) and settles flat with scroll instead of shrinking from 1.2.
- Headline words rise through a clip with a slight rotation; section headings blur in line by line.
- The workflow list actually advances (CSS progress animation drives it), pauses off-screen, on hover and with the pause control, and stops when a visitor chooses a step. Photo and floating card cross-fade with a blur.
- The deck drops the front card away and brings the chosen one forward; back cards are quiet tinted sheets rather than half-visible screens.
- Stats and prices use odometer digits; the billing thumb slides with a slight overshoot; the yearly toggle lowers prices and states the yearly total and saving correctly.
- The footer wordmark fits its container exactly for any brand name and fades blue to ink letter by letter.
- No QR code (it would need a generator); the closing card links to app stores when configured.
- All product UI ships as images rendered from HTML layouts (the source and renderer live in `work/notch-shots/`), so no coded dashboards run on the page. Photos were generated with GPT Image 2.5 on fal at low quality, 7 generations in total; portraits were cropped from one grid.

Type: Geist 400/500/600, Geist Mono for the timer in the product images. Hero 92px, -0.052em; section titles 64px, -0.048em; phones 36–44px and 30–36px.

Integration: standalone Next.js project in `next-templates/notch`. `npm run export:demo` builds the static demo into `public/demos/notch`; the catalog entry is `src/data/template-catalog/notch.ts` and the iframe wrapper is `src/templates/notch`. Regenerate product screens with `node work/notch-shots/render.cjs` and photos with `node work/notch-assets.cjs`.
