# Halftone

A clean, premium landing page template for developer tools and API products: webhooks, email, auth, payments,
search, observability, anything sold to engineers.
Next.js 15 (App Router), React 19, Tailwind CSS v4, Motion, TypeScript. No images to host, no API keys, no CDN scripts.

Every product visual on the page is built in code and animated: a live delivery log, a pipeline diagram,
six product panels, a code window with language tabs and a CLI terminal. They stay sharp at any size, and
you can change their content from one file.

## Start in two minutes

```bash
npm install
npm run dev
```

Open http://localhost:3000. It needs Node 18.18 or newer.

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript check
```

## Make it yours

Open `site.config.ts`. All page copy lives there: brand, navigation, hero, logos, build-vs-buy rows,
pipeline, product cards, code samples, numbers, testimonials, pricing plans, FAQ, closing card and footer.
So does the sample data the animated panels play (event names, endpoints, regions). Change the text, save,
and the page updates. TypeScript flags a missing or misspelled field.

| What | Where |
| --- | --- |
| Copy, links, plans, FAQ, sample events and code | `site.config.ts` |
| Accent colour, surfaces and code colours | `app/globals.css` (`@theme`) |
| Dither colours (hero, closing card) | `site.config.ts` → `dither` |
| Fonts | `app/layout.tsx` |
| Logo | `components/ui/BrandMark.tsx` and `app/icon.svg` |
| Customer logos | `components/sections/LogoStrip.tsx` |
| Labels inside the animated panels | the `LABELS` / `COPY` constant at the top of each panel file |
| Section order | `app/page.tsx` |

### Sections

1. **Hero**: headline, install command with copy button, and a live delivery log in which one request fails and recovers on retry.
2. **Logo strip**: six placeholder wordmarks.
3. **Build vs. buy**: the same rows on both sides, weeks of work against "Included".
4. **How it works**: your app → your product → three customer endpoints, with packets travelling along the lines.
5. **Product**: a bento grid of six animated panels (retries, signing, replay, latency, regions, customer portal).
6. **Developers**: three steps beside a code window. Each step highlights its lines; language tabs switch the sample.
7. **Numbers**: four figures that count up.
8. **Customers**: one long story with its result, two short quotes.
9. **Pricing**: usage-based. A log-scale slider prices every plan at the chosen volume and marks the cheapest.
10. **FAQ**: heading and contact card beside an accordion.
11. **Closing card**: call to action beside a terminal that forwards events to localhost.

To drop a section, delete its line in `app/page.tsx`. To reorder, move the line.

### Copy guidelines (they keep the layout tidy)

- **Hero:** `lead` and `accent` about 14 characters each, so the headline sets in two lines. Description 120 to 170 characters.
- **Section headlines:** `lead` and `accent` under about 32 characters each.
- **Build vs. buy:** five to seven rows. Short estimates (`2 weeks`, `4 days`) keep the right edge aligned.
- **Pipeline:** `stages` has four entries; the fourth is the retry step, which lights orange and then green.
- **Code samples:** each language's `steps` lists the first and last line lit for each Developers step.
  Update the ranges when you edit the code.
- **Numbers:** values like `99.99%`, `2.1B`, `38 ms` or `4,000+`. The number counts up and keeps its prefix and suffix.
- **Pricing:** each plan has a `base` price, the events it `included`, and a `perMillion` overage rate. A free
  plan sets `limit` instead. The slider runs from `slider.min` to `slider.max` on a log scale.

### Not a webhook product?

Keep the structure and change the nouns. For an email API, the hero log becomes sent and bounced messages,
the pipeline stages become *Render, Queue, Send, Retry*, and the endpoints become mail providers. For auth,
show sign-ins and MFA challenges. Each panel is one small component in `components/visuals/`, so you can
also replace any of them with a screenshot: swap `<RetryTimeline />` in `components/sections/Features.tsx`
for an `<img>`.

### Change the colour

Edit the accent in `app/globals.css`:

```css
--color-accent: #305dde;        /* buttons, highlights, chart lines */
--color-accent-strong: #254cc4; /* button hover */
--color-accent-soft: #8fb0ff;   /* soft accents and the p99 line */
```

Then update the six `dither` colours in `site.config.ts` to match. The code colours (`--color-code-*`) are
taken from the same palette and can be changed alongside.

## Motion and accessibility

- Animations pause when they scroll out of view or the tab is hidden.
- With `prefers-reduced-motion`, every panel shows its finished state and nothing moves.
- The animated panels are decorative (`aria-hidden`); the heading and text beside each one carry the content.
- Language tabs, the pricing slider, the FAQ and the mobile menu all work from the keyboard. There is a skip link and visible focus rings.
- Fonts are self-hosted at build time by `next/font`, and the page loads no images.

## Project structure

```
app/
  layout.tsx          fonts, metadata
  page.tsx            the page: which sections, in what order
  globals.css         design tokens, slider and code colours
  icon.svg            favicon
components/
  sections/           Navbar, Hero, HeroConsole, LogoStrip, BuildVsBuy, Pipeline, Features,
                      Developers, Metrics, Testimonials, Pricing, Faq, FinalCta, Footer
  visuals/            the six product panels in the Product grid
  ui/                 Button, BrandMark, Reveal and section headers, Code (highlighting, copy, windows), Status
  motion/             DitherField, ScaledStage, playback hooks
site.config.ts        your content
```

## Motion components

Prices roll like an odometer and labels morph letter by letter instead of jumping. That's Number roll and Text morph,
two free components from the Hairline UI library, kept in `components/hairline/` and used here in pricing. They need
only React and Tailwind; Number roll's two keyframes sit at the end of `app/globals.css`. Use them for anything else
that changes:

```tsx
<NumberRoll value={total} prefix="$" />
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

## Deploy

Push to GitHub and import the repo in Vercel, Netlify or Cloudflare Pages. No environment variables are needed.
The page has no server code, so `output: "export"` in `next.config.ts` also gives you a static site for any host.

## License

See `LICENSE.md`.
