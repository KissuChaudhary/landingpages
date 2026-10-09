# Arclo

A complete landing page for a month-end close product for finance teams. Manrope typography, an ink-to-petrol grain field with a champagne light, glowing controls, fine frame rails and five original product illustrations. Includes entity-based pricing with comparison, a walkthrough request form, an early-access page, a journal with three complete articles, privacy/terms placeholders and a custom missing-page state.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

`npm run build` creates the production app. `npm start` serves it. `npm run typecheck` checks the standalone source. `npm run verify:content` verifies the matching tolerance, variance thresholds, approval routing, billing, routes, articles and assets.

## Make it yours

- Start in `site.config.ts`: brand, metadata, main copy, plans, FAQ, email and destinations.
- Set `links.app` to open your product from every main action. An empty value opens the working local close explorer.
- Give each plan its own `monthlyHref` and `annualHref`. Empty values send the plan button to the contact page. Growth is $149 monthly or $1,428 annually; Group is $399 monthly or $3,828 annually.
- `lib/billing.ts` formats fractional equivalents and calculates the yearly savings label from your configured prices.
- Set `links.contactEndpoint` and `links.waitlistEndpoint` to submit forms. Both receive JSON `{ name, email, team, message, intent }` (`team` holds the company). Return a successful HTTP status only after accepting the submission. Use same-origin endpoints or configure CORS. Errors preserve all fields.
- Without an endpoint, forms prepare a local brief that can be edited, saved as text or opened in an email draft. They do not claim a message was sent or a live waitlist registration occurred.
- Replace the sample rows in `data/workflows.ts`: bank lines with their ledger amounts, trial-balance accounts with last month’s balances, and journal entries. Matching responds to the tolerance control; variances and approval routes derive from the rows and the written limits. Connect your ledger, bank feeds, authentication and posting in your own application.
- Replace the fictional finance stories in `data/stories.ts` with your customer evidence. Photography depicts fictional people and is included as illustrative demo imagery. Replace it in `public/images/team.webp`; portrait crops use CSS and the same image.
- Edit journal content in `data/articles.ts`. Replace `app/[slug]/page.tsx` policy placeholders with your business’s actual policies before launch.
- Shared palette, type and spacing live in `styles/base.css`. Styles are divided by composition. Fonts live in `app/layout.tsx`; section order in `app/page.tsx`.

## Working interactions

Three keyboard-accessible close steps: match bank lines, explain variances and route approvals. A finite four-step local run with source rows, a live log, a configurable dollar tolerance, matched and exception lines, clipboard output and a JSON record. “Source and rules” opens the rows and the tolerance control in place, and every “Run a sample close” button scrolls to the canvas and opens them. Nothing is posted to a ledger and no one is contacted.

Monthly/yearly pricing with each plan linking to its checkout. Four keyboard-accessible onboarding steps. Two illustrative reconciliation views. An editable variance note with a tighten action; its explore button opens the variance step. Team story controls. Native FAQ and navigation disclosures. Mobile navigation. No popups: every button is a link or works in place. Motion preference remembers only its on/off value in local storage; system reduced motion is respected.

## Project map

```text
app/                     Routes, font, metadata and CSS imports
components/sections/     Independent homepage chapters and footer
components/product/      Close canvas and editable illustrations
components/ui/           Brand, frame, button and portrait
data/                    Sample close rows, fictional stories and articles
lib/                     Routes and local download helper
styles/                  Focused native CSS files
site.config.ts           White-label brand, plans and destinations
public/images/           Original optimized team photograph
```

## Catalog export

Inside the Hairline UI repository, `npm run export:demo` builds with `/demos/arclo` as the base path and copies only this project’s output into `public/demos/arclo`. Stop this template’s dev server before exporting because both use `.next`. Other projects use separate build directories.

For your own static deployment, set `output: 'export'` in `next.config.ts`. If you use the built-in base-path convention, the route helper targets `.html` files. Adapt it to your host for static export at the domain root. Forms need a separate endpoint.

See `DESIGN.md`, `ASSETS.md`, `QA.md` and `LICENSE.md` for design, image provenance, verification and usage.
