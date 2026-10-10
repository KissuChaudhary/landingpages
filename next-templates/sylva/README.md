# Sylva

A complete botanical interior studio website for plant stylists, boutique nurseries and greenery services. Deep forest green, pale lichen accents, Instrument Serif headings, DM Sans and eight original images give it a considered editorial identity.

## Run

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production uses `npm run build` and `npm start`. The first build downloads the Google fonts; Next.js serves them locally afterward. No API keys are needed to run the included site.

## Make it yours

Start in `site.config.ts`. Brand, copy, imagery, FAQ, booking and contact destinations are centralized there. Plant and space content have their own small files.

| Change | File |
| --- | --- |
| Brand, metadata, section copy, FAQ and destinations | `site.config.ts` |
| Plants, botanical names, images, light, size and care notes | `data/plants.ts` |
| Home, workplace and hospitality descriptions and scopes | `data/spaces.ts` |
| Palette, display scale, gutters and shared controls | `styles/base.css` |
| Page composition | `app/page.tsx` |
| Scroll choreography and reveal timing | `components/Motion.tsx`, `styles/motion.css` |
| Original imagery and prompts | `public/images/`, `ASSETS.md` |

Landing sections, shared primitives and secondary-page components are separate files. Styling is split by navigation, hero, collection, process/care, gallery/FAQ, closing/footer, general pages, plant pages and contact. There is no animation-library or Tailwind dependency.

Keep headline lines short and of similar length when changing hero copy. Preserve the cutout images' transparent backgrounds. Adjust the hero journey alongside its image dimensions when replacing the specimen.

## Useful routes

- `/`: the complete landing page.
- `/collection`: plants with combined light and size filters, live result count and reset/empty state.
- `/plants/monstera`, `/plants/kentia-palm`, `/plants/rubber-plant`: plant detail and care pages.
- `/spaces/at-home`, `/spaces/at-work`, `/spaces/together`: three space scopes.
- `/about` and `/care`: approach and practical care library.
- `/contact`: project enquiry with a review and real downloadable brief.
- `/privacy`: an accurate description of the default template's handling, to replace with your own notice.

Adding plants or spaces automatically adds their static routes through `generateStaticParams`. Keep slugs unique and use the existing light and size labels, or update the collection filter options to match new values.

## Booking, contact and downloads

Set `site.links.booking` to your booking link. An empty value opens `/contact`. Optional email and Instagram links appear only when configured.

The enquiry validates required name, email, message and contact permission, carries a selected plant or space through URL parameters, and shows an inline review. Editing keeps every field. Its default action saves a plain-text project brief containing all entered details. It does not pretend to send an enquiry or create an account. No form data is persisted on a server by the default template.

To receive enquiries, set `site.links.contactEndpoint` to a public endpoint. The form sends a JSON POST with:

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "space": "At home",
  "light": "Bright indirect light",
  "plant": "Monstera deliciosa",
  "message": "A bright reading corner…",
  "consent": true
}
```

The endpoint must return a successful 2xx response only when it accepts the enquiry. Handle server validation, spam prevention, delivery, rate limits and CORS in your own service. Requests time out after 15 seconds; errors keep the brief and offer retry or download. Keep secrets on the server. Set an email to additionally offer an explicit hand-off to the visitor's email app. Update the privacy page to describe your chosen service and data handling.

There is no cart, simulated checkout, fake booking confirmation or mock product popup. Plant enquiries confirm availability and planter choices with the buyer's studio. Add your own commerce links if selling directly.

## Motion and accessibility

The desktop hero plant travels into the approach chapter. Collection cards unfold as the visitor scrolls, and a care specimen grows gently into place. The scroll handler is passive and schedules a single animation-frame update; offscreen headings reveal once. Hover effects are restrained.

Phones use normal vertical flow, with all cards readable. The system reduced-motion setting and the remembered footer pause control disable decorative motion and the sticky fan sequence. Content is visible if JavaScript is unavailable. Keyboard focus expands the collection deck immediately so every plant link remains reachable.

Navigation has an accessible phone menu that closes on Escape and restores trigger focus. Native process and FAQ disclosures work with keyboard input. The enquiry moves focus to its inline review, announces results, and uses standard labeled controls.

## Verify and deploy

```sh
npm run typecheck
npm run verify:content
npm run build
```

The content verifier checks unique plant/space routes, care completeness, all image paths, every brief field, base-path links with queries/anchors, and source-file size.

Deploy the normal Next.js build to a compatible host. For static hosting, build with `SYLVA_EXPORT=1` and deploy the `out` directory. Set `NEXT_PUBLIC_BASE_PATH` when hosting below a URL prefix. All generated assets are served locally. Keep environment secrets on your server.

## Before publishing

Replace fictional brand and service content, confirm your plant-care advice, connect your booking or enquiry service, and replace the privacy notice. Generated interior photography is illustrative; use your actual work when presenting client projects. No fabricated testimonials, sales statistics or environmental claims are included.

Image prompts and provenance are in `ASSETS.md`. Commercial usage terms are in `LICENSE.md`.
