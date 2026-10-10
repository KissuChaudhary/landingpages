# Offscript verification — 10 October 2026

Validated the template source and production static export.

- Template typecheck passes. The catalog and iframe integration pass a targeted TypeScript check.
- Content verification passes: local image references, project/article slugs, font and icon.
- Production build passes: home, three campaign pages, two notebook pages and custom 404.
- Buyer ZIP installs from a fresh extraction, passes TypeScript and builds all nine static routes successfully.
- Browser checks at 360, 390, 600, 760, 820, 1024, 1280, 1440 and 1920: no horizontal document overflow in the landing page.
- Mobile frame selection updates the expanded frame and caption. All hero images load.
- Index opens and closes; Escape returns focus to its trigger. Section selection closes the disclosure.
- Process buttons change the artwork and matching copy. Native range input supports keyboard selection, including End. The current stage is announced with aria-valuetext.
- All three campaign routes open with four story chapters and a working next-project destination. No mobile overflow.
- Both notebook routes open with complete articles and working next-article destinations. No mobile overflow.
- Static navigation uses .html paths and keeps the /demos/offscript base path. Internal anchors and assets are audited against the export.
- Export audit passes: seven HTML pages and 110 local asset/link references. Catalog detail, preview and demo routes return successfully on an isolated server.
- Desktop and phone catalog screenshots include every section after its reveal; full-page and social preview assets are generated locally.
- No browser warnings or errors were observed during the initial desktop/mobile session. No motion-control buttons are present.
- Reduced-motion and no-JavaScript fallbacks are implemented in CSS and the reveal enhancement; content is visible by default. System preference emulation was not performed in the browser.

Visual review: headline spacing, highlight bounds and portrait crops were adjusted after desktop and phone screenshots. Source stays split by section and responsibility; the largest stylesheet is 414 lines.
