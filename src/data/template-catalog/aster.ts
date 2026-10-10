import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const asterTemplate: TemplateItem = {
  slug: "aster",
  title: "Aster: Creative Review Workspace",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Creative Reviews",
  description:
    "Warm ivory, serif headings and original botanical paintings introduce a creative review space. A selectable feedback hero, stacked product chapters and four discipline tabs lead into a working local board for briefs, revisions and approvals.",
  tags: [
    "Creative Workflow",
    "Serif Typography",
    "Original Artwork",
    "Light Theme",
    "Next.js 15",
  ],
  features: [
    "Newsreader and Onest typography with original botanical backgrounds",
    "Interactive review preview, sticky chapters and keyboard-accessible tabs",
    "Project filters, studio responses, revision requests, briefs and approvals",
    "Plan buttons that go to checkout, connection directory, contact and editorial pages",
  ],
  accentColor: "from-stone-200 to-emerald-300",
  previewUrl: "/preview/aster",
  standaloneUrl: "/demos/aster/index.html",
  demoUrl: "/demo/aster",
  detailUrl: "/template/aster",
  thumbnailUrl: "/previews/card/aster.webp",
};
export const asterDetails: TemplateDetails = {
  name: "Aster",
  kind: "Creative project review and approval landing page template",
  summary:
    "A complete creative workflow product with original positioning, project scenarios and editorial copy. Serif headings, warm ivory and botanical artwork frame a working review space for independent creatives, design studios and their clients.",
  bestFor: [
    "Creative review and approval products",
    "Design studios and independent creative practices",
    "Client collaboration and project workflow platforms",
  ],
  design:
    "Newsreader display type and Onest reading text. Warm ivory, ink, quiet sage and powder blue. Original botanical paintings sit behind editable product scenes; compact rectangular controls and open section headings keep the page spacious. A split hero leads into three product tiles, stacked chapters, four use cases, trust details, three plans and original portrait perspectives.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Compact sticky navigation, accessible company/mobile menus, two-line serif heading and selectable creative feedback over original botanical artwork.",
    },
    {
      name: "Illustrated features",
      detail:
        "Three focused product illustrations with original botanical backdrops and working workspace destinations.",
    },
    {
      name: "Stacked product chapters",
      detail:
        "Three wide scene-and-copy panels stack on desktop and read in normal order on phones or with reduced motion.",
    },
    {
      name: "Tabbed use cases",
      detail:
        "Four keyboard-accessible tabs coordinate copy, illustrations and workspace destinations. Phone labels remain readable in a horizontal rail.",
    },
    {
      name: "Creative review workspace",
      detail:
        "Twelve original reviews across four projects, with combined filters, editable studio responses, approvals, owner/reason revision requests, complete briefs, calculated reports, history and matching CSV/JSON exports.",
    },
    {
      name: "Trust",
      detail:
        "Four capabilities covering project context, named revision owners, decision history and complete review exports.",
    },
    {
      name: "Pricing",
      detail:
        "Three plans, monthly/annual selection and checkout links, with a correctly handled custom tier.",
    },
    {
      name: "Studio story",
      detail:
        "An illustrative creative director’s perspective pairs original artwork with a serif quote and counts calculated from the sample reviews.",
    },
    {
      name: "Team perspectives",
      detail:
        "Four original fictional team perspectives with locally shipped editorial portraits.",
    },
    {
      name: "FAQ",
      detail:
        "Native disclosures cover the local review process, client notifications, project briefs, pricing and customization.",
    },
    {
      name: "Closing and footer",
      detail:
        "An illustrated review-space closing, complete resource links.",
    },
    {
      name: "Contact and resources",
      detail:
        "Searchable connection directory with scope guides, validated local contact brief or configured JSON submission, journal, articles, about, updates, editable policy pages and a custom missing-page state.",
    },
  ],
  customizeIntro:
    "Begin with site.config.ts for branding, copy, plans and destinations. Creative reviews, project briefs, studio stories, connections and editorial pages live in their own focused data files.",
  customize: [
    {
      what: "Brand, metadata, copy, FAQ, plans and destinations",
      where: "site.config.ts",
    },
    {
      what: "Reviews, project versions, filters, metrics and decisions",
      where: "data/reviews.ts",
    },
    {
      what: "Project briefs, direction and deliverables",
      where: "data/briefs.ts",
    },
    {
      what: "Teams, connections and supporting pages",
      where: "data/teams.ts, data/integrations.ts and data/pages.ts",
    },
    {
      what: "Palette, shared type and control dimensions",
      where: "styles/base.css",
    },
    {
      what: "Original artwork, portraits and prompt set",
      where: "public/images/ and ASSETS.md",
    },
  ],
  fonts: ["Newsreader", "Onest"],
  dependencies: ["next", "react", "react-dom", "lucide-react"],
  styling: "CSS",
  images:
    "Three original botanical paintings and four fictional editorial portraits generated with the built-in imagegen tool. Optimized WebP assets ship locally. Marks and interfaces are original editable SVG, CSS and React.",
  node: "20.9",
  files: 74,
  lines: 6742,
  beforeLaunch:
    "Replace fictional studios, quotes, projects and allowances. Configure app, checkout and contact destinations and replace policy placeholders. Local approvals, revision requests, briefs, reports and exports work; connect storage, file uploads, client permissions, notifications and billing for your production service.",
  updated: "2026-10-09",
};
