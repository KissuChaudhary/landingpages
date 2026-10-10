# Goodfolk verification — 2026-10-10

Self-contained Next.js 15 project in next-templates/goodfolk. Catalog integration includes item/details, registry preview, checkout placeholder, exported demo, desktop/card/mobile screenshots, and OG artwork. No commit, push, or release zip was created.

Completed checks:

- Clean independent buyer copy prepared with maintainer notes and export helper excluded; package metadata removes export:demo. Internal path scan passed.
- Fresh npm ci, typecheck, verify:content, and normal npm run build passed in the independent buyer copy. Final accessibility and editorial refinements were copied and the production build passed again.
- Static demo export passed, including three campaign stories, two notebook articles, homepage, and custom 404.
- Export audit passed: 7 HTML files and 101 local href/src references resolve. No form, dialog, or download is present in the homepage export.
- Focused root integration TypeScript check passed.
- In-app browser review completed at default desktop width, 768px tablet, 390px mobile, and 320px narrow mobile. No horizontal document overflow remained.
- Process click, arrow-key, and Home navigation passed; selected state, panel copy, and focus update together. Native FAQ expansion passed. Mobile navigation, Escape, and focus return passed.
- Complete campaign story and notebook article reviewed in browser. Local media loaded, with no browser console errors observed.
- Fast-scroll statement reveal finishes at full opacity; all once-only reveals completed in desktop and mobile tours.
- OS reduced-motion handling and visible-without-JavaScript fallback are implemented in CSS and the native motion component. Motion has no automatic infinite loops.

Catalog captures and inspection artifacts are in work/goodfolk. Original image prompt directions are recorded in work/goodfolk/image-prompts.md; optimized images and font license are included in the buyer source. Reference comparison and hierarchy decisions are in DESIGN.md, which is excluded from the buyer package.

The commercial package is 51 files. Focused homepage components and eleven stylesheets keep the source manageable; the largest stylesheet is under 500 lines. Branding, contact links, copy, and fees are editable without backend setup.
