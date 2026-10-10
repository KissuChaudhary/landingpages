# Serein verification

Verified October 10, 2026. Reference observations and the visual direction are in DESIGN.md.

- Standalone npm installation, strict TypeScript checking and normal production compilation passed. Fonts and four original optimized images are local.
- The final static export passed using `/demos/serein`; the catalog export helper copied it successfully. All 13 exported HTML pages and 467 internal page/asset links were checked. Each page has one h1. No marketing dialog is present.
- Catalog source typechecking passed with the standalone template projects excluded from the catalog's alias scope.
- Live browser review covered 320, 390, 768, 1265 and 1440 pixel viewport widths. A narrow studio-grid overflow was fixed and the 320px document width rechecked. Mobile project cards use normal document flow.
- Reviewed the hero, original WebGL silk, featured reel controls, expanding service surfaces, process, partnership, engagement cards, FAQ, closing, footer, project filters, case study, journal directory and article layout.
- Mobile navigation opens, closes with Escape, and reaches the journal. Closed navigation is inert. FAQ disclosures allow one open answer.
- The ambient pause control updates both controls, persists across reloads and resumes. Reduced-motion styles and the system preference listener are implemented; an OS preference change and unavailable/lost WebGL contexts were not simulated in the browser.
- Pricing and service links preselect the matching contact option. Empty required fields block submission. A complete example brief preserved all fields, Unicode, punctuation and line breaks in the email URL and downloaded text file. No email was sent.
- The optional external JSON endpoint and scheduler remain unconfigured. Real delivery depends on the buyer's configured service. The README documents request fields, response handling, timeout, fallback and launch replacements.
- Browser warning/error logs were empty during the final local review. Desktop and mobile catalog captures include the loaded project images.

The buyer source contains focused section components and scoped CSS files. The largest component is 261 lines; the largest stylesheet is 470 lines. Generated type references are removed from next-env.d.ts so a fresh source copy can be typechecked before its first build. No commit or push was made.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.
