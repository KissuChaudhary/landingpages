import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const shearTemplate: TemplateItem = {
  slug: "shear",
  title: "Shear: Cloud Cost Platform",
  category: "Landing Pages",
  defaultTheme: "dark",
  badge: "Motion SaaS",
  description:
    "A motion-led launch page for a cloud cost product. A live canvas of falling figures runs behind a headline whose last word morphs through Mona Sans' width axis; a scroll-driven proof grid, product screens that arrive out of a blur and a footer wordmark that shears back into line carry the page.",
  tags: ["SaaS", "Motion", "Canvas", "Dark Hero", "Tailwind CSS v4", "Next.js 15"],
  features: [
    "Live glyph-field canvas that reacts to the cursor and pulses on every headline change",
    "Scroll-driven proof grid, drag-and-snap feature carousel and hover-to-open steps",
    "Hero email field that posts to your endpoint or opens your sign-up page",
    "Rolling prices, morphing labels, a pause control and full reduced-motion support",
  ],
  accentColor: "from-emerald-200 to-teal-500",
  previewUrl: "/preview/shear",
  standaloneUrl: "/demos/shear/index.html",
  demoUrl: "/demo/shear",
  detailUrl: "/template/shear",
  thumbnailUrl: "/previews/card/shear.webp",
};

export const shearDetails: TemplateDetails = {
  name: "Shear",
  kind: "Motion-led cloud cost SaaS landing page template",
  summary:
    "A complete, motion-first launch page with original positioning: Shear finds idle and oversized cloud resources and ships the fix as a pull request. Near-black frames open and close the page, mint marks every saving, and every figure, label and panel that changes morphs instead of swapping.",
  bestFor: [
    "Developer tools, infrastructure and FinOps products",
    "B2B SaaS launches that want a striking, motion-led first impression",
    "Products with figures to prove: savings, speed, uptime, conversion",
  ],
  design:
    "Mona Sans throughout, using its width axis for motion, with Fragment Mono for figures. Near-black inset frames for the hero and footer, a white page with cool grey containers, and a single mint accent. Pill buttons carry a dark disc with the brand mark, whose halves slide along their cut on hover. No photography: product screens are light WebP images, and the hero art is a canvas.",
  sections: [
    {
      name: "Hero",
      detail:
        "Dark inset frame with a live glyph-field canvas (a river of figures falling along a cost curve), a headline whose last word morphs between five words, an email field wired to your endpoint or sign-up page, and a customer logo strip with a pause control.",
    },
    { name: "Navigation", detail: "Full bar in the hero, a compact floating bar that marks the section you're reading, and a phone menu that grows out of the bar." },
    {
      name: "Proof",
      detail: "Five stats and a monthly bill chart in a bento grid whose outer columns spread out as you scroll; figures roll up and the chart draws once it lands.",
    },
    {
      name: "Comparison",
      detail: "A raised dark column against two alternatives with row highlighting; phones switch between the alternatives instead of scrolling a long table.",
    },
    {
      name: "Product carousel",
      detail: "Six wide feature cards with product screens (waste radar, rightsizing gauge, coverage ring, anomaly alert, unit costs, forecast), snap scrolling, drag, arrows and a progress hairline.",
    },
    { name: "How it works", detail: "Three steps that widen on hover to reveal their screens: accounts connecting, findings ranked by cost and a merged pull request. A tap accordion on phones." },
    { name: "Teams", detail: "Four keyboard-accessible tabs with a thrown indicator, an autoplay fill, copy that slides with direction and a colour field that blends between palettes." },
    { name: "Why Shear", detail: "A Monday digest card over a quieter glyph river, beside four reasons on hairlines." },
    { name: "Customers", detail: "A staggered grid of quotes and people with a dark customer-result tile." },
    { name: "Pricing", detail: "Four plans with a monthly/yearly switch and rolling prices; buttons go to checkout, sign-up or an email to sales." },
    { name: "FAQ", detail: "An accordion beside a sticky intro; answers open to their real height and arrow keys move between questions." },
    { name: "Closing and footer", detail: "The glyph river again in ink on a light panel, then a dark footer whose giant wordmark slides back into line as it scrolls in." },
  ],
  customizeIntro:
    "Everything a visitor reads, and every destination, lives in site.config.ts. The palette is a handful of CSS variables, and the product screens are images you replace with your own at the same proportions.",
  customize: [
    { what: "Brand, copy, headline words, stats, plans, questions and destinations", where: "site.config.ts" },
    { what: "Where the hero email goes (endpoint, sign-up page or the plans)", where: "site.config.ts → signup, lib/signup.ts" },
    { what: "Palette: mint accent, ink frames, greys", where: "app/globals.css" },
    { what: "Fonts", where: "app/layout.tsx" },
    { what: "Product screens (sizes in the README)", where: "public/images/ and site.config.ts" },
    { what: "Section order", where: "app/page.tsx" },
  ],
  fonts: ["Mona Sans", "Fragment Mono"],
  dependencies: ["next", "react", "react-dom", "lucide-react"],
  styling: "Tailwind CSS v4",
  images: "Sixteen original product screens designed for the template and rendered at 2× as WebP, about 250 KB in all. The hero art is a canvas; the mark and the fictional customer logos are SVG.",
  node: "20.9",
  files: 64,
  lines: 4649,
  beforeLaunch:
    "Replace the fictional brand, customers, quotes and figures. Set `signup.endpoint` or `signup.url`, each plan's checkout links and your sales email in `site.config.ts`. Connect your real product, billing and sign-up separately.",
  updated: "2026-10-10",
};
