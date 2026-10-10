# Template release — 10 October 2026

This release adds Daymark, Goodfolk, Oddline, Rivet, Serein, Sylva and Vela. The catalog now contains 28 completed products. Bounce, Encore, Offscript and Turnout remain in development and are excluded.

## Purchase and preview readiness

- Every catalog product has a detail record and an explicit checkout configuration slot in `src/data/pricing.ts`.
- The seven new products have catalog cards, hover previews, desktop and mobile detail screenshots, social artwork, standalone demos and preview registrations.
- Browser checks covered every new detail page, mobile demo selection and the return from demo to its matching purchase page. Catalog-to-detail navigation and desktop-to-mobile screenshot switching also passed. No console errors were observed.
- A configured hosted checkout URL renders an active purchase link. An empty URL remains explicitly disabled. The page, mobile purchase bar and all-access plan use the shared checkout configuration.
- The provider must supply actual checkout URLs and paid file delivery. No payment, receipt or fulfillment transaction was performed during verification.

## Buyer packages

Freshly extracted ZIPs for all seven new products passed `npm ci`, `npm run typecheck` and `npm run build`. Each includes its standalone application, editable content configuration, lockfile, setup instructions, commercial license and asset provenance. Internal design notes, QA logs and repository export helpers are excluded.

Oddline now bundles Space Grotesk and Inter with their upstream font licenses. Its build no longer depends on Google Fonts responses. Sylva's buyer README now documents customer deployment without internal export references.

| Product / SKU | Delivery archive | Demo HTML pages | Checked local page and asset references |
| --- | --- | ---: | ---: |
| Daymark / `hairline-daymark` | `hairline-daymark.zip` | 13 | 337 |
| Goodfolk / `hairline-goodfolk` | `hairline-goodfolk.zip` | 7 | 169 |
| Oddline / `hairline-oddline` | `hairline-oddline.zip` | 2 | 27 |
| Rivet / `hairline-rivet` | `hairline-rivet.zip` | 13 | 391 |
| Serein / `hairline-serein` | `hairline-serein.zip` | 13 | 467 |
| Sylva / `hairline-sylva` | `hairline-sylva.zip` | 13 | 432 |
| Vela / `hairline-vela` | `hairline-vela.zip` | 3 | 91 |

The integration typecheck and catalog production build passed. In total, 64 exported HTML pages and 1,914 local references were checked for the seven new products.

## Payment-provider handoff

Run `node scripts/package-template.mjs --all` after committing. Archives are written to the ignored `dist/templates/` directory. Attach each archive to its corresponding provider product and paste that product's hosted URL into `TEMPLATE_CHECKOUT`. Configure `ALL_ACCESS_CHECKOUT` and attach all completed archives to that product. Future releases require updating that product's delivery files.

The release audit also writes `dist/templates/release-manifest.json`, recording the seven new SKUs, prices, filenames and SHA-256 checksums. Files and the manifest remain local for upload to the payment provider; source archives are not exposed as public unauthenticated downloads.
