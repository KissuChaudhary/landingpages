# Encore: design notes (internal, not shipped)

## Brief

The owner asked for a template from mailforge.framer.website (a Framer template for an email-marketing agency), fully white-labelled: after Shear came out too close to its reference, this one had to change layouts and section hierarchy so it reads as its own page, while keeping the design quality and beating the reference everywhere. No mock popups; buyers plug in and run.

## Positioning

Encore: an email and SMS retention studio for Shopify brands. The reference sells "email marketing that converts"; Encore sells the second order ("Make the second order inevitable"), with every claim tied to revenue you can see in Shopify. Plans are engagements (free audit, Growth retainer, Full lifecycle) because agencies sell retainers, not seats.

## Visual system

- White page, cool mist containers (`#f5f4f7`), ink (`#110f17`) for the process block and the featured plan. One accent: berry (`#e0195c`), berry-ink for text on light. The reference's palette was not used. No cream, serif or orange.
- Hubot Sans (variable, with its width axis) for everything; display type at width 80, weight 640, tight leading. Azeret Mono for labels.
- Rounded section slabs inset from the page edge; pill buttons with an arrow disc that swaps on hover.

## Section map (reference → Encore)

The reference runs: centred hero with a video, logo row, 3×2 services grid, alternating process steps, two case cards, benefits, integrations grid, testimonial grid, pricing, FAQ, CTA, footer. Encore reorders and reshapes it:

| Reference | Encore | Why it's different / better |
| --- | --- | --- |
| Centred hero + video | Split hero: headline with a hand-drawn loop around "second order", and a deck of four emails that shuffles itself; chip morphs the flow name and rolls its revenue | Shows the product (emails that earn) instead of a talking video; holds on hover, steps on click |
| Logo row | Stats strip (NumberRoll) + client-name marquee | Proof first |
| (none) | Statement that lights word by word on scroll | New beat: the problem in one paragraph |
| 3×2 services grid | Services index (numbered rows, deliverable chips) + sticky preview that wipes by direction | Reads like a menu; images instead of icons |
| Alternating steps | Dark "first 90 days" timeline that fills with scroll | One gesture instead of four blocks |
| Two case cards | Featured case (metrics + chart) + ledger rows with a pointer-following email preview | Numbers in a ledger read as proof |
| Benefits list | Berry 2.4x tile + five benefit tiles | |
| Integrations grid | Two counter-rotating rings around the mark | |
| Testimonial grid | One large quote, client list with autoplay hairline | |
| Pricing | Three engagements, free audit first | Matches how agencies sell |
| FAQ | FAQ + founder card ("Book with Maya") | A human next to the questions |
| CTA + footer | Berry closing with outline marquee + footer wordmark that narrows on scroll | |

## Images

Owner rule: product UI ships as images. The emails (600 × 880) and app screens are HTML in `work/encore-shots/screens.cjs`, rendered at 2× with Playwright and saved as WebP by `work/encore-shots/render.cjs` (sharp from `next-templates/conduit/node_modules`). Total image weight about 490 KB.

## Motion rules followed

No animation library. Loops carry `.loop` (paused by the pause button and reduced motion); the deck and the testimonial autoplay read the motion context and only run in view and in a visible tab. Every changing number uses NumberRoll, every changing label TextMorph. Reduced motion: everything visible, nothing moves on its own.
