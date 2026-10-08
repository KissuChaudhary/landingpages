# Patch and Relay — proposed grid launch templates

Status: Patch is built and deployed. Relay's opening and feature system were rebuilt after the user's 8 October critique of the first design. Relay's current design specification is `next-templates/relay/DESIGN.md`.

## Brief

Create two premium, independently reusable landing-page templates inspired by the structural grid language of Codeforge and SkyAgent. The product stories demonstrate adaptable UI and page composition; they do not limit the buyer to the fictional product.

Default proposal: both light, with complete optional dark appearances. Patch uses an architectural, technical composition. Relay uses a spacious, conversational composition. The user's theme preference can revise these defaults.

References inspected:

- https://codeforge-magicui.vercel.app/
- https://agent-magicui.vercel.app/
- Supplied mobile screenshot of SkyAgent's feature grid.

## What the references contribute

The useful pattern is a continuous page frame: outer rails, aligned one-pixel dividers, joined cells of different spans, generous section introductions, and realistic product UI inside the cells. SkyAgent carries hatched rails and the grid into its mobile layout; Codeforge pairs a narrow copy column with larger terminal and diff demonstrations.

Our interpretation changes the identities, compositions, copy, illustrations, product examples, section order, and interaction models. Build original components and assets. Avoid repeated generic claim sections; give every row a distinct purpose and density.

The catalog already contains Halftone (API tools), Parley (support chat), Footnote (writing/research), and Emberline (dark SaaS bento). These additions need visibly different silhouettes and product stories: a builder workspace and a personal agent workspace.

## Shared grid discipline

Patch uses the denser architectural frame described below. Relay uses continuous outer and inner rails, navigation that contracts on scroll, a conversation hero and a joined feature grid.

- Patch has a 1248px framed grid; Relay has a 1280px outer frame with 40px inner gutters on desktop. Content alignment remains consistent through navigation, hero, product, pricing and footer.
- One-pixel rules, drawn once per shared edge. Avoid doubled borders and drifting column boundaries.
- Alternate full-width introductions, unequal split rows, dense product panels, and sparse text cells. Small app windows may have rounded corners; the page grid stays architectural.
- Patch uses registration ticks. Relay carries inner rails through all sections and hatches selected outer gutters. Keep phone cell content padding at least 20px.
- Use original details and useful section relationships rather than reproducing the reference hatch pattern.
- Both pages have a complete semantic colour-token system. Theme changes affect diagrams, illustrations, code, borders, shadows, selections, forms, and dialogs.
- Animation clarifies an action or transition. No automatic carousel for primary product content; no constant movement in every cell. Respect reduced motion.

## Patch — AI Builder & Developer Tool Launch

### Positioning

For indie AI builders, coding assistants, code editors, component products, and local developer tools. A fictional interface-building assistant supplies the demonstration. Buyers can replace the workspace with their own editor or screenshots.

Promise: turn an idea into a change you can inspect.

Hero copy direction: **From first thought to first commit.**

### Identity

Chalk canvas `#FAFAF7`, ink `#202520`, restrained citrus `#DCEB99`, muted olive, and a graphite editor surface. Geist Sans for headlines and interface copy; Geist Mono for file names, status rows, and annotations. Dark appearance uses charcoal surfaces with the same restrained citrus identity.

Sharp shared grid edges, small numbered section labels, original bracket-like mark, precise spacing, and 8–12px radii inside app windows. Avoid cyan hero haze and glossy pill CTAs from the reference.

### Page composition

1. **Grid navigation.** Brand cell, compact anchor navigation, appearance control, primary app link.
2. **Split hero, 5/7.** Left: strong headline, short supporting copy, two actions, a small example label. Right: a large, original three-part builder workspace showing a request, a readable code change, and the resulting component. The product UI is visible in the first screenful.
3. **Capability strip.** Four joined cells describing editable example capabilities, such as Build, Review, Preview, Export. Treat compatibility labels as compatibility, not invented customer endorsements.
4. **The change, explained, 4/8.** A concise section brief beside a large before/after workspace. Request presets change the file, diff, and output together; Apply and Undo visibly change the local example.
5. **Supporting feature matrix.** Unequal 8/4 then 4/4/4 rows: component preview, file context, keyboard actions, responsive output, and export. Use different UI compositions rather than repeating icon-plus-paragraph cards.
6. **Workflow strip.** Three continuous steps: describe, inspect, keep. One selected step updates the supporting example. On mobile, steps become a readable vertical sequence.
7. **Use-case index.** Tabs for an AI app, developer extension, and component product. Each tab changes the example and its caption. This demonstrates the buyer's adaptation options.
8. **Pricing ledger.** Two primary plan columns with aligned feature rows, monthly/yearly totals, and configurable destinations. Plans relate to the fictional builder, with sample claims clearly identified.
9. **FAQ and closing grid.** Plain disclosures alongside a restrained final CTA and large wordmark/footer cells.

### Interaction contract

- Workspace tabs and presets use a finite, deterministic example dataset. They do not claim to generate live AI code.
- Apply/Undo changes the visible example output and code. Copy uses the Clipboard API with an honest success/failure state. Download exports the selected local example.
- The product viewport has replaceable screenshot slots. It remains meaningful without an API key.
- Appearance switch, navigation, pricing period, app/checkout destinations, mobile menu, disclosures, and dialogs work with keyboard input.
- Avoid implying that a fictional CLI package exists. Real install commands are supplied by the buyer's config.

