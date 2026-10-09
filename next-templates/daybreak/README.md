# Daybreak

A complete white-label AI marketing workspace template. Restrained Inter typography, pill controls, aligned dashed frames, original painted landscapes and a portrait-led perspective section. Includes the homepage, product, integration directory, pricing, contact, journal, three articles, about, privacy, terms, accessibility and a missing-page state.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

For production, run `npm run build`, then `npm start`. `npm run typecheck` checks the standalone project. `npm run verify:content` validates billing, campaign calculations, recommendations, routes and asset availability.

## White label

1. Change the brand, metadata, marketing copy, product labels, plans, FAQ and destination URLs in `site.config.ts`.
2. Configure `links.app` for your product, each plan's monthly/annual checkout URL and `links.contactEndpoint` for your contact service. With an empty app URL the main buttons go to the pricing section and the hero question answers in place from the sample data. Empty checkout URLs send plan buttons to the contact page. An empty contact endpoint prepares a downloadable local brief.
3. The contact endpoint receives JSON `{ name, email, team, message }`. Return a success status only when the request is accepted. Failed requests preserve every field. Use a same-origin endpoint or configure CORS for your service.
4. Replace sample campaigns in `data/campaigns.ts`; totals, return on spend, filtering and CSV downloads derive from this dataset. The quarter is an explicit example transformation. The trend chart is illustrative and labeled accordingly.
5. Replace team identities, quotes and portraits through `data/teams.ts` and `public/images/`. Quotes and people are fictional examples; publish your own customer evidence before representing them as real testimonials.
6. Connection names, categories and example data scopes live in `data/integrations.ts`. Connect your real providers, authentication and consent flow separately. The included directory describes a connection; it does not claim to connect a live account.
7. Edit articles and resource pages in `data/pages.ts`. Privacy and terms are marked placeholders. Replace them with the policies that apply to your own business.
8. Change palette, type, gutters and controls in `styles/base.css`. Other styles are divided by section and product scene. Fonts live in `app/layout.tsx`, page composition in `app/page.tsx`. Original artwork prompts and provenance are in `ASSETS.md`.

## Working interactions

- Editable hero question that answers in place, under the question. Questions about the strongest campaign, a report or budget guidance produce different answers from the local sample data.
- Month/quarter selection updates metrics and the campaign table. CSV exports contain the matching data, with escaped text fields.
- Four keyboard-accessible product views, interactive data-source selection, channel filters and a four-stage local weekly report workflow.
- A dashboard preview drawn as images: a full layout on wide screens and a short card on phones (`public/images/dashboard.webp`, `dashboard-phone.webp`).
- A week of mornings on a sun-path arc: five day stops, each with its own small working interface (a brief, an approvable budget nudge, a creative test, an early warning, a scheduled report).
- A “Calm by design” access panel: read-only connections, per-source suggestion switches, an approval rule and an activity log.
- Integration garden linking to a searchable, category-filtered connection directory, where each connection lists the data it brings in.
- Audience navigation follows the visible chapter. Four expanding portrait perspectives support mouse, arrow keys, Home and End.
- Three plans with monthly/yearly pricing. Growth is $49 monthly or $432 annually; Studio is $149 monthly or $1,308 annually. Each button goes to its checkout link.
- Validated contact brief, download and edit flow. Editing retains all entered fields.
- Accessible navigation menus, native FAQ disclosures and system reduced-motion support. No popups: every button is a link or works in place.

The preview runs locally. Connect your production AI, accounts, attribution, approvals, integration providers, contact service and billing separately.

## Project map

```text
app/                     Routes, fonts, metadata and style imports
components/sections/     Homepage chapters and shared footer
components/product/      Editable product interfaces and diagrams
components/ui/           Frame and brand primitives
data/                    Campaigns, teams, connections and resources
lib/                     Route and download helpers
styles/                  Focused native CSS files
site.config.ts           White-label brand, copy, plans and destinations
public/images/           Six original optimized images
```

Four runtime dependencies: Next.js, React, React DOM and Lucide. Native CSS and small browser observers handle motion; no animation framework is required.

## Static export

Within the Hairline UI repository, `npm run export:demo` builds the standalone site with `/demos/daybreak` as its base path and copies it to `public/demos/daybreak`. Stop the development server first, as development and export use the same `.next` directory. The export script verifies every replacement path stays inside this template's demo directory.

For your own static deployment, set `output: 'export'` in `next.config.ts` and deploy `out/`. `lib/urls.ts` uses `.html` route destinations when a base path is configured; adapt it to your host if exporting at the domain root. Contact submission requires a separate endpoint.

See `DESIGN.md`, `QA.md`, `ASSETS.md` and `LICENSE.md` for design decisions, validation, asset provenance and usage rights.
