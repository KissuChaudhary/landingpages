# Footnote

A landing page template for AI writing tools, content platforms and research products.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

Dark graphite, warm-white text and one blue accent. Headlines are set in a light serif with an italic accent
phrase. The whole page sits inside two thin vertical rules, and small `+` marks appear only where lines really
meet. The key idea is the footnote: sentences carry numbered references, and every section is built around a
piece of evidence rather than a card. There are no shadows; depth comes from hairlines and spacing.

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

Open `site.config.ts`. Your product name, navigation, headline, the before and after draft, the method, the three
engine sections, numbers, quote, FAQ and footer all live there. Change the text, save, and the page updates.
TypeScript flags a missing or misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, numbers, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The grid lines and `+` marks | `components/ui/Grid.tsx` |
| The three engine visuals | `components/sections/Engine.tsx` |

### Sections

Hero, the difference (two drafts of one paragraph, side by side), method (an annotated draft), the engine (three
alternating sections), proof (three numbers and a quote), FAQ, a closing sign-up block and the footer. To drop a
section, delete its line in `app/page.tsx`. To reorder, move the line.

### How the data-driven parts work

- **The difference:** in `difference.before.text`, a segment with `flag: true` is underlined as uncited. In
  `difference.after.text`, a segment with `ref: 1` gets a footnote marker. Keep the numbers in step with
  `difference.after.footnotes`.
- **Method:** each row is one sentence (`excerpt`) and one note. A part with `mark: true` is highlighted.
- **Engine:** each spread has a `visual` of `matrix`, `sources` or `voice`, and its data sits in `engine.matrix`,
  `engine.sources` and `engine.voice`.

### The grid marks

Marks are drawn by `Divider` in `components/ui/Grid.tsx`, and only where a line really starts, ends or crosses:

- A full `+` where a divider meets the frame edge, or where a column rule crosses a divider.
- A half `+` (a T) where a column rule starts or ends on a divider.

If you add a section with columns, pass the position of its column rule to the `Divider` above and below it, for
example `marks={[{ at: 50, kind: "tee-down" }]}`. The marks are hidden below the breakpoint where the columns
stack, because there is no rule to join.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** two parts, `before` and `accent`. It sets in two lines at 88px, so keep it to about 28
  characters.
- **Figures** should be short: `"3.2×"`, `"4,000+"`, `"98.4%"`.
- **Method:** four rows reads best. Keep each excerpt to one sentence.
- **FAQ:** every answer is written out on the page. Six items fits the layout; more will simply run longer.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-accent` to recolour footnote markers, highlights and the italic words.
- `--color-text-low` is only for small labels. It meets contrast on the background at about 4.6:1; darken it and it
  will fail accessibility checks.
- `--color-warn` and `--color-good` are used only in the before and after, and in the sources list.

If you change `--color-bg`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Newsreader (headlines), Instrument Sans (text) and
IBM Plex Mono (used only for real data). To swap one, change the import and keep the `variable` name, so nothing
else needs to change.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts)
components/
  Navbar.tsx          sticky bar with mobile menu
  ui/                 Button, Grid (frame, divider, marks), Title
  sections/           Hero, PixelField, Difference, Method, Engine, Proof, Faq, FinalCta, Footer
lib/utils.ts
site.config.ts        your content
```

## Before you launch

The sign-up form in `components/sections/FinalCta.tsx` only shows a confirmation message. Connect its `onSubmit`
to your own sign-up endpoint or email provider. The logos in the hero are text placeholders: swap them for your
customers' marks.

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it) and `prefers-reduced-motion`
support (the hero field stays still). The FAQ is plain text, so there is nothing to operate. Text and background
pairs were checked against WCAG AA. Fonts are self-hosted at build time, there are no images, and the client-side
code is the navbar, the hero field and the sign-up form. On phones every block stacks in normal flow, so nothing
can overlap.

## License

See `LICENSE.md`.
