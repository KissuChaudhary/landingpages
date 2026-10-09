# Index — proposed design direction

Prepared October 9, 2026. This is the proposed direction for a new template, following inspection of [Infisical's live homepage](https://infisical.com/). It is separate from the existing Patch landing page.

## What the reference does well

- Selected heading accents assemble from small rectangular cells. The readable words sit above the animation.
- Short mono labels decode as content enters the viewport.
- Background cells breathe, blink and step between positions within a consistent visual grid.
- The hero's interface panels have restrained hover lifts and coordinated rearrangement.
- Product demonstrations animate meaningful changes rather than moving the entire page indiscriminately.
- Open white areas, textured product fields and a dark chapter create contrast across the page.
- Repeated type roles and restrained controls hold that motion together.

These observations inform the motion grammar. The brand, copy, illustrations, layouts and assets will be original.

## Product and positioning

Working name: **Index**.

A research and knowledge workspace for people who collect articles, notes and documents, then turn them into useful answers. This supplies adaptable UI for AI search, browser extensions, writing tools and personal knowledge products.

Hero copy direction:

> From open tabs
> to clear thinking.

Supporting copy:

> Collect the useful parts. Connect the ideas. Keep the answer with its sources.

The animation's central idea is **scattered information becoming organized understanding**. That gives motion a consistent meaning across the landing page.

## Visual system

- Warm white `#f7f6f2`, near black `#171916`, pale stone `#e9e7e1`, and persimmon `#ed6a46`.
- [Instrument Sans](https://github.com/google/fonts/tree/main/ofl/instrumentsans) for readable content and display type. A mono face is reserved for short section labels and source metadata.
- Fixed type roles: 76px hero, 44px section title, 24px feature title, 18px body, 14px controls and labels. Hero and section titles scale to 44px and 32px on phones.
- Headings use medium weight and deliberate line breaks. Body text has generous line spacing and limited measure.
- One short text badge above each major section heading, with a shared treatment and spacing.
- A 64px navigation row with a wordmark, three navigation links and one primary action. Main buttons are 48px tall; navigation controls are 40px tall.
- One column system and an 8px spacing rhythm. Visible rules appear where they explain the layout. Decorative joins are tied to real borders.
- Product screens contain actual interface elements. Decorative card wrappers, scattered captions and extra status badges are excluded from the composition.

## Page storyboard

| Section | Composition | Motion and interaction |
| --- | --- | --- |
| Hero | Large left-aligned headline across the upper field. A wide research scene sits below, with three sources and one concise synthesis. | A segmented accent resolves behind the key phrase. The research scene moves from loose sources into an ordered view. Three topic examples change the real source content. |
| Introduction | A short editorial statement with generous space and an inline source trail. | The accent appears when the statement enters view. The paragraph receives a small, single entrance. |
| Product story | Three concise chapters share one large product stage: collect, connect, understand. | Desktop scrolling changes the active stage. Visible controls also select each chapter. On phones, chapters follow normal document flow. |
| Dark chapter | A wide, quiet statement about keeping evidence with the answer. A single source-to-answer illustration provides the detail. | Connection strokes draw once. A citation control opens its associated source. |
| Example library | Open rows with three practical examples and a generous preview area. | Hover changes the row emphasis and arrow. Selecting a row changes the example; keyboard interaction provides the same result. |
| Pricing | Three aligned plans and a compact comparison, with one emphasized tier. | Billing toggle updates prices and totals. Each plan opens a correct review or its configured destination. |
| FAQ | Readable questions in a restrained disclosure list. | Disclosure expansion; consistent focus and hover feedback. |
| Closing | A large final invitation in the accent field, followed by a compact footer. | The decorative field resolves once on entry. Primary and secondary actions have working destinations. |

## Motion rules

1. **Heading accent:** short horizontal segments assemble over roughly 550ms. Text remains readable throughout. Hover can replay the decorative accent, with a cooldown to avoid rapid repeated flashes.
2. **Short labels:** a brief decode effect, around 300ms, on entry or interaction. Original text remains available to assistive technology. Long paragraphs do not scramble.
3. **Body copy:** a restrained 8px entrance over roughly 350ms, coordinated with its heading rather than delayed for several seconds.
4. **Ambient field:** sparse lines and translucent bands, moving slowly and confined to illustration space. Pointer response travels only a few pixels and never displaces reading text.
5. **Hover feedback:** approximately 180–220ms for a small arrow movement, underline or surface tint. Each interactive element has a matching focus treatment.
6. **Product story:** one scroll-linked sequence. It advances actual content stages and remains operable through ordinary controls.
7. **Performance:** suspend loops outside the viewport and when the tab is hidden. Prefer opacity, transforms and SVG strokes; avoid animating large blur filters or layout geometry every frame.
8. **Accessibility:** reduced motion presents complete, static content and fully usable controls. Touch interaction does not depend on hover. Content is available before animation code runs.

## Implementation structure

```text
next-templates/index/
  app/
  components/
    sections/          # Hero, introduction, story, examples, pricing, FAQ, closing
    product/           # Research scene, sources, synthesis, topic selector
    motion/            # AccentReveal, LabelDecode, AmbientField, StoryProgress
    ui/                # Shared badge, action, disclosure and source link
  styles/              # Tokens, typography, sections and motion
  data/                # Prepared topic examples and source content
  site.config.ts       # Copy, links, plans and customization
  DESIGN.md
  QA.md
```

Motion primitives share timings and easing. Section files contain their own composition, while product controls and motion logic live in small, separate components.

## Build and review sequence

1. Create the complete static composition and type system. Inspect desktop and phone frames with motion disabled.
2. Build a focused motion study containing the hero, one heading accent, one label and one hover interaction. Resolve the timing before extending it across the page.
3. Implement the product story and its manual controls. Check scrolling forwards, backwards, rapidly and after reload.
4. Complete pricing, examples, links and keyboard interactions. Prepared demonstrations should be clear and internally consistent.
5. Review the entire page for heading sizes, button sizes, copy density, background contrast, shared gutters and divider alignment.
6. Verify 1440, 1280, 1024, 768, 390 and 320px layouts, touch behavior and reduced motion. Check overflow, browser errors and offscreen animation behavior.
7. Export into the marketplace and refresh all screenshots after the final visual review.

The static page should feel complete before its animation is enabled. Motion adds expression to that composition; it does not compensate for unresolved layout or typography.
