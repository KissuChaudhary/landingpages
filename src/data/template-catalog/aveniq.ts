import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const aveniqTemplate: TemplateItem = {
  slug: "aveniq",
  title: "Aveniq: Product Decision Workspace",
  category: "Landing Pages",
  defaultTheme: "dark",
  badge: "Technology & SaaS",
  description:
    "A luminous technology landing page with a dark canvas, original glass sculpture imagery and a precise product narrative. Diagram-led capabilities, a scroll-lit workflow, layered use-case cards and flexible pricing create a confident launch.",
  tags: [
    "AI & Product",
    "Technology",
    "Glass Artwork",
    "Scroll Storytelling",
    "Next.js 15",
  ],
  features: [
    "Original editorial glass artwork and a contextual workspace illustration",
    "Blur-to-focus headings, subtle hero depth and three overlapping use cases",
    "Scroll-lit process, monthly/yearly pricing and native FAQs",
    "Local fonts and imagery, direct CTA destinations and centralized content",
  ],
  accentColor: "from-violet-300 to-slate-900",
  previewUrl: "/preview/aveniq",
  standaloneUrl: "/demos/aveniq/index.html",
  demoUrl: "/demo/aveniq",
  detailUrl: "/template/aveniq",
  thumbnailUrl: "/previews/card/aveniq.webp",
};
export const aveniqDetails: TemplateDetails = {
  name: "Aveniq",
  kind: "Technology and product workspace landing page template",
  summary:
    "A premium single-page launch for SaaS products and AI workspaces. Cool iridescent artwork, a dark canvas and controlled scroll storytelling frame a clear product narrative.",
  bestFor: [
    "AI and decision-support product launches",
    "Product collaboration platforms",
    "Technology and SaaS brands",
  ],
  design:
    "A dark oversized promise sits beside an iridescent sculpture and a glass-like decision brief. Three unequal capability cards carry original diagrams. A two-column process, a three-card overlapping use-case sequence, a context constellation and three pricing plans build the narrative. A two-column FAQ and luminous closing lead to a large wordmark footer. Space Grotesk and Inter are bundled locally.",
  sections: [
    {
      name: "Hero and principles",
      detail:
        "A new split composition, original glass ribbon, a contextual product illustration, direct CTAs and a concise principle strip.",
    },
    {
      name: "Capabilities",
      detail:
        "Three unequal cards with editable source, reasoning and next-step diagrams.",
    },
    {
      name: "Workflow",
      detail:
        "A sticky desktop introduction, orbital schematic and three scroll-lit process steps.",
    },
    {
      name: "Use cases",
      detail:
        "Three overlapping editorial cards with distinct materials, colours and original images. Phone layouts use vertical flow.",
    },
    {
      name: "Context",
      detail:
        "A diagram connects familiar types of team input around a shared decision.",
    },
    {
      name: "Pricing",
      detail:
        "Monthly/yearly selection updates example prices and yearly totals in place. Every CTA is an ordinary configurable link.",
    },
    {
      name: "FAQ and closing",
      detail:
        "Five native disclosures, luminous artwork, two closing CTAs and an oversized brand footer.",
    },
  ],
  customizeIntro:
    "Edit site.config.ts for identity, copy, visuals, plans, examples and destinations. Each section and stylesheet is separate.",
  customize: [
    { what: "Identity, copy, plans and CTA URLs", where: "site.config.ts" },
    { what: "Colour, typography and controls", where: "styles/base.css" },
    { what: "Section order", where: "app/page.tsx" },
    {
      what: "Product preview and diagrams",
      where: "components/WorkspacePreview.tsx and components/FeatureArt.tsx",
    },
    {
      what: "Scroll depth, reveals and process lighting",
      where: "components/Motion.tsx and styles/motion.css",
    },
    { what: "Original artwork and fonts", where: "public/ and ASSETS.md" },
  ],
  fonts: ["Space Grotesk", "Inter"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Three original glass-and-metal editorial sculptures, optimized as local WebP files. The prompt set and bundled font licences are included.",
  node: "20.9",
  files: 33,
  lines: 3741,
  beforeLaunch:
    "Replace the fictional product identity, example capabilities, pricing and email. Point CTAs at your own signup or booking destination. The product illustration is presentational; there are no forms, account flows or backend services.",
  updated: "2026-10-10",
};
