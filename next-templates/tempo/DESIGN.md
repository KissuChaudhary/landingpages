# Tempo — design decisions

## Positioning

A light launch template for indie mobile apps and everyday consumer tools. The fictional focus/routine app demonstrates the visual system; buyers can adapt it for habits, journals, reading, personal planning and similar apps.

## Visual system

Warm paper (#F8F7F3), charcoal (#202722), forest (#2D5748), pale sage and a restrained chartreuse. DM Sans brings an approachable, carefully spaced interface; Lora italic supplies the editorial accent; Geist Mono marks small functional details.

The defining composition is a physical-looking, entirely coded focus dial beside an interactive phone. Shadows, finely drawn ticks, curved device edges and small paper notes create depth. No rasterized UI, stock photos, copied components or animation library.

The desktop hero puts its compact headline above the visual stage so the dial appears early. At phone widths, the dial and phone stack without shrinking the main timer controls. Product chapters use a vertical text selector and one coordinated phone preview. A forest-green timeline gives the page a change of pace; the remaining page returns to light surfaces.

## Sections

Navigation; hero; Plan / Focus / Reflect chapters; daily timeline; thoughtful details with sample week; illustrative stories; two membership plans; native FAQ; closing app-icon composition; footer.

## Interaction contract

- One timestamp-based timer synchronizes every dial. It continues accurately through background-tab delays, supports pause/resume/reset, and prevents duration changes during a running session. Reloading starts a fresh session.
- Routine checkboxes share current page state. Chapter and phone tabs support their corresponding arrow keys, Home and End.
- Reflection text is shared across previews. Saving and clearing use browser local storage and report failure honestly; no remote transmission or account is implied.
- Weekly controls display labeled sample data. Membership totals are computed from configured prices; without a checkout link the free plan points to the download links and paid plans start an email, never a payment success.
- App links are configurable and sit in the closing section. Missing links are marked "Soon"; the local preview can start a real focus session.
- Nothing opens in a popup.

## Architecture and acceptance

Independent section/app components, a typed central content config, CSS files divided by responsibility, screenshot slots for real buyer app screens, and a static marketplace export isolated from root styling.

Check desktop, laptop, tablet and phone widths, every tab and billing state, keyboard interactions, storage persistence/failure handling, timer synchronization, app screen fit, reduced motion and browser console. Run strict TypeScript, production export, dependency audit and marketplace production build. Capture actual page previews.
