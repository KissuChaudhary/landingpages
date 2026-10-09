# Verification — October 9, 2026

## Build and data

- Standalone strict TypeScript check passed.
- Optimized Next.js production export passed, including type validation and all 12 generated page records.
- Billing checks passed for free plans, Build at $29 monthly/$288 annually and Scale at $99 monthly/$948 annually.
- Blueprint/story/industry mappings, four-step run receipt and all three shipped images passed the content checks.
- Focused strict TypeScript checks passed for the marketplace catalog, details, checkout map and Conduit preview entry.

## Browser checks

- Compared Agentlab's hero, product sequence, dark capability chapter, industry grid, story tabs, security, FAQ, closing and pixel footer in the live reference.
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
