import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const oddlineTemplate: TemplateItem = {
  slug: "oddline",
  title: "Oddline: Social Creative Studio",
  category: "Landing Pages",
  defaultTheme: "dark",
  badge: "Creative & Social",
  description:
    "An independent creative studio with oversized Space Grotesk type, charcoal texture and chartreuse accents. An original campaign collage leads into an asymmetric work gallery, a scrolling studio statement, three capabilities and two ways to collaborate.",
  tags: [
    "Creative Studio",
    "Social Agency",
    "Editorial Collage",
    "Scroll Motion",
    "Next.js 15",
  ],
  features: [
    "Original creator and campaign imagery with a layered photographic hero",
    "Work-first hierarchy, unequal gallery cards and an editorial studio statement",
    "Keyboard-accessible capabilities and engagement tabs, plus native FAQs",
    "Simple configurable email, booking and optional project links",
  ],
  accentColor: "from-lime-300 to-lime-900",
  previewUrl: "/preview/oddline",
  standaloneUrl: "/demos/oddline/index.html",
  demoUrl: "/demo/oddline",
  detailUrl: "/template/oddline",
  thumbnailUrl: "/previews/card/oddline.webp",
};
export const oddlineDetails: TemplateDetails = {
  name: "Oddline",
  kind: "Social creative studio landing page template",
  summary:
    "A distinctive single-page website for independent creative studios and social agencies. Charcoal, pale chartreuse, bold typography and original photographic campaigns create a confident identity with a focused landing-page scope.",
  bestFor: [
    "Social-first creative studios",
    "Independent content and brand agencies",
    "Campaign production and art-direction teams",
  ],
  design:
    "A left-aligned oversized promise sits beside an uneven creator-and-product collage. A large cobalt campaign card anchors the work gallery, with two smaller stories alongside it. An editorial studio statement and a chartreuse studio note lead into in-place capability views, a slim process rail, two engagement options, FAQs and a solid chartreuse closing. Space Grotesk and Inter bring a sharp typographic rhythm.",
  sections: [
    {
      name: "Hero and navigation",
      detail:
        "Original layered photography, scroll depth, a confident two-line heading, restrained sticky navigation and a keyboard-accessible phone menu.",
    },
    {
      name: "Selected directions",
      detail:
        "Three explicitly labeled concept campaigns in an unequal two-column gallery. Optional project URLs turn the relevant card into a normal link.",
    },
    {
      name: "The studio",
      detail:
        "A progressive-colour manifesto, tilted chartreuse note and three practical studio principles.",
    },
    {
      name: "Capabilities",
      detail:
        "Three keyboard-accessible views with original editable SVG drawings, descriptions and discipline tags.",
    },
    {
      name: "Process",
      detail:
        "A three-step vertical rail with scroll progress, a sticky desktop introduction and normal phone flow.",
    },
    {
      name: "Engagements",
      detail:
        "Two in-page ways to work together, including scope, example fees and direct email or booking CTAs.",
    },
    {
      name: "FAQ, closing and footer",
      detail:
        "Five native disclosures, a generous chartreuse CTA, an oversized wordmark and optional social destinations.",
    },
  ],
  customizeIntro:
    "Edit site.config.ts for the identity, content, imagery, pricing and every destination. Each landing section and stylesheet is separate.",
  customize: [
    {
      what: "Brand, content, campaigns, prices and CTA destinations",
      where: "site.config.ts",
    },
    { what: "Palette, type, gutters and buttons", where: "styles/base.css" },
    {
      what: "Page hierarchy and composition",
      where: "app/page.tsx and components/sections/",
    },
    {
      what: "Identity mark and service illustrations",
      where: "components/ui.tsx and components/ServiceArt.tsx",
    },
    {
      what: "Scroll depth and reveal behaviour",
      where: "components/Motion.tsx and styles/motion.css",
    },
    {
      what: "Original imagery and prompts",
      where: "public/images/ and ASSETS.md",
    },
  ],
  fonts: ["Space Grotesk", "Inter"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Four original generated photographs: one creator portrait and three campaign stills. Optimized WebP assets ship locally, with prompt provenance included.",
  node: "20.9",
  files: 32,
  lines: 3383,
  beforeLaunch:
    "Replace the fictional brand, example fees, concept campaigns and email address. Set a booking URL or keep an ordinary email CTA, and add your own project URLs if needed. There is no form submission, enquiry builder, download flow or application backend.",
  updated: "2026-10-10",
};
