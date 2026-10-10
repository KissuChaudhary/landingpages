import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const offscriptTemplate: TemplateItem = {
  slug: "offscript",
  title: "Offscript: Independent Creative Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Creative Studio & Motion",
  description:
    "A creative studio website in paper, ink, acid yellow and lilac. Expanding photographic frames, a numbered index and a working wall that assembles a campaign from brief to final frame. Three creative worlds and two complete notebook articles make the portfolio worth exploring.",
  tags: [
    "Creative Studio",
    "Social & Campaigns",
    "Original Photography",
    "Motion",
    "Next.js 15",
  ],
  features: [
    "An expanding contact sheet with frame-specific captions and keyboard or touch exploration",
    "A compact numbered index and three full campaign stories",
    "One creative world assembled through three physical process stages",
    "Open engagement rows, two notebook articles and a locally hosted variable font",
  ],
  accentColor: "from-lime-200 to-violet-300",
  previewUrl: "/preview/offscript",
  standaloneUrl: "/demos/offscript/index.html",
  demoUrl: "/demo/offscript",
  detailUrl: "/template/offscript",
  thumbnailUrl: "/previews/card/offscript.webp",
};

export const offscriptDetails: TemplateDetails = {
  name: "Offscript",
  kind: "Independent creative studio website template",
  summary:
    "A complete studio website for independent brands and creative partners. Its own working-wall identity ties together a photographic contact sheet, three concept campaigns, typographic capability posters and a process composition that moves from question to exploration to finished creative.",
  bestFor: [
    "Independent creative, brand and social studios",
    "Campaign production and creator agencies",
    "Design partnerships with a strong editorial point of view",
  ],
  design:
    "Warm paper, black ink, acid yellow and lilac, with locally hosted Manrope. A large typographic opening, a dark photographic contact sheet, a wide flagship campaign and staggered portraits, an ink studio chapter, typographic posters, a lilac process wall and taped notebook covers. A compact numbered index replaces the conventional central navigation bar.",
  sections: [
    {
      name: "Hero and contact sheet",
      detail:
        "A two-line studio promise with a traced highlight. Three photographs expand as you explore them; the crop, caption and focus details follow the selected frame. Works with pointer, keyboard and touch.",
    },
    {
      name: "Studio index",
      detail:
        "A compact fixed Index button opens a numbered directory. Closes on selection, outside click and Escape, returning focus on Escape.",
    },
    {
      name: "Creative worlds",
      detail:
        "One wide campaign and two staggered portrait directions, each linked to a complete story with the question, direction, making and creative takeaway.",
    },
    {
      name: "Studio and capabilities",
      detail:
        "An editorial belief on an ink background, a studio photograph with a paper annotation, three principles and three illustrated typographic capability posters.",
    },
    {
      name: "Working wall",
      detail:
        "The same campaign moves from a paper brief to a moodboard of type, colors and imagery, then becomes a finished frame. Three stage buttons and a keyboard-accessible range input share one state.",
    },
    {
      name: "Engagements",
      detail:
        "Two open rows for campaign and partnership work, with correct project/monthly fee labels and direct inquiry links.",
    },
    {
      name: "Notebook",
      detail:
        "Two paper article covers lead to full essays about creative strategy and building a campaign world.",
    },
    {
      name: "FAQ and invitation",
      detail:
        "Native disclosures, a pencil-marked typographic invitation and a compact footer with configurable contact and social links.",
    },
  ],
  customizeIntro:
    "Brand, copy and destinations live in site.config.ts; campaign and article content have their own small data files.",
  customize: [
    {
      what: "Brand, metadata, URL, section copy, fees and FAQs",
      where: "site.config.ts",
    },
    {
      what: "Email, booking and social destinations",
      where: "site.config.ts → links",
    },
    {
      what: "Campaign stories, names, images and page slugs",
      where: "data/projects.ts",
    },
    { what: "Notebook articles and slugs", where: "data/notes.ts" },
    {
      what: "Palette, type and section composition",
      where: "styles/ and app/layout.tsx",
    },
    {
      what: "Selected hero frames and process artwork",
      where: "components/ContactSheet.tsx and components/ProcessCanvas.tsx",
    },
    { what: "Page order", where: "app/page.tsx" },
  ],
  fonts: ["Manrope (local variable font)"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Four original AI-generated illustrative photographs, optimized as local WebP. Original SVG mark and pencil strokes; CSS and React process artwork.",
  node: "20.9",
  files: 54,
  lines: 4140,
  beforeLaunch:
    "Replace the fictional brands, concept campaigns, articles, example fees and illustrative studio subjects with your own material. Set url, email and booking links in site.config.ts. Campaigns are creative studies, with no invented client results.",
  updated: "2026-10-10",
};
