# Tessera

A complete Next.js landing page for an independent AI systems studio. A kinetic isometric sculpture, block reveals and connected workflow diagrams introduce a considered approach to automation. The studio, offers and system studies are fictional example content.

## Run

Use Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. For a production server:

```bash
npm run verify:content
npm run typecheck
npm run build
npm start
```

## Make it yours

| Change | File |
| --- | --- |
| Brand, metadata, email, booking destination and form endpoint | `site.config.ts` |
| Headlines, capabilities, process, plans, FAQ and footer | `site.config.ts` |
| System studies, scopes, workflow nodes and story pages | `data/systems.ts` |
| Journal notes and article pages | `data/notes.ts` |
| Section order | `app/page.tsx` |
| Palette, spacing and base type | `styles/base.css` |
| Hero and sculpture presentation | `styles/hero.css`, `components/art/Sculpture.tsx` |
| Motion timing | `styles/motion.css` |
| Contact form fields and integration | `components/ContactForm.tsx` |
| Legal copy | `components/PolicyPage.tsx` |

Each page section has its own component. Styles are split by purpose. Fonts and the favicon are bundled in `public/`; no font service, image service or animation library is required.

The three example studies each have a full page under `/systems/[slug]`. The two notes have article pages under `/journal/[slug]`. Adding entries to the data files creates additional pages at build time. Change the homepage card layout if you substantially change the number of entries.

## Links and inquiries

All primary calls to action use `site.links.booking`. It defaults to `/contact`; replace it with your scheduling destination if you prefer. Offer links add an `engagement` query that the contact form reads into its selector.

The contact form has two explicit modes:

- **Email draft:** leave `links.contactEndpoint` empty. The validated form prepares a mailto link with the visitor’s brief. The visitor opens their email app and sends it. The page never claims an email was sent.
- **Direct submission:** set an HTTPS endpoint you control. It must accept JSON with `name`, `email`, `company`, `engagement` and `message`, and return a successful HTTP response only after accepting the inquiry. Allow your site’s origin through CORS. Add validation, abuse protection and delivery in your form service. Keep service secrets on the server. The page shows a retry message for errors and timeouts.

Replace `site.email` in both modes. No contact service is preconnected. The starter includes no newsletter signup, account creation or simulated marketing popup.

## Motion and accessibility

The sculpture’s tiles move on CSS timelines. Text reveals run once as each line enters the viewport. Scroll progress gently moves the sculpture, process symbol and footer wordmark. Capability tabs support Up/Down, Home and End; the FAQ uses buttons with expanded states. Offer prices roll digit by digit, and the engagement selector moves as one surface.

System reduced motion disables these animations and keeps all content visible, including when the preference changes while the page is open. There is no global motion control. With JavaScript unavailable, the page copy, project links, article links and contact email remain readable; the interactive tabs, form submission and mobile menu require JavaScript.

## Deploy

Deploy as a standard Next.js application using `npm run build`. Set `site.url` to the final absolute origin for metadata.

For a static host, set `TESSERA_EXPORT=1` while building, then publish `out/`. On PowerShell:

```powershell
$env:TESSERA_EXPORT = '1'
npm run build
```

Set `NEXT_PUBLIC_BASE_PATH` only if your site lives under a subdirectory. The link helpers account for explicit HTML files on static subdirectory hosts. Fonts and the favicon use the same prefix. Direct form submission still requires a separate form service.

## Before launch

Replace the fictional studio identity, `.example` email, example URL, prices, capabilities and project stories. Replace or remove the clearly identified example study note. Review the privacy and terms starter copy for your actual business and integrations. Set the booking destination or form endpoint, and test the complete inquiry flow with your delivery service.

See `ASSETS.md` for font and illustration provenance and `LICENSE.md` for commercial use terms.
