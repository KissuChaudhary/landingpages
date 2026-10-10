# Daymark design notes

Internal design record. This file is excluded from the buyer package.

Reference studied: https://overtake-wbs.framer.website/ . Live desktop inspection covered the hero, manifesto/services, service-image transitions and results sections. The page content and lower section hierarchy were also inspected through the page snapshot.

Retained the reference's confident sans typography, clean white/green contrast, generous rounded campaign surfaces and restrained directional interaction. No reference image, brand mark, client name, metric, testimonial or copy was reused.

Changed the positioning to an independent growth and retention studio. The new identity uses a slotted geometric mark, Figtree, forest green, lime, lilac and coral. Original product artwork gives the campaign concepts a coherent physical material language.

## Different structure

Overtake opens with a centered headline in a gray frame, paired performance cards, proof logos, then a dark manifesto with vertical service tabs, metric bento cards and project tiles.

Daymark opens with left-aligned typography and a tall product photograph on the right. A customer-journey annotation makes the retention positioning visible. A staggered campaign gallery comes directly after the hero: two offset cards and a third horizontal case. There is no client-proof strip or invented performance metric.

The service chapter starts with customer questions in a horizontal tab rail; the panel coordinates the discipline, outputs, original campaign crop and a next-step link. The white studio statement and principle rows come later. The forest process chapter uses a connected SVG journey and user-selected stages, rather than a reference-style three-step image stack.

Two scoped engagements, three equal editorial notes and a split FAQ lead to a lime closing chapter with a native ring study. The footer is a compact resource grid. Supporting routes give every portfolio and journal link a complete destination. Contact stays inline, without promotional or fabricated product modals.

## Motion

No animation library. CSS handles the heading entrance, once-only section reveals, hover affordances and coordinated panel transitions. Intersection observers manage reveals and ambient-loop visibility. Only the journey marker and closing rings repeat; both honor a shared remembered pause control, hidden tabs and reduced motion.

Native SVG process circles change radius and fill when a stage is selected. Service and process copy animate as coherent groups. Layout becomes normal single-column flow on small screens.
