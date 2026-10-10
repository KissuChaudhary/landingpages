# Daymark

A complete growth and retention studio website built with Next.js 15, React 19 and plain CSS. The project is self-contained. It includes a landing page, three campaign concepts, a work directory, a journal with three articles, a contact page, editable policies and a missing-page state.

## Run

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js. To deploy a normal Next.js site:

```sh
npm run build
npm start
```

## Make it yours

| Change | File |
| --- | --- |
| Name, metadata, contact details and destinations | `site.config.ts` |
| Hero, services, principles, process, plans and FAQs | `site.config.ts` |
| Campaign content, images and journey moments | `data/campaigns.ts` |
| Journal content | `data/journal.ts` |
| Homepage section order | `app/page.tsx` |
| Palette, shared spacing and typography | `styles/base.css` |
| Hero and campaign gallery | `styles/home.css` |
| Services, studio and process | `styles/approach.css` |
| Engagements, journal, FAQ and footer | `styles/chapters.css` |
| Contact form fields and submission | `components/contact/` |
| Font, metadata and shared styles | `app/layout.tsx` |
| Asset provenance and prompts | `ASSETS.md` |

Replace the fictional Daymark brand, campaign concepts, articles and indicative fees with your own content. Campaigns are explicitly labelled as concepts; do not present them as past client work. Set your email address and copyright year. Update the policy pages to describe your actual business and services.

All photography and the Figtree variable font ship locally. No paid media service, animation library, remote font request or image hosting account is required.

## Contact flow

Set `site.email` to the address that should receive enquiries. With `site.links.contactEndpoint` empty, the form validates the visitor's details and prepares a complete email draft. The visitor then chooses to open their email application or download a text copy. The website does not claim that an email has been sent.

For direct submission, set `site.links.contactEndpoint` to a form service or your own API accepting a JSON POST. The payload contains `name`, `email`, `company`, `service`, `engagement`, `budget`, `message` and a complete plain-text `text` field. A successful 2xx response displays confirmation. Other responses and a 15-second timeout preserve the visitor's details and provide an email fallback. The endpoint must allow requests from your site's origin. Keep secrets on your server, never in this client-side configuration.

A service or engagement link preselects the corresponding form field. Keep service names and plan IDs consistent when changing the content.

Optional `booking`, `linkedin` and `instagram` destinations are hidden when empty. A booking URL becomes the closing call to action and appears on the contact page.

## Motion and accessibility

The first hero heading rises into view, lower sections reveal once, campaign images move gently on hover, service panels transition together, and process nodes move to the stage the visitor selects. The customer-journey marker and closing rings are the only ambient loops. Offscreen elements and hidden tabs stop ambient loops. Device reduced-motion preferences disable animation and smooth scrolling.

The challenge tabs support Left/Right, Home and End keys. The process controls are ordinary buttons. FAQs use native disclosures. Mobile navigation supports Escape and keyboard focus. Content stays readable without JavaScript; the form provides an email fallback.

## Static hosting

For static hosting, set `NEXT_PUBLIC_STATIC_EXPORT=1` before building. With the default build directory, Next.js writes the export to `out/`. Set `NEXT_PUBLIC_BASE_PATH` only when deploying under a subdirectory, and set `NEXT_PUBLIC_STATIC_EXPORT=1` at build time so internal links resolve to HTML files.

For example, in PowerShell:

```powershell
$env:NEXT_PUBLIC_STATIC_EXPORT = "1"
npm run build
```

Upload the contents of `out/`. Configure your host to serve `index.html` and use `404.html` for missing routes. For a normal Next.js deployment, leave these environment variables unset.

## Checks

```sh
npm run typecheck
npm run verify:content
npm run build
```

The content check verifies campaign and article IDs, local assets, linked service concepts and brief encoding. Review the page at desktop and mobile sizes after replacing imagery or changing long headlines.

See `LICENSE.md` for the included template licence and `public/fonts/OFL.txt` for the font licence.
