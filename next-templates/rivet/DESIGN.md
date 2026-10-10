# Rivet design direction

Design system direction: a dark, editorial industrial aesthetic built around a photographic hero, strong structural rhythm, lime accent details, a precise steel-and-paper material language, and assertive typography. The original concept was refined into a distinct studio identity with its own hero composition, hierarchy and motif system.

Rivet carries its own concept: **machined and fastened**. A rivet joins two plates; the studio joins design and engineering.

- **Hero:** typography-first. The two-line headline spans the measure in brushed steel (the hero photograph clipped to the letterforms over a satin base, overlay blend). The highlight word is anodized lime instead of a highlight box. A meta strip sits above; below, a hairline seam with rivet heads at its joints holds three cells (text, actions, note). The photograph became a plate beneath that opens from the content width to full bleed as it scrolls up. No frame, rail, barcode, or floating card.
- **Motion:** lines rise from a mask; the seam draws; rivets set with an overshoot; one light sweep crosses the steel. On fine pointers the light follows the cursor (`--sx`, a registered length with a CSS transition) and glides off on leave; on touch it travels with the first scroll. The plate's `clip-path` inset is scroll-linked (`--open`). All finite, reduced motion respected.
- **Rivet motif:** 9px ring with a lime pin at hairline joints: hero seam, client strip, section headings, philosophy steps, closing rule.
- **Global pieces:** rivet-head pill button (one paper pill, arrow inside an ink circle that turns lime and swaps arrows on hover); quiet links with a lime underline draw; `mark` is lime text, no box; nav shows inline links with the last item as a hairline pill, and the fullscreen menu below 1025px.
- **Hierarchy:** section headings put the headline left with copy right-bottom under a riveted rule; philosophy is a left-aligned statement over a five-cell riveted strip; client marks are a riveted hairline strip, not circles; the closing is a steel-type bookend; section order is Hero, Trust, Philosophy, Work, Services, Studio, Process, Pricing, FAQ, Journal, Closing, Contact.

Buyer architecture: standalone Next.js app, local imagery, central configuration, focused data modules, 12 content routes plus custom 404, CSS grouped by composition, native motion, no extra runtime library. Inquiry flow is real endpoint submission or local text export; configured scheduling and social destinations are optional.

Marketplace wiring: catalog and details in src/data/template-catalog/rivet.ts, registry iframe in src/templates/rivet, static export in public/demos/rivet. Run npm run export:demo from next-templates/rivet. Maintainer helper and this document do not ship to buyers.
