# Fourteen

A landing page template for done-for-you services, agencies and productised B2B offers.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

Warm paper with a fine grain, stone neutrals and one orange. Headlines are set in Playfair Display, with the second
half in italic, and small handwritten notes (Caveat) point at the buttons. The page sits in a frame with two hatched
rails (hidden on phones, to give the content the full width), and the cards that matter wear a two-tone ring: peach inside, lilac outside. Small drawings made from plain
elements stand in for screenshots. There are no blurred drop shadows; depth comes from hairlines, rings and a
one-pixel bottom edge on the buttons.

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

Open `site.config.ts`. Your name, navigation, headline, the sample emails, problems, solution cards, steps,
features, case studies, price, FAQ, founder note and footer all live there. Change the text, save, and the page
updates. TypeScript flags a missing or misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, price, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The page frame, buttons, rings and handwritten notes | `components/ui/Kit.tsx` |
| The small drawings inside the cards | `components/visuals/Visuals.tsx` |

### Sections

Hero (with a strip of sample emails), problem, solution (six cards), how it works (three steps on a cream panel),
features (eight cards), case studies, one plan, FAQ, a founder's note and a closing button. To drop a section, delete
its line in `app/page.tsx`. To reorder, move the line.

### How the data-driven parts work

- **Drawings:** solution cards, steps and features each name a `visual` such as `"match"` or `"timeline"`. The
  available names are the keys of `visuals` in `components/visuals/Visuals.tsx`. To add one, write a small component
  there and add it to that list.
- **Solution layout:** the six cards alternate wide, narrow, narrow, wide, narrow, wide. Reorder them in the config
  and the layout follows the same pattern.
- **Italic words:** headlines are `{ before, accent }`. The accent is set in italic. Leave `accent` empty for a plain
  title.
- **Email strip:** `hero.emails` feeds the slow-moving cards under the hero. Six reads best. The list is repeated
  once so the loop has no seam, and it stands still with reduced motion.
- **Closing button:** `cta.before`, `cta.chip` and `cta.after` make up "Help [Me] Fill my Calendar". The four notes
  sit around it on wide screens and become a list on phones.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** two short lines. The second is in italic. About 26 and 24 characters fit at full size.
- **Cards:** a title of two to five words and a text of one or two sentences.
- **Price:** the strikethrough `was` is optional, so leave it empty if you do not discount.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-flame` for the fills and `--color-flame-text` for small accent text. Keep `--color-flame-text` a
  darker shade: it is used on paper and on the cream panels and was chosen to meet contrast (about 5:1).
- The button gradient uses Tailwind's `orange-300` and `orange-400` in `components/ui/Kit.tsx`. Change those two
  words to recolour every orange button.
- `--color-peach` and `--color-lilac` set the two rings. `--color-cream` is the tinted panel.
- `--color-ink-low` is only for small labels.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Playfair Display (headlines), Inter (text) and Caveat
(handwritten notes and the signature). To swap one, change the import and keep the `variable` name, so nothing else
needs to change.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts), the grain and the page rails
components/
  Navbar.tsx          floating bar with mobile menu, and the wordmark
  ui/Kit.tsx          Frame, Button, Pill, Heading, SectionHead, Ring, Note
  visuals/            the small drawings
  sections/           Hero, Problem, Solution, How, Features, Examples, Pricing, Faq, Founder, FinalCta, Footer
lib/utils.ts
site.config.ts        your content
```

## Before you launch

The buttons point at the closing section. Replace them with your booking or sign-up link in `site.config.ts`. The
clients, numbers, quotes and the guarantee are placeholders: swap them for real ones, and only promise what you can
deliver.

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), native `<details>` for the FAQ,
drawings hidden from screen readers (the text says the same), and `prefers-reduced-motion` support (the email strip,
the blinking dots and the entrance all stop). Text and background pairs were checked against WCAG AA. Fonts are
self-hosted at build time, there are no images, and the client-side code is only the navbar menu. On phones every
block stacks in normal flow, so nothing can overlap.

## License

See `LICENSE.md`.
