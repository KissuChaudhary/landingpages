# Tandem

A complete light-mode landing page for an AI agent platform. White and cool grey, electric blue, generous typography, a live point sculpture, and thirteen original product illustrations.

## Run

Use Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js. For production:

```sh
npm run typecheck
npm run verify:content
npm run build
npm start
```

## Make it yours

All visible copy, agent details, navigation links, plans, questions, and destinations are in `site.config.ts`. The brand and product are fictional demonstration content. Replace the sample positioning, features, prices, and integration claims with your actual product before launch.

The page composition lives in `app/page.tsx`. Each section has its own component under `components/sections/`; styling is split across focused files in `styles/`. The palette is in `styles/base.css`. Fonts are configured in `app/layout.tsx`.

The sculpture is procedural canvas artwork in `components/motion/AgentSculpture.tsx`. It responds to the cursor, respects reduced motion, and rests when off screen or the browser tab is hidden. It needs no 3D library. Adjust point density, knot proportions, and rotation there.

## Connect your destinations

- `signup.url`: your sign-up page. A validated email is added as the `email` query parameter.
- `signup.endpoint`: an endpoint accepting `POST` with JSON `{ "email": "person@example.com" }`. Any successful HTTP response shows `signup.success`; a failed response permits retry. Configure CORS when your endpoint is on another origin.
- If neither is set, the email form guides visitors to pricing; it does not pretend to save their email.
- Each pricing plan has `checkout.monthly` and `checkout.yearly`. Blank links open an email to `contact`, with the selected plan and period in the subject.
- Update `contact` and the footer email link together.

Accounts, payments, agent execution, and tool integrations belong to your product. The product illustrations show the intended experience; they are not functioning dashboards.

## Product illustrations

Replace images in `public/images/` at the same proportions. Local asset URLs pass through `lib/assets.ts` so they work under a configured base path.

| Assets | Dimensions |
| --- | --- |
| `workspace.webp` | 1400 × 810 |
| Six `agent-*.webp` illustrations | 720 × 520 |
| Three `step-*.webp` illustrations | 1000 × 780 |
| Three `team-*.webp` illustrations | 960 × 780 |

Run `npm run verify:content` after swapping assets.

## Motion components

The included Hairline UI Number Roll, Text Morph, Pricing Toggle, and FAQ Accordion live in `components/hairline/`. They use React, CSS, and Web Animations without an animation library. Number Roll is used for stats and the carousel counter; Text Morph for workflow labels and form states; Pricing Toggle for billing; FAQ Accordion for the questions.

The site respects `prefers-reduced-motion`. All content remains readable when JavaScript is unavailable. Agent cards support touch scrolling and arrow keys; workflow steps and team tabs support their directional keys; the mobile menu closes with Escape.

## Deploy

Deploy as a standard Next.js site. To export static HTML, set `TANDEM_EXPORT=1` when running `npm run build`; output is written to `out/`. If hosted under a path, set `NEXT_PUBLIC_BASE_PATH` to that path at build time. Google Fonts are downloaded during the build and served from your own site thereafter.

See `LICENSE.md` for commercial use terms and `ASSETS.md` for asset provenance.
