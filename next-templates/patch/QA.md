# Patch verification

Verified on October 8, 2026.

## Build and source

- Strict standalone TypeScript check passed.
- All six exported before/after React files passed strict TypeScript checking. Review excerpts are also checked against their full source.
- Normal standalone production build passed, without a marketplace base path.
- Static export under `/demos/patch` passed and was copied into the marketplace.
- Marketplace production build passed. Its configuration skips project-wide type/lint validation; the changed marketplace integration and full UI library received a separate strict TypeScript check.
- All seven new UI registry responses include the exact installable component source and required animation CSS, including chip-in, ping and drop-in.
- Full template dependency audit reported zero vulnerabilities.
- Marketplace build emitted a CSS optimizer warning for the existing UI library's `::highlight(ui-selection)` rule. Patch's standalone build emitted no such warning.

## Browser checks

- Inspected desktop, laptop, tablet and phone layouts around 1440, 1280, 1024, 768, 390 and 320px. Narrow-screen overflow was fixed; code excerpts scroll within their own panel.
- Geist and Geist Mono load correctly in the production export.
- Chalk and graphite apply across the page; the chosen appearance survives reload.
- Newsletter, pricing and quick-navigation presets coordinate requests, code, review excerpts and output.
- Apply/Undo, Build/Review/Preview tabs, arrow-key navigation, responsive width controls and file selection work.
- Signup validates an email and confirms locally; no data is sent.
- Example billing switches between $15 monthly and $144 yearly. Main Builder pricing shows $12/month with $144 due yearly, or $15 due monthly. Review dialogs match the selected period.
- Navigation search filters, handles an empty result and records a local selection. The page command menu supports filtering, arrows, Enter, Escape and Cmd/Ctrl+K.
- Native dialogs contain forward/reverse Tab focus, restore the opener and close with Escape. Example selectors and use-case actions select the corresponding hero example.
- Workflow tabs, use-case tabs, mobile navigation and native FAQ disclosures work.
- Clipboard contents and actual Plan.tsx and Signup.tsx downloads were verified on standalone pages. Native export links track the selected before/after code and keep their Blob URLs alive until that source changes or the link unmounts. The final Signup export includes a unique React `useId` label/input pair; its downloaded contents match the copied source.
- A fresh production standalone tab recorded no console warnings or errors during copy/export verification.
- Marketplace detail page, desktop/mobile screenshots and direct responsive demo load. The demo allows downloads and delegates clipboard-write; embedded copying was confirmed. The separate `/preview/patch` frame also delegates clipboard-write.

## Verification limits

The browser tool explicitly reports that Blob downloads are not supported in embedded frames. It therefore cannot confirm the marketplace iframe's download itself. The embedded native link and status were checked; actual downloads and copied source were confirmed on the standalone page available through the demo toolbar.

Reduced-motion CSS and storage-failure handling were inspected in source. No external AI service, email provider, app login or payment flow is connected or tested; those are documented buyer integrations. The plans, brand and product claims remain fictional sample content.

## Captures

Marketplace assets come from actual running production views: `public/previews/card/patch.webp`, `card-full/patch.jpg`, `full/patch.jpg`, `mobile/patch.jpg` and `public/og/patch.jpg`. Original capture PNGs and a full graphite view are kept in the marketplace's local `work/` directory.
