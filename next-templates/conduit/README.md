# Conduit

A white-label AI agent and workflow platform template. A centered light-serif hero, original cobalt imagery, square controls, alternating white and black chapters and precise diagram-led product scenes. Includes a homepage, pricing, contact, six resource pages and a missing-page state.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production server, run `npm run build`, then `npm start`. `npm run typecheck` checks the standalone project. `npm run verify:content` checks billing calculations and example-data relationships.

## White label

1. Set your brand, metadata, marketing copy, plans, FAQ and footer in `site.config.ts`.
2. Set `links.app`, `links.contactEndpoint` and the monthly/annual URL of each pricing plan. The contact endpoint receives JSON `{ name, email, team, workflow }`; return an HTTP success status only after accepting the request. Failed submissions retain the form fields. Use a same-origin endpoint or configure CORS on your own service.
3. Replace the fictional team identities and editorial stories in `data/stories.ts`. Example blueprint instructions, tool names, boundaries and the run receipt live in `data/blueprints.ts`.
4. Adapt the resource content in `data/pages.ts`. Privacy and terms are clearly marked placeholders; replace them before launching your product.
5. Replace images in `public/images/` if needed. The three included images are original generated assets, shipped locally as optimized WebP. See `ASSETS.md` for provenance and prompts.
6. Adjust palette, typography, gutters and control sizes in `styles/base.css`. Section styles are separated by purpose. Fonts and metadata live in `app/layout.tsx`; section order lives in `app/page.tsx`.

Use a short wordmark (roughly 5–12 characters) for the large pixel footer treatment. Its text comes from the same brand config. Navigation destinations are centralized in `lib/urls.ts` for both normal Next.js routes and a static export.

## Included interactions

- Four hero agents. Ambient selection stops after the visitor makes a choice and respects the motion preference.
- An editable blueprint selector, a build state, the blueprint’s steps and decision boundary opened inside the builder, and complete JSON blueprint downloads.
- A four-stage local lead-routing run, progress, reset and a JSON run receipt.
- Two analytics periods; model routing selection; previous/next tool connections.
- Six sector links that open the matching blueprint in the builder; four story tabs with Arrow keys, Home and End, each story’s workflow readable in place.
- Native FAQ disclosures; company and mobile menus. No popups: every button is a link or works in place.
- Three pricing plans and monthly/annual selection. Until a checkout destination is set, the plan button opens an accurate local review. Annual totals are calculated by the shared billing helper.
- A contact form that prepares a downloadable local brief until an endpoint is configured. Editing a prepared brief retains its fields.
- A remembered footer motion control and system reduced-motion support.

These examples run locally. Connect your own accounts, AI, document processing, integrations, approvals and payment provider in your product. No account is created or payment collected by the unconfigured preview.

## Project map

```text
app/                 Pages, fonts, metadata and style imports
components/sections/ Homepage and shared footer chapters
components/product/  Agent, workflow, analytics and capability scenes
components/ui/       Brand, controls and frames
data/                Blueprints, stories and resource-page content
lib/                 Billing and base-path routing
styles/              Focused CSS files, including motion and breakpoints
public/images/       Three original, optimized local images
site.config.ts       Main white-label configuration
```

The template has four runtime dependencies: Next.js, React, React DOM and Lucide React. It uses modular native CSS, IntersectionObserver and CSS motion. No animation framework is required.

## Static export

For your own static deployment, enable `output: 'export'` in `next.config.ts`, set the appropriate base path if needed, and deploy the generated `out/` directory. `lib/urls.ts` uses `.html` routes when a base path is set. For a root-level static export, adapt that helper to your host's route handling. Contact submission requires your separately hosted endpoint.

See `ASSETS.md` for asset provenance and `LICENSE.md` for usage rights.
