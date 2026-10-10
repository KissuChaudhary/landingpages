import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const goodfolkTemplate: TemplateItem = {
  slug: "goodfolk",
  title: "Goodfolk: Social & Creator Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Creator & Social",
  description:
    "A confident creator studio website with original campaign photography, oversized Manrope typography, a collage hero, a dark manifesto, and an asymmetric gallery. Native scroll motion, complete campaign stories, and clear engagement rows give it a distinct personality.",
  tags: [
    "Social Agency",
    "Creator Studio",
    "Original Imagery",
    "Native Motion",
    "Next.js 15",
  ],
  features: [
    "Expressive collage hero, original imagery, and locally hosted Manrope",
    "Staggered campaign gallery with three complete supporting stories",
    "Keyboard-accessible creative process, two engagement rows, and native FAQs",
    "Two notebook articles and straightforward editable contact links",
  ],
  accentColor: "from-lime-300 to-violet-300",
  previewUrl: "/preview/goodfolk",
  standaloneUrl: "/demos/goodfolk/index.html",
  demoUrl: "/demo/goodfolk",
  detailUrl: "/template/goodfolk",
  thumbnailUrl: "/previews/card/goodfolk.webp",
};
export const goodfolkDetails: TemplateDetails = {
  name: "Goodfolk",
  kind: "Social and creator studio landing page template",
  summary:
    "A complete independent studio website for brands with a point of view. A photographic collage, expressive typography, and deliberate motion introduce social strategy, creator partnerships, and content production.",
  bestFor: [
    "Social and creator agencies",
    "Independent creative studios",
    "Content production and consumer brand consultancies",
  ],
  design:
    "Near-white and charcoal, with lime and lilac accents. An asymmetric photographic collage leads into a dark studio manifesto, a staggered campaign gallery, illustrated process tabs, horizontal engagement rows, editorial studio imagery, notebook stories, and a large typographic closing.",
  sections: [
    {
      name: "Navigation and collage hero",
      detail:
        "Original creator portraits, finite typography entrance, bounded scroll drift, configurable contact link, and accessible mobile navigation.",
    },
    {
      name: "Studio manifesto and capabilities",
      detail:
        "A dark editorial section combines scroll-filled typography with three clear creative disciplines.",
    },
    {
      name: "Selected collaborations",
      detail:
        "A staggered gallery with three campaign concepts, each opening a full story with challenge, idea, deliverables, and next-project navigation.",
    },
    {
      name: "Creative process",
      detail:
        "Three illustrated native tabs with arrow-key, Home, and End navigation and distinct editable creative compositions.",
    },
    {
      name: "Engagements",
      detail:
        "Two horizontal rows with starting fees, scope, and direct contact links.",
    },
    {
      name: "Studio, notebook, and FAQs",
      detail:
        "Original documentary studio imagery, two complete editorial articles, and native question disclosures.",
    },
    {
      name: "Closing and footer",
      detail:
        "Oversized typography, editable availability, inbox, optional social and legal destinations, and a large brand signature.",
    },
  ],
  customizeIntro:
    "Start with site.config.ts. Campaigns, articles, capabilities, process stages, and fees live in focused data files.",
  customize: [
    {
      what: "Brand, copy, navigation, CTA destinations, metadata, and FAQs",
      where: "site.config.ts",
    },
    {
      what: "Campaign stories, imagery, deliverables, and generated routes",
      where: "data/projects.ts",
    },
    {
      what: "Capabilities, process stages, and engagement fees",
      where: "data/studio.ts",
    },
    { what: "Notebook articles and generated routes", where: "data/notes.ts" },
    {
      what: "Section order and focused components",
      where: "app/page.tsx and components/home/",
    },
    { what: "Palette, layout, and motion", where: "styles/" },
    {
      what: "Bundled photography and font provenance",
      where: "public/ and ASSETS.md",
    },
  ],
  fonts: ["Manrope"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Three original AI-generated campaign and studio photographs, bundled as optimized WebP. Creative process and notebook artwork are editable CSS, SVG, and React. The font is hosted locally with its license.",
  node: "20.9",
  files: 51,
  lines: 4353,
  beforeLaunch:
    "Replace the fictional brand, campaign concepts, example fees, and imagery with your own. Set your inbox, contact link, canonical domain, and any optional social or legal destinations. CTAs are ordinary links; no backend is required.",
  updated: "2026-10-10",
};
