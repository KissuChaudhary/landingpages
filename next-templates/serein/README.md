# Serein® Studio

A complete website for an independent brand and digital studio. Oversized Manrope typography, a softly moving silk backdrop, stacked project imagery and considered dark-to-light chapters introduce your work. Three case studies, a project directory, a journal and a contact page are included.

## Start

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open the local address printed in your terminal. For a production build:

```bash
npm run typecheck
npm run verify:content
npm run build
npm start
```

## Make it yours

| Change | File |
| --- | --- |
| Brand, email, metadata, location, copy, services, process, plans and FAQ | `site.config.ts` |
| Projects, images, descriptions, case studies and deliverables | `data/projects.ts` |
| Journal stories and article content | `data/journal.ts` |
| Section order | `app/page.tsx` |
| Font | `app/layout.tsx` |
| Shared palette, spacing, buttons and typography | `styles/base.css` |
| Hero layout and reel | `styles/hero.css` and `components/sections/HeroReel.tsx` |
| Individual sections | `components/sections/` and their matching files in `styles/` |
| Contact form and submission | `components/ContactForm.tsx` and `lib/contact.ts` |
| Policies | `app/privacy/page.tsx` and `app/terms/page.tsx` |

There is no CMS account or paid plugin to configure. Content is typed data, and all imagery ships locally. Add a project to `data/projects.ts` and its case study route is generated at build time. Add a journal entry the same way. Rebuild after editing content.

## Connect your contact flow

Set `site.email` to your own address. With no endpoint configured, the contact form prepares a correctly addressed email draft with every form field included. The visitor opens the draft in their email app and sends it themselves. A plain-text brief can also be downloaded. Preparing a draft never reports that an enquiry has been sent.

For direct submission, set `site.links.contactEndpoint` to your form service or API. The form sends a JSON POST containing `name`, `email`, `company`, `service`, `engagement`, `budget`, `message` and a plain-text `text` version. A successful HTTP response displays the confirmation; a failed or timed-out request preserves the visitor's details and offers email as a fallback. Your endpoint must accept the request from your site's origin and handle validation, abuse protection and delivery. Keep secret keys on the server.

Set `site.links.booking` to your scheduler URL to send the primary conversation links directly to booking. Leave it empty to use the included contact page. Optional Instagram and LinkedIn links appear only when you provide a URL.

The service and pricing links pass the selected service or engagement to the contact page, where it is preselected in the form.

## Motion and accessibility

The silk study uses a small WebGL displacement shader at a capped pixel density and frame rate. Its render loop stops with system reduced motion, outside the viewport or in a hidden tab. If WebGL is unavailable or its context is lost, the local image remains visible. There is no background video download.

System reduced-motion preferences are respected, and phones use a normal project flow instead of the desktop stack. Content remains readable without JavaScript. Menus and service panels expose their open state, closed navigation is inert, Escape closes the menu, native FAQ disclosures support the keyboard, and a skip link reaches the main content.

## Images

The included original images are in `public/images/`. Their descriptions and creation prompts are in `ASSETS.md`. Replace project imagery with your own and update the matching alt text in `data/projects.ts`. Keep local paths beginning with `/images/`; the URL helper handles a deployment subpath.

## Deploy

Deploy as a normal Next.js application using `npm run build`, then `npm start`, or your hosting provider's Next.js integration. `NEXT_PUBLIC_BASE_PATH` is optional and must be set during the build if the site lives under a subpath.

For a static host, set `NEXT_PUBLIC_STATIC_EXPORT=1` before `npm run build` and upload the resulting `out/` folder. If using a subpath, set `NEXT_PUBLIC_BASE_PATH` at the same time. Internal links automatically use the exported `.html` files. Static hosting requires an external contact endpoint or the included email flow.

## Before launch

Replace the fictional studio, brands, case studies, dates, fees and original journal copy as needed. Set your contact and booking destinations, update your policies to reflect the services you use, and run the content verification after changing local images or content. The included privacy page describes the default local preference and enquiry behavior; tailor it if you add analytics, cookies or other services.
