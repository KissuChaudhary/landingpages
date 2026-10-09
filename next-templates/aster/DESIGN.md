# Aster design decisions

The Solva reference informed the composition: a spacious split hero, botanical product backdrops, open chapter headings, stacked feature panels, horizontal use-case tabs, three plans and a compact footer. Aster has original branding, copy, paintings, portraits, marks and React interfaces. No reference-site assets are included.

## Typography

Newsreader 400 carries the main headlines and wide product chapters. Onest 400/500/600 carries body text, navigation and controls. Desktop display sizes are 56px for the hero, 48px for section headings and 40px for wide product chapter titles. The phone hero is 46px and main section headings are 40px, with smaller-screen adjustments at 360px. Reading copy stays 16–18px. The compact illustrations deliberately use smaller interface labels; the linked workspace provides the full readable version.

Use short sentences and purposeful line breaks. One understated text label introduces each main heading. The announcement and recommended pricing tier are the only additional marketing markers. Avoid surrounding product scenes with extra captions or adding cards around the open section copy.

## Composition

The navigation is a 76px open row with a fine bottom rule; phones use 68px. There is no floating navigation pill or decorative page grid. Controls are compact rounded rectangles with a consistent 44px action height.

The hero places copy beside a 522px botanical panel and a deliberately cropped inbox. Three illustrated feature tiles follow an open fictional-team strip. The wide product chapters use one scene and one copy block each. Desktop panels stack under the navigation; the static and reduced-motion reading order remains complete.

Tabs coordinate their heading, details and scene. On phones, the tab rail scrolls horizontally rather than compressing labels into tiny text. The trust chapter changes the full-width surface; subsequent pricing and story sections return to paper. The closing revisits the inbox so the final action has a clear destination.

## Surfaces and imagery

Warm ivory and ink dominate. Quiet sage, powder blue and soft botanical color give the product UI room. White interface surfaces over paintings suggest depth through a restrained translucent rim and shadow. Other section content stays open. Original team marks and portraits are fictional examples.

All seven images are local WebP files. Paintings retain their square composition and are cropped with CSS. Portraits preserve their original aspect ratio and use the upper face region in small avatars. Image provenance and exact generation prompts are in `ASSETS.md`.

## Motion

Headings reveal with a short vertical movement and opacity change. Hero lines add a brief blur-to-clear entrance. Hover moves a tile's product scene four pixels and gently enlarges its painting. Tabs transition their replacement scene once. Sticky stacking is limited to desktop. Nothing relies on an endless ambient animation.

The system motion preference and footer pause control both disable decorative movement. A paused page displays every section and returns panels to normal document flow. Content is visible if client JavaScript never initializes.

## Product integrity

Marketing scenes and the initial workspace read the same fictional ticket dataset. Resolution counts, median time and satisfaction ratings are calculated from that data. A local handoff records the owner, reason and edited draft. Approved sources remain readable and exportable. The frontend clearly distinguishes local reviews from real messages or provider connections.
