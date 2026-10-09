# Shear: design notes (internal, not shipped)

## Brief

The owner asked for a template close to optivio.framer.website (an SEO-audit Framer template): same section rhythm and motion vocabulary, a new name, product, positioning and copy, nothing that reads as a clone, and better than the reference wherever possible. No mock popups; buyers plug in and run.

## Positioning

Shear: cloud cost control. It finds idle and oversized cloud resources and ships the fix as a pull request. Hero line: "Turn cloud spend into margin automatically", with the last word cycling through margin, runway, savings, headroom and profit.

## Visual system

- Near-black frames (`#08090b`) inset from the page edge open and close the page (hero, footer). White page, cool grey containers (`#f2f4f3`) instead of the reference's cream. One accent: mint (`#7cf0b5`), mint-ink (`#0a8552`) for text on light. No orange.
- Mona Sans (variable, with its width axis) for everything; Fragment Mono for figures in scenes and the glyph canvas. Headings at weight 430–460, tracking −0.035 to −0.045em.
- Pill buttons with a dark disc holding the mark; the mark's halves slide along their cut on hover.

## Section map (reference → Shear)

| Reference | Shear | Improvement |
| --- | --- | --- |
| Hero over an ASCII video, word swap | Hero over a live glyph canvas ("the bill, falling"), word morph through the width axis | Canvas reacts to the cursor, pulses on each word change, fades under the copy, sleeps off screen |
| Logo pills | Logo marquee tiles (Hairline UI) + pause control | Pause for everything that loops |
| Bento with photo, scroll spread | Bento with a live bill chart, scroll spread | Figures roll once the grid lands; chart draws and the bill rolls down |
| Comparison table | Raised dark Shear column with a light sweep, row hover across columns | Phones get a switch between the two alternatives instead of a long stacked list |
| Feature slider with videos | Feature carousel with six coded product scenes | Drag, snap, counter and progress hairline; scenes play only while visible |
| Hover accordion with photos | Hover accordion with product scenes (connect, review, merge) | Phones get a tap accordion |
| Tabs + gradient image | Tabs with a thrown thumb and autoplay fill, copy slides with direction, light field blends colours | Registered colour properties so the gradient transitions |
| Photo + benefits | Monday digest card on a glyph tile + benefits | |
| Testimonials with photos | Staggered grid, monogram avatars, a customer result tile | |
| Pricing | Hairline UI pricing toggle and rolling prices; plan buttons go to checkout / sign-up / sales email | |
| FAQ | Hairline UI FAQ accordion with a sticky intro | |
| Gradient CTA + footer | Light glyph field CTA + dark footer whose giant wordmark shears back into line | |

## Motion rules followed

No animation library. Loops carry `.loop` (paused by the pause button and by reduced motion). Canvas loops run only in view and in a visible tab. Every changing number uses NumberRoll, every changing label TextMorph. Reduced motion: still frames, all text visible.
