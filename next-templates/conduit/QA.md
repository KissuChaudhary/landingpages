# Verification — October 9, 2026

## Build and data

- Standalone strict TypeScript check passed.
- Optimized Next.js production export passed, including type validation and all 12 generated page records.
- Billing checks passed for free plans, Build at $29 monthly/$288 annually and Scale at $99 monthly/$948 annually.
- Blueprint/story/industry mappings, four-step run receipt and all three shipped images passed the content checks.
- Focused strict TypeScript checks passed for the marketplace catalog, details, checkout map and Conduit preview entry.

## Browser checks

- Compared the hero, product sequence, dark capability chapter, industry grid, story tabs, security, FAQ, closing and pixel footer with the live design reference.
- Reviewed full desktop and phone captures. Corrected the closing button's text contrast and phone footer readability.
- Checked 320px, 390px, 768px, 1024px and 1440px iframe viewports. No horizontal overflow. The actual content width excludes a scrollbar where one is present.
- Checked every homepage frame: all left edges and widths agree at each breakpoint.
- Confirmed every local image loaded before capturing the finished desktop and phone pages.
- Built the document-review blueprint, opened it inside the builder and downloaded the complete JSON.
- Ran all four workflow stages, confirmed 100% completion and inspected the downloaded run receipt.
- Switched analytics to seven days; changed the model route and tool connections.
- Selected story tabs with mouse and arrow keys; confirmed the selected story updates together.
- Expanded a native FAQ; paused motion and checked the remembered preference on the next page.
- Plan buttons link to their checkout, or the contact page while none is set.
- Prepared a local contact brief, inspected the downloaded text and confirmed that editing retains the entered fields.
- Opened the company menu. Opened the phone menu, confirmed focus moves into it and Escape closes it.
- Loaded marketplace details and the mobile screenshot. Checked the embedded phone layout, the in-place blueprint and the `allow-downloads` sandbox permission.

The in-app browser did not expose a download event for the nested marketplace iframe. Standalone downloads were exercised and their contents inspected; embedded file download handling should also be checked in a normal browser before launch. No live contact endpoint, payment provider, account system or AI service was connected. OS reduced-motion behavior was reviewed in CSS and the preference listener; the browser did not expose an OS preference override. The equivalent footer pause control was exercised.

## Review artifacts

The development workspace contains `work/conduit-desktop.png`, `work/conduit-mobile.png`, `work/conduit-preview.jpg`, full-page review sheets and an embedded phone-dialog capture. Marketplace preview assets live under `public/previews/` and `public/og/`.

The source is separated into 46 focused TypeScript, TSX and CSS files. The largest file is approximately 520 lines; no section is implemented as a multi-thousand-line component.

## 2026-10-10 — global motion-control removal

- Removed every global motion play/pause control and manual stored-pause gate. Existing scroll motion, keyframes, hover behavior and functional product playback controls remain; system reduced motion still applies.
- Passed source typecheck, content verification, standalone demo export and clean buyer-ZIP install, typecheck and production build.
- Browser desktop checks: global controls absent and motion enabled. Mobile removal checked on Daymark, Serein and Turnout. Confirmed the Turnout deck/ribbon, Daymark journey loop and Vela scroll tilt still animate.

## 2026-10-10 — redesign away from the reference

- Rebuilt every homepage section around the dashed frame as a conduit; only the frame grid survives from the first release. New type (Instrument Sans, IBM Plex Mono), palette (graphite, tint, emerald signal), buttons, labels, mark, hierarchy and section order. Removed the announcement strip, glass/portrait/mesh photographs, the three coded product demos, the impact chart, the bento, task rails, icon grid, story tabs, round seals and pixel wordmark.
- Route board sampled in headless Chromium at 0.7, 1.9, 2.7, 4.6, 6.8 and 8.2 s: typing, linking, steps, streaming and the approval rule land on time; the pulse sits on each port; auto-advance stops after a choice. Story "Run it" and use-case rows scroll to the board and run the right blueprint. Blueprint tabs, FAQ disclosures and policy highlighting checked.
- Problem map: `--p` 0 → 0.30 → 0.68 → 1.0 across four scroll positions, joined state and caption swap at the end. Product stage: sticky at 100px; screens swap 01 → 02 → 03 with the rail at 0.13 / 0.49 / 0.90.
- 390, 768, 1024, 1180 and 1440 px: no horizontal overflow (the policy panel scrolls inside its own frame on phones). Reduced motion: complete run, joined map, no running animations. No console errors on the home, pricing, contact, about and changelog pages.
- Six product screens rendered from `work/conduit-shots` (2x WebP). `verify:content`, template typecheck, static export and catalog previews (stitched viewport captures, so the sticky panel reads as it scrolls) regenerated.
