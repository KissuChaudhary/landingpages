# Kept

A landing page template for invoicing, accounting and money tools for freelancers and small studios.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

Warm paper, a deep pine ink and one fresh lime. Headlines are set in a condensed serif with an italic green accent
phrase, and every amount is set in tabular figures so columns line up. The page is dressed like a statement: the
hero is an invoice that has just been paid, the features run along dotted leaders, and the price is a receipt.
There are no shadows and no gradients; depth comes from hairlines and a slightly lighter "sheet" colour.

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

Open `site.config.ts`. Your product name, navigation, headline, the invoice, the monthly figures, the features,
quotes, price, FAQ and footer all live there. Change the text, save, and the page updates. TypeScript flags a
missing or misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, figures, FAQ | `site.config.ts` |
| Colours | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Currency and number format | `lib/money.ts` |
| Which sections appear, and in what order | `app/page.tsx` |

### Sections

Hero (an invoice sheet and three figures), the year (a twelve-month chart with tax dates), what it does (a ledger of
six lines), quotes (set as a table), pricing (a receipt), FAQ, and a closing sign-up block on the pine band with the
footer. To drop a section, delete its line in `app/page.tsx`. To reorder, move the line.

### How the data-driven parts work

- **The invoice sheet:** `hero.sheet.amount` is the invoice total. Each `split` entry has a `percent` (they must add
  up to 100) and a `tone`. The bar and the amounts are calculated from them.
- **The year chart:** `year.months` is twelve incomes and `year.rate` is the share set aside (0 to 1). Each bar is
  drawn from those numbers, with the dark part for tax and the light part for the freelancer. Nothing is hand-sized.
- **Tax dates:** each `year.due` entry names the months it covers (`from` and `to`, where 0 is January) and the month
  it falls in (`at`). The amount beside it is calculated from the incomes and the rate.
- **Quotes:** each person has a `kept` figure, shown in the right-hand column.
- **Pricing:** the receipt is a list of lines and a total. Add or remove lines freely.
- **FAQ:** native `<details>` rows, so they work without JavaScript.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** two parts, `before` and `accent`. It sets in three lines at 92px, so keep it to about 28
  characters.
- **Figures** should be short: `"12,400"`, `"$86M"`, `"9 days"`.
- **Ledger:** six lines reads best. Keep each `value` to two or three words, because it sits at the end of the line.
- **Tax figures are examples.** The rates and dates in the demo are made up for illustration. Use your own, and keep
  the disclaimer under the chart.

### Change the colours

Everything reads from the tokens at the top of `app/globals.css`.

- Change `--color-lime` for fills (the chart, the highlights, the button on the pine band) and `--color-moss` for
  small accent text. Keep `--color-moss` a darker shade: it is used on paper and was chosen to meet contrast
  (about 5.7:1).
- `--color-ink-low` is only for small labels. It meets contrast on paper at about 4.9:1; darken the paper or
  lighten the label and it will fail accessibility checks.
- `--color-pine`, `--color-on-pine` and `--color-on-pine-mid` set the dark closing band and the footer.

If you change `--color-paper`, also update `themeColor` in `app/layout.tsx` (the browser toolbar colour). The logo
mark in `components/Navbar.tsx` has its two colours written in the SVG: update them to match.

### Change the fonts

`app/layout.tsx` loads three families through `next/font/google`: Instrument Serif (headlines and big figures),
Geist (text) and Geist Mono (amounts and dates on the sheet). To swap one, change the import and keep the `variable`
name, so nothing else needs to change.

## Project structure

```
app/
  layout.tsx          fonts (next/font), metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens (colours, fonts)
components/
  Navbar.tsx          sticky bar with mobile menu, and the wordmark
  ui/                 Button, Title (headings, dotted leader)
  sections/           Hero, Year, Ledger, Quotes, Pricing, Faq, FinalCta, Footer
lib/
  utils.ts
  money.ts            currency formatting
site.config.ts        your content
```

## Before you launch

The form in `components/sections/FinalCta.tsx` only shows a confirmation message. Connect its `onSubmit` to your own
sign-up flow. Replace the demo customers, figures and tax details with your own, and have a professional check the
tax claims you make.

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), native `<details>` for the FAQ,
a chart that is described to screen readers in words, and `prefers-reduced-motion` support. Text and background pairs
were checked against WCAG AA. Fonts are self-hosted at build time, there are no images, and the client-side code is
the navbar and the sign-up form. On phones every block stacks in normal flow, so nothing can overlap.

## License

See `LICENSE.md`.
