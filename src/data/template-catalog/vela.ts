import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";
export const velaTemplate: TemplateItem = {
  slug: "vela", title: "Vela: Relationship & CRM Workspace",
  category: "Landing Pages", defaultTheme: "light", badge: "CRM & Customer Success",
  description: "A vivid coral launch for relationship-led products. Precise Manrope typography, a working revenue view, stacking account chapters, guided setup, connected tools and clear pricing, built as a self-contained Next.js project.",
  tags: ["CRM", "Customer Success", "Scroll Motion", "Coral", "Next.js 15"],
  features: [
    "Coral hero with a subtly tilting dashboard, period selection and inspectable revenue bars",
    "Three stacking chapters with editable account, follow-up and renewal scenes",
    "Keyboard-accessible setup tabs, tool connections, billing selection and native FAQs",
    "Configurable signup, booking, checkout and contact destinations without marketing popups",
  ],
  accentColor: "from-orange-400 to-red-500",
  previewUrl: "/preview/vela", standaloneUrl: "/demos/vela/index.html",
  demoUrl: "/demo/vela", detailUrl: "/template/vela", thumbnailUrl: "/previews/card/vela.webp",
};
export const velaDetails: TemplateDetails = {
  name: "Vela", kind: "CRM and customer success landing page template",
  summary: "A clear launch for relationship-led products. A vivid coral hero and editable dashboard lead into stacking chapters, guided setup, connected tools, team stories and plans that send visitors to your product.",
  bestFor: ["CRM and account management products", "Customer success and renewal platforms", "Service team and collaboration tools"],
  design: "Coral and espresso, precise Manrope typography, white framed sections and quiet sage, peach and lilac fields. A centered opening, wide dashboard, three signal cards, three overlapping chapters, guided setup, connected tools, two stories, aligned plans and a split FAQ.",
  sections: [
    { name: "Hero and dashboard", detail: "A fine diagonal field, scroll tilt, two workspace views, period selection, inspectable monthly revenue bars and a follow-up summary." },
    { name: "Signals and product story", detail: "Three overview cards and three stacking chapters for account context, follow-ups and renewals. Chapters read normally on smaller screens." },
    { name: "Principles and setup", detail: "Four benefits and three keyboard-accessible steps with coordinated illustrations." },
    { name: "Connections and stories", detail: "An editable six-tool diagram and two fictional team perspectives." },
    { name: "Pricing and questions", detail: "Three plans, monthly/yearly selection, exact annual totals and savings, configurable checkout links and native disclosures." },
    { name: "Closing and footer", detail: "A coral closing, complete navigation and a remembered motion pause control." },
    { name: "Contact", detail: "Validated request builder with selected plan and billing, configured JSON submission, mail draft or an explicit local-file fallback." },
  ],
  customizeIntro: "Start in site.config.ts for your brand, copy and destinations. Example records and coded scenes live in focused files.",
  customize: [
    { what: "Brand, copy, metadata, plans and destinations", where: "site.config.ts" },
    { what: "Revenue, accounts and follow-ups", where: "data/preview.ts" },
    { what: "Palette, typography and controls", where: "styles/base.css" },
    { what: "Product interfaces", where: "components/product/" },
    { what: "Section order", where: "app/page.tsx" },
    { what: "Contact delivery", where: "site.config.ts and components/ContactForm.tsx" },
  ],
  fonts: ["Manrope"], dependencies: ["next", "react", "react-dom", "lucide-react"], styling: "CSS",
  images: "Original editable React, SVG and CSS artwork and initial-based avatars. No remote images or stock photography.",
  node: "20.9", files: 57, lines: 2919,
  beforeLaunch: "Replace fictional teams, stories, figures, plans and connections. Configure signup, booking, checkout and contact. Connect your own CRM, accounts, storage and billing; product views use illustrative local records.",
  updated: "2026-10-10",
};
