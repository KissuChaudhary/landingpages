# Tempo

A sophisticated light launch page for mobile apps and everyday consumer tools. Tempo is a fictional focus/routine app; the design also adapts to journals, habit trackers, reading apps and personal planners.

## Run

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production:

```bash
npm run typecheck
npm run build
npm run start
```

Next.js 15, React 19, TypeScript, Tailwind CSS 4 and Lucide. All product visuals are editable HTML/CSS/SVG. No backend, API key, image generation, database or animation library is needed. The first build fetches Google Fonts; Next.js then self-hosts the font files. PostCSS is overridden to its patched 8.5 release.

## Customize

| Change                                                                                           | File                                            |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Brand, metadata, main headline, chapter content, routines, stories, prices, FAQ and destinations | `site.config.ts`                                |
| App screen replacements                                                                          | `site.config.ts` → `screens`                    |
| Palette and common typography                                                                    | `styles/base.css`                               |
| Fonts                                                                                            | `app/layout.tsx`                                |
| Section order                                                                                    | `app/page.tsx`                                  |
| Section headlines and supporting microcopy                                                       | Corresponding `components/sections/` file       |
| App interface and its microcopy                                                                  | `components/app/`                               |
| Original logo shape                                                                              | `components/ui/Brand.tsx` and `public/icon.svg` |

Each section and each app screen is a separate component. Styles are grouped by responsibility. Remove or reorder a section by changing its line in `app/page.tsx`. Interactive components require the `TempoProvider` wrapper.

### Use your own app screenshots

Add images under `public/screens/`, then configure only the screens you want to replace:

```ts
screens: {
  plan: { src: "/screens/plan.webp", alt: "Your app's daily plan" },
  focus: { src: "/screens/focus.webp", alt: "Your app's focus session" },
}
```

Unspecified screens keep their coded demo UI. Local paths respect the export base path. Screens fit inside the phone's content area; edit `Phone.tsx` if your screenshot includes its own full device chrome.

### Connect your product

Set `links.ios`, `links.android` and optionally `links.app`. A web app URL makes primary CTAs navigate directly there. Otherwise they lead to the download links in the closing section, where a missing link is marked "Soon".

Give each plan a `href` to connect its checkout. Without one, the free plan points to the download links and paid plans start an email to `links.email`. Payment processing, app-store distribution, accounts and cloud sync are integrations for your product; they are not supplied by this template.

The timer uses an absolute deadline and updates from current time, so delayed browser intervals do not introduce drift. It runs only on the mounted page, and resets on reload. Routine changes are current-page state. Reflections are explicitly saved locally under `tempo-example-reflection-v1`; storage errors are caught. The clear button removes that saved note. Week numbers are labeled example data, not recorded activity.

Replace the fictional brand, stories, sample membership features, prices, routine and FAQ before using the page for your real product. Change `links.email` from the placeholder. The commercial license is in LICENSE.md.

## Motion components

Prices roll like an odometer and labels morph letter by letter instead of jumping. That's Number roll and Text morph,
two free components from the Hairline UI library, kept in `components/hairline/` and used here in membership pricing.
They need only React and Tailwind; Number roll's two keyframes sit at the end of `app/globals.css`. Use them for
anything else that changes:

```tsx
<NumberRoll value={total} prefix="$" />
<TextMorph>{saved ? "Saved" : "Save"}</TextMorph>
```

## Static demo

For a standalone static host, build with `TEMPO_EXPORT=1`. Set `NEXT_PUBLIC_BASE_PATH` at build time when hosting under a subdirectory. Normal Next.js deployment uses neither variable.

See ASSETS.md for visual provenance and licenses.
