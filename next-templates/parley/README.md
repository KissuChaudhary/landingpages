# Parley

A landing page template for AI support agents, chatbots and customer service tools.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

Warm paper, a plum-brown ink and one rose accent. Headlines are set in a soft, round serif with an italic accent
phrase. The page is built around the product itself: a conversation. The hero is a chat, the comparison is a
transcript you can switch, and the FAQ is a chat too. There are no shadows; depth comes from soft tints and spacing.

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

Open `site.config.ts`. Your product name, navigation, headline, the hero chat, the comparison, the action log,
numbers, quotes, prices, FAQ and footer all live there. Change the text, save, and the page updates. TypeScript
flags a missing or misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, numbers, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Which sections appear, and in what order | `app/page.tsx` |
| The chat bubbles and the logo mark | `components/ui/Chat.tsx` |

### Sections

Hero (with a live-looking chat), a comparison of a classic chatbot and your product, an action log, a results band,
quotes, pricing, an FAQ written as a conversation, and a closing sign-up block. To drop a section, delete its line
in `app/page.tsx`. To reorder, move the line.

### How the data-driven parts work

- **Chats:** every conversation is a list of messages, each with `from` set to `"customer"` or `"agent"`. An agent
  message can carry an `action`, which shows as a green confirmation under it, for example `"Refund issued"`.
- **Comparison:** `compare.tabs` holds two transcripts and a result line for each. The switch is keyboard operable
  (arrow keys, Home and End), and the section keeps the same height whichever tab is open.
- **Action log:** each entry is a sentence, the tool it used and how long it took.
- **Pricing:** plans are rows, not cards. Mark one with `featured: true` to give it the tinted row. What every plan
  includes is listed once underneath, so the rows stay short.
- **FAQ:** each item is a question and an answer. Questions appear as customer messages and answers as replies.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** two parts, `before` and `accent`. It sets in three lines at 76px, so keep it to about 30
  characters.
- **Chat messages:** a sentence or two. Long paragraphs make the bubbles tall.
- **Figures** should be short: `"84%"`, `"41 sec"`, `"4.8 / 5"`. The first stat is shown very large.
- **Pricing:** three plans fits the layout.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-rose` for fills and the logo, and `--color-rose-text` for small accent text. Keep
  `--color-rose-text` a darker shade: it is used on paper and on the soft pink panels and was chosen to meet contrast
  (about 5.3:1 or better).
- `--color-ink-low` is only for small labels on the paper background. Do not use it on the pink panels.
- `--color-plum`, `--color-on-plum` and `--color-on-plum-mid` set the dark results band.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour).
The mark in `components/ui/Chat.tsx` has its two colours written in the SVG: update them to match.

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Fraunces (headlines), Figtree (text) and Caveat
(the one handwritten note in the hero). To swap one, change the import and keep the `variable` name, so nothing
else needs to change. To remove the note, delete `hero.note` usage in `components/sections/Hero.tsx`.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts)
components/
  Navbar.tsx          sticky bar with mobile menu
  ui/                 Button, Chat (bubbles, mark), Title
  sections/           Hero, Compare, Actions, Results, Quotes, Pricing, Faq, FinalCta, Footer
lib/utils.ts
site.config.ts        your content
```

## Before you launch

The form in `components/sections/FinalCta.tsx` only shows a confirmation message. Connect its `onSubmit` to your own
sign-up flow. The customer names in the hero are text placeholders: swap them for your customers' marks.

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), a proper tab widget for the
comparison, and `prefers-reduced-motion` support. Text and background pairs were checked against WCAG AA. Fonts are
self-hosted at build time, there are no images, and the client-side code is the navbar, the comparison switch and the
sign-up form. On phones every block stacks in normal flow, so nothing can overlap.

## License

See `LICENSE.md`.
