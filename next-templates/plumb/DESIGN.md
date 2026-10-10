# Plumb design brief (maintainers only, not shipped)

## Brief

The owner asked for an original landing page template for indie makers' SaaS products, after studying the motion and section craft of Turnout, Bounce and Shear: "something extraordinary", premium, adaptable to anyone's product. No reference site this time.

## The idea

Hairline UI's own motion rule as a page: **one surface that changes shape instead of popping new ones**. A single ink object carries the hero and the whole product tour:

1. The live visitor counter sits inside the headline as a word: "Count people [● 38 now], not cookies."
2. Scroll and it pulls out of the sentence (the words drift apart radially and blur) and stretches into the one-line install snippet. The counter stays at the pill's start.
3. The line opens top and bottom into the dashboard; the counter lands on the dashboard's "current visitors" slot.
4. It narrows to the live view (the counter becomes its big number), turns into Monday's email, then a phone (the surface becomes the bezel, the counter lands in the app).
5. It flies up into the navigation's "Start free" button and the nav gives a small nod. "That's the whole product."

The demo product is privacy-first web analytics (the classic indie SaaS: Plausible, Fathom, Umami), because it gives the page a live number to carry, natural usage-based pricing and a sincere founder story. Every section maps to a generic SaaS need, and the tour is data-driven (`frame: line | screen | phone` per chapter), so a form builder or scheduler fits without code changes.

## Sections and their one idea each

| Section | Idea |
| --- | --- |
| Tour | One surface, seven shapes, one counter riding through them; eased a beat behind the scroll |
| Drawn to scale | Their bar is drawn across the page; ours drops in as a hairline ("Ours is the hairline", the brand pun) |
| The rest | The grid's hairlines draw themselves, cells rise in a diagonal wave, icons draw their strokes |
| Switchers | Hairline UI testimonials at display scale; the rating rolls, stars throw in |
| Pricing | Hairline UI pricing calculator on a log scale of pageviews |
| Letter | Paragraphs brighten as they're read; the signature is one stroke written by the scroll |
| Shipped | Hairline UI changelog scrubber; /changelog uses changelog trace |
| FAQ | Hairline UI FAQ accordion with a sticky intro |
| Closing | A plumb line drops into the ink panel; the sign-up pill opens into a field in place |
| Footer | A giant odometer clock of the time spent on the page: "We counted you once, without a cookie" |

## Visual system

- White page, cool greys (`#f4f5f7`, hairlines `#e6e8ec`), ink `#0b0c0e` for the surface and the closing panel. One accent: ultramarine `--signal` `#3b3bff` (`#6d6dff` on ink). No cream, no serif, no orange.
- Funnel Display (headlines, figures) at weight 600 and −0.045 to −0.055em; Funnel Sans for reading; Geist Mono for code and small labels. Chosen from a rendered specimen of six pairings (Host Grotesk, Inter Tight, Schibsted, Mozilla Headline, Funnel) in this session.
- Hairlines only: 1px borders or inset rings, no drop shadows, no blur surfaces.
- The mark is a plumb line and bob; the bob swings on hover, and the closing panel hangs one from its top edge.

## Product screens

Five dark screens (dashboard, dashboard for phones, live view, weekly email, phone app) authored in HTML and rendered at 2× by `work/plumb-shots/render.cjs`, which also prints each screen's empty counter slot as fractions for `site.config.ts`. No photographs and no image generation were needed.

## Library changes made for this template

`pricing-calculator` gained a `locales` prop (server-rendered prices formatted differently from the browser's and broke hydration), and its thumb rider now hangs off to the left of the thumb instead of being pushed right (the old layer widened the page on phones). Both are in `src/ui-library/registry/pricing-calculator.tsx`; the template ships the fixed copy.
