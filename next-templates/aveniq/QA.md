# Aveniq verification

Verified on 10 October 2026.

## Build and source

- Dependency installation, standalone TypeScript and the content check passed.
- The production export passed compilation, TypeScript validation and static generation. It contains a landing page and branded 404.
- The landing route reports 5.55 kB route JavaScript and 108 kB first-load JavaScript, including 103 kB shared JavaScript.
- A focused TypeScript check of the catalog integration passed.
- 33 source/config/script files contain 3,741 lines. The largest file is hero.css at 415 lines. Sections and styles are separate.

## Browser checks

- Inspected the desktop page and its process lighting and overlapping story cards.
- Verified pricing selection by mouse and keyboard, correct monthly/yearly values and the derived annual total. Rechecked selection on the exported phone page.
- Verified a native FAQ disclosure and ordinary email destinations for the pricing CTAs.
- Verified the phone menu, Escape closure, focus restoration and section-link closure.
- Inspected 390 × 844 and 320 × 760 phone layouts; neither has horizontal document overflow. Refined the narrow hero heading and artwork spacing after inspection.
- Refined the phone footer so the email address stays together, and raised inactive process-text contrast. Rebuilt and inspected the updated production export.
- Inspected and captured the production page at 1440 × 900 and 390 × 844. All original image assets loaded, every reveal became visible, and production console logs contained no warnings or errors.
- Reduced-motion handling is implemented in the controller and CSS. The operating-system preference was not emulated during these browser checks.

## Buyer scope and files

- Audited 48 buyer files with the release exclusions. There are no internal reference, export or QA notes in shipped text.
- Checked 12 local asset targets across the two exported HTML files. Every target exists.
- Confirmed the landing export contains no forms or dialogs. There are no signup handlers, contact endpoints, detail pages, downloads or backend services.
- Fonts, font licences and three optimized editorial images ship locally. ASSETS.md preserves the exact original image prompts.
- Product identity, workspace content, capabilities and prices are fictional examples documented in the buyer README.
- Release ZIP verified on 10 October 2026: 48 buyer files, approximately 0.4 MB. The extracted copy passed npm ci, TypeScript and its production build. Maintainer notes and the export helper are excluded.

## Maintainer output

The exported demo is public/demos/aveniq/index.html. Catalog card, full-page, phone and Open Graph captures are under public/previews/ and public/og/.

These maintainer notes and the export helper are excluded from buyer delivery.
