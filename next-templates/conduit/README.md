# Conduit

A white-label AI agent and workflow platform template. One dashed frame runs from the header to the footer, and the page treats it as the product's conduit: signals travel its lines, and square junctions light up where they arrive. Includes a homepage, pricing, contact, six resource pages and a missing-page state.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production server, run `npm run build`, then `npm start`. `npm run typecheck` checks the standalone project. `npm run verify:content` checks billing calculations, blueprint data and the product screens.

## White label

1. Set your brand, metadata, marketing copy, plans, FAQ and footer in `site.config.ts`.
2. Set `links.app`, `links.contactEndpoint` and the monthly/annual URL of each pricing plan. The contact endpoint receives JSON `{ name, email, team, workflow }`; return an HTTP success status only after accepting the request. Failed submissions retain the form fields. Use a same-origin endpoint or configure CORS on your own service.
3. Edit the four example agents in `data/blueprints.ts`: each has a short name, a source, an instruction, three tools, four steps, a result and an approval rule. The hero route board, the use-case index and the stories all read from it.
4. Replace the fictional team identities and stories in `data/stories.ts`, and adapt the resource content in `data/pages.ts`. Privacy and terms are clearly marked placeholders; replace them before launching your product.
5. Replace the product screens in `public/images/`. Each stage has a desktop image (`stage-build.webp`, `stage-orchestrate.webp`, `stage-observe.webp`, 2240 × 1440) and a phone image (`*-phone.webp`, 1280 × 1040). Keep the same proportions, or adjust the stage panel in `styles/product.css`.
6. Adjust palette, the signal colour, typography, gutters and control sizes in `styles/base.css`. Section styles are separated by purpose. Fonts and metadata live in `app/layout.tsx`; section order lives in `app/page.tsx`.

Use a short wordmark (roughly 5–12 characters) for the large dashed footer wordmark. Its text comes from the same brand config. Navigation destinations are centralized in `lib/urls.ts` for both normal Next.js routes and a static export.

## Included interactions

- A four-column route board in the hero. The chosen blueprint types its intent, links its tools, works through its steps and delivers its result, with a pulse travelling the grid between stages. It cycles through the four blueprints until a visitor picks one, and pauses while off screen.
- Six tools with broken handoffs that re-route through one hub as the section scrolls past.
- A sticky product panel that swaps three screens as the stages scroll past, on a rail that fills with progress, and a counted outcome band.
- Four workflow stories with the workflow readable in place; their buttons, and every row of the use-case index, scroll to the route board and run that blueprint there.
- A run log that keeps writing while visible and pauses on hover; five capability layers on one conduit.
- Three control principles that highlight the lines they enforce in an example policy.
- Native FAQ disclosures; company and mobile menus. No popups: every button is a link or works in place.
- Three pricing plans and monthly/annual selection. Until a checkout destination is set, the plan button opens the contact page. Annual totals are calculated by the shared billing helper.
- A contact form that prepares a downloadable local brief until an endpoint is configured. Editing a prepared brief retains its fields.
- System reduced-motion support: the route board shows a finished run, the map shows the joined route, and nothing loops.

These examples run locally. Connect your own accounts, AI, document processing, integrations, approvals and payment provider in your product. No account is created or payment collected by the unconfigured preview.

## Project map

```text
app/                 Pages, fonts, metadata and style imports
components/sections/ Homepage and shared footer chapters
components/product/  Route board, problem map, layer diagrams and run log
components/ui/       Brand, controls and frames
data/                Blueprints, stories and resource-page content
lib/                 Billing and base-path routing
styles/              Focused CSS files, including motion and breakpoints
public/images/       Six optimized product screens
site.config.ts       Main white-label configuration
```

The template has four runtime dependencies: Next.js, React, React DOM and Lucide React. It uses modular native CSS, IntersectionObserver and CSS motion. No animation framework is required.

## Static export

For your own static deployment, enable `output: 'export'` in `next.config.ts`, set the appropriate base path if needed, and deploy the generated `out/` directory. `lib/urls.ts` uses `.html` routes when a base path is set. For a root-level static export, adapt that helper to your host's route handling. Contact submission requires your separately hosted endpoint.

See `ASSETS.md` for asset provenance and `LICENSE.md` for usage rights.
