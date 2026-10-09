# Shear QA (internal, not shipped)

Checked on 10 October 2026 against the dev server and the static export, in headless Chromium at 1440×900, 820×1180 and 390×844.

- Typecheck clean. No console errors or warnings at any width (a server/browser number-format mismatch was fixed by passing `site.locale` to every formatter, and SVG coordinates are rounded).
- Hero: the headline word rotates; the transition was sampled frame by frame (old word compresses and blurs out, new word settles in, no overlap). The glyph field animates, stops when paused, and is a still frame with reduced motion.
- Sign-up field: invalid email shakes and shows a hint; with no destination it scrolls to the plans; with `endpoint` it POSTs `{ email }` and shows the success message (and "try again" on a 500); with `url` it opens the page with `?email=` filled in. Endpoint and URL modes were tested with a temporary config and restored.
- Floating nav appears after the hero and hides at the top; the phone menu opens in place and Escape closes it.
- Carousel arrows step a card; team tabs switch by click and arrow keys; pricing toggle changes prices and plan links (free → sign-up, paid → sales email with plan and period, enterprise → sales); FAQ opens; steps open on hover (desktop) and tap (phone).
- Pause stops the glyph field and every infinite animation in the hero, and is remembered after reload. Spinners only spin while visible.
- Reduced motion: every reveal word and block visible without scrolling, no pause button, word static, canvas still.
- No horizontal overflow anywhere at any of the three widths.
- After converting the product scenes to images (same day): all 67 interaction checks pass again; the screens render identically to the coded versions; total image weight about 250 KB.
