# Cutroom

A landing page template for video editing studios and creator agencies.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images or videos to host, no API keys, no CDN scripts.

Clean white, near-black ink and one signal orange. The look borrows from the cutting room: timecodes, a ruler, a
timeline, and key words that sit inside an orange "clip" with trim handles. There are no shadows; depth comes from
borders, tints and contrast.

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

Open `site.config.ts`. Your studio name, navigation, headline, clients, services, chart data, process, prices,
quotes, FAQ and footer all live there. Change the text, save, and the page updates. TypeScript flags a missing or
misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, chart data, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The editor drawing in the hero | `components/sections/HeroEditor.tsx` (data in `hero.editor`) |
| The service drawings | `components/sections/ServiceVisuals.tsx` |

### Sections

Hero, client channels, services (a selector with a drawing per format), results (a retention chart), process (an
edit decision list), pricing (a calculator), testimonials (set as comments), FAQ, journal, a closing block with a
drop zone, and the footer. To drop a section, delete its line in `app/page.tsx`. To reorder, move the line. The
"Scene 01, 02..." labels are set in `site.config.ts`; renumber them if you remove a section.

### How the data-driven parts work

- **Retention chart:** `results.chart.raw` and `results.chart.edited` are twelve numbers each (0 to 100, the share of
  viewers still watching). Each `notes` entry puts a numbered marker on the edited line at index `at` and explains it
  in the list below the chart.
- **Process:** every step has a `from` and `to` in hours, like `"02h"`. The coloured bar above the list is drawn to
  scale from those numbers, so changing the hours changes the bar.
- **Pricing calculator:** the price is `perVideo x count`, less the volume `discount` (0 to 1). Add or remove entries
  in `pricing.formats` and `pricing.volumes`; the controls follow. Wire the button to your checkout or booking link.
- **Editor drawing:** `hero.editor.tracks` is a list of tracks, and each clip is a `start` and `end` position from
  0 to 100 with a `tone` (`flame`, `blue`, `ink` or `green`).

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** keep `clip` to one or two short words, because the orange clip cannot wrap. The rest sets in
  up to three lines at 104px.
- **Services:** four works best, and each needs one `visual` (`long`, `shorts`, `thumbs` or `repurpose`).
- **Figures** (the big stats) should be short: `"2.1×"`, `"48h"`, `"500+"`.
- **Testimonials:** one comment should have `pinned: true`; it is shown large. Three others fill the row below.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-flame` to recolour the accent: buttons, clips, markers, the closing block.
- Keep `--color-flame-text` a darker shade of it. It is used for small orange text on white and was chosen to meet
  contrast (about 5:1); lighten it and small orange text will fail accessibility checks.
- `--color-ink` and `--color-on-ink` set the dark panels. `--color-wash` sets the soft grey panels.
- `--color-blue` and `--color-green` colour the timeline clips only.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Bricolage Grotesque (headlines), Hanken Grotesk
(text) and JetBrains Mono (timecodes and labels). To swap one, change the import and keep the `variable` name, so
nothing else needs to change.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts) and the ruler utilities
components/
  Navbar.tsx          sticky bar with mobile menu
  ui/                 Button, Section (clip, scene header, initials)
  sections/           Hero, HeroEditor, Creators, Services, ServiceVisuals, Results, Process,
                      Pricing, PricingCalculator, Testimonials, Faq, Journal, FinalCta, Footer
lib/utils.ts
site.config.ts        your content
```

## Motion components

Prices roll like an odometer and labels morph letter by letter instead of jumping. That's Number roll and Text morph,
two free components from the Hairline UI library, kept in `components/hairline/` and used here in the pricing
calculator. They need only React and Tailwind; Number roll's two keyframes sit at the end of `app/globals.css`. Use
them for anything else that changes:

```tsx
<NumberRoll value={total} prefix="$" />
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), a proper tab widget for
services (arrow keys, Home and End), radio groups for the calculator, native `<details>` for the FAQ, and
`prefers-reduced-motion` support (the playhead and the recording dot stop). Text and background pairs were checked
against WCAG AA. Fonts are self-hosted at build time, there are no images, and the client-side code is the navbar,
the services selector and the pricing calculator. On phones every block stacks in normal flow, so nothing can
overlap.

## License

See `LICENSE.md`.
