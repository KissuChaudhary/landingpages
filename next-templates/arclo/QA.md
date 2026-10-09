# Verification — 2026-10-09

- Standalone strict TypeScript check passes.
- Content checks pass for lead thresholds (two matches, one match and no matches), digest grouping, onboarding tasks, complete billing amounts, article content, routes and included assets.
- Optimized production build and static catalog export pass. Homepage first-load JavaScript is 116 kB. The export includes every supporting route and all three article pages.
- Desktop, 768px tablet, 390px phone and 375px phone inspected. Main sections have no horizontal overflow. The small-phone workflow explorer keeps its controls and source records readable in a scrollable native dialog.
- All three local workflow results verified in the browser. The lead threshold’s empty state is usable. The downloaded inbox JSON was opened and checked against the displayed source and output.
- Clipboard control reaches its successful copied state. Errors have a visible fallback to saving the run.
- Dialog Escape dismissal restores the opening control’s focus and body scrolling. Native dialogs provide focus containment. Workflow and onboarding tabs respond to arrow keys and have coordinated panels.
- Annual Pro review shows $180 per year and $15 monthly equivalent. Monthly and annual destinations remain separate. Static pricing routes and comparison anchor work.
- Price formatting is checked for fractional monthly equivalents. The savings label derives from configured annual charges.
- Chart period, team story controls, FAQ disclosure and phone navigation work. Reduced-motion CSS and stored manual motion preference are included.
- Contact form review, local text download and edit retention verified. The downloaded text matches the entered brief. Waitlist review explicitly distinguishes the local preview from joining a live list.
- Production article navigation uses the exported `.html` paths. The first journal artwork’s class-name collision was fixed and the production cover inspected.
- Production browser console has no errors or warnings on the homepage.
- The marketplace mobile iframe opens the workflow explorer at a readable 320px width. Arclo and the concurrent Aster registration coexist in the catalog.
- Static output verification passes for all 11 exported HTML documents and 492 local asset, route and anchor references.

Live app, AI, integrations, checkout, contact submission and mailing-list endpoints require owner configuration and were not exercised against external services. Fictional stories and policy placeholders are identified in source and setup documentation.
