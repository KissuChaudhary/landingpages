# Aster

A white-label AI customer support landing page and working local workspace. Warm ivory, Newsreader headings, Onest reading type and original botanical paintings give the product story a spacious, human character.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. The first production build downloads the selected Google fonts; Next.js serves them locally afterward.

## Make it yours

Start with `site.config.ts`. Change the brand, metadata, main copy, section labels, pricing, FAQ and destinations. One label introduces each main heading. Keep the short headline lines and the restrained display scale when changing the copy.

| Content                                             | File                          |
| --------------------------------------------------- | ----------------------------- |
| Brand, copy, pricing, FAQ, destinations             | `site.config.ts`              |
| Fictional tickets, filters, metrics and transitions | `data/tickets.ts`             |
| Approved knowledge articles                         | `data/knowledge.ts`           |
| Fictional teams and portrait stories                | `data/teams.ts`               |
| Connection guides and data scopes                   | `data/integrations.ts`        |
| Articles, updates and supporting pages              | `data/pages.ts`               |
| Palette, typography, gutters and controls           | `styles/base.css`             |
| Original artwork and portraits                      | `public/images/`, `ASSETS.md` |
| Page composition                                    | `app/page.tsx`                |

The component tree separates landing sections, product illustrations, workspace views, secondary pages and shared primitives. CSS is split by purpose. There is no Tailwind requirement or animation library.

## Destinations and contact

`site.links.app` replaces local workspace destinations when configured. Leave it empty to explore the included workspace. Each plan has separate `checkout.monthly` and `checkout.annual` destinations. An empty paid checkout opens a local plan review followed by the contact brief. The Starter plan opens the example workspace. Scale retains custom pricing for both billing periods.

The example Team plan costs $59 monthly or $588 per year, equivalent to $49 monthly. The review shows the full annual amount. Update the plan values and the matching FAQ when changing your pricing.

The contact form validates details, prepares a review and downloads a JSON brief locally. Configure `site.links.contactEndpoint` to submit that brief as JSON using POST. Your service must handle validation, delivery, rate limits and any required CORS configuration. A failed request preserves the brief and offers retry/download. No credentials belong in the frontend.

## Working local experience

- Search twelve tickets and combine status, channel and category filters. CSV exports contain the visible rows.
- Open a conversation, read its approved article and edit the suggested reply. Resolve a routine ticket locally or choose an owner and handoff reason. Questions marked as requiring a person cannot be resolved automatically.
- Download the current conversation as JSON, including the edited draft, source article and any recorded handoff reason.
- Search the knowledge library and read complete articles. The selected article follows the filtered results.
- Review calculated counts, resolution rate, median response time, scored customer ratings and a local activity ledger. Unscored resolutions do not invent customer ratings.
- Reset the workspace through a confirmation dialog. Ticket edits and history remain in memory and reset on reload.
- Explore searchable connection guides, journal articles, pricing, customer stories and policy placeholders.

This template does not call an AI model, send customer messages, connect provider accounts, authenticate a user or collect payment. Connect those production services in your application. Replace the fictional identities, quotes, tickets, plan allowances, privacy and terms before launch.

## Motion and accessibility

Headings and feature tiles enter once when they reach the viewport. The desktop product chapters stack while scrolling; phones read them in normal order. Botanical backdrops and product tiles respond subtly to hover. Product tabs support arrows, Home and End. Native dialogs trap focus, close on Escape and return focus. FAQ uses native disclosures.

System reduced motion disables decorative movement and stacking. A remembered footer control pauses motion manually. Hidden menus have no keyboard stops; the phone menu returns focus on Escape. Compact marketing illustrations link to the readable workspace.

## Verification

```sh
npm run typecheck
npm run verify:content
npm run build
```

The content verifier checks billing totals, combined filters, calculated metrics, immutable state transitions, guarded resolutions, handoff edits, CSV escaping, knowledge references, export URLs and all seven image assets. See `QA.md` for browser verification and `DESIGN.md` for layout decisions.

## Marketplace export

Inside the Hairline UI repository, `npm run export:demo` builds the static `/demos/aster` version and copies it into the marketplace's public directory. Export-specific URLs preserve query strings and anchors. For your own standalone deployment, use the normal build or configure Next.js static export for your host. Keep `.next`, `out`, `node_modules` and local environment files out of the source package.

Original generated images ship with this template; their full prompts and provenance are in `ASSETS.md`. Font licenses are provided by their upstream Google Fonts packages. Commercial template usage is described in `LICENSE.md`.
