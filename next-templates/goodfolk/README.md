# Goodfolk

A complete social and creator studio website with a collage hero, a studio manifesto, a staggered campaign gallery, a three-stage creative process, two engagement rows, studio photography, a notebook, and FAQs. Three campaign stories and two complete notebook articles are included.

## Run

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For production, run `npm run build` and `npm start`, or deploy the project to a Next.js-compatible host.

## Make it yours

| Edit                                                                      | File                                 |
| ------------------------------------------------------------------------- | ------------------------------------ |
| Brand, email, contact destination, navigation, metadata, page copy, FAQs  | `site.config.ts`                     |
| Campaigns, their stories, imagery, deliverables, and generated page slugs | `data/projects.ts`                   |
| Capabilities, process stages, and engagement descriptions and prices      | `data/studio.ts`                     |
| Notebook articles, categories, dates, and generated page slugs            | `data/notes.ts`                      |
| Palette, typography, spacing, and buttons                                 | `styles/base.css`                    |
| Collage, gallery, process, footer, and supporting page layouts            | Other files in `styles/`             |
| Photography and fonts                                                     | `public/images/` and `public/fonts/` |

Each homepage section is a focused component in `components/home/`. Reorder or remove sections in `app/page.tsx`. Page copy is plain text, with `\n` separating intentional display lines.

The contact buttons are ordinary links. Replace `contactHref` with your booking URL or a `mailto:` link. Replace the default `hello@example.com` inbox and set your canonical `url` before launch. There is no submission service to configure. Empty `socials` and `legalLinks` arrays hide those optional destinations.

Keep campaign slugs unique and lowercase with hyphens. New entries in `data/projects.ts` or `data/notes.ts` generate their own pages on the next build. All three campaign cards and both notebook cards lead to full pages. The process tabs support arrow keys, Home, and End; FAQs use native disclosures; mobile navigation closes on selection or Escape.

## Motion

Motion is native CSS and browser APIs. The hero has a finite entrance and restrained scroll drift, text fills as it enters view, sections reveal once, and tabs transition when selected. There are no automatic content loops. Reduced motion follows the visitor’s operating-system preference. Content remains visible if JavaScript is unavailable.

## Images

Three optimized WebP images and a locally hosted Manrope variable font are included. See `ASSETS.md` for provenance. Replace the images with your own, updating both paths and meaningful alt text in the config or campaign data. Keep the hero images portrait and the studio image landscape. No external image host or font request is required.

## Checks

```bash
npm run verify:content
npm run typecheck
npm run build
```

The content check verifies referenced local media, the font, and campaign/article slug uniqueness. A production build checks TypeScript and generates the supporting pages.

## Before launch

Goodfolk and the campaign brands are fictional. Campaigns are creative concepts, not claims of completed client work or performance results. Replace them, the engagement fees, the brand story, and the original imagery with your own business content. Set your contact destination, canonical domain, and any social or legal links you choose to display. Review mobile layouts after changing long display headlines.

Keep usage rights, production expenses, and engagement terms accurate for your business. The included fees are example starting prices, and the scope note is editable in `components/home/Engagements.tsx`.
