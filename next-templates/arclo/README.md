# Arclo

A complete white-label AI automation landing page. Manrope typography, a violet-to-coral grain gradient, glowing controls, fine frame rails and five original product illustrations. Includes pricing with comparison, contact, waitlist, journal and three complete articles, privacy/terms placeholders and a custom missing-page state.

## Run

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

`npm run build` creates the production app. `npm start` serves it. `npm run typecheck` checks the standalone source. `npm run verify:content` verifies meaningful workflow outcomes, billing, routes, articles and assets.

## Make it yours

- Start in `site.config.ts`: brand, metadata, main copy, plans, FAQ, email and destinations.
- Set `links.app` to open your product from every main action. An empty value opens the working local workflow explorer.
- Give each plan its own `monthlyHref` and `annualHref`. Empty values open an accurate plan review showing the complete charge. Pro is $19 monthly or $180 annually; Business is $49 monthly or $468 annually.
- `lib/billing.ts` formats fractional equivalents and calculates the yearly savings label from your configured prices.
- Set `links.contactEndpoint` and `links.waitlistEndpoint` to submit forms. Both receive JSON `{ name, email, team, message, intent }`. Return a successful HTTP status only after accepting the submission. Use same-origin endpoints or configure CORS. Errors preserve all fields.
- Without an endpoint, forms prepare a local brief that can be edited, saved as text or opened in an email draft. They do not claim a message was sent or a live waitlist registration occurred.
- Replace the sample source records in `data/workflows.ts`. Lead results respond to the minimum team-size control; digest and onboarding outputs derive from their sample records. Connect your live AI, authentication, source providers, permissions and delivery actions in your own application.
- Replace fictional team stories in `data/stories.ts` with your customer evidence. Photography depicts fictional people and is included as illustrative demo imagery. Replace it in `public/images/team.webp`; portrait crops use CSS and the same image.
- Edit journal content in `data/articles.ts`. Replace `app/[slug]/page.tsx` policy placeholders with your business’s actual policies before launch.
- Shared palette, type and spacing live in `styles/base.css`. Styles are divided by composition. Fonts live in `app/layout.tsx`; section order in `app/page.tsx`.

## Working interactions

Three keyboard-accessible workflow choices. A finite four-step local execution with source records, live logs, a configurable lead threshold, empty results, clipboard output and a JSON receipt. Separate instance state lets you explore the hero and dialog independently. No account connections or message delivery are implied.

Monthly/yearly pricing and accurate plan reviews. Four keyboard-accessible onboarding views. Two illustrative chart periods. Editable idea field and a refine action; its explore button opens the prepared onboarding example. Team story controls. Native FAQ and navigation disclosures. Mobile navigation, Escape-aware dialogs with focus restoration and scroll locking. Motion preference remembers only its on/off value in local storage; system reduced motion is respected.

## Project map

```text
app/                     Routes, font, metadata and CSS imports
components/sections/     Independent homepage chapters and footer
components/product/      Workflow canvas and editable illustrations
components/ui/           Brand, frame, button, portrait and dialog
data/                    Source records, fictional stories and articles
lib/                     Routes and local download helper
styles/                  Focused native CSS files
site.config.ts           White-label brand, plans and destinations
public/images/           Original optimized team photograph
```

## Catalog export

Inside the Hairline UI repository, `npm run export:demo` builds with `/demos/arclo` as the base path and copies only this project’s output into `public/demos/arclo`. Stop this template’s dev server before exporting because both use `.next`. Other projects use separate build directories.

For your own static deployment, set `output: 'export'` in `next.config.ts`. If you use the built-in base-path convention, the route helper targets `.html` files. Adapt it to your host for static export at the domain root. Forms need a separate endpoint.

See `DESIGN.md`, `ASSETS.md`, `QA.md` and `LICENSE.md` for design, image provenance, verification and usage.
