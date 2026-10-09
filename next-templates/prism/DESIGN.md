# Prism — design and build plan

## Product direction

An AI creative app launch page for indie builders. The fictional demo turns ideas into images; the template should also adapt naturally to photo editors, avatar apps, video tools, design utilities and consumer products. Buyers are purchasing composition, UI, theming and reusable sections rather than a narrowly prescribed business.

## Art direction

- Default: deep graphite, pale lavender text, electric violet. Alternate complete palettes: Paper (white/cobalt) and Studio (warm stone/coral).
- Manrope display typography, Geist interface typography, Geist Mono for small metadata. Large, tightly tracked headlines; quiet readable supporting text.
- A custom prism mark, restrained ambient colour, fine borders, layered app surfaces and consistent 12–24px corners. Colour belongs to the artwork; chrome stays controlled.
- Original generated artwork with distinct materials and crops. Real React controls surround it; no rasterized product screenshot.
- Two hero compositions: centered launch layout and split editorial layout. The same product preview works in both.

## Page architecture

1. Navigation: anchor links, mobile menu, primary launch action.
2. Hero: “Your next idea. Made visible.”, two actions, interactive prompt workspace with preset results.
3. Explore: six original artworks, category filters, full preview with prompt details and “Use this idea”.
4. Product: Create / Refine / Export tabs with three distinct editable interface visuals.
5. Capabilities: asymmetrical bento with useful visual states, not identical icon cards.
6. Workflow: three concise steps, connected by a line and small real UI details.
7. Creator stories: three editable sample quotes, explicitly identified as illustrative in the demo.
8. Pricing: free / Creator / Studio, monthly and annual rates with accurate totals; each plan button is a link to its checkout, or an email to your team until one is set.
9. FAQ: native disclosures with honest demo/product boundaries.
10. Closing action and footer: a gallery-backed closing composition; theme and hero-layout controls in a separate preview settings panel.

## Interaction contract

- Presets update image, prompt and style. “Preview result” shows a brief pending state and the selected example; custom text is preserved. The interface clearly labels example results and never implies a live AI service.
- Gallery filters and the idea detail work by mouse and keyboard. Escape closes the detail and restores focus; choosing an idea loads the workspace preset in the hero.
- Product tabs support arrows, Home and End. The refine panel has a working before/after slider; export has aspect-ratio and format selections and saves a real cropped example. Embedded previews open the full export page with the chosen settings before saving.
- Billing toggle changes every displayed amount and annual billing description. Paid actions never show a fake payment success.
- Primary actions open a usable sample workspace unless a buyer configures their real application URL. No email capture or external service is implied.
- Theme/layout changes update the entire page and persist locally. Storage failure must not break the page. Motion respects reduced motion.

## Buyer architecture

One typed content config; centralized artwork records; semantic CSS theme tokens; small section and product-visual components. Section order is editable in the page. No backend, API keys, animation library or UI-framework dependency. Standalone Next.js 15 / React 19 / Tailwind 4 project, plus an isolated static marketplace demo.

## Acceptance checks

- Inspect at 1440, 1024, 768 and 390px; no horizontal overflow, broken art or compressed controls.
- Check all three themes and both hero layouts. Confirm text, focus rings and surfaces remain readable.
- Exercise navigation, filters, gallery detail, workspace presets, preview result, product tabs, refine slider, export selections, billing, plan links and the appearance panel.
- In-place panels move focus in and return it; interactive controls have names; visible focus and reduced-motion styles exist.
- Strict TypeScript check, standalone production export, marketplace production build and browser console review.
- Actual screenshot previews, complete customization/readme/license/asset provenance docs, and no oversized source file.

## Reference principles

Research of [21st.dev](https://21st.dev), [Magic UI Pro](https://pro.magicui.design), [Aceternity Pro](https://ui.aceternity.com/pro), [Launch UI](https://www.launchuicomponents.com), and [Shadcnblocks](https://www.shadcnblocks.com/themes) informed the emphasis on adaptable sections, coherent themes, product previews and purposeful interaction. All implementation and artwork are original; their code and paid assets are not included.
