# Inlay design brief (maintainers only, not shipped)

## Brief

The owner asked for a template built from the structure and motion of portrait.so (a link-in-bio and onchain wallet product), without copying it: a new name, new copy, new positioning, and every moment at least as good as the reference. No popups, plug-and-play for buyers.

Inlay is positioned as a **link in bio you arrange like a gallery wall, that also pays you**: tiles (photos, posters, music, products, bookings, newsletter) on one page, with tips, sales, bookings and instant payouts in fiat. No crypto. The featured creator is Noa Lindqvist, a type designer and poster artist, so every tile is artwork rendered in code. The owner chose code-made art; image generation wasn't reachable from this session, so there are no photographs. The example page's first tile is an open-studio poster rather than a portrait.

## What we kept from the reference, and what we changed

| Reference | Inlay |
| --- | --- |
| Pill nav with a centred "Introducing Wallet" announcement | White pill nav with section links, a gliding highlight on the active section, compacts on scroll, phone menu grows out of the bar. The announcement moved to a chip above the headline |
| Serif-italic gradient accent words in every heading | A "tile word": one bracketed phrase per heading sits in a solid tile that drops into the line from a tilt as it scrolls in (ultramarine, ink, outline or citrine). No serif, no gradient |
| Username field with a vertical roll of names (`portrait.so/luca`) | A real handle field: idle examples morph letter by letter, typing validates live (optional availability endpoint), and the typed handle follows the visitor into the example page's address, the dock and the footer wordmark |
| Scattered photos fly into a profile grid on scroll | Same mechanic, rebuilt: tiles drift (bob, tilt) and lean toward the pointer, land with dashed slots fading, a tile bar rises when all are seated. On phones the tiles wait as a fanned hand of cards under the claim field |
| Fixed "Portrait Wallet / Get early access" pill at the bottom | A dock that appears after the hero, carries the visitor's handle ("Claim inlay.me/ines") and steps aside wherever the page already has a call to action |
| Leather wallet with a balance | An ultramarine stage: payment chips fly in from the edges and land in a live balance that rolls up; feed rows slide in; tabs roll between balance, month and paid out; Pay out really empties it and morphs through busy and done |
| Four feature rows in tinted panels | One pinned stage beside four chapters: the picture rises into the panel like a tile dropping in, the panel changes tone, checks draw |
| Autoplay carousel with pill dots and pause | Same, plus drag, swipe and arrow keys; the active dot fills as its timer; hover and focus hold it |
| Early access with drifting icons | Inline email form with a status button; icon tiles drift at different depths with scroll |
| Commerce card, then a checkout sheet | One surface: the product tile grows into the checkout, a payment bar sweeps, the sheet reshapes into the receipt, "+€48.00 to your balance" rises out; a three-step indicator follows |
| Platform logos with dashed lines to the centre | Hairlines draw from each platform to an ellipse around the headline; pulses keep travelling inward; pointing at a platform lights its line |
| "Creating is easy" steps beside a tilted frame | A tilted board where a cursor performs each step (drop, resize with neighbours reflowing, drag with the grid rearranging); flattens on hover; steps clickable with a progress line |
| Single Plus card | Free beside Plus in one card, monthly/yearly switch with a thrown thumb, rolling price, billing note sliding from the chosen side |
| Two-column FAQ | Same, one open at a time, plus turns into a cross |
| Footer | Opens on the visitor's own address set in tiles that drop into place (`inlay.me/you` or their handle) |
| — | Added: a showcase of six creator pages in two rows that drift with scroll |

## Palette and type

White page `#ffffff`, surface `#f4f5f7`, ink `#0d0e12`, ultramarine `#2b3bff` (brand). Poster palette inside artwork only: vermilion `#ff3d2e`, citrine `#f3d33c`, bone `#eceae3`, mint, lilac, sky. Mona Sans variable (width + weight) for everything: headings at `font-stretch: 112%`, weight 640. Hairlines and 1px rings only, no shadows, no blur.

## Pictures

Tiles, product screens and showcase pages are authored as HTML/SVG in `work/inlay-shots/` (`kit.css`, `shots.cjs` for tiles and art, `ui.cjs` for product screens, `pages.cjs` for showcase pages) and rendered at 2x with headless Chromium by `render.cjs`, which writes WebP into `public/images/`.
