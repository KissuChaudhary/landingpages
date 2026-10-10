import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const plumbTemplate: TemplateItem = {
  slug: "plumb",
  title: "Plumb: Indie SaaS Launch Page",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Indie SaaS & Motion",
  description:
    "A motion-led landing page for an indie SaaS product, written for privacy-first analytics. The live counter sits in the headline like a word, then pulls out of the sentence and becomes the install line, the dashboard, a live view, the weekly email and a phone before it lands in the navigation as the sign-up button. Every bar in the comparison is drawn to scale, the founder's letter signs itself and the footer clocks your visit.",
  tags: ["SaaS", "Indie", "Analytics", "Motion", "Light Theme", "Next.js 15"],
  features: [
    "One surface that changes shape through the whole product tour, with the live number riding through every screen",
    "Chapters are data: any number of lines, screens and phones, each with its own image",
    "Usage-based pricing slider, scrubbable changelog and a full /changelog page",
    "Sign-up pill that opens in place, rolling numbers everywhere, full reduced-motion support",
  ],
  accentColor: "from-indigo-300 to-slate-900",
  previewUrl: "/preview/plumb",
  standaloneUrl: "/demos/plumb/index.html",
  demoUrl: "/demo/plumb",
  detailUrl: "/template/plumb",
  thumbnailUrl: "/previews/card/plumb.webp",
};

export const plumbDetails: TemplateDetails = {
  name: "Plumb",
  kind: "Motion-led indie SaaS landing page template",
  summary:
    "A complete launch page for a product made by a small team, written for Plumb, a fictional privacy-first analytics tool. One ink surface carries the hero and the whole tour: it starts as the live visitor counter inside the headline and changes shape, chapter by chapter, into each part of the product, then docks into the navigation's sign-up button. Built for makers who sell software with a founder's voice: a usage slider for pricing, a changelog that proves you ship and a letter signed by hand.",
  bestFor: [
    "Indie and small-team SaaS: analytics, forms, scheduling, newsletters, developer and AI tools",
    "Products with an install snippet, an embed or a link that starts everything",
    "Founders who want a page that feels made by people, with real motion craft",
  ],
  design:
    "Funnel Display headlines with Funnel Sans for reading and Geist Mono for code. A white page with cool greys, an ink surface and one ultramarine accent. Hairlines instead of shadows, product screens in dark UI rendered as images, and a plumb line for a mark. No photographs.",
  sections: [
    {
      name: "Hero and tour",
      detail:
        "The headline carries a live counter as a word. Scroll and the sentence drifts apart while the counter becomes the install line (with a working Copy button), opens into the dashboard, narrows to the live view, turns into the weekly email and a phone, and flies into the navigation's Start free button. The counter lands on each screen's own slot. Chapters are configurable: line, screen or phone, as many as you need.",
    },
    { name: "Navigation", detail: "A clear bar that turns white with a hairline on scroll, a hairline that glides to the link you point at and rests on the section you're reading, and a phone menu that opens the bar downward." },
    { name: "Drawn to scale", detail: "Each row draws a typical setup's bar across the page as you scroll, with its figure rolling up; then ours drops in, so thin at this scale that it is a hairline." },
    { name: "Feature grid", detail: "Nine smaller features in a hairline grid whose lines draw themselves, cells that rise in a diagonal wave and icons that draw their own strokes." },
    { name: "Testimonials", detail: "One quote at a time at display size, chosen by its people, with a ring for a timer and a rolling rating." },
    { name: "Pricing", detail: "One plan priced by traffic: drag through the tiers on a log scale, the price rolls, the plan's name morphs and a switch rolls every figure to its yearly price." },
    { name: "Founder's letter", detail: "Paragraphs brighten as they're read and the signature, one pen stroke, writes itself in step with your scroll. Four facts sit under a hairline." },
    { name: "Changelog", detail: "The newest releases on a ruler of days you can scrub or play, linking to a full /changelog page with filters and a trace that a bead rides down." },
    { name: "FAQ and closing", detail: "An accordion beside a sticky intro, then an ink panel with a plumb line dropping in and a sign-up pill that widens into an email field in place." },
    { name: "Footer", detail: "Links, then a giant odometer clock of the time spent on the page: we counted you once, without a cookie." },
    { name: "Pages", detail: "A full changelog page, privacy and terms placeholders and a custom 404." },
  ],
  customizeIntro:
    "Every heading, chapter, plan and destination lives in site.config.ts, and the releases are a plain data file. Replace the product screens in public/images with your own and keep each chapter's aspect true to its image.",
  customize: [
    { what: "Brand, copy, tour chapters, comparison, plans, letter, FAQ and links", where: "site.config.ts" },
    { what: "Releases (home page and /changelog)", where: "data/changelog.ts" },
    { what: "Sign-up page, form endpoint and the live counter's endpoint", where: "site.config.ts → links, signup, live" },
    { what: "Palette and type", where: "app/globals.css, app/layout.tsx" },
    { what: "Product screens (sizes in the README)", where: "public/images/" },
    { what: "Section order", where: "app/page.tsx" },
  ],
  fonts: ["Funnel Display", "Funnel Sans", "Geist Mono"],
  dependencies: ["next", "react", "react-dom"],
  styling: "Tailwind CSS v4",
  images: "Five original product screens in dark UI, rendered at 2× and shipped as WebP, about 220 KB in all. The mark, wordmarks, icons and signature are SVG.",
  node: "20.9",
  files: 59,
  lines: 7778,
  beforeLaunch:
    "Replace the fictional product, people, figures and releases. Set `links.signup`, `signup.endpoint` (or keep the email fallback), `live.endpoint` for a real counter, `links.email` and `meta.url` in `site.config.ts`, and swap in screenshots of your own product.",
  updated: "2026-10-10",
};
