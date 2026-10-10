# Oddline

A social-first creative studio landing page with an original campaign collage, charcoal and chartreuse styling, and editorial imagery. Built with Next.js 15, React 19 and plain CSS.

## Run

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build for production with `npm run build`, then serve with `npm start`. Both fonts are bundled locally; builds and page requests need no font-service connection.

## Make it yours

Start with `site.config.ts`. It contains your brand, metadata, navigation, hero, projects, studio statement, services, process, pricing, FAQs and CTA destinations.

| Change | File |
| --- | --- |
| Brand, content, images and destinations | `site.config.ts` |
| Colours, fonts, gutters and controls | `styles/base.css` |
| Landing-page order | `app/page.tsx` |
| Hero collage | `components/sections/Hero.tsx`, `styles/hero.css` |
| SVG artwork and identity | `components/ui.tsx`, `components/ServiceArt.tsx`, `public/icon.svg` |
| Scroll depth, statement and reveal timing | `components/Motion.tsx`, `styles/motion.css` |
| Image files and provenance | `public/images/`, `ASSETS.md` |

Each section has a focused component and stylesheet. There is no animation library or Tailwind dependency. Keep your hero headline compact and adjust the footer type scale when changing to a significantly longer brand name.

## CTA links

Replace `site.links.email` with your own address. Calls to action open a simple email link by default. Set `site.links.booking` to send visitors to your booking page instead. No visitor details are submitted or stored by this page.

To link a gallery card to your own project, set its `url`. Empty values leave the card as a readable, non-clickable article. Navigation links move to their section on this page. Instagram and LinkedIn footer links appear only when configured.

## Interactions

Desktop hero layers move subtly at different speeds while scrolling. The studio statement changes colour as it enters view, and a process rail fills as visitors move through its steps. Content reveals once. Service and pricing tabs change content in place; FAQs use native disclosures. There are no autoplaying loops.

Phones use normal vertical flow. The system reduced-motion preference disables decorative transitions and scroll motion. Content stays visible without JavaScript; the initially selected service and pricing options are present in server-rendered HTML.

Service tabs support arrow keys, Home and End. Pricing tabs support Left/Right, Home and End. The phone menu supports Escape and returns focus to its trigger. Controls have visible keyboard focus.

## Checks and deployment

```sh
npm run typecheck
npm run verify:content
npm run build
```

The content check verifies imagery, navigation targets, complete services/plans and component size. Deploy the normal Next.js build to a compatible host. For static-only hosting, build with `ODDLINE_EXPORT=1` and deploy the `out` directory. `NEXT_PUBLIC_BASE_PATH` supports deployment below a URL prefix.

For a new installation, run a fresh build rather than copying a previous build from another location. Content and image changes need no API keys.

## Before launch

Replace the fictional brand, email address, concept campaigns, service descriptions and example prices with your own. Confirm every project link and booking destination. The page includes no invented client testimonials or business performance statistics.

Commercial terms are in `LICENSE.md`. Image prompts and type provenance are in `ASSETS.md`.
