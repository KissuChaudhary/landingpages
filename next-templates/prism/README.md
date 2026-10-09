# Prism

A premium launch page for AI creative apps and consumer tools. The demo is a fictional image-creation app, but the design works for photo editors, avatar apps, video tools, design utilities and other consumer products.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Build and serve a production site with:

```bash
npm run typecheck
npm run build
npm run start
```

No environment variables, API keys or backend are required. The project uses Next.js 15, React 19, TypeScript, Tailwind CSS 4 and Lucide icons. Motion uses CSS. Fonts are self-hosted by `next/font` after the first build; that build needs access to Google Fonts. The lockfile includes a patched PostCSS override compatible with the existing Next.js 15 stack.

## Make it yours

| Change | File |
| --- | --- |
| Brand, metadata, wording, links, artwork records, pricing, FAQ | `site.config.ts` |
| Theme defaults and hero layout | `site.config.ts` → `appearance` |
| Palette, borders, shadows and surface colours | `styles/themes.css` |
| Typography, buttons and shared layout | `styles/base.css` |
| Fonts | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Product previews | `components/product/` |
| Full artwork and thumbnails | `public/images/` |
| Gallery detail and appearance panel | `components/product/GalleryDetail.tsx`, `components/product/Appearance.tsx` |

The styles are split by responsibility. Each section is a named component; remove its line in `app/page.tsx` to remove it, or move the line to reorder it. Keep the `PrismProvider` wrapper around sections that use interactions.

### Themes and hero compositions

Graphite is dark/violet, Paper is white/cobalt and Studio is warm stone/coral. Each palette sets semantic surface, text, border, accent, overlay and shadow variables. Change these together for a coherent new theme rather than editing individual hex values across components.

The default split hero puts the artwork beside the headline. The centered hero includes the full inline workspace underneath the headline. In the split hero, the primary action expands the hero workspace in place so the full editable controls are available in both layouts. Choose the default using `appearance.defaultHero`; all three themes work with both layouts.

The demo appearance panel (in the footer) stores theme/layout preferences under `appearance.storageKey`. Storage failures are handled gracefully. Set `appearance.showControls` to `false` before deploying your product to remove the template appearance controls. A buyer can change the storage key to avoid inheriting old demo preferences.

### Connect your product

Set `appUrl` to your real application URL. Primary CTAs then navigate there instead of loading the local workspace. Give each plan a `href` to connect its checkout; until you do, the free plan opens the workspace and paid plans start an email to `email`. No payment provider or account flow is included.

The workspace accepts custom text and shows preset artwork. It **does not generate new images**. Replace the `preview` handler in `components/product/Workspace.tsx` with your product integration to perform generation. Keep secret API keys on the server. Current prompt and collection state are local to the mounted component; there is no database or account persistence.

The refine slider compares the same artwork with two CSS colour treatments. The export panel crops the original example in a browser canvas and downloads a real PNG/JPEG at the displayed dimensions. Inside the embedded marketplace demo, “Open export preview” opens the full page with the chosen crop and format; “Save example” there starts the download. It does not perform AI upscaling. These small components can be replaced by your app screenshots or adapted independently.

### Replace the demo content

Prism, the people, quotes, credits, prices and product features are fictional. The demo labels creator stories and pricing as illustrative. Replace them with your own substantiated product content and revise the FAQ for your real workflow before launch. The footer’s year and wording are configurable too.

Six original artworks ship with matching 480px thumbnails and 1200px main images. Keep those names in sync with the `artworks` records, or update the record’s `image` property when replacing files. SVG logo geometry is in `components/ui/Brand.tsx`. Exact artwork prompts, provenance and font/icon licenses are in [ASSETS.md](ASSETS.md).

## Interaction and accessibility

- Gallery filters update the visible images and count. Choosing an idea opens it above the grid with its artwork, prompt and a preset reuse action.
- Product tabs support Left/Right, Home and End. Native range inputs support keyboard adjustments.
- The gallery detail and the appearance panel open in place, close with Escape or their close control, and return focus to where you were.
- All primary buttons have working local demo flows. Download and copy actions report failure instead of showing false success.
- Skip link, visible focus, semantic landmarks, image descriptions and reduced-motion styles are included.
- Themes and hero layouts are responsive, with no horizontal page scrolling at the checked desktop, tablet and phone widths.

## Motion components

Prices roll like an odometer and labels morph letter by letter instead of jumping. That's Number roll and Text morph,
two free components from the Hairline UI library, kept in `components/hairline/` and used here in pricing. They need
only React and Tailwind; Number roll's two keyframes sit at the end of `app/globals.css`. Use them for anything else
that changes:

```tsx
<NumberRoll value={total} prefix="$" />
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

## Deploy

The default build works on a Next.js host such as Vercel or a Node server. For a static host, build with `PRISM_EXPORT=1`. Set `NEXT_PUBLIC_BASE_PATH` at build time only when hosting below a subdirectory. The `asset()` helper prefixes local images consistently; fonts and Next.js assets use the framework’s base path.

Inside the Hairline UI repository only:

```bash
npm run export:demo
```

This produces a static export at `/demos/prism` and copies it to the marketplace after a successful build. It is independent of the root marketplace’s styles and dependencies. To return to standalone development after exporting, stop the previous server and run `npm run dev` without the export variables.

[DESIGN.md](DESIGN.md) records the product positioning, art direction, interaction contract and acceptance checks. [LICENSE.md](LICENSE.md) contains the commercial terms.
