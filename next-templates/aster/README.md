# Aster

A creative review landing page and working local workspace for independent creatives and studios. The product brings project briefs, client feedback, studio responses and recorded decisions together. Its positioning, project scenarios, pricing, stories and editorial copy are original to Aster.

Warm ivory, Newsreader headings, Onest reading type and original botanical paintings frame the review process. The approved visual composition is preserved.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. The first production build downloads the selected Google fonts; Next.js serves them locally afterward.

## Make it yours

Start with `site.config.ts` for brand, metadata, copy, plans, FAQ and destinations. Preserve the short headline lines and consistent display scale when changing copy.

| Content | File |
| --- | --- |
| Brand, copy, pricing, FAQ and destinations | `site.config.ts` |
| Reviews, projects, versions, filters and decisions | `data/reviews.ts` |
| Project briefs and agreed creative direction | `data/briefs.ts` |
| Fictional studios and portrait stories | `data/teams.ts` |
| Connection guides and data scopes | `data/integrations.ts` |
| Articles, updates and supporting pages | `data/pages.ts` |
| Palette, typography, gutters and controls | `styles/base.css` |
| Original artwork and portraits | `public/images/`, `ASSETS.md` |
| Page composition | `app/page.tsx` |

The component tree separates landing sections, product scenes, review views, secondary pages and shared primitives. CSS is split by purpose. There is no Tailwind requirement or animation library.

## Destinations, plans and contact

`site.links.app` replaces local review destinations when configured. An empty value opens the included workspace. Plan checkout URLs are configured separately for monthly and annual billing. An empty paid checkout sends the plan button to the studio enquiry, with the plan noted. Solo opens the local example; Collective keeps custom pricing in both billing periods.

Studio is shown at $32 monthly or $312 annually, equivalent to $26 per month and $72 annual savings. Allowances use projects and studio members. These are example product plans, not account limits enforced by the demo. Update the matching FAQ when changing pricing.

The contact form validates details, prepares a review and downloads a JSON enquiry locally. Configure `site.links.contactEndpoint` to submit JSON via POST. Your service must handle validation, delivery, rate limits and required CORS configuration. A failed request preserves the enquiry. Keep credentials on the server.

## Working review process

- Search twelve original reviews across four projects; combine decision, format and discipline filters. CSV exports contain the visible rows and their edited responses.
- Read a client’s feedback beside the full project brief. Edit the studio response and record approval or request changes with a named owner and a specific reason.
- Export a review as JSON with its current decision, edited response, revision request and full linked brief.
- Search the separate brief library by project, direction or deliverable. Selection follows the filtered results.
- Review project counts, approval share, pending reviews and a decision ledger. Review ages are fictional dataset values; local decisions update counts.
- Reset through a confirmation dialog. Decisions and history remain in memory and reset on reload.
- Explore studio stories, original articles, connection scope guides, pricing and policy placeholders.

The demo does not upload files, invite clients, send notifications, authenticate users or collect payments. Connect storage, permissions, file previews, notifications and billing for your production product. Replace fictional stories and policy placeholders before launch.

## Motion and accessibility

Headings and tiles reveal on scroll. Desktop product chapters stack; phones and reduced-motion views use normal flow. Botanical backdrops and product tiles respond subtly to hover. Product tabs support arrows, Home and End. Native dialogs trap focus, close on Escape and return focus. FAQ uses native disclosures.

System reduced motion disables decorative movement and stacking. Hidden menus have no keyboard stops; the phone menu restores trigger focus on Escape. Compact marketing scenes link to the readable review workspace.

## Verification and export

```sh
npm run typecheck
npm run verify:content
npm run build
```

The content verifier checks billing, project metrics, combined filters, immutable decisions, revision validation, CSV escaping, brief references, article routes and assets.

Export URLs retain query strings and anchors. For your own deployment, use the normal build or configure static export for your host. Exclude `.next`, `out`, `node_modules` and local environment files from the source package.

All seven generated images ship locally; prompts and provenance are in `ASSETS.md`. Font licenses come from their upstream Google Fonts packages. Template usage terms are in `LICENSE.md`.
