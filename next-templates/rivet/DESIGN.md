# Rivet design direction

Reference: https://tbdstudio.framer.ai/ — inspected in the browser on 9 October 2026. Signature: dark photographic hero, lime accents, oversize regular Geist, inset hairline frame, technical mono labels, right-aligned section introductions, image-led work grid, numbered service rows, scroll reveals, headline accents, native FAQ, and full-screen navigation.

Rivet is an independent product design and engineering studio. Original architectural imagery and studio photograph, original copy, four editable project art directions, different page sequence and compositions. No reference assets, client names, metrics, articles, or quotes are reproduced. Static studio facts communicate team structure instead of inventing performance evidence. Rates are examples with accurate one-time versus monthly labels.

Motion: finite staggered opening, 30px once-only section reveals, bounded 32px image drift, card zoom, arrow translation, menu clip transition with staggered links, and accessible disclosure state. No loader that delays access. No fake cursor, scroll hijack, product-demo popup, fabricated video player, or fake successful submission.

Buyer architecture: standalone Next.js app, local imagery, central configuration, focused data modules, 12 content routes plus custom 404, CSS grouped by composition, native motion, no extra runtime library. Inquiry flow is real endpoint submission or local text export; configured scheduling and social destinations are optional.

Marketplace wiring: catalog and details in src/data/template-catalog/rivet.ts, registry iframe in src/templates/rivet, static export in public/demos/rivet. Run npm run export:demo from next-templates/rivet. Maintainer helper and this document do not ship to buyers.
