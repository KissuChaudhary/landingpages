import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const rivetTemplate: TemplateItem = {
  slug: "rivet",
  title: "Rivet: Design & Engineering Studio",
  category: "Landing Pages",
  defaultTheme: "dark",
  badge: "Studio & Motion",
  description:
    "A studio website set in brushed-steel type on a riveted hairline grid, with original architectural imagery and acid-green accents. Light that follows the cursor, a hero image that opens as you scroll, four distinct project art directions, complete case studies, field notes, and a useful inquiry flow.",
  tags: [
    "Digital Studio",
    "Motion",
    "Original Imagery",
    "Dark Theme",
    "Next.js 15",
  ],
  features: [
    "Brushed-steel headline with a cursor-following light sweep",
    "Four editable project compositions and complete case-study pages",
    "Full-screen accessible navigation and inline capability disclosures",
    "Configured inquiry delivery or downloadable local briefs",
  ],
  accentColor: "from-lime-300 to-green-500",
  previewUrl: "/preview/rivet",
  standaloneUrl: "/demos/rivet/index.html",
  demoUrl: "/demo/rivet",
  detailUrl: "/template/rivet",
  thumbnailUrl: "/previews/card/rivet.webp",
};
export const rivetDetails: TemplateDetails = {
  name: "Rivet",
  kind: "Design and engineering studio landing page template",
  summary:
    "A complete independent studio website for ambitious digital projects. Brushed-steel typography, a riveted hairline grid, original monochrome imagery, and careful motion present a product design and engineering practice with a clear point of view.",
  bestFor: [
    "Product design and engineering studios",
    "Digital agencies and independent practices",
    "Creative development teams and consultancies",
  ],
  design:
    "A near-black canvas, warm white typography, and acid-green accents. The headline is cut from brushed steel with one anodized-lime word, and hairline rules are fastened by small rivet heads at every joint. Left-set section headlines, a riveted client strip, a two-column portfolio, numbered services, a steel-type closing, and a large typographic footer create an editorial rhythm.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Steel headline that rises, catches one sweep of light, and follows the cursor; a riveted seam with actions; an architectural image plate that opens to full bleed on scroll. Inline navigation on wide screens and a full-screen clip-reveal menu with focus containment, Escape, inert background, and scroll locking on smaller ones.",
    },
    {
      name: "Studio and philosophy",
      detail:
        "A riveted strip of project marks, a five-part working rhythm, a monochrome studio photograph, and three structural facts about the practice.",
    },
    {
      name: "Selected work",
      detail:
        "Four distinct editable project compositions with hover and focus treatment; each opens a full case study with challenge, approach, output, deliverables, and next-project navigation.",
    },
    {
      name: "Capabilities",
      detail:
        "Four numbered native disclosures with original service diagrams, scope, deliverables, and tags. Content expands in place.",
    },
    {
      name: "Process",
      detail:
        "A sticky introduction alongside four connected working stages, with restrained scroll reveals and a normal mobile reading order.",
    },
    {
      name: "Engagements",
      detail:
        "Three clearly labeled starting fees with one-time versus monthly terms. Actions preselect the relevant engagement on the inquiry page.",
    },
    {
      name: "Field notes",
      detail:
        "Three complete original articles, coordinated covers, a journal index, article metadata, and readable editorial pages.",
    },
    {
      name: "FAQ and closing",
      detail:
        "Native accessible disclosures, a brushed-steel closing statement, and direct conversation links.",
    },
    {
      name: "Project inquiry",
      detail:
        "Validated form, selected engagement, configured JSON endpoint delivery, honest error handling, downloadable local brief, and optional email draft.",
    },
    {
      name: "Supporting pages and footer",
      detail:
        "Studio, contact, four case studies, journal and three articles, privacy holding page, custom 404, large brand footer, optional social destinations.",
    },
  ],
  customizeIntro:
    "Start with site.config.ts for branding, page copy, navigation, FAQ, and destinations. Portfolio, articles, and engagement data are divided into focused files.",
  customize: [
    {
      what: "Brand, metadata, main copy, booking, inbox, and inquiry endpoint",
      where: "site.config.ts",
    },
    {
      what: "Portfolio, scopes, narratives, and generated project routes",
      where: "data/projects.ts",
    },
    {
      what: "Services, process, engagement prices, and deliverables",
      where: "data/services.ts",
    },
    {
      what: "Complete articles and editorial metadata",
      where: "data/articles.ts",
    },
    {
      what: "Project artwork and service diagrams",
      where: "components/art/ and styles/project-art.css",
    },
    {
      what: "Palette, typography, spacing, and responsive compositions",
      where: "styles/",
    },
    {
      what: "Original architectural and studio photography",
      where: "public/images/ and ASSETS.md",
    },
  ],
  fonts: ["Geist", "Geist Mono"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Two original monochrome photographs generated with the built-in imagegen tool and shipped as optimized WebP. Fictional project imagery, diagrams, and marks are editable HTML, CSS, React, and SVG.",
  node: "20.9",
  files: 75,
  lines: 5924,
  beforeLaunch:
    "Replace illustrative projects, brand, fees, copy, and studio imagery. Set your canonical URL, business email, scheduling destination, and inquiry endpoint. Publish your own reviewed privacy notice. The local brief flow works without a backend; live submission needs your own validated endpoint and delivery service.",
  updated: "2026-10-10",
};
