# Design direction

Daybreak’s page moves through a compact sticky navigation, a centered two-line hero with a landscape and prompt, a logo strip, product tabs, a wide dashboard over a painted valley, a week of mornings on a sun-path arc, a split integration chapter, audience rows, expanding portraits, a “Calm by design” access panel, three plans and an illustrated closing section.

## Visual system

- Inter at weights 400, 500 and 600. Desktop display 54px; primary section headings 40px; audience headings 28px; main body 16–17px. Phone display 36px and primary headings 32px. Small labels introduce sections consistently.
- White and charcoal, with quiet blue accents in the example interfaces. Ochre, sage, coral and blue in the original landscapes supply warmth and identity.
- 42px pill controls in the marketing page. Smaller controls appear only inside compact product scenes. Pricing actions size to their labels rather than stretching across the cards.
- A shared frame owns both vertical dashed rules and its horizontal bottom rule. Square marks sit at those actual intersections. Artwork clips inside separate wrappers, preserving complete intersection marks. Internal product illustrations do not draw unrelated page rails.
- Sparse outer composition, with interface depth concentrated in the product demonstration. Main sections avoid repetitive card grids and micro-annotations.

## Motion

Headlines enter in two short lines. Section text and scenes reveal as they enter view. The product statement reads from gray to charcoal with scroll progress. Hover lifts controls and connection nodes slightly, reveals portrait color and gently scales journal artwork. Selected portraits expand smoothly. The workflow animation accompanies a real local state transition.

Motion uses CSS transforms/opacity, IntersectionObserver and one requestAnimationFrame-throttled statement observer. Native scrolling is preserved. System reduced motion and a remembered manual pause disable decorative motion while retaining every working interaction.

## Responsive behavior

Desktop keeps the centered hero, split product/integration chapters, sticky audience links and horizontal portrait row. Phone layouts use a compact menu, stacked hero actions, full-width prompt, vertical feature controls, single-column audience rows, a selected story above three portrait choices and stacked plans. The dashboard preview is a picture with art direction: the full desktop layout on wide screens and a short, readable card on phones. The week section keeps its arc and switches to short day names; the access panel stacks under its copy.

## Content discipline

The campaign dataset is shared across reports, filters and exports. Example returns are calculated, not fabricated performance claims. Trend graphics are explicitly illustrative. Fictional team identities and portraits are identified as examples. Plan reviews show the complete annual amount. Empty destinations offer meaningful local examples instead of silent buttons or fake submissions.
