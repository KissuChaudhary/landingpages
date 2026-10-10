# Encore

A motion-led landing page for an email and SMS retention studio, built with Next.js 15, React 19 and Tailwind CSS 4. One page, eleven sections: a hero with a deck of real-looking emails that shuffles itself, a statement that lights up as you read it, a services index with a sticky preview, a 90-day timeline that fills as you scroll, case results with a preview that follows the pointer, and a footer wordmark that settles into place. Every number and label that changes morphs instead of swapping. The emails and dashboards are images, so the page stays light.

It suits any retention, lifecycle or growth agency, and any service business that sells a retainer and books calls.

The studio, clients, people, figures and quotes are fictional. Replace them in `site.config.ts` before you launch.

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

Almost everything you'll change is in **`site.config.ts`**: brand, copy, the hero deck, stats, client names, services, the 90-day plan, case results, testimonials, engagements and prices, questions, the founder card, footer links and every button destination.

| What | Where |
| --- | --- |
| Brand name, description, legal name, number locale | `site.config.ts` → `brand`, `locale` |
| Where the buttons go | `site.config.ts` → `links` (see below) |
| Headline and the circled phrase | `site.config.ts` → `hero.title` (one line per `\n`), `hero.highlight` |
| The emails in the hero deck and their figures | `site.config.ts` → `hero.deck` |
| Services, their deliverables and preview images | `site.config.ts` → `services.items` |
| Case results and the featured case | `site.config.ts` → `results` |
| Engagements and prices | `site.config.ts` → `pricing.engagements` |
| Colours (berry accent, ink, mist greys) | `app/globals.css` → `:root` |
| Fonts | `app/layout.tsx` (Hubot Sans and Azeret Mono via `next/font`) |
| Logo mark and wordmark | `components/ui/Brand.tsx`, `public/icon.svg` |
| Section order | `app/page.tsx` |

### Images

The emails, dashboards and service previews are images, not coded mockups, so the page stays fast. Replace the files in `public/images/` with your own work at the same proportions and keep the names, or point `site.config.ts` at new files. Give each a useful `alt`.

| Image | Used in | Size (px, 2×) |
| --- | --- | --- |
| `email-*.webp` (4) | Hero deck, case rows (thumbnails and the floating preview) | 1200 × 1760 |
| `service-*.webp` (6) | Services preview panel (inline on phones) | 1520 × 1200 |
| `case-halden.webp` | Featured case | 1520 × 960 |

An email screenshot from Klaviyo's preview, cropped to 600 × 880 at 2×, drops straight into the deck.

### Where the buttons go

Nothing on the page opens a mock dialog or pretends something happened.

- **`links.booking`**: every "Book a call" button, the strategy-call buttons, the founder card and the retainer plans. Set it to your scheduling page (Cal.com, Calendly, HubSpot meetings…). Until you do, it starts an email to `links.email`.
- **`links.audit`**: "Claim a free audit" in the 90-day plan and the free audit plan. Empty, it uses `links.booking`. Point it at an intake form if you run audits without a call.
- **Plans**: each engagement has its own `href`; empty, it follows the rules above.
- **Results**: `results.cta.href` overrides the booking link for "Talk about your numbers".
- **Every other link** is an anchor (`#results`), a URL or a `mailto:` link. Footer social and legal links stay hidden until you give them an `href`.

## Motion

- **Email deck** (`components/sections/Hero.tsx`): every few seconds the front email is pulled out to the side and slipped to the back while the chip below it morphs to the next flow and rolls to its revenue. It holds while you point at it; a click or tap shows the next one. It only runs while on screen and the tab is visible.
- **Circled phrase**: a hand-drawn loop draws itself around the highlighted words once the headline has landed.
- **Headlines** (`components/motion/Reveal.tsx`): rise word by word out of a light blur while Hubot Sans breathes in from a wider cut, using the font's real width axis.
- **Statement**: each word lights from grey to ink as it passes the reading line.
- **Services**: the preview wipes up or down depending on which way you moved through the list.
- **Timeline**: a berry line fills across (or down, on phones) as you scroll, and each stage lights when the line reaches it.
- **Case rows**: on a desktop the email behind each result floats beside the pointer, trailing it slightly and tilting with its movement.
- **Integrations**: two rings of tools turn slowly in opposite directions while every name stays upright.
- **Testimonials**: a hairline under the active client fills, then the next quote rises in.
- **Footer**: the wordmark narrows from the font's widest cut to its condensed one as you reach it.
- **Holding still**: every loop (the deck, the client strip, the rings, the testimonial autoplay, the closing marquee) holds while the pointer rests on it, and the deck and the quotes wait while they're off screen or the tab is hidden.
- **Reduced motion**: with the system setting on, nothing moves on its own and all text is visible immediately. The deck still steps when clicked.

No animation library is used: CSS transitions and keyframes, and the Web Animations API.

### Motion components

Four free components from the Hairline UI library are included verbatim in `components/hairline/`:

- **Number roll**: every figure that changes (stats, case metrics, the deck's revenue) rolls like an odometer.
- **Text morph**: the deck's flow name morphs letter by letter.
- **FAQ accordion**: answers open to their real height; arrow keys move between questions.
- **Logo marquee**: the client strip in the hero, which eases to a stop on hover.

They need only React and Tailwind. The `ui-col-in` and `ui-col-out` keyframes in `app/globals.css` belong to them.

## Accessibility

Real tabs and disclosures with keyboard support (arrows, Home, End, Escape). Focus rings use `:focus-visible`. Numbers are read once as plain text, the integration rings have a plain list for screen readers, and decorative motion is hidden from them. The phone menu grows out of the bar instead of covering the page, and Escape returns focus to its button.

## Deploy

Deploy this folder as a normal Next.js project (Vercel, Netlify, a Node server, Cloudflare via OpenNext).

For a static host, build with `ENCORE_EXPORT=1 npm run build` and publish the `out/` folder. Set `NEXT_PUBLIC_BASE_PATH` at build time only if the site lives under a sub-path.

## Structure

```
app/                 layout (fonts, metadata), page (section order), globals.css (palette, motion)
components/sections/ one file per section
components/motion/   reveals, in-view and scroll progress, reduced motion
components/hairline/ Hairline UI components, shipped verbatim
components/ui/       brand, buttons, labels, screens
public/images/       emails, dashboards and service previews (WebP, 2×)
lib/                 button destinations, asset paths
site.config.ts       all content and destinations
```

See `ASSETS.md` for fonts and icons and `LICENSE.md` for usage rights.
