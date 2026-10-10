# Aveniq

A premium technology landing page with a dark canvas, original glass artwork, crisp product storytelling and scroll motion. Built with Next.js 15, React 19 and plain CSS.

## Run

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build with `npm run build`, then serve with `npm start`. Fonts and images are included locally; no API key or image service is needed.

## Make it yours

Start with `site.config.ts`. It holds your identity, metadata, navigation, headlines, descriptions, workspace example, feature copy, process, use cases, plans, FAQs and destinations.

| Change                                             | File                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Brand, copy, pricing, artwork and links            | `site.config.ts`                                                                     |
| Colours, fonts, spacing and buttons                | `styles/base.css`                                                                    |
| Page order                                         | `app/page.tsx`                                                                       |
| Hero composition and workspace illustration        | `components/sections/Hero.tsx`, `components/WorkspacePreview.tsx`, `styles/hero.css` |
| Editable product diagrams                          | `components/FeatureArt.tsx`, `components/sections/Context.tsx`                       |
| Scroll reveals, process lighting and card stacking | `components/Motion.tsx`, `styles/motion.css`                                         |
| Artwork, fonts and provenance                      | `public/`, `ASSETS.md`                                                               |

Each section has a focused component and stylesheet. The identity mark is editable SVG. Keep the two hero lines compact; adjust the hero and footer type scales if your new name or headline is longer.

## CTA destinations

Replace `site.links.email` with your address. Set `site.links.start` to your signup or booking URL, and `site.links.sales` to your sales destination. Empty destinations use an ordinary email link instead. Individual plans also accept an optional `href` override. Footer social links appear only when their URLs are configured.

All navigation anchors stay on the landing page. There are no forms, accounts or server endpoints. The workspace illustration shows example content; it does not collect input or connect to a service.

## Motion and controls

The hero shifts subtly with scroll. Headings resolve from soft blur to crisp type, content reveals once, process steps light up, and desktop use-case cards overlap in sequence. Mobile cards use normal vertical flow. No decorative animation loops.

Pricing updates between monthly and yearly values in place. Edit both prices and the associated billing note when changing plans. FAQs use native disclosure elements. Controls support the keyboard, visible focus and the system reduced-motion preference. The mobile menu closes on Escape and restores focus to its button.

Content remains visible without JavaScript. The monthly prices are server rendered. Fonts use locally included Latin subsets; replace them with a broader subset if your language needs more glyphs.

## Verify and deploy

```sh
npm run typecheck
npm run verify:content
npm run build
```

Deploy the normal Next.js build to a compatible host. For static hosting, build with `AVENIQ_EXPORT=1` and deploy `out`. Set `NEXT_PUBLIC_BASE_PATH` if hosting below a URL prefix. Environment variables must be set before the build. On PowerShell, use `$env:AVENIQ_EXPORT="1"` before `npm run build`.

## Before launch

Aveniq is a fictional product identity. Replace its example capabilities, prices, workspace content and email address with your own verified product information. The page contains no customer endorsements, performance statistics or compliance claims.

Commercial terms are in `LICENSE.md`. Included image prompts and font licences are documented in `ASSETS.md`.
