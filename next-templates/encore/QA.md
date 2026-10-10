# Encore QA (internal, not shipped)

Checked on 10 October 2026 against the dev server and the static export, in headless Chromium at 1440×900, 820×1180 and 390×844, plus an overflow sweep at 360, 390, 600, 768, 820, 1024, 1180, 1280, 1440 and 1920.

- Typecheck clean. No console errors or warnings at any width.
- Hero deck: shuffles on its own every 3.8 s, holds under the pointer, steps on click/tap; the chip's flow name and revenue follow the front email. With reduced motion it stays put but still steps on click.
- Header: the nav underline rests under the section in view; the phone menu opens in place, Escape closes it and returns focus to its button.
- Services: rows open on hover (desktop) and tap (phones), one at a time; the preview wipes up or down by direction.
- Process: the timeline fills with scroll and all four stages light by the end (desktop, tablet, phone).
- Results: the floating email preview appears beside the pointer on desktop; phones show thumbnails.
- Testimonials: tabs switch on click, arrow keys and Home; autoplay advances on desktop when the line fills and holds while pointed at or focused.
- Pricing: every button has a real destination (booking or audit link). FAQ opens.
- No pause button (removed on the owner's call, same day). The orbit rings and the closing marquee hold under the pointer; the client strip eases to a stop under it; the deck and the quote autoplay hold under the pointer and wait off screen.
- Reduced motion: every reveal visible without scrolling, no endless animation.
- Layout fixes found in this pass: featured-case metric wrapping on phones, orbit chips poking past the edge (rings resized, section clips as a safety net), pricing price overflowing at tablet width, testimonials column refusing to shrink at 360 px, and the Why grid leaving empty cells (last tile now widens to close the grid for 4–6 points).
- Images: no HTTP errors; the only unloaded images are lazy duplicates that are hidden at that width (phone thumbnails on desktop, collapsed service rows on phones).
- 85 interaction checks pass on the dev server and on the export.
