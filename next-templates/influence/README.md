# Influence

A landing page template for short-form video studios, creator agencies and social media managers.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No photos, no images to host, no API keys, no CDN scripts.

Soft off-white, near-black ink and one orange. Headlines are heavy Inter Tight with one italic serif phrase. The
look comes from the platforms themselves: round pills, a stack of social badges in the headline, a phone with
floating metrics, and vertical video thumbnails with live-caption highlights. The creator videos are drawn from a
colour pair, a shape and a hook, so there is nothing to license. There are no drop shadows; depth comes from
hairlines and white surfaces.

## Start in two minutes

```bash
npm install
npm run dev
```

Open http://localhost:3000. That is the whole setup. It needs Node 18.18 or newer and an internet connection the
first time you build (the fonts are downloaded once and then served from your own site).

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript check
```

## Make it yours (all in one file)

Open `site.config.ts`. Your studio name, navigation, headline, case studies, video thumbnails, process, quotes,
plans, FAQ and footer all live there. Change the text, save, and the page updates. TypeScript flags a missing or
misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, numbers, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The drawn video thumbnails | `components/ui/Reel.tsx` |
| The platform badges | `components/ui/Icons.tsx` |

### Sections

Hero (headline with platform badges, a phone with floating metrics, social proof), a slow strip of headline numbers,
results (one case study with a chart and three smaller ones), work (a wall of video thumbnails with a working filter),
process (a dark timeline), creators (one video testimonial and six short quotes), pricing (a comparison table with a
billing switch), FAQ, and a closing block. To drop a section, delete its line in `app/page.tsx`. To reorder, move it.

### How the data-driven parts work

- **Video thumbnails:** each reel has two colours (`from`, `to`), a text colour (`ink`), a `shape` (`arc`, `dots` or
  `stripes`), a hook and a handle. Put `*asterisks*` around a word in the hook to highlight it like a live caption.
  If you have real thumbnails, put the images in `public/` and swap them in inside `components/ui/Reel.tsx`.
- **Charts:** `results.featured.points` and each `others[].points` are plain lists of numbers. The line and the
  filled area are drawn from them.
- **Filter:** `work.filters` is the list of buttons. The first one is "show all"; each other name must match the
  `category` of the reels it should show.
- **Pricing:** each plan has a base monthly `price`. `rows` lists one feature per row with one value per plan, in plan
  order: a string, `true` (tick) or `false` (dash). Mark one plan `featured: true` for the dark column. The billing
  switch recalculates prices from `billing.discount`.
- **Hero metrics:** `hero.phone.chips` are the floating labels. The views figure counts up once when the page loads
  (and stays still with reduced motion).

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** three short parts. The badges sit between `line1` and `line2`, and `accent` is set in the
  italic serif. Keep the whole thing to about 45 characters.
- **Hooks:** about five to seven words, and no more than one highlighted word.
- **Pricing:** three plans fits the layout, with the middle one featured.
- **Case studies:** keep `points` to between 8 and 14 numbers, oldest first.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-orange` for fills (badges, highlights, the chart line) and `--color-orange-text` for small orange
  text. Keep `--color-orange-text` a darker shade: it is used on white and on the pale orange pill and was chosen to
  meet contrast (about 4.7:1 or better).
- `--color-ink-low` is only for small labels on paper.
- `--color-night`, `--color-on-night` and `--color-on-night-mid` set the dark process band and the closing block.
- Each video thumbnail carries its own colours in `site.config.ts`. Keep dark text on light colours and white text on
  dark ones.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Inter Tight (headlines), Inter (text) and Playfair
Display italic (the one serif phrase). To swap one, change the import and keep the `variable` name, so nothing else
needs to change.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts) and the small animations
components/
  Navbar.tsx          sticky bar with mobile menu, and the logo
  ui/                 Button, Title, Icons, Reel (video thumbnail), Sparkline (chart)
  sections/           Hero, HeroVisual, Marquee, Results, Work, Process, Proof, Pricing, Faq, FinalCta, Footer
lib/utils.ts
site.config.ts        your content
```

## Before you launch

The "Book a call" links point at the closing section. Replace them with your calendar link in `site.config.ts`. The
creators, handles, numbers and quotes are placeholders: swap them for real ones, and only publish results you can back
up.

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), native `<details>` for the FAQ,
real buttons with `aria-pressed` for the filter and billing switch, charts described to screen readers, and
`prefers-reduced-motion` support (the strip, the floating chips and the count-up all stop). Text and background
pairs were checked against WCAG AA. Fonts are self-hosted at build time, there are no images, and the client-side code
is the navbar, the hero counter, the filter and the billing switch. On phones every block stacks in normal flow, so
nothing can overlap.

## License

See `LICENSE.md`.
