# Encore: design notes (internal, not shipped)

## Brief

The owner asked for a fully white-labelled retention template that changes layouts and section hierarchy enough to read as its own page while keeping the design quality high and creating a more distinctive product story. No mock popups; buyers plug in and run.

## Positioning

Encore: an email and SMS retention studio for Shopify brands. The page sells the second order ("Make the second order inevitable"), with every claim tied to revenue you can see in Shopify. Plans are engagements (free audit, Growth retainer, Full lifecycle) because agencies sell retainers, not seats.

## Visual system

- White page, cool mist containers (`#f5f4f7`), ink (`#110f17`) for the process block and the featured plan. One accent: berry (`#e0195c`), berry-ink for text on light. No cream, serif or orange.
- Hubot Sans (variable, with its width axis) for everything; display type at width 80, weight 640, tight leading. Azeret Mono for labels.
- Rounded section slabs inset from the page edge; pill buttons with an arrow disc that swaps on hover.

## Section map

A high-end retention page follows a clean conversion arc: split hero, stats proof strip, statement, services index, dark 90-day timeline, featured case, benefit tiles, orbital brand proof, quote + client list, pricing, FAQ, CTA and footer. Encore reorders and reshapes the familiar pattern into a more distinct product-led narrative:

| Structure | Encore | Why it works |
| --- | --- | --- |
| Hero | Split hero: headline with a hand-drawn loop around "second order", and a deck of four emails that shuffles itself; chip morphs the flow name and rolls its revenue | Shows the product (emails that earn) instead of a talking video; holds on hover, steps on click |
| Proof strip | Stats strip (NumberRoll) + client-name marquee | Proof first |
| Statement | Statement that lights word by word on scroll | New beat: the problem in one paragraph |
| Services | Services index (numbered rows, deliverable chips) + sticky preview that wipes by direction | Reads like a menu; images instead of icons |
| Timeline | Dark "first 90 days" timeline that fills with scroll | One gesture instead of four blocks |
| Case study | Featured case (metrics + chart) + ledger rows with a pointer-following email preview | Numbers in a ledger read as proof |
| Benefits | Berry 2.4x tile + five benefit tiles | |
| Brand proof | Two counter-rotating rings around the mark | |
| Social proof | One large quote, client list with autoplay hairline | |
| Pricing | Three engagements, free audit first | Matches how agencies sell |
| FAQ | FAQ + founder card ("Book with Maya") | A human next to the questions |
| Closing | Berry closing with outline marquee + footer wordmark that narrows on scroll | |

## Images

Owner rule: product UI ships as images. The emails (600 × 880) and app screens are HTML in `work/encore-shots/screens.cjs`, rendered at 2× with Playwright and saved as WebP by `work/encore-shots/render.cjs` (sharp from `next-templates/conduit/node_modules`). Total image weight about 490 KB.

## Motion rules followed

No animation library. Loops carry `.loop` (held under the pointer via `.hold`, stopped by reduced motion). No visible pause button: the owner ruled on 2026-10-10 that a play/pause control has no place in a ready-made template's UI. The deck and the testimonial autoplay read the motion context and only run in view and in a visible tab. Every changing number uses NumberRoll, every changing label TextMorph. Reduced motion: everything visible, nothing moves on its own.
