import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const sylvaTemplate: TemplateItem = {
  slug: "sylva", title: "Sylva: Botanical Interior Studio", category: "Landing Pages", defaultTheme: "dark", badge: "Botanical & Interiors",
  description: "A deep forest-green botanical studio with a travelling Monstera, unfolding plant cards, organic nursery photography and a considered interior gallery. Original imagery, real plant-care pages and a practical project enquiry make it ready to adapt.",
  tags: ["Botanical Studio", "Interiors", "Scroll Motion", "Original Imagery", "Next.js 15"],
  features: [
    "Original plant cutouts, interior photography and Instrument Serif typography",
    "Scroll-led specimen journey, unfolding collection and organic photo frames",
    "Filterable plants, individual care pages and three space-specific routes",
    "Reviewed project briefs, real downloads and an optional contact endpoint",
  ],
  accentColor: "from-lime-200 to-emerald-800", previewUrl: "/preview/sylva", standaloneUrl: "/demos/sylva/index.html", demoUrl: "/demo/sylva", detailUrl: "/template/sylva", thumbnailUrl: "/previews/card/sylva.webp",
};
export const sylvaDetails: TemplateDetails = {
  name: "Sylva", kind: "Botanical interior studio landing page template",
  summary: "An atmospheric, motion-led website for plant stylists, interior greenery studios and boutique nurseries. Original positioning and imagery pair thoughtful plant selection with an honest, usable enquiry flow.",
  bestFor: ["Botanical interior and plant styling studios", "Boutique nurseries and curated plant businesses", "Greenery services for homes, offices and hospitality"],
  design: "Deep forest green, pale lichen accents, Instrument Serif display type and DM Sans. A large, original Monstera travels from an interior-led hero into an organic nursery panel. Three cards unfold on scroll; a three-step approach, an orbiting care specimen, an asymmetric interior gallery and a generous closing lead to an oversized wordmark.",
  sections: [
    { name: "Hero and approach", detail: "A living interior backdrop, sculptural plant cutout and scroll-led specimen journey introduce the studio. An organic nursery panel links to the full approach." },
    { name: "The collection", detail: "Three plant cards spread from a deck into a browsable row. A separate collection combines light and size filters, with a useful empty state." },
    { name: "Plant detail pages", detail: "Each plant has its own character, light and scale guidance, three care notes and an enquiry link that carries the chosen plant into the form." },
    { name: "Approach and care", detail: "Native process disclosures, a central specimen with four care principles, an about page and a plant-care library." },
    { name: "Spaces", detail: "Original home, workspace and café images in an asymmetric gallery. Dedicated space pages carry the selected context into the enquiry." },
    { name: "FAQ, closing and footer", detail: "Five native FAQ disclosures, a considered closing, a large wordmark." },
    { name: "Project enquiries", detail: "Validated details, inline review, editable briefs, matching plain-text downloads and an optional JSON POST endpoint with retained input on failure. An email hand-off appears when configured." },
  ],
  customizeIntro: "Start in site.config.ts for brand, copy, imagery, links and contact delivery. Plant and space content each live in a focused data file.",
  customize: [
    { what: "Brand, metadata, copy, booking and contact destinations", where: "site.config.ts" },
    { what: "Plant selection, imagery, light, scale and care notes", where: "data/plants.ts" },
    { what: "Space types, images and project scopes", where: "data/spaces.ts" },
    { what: "Palette, type and gutters", where: "styles/base.css" },
    { what: "Motion timing and scroll choreography", where: "components/Motion.tsx and styles/motion.css" },
    { what: "Local imagery and original prompts", where: "public/images/ and ASSETS.md" },
  ],
  fonts: ["Instrument Serif", "DM Sans"], dependencies: ["next", "react", "react-dom", "lucide-react"], styling: "CSS",
  images: "Eight original images generated with the built-in imagegen tool: three transparent plant cutouts and five interior/nursery photographs. Optimized WebP files ship locally; prompt provenance is included.",
  node: "20.9", files: 64, lines: 4625,
  beforeLaunch: "Replace fictional studio branding, service descriptions and generated portfolio images as appropriate. Add your booking link, email or contact endpoint, and replace the included privacy notice. The template saves project briefs locally by default; it does not claim to send enquiries, sell plants or collect payments without your configured service.",
  updated: "2026-10-09",
};
