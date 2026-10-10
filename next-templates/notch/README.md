# Notch

A motion-led landing page for B2B software, written for a time-tracking, capacity and invoicing product for agencies and studios. A light curtain of fluted blue bars opens on load, the product shot straightens as you scroll, and every section has its own considered motion: rolling button labels, odometer numbers, an auto-advancing workflow, and a deck of product screens you can shuffle.

Includes a home page, a journal with three articles, privacy and terms placeholders, and a custom 404.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. Geist and Geist Mono are bundled locally; builds require no font downloads.

## Make it yours

Almost everything you change lives in `site.config.ts`: brand, links, navigation, every heading and paragraph, plans, customer stories and the footer.

| What | Where |
| --- | --- |
| Brand, links, copy, plans, stories, footer | `site.config.ts` |
| Journal articles | `data/articles.ts` |
| Privacy and terms placeholders | `data/legal.ts` |
| Customer logos in the strip | `components/ui/Logos.tsx` |
| Logo mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| Colours, type scale, buttons | `styles/base.css` |
| Section order | `app/page.tsx` |
| Screens and photos | `public/images/`, see `ASSETS.md` |

Each section is its own component in `components/sections/`, with styles grouped by area in `styles/`. There is no Tailwind requirement and no animation library.

### Your product screens

The product visuals are images, not coded mockups, so the page stays fast. Replace the files in `public/images/` with screenshots of your own product at the same proportions and keep the file names, or point the config at new ones:

| Image | Used in | Size (px) |
| --- | --- | --- |
| `dashboard.webp` | Hero and closing panel | 2720 × 1760 |
| `dashboard-phone.webp` | Hero on phones | 780 × 1064 |
| `timesheet.webp`, `approvals.webp` | Wide feature cards | 1520 wide, transparent margin |
| `timer.webp`, `capacity.webp` | Narrow feature cards | 1000 wide, transparent margin |
| `card-*.webp` | Cards over the workflow photos | 776 wide, transparent margin |
| `planner.webp`, `portal.webp`, `rates.webp`, `reports.webp`, `mobile.webp` | Feature deck | 2080 × 1200 |

The feature-card images carry 24px (48px at 2×) of transparent margin around the card so it lines up with the copy. Export your screens the same way, or adjust the offsets in `styles/product.css`.

## Links and plans

- `links.signup`: where "Start free trial" and "Get started" go. Empty, they scroll to pricing.
- `links.signin`: shows "Sign in" in the menu when set.
- `links.sales`: a booking link for the custom plan. Empty, it opens an email to `links.email`.
- `plans[].checkout.monthly` / `.yearly`: a checkout URL per plan and billing period. An empty checkout falls back to `links.signup`, and then to an email that names the plan and billing period.
- `appStore` / `playStore`: optional links shown in the closing section.
- `social`: footer links. Empty entries are hidden.

Prices are per person per month. The yearly price is the monthly equivalent when billed yearly; the page shows the yearly total and the saving. Keep `yearlyNote` true to your numbers ("2 months free" means the saving is exactly two months, which `npm run verify:content` checks). Mark exactly one plan as `featured`: it gets the dark card, and the others share the white panel beside it.

## Motion

- **Hero:** the bars rise from the edges while a white bowl opens over them, the tally badge draws itself, headline words rise in, and the product shot settles flat as you scroll. Bars near the pointer catch extra light.
- **Sections:** headings, cards and images reveal once as they enter view.
- **Buttons:** labels roll letter by letter on hover.
- **Workflow:** steps advance every `workflow.interval` milliseconds while the section is on screen. Hovering pauses it, and choosing a step stops it.
- **Feature deck:** choosing a feature drops the front screen and brings the chosen one forward. Arrow keys, Home and End move between features.
- **Numbers:** stats and prices roll like an odometer.
- **Footer:** the wordmark sizes itself to the container and its letters rise in.

Everything respects the system "reduce motion" setting: content appears in place, the product shot is flat, and nothing loops. The logo strip and the workflow steps are the only things that move on their own. They stop with system reduced motion.

## Accessibility

Real links for every call to action, a skip link, visible focus styles, tab semantics with arrow-key support for the workflow steps and the feature deck, a radio group for billing, and a phone menu that closes on Escape and returns focus. Decorative layers are hidden from assistive technology, and inactive images and labels are marked hidden.

## Check your edits

```sh
npm run typecheck
npm run verify:content
npm run build
```

`verify:content` checks plan maths, link fallbacks, section anchors, article slugs and dates, and that every referenced image exists.

## Deploy

Any Node host works with `npm run build` and `npm start`. For a static host, build with `NOTCH_EXPORT=1 npm run build` (this turns on `output: "export"` in `next.config.ts`) and upload the `out/` folder. If a static export lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH` at build time; links and images follow it.

The brand, people, companies, numbers and quotes are fictional placeholders. Replace them before launch. Image provenance is in `ASSETS.md`; usage terms are in `LICENSE.md`.
