# Inlay

A motion-led landing page for a link-in-bio app that pays its users: pages built from tiles (photos, posters, music, products, bookings) with tips, sales and instant payouts built in.

Tiles wait scattered around the headline and fly into a creator's page as you scroll. The handle a visitor types follows them down the page. Payments fly into a live balance that rolls like an odometer, a product tile grows into a checkout and then a receipt, a cursor builds a page on a tilted board, and the footer ends on the visitor's own address.

It suits any product where people make a page and get paid from it: link-in-bio and personal-site builders, creator storefronts, booking and membership tools, portfolio platforms, payments for freelancers.

Includes the home page, privacy and terms placeholders and a custom 404.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. Mona Sans is downloaded at build time and served by Next.js from your own domain.

## Make it yours

Everything a visitor reads lives in `site.config.ts`: brand, links, menu, every heading and paragraph, the example page and its tiles, the balance card, the story chapters, the carousel, plans, FAQ and footer.

| What | Where |
| --- | --- |
| Brand, links, copy, plans, FAQ, footer | `site.config.ts` |
| The page address shown everywhere (`inlay.me/…`) | `site.config.ts` → `handleDomain` |
| The example page in the hero and its tiles | `site.config.ts` → `page`, grid in `styles/hero.css` |
| Privacy and terms placeholders | `data/legal.ts` |
| Logo mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| Platform marks in "Bring every corner" | `components/ui/Platforms.tsx` |
| Colours, type, buttons, reveal timings | `styles/base.css` |
| Section order on the home page | `app/page.tsx` |
| Pictures | `public/images/`, see `ASSETS.md` |

Each section is its own component in `components/sections/`, with styles grouped by area in `styles/`. There is no Tailwind requirement, no animation library and no runtime dependency besides Next.js and React.

### Headings with a tile

Put one phrase of a heading in square brackets and it's set in a tile that drops into the line as it scrolls into view: `"Get paid by [@handle]."`. Leave the brackets out for a plain heading.

### Colours and type

The palette is a handful of variables at the top of `styles/base.css`. `--ultra` is the accent (tiles in headings, buttons, live dots). The poster colours (`--citrine`, `--red`, `--bone`) appear in the artwork and the panels behind product pictures, which each story chapter picks with `tone: "ultra" | "ink" | "paper" | "citrine"`. Mona Sans is a variable font: headings run wider (`font-stretch: 112%`) and heavier than body text.

### The hero tiles

`page.tiles` lists the tiles on the example page. Each has a `slot` (a–g, laid out in `.pf-grid` in `styles/hero.css`: a 4-column grid on wide screens and 2 columns on phones), an image and two waiting positions:

- `scatter`: where the tile waits around the headline on wide screens, as fractions of the hero's width and height, with a tilt in degrees.
- `phone`: where it waits in the fanned-out band under the claim field on phones, or `null` to simply fade in.

Tiles stay in their slots in the markup, so without JavaScript or with reduced motion the page is complete.

## Links and forms

- `links.signup`: your sign-up page. Every "Sign up" and "Claim your page" goes there, with the handle the visitor typed added as `?handle=…` (and `&plan=plus-yearly` from pricing). Empty, they lead to the claim field in the hero, and claiming a handle shows the plans.
- `links.login`: your app's login. Empty, the "Log in" links are hidden.
- `links.handleCheck`: optional live availability. The claim field calls `GET {handleCheck}?handle=noa` and expects `{ "available": true }` or `false`. Empty, handles are only checked for length and characters.
- `links.waitlistEndpoint`: receives `{ "email": "…" }` as JSON (`POST`) from the early-access form. Empty, the form opens an email to `links.email`.
- `links.newsletterEndpoint`: the same for the footer form.
- `pricing.plans[].href`: where a plan's button goes. Empty, it uses the sign-up link (or an email when there isn't one).
- `links.social`, `links.status`: footer icons and status link. Empty entries are hidden.

Your endpoints must handle validation, spam protection and CORS. Form services such as Formspree, Basin or your own API route all work.

### Pricing

Prices are per month. `yearly` is the monthly equivalent when billed yearly; the card shows the yearly total under the price. Keep `pricing.saving` true to your numbers: `npm run verify:content` checks that each yearly price is exactly that percentage off. Mark one plan as `featured`.

## Pictures

Every picture is original to this template (see `ASSETS.md`). The posters, covers and product screens are plain WebP files, so you can swap in screenshots of your own product at similar proportions and keep the file names, or point the config at new ones.

| Image | Used in | Shape |
| --- | --- | --- |
| `tile-*.webp` | Hero tiles and the build board | Square cells; `tile-nordlys` is 2 × 1, `tile-glyph` 1 × 2 |
| `noa-avatar.webp` | Example page header | Square |
| `story-*.webp` | Story chapters | Portrait card on a transparent background |
| `extra-*.webp` | "Built in" carousel | Card on a transparent background, about 6:5 |
| `sell-page.webp`, `sell-checkout.webp`, `sell-paid.webp` | Storefront sequence | 720:560 page; the checkout grows from the product tile at the position set in `SHEET` in `components/sections/Sell.tsx` |
| `page-*.webp` | Showcase | 3:4 |
| `og.jpg` | Social preview (once `site.url` is set) | 1200 × 630 |

Keep each file under 600 KB (the content check warns above that). WebP at quality 80 is a good default.

## Motion and accessibility

- Everything that changes moves: labels and status messages morph letter by letter, amounts roll like an odometer, buttons roll their labels and morph through busy and done, the billing note slides in from the side you chose.
- Scroll drives the hero tiles, the story pictures, the checkout sequence and the showcase rows. The carousel advances on its own only while it's on screen; hovering or focusing it holds it, and its pause button stops it.
- With the system "reduce motion" setting on, nothing flies, pins or loops: the tiles sit in their slots, the checkout shows its receipt and every element is visible from the start.
- The menu, claim field, balance tabs, carousel, plans, FAQ and forms work with a keyboard. The phone menu closes on Escape and returns focus to its button. Form errors are announced.
- Without JavaScript the page still renders completely.

## Check and deploy

```sh
npm run typecheck
npm run verify:content
npm run build
```

`verify:content` checks the billing maths, the featured plan, handles, tile slots and positions, heading brackets, menu anchors and that every image exists and isn't oversized.

Deploy anywhere that runs Next.js (Vercel, Netlify, Cloudflare, your own Node server). For a fully static site, build with `INLAY_EXPORT=1 npm run build` and upload the `out/` folder. If the site lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH=/your-path`. Set `site.url` once you have a domain so social previews use absolute image links.

## Licence

Template usage terms are in `LICENSE.md`. Mona Sans is licensed under the SIL Open Font License through Google Fonts. Platform marks belong to their owners. The brand, people, figures and pages are fictional; replace them before presenting them as facts about a real business.
