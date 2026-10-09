# Daybreak validation

Validated on 9 October 2026 in the Codex in-app Chromium browser, against both the development site and production static export.

## Build and data

- Production `npm run export:demo` passed compilation, Next.js type validation and static generation of 16 pages. The initial sandboxed build could not retrieve fonts; the network-enabled build completed successfully. Inter is self-hosted in the resulting export.
- `npm run verify:content` passed billing totals, campaign calculations, channel-filter invariance, recommendation results, article routes and all six local images.
- The marketplace catalog, details, pricing registration and Daybreak preview passed focused strict TypeScript checking.
- `git diff --check` passed for the tracked changes.
- Monthly sample totals: $50,730 revenue, $12,950 spend and 538 conversions. All-channel quarter totals: $138,888 revenue and $38,850 spend. Filtered quarter values remain identical to their rows in the complete quarter dataset.

## Browser interactions

- Editable hero question produces a campaign review. Strongest-campaign questions identify the email campaign at 9.0×; month/quarter controls update the report and table.
- Actual standalone CSV downloads were opened and inspected. Dashboard quarter + Social exports match the displayed $45,756 revenue and $16,500 spend, with two campaign rows.
- All four feature views work. Arrow-key navigation updates the selected tab and its panel. Campaign channel filtering and all four workflow stages complete correctly; reset returns the workflow to its starting state.
- The dashboard preview is a picture: the desktop image on wide screens and a 360 × 483 card on phones, with no clipping.
- The week section’s day stops work by pointer and arrow keys; the sun follows the arc; Tuesday’s Approve/Not now/Undo, Friday’s schedule switch and the access panel’s switches change state.
- Integration nodes open their data-scope guides. Directory search, category filters, empty state and reset work.
- Portrait perspectives switch by click and arrow key, including the fourth portrait.
- Growth monthly review shows $49. Annual reviews show the complete $432 Growth and $1,308 Studio charges. The annual FAQ agrees with these amounts.
- Contact validation, local brief preparation, actual brief download and edit preservation work. The form makes no claim that a local brief has been sent.
- Resource and mobile navigation close on Escape and return focus to their triggers. Dialog Escape returns focus to the invoking control, and the background page remains scroll-locked while a dialog is open.
- Motion pause persists after reload. System reduced-motion listeners and CSS were reviewed; an operating-system preference change was not emulated during this run.
- Production pricing-to-contact and journal routes navigate to their exported `.html` destinations. No console errors were recorded on the exported contact route.

## Layout and previews

- Home checked at viewport widths 320, 390, 720, 768, 1024 and 1440: no horizontal document overflow. All eight main section frames share their outside rails.
- Phone hero, navigation, pricing, integration directory, all four portrait states, the dashboard card, the week and the access panel were visually reviewed without horizontal overflow.
- The desktop closing copy sits on a clear white field; the landscape is masked toward the right. Phone artwork starts below the closing actions.
- Final desktop and phone screenshots were captured from the production export after loading every local image. Desktop, mobile, card and social previews are included in the marketplace.
- Marketplace details display the phone screenshot correctly. The embedded mobile demo opens the working report and includes `allow-downloads` in its sandbox. The browser automation did not receive a download event from that embedded frame; embedded download completion is unverified. Standalone downloads passed.

## Scope

The template ships with functional local examples. Production AI, account authentication, attribution, integration providers, contact submission and checkout require the buyer's own services and configuration. Network contact failure handling was reviewed in code; an external contact service and payment provider were not connected or tested. Fictional teams, sample performance data, original generated portraits and placeholder policies are clearly identified and should be replaced for a real launch.

The whole marketplace was not rebuilt or linted as part of this template-only change. Its new Daybreak entry was checked with focused TypeScript validation and a separate development server; unrelated component-library work was left alone.
