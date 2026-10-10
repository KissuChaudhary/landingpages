import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const inlayTemplate: TemplateItem = {
  slug: "inlay",
  title: "Inlay: Link-in-Bio & Creator Payments",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Creator Platform & Motion",
  description:
    "A motion-led launch page for a link-in-bio app that pays its users. Tiles wait around the headline and fly into a creator's page as you scroll, the handle a visitor types follows them down the page, payments fly into a live rolling balance, a product tile grows into a checkout and a receipt, and a cursor builds a page on a tilted board.",
  tags: ["Creator Economy", "Link in Bio", "Payments", "Motion", "Light Theme", "Next.js 15"],
  features: [
    "Scattered tiles that fly into a page on scroll, with a working handle field",
    "Live balance: payments fly in and roll the total; Pay out morphs in place",
    "A product tile that becomes a checkout, a story stage and a self-building board",
    "Rolling prices, morphing labels, no popups and full reduced-motion support",
  ],
  accentColor: "from-blue-500 to-yellow-300",
  previewUrl: "/preview/inlay",
  standaloneUrl: "/demos/inlay/index.html",
  demoUrl: "/demo/inlay",
  detailUrl: "/template/inlay",
  thumbnailUrl: "/previews/card/inlay.webp",
};

export const inlayDetails: TemplateDetails = {
  name: "Inlay",
  kind: "Motion-led landing page for a link-in-bio, storefront and payouts app",
  summary:
    "A complete launch page with original positioning: Inlay is a link in bio you arrange like a gallery wall (photos, posters, music, products, bookings and a newsletter as tiles) that also takes tips, sells files, books sessions and pays out instantly. The example creator is a type designer, so most tiles are original poster art, and every number, label and button that changes moves instead of swapping.",
  bestFor: [
    "Link-in-bio, personal site and portfolio builders",
    "Creator storefronts, booking, membership and tipping products",
    "Payments and payout apps for freelancers and small studios",
  ],
  design:
    "Mona Sans throughout, run wide and heavy for headings. A white page, ink text and one ultramarine accent, with citrine, vermilion and bone kept for the poster artwork. One phrase per heading sits in a tile that drops into the line. Hairlines and 1px rings, no shadows or blur.",
  sections: [
    {
      name: "Hero",
      detail:
        "Seven tiles wait around the headline, drifting and leaning toward the pointer (fanned out under the claim field on phones). As you scroll they fly into their slots on an example page, the dashed slots fade as each one lands and a tile bar rises. The handle field cycles example names, validates as you type, can check availability against your endpoint and puts the visitor's handle in the page's address.",
    },
    { name: "Navigation and dock", detail: "A white pill bar that narrows on scroll, with a highlight that glides to the active section and a phone menu that grows out of the bar. A dock at the bottom carries the visitor's handle (\"Claim inlay.me/ines\") and steps aside wherever the page already has a call to action." },
    {
      name: "Pay",
      detail:
        "An ultramarine stage where payment chips fly in from the edges and land in a live balance that rolls like an odometer, with feed rows sliding in. Tabs roll between balance, this month and paid out, and Pay out empties the balance while its button morphs through busy and done.",
    },
    { name: "Story", detail: "Four chapters (tips, bookings, payouts, privacy) beside one pinned picture that rises into place for each chapter while the panel changes colour and the checks draw in." },
    { name: "Built in", detail: "A carousel of five features that advances only while on screen, with a dot that fills as its timer, hover and focus to hold, a pause button, drag, swipe and arrow keys." },
    { name: "Early access", detail: "An inline email form whose button morphs from Join to Joining to You're on the list, among icon tiles that drift at different depths as you scroll." },
    { name: "Storefront", detail: "As you scroll, the product tile on the page grows into the checkout, a payment bar sweeps across, the sheet reshapes into the receipt and \"+€48.00 to your balance\" rises out, with a three-step indicator following along." },
    { name: "Connect", detail: "Platform marks float around the headline; hairlines draw from each one toward it and pulses keep travelling inward. Pointing at a platform lights its line and names it." },
    { name: "Build", detail: "A tilted board where a cursor performs each step: a tile drops into a free spot, another is resized while its neighbours make room, a tall tile is dragged across and the grid rearranges. The board flattens on hover; steps are clickable." },
    { name: "Showcase, pricing, FAQ, footer", detail: "Six creator pages in two rows that drift with scroll. Free beside Plus with a monthly/yearly switch, rolling price and a billing note that slides from the side you chose. A two-column FAQ. A footer that opens on the visitor's own address set in tiles that drop into place, plus a newsletter form." },
    { name: "Pages", detail: "Privacy and terms placeholders and a custom 404." },
  ],
  customizeIntro:
    "Every heading, tile, plan and destination lives in site.config.ts. Put one phrase of any heading in [brackets] to set it in a tile. Swap the pictures in public/images for screenshots of your own product at similar proportions.",
  customize: [
    { what: "Brand, copy, tiles, balance card, chapters, plans, FAQ and links", where: "site.config.ts" },
    { what: "Sign-up, login, handle check, waitlist and newsletter endpoints", where: "site.config.ts → links" },
    { what: "Hero tile slots and waiting positions", where: "site.config.ts → page, styles/hero.css" },
    { what: "Palette and type", where: "styles/base.css, app/layout.tsx" },
    { what: "Logo mark and platform marks", where: "components/ui/Brand.tsx, components/ui/Platforms.tsx" },
    { what: "Pictures (shapes in the README)", where: "public/images/" },
    { what: "Section order", where: "app/page.tsx" },
  ],
  fonts: ["Mona Sans"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Original poster art, product screens and creator pages made for the template and shipped as WebP. The mark, icons and platform marks are SVG.",
  node: "20.9",
  files: 85,
  lines: 4847,
  beforeLaunch:
    "Replace the fictional brand, creators and figures. Set `links.signup` (and `links.login`, `links.handleCheck`, `links.waitlistEndpoint`, `links.newsletterEndpoint` if you have them), plan links and `site.url` in `site.config.ts`, and swap in screenshots of your own product.",
  updated: "2026-10-10",
};
