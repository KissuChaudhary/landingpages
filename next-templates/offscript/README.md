# Offscript

A complete creative studio website in paper, ink, acid yellow and lilac. An expanding photographic contact sheet, a numbered studio index, three campaign stories, a working-wall process and two notebook articles give the site its own character.

## Run

Use Node.js 20.9 or newer. Run `npm install`, then `npm run dev` and open `http://localhost:3000`. For production, run `npm run build` and `npm start`, or deploy to a Next.js-compatible host.

## Make it yours

| Edit | File |
| --- | --- |
| Brand, URL, metadata, copy, navigation, fees and FAQs | `site.config.ts` |
| Email, booking destination and optional social links | `site.config.ts → links` |
| Campaign names, stories, images and slugs | `data/projects.ts` |
| Notebook titles, articles and slugs | `data/notes.ts` |
| Colors, type and spacing | `styles/base.css` |
| Page order | `app/page.tsx` |
| Composition and interactions | Focused files in `components/` and `styles/` |
| Photographs and local font | `public/images/` and `public/fonts/` |

Contact actions use your booking destination or a `mailto:` link with a relevant subject. Replace `hello@example.com` before launch. Empty social URLs hide their links. There is no submission service to configure.

The hero shows three selected campaigns. Mouse exploration, keyboard focus and tap select a frame. Edit `components/ContactSheet.tsx` when changing that selection. Every gallery card opens a full story. Keep project and article slugs unique, lowercase and hyphenated; new entries generate pages on the next build.

The process uses stage buttons and a native range input, supporting arrow keys, Home and End. Its artwork is an illustrative SIDEQUEST study; edit `components/ProcessCanvas.tsx` to use your own creative world. The index closes on selection, outside click or Escape; Escape returns focus to its trigger. FAQs are native disclosures.

## Motion and assets

Manrope and four original WebP photographs are hosted locally. Native CSS and browser APIs handle finite entrances, once-only reveals, expanding frames, traced pencil marks, hover details and physical process-wall transitions. There are no animation Play/Pause buttons. System reduced motion removes transitions while preserving all interactions. Content is readable without JavaScript. See `ASSETS.md` and `public/fonts/OFL.txt` for provenance and licenses.

## Checks

```bash
npm run verify:content
npm run typecheck
npm run build
```

## Before launch

Offscript, GOODSIDE, SUNDAYS and SIDEQUEST are fictional. Their campaigns are self-initiated studies, not client work or performance claims. Replace the brand, stories, images, fees and articles with your own business material. Set `url`, your email and booking destination. The studio image is illustrative; replace it before identifying its subjects as your staff.

Describe production expenses, usage rights and service terms accurately. Keep the portrait and landscape image proportions. Review mobile layouts after editing long headlines, project names or fees.
