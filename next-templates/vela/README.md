# Vela

A considered landing page for CRM, customer success and relationship-led team products. A bright coral hero opens into a working example dashboard, three stacking product chapters and a clear path through setup, connections, stories, plans and questions.

## Run

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production:

```bash
npm run typecheck
npm run verify:content
npm run build
npm run start
```

Next.js 15, React 19, TypeScript and Lucide. Styling is plain CSS. All visuals are editable React, SVG and CSS; no image service, animation library, API key or database is needed. The first build fetches Manrope from Google Fonts; Next.js then hosts those files with your site.

## Customize

| Change | File |
| --- | --- |
| Brand, metadata, navigation, section copy, pricing, questions and destinations | `site.config.ts` |
| Revenue series, accounts and example follow-ups | `data/preview.ts` |
| Color palette, typography and shared controls | `styles/base.css` |
| Font | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Interface details | `components/product/` |
| Brand mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| Contact behavior | `components/ContactForm.tsx` |

Each section is its own component. CSS is separated by purpose. Remove or reorder sections in `app/page.tsx`; the shared shell provides navigation, footer and motion settings.

### Product destinations

Set `links.app` to your signup or application URL. Primary actions otherwise open the product section. Set `links.booking` to your scheduling URL; without it, walkthrough actions open the contact page.

Set each plan’s `checkout.monthly` and `checkout.annual` to its checkout URLs. Empty links open the contact page with the chosen plan and billing selected. Annual prices are monthly equivalents; the page shows yearly payment and exact savings. Replace `pricing.currency` and the dollar prefixes in product scenes when using another currency. Set `url` to your canonical origin for social metadata.

### Contact delivery

The form uses these destinations in priority order:

1. `links.contactEndpoint`: POSTs JSON with `name`, `email`, `company`, `teamSize`, `message`, `plan`, `billing` and `price`. Your endpoint should validate inputs, apply rate limits and return a successful status only after accepting the request. Configure CORS for a different origin. A stalled request aborts after 15 seconds; failures preserve the form.
2. `links.email`: opens a mail draft containing the request. The user reviews and sends it in their mail app.
3. Neither configured: downloads a plain-text request to the visitor’s device, explicitly stating that nothing was sent.

There is no pretend booking, fabricated submission or payment interface. Accounts, authentication, CRM connections, billing and delivery are provided by your product and services.

### Motion and accessibility

Scroll reveals, dashboard tilt, stacking chapters, hover labels, changing numbers and the connection pulse respect reduced-motion preferences. Stacking returns to normal flow below 900px. There is no scroll hijacking or automatically changing product tab.

Controls have accessible names. Setup tabs support arrows, Home and End. FAQ uses native disclosures. Mobile navigation closes with Escape and returns focus to its toggle. A skip link, visible focus indicators and assistive text for animated figures are included.

## Deploy

Deploy on a compatible Next.js host. For a static host, set `VELA_EXPORT=1` for the build and publish `out/`. For a subdirectory, set `NEXT_PUBLIC_BASE_PATH` at build time. Neither variable is needed for normal Next.js deployment.

Before launching, replace the fictional product, teams, quotes, figures, plans and connection lineup with your own supported content. Configure signup, checkout and contact destinations. No real customer data or third-party account connection is included. See ASSETS.md for provenance and LICENSE.md for commercial terms.
