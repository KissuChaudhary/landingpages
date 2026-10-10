# Plumb

A motion-led landing page for an indie SaaS product, written for a privacy-first analytics tool. One black surface tells the whole story. The live visitor counter sits in the headline like a word; as you scroll it pulls out of the sentence and becomes, in turn, the install snippet, the dashboard, a live view, the weekly email and a phone, then flies up and lands in the navigation as the "Start free" button.

After the tour: a comparison where every bar is drawn to scale (ours is the hairline), a hairline grid of smaller features, testimonials, a usage-based pricing slider, a founder's letter that signs itself as you read, a changelog you can scrub, an FAQ, a sign-up pill that opens in place, and a footer clock that counts the time you've spent on the page.

It suits any product made by a small team: analytics, forms, scheduling, developer tools, AI apps, newsletters. The tour adapts to any number of chapters, and each chapter picks its own shape.

Includes the home page, a full changelog page, privacy and terms placeholders and a custom 404.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. Funnel Display, Funnel Sans and Geist Mono are downloaded at build time and served from your own domain.

## Make it yours

Almost everything a visitor reads lives in `site.config.ts`: brand, links, the headline, the tour, the comparison, features, testimonials, pricing, the letter, the FAQ, the closing form and the footer.

| What | Where |
| --- | --- |
| Brand, copy, links, plans, FAQ, footer | `site.config.ts` |
| The tour's chapters, shapes and images | `site.config.ts` → `tour.chapters` |
| Releases (home page ruler and /changelog) | `data/changelog.ts` |
| Privacy and terms placeholders | `data/legal.ts` |
| Customer wordmarks in the hero | `site.config.ts` → `hero.logos`, styles in `components/ui/Logos.tsx` |
| Logo mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| The founder's signature | `components/sections/Letter.tsx` → `SIGNATURE` |
| Colours, type, buttons | `app/globals.css` (`:root`), fonts in `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Product screens | `public/images/`, see below |

Each section is its own component in `components/sections/`, with styles grouped by area in `styles/`. Tailwind CSS 4 is used for the shipped Hairline UI components; the scenes are plain CSS. There is no animation library.

### Colours

`--signal` is the one accent: the live dot, the charts in the screens, ours in the comparison and the main buttons of the shipped components. `--ink` is the surface that changes shape, and the closing panel. The names below them (`--background`, `--primary`…) are what the components in `components/hairline` read.

## The tour

The hero and the tour are one pinned scene. `tour.chapters` is a list; each chapter has copy (`kicker`, `title`, `body`, optional `tags`) and a `frame`, the shape the surface takes:

| Frame | What it shows | Needs |
| --- | --- | --- |
| `line` | A pill with one line of code and a Copy button. The counter rides at its start. | `code` |
| `screen` | A window the size of an image: a dashboard, a panel, an email. | `image`, `aspect` (width ÷ height), `alt` |
| `phone` | The surface becomes the bezel around a phone screen. | `image`, `aspect`, `alt` |

Add, remove or reorder chapters freely: the scroll length, the chapter counter and the step list follow. Give a `screen` a `phoneImage` and `phoneAspect` for a narrower crop on phones, and `maxWidth` to cap its size on large screens.

Not an analytics product? Keep the structure and change the content. A form builder: the line is its embed code, the screens are the builder, the responses and the notification email. A scheduling tool: the line is your booking link, the screens are the calendar and the reminder.

### The live counter

The number in the headline is one element that travels through every shape. On a screen it lands on an empty slot left in the image: `live: { x, y, size }` gives the number's left edge, its vertical centre and its font size, each as a share of the image (0 to 1). Leave `live` out and the counter fades away on that chapter.

`site.live` controls the figure. Without an `endpoint` it drifts gently inside `range`, as a demonstration. Set `endpoint` to a URL that returns `{ "value": 38 }` and it shows your real figure, refreshed every `every` ms while the tab is visible. Change the small word beside it with `hero.tokenLabel`.

## Where the buttons go

Nothing on the page opens a mock dialog or pretends something happened.

- **"Start free" and "Start free trial"** go to `links.signup`. Until you set it they scroll to the pricing.
- **Plan button**: `links.signup` with `?plan=…&billing=…&pageviews=…`. Past the last tier it starts an email to `links.email`.
- **Closing form**: posts `{ "email": "…" }` as JSON to `signup.endpoint` and shows the answer in the pill. Without an endpoint it sends visitors to `links.signup?email=…`, and without that it opens an email to `links.email`.
- **Footer**: links with an empty `href` are left out; the status pill appears once `links.status` is set.

Your endpoints must handle validation, spam protection and CORS. Any form service, CRM or your own API route works.

## Pricing

One plan priced by traffic. `pricing.tiers` lists each tier's upper limit, monthly price and plan name; the price is the tier the slider is in. `marks` label the track, `contactFrom` is where the card says "Let's talk", and `yearlyDiscount` (0.2 = 20%) adds the Monthly/Yearly switch. Rename `unit` for seats, contacts, events or credits.

## The founder's letter

Write your own in `letter`. The signature is one SVG stroke that writes itself as the visitor scrolls. To use yours, sign on a tablet or in a vector app, export a single path with no fill and paste its `d` attribute into `SIGNATURE` in `components/sections/Letter.tsx`.

## Product screens

The product appears as images, not coded mockups, so the page stays light. Replace them with screenshots of your own product and keep each chapter's `aspect` true to its image. Leave an empty spot where the live number should sit, or remove `live` from that chapter.

| Image | Used in | Size (px) |
| --- | --- | --- |
| `dashboard.webp` | Dashboard chapter, wide screens | 2080 × 1300 |
| `dashboard-phone.webp` | Dashboard chapter on phones | 716 × 1000 |
| `live.webp` | Live view chapter | 840 × 1120 |
| `report.webp` | Weekly email chapter | 920 × 1200 |
| `app.webp` | Phone chapter (the screen inside the bezel) | 544 × 1212 |

Export at twice the size they appear and keep each file under 600 KB; WebP at quality 80 is a good default.

## Motion and accessibility

- **The tour** pins the hero for a few screens of scroll. The surface's size, corners and position are eased a beat behind the scroll so it has weight; the work runs only while the tour is on screen and stops when you stop scrolling.
- **Everything that changes moves**: numbers roll like an odometer, labels morph letter by letter, buttons roll their labels and throw their arrows, the sign-up pill changes shape in place.
- **Loops**: the live dot pulses and the footer clock ticks. Both rest with the system's reduced motion setting.
- **Reduced motion**: nothing pins or slides. The hero is followed by the chapters as ordinary blocks, every bar and line is drawn from the start and numbers change in place.
- **Without JavaScript** the page renders completely, the same way.
- **Screen readers** get the tour as a plain list of chapters with image descriptions. The menu, steps, slider, testimonials, FAQ and forms work with a keyboard; the phone menu closes on Escape and returns focus.

### Motion components

Eight free components from the Hairline UI library are included verbatim in `components/hairline/`:

- **Number roll**: the live counter, the chapter count, the comparison figures, the rating and the clock.
- **Text morph**: the Copy button, the sign-up pill's answer and the labels inside the components below.
- **Pricing calculator** and **pricing toggle**: the traffic slider with rolling prices and the Monthly/Yearly switch.
- **Testimonials**: one quote at a time, chosen by its people, with a ring for a timer.
- **Changelog scrubber**: the releases on a ruler of days on the home page.
- **Changelog trace**: the full changelog page, with filters and a bead that rides the line.
- **FAQ accordion**: answers that open to their real height.

They need only React and Tailwind. The `ui-` keyframes at the end of `app/globals.css` belong to them.

## Pages

| Route | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/changelog` | `app/changelog/page.tsx` (from `data/changelog.ts`) |
| `/privacy`, `/terms` | `app/privacy/`, `app/terms/` (from `data/legal.ts`) |
| 404 | `app/not-found.tsx` |

## Check and deploy

```sh
npm run typecheck
npm run verify:content
npm run build
```

`verify:content` checks the tour's chapters and images, the live counter's slots, the pricing tiers, the changelog's order and tags, section links and every image the site points at.

Deploy anywhere that runs Next.js (Vercel, Netlify, Cloudflare, your own Node server). For a fully static site, build with `PLUMB_EXPORT=1 npm run build` and upload the `out/` folder. If the site lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH=/your-path`. Set `meta.url` once you have a domain so social previews use absolute image links.

## Licence

Template usage terms are in `LICENSE.md`. Fonts are licensed under the SIL Open Font License through Google Fonts. The brand, people, sites, quotes, figures and plans are fictional; replace them before presenting them as facts about a real business.
