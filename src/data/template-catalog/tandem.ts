import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const tandemTemplate: TemplateItem = {
  slug: "tandem",
  title: "Tandem: AI Agent Workspace",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "AI Agents & Workflows",
  description:
    "A complete light-mode AI agent launch page. A live point sculpture, width-morphing headline, perspective product reveal, specialist carousel, flowing handoffs, and a giant scroll-driven wordmark make the work feel alive.",
  tags: [
    "AI Agents",
    "Workflow Platform",
    "Light",
    "Motion",
    "Canvas",
    "Next.js 15",
  ],
  features: [
    "Original cursor-responsive point sculpture with visibility-aware animation",
    "Six agent cards, three workflow chapters and keyboard-accessible team tabs",
    "Thirteen lightweight original product illustrations and an animated connection map",
    "Rolling pricing, morphing labels, real sign-up destinations and reduced-motion support",
  ],
  accentColor: "from-blue-300 to-blue-600",
  previewUrl: "/preview/tandem",
  standaloneUrl: "/demos/tandem/index.html",
  demoUrl: "/demo/tandem",
  detailUrl: "/template/tandem",
  thumbnailUrl: "/previews/card/tandem.webp",
};

export const tandemDetails: TemplateDetails = {
  name: "Tandem",
  kind: "Light-mode AI agent and workflow landing page template",
  summary:
    "An original, complete AI platform launch page with a warm product story and precise motion. Electric blue on white, a procedural point sculpture, six specialist agents, thirteen original product illustrations, and a scroll-driven wordmark make every section feel considered.",
  bestFor: [
    "AI agent platforms and workflow products",
    "Multi-agent workspaces and automation tools",
    "Small-team SaaS products with human approval at their core",
  ],
  design:
    "Mona Sans with expressive scale and variable-width transitions, Fragment Mono for small metadata. White and cool grey backgrounds throughout, electric blue actions, hairline frames and rounded controls. A split hero leads into varied editorial, carousel, workflow, integration and pricing compositions.",
  sections: [
    {
      name: "Navigation and hero",
      detail:
        "Responsive sticky navigation, a width-morphing headline, cursor-responsive point sculpture, three floating specialist cards and a prompt strip.",
    },
    {
      name: "Manifesto",
      detail:
        "A centered positioning statement and three rolling product figures, without invented customer claims.",
    },
    {
      name: "Workspace",
      detail:
        "Original workspace illustration that settles from a perspective tilt as it scrolls into view.",
    },
    {
      name: "Agents",
      detail:
        "Six specialist cards in a responsive snap carousel with arrows, keyboard navigation, a rolling counter and a progress line.",
    },
    {
      name: "Workflow",
      detail:
        "Three expanding steps with a morphing chapter label and layered product-image transitions.",
    },
    {
      name: "Teams",
      detail:
        "Founder, marketing and operations tabs with a springing indicator and directional copy and image transitions.",
    },
    {
      name: "Integrations",
      detail:
        "Six connected tools arranged around the Tandem mark, drawing paths and moving signal points.",
    },
    {
      name: "Human control",
      detail:
        "Three editorial reasons for clear permissions, visible reasoning and human approval.",
    },
    {
      name: "Pricing",
      detail:
        "Three plans, monthly/yearly billing, rolling prices, directional billing notes and configurable checkout links.",
    },
    {
      name: "FAQ",
      detail:
        "Six questions beside a sticky introduction, with animated height and keyboard navigation.",
    },
    {
      name: "Closing and footer",
      detail:
        "A second point sculpture, endpoint-ready email form, and a giant wordmark that comes together as you scroll.",
    },
  ],
  customizeIntro:
    "Visible copy and production destinations live in site.config.ts. Each section and stylesheet is focused; the product images are easy to replace at documented proportions.",
  customize: [
    {
      what: "Brand, copy, agents, plans, questions and links",
      where: "site.config.ts",
    },
    {
      what: "Palette and type scale",
      where: "styles/base.css and styles/hero.css",
    },
    {
      what: "Procedural point sculpture",
      where: "components/motion/AgentSculpture.tsx",
    },
    { what: "Product illustrations", where: "public/images/" },
    { what: "Email sign-up behavior", where: "site.config.ts → signup" },
    {
      what: "Section order and fonts",
      where: "app/page.tsx and app/layout.tsx",
    },
  ],
  fonts: ["Mona Sans", "Fragment Mono"],
  dependencies: ["next", "react", "react-dom", "lucide-react"],
  styling: "Tailwind CSS v4",
  images:
    "Thirteen original product illustrations, about 331 KB total. The point sculpture is procedural canvas; the mark and integration paths are SVG.",
  node: "20.9",
  files: 66,
  lines: 5709,
  beforeLaunch:
    "Replace the fictional product copy, prices and integration claims. Configure your email destination, checkout links and contact address. Product screens are illustrative; connect your real agent product separately.",
  updated: "2026-10-10",
};
