# Patch verification

Verified on October 9, 2026, after the layout refinement and the three-plan pricing, section badge and closing CTA update.

## Build and source

- The standalone production build and strict TypeScript validation passed.
- Static export under `/demos/patch` passed and was copied into the marketplace.
- All six before/after React example exports pass strict TypeScript checking; their source did not change during this refinement.
- The Patch catalog data and iframe preview entry pass a separate strict TypeScript check.
- An actual downloaded Signup.tsx matches the complete selected example source exactly. Copied source was also checked.
- Source uses small section components and shared UI primitives. The largest file is 444 lines. Feature layout, preview controls and smaller product details have separate stylesheets.

## Layout and typography

- Inspected desktop, tablet and phone layouts at 1440, 1280, 1024, 768, 390 and 320px, including the alternate use-case previews.
- The navigation measures 72px on desktop and 64px on phones. Primary actions share a 48px minimum height and 14px type.
- Standard section headings use 40px on desktop and 32px on phones. The closing headline uses a deliberate display size of 64px on desktop and 40px on phones. Body copy is 16px; small copy and controls use 14px; labels, badges and code use at least 12px.
- Exactly one badge appears above the main heading in each of the eight sections. The shared badge component also fits at 320px.
- Workspace, workflow, use-case and FAQ dividers have the same measured horizontal position. Outer rail connections and restored plus marks are tied to actual section borders; repeating rail ticks are removed.
- All 20 decorative plus marks are centered on the ten main grid boundaries, including the navigation. Marker centers were checked against the live border coordinates on desktop and at 320px, with no page overflow. The marks are hidden from assistive technology.
- Personal, Builder and Studio form equal desktop columns with measured matching price and action positions. They stack at the tablet breakpoint; the comparison ledger reflects availability across all three plans.
- Pricing actions use restrained widths. The main editor sits flush in its cell, the app study uses a joined list, and the closing action uses one dark field with two matching actions. Both closing actions fit at 320px.
- No page-level horizontal overflow or clipped editor controls at 320px. Code scrolls inside its own panel. On phones, copy/export actions move into the editor header.
- Geist and Geist Mono load in the static production export. Chalk and graphite apply throughout; the chosen appearance survives reload.

## Interaction checks

- Apply/Undo, Build/Review/Preview tabs and arrow-key navigation work.
- Newsletter signup validates and confirms locally. Copy and native component export still work with the revised footer.
- Plan selection changes the request and output. Example billing reports $15 monthly or $144 yearly. Main pricing reports Personal $0, Builder $15 monthly / $144 yearly, and Studio $30 monthly / $288 yearly. Studio review dialogs were checked in both periods; annual pricing shows the correct 20% saving.
- Workflow tabs show request, review and export views. App, extension and component studies switch correctly.
- Primary actions, including the revised closing button, open the example selector and coordinate the chosen hero example. The closing secondary action navigates to the workspace.
- Quick navigation supports search, empty results and local selection.
- The command menu filters and navigates with Enter. Ctrl+K opens it with the search input focused; Escape restores the opener.
- Mobile navigation opens and closes with Escape. Native FAQ disclosures work.
- The production page recorded no console warnings or errors during these checks.

## Verification limits

The broader marketplace/UI-library strict check currently reports TS7053 at `src/ui-library/registry/action-receipt.tsx:228`. That file belongs to the separate UI-library work and was left untouched. The Patch production build and focused catalog checks pass; no repository-wide typecheck pass is claimed.

The fictional app, email, AI service and checkout remain documented buyer integrations. All landing-page demos are local examples.

## Captures

Fresh production screenshots supply `public/previews/card/patch.webp`, `card-full/patch.jpg`, `full/patch.jpg`, `mobile/patch.jpg` and `public/og/patch.jpg`. Original desktop, phone and graphite captures are kept in the marketplace's local `work/` directory.
