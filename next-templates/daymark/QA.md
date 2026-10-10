# Daymark QA

Internal validation record; excluded from the buyer package.

Verified on 2026-10-10.

- Standalone dependency installation, TypeScript check, production build and static export passed. The final export also compiled and checked the last contact-branding refinements.
- Content verification passed: unique campaign, article, service and engagement IDs; local imagery and font files; linked service concepts; all brief fields and email encoding.
- Static export audit passed: 13 HTML pages, 337 local page/asset links, one H1 per content page, and no dialog surfaces.
- Catalog integration TypeScript check passed. Template metadata, registry, iframe export and all five preview assets are present. The responsive-demo iframe includes download permission.
- The existing project server serves the complete standalone export at http://127.0.0.1:3000/demos/daymark/index.html . Its challenge interaction was verified after the final export.
- Browser review covered 1440px desktop, 768px tablet, 390px phone and 320px narrow phone. No horizontal overflow was observed. Complete desktop and phone captures were reviewed; every campaign image was loaded before capture.
- Four challenge panels, ArrowRight and End tab navigation, process selection, native FAQ expansion, mobile navigation and Escape were exercised. The remembered pause control stopped both ambient loops and survived reload.
- Contact validation, service preselection, engagement selection, complete email draft and the text download were exercised. Special characters, budget and a multiline message survived encoding and download. No enquiry was transmitted to an external service.
- Original campaign imagery, journal index and a complete Common Ground case study were reviewed in the browser. All other routes were checked by the export audit.
- Buyer structure audit passed: 58 files, 4,846 source lines; largest source file is 582 lines of focused section CSS. Buyer-facing text contains no reference-site or repository-internal mentions.
- The template uses only Next.js, React and React DOM at runtime. Original WebP photography and the Figtree font are local. Source references to generated Next route types were removed so a clean checkout can typecheck before its first build.

The repository's lint command could not run because ESLint has not been configured; it opens Next.js's setup prompt. No global lint configuration was changed. The catalog toolbar in the existing development server rendered but did not respond during this review; the standalone Daymark export on that same server hydrated and its interactions worked. This is recorded separately from template validation.

No booking service or JSON submission endpoint is configured. Direct delivery must be checked against the buyer's service before launch. Policy text, campaign concepts and indicative fees remain editable sample content.

No commit, push, publication or paid service connection was performed. Other sessions' work was preserved.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.
