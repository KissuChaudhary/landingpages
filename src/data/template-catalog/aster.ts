import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const asterTemplate: TemplateItem = {
  slug: "aster",
  title: "Aster: AI Customer Support Workspace",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Customer Support",
  description:
    "Warm ivory, light serif headings and original botanical paintings introduce a thoughtful support workspace. A split inbox hero, stacked product chapters, keyboard-accessible tabs and three plans lead into a fully working local ticket experience.",
  tags: [
    "AI Support",
    "Serif Typography",
    "Original Artwork",
    "Light Theme",
    "Next.js 15",
  ],
  features: [
    "Newsreader and Onest typography with original botanical backgrounds",
    "Interactive inbox, sticky product chapters and keyboard-accessible tabs",
    "Ticket filtering, editable drafts, human handoff, knowledge and reporting",
    "Complete billing reviews, connection directory, contact and editorial pages",
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
  kind: "AI customer support workspace landing page template",
  summary:
    "A complete support product launch with light serif headings, warm ivory surfaces and original botanical artwork. An interactive inbox hero, stacked product chapters, tabbed demonstrations and a working local workspace make the product story tangible.",
  bestFor: [
    "AI customer support products",
    "Help desks and customer experience platforms",
    "Knowledge and conversational workspaces",
  ],
  design:
    "Newsreader display type and Onest reading text. Warm ivory, ink, quiet sage and powder blue. Original botanical paintings sit behind editable product scenes; compact rectangular controls and open section headings keep the page spacious. A split hero leads into three product tiles, stacked chapters, four use cases, trust details, three plans and original portrait perspectives.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Compact sticky navigation, accessible company/mobile menus, two-line serif heading and a selectable inbox over original botanical artwork.",
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
      name: "Support workspace",
      detail:
        "Twelve fictional tickets with combined filters, editable drafts, guarded resolution, owner/reason handoff, source articles, calculated reporting, activity history and matching CSV/JSON exports.",
    },
    {
      name: "Trust",
      detail:
        "Four clear capabilities covering source review, deliberate handoff, local history and useful exports.",
    },
    {
      name: "Pricing",
      detail:
        "Three plans, monthly/annual selection and full billing reviews with a correctly handled custom tier.",
    },
    {
      name: "Customer story",
      detail:
        "An illustrative team story pairs original artwork with a serif quote and metrics calculated from the sample tickets.",
    },
    {
      name: "Team perspectives",
      detail:
        "Four original fictional team perspectives with locally shipped editorial portraits.",
    },
    {
      name: "FAQ",
      detail:
        "Native disclosures cover the local workspace, suggested replies, pricing and white-label customization.",
    },
    {
      name: "Closing and footer",
      detail:
        "An illustrated inbox closing, complete resource links and a remembered motion preference.",
    },
    {
      name: "Contact and resources",
      detail:
        "Searchable connection directory with scope guides, validated local contact brief or configured JSON submission, journal, articles, about, updates, editable policy pages and a custom missing-page state.",
    },
  ],
  customizeIntro:
    "Begin with site.config.ts for branding, copy, plans and destinations. Tickets, knowledge, team stories, connections and editorial pages live in their own focused data files.",
  customize: [
    {
      what: "Brand, metadata, copy, FAQ, plans and destinations",
      where: "site.config.ts",
    },
    {
      what: "Tickets, filters, metrics and state transitions",
      where: "data/tickets.ts",
    },
    {
      what: "Approved knowledge and source context",
      where: "data/knowledge.ts",
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
    "Three original botanical paintings and four fictional editorial portraits generated with the built-in imagegen tool. Optimized WebP assets ship locally. Marks and interfaces are original editable SVG, CSS and React. No reference-site assets.",
  node: "20.9",
  files: 61,
  lines: 7708,
  beforeLaunch:
    "Replace the fictional brand, teams, quotes, tickets and allowances. Configure app and checkout URLs and the contact endpoint. Replace privacy/terms with your own policies. Local ticket reviews, handoffs, source context, reports and exports work; connect production AI, accounts, provider consent and billing separately.",
  updated: "2026-10-09",
};
