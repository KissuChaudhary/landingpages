# Emberline

A dark, grid-framed landing page template for AI and SaaS products.
Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript. No images to host, no API keys, no CDN scripts.

## Start in two minutes

```bash
npm install
npm run dev
```

Open http://localhost:3000. That is the whole setup. It needs Node 18.18 or newer.

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript check
```

## Make it yours (all in one file)

Open `site.config.ts`. Every word on the page lives there: brand, nav, hero, logos, features, comparison table,
steps, testimonials, pricing plans, FAQ, final call to action and footer. Change the text, save, and the page
updates. TypeScript flags a missing or misspelled field, so you cannot silently break a section.

| What | Where |
| --- | --- |
| All copy, links, prices, plans, FAQ | `site.config.ts` |
| Accent colour and surfaces | `app/globals.css` (`@theme`) |
| Fonts | `app/layout.tsx` |
| Feature card illustrations | `components/sections/Features.tsx` |
| Hero product mockup | `components/hero/DashboardMockup.tsx` |
| Page order (add, remove, reorder sections) | `app/page.tsx` |

### Sections

Hero, logo strip, features (bento), comparison table, how it works, testimonials, pricing (monthly/yearly toggle),
FAQ, final call to action, footer. To drop a section, delete its line in `app/page.tsx`. To reorder, move the line.

### Copy guidelines (they keep the layout tidy)

- **Hero headline:** about 30 characters, two lines. The `accent` part is set in the serif italic.
- **Hero description:** 90 to 120 characters, so it sets in two even lines.
- **Badge text:** under about 32 characters, so it fits on a phone.
- **Features:** five items. The first two cards are wide, the last three narrow. Each card pairs a heading and
  sentence with a small illustration drawn in markup (edit the numbers and names in `Features.tsx`).
- **Pricing:** exactly one plan should have `featured: true`.
- **Comparison:** each row is `yes`, `partial` or `no` for you and for the other column.

### Change the colour

Replace the nine lines of the `--color-ember-*` ramp in `app/globals.css`. Nothing else hardcodes the accent,
so the buttons, glow, grid lines, chart and shadows all follow.

Teal:

```css
--color-ember-50: #ecfffb;  --color-ember-100: #d3fff6; --color-ember-200: #a8f5e8;
--color-ember-300: #74e6d6; --color-ember-400: #3fd0be; --color-ember-500: #1fb2a2;
--color-ember-700: #0f6a61; --color-ember-900: #072320; --color-on-ember: #04201c;
```

Violet:

```css
--color-ember-50: #f5f2ff;  --color-ember-100: #e8e1ff; --color-ember-200: #cfc2ff;
--color-ember-300: #b3a0ff; --color-ember-400: #9777ff; --color-ember-500: #7b55f0;
--color-ember-700: #402a9c; --color-ember-900: #17103d; --color-on-ember: #120a33;
```

If you change `--color-bg`, also update `themeColor` in `app/layout.tsx` (browser toolbar colour).

### Replace the hero mockup

The hero product image is drawn in markup (`DashboardMockup.tsx`), so nothing can break or need licensing.
To use a real screenshot, swap the component for a `next/image` `<Image>` inside the same `TiltFrame` in
`components/hero/Hero.tsx`. Give it a 1040px wide frame so the grid lines land on its edges.

## How the hero grid works

- Four vertical rails are drawn once for the whole hero. The inner pair frames the text (720px wide);
  the outer pair frames the product mockup (1040px). Both widths are CSS variables at the top of
  `app/globals.css` (`--rail-inner`, `--rail-outer`).
- Every row is a multiple of 32px. Diamonds mark where the inner rails meet a row line.
- On phones the outer rails are hidden and the widths shrink to fit the screen.

## Project structure

```
app/
  layout.tsx        fonts (next/font), metadata
  page.tsx          the page: which sections, in what order
  globals.css       design tokens (colours, grid widths, animations)
components/
  Navbar.tsx        floating nav with mobile menu
  hero/             Hero, GridFrame, EnergyLines, TiltFrame, DashboardMockup
  sections/         LogoStrip, Features, Comparison, HowItWorks, Testimonials,
                    Pricing (+ PricingPlans toggle), Faq, FinalCta, Footer
  ui/               Button, Card, Section (headers, dividers, page rails)
site.config.ts      your content
```

## Deploy

Push to GitHub and import the repo in Vercel (or Netlify, Cloudflare Pages, any Node host).
No environment variables are needed.

## Accessibility and performance

Skip link, visible focus rings, a keyboard-operable mobile menu (Escape closes it), and `prefers-reduced-motion`
support (the tilt and the energy lines stop). Fonts are self-hosted at build time by `next/font`, there are no
images, and the only client-side code is the navbar, the scroll tilt and the pricing toggle. Cards never overlap: on phones every
card stacks in normal flow.

## License

See `LICENSE.md`.
