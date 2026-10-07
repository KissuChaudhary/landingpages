# Marlow

An editorial landing page template for studios, consultancies and agencies.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

Warm paper, a serif display face, one clay accent, and five pastel tints. Ten sections, every word of them in one file.

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

Open `site.config.ts`. Your studio name, navigation, headline, clients, services, results, process, quotes,
prices and FAQ all live there. Change the text, save, and the page updates. TypeScript flags a missing or
misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, FAQ | `site.config.ts` |
| Colours (paper, ink, clay, five tints) | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The two hero panels | `components/sections/HeroPanels.tsx` |

### Sections

Hero, client names, approach (the manifesto), services, selected work, process, testimonials, pricing, FAQ, and a
closing call to action with your next open call slots, then the footer. To drop a section, delete its line in
`app/page.tsx`. To reorder, move the line. Section numbers in the headers, such as `(03)`, are set in each
section's file; renumber them if you remove one.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** about 36 characters. It sets in three lines at 96px. The `accent` part is the italic serif.
- **Hero description:** one or two sentences, about 120 characters.
- **Approach:** a single paragraph. Give a segment a `tint` to highlight it like a marker. Three or four marks is plenty.
- **Services:** three items work best. **Work:** three results plus the dark closing tile. Keep each figure short
  ("+212%", "21 to 9", "2.1×") because it is set very large.
- **Process:** each phase has a `start` and `end` week. Change `weeks` to show a longer or shorter chart.
- **Pricing:** exactly one plan should have `featured: true`; it is drawn dark.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-clay` to recolour the accent (links on hover, italic headline words, diamonds, stars).
- Change `--color-paper`, `--color-paper-raised` and `--color-sand` for the page and card surfaces.
- Change the `butter`, `peach`, `mint`, `sky` and `rose` pairs to retune the pastel accents. Each has a solid
  (for bars, avatars and marks) and a soft (for backgrounds).
- Keep `--color-ink` dark. Text on every tint is ink, and it has been checked for contrast.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).

To add a sixth tint, define its two colours in `globals.css`, add it to `lib/tint.ts`, and add its name to the
`Tint` type in `site.config.ts`.

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Fraunces (headlines), Geist (text) and Geist
Mono (small labels). To swap one, change the import and the `variable` name stays the same, so nothing else needs to
change.

### The ruled-paper background

The faint vertical lines behind the page are one `background-image` on `body` in `app/globals.css`. Delete those
two lines for a plain background, or change `141px` to change the spacing.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts, shadows)
components/
  Navbar.tsx          floating pill nav with mobile menu
  ui/                 Button, Section (headers, titles, avatars)
  sections/           Hero, HeroPanels, LogoStrip, Approach, Services, Work,
                      Process, Testimonials, Pricing, Faq, FinalCta, Footer
lib/                  tint.ts (tint classes), utils.ts
site.config.ts        your content
```

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), native `<details>` for the
FAQ, and `prefers-reduced-motion` support. Text and background pairs were checked against WCAG AA. Fonts are
self-hosted at build time, there are no images, and the only client-side code is the navbar. On phones every
block stacks in normal flow, so nothing can overlap.

## License

See `LICENSE.md`.
