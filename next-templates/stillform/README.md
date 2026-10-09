# Stillform

A complete editorial landing page for product photographers, commercial studios and CGI artists serving e-commerce brands. Next.js 15, React 19, TypeScript and Tailwind CSS v4. Original product studies, local WebP assets and fonts served by Next.js. No API keys or external image service.

## Start

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use Node.js 20.9 or newer. The first build needs internet access to fetch the open-source Google fonts.

```sh
npm run typecheck
npm run build
npm run start
```

## Make it yours

| Change | File |
| --- | --- |
| Brand, contact email, marketing copy, projects, prices, FAQs | `site.config.ts` |
| Palette, spacing, typography primitives | `styles/base.css` and `app/globals.css` |
| Fonts and metadata | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Product images | `public/images/` |
| Quote calculation | `lib/quote.ts` |
| Brief text and email draft | `lib/brief.ts` |

All rates, brands, projects, locations and service promises are fictional demo content. Replace them before publishing a real studio. The sample images are original generated studies, not photographs of actual client commissions. The generation prompts and provenance are in `ASSETS.md`.

Change `brand.email` before accepting enquiries. The form prepares a brief locally. The visitor reviews it, then chooses an email draft, clipboard copy or text-file download. It does not claim to send messages and does not need a backend. To use a form provider, replace the submit handler in `components/sections/Contact.tsx` with your endpoint and actual delivery/error states.

## Sections

1. Campaign hero and industry specialties.
2. Filterable portfolio with native project dialogs.
3. Studio manifesto and working principles.
4. Campaign / packshot / detail perspective selector.
5. Services that select the corresponding shoot format.
6. Four-step production process with concrete deliverables.
7. Shoot planner with product count, direction and extras.
8. FAQ with native disclosures.
9. Project brief form with a review and sharing step.
10. Oversized studio wordmark footer.

## Quote planner

Each format has a creative `setup` fee, a `perImage` rate and `imagesPerProduct`. The estimate is:

```text
images = products × imagesPerProduct
subtotal = setup + (images × perImage) + selected social-crop fee
total = subtotal + round(subtotal × selected priority rate)
```

The priority rate applies to the entire subtotal. The calculator, form summary and shared brief use the same calculation. Currency and maximum product count are in `site.pricing`. Prices exclude tax and the additional production costs explained in the page. Turnaround is an editable illustration of a studio offer, not a scheduling system.

The `BriefProvider` shares the current choices across services, planner and form. Briefs are snapshots of the choices at preparation time. Editing the brief and preparing it again picks up any new planner choices. Refreshing the page clears the fields and choices; nothing is stored in a database or browser storage.

## Portfolio and images

Add projects to `site.work.projects` using the `Project` type. Categories are `Beauty` and `Objects`; to add one, update the type and `site.work.filters`. Each project has a title, description, image, alt text and deliverables.

The `tempo` project has a wide, two-part layout. Change the ID check in `SelectedWork.tsx` if another project should occupy that position. The remaining projects use the staggered layout on desktop and stack on mobile.

The four bundled WebP images are 1536 × 1024 and total about 410 KiB. Replace them with optimised files and update the corresponding paths and meaningful alt text in `site.config.ts`. The hero is loaded eagerly; portfolio and perspective images are lazy-loaded. The detail view is deliberately a crop of the packshot.

For best results, use landscape 3:2 source images with enough room around the subject. Tune the hero's `object-position` in `styles/hero.css` when changing the subject placement. Keep the primary subject inside the central crop used on phones.

## Structure

```text
app/                    layout, page composition, stylesheet entry and icon
components/
  BriefProvider.tsx     shared quote choices
  Navbar.tsx            desktop navigation and native mobile dialog
  sections/             one component per section; separate project and brief dialogs
  ui/                   brand mark, button, headings and scroll reveal
lib/                    assets, quote arithmetic, brief serialization
styles/                 base styles and focused section stylesheets
public/images/          local product studies
site.config.ts          editable content
scripts/export-demo.mjs marketplace export helper
```

## Accessibility and motion

The page includes a skip link, visible focus rings, labelled form controls, fieldsets, native HTML constraints, a polite estimate announcement and reduced-motion support. Project and mobile navigation dialogs use native focus trapping and Escape behaviour. Perspective tabs support Left/Right, Home and End. FAQ answers work without JavaScript. Scroll reveals enhance already-visible content; unvisited sections are not hidden.

## Marketplace export

When this project is inside the Hairline UI repository:

```sh
npm run export:demo
```

This creates a production static export with `/demos/stillform` as the base path and copies it to the marketplace's `public/demos/stillform`. The helper stops before copying if the build fails. For a normal standalone deployment, use `npm run build` without the export variables.

The catalogue entry is `stillform`. The old `/demo/unreal-shot`, `/preview/unreal-shot` and `/template/unreal-shot` routes are preserved as compatibility aliases.

## Motion components

Labels morph letter by letter instead of jumping. That's Text morph, a free component from the Hairline UI library,
kept in `components/hairline/text-morph.tsx` and used here in the shot selector. It needs only React and Tailwind. Use
it for any other text that changes:

```tsx
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

## Deploy

Deploy the standalone project to any host supporting Next.js, such as Vercel. No environment variables are needed for normal deployment. For a static host, build with `STILLFORM_EXPORT=1`; omit `NEXT_PUBLIC_BASE_PATH` when deploying at the root of a domain.

See `LICENSE.md` for the template licence.
