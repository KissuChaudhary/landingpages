# Oddline verification

## Release package check — 10 October 2026

The buyer ZIP now contains 48 files, including bundled Latin Space Grotesk and Inter fonts and their upstream licenses. A fresh install, typecheck and production build passed from the extracted ZIP after replacing the unreliable Google font fetch with local font loading. The static demo was regenerated and its local page and asset references passed the release audit. Catalog, detail preview, mobile demo and purchase-page return checks passed.

Verified on 10 October 2026.

## Source and build

- `npm ci`, `npm run typecheck`, and `npm run verify:content` passed.
- `npm run export:demo` passed the Next.js production compilation, TypeScript validation, and static export.
- The export contains the landing page and a branded 404 page. The landing page reports 109 kB first-load JavaScript, including 103 kB shared JavaScript.
- A focused TypeScript check of the marketplace integration passed.
- 32 source/config/script files contain 3,383 lines. The largest file is 407 lines; sections and styles live in separate files.

## Visual and interaction checks

- Inspected the production page at 1440 × 900 and 390 × 844; inspected the development page at 320 × 760. No horizontal document overflow at either phone width.
- Captured and reviewed the full desktop and phone page, including work, studio statement, service diagrams, process, pricing, FAQ, closing CTA, and footer.
- Verified service selection and arrow-key navigation, pricing selection and keyboard navigation, native FAQ disclosure, mobile menu closure, Escape handling, and focus return.
- CTA destinations are ordinary email links or the configured booking URL. Project links are optional; empty links render noninteractive project articles.
- All four local campaign images loaded in the production preview. Browser logs contained no warnings or errors.
- Reduced-motion handling is present in CSS and the motion controller. An operating-system preference toggle was not emulated during browser checks.

## Buyer files and scope

- Audited 44 buyer files using the packaging exclusions and checked for internal references. The audit passed.
- Checked 13 local asset targets across the two exported HTML pages; every target exists.
- The export contains no forms or dialogs. There are no contact endpoints, project-detail routes, enquiry downloads, or backend services.
- Example campaign imagery, copy, and fees are identified in the buyer documentation. All main content and destinations are customizable in `site.config.ts`.
- No buyer ZIP was created: the release packager operates on tracked Git files, and this task did not authorize staging or committing.

## Maintainer preview

Static demonstration: `public/demos/oddline/index.html`.

Catalog captures: `public/previews/card/oddline.webp`, desktop/full/mobile JPEGs, and `public/og/oddline.jpg`.

These maintainer notes are excluded from buyer delivery.
