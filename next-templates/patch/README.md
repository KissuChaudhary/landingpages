# Patch

A precise launch page for AI builders, developer tools, browser extensions and component products. Chalk, citrus and graphite sit inside one continuous grid, with a split hero, inspectable workspace, distinct product illustrations and an oversized closing wordmark.

Patch is a fictional product. Its prepared local demos work without an API key; they do not generate code with AI.

## Run

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production:

```bash
npm run typecheck
npm run verify:examples
npm run build
npm run start
```

Next.js 15, React 19, TypeScript, Tailwind CSS 4 and Lucide. The first build fetches Geist and Geist Mono; Next then self-hosts them. All product illustrations are editable HTML/CSS/SVG. No image service or animation library is required.

## Make it your own

| Change                                                                         | Location                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Brand, metadata, primary section copy, navigation, FAQ, plans and destinations | `site.config.ts`                                       |
| Chalk and graphite palettes, shared type and buttons                           | `styles/base.css`                                      |
| Default appearance and theme control                                           | `site.config.ts` → `appearance`                        |
| Fonts and appearance bootstrap                                                 | `app/layout.tsx`                                       |
| Section order                                                                  | `app/page.tsx`                                         |
| Example requests, full exported code and change excerpts                       | `data/signup.ts`, `data/pricing.ts`, `data/command.ts` |
| Rendered example components and interface microcopy                            | `components/product/`                                  |
| Original logo and favicon                                                      | `components/ui/Brand.tsx`, `public/icon.svg`           |

Each section and product visual has its own component. CSS is grouped by responsibility. The `PatchProvider` wrapper coordinates the hero example, command menu and appearance; the main workspace has independent state. Each main section has one configurable `badge` label, rendered by the shared `SectionBadge` component. `GridIntersections` supplies the decorative plus marks at the main rail junctions; its placement follows each section border.

`styles/base.css` defines five shared type roles and the action sizes. `styles/grid.css` controls the frame and section connections. Feature layout, preview controls and smaller product details live in separate stylesheets. Workspace, workflow, use cases and FAQ share a 4/8 column division; the hero retains its 5/7 composition.

### Connect the real product

Set `links.app` to send primary actions to your application. When empty, these actions open the local example selector. Set `links.docs` and `links.email` for your own contact information.

Personal, Builder and Studio form three joined pricing columns. Each plan has separate `href.monthly` and `href.yearly` destinations. Connect both to the appropriate checkout or signup page. Until they are set, the free plan opens the workspace and paid plans start an email to `links.email` naming the plan and period. Set `featured: true` to emphasize a plan; comparison rows use `included` arrays containing the applicable plan IDs. Prices, comparison rows and features are illustrative sample content.

The closing section uses an ink-colored field, a cropped logo watermark and two actions. The primary action follows `links.app`; the secondary action links to the workspace. Its badge, headline and action copy live in `site.config.ts`.

The signup example only changes its local confirmation state. Connect your actual email provider or product inside `components/product/SignupOutput.tsx` if you want the landing-page demo to submit data. The app, authentication, AI inference and checkout are separate integrations.

### Use real product screenshots

Add your files under `public/screens/`. Replace the main workspace using:

```ts
workspace: {
  // Keep the existing section copy.
  screenshot: { src: "/screens/workspace.webp", alt: "Your product workspace" },
}
```

Each entry in `useCases.items` also accepts a `{ src, alt }` screenshot. Local paths automatically respect a configured base path. Replace the hero's `Workspace` component in `components/sections/Hero.tsx` if you want a static hero screenshot. Provide useful alt text and keep images compressed.

### Change the examples

The example data contains complete before/after TSX strings plus short review excerpts. The displayed output is an intentionally authored React preview, not a runtime evaluator of arbitrary code. If you edit a data example, update its corresponding `*Output.tsx` component and excerpts to match. `npm run verify:examples` checks all six exported TSX versions with strict TypeScript.

Copy and workspace export use the currently displayed state. The small export feature and final workflow step export a changed example. Exports contain standard React with inline styles, without dependencies on this landing page.

## Interaction and accessibility

- Apply/Undo changes the code and rendered output across three examples.
- Build/Review/Preview tabs support arrows, Home and End.
- Wide/Narrow controls resize the preview; file controls change the context excerpt.
- Workflow and use-case tabs support keyboard navigation.
- Cmd/Ctrl+K opens a filtered command menu inside the keyboard feature card, with arrow, Enter and Escape. Nothing opens in a popup.
- Appearance persists under `patch-appearance-v1`, with a safe fallback if storage is unavailable.
- Native FAQ disclosures, visible focus, labeled inputs and reduced-motion styles are included.

## Deployment

Deploy this directory as an independent Next.js project. Use `npm run build`; leave `PATCH_EXPORT` and `NEXT_PUBLIC_BASE_PATH` unset for a normal root-domain deployment.

For a static host, set `PATCH_EXPORT=1` when building and publish `out/`. Set `NEXT_PUBLIC_BASE_PATH` only when hosting under a subdirectory. Restart the development server after changing these variables.

`npm run export:demo` is a maintainer helper for this marketplace. It builds under `/demos/patch`, then copies `out/` into the marketplace's `public/demos/patch`. Stop the template dev server before building. Buyers do not need the marketplace or that helper.

See `DESIGN.md`, `ASSETS.md`, `LICENSE.md` and `QA.md` for design decisions, asset provenance, license and verification notes.
