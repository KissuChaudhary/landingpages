import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const encoreTemplate: TemplateItem = {
  slug: "encore",
  title: "Encore: Email & SMS Retention Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Motion Agency",
  description:
    "A motion-led landing page for an email and SMS retention studio. A deck of real-looking emails shuffles itself beside a headline circled by hand, a 90-day timeline fills as you scroll, case results float their emails beside the pointer, and a footer wordmark settles from wide to condensed.",
  tags: ["Agency", "Motion", "E-commerce", "Retainer Pricing", "Tailwind CSS v4", "Next.js 15"],
  features: [
    "Self-shuffling email deck with a chip that morphs the flow name and rolls its revenue",
    "Services index with a sticky preview that wipes by direction, and a scroll-filled 90-day timeline",
    "Case ledger with a pointer-following email preview, plus a featured case with rolling metrics",
    "Every button goes to your booking or audit link; loops hold under the pointer and respect reduced motion",
  ],
  accentColor: "from-rose-300 to-pink-600",
  previewUrl: "/preview/encore",
  standaloneUrl: "/demos/encore/index.html",
  demoUrl: "/demo/encore",
  detailUrl: "/template/encore",
  thumbnailUrl: "/previews/card/encore.webp",
};

export const encoreDetails: TemplateDetails = {
  name: "Encore",
  kind: "Motion-led email and SMS agency landing page template",
  summary:
    "A complete, motion-first page for a service business that sells a retainer and books calls. Encore positions an email and SMS studio around one promise, the second order, and backs it with revenue figures, case results and a clear 90-day plan. Every figure and label that changes morphs instead of swapping.",
  bestFor: [
    "Email, SMS, lifecycle and retention agencies",
    "Growth and CRO studios that sell retainers and audits",
    "Any service business whose next step is a booked call",
  ],
  design:
    "Hubot Sans throughout, set condensed for display and using its width axis for motion, with Azeret Mono for labels. A white page with mist slabs inset from the edge, an ink block for the process and the featured plan, and a single berry accent. Pill buttons with an arrow disc that swaps on hover. No photography: emails and dashboards are light WebP images.",
  sections: [
    {
      name: "Hero",
      detail:
        "A headline with a hand-drawn loop around its key phrase, a deck of four emails that shuffles itself (holds on hover, steps on click) with a chip that morphs the flow name and rolls its revenue, four rolling stats and a client-name marquee.",
    },
    { name: "Navigation", detail: "A sticky bar that tightens on scroll, with an underline that glides to the section you're reading, and a phone menu that grows out of the bar." },
    { name: "Statement", detail: "One paragraph on the problem whose words light from grey to ink as you read." },
    {
      name: "Services",
      detail: "Six numbered rows that open to their deliverables, beside a sticky preview whose image wipes up or down depending on the way you moved. Inline images on phones.",
    },
    { name: "Process", detail: "A dark 90-day timeline whose berry line fills with scroll and lights each stage as it arrives, with a free-audit button." },
    {
      name: "Results",
      detail: "A featured case with rolling metrics and a revenue chart, then a ledger of results whose emails float beside the pointer on desktop and show as thumbnails on phones.",
    },
    { name: "How we work", detail: "A berry tile with a rolling headline figure and five promises in a grid that closes itself for four to six points." },
    { name: "Integrations", detail: "Two rings of tools turning in opposite directions around the mark, every name upright, with a plain list for screen readers." },
    { name: "Testimonials", detail: "One large quote at a time; a client list with an autoplay hairline on desktop and pills on phones, with arrow-key tabs." },
    { name: "Pricing", detail: "Three engagements (free audit, Growth, Full lifecycle), each going to your booking or audit link." },
    { name: "FAQ", detail: "An accordion beside a sticky intro and a founder card with its own booking button." },
    { name: "Closing and footer", detail: "A berry block with outlined words drifting along its edge, then a footer whose giant wordmark narrows from wide to condensed as it scrolls in." },
  ],
  customizeIntro:
    "Everything a visitor reads, and every destination, lives in site.config.ts. Set your scheduling link once and every booking button follows. The palette is a handful of CSS variables, and the emails and dashboards are images you replace with your own at the same proportions.",
  customize: [
    { what: "Brand, copy, the hero deck, stats, services, results, plans and questions", where: "site.config.ts" },
    { what: "Where the buttons go (booking page, audit form, email)", where: "site.config.ts → links" },
    { what: "Palette: berry accent, ink, mist greys", where: "app/globals.css" },
    { what: "Fonts", where: "app/layout.tsx" },
    { what: "Emails, dashboards and service previews (sizes in the README)", where: "public/images/ and site.config.ts" },
    { what: "Section order", where: "app/page.tsx" },
  ],
  fonts: ["Hubot Sans", "Azeret Mono"],
  dependencies: ["next", "react", "react-dom", "lucide-react"],
  styling: "Tailwind CSS v4",
  images:
    "Eleven original images designed for the template (four emails, six service previews and a case chart), rendered at 2× as WebP, about 490 KB in all. The mark is SVG; client names are set in type.",
  node: "20.9",
  files: 53,
  lines: 3352,
  beforeLaunch:
    "Replace the fictional studio, clients, quotes and figures. Set `links.booking` to your scheduling page (and `links.audit` if audits have their own form) in `site.config.ts`, then swap the images for your own work.",
  updated: "2026-10-10",
};
