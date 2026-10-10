# Verification

## Release package check — 10 October 2026

Internal export instructions and references to excluded maintainer notes were removed from the buyer README. The packaged source passed a fresh install, strict typecheck and production build. All 13 exported HTML files and 432 local page and asset references passed the release audit. Catalog, detail preview, mobile demo and purchase-page return checks passed.

Maintainer export: `npm run export:demo` builds under `/demos/sylva` and copies the result into this repository's public demo folder. The helper and this document are excluded from buyer ZIPs.

Completed 10 October 2026. The shipped marketplace demo is a production static export under `/demos/sylva`.

## Automated checks

- Standalone strict TypeScript check passed.
- Production build and static export passed, including Next.js type checking and generation of the home, collection, about, care, contact, privacy, three plant and three space pages.
- Content verification passed: unique slugs, complete plant care notes, eight local image files, all enquiry fields in the downloaded brief, and base-path URLs preserving query strings and anchors.
- Marketplace source integration passed TypeScript using a configuration that excludes unrelated standalone template projects.
- Exported HTML links and image/script/font targets resolve to shipped local files. Marketplace card, full-page, mobile and social preview images are present.
- The 48 source/config/script files contain 4,709 lines. The largest source file is 408 lines; components and styling are split by responsibility.

## Browser checks

- Desktop hero, travelling specimen and unfolding collection sequence inspected. Motion pause exposes every card in normal flow and remembers the choice.
- Final production layout inspected at 1440 × 900 and 390 × 844; narrow 320 × 760 layout also inspected during development. No horizontal document overflow at either phone width.
- All landing-page artwork loads from local WebP assets. Final process imagery is the original repotting photograph.
- Phone navigation opens, follows links and closes on Escape. Keyboard focus restores to the menu trigger.
- Collection combines light and size filters, reports result counts, handles zero matches and resets to the full selection.
- Plant detail links carry the selected plant into the enquiry. Production space links carry their selected space through the static `.html` route and query string.
- Required form controls and whitespace-only message validation checked. Inline review shows the entered details; editing preserves them.
- Downloaded text brief inspected and matched to the review, including permission to contact. The default flow never claims an enquiry was sent.
- Native process and FAQ disclosures, local links and footer pause control inspected.
- No browser console warnings or errors observed on the production home, space and enquiry routes.

## Buyer configuration

The included site runs without service credentials. Its default enquiry prepares a downloadable brief. Booking, email, Instagram and JSON POST delivery are opt-in configuration in `site.config.ts`.

No live third-party endpoint is configured or was contacted during verification. Verify delivery, CORS, spam handling and your privacy notice after connecting your service. The component retains the brief on failed or timed-out requests and only reports delivery after a successful HTTP response.

Generated imagery is illustrative. Replace it with your own projects before making client-portfolio claims. Care guidance links to the RHS; adapt it to the plants and services you actually provide.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.
