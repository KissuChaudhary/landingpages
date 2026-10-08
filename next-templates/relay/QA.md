# Relay verification — October 8, 2026

## Build and integration

- Standalone strict TypeScript check and optimized static marketplace export passed. The exported page loads at `/demos/relay/index.html`.
- Marketplace integration passed a separate strict TypeScript check. The marketplace production build generated 103 routes, including the Relay detail and demo pages. The existing marketplace configuration skips global type and lint checks; Relay integration is checked separately.
- Root `pnpm run lint` could not access pnpm's store database in the restricted environment. The equivalent `npm run lint` reached Next.js's interactive ESLint setup because this repository has no root ESLint configuration; it did not run a lint pass.
- Source review counted 40 TypeScript/CSS files and 2,345 lines. Tested normal-text palette combinations have at least 4.87:1 contrast.

## Visual review

- Inspected light and ink appearances, the complete desktop page, 768px tablet, 390px phone and 320px narrow phone. No horizontal document overflow was observed at these widths.
- Measured all ten grid-inner regions: desktop left edges and widths match exactly. Section rules extend beyond the outer frame without horizontal overflow. Feature and pricing gutters retain their hatch.
- Navigation is transparent at the top, contracts to 900px after scrolling, and returns to the open layout at the top.
- Hero example selection updates its conversation. Make it yours selects the matching workspace request and focuses the request field. Monthly Plus preview reports $15 per month; annual preview reports $144 yearly.
- The 320px example tabs use shorter visible labels while retaining their full accessible names. The hero conversation and workspace are separate, aligned sections. The marketplace desktop and mobile preview toolbar shows the exported design.
- Catalog card, full desktop, phone and social images were regenerated from the actual production export.

## Browser behavior

- Hero action focuses the workspace. Scenario tabs switch the prepared request, selected context and document.
- Deselecting Reading list and preparing the research example changed the resulting comparison text. The finite replay showed its in-progress state and returned to a completed result.
- The mobile menu opens and shows all four navigation destinations. Existing Escape and focus-return behavior is preserved.
- Saving an example updates the Saved filter and shows only the selected example. The copy action reports completion. The ink appearance and the accurate yearly Plus billing preview were inspected in the exported page.

## Product boundary

This is a landing-page demonstration with prepared local examples. Real AI, accounts, checkout and connected sources require buyer integrations. Free-form requests receive an explicit local-example notice. Browser storage and clipboard failures display fallback notices.
