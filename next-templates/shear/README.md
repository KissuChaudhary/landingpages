# Shear

A motion-led landing page for a cloud cost product, built with Next.js 15, React 19 and Tailwind CSS 4. One page, twelve sections, a live glyph-river canvas behind the hero, and every number, label and panel that changes morphs instead of swapping.

The brand, customers, figures and quotes are fictional. Replace them in `site.config.ts` before you launch.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build
npm start          # serve the build
npm run typecheck  # check the TypeScript
```

Node 20.9 or newer.

## Make it yours

Almost everything you'll change is in **`site.config.ts`**: brand, copy, the moving headline words, stats, comparison rows, features, steps, team tabs, testimonials, plans, questions, footer links and every button destination.

| What | Where |
| --- | --- |
| Brand name, description, contact emails, number locale | `site.config.ts` → `brand`, `contact`, `locale` |
| Headline and its moving words | `site.config.ts` → `hero.headline.words` |
| Where the hero email goes | `site.config.ts` → `signup` (see below) |
| Plans and checkout links | `site.config.ts` → `pricing.plans[].checkout` |
| Colours (mint accent, ink frame, greys) | `app/globals.css` → `:root` |
| Fonts | `app/layout.tsx` (Mona Sans and Fragment Mono via `next/font`) |
| Logo mark and wordmark | `components/ui/Brand.tsx` |
| Customer logos | `site.config.ts` → `hero.logos` (built-in marks, or set `src` to your own file in `public/`) |
| Product scenes in the feature cards | `components/scenes/FeatureVisual.tsx`, or set `image` on a feature to use your screenshot |
| Step scenes | `components/scenes/StepScene.tsx`, or set `image` on a step |
| Section order | `app/page.tsx` |

### Where the buttons go

Nothing on the page opens a mock dialog or pretends something happened.

- **Hero email field** (`signup`):
  - Set `endpoint` to POST `{ "email": "…" }` as JSON to your waitlist, CRM or sign-up API. The field waits for the answer, then shows your `success` message, or asks the visitor to try again.
  - Or set `url` to send visitors to your app's sign-up page with the email filled in (`?email=…`, the name comes from `param`).
  - With neither, the field takes visitors to the plans.
  - The logic lives in `lib/signup.ts` if you'd rather call an auth provider directly.
- **Plan buttons**: each goes to its `checkout` link for the chosen billing period. Until you add one, the free plan goes to sign-up and paid or custom plans start an email to `contact.sales`.
- **Every other button** has an `href` in the config: an anchor (`#pricing`), a URL or a `mailto:` link.
- Footer social and legal links stay hidden until you give them an `href`.

## Motion

- **Glyph field** (`components/motion/GlyphField.tsx`): a canvas river of characters that follows a falling cost curve, brightens around the cursor and sends a wave along itself each time the headline word changes. It draws at up to 30fps, only while it's on screen and the tab is visible.
- **Moving word** (`components/motion/RotatingWord.tsx`): letters are squeezed to Mona Sans' narrowest width and blurred away, and the next word's letters settle in from its widest width, using the font's real width axis.
- **Section reveals** (`components/motion/Reveal.tsx`): headings rise word by word out of a light blur while the type breathes in from a wider cut.
- **Scroll-driven moments** (`components/motion/useScrollProgress.ts`): the proof grid spreads out from the middle as you scroll, and the footer wordmark's two halves slide back into line.
- **Pause**: the button beside the logo strip stops every loop on the page (glyph fields, moving word, logo strip, ambient light). The choice is remembered.
- **Reduced motion**: with the system setting on, nothing moves on its own, all text is visible immediately and the glyph fields show a still frame.

No animation library is used: CSS transitions and keyframes, the Web Animations API and one canvas.

### Motion components

Five free components from the Hairline UI library are included verbatim in `components/hairline/`:

- **Number roll**: every figure that changes (stats, prices, the carousel counter) rolls like an odometer.
- **Text morph**: labels that change (scene statuses, the team card, the sign-up button) morph letter by letter.
- **Pricing toggle**: the monthly/yearly switch and the rolling prices.
- **FAQ accordion**: answers open to their real height; arrow keys move between questions.
- **Logo marquee**: the customer strip in the hero, which eases to a stop on hover.

They need only React and Tailwind. The `ui-col-in`, `ui-col-out` and `ui-note-in` keyframes at the end of `app/globals.css` belong to them.

## Accessibility

Real tabs, radio groups and disclosures with keyboard support (arrows, Home, End, Escape). The comparison table has a full table for screen readers. Focus rings use `:focus-visible`. Numbers and the moving word are read once as plain text. The phone menu grows out of the bar instead of covering the page, and Escape returns focus to its button.

## Deploy

Deploy this folder as a normal Next.js project (Vercel, Netlify, a Node server, Cloudflare via OpenNext).

For a static host, build with `SHEAR_EXPORT=1 npm run build` and publish the `out/` folder. Set `NEXT_PUBLIC_BASE_PATH` at build time only if the site lives under a sub-path.

## Structure

```
app/                 layout (fonts, metadata), page (section order), globals.css (palette, motion)
components/sections/ one file per section
components/scenes/   the small product scenes (bill chart, feature visuals, step scenes)
components/motion/   glyph field, moving word, reveals, scroll progress, pause and reduced motion
components/hairline/ Hairline UI components, shipped verbatim
components/ui/       brand, buttons, badges, section intros, customer logos
lib/                 sign-up destination, asset paths
site.config.ts       all content and destinations
```

See `ASSETS.md` for fonts and icons and `LICENSE.md` for usage rights.
