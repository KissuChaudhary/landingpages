# Relay

A landing-page template for personal assistants, browser companions and everyday AI tools. Open navigation contracts on scroll. A conversation hero leads into a continuous rail system with illustrated feature cells, a working assistant interface, example library, pricing and FAQ.

DM Sans carries the entire page. Five shared type roles, aligned columns and generous spacing keep the hierarchy consistent. The default is cloud white, ink and cobalt; the alternate ink appearance covers every section and control. There are no third-party photos or illustration assets to replace.

## Run

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm start
```

Next.js 15, React 19, TypeScript and Tailwind CSS v4. The page uses ordinary CSS split into purpose-specific stylesheets. Next/font downloads and self-hosts DM Sans during the build, so the build needs access to Google Fonts.

## Make it yours

| Change | File |
| --- | --- |
| Brand, metadata, copy, navigation, context labels, plans, FAQ and destinations | `site.config.ts` |
| Default appearance and browser storage keys | `site.config.ts` → `appearance`, `savedKey` |
| Prepared requests, summaries, result text and context-dependent behavior | `data/scenarios.ts` |
| Cloud and ink palettes, spacing, five type roles | `styles/base.css` |
| Font and metadata rendering | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Assistant state, replay, saved IDs and clipboard | `lib/useAssistant.ts` |
| Rendered workspace and example studies | `components/product/` |
| Section-specific UI wording | `components/sections/` |
| SVG mark and browser icon | `components/ui/Brand.tsx`, `public/icon.svg` |

Start by replacing the fictional product, prices, claims and example material. Set `links.app` for your real application, optional `links.docs`, and `links.email`. Each plan has independent `href.monthly` and `href.yearly` destinations. Prices are USD; `annual` is the whole year's total, and the monthly equivalent and saving are calculated from it.

An empty plan destination opens an accurate local billing preview. It does not create accounts or collect payments. An empty application destination focuses the example workspace. Free-form requests remain in the current page and receive an explicit explanation; the preview does not invent an AI response.

## Working examples

The three scenarios prepare a weekly plan, compare note-taking approaches, and draft a project update. Their output changes according to the selected notes, calendar and reading context. After changing context, explicitly prepare the example again. A finite two-stage replay supports pause, resume and reset; reduced motion skips straight to the result.

Copy and Download export the currently displayed document. Save stores only a scenario ID in this browser's local storage. It does not save customized source selections or output. The Saved library can remove those IDs; there is no account, cloud sync, live AI, web search, calendar connection or publishing service.

Tabs support arrows, Home and End. Native FAQ disclosures support keyboard interaction. Nothing opens in a popup: plan buttons go to your checkout links, and until they are set the free plan opens the workspace and paid plans start an email to your team. Appearance and saved IDs persist when browser storage is available.

## Use a product screenshot

Place your image in `public/images/`, then set:

```ts
workspace: {
  // Keep the other workspace fields.
  screenshot: { src: "/images/your-assistant.webp", alt: "Your assistant's workspace" },
}
```

This replaces the local request, context and document interface with your image. Set `links.app` to show a real application action beside the workspace heading. Root-relative image paths automatically respect the demo's base path; absolute image URLs also work. Replace the workspace note to describe your actual product.

## Project structure

`app/page.tsx` composes independent sections. `components/RelayProvider.tsx` coordinates the workspace and plan buttons. `components/product/` holds the workspace pieces and code-native feature art; `components/ui/` holds the shared GridSection primitive and mark. `data/` and `lib/` separate content and state from rendering. `styles/` separates shared tokens, hero, workspace, features, and lower sections.

## Motion components

Prices roll like an odometer and labels morph letter by letter instead of jumping. That's Number roll and Text morph,
two free components from the Hairline UI library, kept in `components/hairline/` and used here in pricing. They need
only React and Tailwind; Number roll's two keyframes sit at the end of `app/globals.css`. Use them for anything else
that changes:

```tsx
<NumberRoll value={total} prefix="$" />
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

See `ASSETS.md` for provenance and `LICENSE.md` for the commercial license.
