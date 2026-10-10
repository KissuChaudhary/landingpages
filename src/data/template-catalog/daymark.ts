import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const daymarkTemplate: TemplateItem = {
  slug: "daymark",
  title: "Daymark: Growth & Retention Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Growth Agency & Motion",
  description:
    "An independent growth studio with original campaign photography, large Figtree typography and a connected customer journey. An asymmetric hero and staggered portfolio lead into interactive challenge panels, a forest process chapter and complete editorial and contact pages.",
  tags: [
    "Growth Agency",
    "Commerce",
    "Interactive Services",
    "Original Imagery",
    "Next.js 15",
  ],
  features: [
    "Asymmetric hero with original product photography and a controllable customer-journey loop",
    "A staggered campaign gallery and three complete concept case studies",
    "Keyboard-accessible challenge panels, a connected SVG process and scoped engagement cards",
    "Complete journal routes, editable policies and a configurable contact flow with email drafts and brief downloads",
  ],
  accentColor: "from-lime-300 to-green-900",
  previewUrl: "/preview/daymark",
  standaloneUrl: "/demos/daymark/index.html",
  demoUrl: "/demo/daymark",
  detailUrl: "/template/daymark",
  thumbnailUrl: "/previews/card/daymark.webp",
};

export const daymarkDetails: TemplateDetails = {
  name: "Daymark",
  kind: "Growth and retention studio landing page template",
  summary:
    "A complete studio website for commerce, growth and lifecycle agencies. Original campaign photography, clear editorial typography and a customer-journey story connect an asymmetric introduction to thoughtful services, working process and useful next steps.",
  bestFor: [
    "Growth and performance agencies",
    "Commerce and retention consultancies",
    "Independent creative and strategy studios",
  ],
  design:
    "Locally hosted Figtree, white and pale gray, forest green, bright lime, lilac and coral. A left-aligned hero pairs large three-line type with a tall product photograph and a journey annotation. A staggered portfolio, horizontal challenge tabs, white studio principles and a dark process chapter create distinct page rhythms before engagement cards, studio notes, FAQs and a lime closing section.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "A sticky white header, accessible mobile navigation, rising headline, original Sola product artwork and a controllable customer-journey marker.",
    },
    {
      name: "Campaign gallery",
      detail:
        "Two offset campaign cards and a third horizontal concept give the work an editorial hierarchy. Each opens a full case study.",
    },
    {
      name: "Connected approach",
      detail:
        "Four keyboard-accessible business challenges coordinate the service headline, deliverables, image, journey annotation and preselected contact destination.",
    },
    {
      name: "Studio and process",
      detail:
        "An asymmetric studio statement with three principles, followed by a forest-green process chapter with selectable stages and native SVG nodes.",
    },
    {
      name: "Engagements and journal",
      detail:
        "Two scoped ways to work together and three original studio notes, each with a complete readable article.",
    },
    {
      name: "FAQ and closing",
      detail:
        "Native disclosures, a large lime call to action, a slow ring study and a compact resource footer.",
    },
    {
      name: "Case studies",
      detail:
        "Three campaign-concept routes with original photography, opportunities, creative direction, scope, journey moments and linked next projects.",
    },
    {
      name: "Contact and supporting routes",
      detail:
        "Validated briefs with configured JSON POST or complete email drafts and downloads. Editable policy pages and a missing-page state.",
    },
  ],
  customizeIntro:
    "Brand, copy and destinations start in site.config.ts. Campaigns and journal notes live in two small typed data files; sections and their styles stay separate.",
  customize: [
    {
      what: "Brand, copy, services, process, plans and destinations",
      where: "site.config.ts",
    },
    {
      what: "Campaign photography, concepts and journey moments",
      where: "data/campaigns.ts and public/images/",
    },
    { what: "Journal articles", where: "data/journal.ts" },
    {
      what: "Palette, shared typography and spacing",
      where: "styles/base.css",
    },
    {
      what: "Section order and metadata",
      where: "app/page.tsx and app/layout.tsx",
    },
    {
      what: "Contact fields, submission and email briefs",
      where: "components/contact/ and lib/contact.ts",
    },
    {
      what: "Motion and original asset prompts",
      where: "components/Motion.tsx and ASSETS.md",
    },
  ],
  fonts: ["Figtree"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Three original AI-generated campaign concepts: lime skincare on steel against lilac, coffee pouches with a turquoise cup, and running shoes on a silver cube. Optimized WebP assets ship locally; the brand mark, editorial graphics and process diagrams are native SVG and CSS.",
  node: "20.9",
  files: 58,
  lines: 4769,
  beforeLaunch:
    "Replace the fictional studio, campaign concepts, articles and indicative fees. Set the email, optional booking URL and contact endpoint; update the policy pages. The default form prepares a complete email draft or brief download. Direct submission confirms acceptance only after the configured service returns a successful response.",
  updated: "2026-10-10",
};