## Relay — Personal AI Assistant & Agent App Launch

### Positioning

For personal AI assistants, browser extensions, desktop companions, research agents, and small automation products. A fictional assistant helps an independent creator plan, collect context, and prepare useful outputs. This is separate from Parley's customer-support positioning.

Promise: a thought becomes an organized next step.

Hero copy: **For everything on your mind.**

### Identity

Cloud white `#FBFCFF`, ink `#182137`, cobalt `#295CF1` and a pale-blue hero glow. DM Sans is the only typeface, with five shared semantic text roles. The alternate ink appearance uses deep navy and softened blue highlights across the complete page.

An original linked-ribbon mark, one useful hero eyebrow, floating navigation and clear space. Borders join four feature cells; their original visuals show product behavior rather than generic cards.

### Page composition

1. **Navigation.** Open navigation contracts into a compact floating bar after scrolling; it includes active anchors, appearance switch and mobile menu.
2. **Hero.** A tightly set centered two-line headline, blue light and two actions lead directly into the product.
3. **Assistant workspace.** A dedicated grid section combines selected context, prepared request, three tabs and a document. Phone context follows the result so the primary task appears first.
4. **Illustrated details.** Four joined feature cells each show a distinct product stage with code-native visuals.
5. **Possibilities.** Three shared grid columns contain original example studies, a Saved filter and coordinated workspace actions.
6. **Context and control.** An open explanation of the actual local data boundaries.
7. **Pricing.** Two plans share a ledger, with calculated annual savings and accurate billing previews.
8. **FAQ.** Native disclosures explain the demonstration and buyer integrations.
9. **Closing and footer.** A focused cobalt closing panel and useful links.

### Interaction contract

- Scenario tabs coordinate the request, sources and output. Replay progresses through a finite sequence and offers pause/resume/reset; reduced motion reveals the completed state immediately.
- Source controls change the visible included-context state. They are demo controls, not OAuth integrations.
- Save/remove stores only example IDs locally. Copy/export produces the displayed result and reports failures honestly.
- Any free-form input must route to a real configured app or explain the available sample scenarios; never simulate an arbitrary AI response to text that was ignored.
- Appearance, plans, anchor navigation, FAQ, and dialogs receive the same completeness as Patch.

## Meaningful difference between the products

| Decision | Patch | Relay |
| --- | --- | --- |
| Hero silhouette | Asymmetrical copy/editor split | Centered statement above a selectable conversation |
| Main visual | File, diff, rendered component | Request, context, structured result |
| Grid rhythm | Precise, denser, alternating spans | Continuous rails, viewport section rules and border-sharing cells |
| Accent | Citrus with graphite UI | Cobalt with pale-blue UI |
| Repeated motif | Brackets and registration ticks | Cobalt light and joined feature borders |
| Core action | Apply a change, inspect, export | Choose context, prepare, save |
| Buyer adaptations | Builders, editors, developer products | Assistants, extensions, personal agents |

## Mobile plan

Design the 390px compositions deliberately, then verify 320px. Patch retains its frame and readable diff excerpt. Relay shows a centered headline, working tabs, multiline request, readable document and compact context controls. Avoid scaled-down desktop screenshots and narrow chat bubbles. Horizontal overflow is permitted only within a labeled code block where wrapping changes meaning.

## Reusable architecture

Keep each template independent under `next-templates/patch/` and `next-templates/relay/`. Separate section components, product-demo components, primitives, state hooks, and styles by responsibility. Use typed `site.config.ts` files for all buyer-facing content, links, pricing, scenarios, screenshot slots, and theme settings. Keep local sample datasets separate from page copy.

Patch uses GridFrame/GridRow/GridCell primitives; Relay uses a shared GridSection primitive, continuous rails and purpose-specific section styles. A buyer must not depend on importing the other template or the marketplace. Avoid a large universal component with many layout conditionals.

Each ships with its own README, design decisions, asset provenance, commercial license, dependency lockfile, strict typecheck, and export script. Then add the isolated live demo, catalog entry, detail content, desktop/mobile screenshots, and OG image to the marketplace.

## Build order and acceptance

1. Build Patch's grid primitives and hero/workspace at desktop and phone widths. Review its primary visual before filling the rest of the page.
2. Complete Patch's sections, both themes, local interactions, and customization surface. Verify, capture, and integrate it into the catalog.
3. Build Relay from its revised composition and typography brief, with separate standalone source and product examples.
4. Complete Relay's sections and interaction states, verify, capture, and integrate.

Acceptance: coherent line intersections, distinct section rhythm, useful demonstrations, authentic typography, complete empty/error/selected states, 44px touch targets, keyboard operation, dialog focus handling, visible focus, reduced motion, contrast checks, and responsive inspection at 1440/1280/1024/768/390/320px. Run typecheck and production/export checks after substantial batches; dependency audit and final console review before completion. Run lint after meaningful changes, never after every small edit. Capture actual pages for catalog assets.

The concept previews show upper-page compositions only. They do not represent finished templates or evidence of market sales.
