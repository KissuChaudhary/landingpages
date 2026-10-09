import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const arcloTemplate: TemplateItem = {
  slug: "arclo",
  title: "Arclo: No-code AI Automation",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "AI Agents & Automation",
  description:
    "A luminous violet-to-coral launch page with precise Manrope typography, glowing controls and fine frame rails. Original product illustrations, live local workflows and complete pricing, contact, waitlist and editorial pages make the product story tangible.",
  tags: [
    "AI Automation",
    "No-code",
    "Gradient",
    "Original Imagery",
    "Next.js 15",
  ],
  features: [
    "Centered gradient hero, glowing controls and editable workflow canvas",
    "Three local workflows, configurable lead criteria and matching JSON exports",
    "Five original feature scenes, four onboarding views and team perspectives",
    "Monthly/yearly pricing, plan comparison, contact briefs, waitlist and journal",
  ],
  accentColor: "from-purple-500 to-rose-300",
  previewUrl: "/preview/arclo",
  standaloneUrl: "/demos/arclo/index.html",
  demoUrl: "/demo/arclo",
  detailUrl: "/template/arclo",
  thumbnailUrl: "/previews/card/arclo.webp",
};
export const arcloDetails: TemplateDetails = {
  name: "Arclo",
  kind: "No-code AI automation landing page template",
  summary:
    "A complete platform launch with a luminous textured hero, quiet white product chapters and an interactive workflow canvas. Precise Manrope typography, glowing controls, original photography and editable diagrams carry the experience from first impression to the supporting pages.",
  bestFor: [
    "No-code AI agent platforms",
    "Workflow automation products",
    "Connected team workspaces and productivity tools",
  ],
  design:
    "Violet, coral, white and charcoal. A 52px centered Manrope headline, a fine frame with real intersection dots, softly inset surfaces and a luminous gradient border system. Three benefits, a three-plus-two feature grid, a central agent framework, three plans, four onboarding views, team stories, a split about chapter and journal follow the reference’s visual rhythm.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Contracting navigation, native page menu, accessible mobile menu, a textured gradient and three selectable local workflow examples.",
    },
    {
      name: "Benefits and platform",
      detail:
        "Three benefits and five original React/CSS/SVG scenes, including chart periods and an editable idea field.",
    },
    {
      name: "Agent framework and onboarding",
      detail:
        "A central layered framework and four keyboard-accessible getting-started views.",
    },
    {
      name: "Workflow explorer",
      detail:
        "Source records, configurable lead threshold, finite execution, visible logs, empty results, clipboard output and matching JSON run receipts.",
    },
    {
      name: "Pricing",
      detail:
        "Three plans, monthly/yearly selection, a comparison table and complete billing review dialogs.",
    },
    {
      name: "People and journal",
      detail:
        "Illustrative team stories, original team photography, three original article covers and three complete articles.",
    },
    {
      name: "Questions and closing",
      detail:
        "Native disclosures, gradient closing action, useful footer navigation and remembered motion preference.",
    },
    {
      name: "Supporting pages",
      detail:
        "Pricing, contact, waitlist, journal and articles, privacy/terms placeholders and a custom missing-page state.",
    },
  ],
  customizeIntro:
    "Start in `site.config.ts` for the brand, primary copy, plans, FAQ and destinations. Workflow examples, stories and articles each have a focused data file.",
  customize: [
    {
      what: "Brand, copy, plans, FAQ and destinations",
      where: "site.config.ts",
    },
    {
      what: "Workflow records, conditions and outputs",
      where: "data/workflows.ts",
    },
    {
      what: "Illustrative people, quotes and articles",
      where: "data/stories.ts and data/articles.ts",
    },
    { what: "Palette, type and shared spacing", where: "styles/base.css" },
    {
      what: "Fonts and section order",
      where: "app/layout.tsx and app/page.tsx",
    },
    {
      what: "Original photo and generation prompt",
      where: "public/images/team.webp and ASSETS.md",
    },
  ],
  fonts: ["Manrope"],
  dependencies: ["next", "react", "react-dom", "lucide-react"],
  styling: "CSS",
  images:
    "One original generated WebP team photograph, with CSS crops for illustrative portraits. Original SVG mark, grain texture, workflow canvas, feature scenes, framework and three journal cover studies. No reference-site assets.",
  node: "20.9",
  files: 66,
  lines: 6625,
  beforeLaunch:
    "Replace the fictional brand, sample records, team stories and prices. Configure your app URL, each plan’s monthly/yearly checkout and contact/waitlist endpoints. Replace policy placeholders. Local workflows and downloads work; connect your live AI, account authentication, integrations and message delivery in your application.",
  updated: "2026-10-09",
};
