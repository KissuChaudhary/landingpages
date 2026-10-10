# Turnout

A motion-led landing page for an experiential studio: pop-ups, launch nights, community programs and creator trips. Photo capsules cycle inside the headline, a filmstrip drifts beneath it, an attention chart draws as you scroll, services stack like folders and a ten-week timeline guides the process.

It works for any agency or studio that sells in-person work: events, hospitality, brand experiences, community, retail. Swap the copy in one file and the photos in one folder.

Includes a home page, five case studies, a filterable work index, a journal with three articles, a working contact form, privacy and terms placeholders, and a custom 404.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. Bricolage Grotesque and Geist are downloaded at build time and served by Next.js from your own domain.

## Make it yours

Almost everything a visitor reads lives in `site.config.ts`: brand, links, menu, every heading and paragraph, photo capsules, filmstrip frames, services, steps, client notes, team, plans, FAQ and footer.

| What | Where |
| --- | --- |
| Brand, links, copy, plans, team, FAQ, footer | `site.config.ts` |
| Case studies (cards, /work and /work/[slug]) | `data/work.ts` |
| Journal articles | `data/articles.ts` |
| Privacy and terms placeholders | `data/legal.ts` |
| Client logos in the strip | `components/ui/Logos.tsx` |
| Logo mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| Colours, type, buttons, reveal timings | `styles/base.css` |
| Section order on the home page | `app/page.tsx` |
| Photos | `public/images/`, see `ASSETS.md` |

Each section is its own component in `components/sections/`, with styles grouped by area in `styles/`. There is no Tailwind requirement, no animation library and no runtime dependency besides Next.js and React.

### Colours

The palette is five variables at the top of `styles/base.css`. `--lime` is the brand accent (buttons, footer, highlights); `--iris`, `--stone` and `--blush` colour the service, process and result cards. Each card picks its colour with an `accent` field in the config (`"lime" | "iris" | "stone" | "blush"`).

### The headline and filmstrip

`hero.title` is one string per line. Slots such as `[0]` select the three-photo sets in `hero.capsules`. `hero.reel` lists the photos, captions and landscape frames in the filmstrip; its component is `components/ui/Filmstrip.tsx`.

## Links, forms and plans

- `links.booking`: a booking page (Cal.com, Calendly, SavvyCal…). Every "Plan an event" button goes there. Empty, they go to `/contact`.
- `links.contactEndpoint`: receives the contact form as JSON (`POST`). Empty, the form opens the visitor's email app addressed to `links.email`, with every answer filled in, so it works on day one.
- `links.newsletterEndpoint`: receives `{ "email": "…" }` as JSON (`POST`). Empty, the footer form opens an email instead.
- `pricing.plans[].href`: where each plan's button goes. Empty, it opens `/contact` with the plan and billing period filled in at the top of the form.
- `links.social`: footer icons. Empty entries are hidden.

Your endpoints must handle validation, spam protection and CORS. Form services such as Formspree, Basin or your own API route all work; the form sends `name, email, company, kind, budget, dates, message, plan, page`.

### Pricing

Prices are per month. `quarterly` is the price on a quarterly retainer; `yearly` is the monthly equivalent when billed yearly. The cards show the total for the period under the price. Keep `pricing.saving` true to your numbers: `npm run verify:content` checks that each yearly price is exactly that percentage off. Mark one plan as `featured` for the dark card.

## Photos

The photos are original, generated for this template (see `ASSETS.md`). Replace them with your own work at similar proportions and keep the file names, or point the config and `data/work.ts` at new ones.

| Image | Used in | Shape |
| --- | --- | --- |
| `hero-*.webp` | Headline capsules and filmstrip | Cropped portrait and landscape frames |
| `feature-line.webp`, `feature-creator.webp` | Season of content | 3:4 and 4:3 |
| `work-*.webp` | Case study cards and pages | Square; the first featured one is shown 16:9 |
| `svc-*.webp` | Service cards | 8:9 |
| `team-*.webp` | Team row | 3:4 portrait on a solid backdrop |
| `quote-lena.webp`, `avatar-*.webp` | Client notes | 3:4 and square |
| `journal-*.webp` | Journal cards and articles | 4:3 |
| `cta-crowd.webp` | Closing panel | 4:3 |

Keep each file under 600 KB (the content check warns above that). WebP at quality 80 is a good default.

## Motion and accessibility

- Everything that changes moves: labels morph letter by letter, numbers roll like an odometer, buttons roll their labels and throw their arrows, the billing note slides in from the side you chose.
- Headline capsules, filmstrip, logo strip and client notes loop on their own. System reduced motion stops the loops; the case study spotlight holds while you hover or focus it.
- With the system "reduce motion" setting on, nothing pins, slides or loops: both attention curves are drawn, the services stack in normal flow and every element is visible from the start.
- The menu, project tabs, filters, FAQ and forms work with a keyboard. The phone menu closes on Escape and returns focus to its button. Form errors are announced and move focus to the first field that needs attention.
- Without JavaScript the page still renders completely.

## Pages

| Route | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/work`, `/work/<slug>` | `app/work/` (one page per entry in `data/work.ts`) |
| `/journal`, `/journal/<slug>` | `app/journal/` (one page per entry in `data/articles.ts`) |
| `/contact` | `app/contact/page.tsx` |
| `/privacy`, `/terms` | `app/privacy/`, `app/terms/` |
| 404 | `app/not-found.tsx` |

## Check and deploy

```sh
npm run typecheck
npm run verify:content
npm run build
```

`verify:content` checks the billing maths, featured plan, case study and article data, menu anchors and that every image exists and isn't oversized.

Deploy anywhere that runs Next.js (Vercel, Netlify, Cloudflare, your own Node server). For a fully static site, build with `TURNOUT_EXPORT=1 npm run build` and upload the `out/` folder. If the site lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH=/your-path`. Set `site.url` once you have a domain so social previews use absolute image links.

## Licence

Template usage terms are in `LICENSE.md`. Fonts are licensed under the SIL Open Font License through Google Fonts. The brand, people, figures and case studies are fictional; replace them before presenting them as facts about a real business.
