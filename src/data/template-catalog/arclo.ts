import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const arcloTemplate: TemplateItem = {
  slug: "arclo",
  title: "Arclo: Finance Close Platform",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Fintech & Finance Ops",
  description:
    "A premium ink, petrol and champagne launch page for a month-end close product. Precise Manrope typography, a textured hero field and a working close canvas that matches bank lines, flags variances and routes approvals, with entity-based pricing, a walkthrough form and a finance journal.",
  tags: [
    "Fintech",
    "Finance Ops",
    "Dark Gradient",
    "Original Imagery",
    "Next.js 15",
  ],
  features: [
    "Ink-to-petrol hero field, glowing controls and a working close canvas",
    "Bank matching with a dollar tolerance, variance flags and approval routing, all exportable as JSON",
    "Five original feature scenes, four onboarding steps and finance team stories",
    "Entity-based pricing with comparison, walkthrough form, early-access page and journal",
  ],
  accentColor: "from-cyan-900 to-amber-200",
  previewUrl: "/preview/arclo",
  standaloneUrl: "/demos/arclo/index.html",
  demoUrl: "/demo/arclo",
  detailUrl: "/template/arclo",
  thumbnailUrl: "/previews/card/arclo.webp",
};
export const arcloDetails: TemplateDetails = {
  name: "Arclo",
  kind: "Finance close and fintech landing page template",
  summary:
    "A complete launch for a month-end close product: a textured ink-to-petrol hero, quiet white chapters and an interactive close canvas that runs on real sample numbers. Precise Manrope typography, glowing controls, original photography and editable diagrams carry it from first impression to the supporting pages.",
  bestFor: [
    "Finance close, reconciliation and accounting products",
    "Fintech and spend management platforms",
    "B2B tools for controllers, CFOs and finance operations",
  ],
  design:
    "Ink, petrol and champagne on cool white. A 52px centered Manrope headline, a fine frame with real intersection dots, softly inset surfaces and a champagne-edged glow on the main action. Three benefits, a three-plus-two feature grid, a central close framework, three entity-based plans, four onboarding steps, finance stories, a split about chapter and journal.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Contracting navigation, native page menu, accessible mobile menu, a textured ink-to-petrol field and three selectable close steps.",
    },
    {
      name: "Benefits and platform",
      detail:
        "Three benefits and five original React/CSS/SVG scenes, including two reconciliation views and an editable variance note.",
    },
    {
      name: "Close framework and onboarding",
      detail:
        "A central layered framework and four keyboard-accessible onboarding steps.",
    },
    {
      name: "Close explorer",
      detail:
        "Sample bank lines, accounts and entries, a dollar tolerance, finite runs, visible logs, exceptions, clipboard output and matching JSON records.",
    },
    {
      name: "Pricing",
      detail:
        "Three entity-based plans, monthly/yearly selection, a comparison table and plan buttons that go to your checkout or contact page.",
    },
    {
      name: "People and journal",
      detail:
        "Illustrative finance stories, original team photography, three original article covers and three complete articles on the close, audit and variance notes.",
    },
    {
      name: "Questions and closing",
      detail:
        "Native disclosures, gradient closing action, useful footer navigation.",
    },
    {
      name: "Supporting pages",
      detail:
        "Pricing, walkthrough request, early access, journal and articles, privacy/terms placeholders and a custom missing-page state.",
    },
  ],
  customizeIntro:
    "Start in `site.config.ts` for the brand, primary copy, plans, FAQ and destinations. The sample close data, stories and articles each have a focused data file.",
  customize: [
    {
      what: "Brand, copy, plans, FAQ and destinations",
      where: "site.config.ts",
    },
    {
      what: "Sample bank lines, accounts, entries and rules",
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
    "One original generated WebP team photograph, with CSS crops for illustrative portraits. Original SVG mark, grain texture, close canvas, feature scenes, framework and three journal cover studies.",
  node: "20.9",
  files: 63,
  lines: 6430,
  beforeLaunch:
    "Replace the fictional brand, sample close data, stories and prices. Configure your app URL, each plan’s monthly/yearly checkout and contact/waitlist endpoints. Replace policy placeholders. Local runs and downloads work; connect your ledger, bank feeds, authentication and posting in your application.",
  updated: "2026-10-09",
};
