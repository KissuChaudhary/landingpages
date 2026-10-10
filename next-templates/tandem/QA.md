# Tandem QA — internal, not shipped

Checked 10 October 2026 against the production static export.

- Standalone strict TypeScript check and content verification pass. Source integration typecheck over `src/` passes.
- Production export succeeds: homepage about 20 KB, total initial JavaScript about 123 KB, no animation library.
- Thirteen original WebP illustrations verified, about 331 KB in total. No broken images after traversing the export.
- Browser reviewed at 1440 × 900, 820 × 1180, and 390 × 844. No horizontal document overflow at any width and no browser errors from the production page.
- Mobile navigation expands in place, section links close it, and Escape restores the toggle focus.
- Rotating headline remeasures its actual word spans after viewport changes; the mobile agent cards stay within their frame.
- Agent carousel responds to arrows and mouse dragging; rapid arrow clicks accumulate a destination correctly. The final arrow disables at the actual scroll limit, including on tablet. Touch uses native horizontal scrolling.
- Workflow steps and audience tabs select their corresponding images and copy. Billing changes prices from $29/$79 yearly to $39/$99 monthly and updates destination subjects. FAQ expands the selected answer.
- With no configured destination, a valid email scrolls to pricing and announces the next step without claiming the email was saved. Endpoint and external URL modes are implemented and typechecked; they require the buyer's actual service for end-to-end verification.
- Reduced-motion paths reviewed in the canvas, SVG, CSS, and shared primitives. Canvas and signal loops rest off screen and when the page is hidden. The no-JavaScript fallback keeps stat values and integration tiles visible.
- The buyer ZIP installs, typechecks, and builds successfully in an isolated folder. The final ZIP was repacked after carousel and no-JavaScript improvements; the production export was rebuilt and the carousel limit retested.
- Catalog detail and demo routes return HTTP 200 from a fresh repository dev server. Generated configuration changes from that server are restored to their pre-run contents.

Captures and illustration source live under `work/tandem-qa/` and `work/tandem-art.cjs`. Catalog previews are in `public/previews/` and `public/og/`. Verification completed locally before release.
