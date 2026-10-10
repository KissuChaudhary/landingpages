import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const rivetTemplate: TemplateItem = {
  slug: "rivet",
  title: "Rivet: Design & Engineering Studio",
  category: "Landing Pages",
  defaultTheme: "dark",
  badge: "Studio & Motion",
  description:
    "A monochrome studio website with original architectural imagery, acid-green accents, precise frame rails, and expressive Geist typography. Thoughtful scroll motion, four distinct project art directions, complete case studies, field notes, and a useful inquiry flow.",
  tags: [
    "Digital Studio",
    "Motion",
    "Original Imagery",
    "Dark Theme",
    "Next.js 15",
  ],
  features: [
    "Photographic framed hero and deliberate typography motion",
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
    "A complete independent studio website for ambitious digital projects. Original monochrome imagery, acid-green accents, large Geist typography, and careful motion frame a product design and engineering practice with a clear point of view.",
  bestFor: [
    "Product design and engineering studios",
    "Digital agencies and independent practices",
    "Creative development teams and consultancies",
  ],
  design:
    "A near-black canvas, warm white typography, and acid-green accents. An original architectural photograph sits inside an inset hairline frame with technical rails. Right-aligned section introductions, circular client marks, a two-column portfolio, numbered services, and a large typographic footer create an editorial rhythm.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Framed architectural hero, finite staggered typography, original studio image, and full-screen clip-reveal navigation with focus containment, Escape, inert background, and scroll locking.",
    },
    {
      name: "Studio and philosophy",
      detail:
        "Circular project marks, a five-part working rhythm, a monochrome studio photograph, and three structural facts about the practice.",
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
        "Native accessible disclosures, an architectural closing composition, and direct conversation links.",
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
  lines: 5710,
  beforeLaunch:
    "Replace illustrative projects, brand, fees, copy, and studio imagery. Set your canonical URL, business email, scheduling destination, and inquiry endpoint. Publish your own reviewed privacy notice. The local brief flow works without a backend; live submission needs your own validated endpoint and delivery service.",
  updated: "2026-10-10",
};
