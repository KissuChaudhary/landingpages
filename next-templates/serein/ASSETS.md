# Assets

All four images are original studies created using OpenAI image generation for this template. They depict fictional brands and are provided as sample portfolio material. Final local files use WebP; no remote image service is required at runtime.

| File | Image | Dimensions |
| --- | --- | --- |
| `public/images/vela.webp` | Brushed silver audio hardware on a pale blue sculptural plinth | 1536 × 1024 |
| `public/images/aevum.webp` | Olive-glass fragrance bottle in warm afternoon light | 1536 × 1024 |
| `public/images/forma.webp` | Curved concrete architecture and an olive tree | 1536 × 1024 |
| `public/images/silk.webp` | Translucent charcoal silk on a black field | 1536 × 1024 |

## Creation prompts

### Vela

Use case: product-mockup. Create an exquisite editorial brand campaign photograph for a fictional premium audio brand called VELA, for an independent design studio portfolio. Wide 3:2 landscape image. A single sculptural silver brushed aluminum over-ear headphone, with soft charcoal earpads, gracefully suspended in the center of a pale ice-blue studio background. Very precise industrial design, generous empty space, subtle sculptural pedestal below, perfectly composed asymmetrical reflections, refined luxury tech advertising, soft daylight and crisp material texture. Tiny word VELA engraved on one cup if possible; otherwise no typography. No webpage, no interface, no frame, no watermark. This should look like a sophisticated art-directed campaign from a top branding studio, a hero product photo, restrained, authentic, tactile.

### Aevum

Use case: product-mockup. Wide 3:2 landscape luxury fragrance campaign for a fictional perfume brand AEVUM. A gorgeous translucent deep olive-green thick glass perfume bottle and a second small glass cap arranged on a dark moss stone slab, against a muted warm olive background. Dramatic shaft of late-afternoon sunlight from upper left, interesting long shadows, refined minimal editorial still life, subtle water caustics and tactile glass details. Bottle centered slightly right; generous space. Small ivory minimal label reading AEVUM. Natural dark olive, golden light, immaculate art direction, premium fashion fragrance advertising. No webpage, no interface, no watermark, no extraneous objects. Architectural and quietly extraordinary.

### Forma

Use case: photorealistic-natural. Wide 3:2 landscape editorial architecture photograph for a fictional architecture practice FORMA. Brutalist cylindrical poured-concrete building with a striking curved stair and sculptural circular cutout in the facade, shot close enough to be abstract and graphic. Pale terracotta sandy courtyard, single small tree casting a beautiful sharp shadow, warm cream and pale gray materials, washed blue sky. Premium architecture editorial art direction, subtle analog film grain, immaculate geometry, late afternoon sunlight, quiet emptiness. Strong composition with architectural form filling most of the frame. No people, no webpage, no interface, no text, no watermark. Exceptional realistic tactile material detail.

### Silk

Use case: stylized-concept. Asset type: full-width abstract motion backdrop for a refined monochrome creative studio website. Wide cinematic 3:2 landscape composition, exact solid nearly black (#090909) background. One impossibly fine translucent charcoal-gray silk ribbon sweeping gracefully from the left edge, falling into an organic twisting loose S curve across the lower middle, rising and folding elegantly toward the right. Soft silver-lit edges, real gauzy fabric, subtle overlapping transparent layers, thin luminous folds, smoky airy material, delicate but clearly visible sculptural form. Smooth exquisite CGI cloth simulation, high-end editorial art direction. Upper half mainly empty black negative space for text; ribbon occupies lower two thirds and extends off both horizontal edges. Refined, quiet, fluid and dimensional, not a flat gray band. No text, no logo, no dots, no particles, no bright white areas, no watermark, no frame.

## Typography and code graphics

Manrope's Latin variable font is bundled in `public/fonts/Manrope-latin.woff2` and loaded through Next.js's local font integration. Builds do not need to contact a font service. The upstream font is maintained at https://github.com/google/fonts/tree/main/ofl/manrope and uses the SIL Open Font License, included in `public/fonts/OFL.txt`. Replace or extend the bundled font when adding other writing systems. The wordmarks, favicon, process icons, orbit study and all interface controls are original CSS, SVG or React elements and can be edited directly. The ribbon shader is in `lib/ribbon-shaders.ts`; replace the backdrop through `site.visuals.silk`.
