# Rivet

A complete design and engineering studio website. Monochrome architectural imagery, acid-green accents, precise technical framing, expressive typography, and considered motion. Includes four portfolio pages, a studio page, three field notes, an inquiry page, privacy holding page, and a custom missing-page state.

## Start

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open the URL printed in your terminal. `npm run build` creates your production website; `npm start` serves it. Run `npm run typecheck` and `npm run verify:content` after customizing.

## Make it yours

Start with `site.config.ts`. Set your studio name, descriptor, location, metadata, headline, copy, navigation, FAQ, and footer. The highlighted hero word must appear in `hero.lineTwo`. Set `url` to your canonical origin, such as `https://yourstudio.com`.

Set `links.booking` to your scheduling URL. When empty, the main actions open the included inquiry page. Set `email` to your public inbox to show an email link in the footer and enable the prepared brief's email-draft action. Social links are rendered only when configured.

Replace the illustrative projects in `data/projects.ts` with your own evidence. Each entry generates its portfolio card, case-study route, metadata, scope, narrative, and next-project navigation. The four included artwork compositions are editable DOM/CSS in `components/art/ProjectArt.tsx` and `styles/project-art.css`. To use photography instead, render your image in that component and keep the existing card wrapper.

Services, process, engagement prices, deliverables, and timelines live in `data/services.ts`. Prices are descriptive starting fees; no checkout or payment is implied. Engagement actions preselect their corresponding option on the inquiry page. Edit studio principles in `app/about/page.tsx` and field notes in `data/articles.ts`. The portfolio names, project narratives, people in the imagery, and engagements are fictional examples. Replace them before presenting the site as your own business.

## Connect inquiries

With `links.contactEndpoint` empty, the form validates the fields and prepares a plain-text brief on the visitor's device. The visitor can download it, revise it, or open an email draft if `email` is configured. It never reports that an inquiry was sent.

Set `links.contactEndpoint` to your HTTPS endpoint or a same-origin route such as `/api/inquiry`. The form sends JSON:

```json
{
  "name": "Alex Morgan",
  "email": "alex@company.com",
  "company": "Company",
  "engagement": "Make it real.",
  "budget": "£15,000—£30,000",
  "message": "Our project context..."
}
```

Return a successful HTTP status only when your server accepts the inquiry. Errors preserve all fields and provide a downloadable copy. Configure CORS for cross-origin endpoints. Validate server-side, rate-limit submissions, and add your own spam protection and delivery service. The included honeypot is a small client-side precaution, not a complete defense. The template doesn't include a server or send email by itself.

Publish your own reviewed privacy notice in `app/privacy/page.tsx` before accepting live inquiries. No analytics or tracking service is installed. The motion preference stores only `on`/`off` in local storage.

## Structure

```text
app/                     Routes, metadata, fonts, and stylesheet imports
components/sections/     Focused homepage chapters
components/art/          Editable project and capability compositions
components/ui/           Shared actions, label, mark, and arrows
components/              Navigation, motion provider, and inquiry form
data/                    Portfolio, articles, services, process, and engagements
lib/                     Route and asset helpers; plain-text downloads
styles/                  Styles divided by composition
site.config.ts           Brand, primary copy, and destinations
public/images/           Optimized original architectural and studio imagery
```

## Motion and accessibility

Motion uses native CSS, one IntersectionObserver, and one passive scroll listener with requestAnimationFrame. Text enters once, images drift gently, and project details react to hover and keyboard focus. The full-screen navigation supports Escape, focus containment, scroll locking, and an inert background. Services and FAQ use native disclosures. The footer motion switch remembers the visitor's choice; a system reduced-motion preference always takes priority. There are no animation-library dependencies or endlessly looping decorations.

## Deploy

Deploy as a standard Next.js app on your preferred Next.js host. All imagery and Latin-subset fonts ship locally. `next/font/local` serves the included Geist files without a build-time or runtime font request. Replace the fonts or add language subsets in `app/layout.tsx` when adapting the site to another script.

For static hosting, set `output: "export"` in `next.config.ts` and build with `NEXT_PUBLIC_STATIC_EXPORT=1`. The route helper then generates `.html` paths. Set `NEXT_PUBLIC_BASE_PATH` when deploying in a subdirectory. On Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_STATIC_EXPORT = "1"
npm run build
```

Upload the generated `out/` folder. Static hosting requires an external inquiry endpoint; local brief downloads work without one. Remove the `RIVET_EXPORT` conditional if you prefer a permanent static setting.

See `ASSETS.md` for provenance and `LICENSE.md` for usage rights.
