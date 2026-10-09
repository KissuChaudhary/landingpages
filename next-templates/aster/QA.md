# Aster verification

## Automated checks

- Strict standalone TypeScript check.
- Content verifier: annual total and savings, custom pricing, unique IDs, ticket counts, median/ratings, combined filters, immutable transitions, required human review, edited handoff state, CSV quotes, knowledge references, article routes, export URL queries/anchors and seven local assets.
- Production static export, including all secondary routes.
- Export sweep: all 16 HTML pages and 745 local links, anchors, images, styles and script references resolve to existing files or targets.

## Browser review

Desktop and phone review covers navigation, serif/sans font loading, consistent heading scale, feature illustration bounds, chapter spacing, tab behavior, pricing alignment, story readability, closing and footer. Phone tabs retain readable labels in a horizontal rail.

Checked viewport widths: 320, 390, 768, 1024 and the default desktop. The landing has no page overflow at these sizes. The ticket table scrolls within its own container on phones. Complete desktop and 390px phone production screenshots back the marketplace previews.

Verified local workflows:

- Combined Open + Chat + Orders + Alex filters return one of twelve tickets; downloaded CSV contains that exact ticket.
- Resolving AS-1042 changes the derived rate from 58% to 67%, leaves satisfaction at 4.7/5 and records the change.
- AS-1037 requires a person. Resolution is disabled; the Product team handoff records its reason. Downloaded JSON contains the full approved care article and handoff reason.
- Knowledge search for password shows the account recovery article and its full text.
- Connection filters and Commerce scope review show the intended fields.
- Annual Team review shows $588/year; custom Scale remains custom. Escape restores the invoking button's focus.
- Empty contact submission remains on the form; a valid example brief reviews $588/year, downloads locally and preserves values when edited.
- Phone menu opens with focus inside it; Escape closes it and restores focus to the trigger.
- Production marketplace detail, desktop/mobile image selection and responsive iframe demo load correctly. Workspace navigation preserves the export path and query settings. The iframe permits local downloads.

Production configuration limits: app, payment and contact destinations are empty by default. Local ticket changes reset on reload. Provider authentication, live messaging, production AI, billing and contact delivery require the buyer's services. Fictional customer stories and policy placeholders need replacement.
