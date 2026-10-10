# Bounce design direction

Design system reference: a bright, playful, course-marketing system with white space, Geist typography, a centred pill nav, a centred hero title with floating metric chips and a fanned row of tilted portrait cards, six colour-lit portrait cards with text overlays, platform icons with notification badges, a cloud of icon pills, an instructor photo card plus a story card with follower counts and logos, three saturated module cards (purple, orange, red) with lesson lists, a big statement with floating chips over a video card, scattered rotated testimonial cards, eight blue "included" tiles, tilted bonus cards, three saturated price cards, a centred FAQ and a grey closing panel with fanned photos. Motion is mostly blur-and-fade entrances and fanning cards.

The owner asked for a full white label: keep the bright, playful, colourful vibe and quality, but change the subject, content, layouts and section hierarchy so it doesn't read as a clone, and beat the reference wherever possible.

Bounce keeps the vibe (white space, vivid colour-lit portraits, bold colour blocks, floating chips, rounded friendly UI) and changes everything else:
- Subject: a six-week music production cohort, not creator growth. The catalog had no course template; video is already covered by Cutroom and Influence.
- Type: Bricolage Grotesque display, Figtree body, Geist Mono for small technical labels. Six named colours (pink, violet, blue, lime, cyan, amber) carry weeks, pads, stories and plans.
- Hero: asymmetric, left copy with a live cohort status, right a playable 16-step beat pad (Web Audio synthesis, presets, tempo, keyboard support) instead of a centred title over fanned photos. The headline's full stop is a ball that bounces in.
- Statement: a pinned, scroll-driven sentence that fills word by word while loose project files are pulled into one finished master. This replaces the platform-icons and pill-cloud sections.
- Outcomes: a draggable horizontal rail with progress, not a 3×2 grid.
- Curriculum: a song arrangement. Each week is a lane whose clip starts that week and runs to the end, so the track builds layer by layer. On desktop it pins and a scroll-driven playhead records the clips; on phones, week tabs. This replaces three module cards.
- Teacher: a portrait with rolling stat chips and a "selected credits" list.
- Platform: a rendered course screen (feedback pinned to a waveform) that straightens on scroll, instead of a video card.
- Stories: a masonry wall with per-student waveforms and results, not scattered rotated cards.
- Included: a typographic spec list with rolling numbers, not eight tiles.
- Pricing: a tier selector beside one card that reshapes (colour, price, instalments, seats meter, features) instead of three coloured cards.
- FAQ: split, with a "still deciding" card from the teacher.
- Closing: a violet panel with a fitted, letter-by-letter bouncing wordmark and a real countdown to the cohort start.

Photos: GPT Image 2.5 on fal at low quality, 7 generations in total; avatars cropped from one grid. The platform screens were rendered from HTML (`work/bounce-shots/render.cjs`), so no coded app mockups run on the page.

Integration: standalone Next.js project in `next-templates/bounce`. `npm run export:demo` builds the static demo into `public/demos/bounce`; the catalog entry is `src/data/template-catalog/bounce.ts` and the iframe wrapper is `src/templates/bounce`. Regenerate photos with `node work/bounce-assets.cjs` and screens with `node work/bounce-shots/render.cjs`.
