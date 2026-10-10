import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const turnoutTemplate: TemplateItem = {
  slug: "turnout",
  title: "Turnout: Experiential & Events Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Agency & Motion",
  description:
    "A photo-led site for a studio that runs pop-ups, launch nights and community programs. Photo capsules sit inside the headline, a filmstrip drifts beneath it, an attention chart draws on scroll, services stack like folders and a ten-week timeline guides the process.",
  tags: ["Agency", "Events", "Motion", "Photography", "Light Theme", "Next.js 15"],
  features: [
    "Photo-capsule headline, scrolling filmstrip and a season of content",
    "Animated attention chart, folder-stacked services and ten-week process timeline",
    "Five case studies, a filterable work index, journal and a working contact form",
    "Rolling prices, morphing labels and full reduced-motion support",
  ],
  accentColor: "from-lime-200 to-indigo-300",
  previewUrl: "/preview/turnout",
  standaloneUrl: "/demos/turnout/index.html",
  demoUrl: "/demo/turnout",
  detailUrl: "/template/turnout",
  thumbnailUrl: "/previews/card/turnout.webp",
};

export const turnoutDetails: TemplateDetails = {
  name: "Turnout",
  kind: "Motion-led experiential agency and events studio template",
  summary:
    "A complete studio site: Turnout designs, builds and films brand experiences (pop-ups, launch nights, run clubs, supper clubs and creator trips) and turns each one into a season of content. Photo capsules, a filmstrip, an attention chart and a scrolling season connect the story, with rolling figures and morphing labels throughout.",
  bestFor: [
    "Event, experiential and brand activation agencies",
    "Creative studios, hospitality and community brands that sell in-person work",
    "Any agency that wants a photo-led, motion-first site with real case study pages",
  ],
  design:
    "Bricolage Grotesque headings at tight optical sizes with Geist for reading. A neutral paper page, near-black ink and one acid-lime accent, with periwinkle, stone and blush colouring the service, process and result cards. Rounded photo frames, pill controls and 1px rings, no drop shadows. Twenty-six original photographs, all generated for the template.",
  sections: [
    {
      name: "Hero",
      detail:
        "A two-line headline with cycling photo capsules, a scrolling photo filmstrip, a latest-project link and the main call to action.",
    },
    { name: "Navigation", detail: "A dark pill bar that narrows as you scroll, a highlight that glides between links and rests on the section you're reading, and a phone menu that grows out of the bar." },
    { name: "Client strip", detail: "An endless strip of fictional client wordmarks that pauses on hover." },
    {
      name: "Problem scene",
      detail:
        "A pinned chart draws a typical launch's attention curve, then Turnout's longer tail; five problem markers are crossed out and the headline morphs into the answer.",
    },
    { name: "Season of content", detail: "A statement lights up word by word, then a horizontal photo story follows the event through its edit, creator posts and report. Phones use a swipeable row." },
    { name: "Featured work", detail: "Three drifting photo columns link to five full case studies and the work index." },
    { name: "Services", detail: "Four colour cards stack like folders as you scroll, with tabs that stay visible as an index you can jump from; the covered card dims and its photo settles back." },
    { name: "Comparison", detail: "A paired ledger crosses out the usual way and draws checks down Turnout's lime column." },
    { name: "Process", detail: "A scroll-driven ten-week timeline highlights four steps and fades their details into reserved space, keeping the cards steady." },
    { name: "Case study spotlight", detail: "Selectable project tabs coordinate a photo wipe, case study copy, rolling results and a link to the full story." },
    { name: "Client notes and team", detail: "A featured quote sits beside a rising feed of shorter notes, followed by six portraits whose name tags slide out on hover." },
    { name: "Pricing", detail: "Two retainers with a quarterly/yearly switch, rolling prices, a billing note that slides in from the side you chose, and a custom option; plan buttons open the contact form with the plan filled in." },
    { name: "Journal, FAQ and closing", detail: "Three articles, an accordion beside a sticky title and a dark closing panel with a line that draws itself." },
    { name: "Footer", detail: "The page lifts away to reveal a lime footer: links, contact details, a newsletter form whose button morphs through each state and a wordmark that rises letter by letter." },
    { name: "Pages", detail: "A filterable /work index, five case studies with facts, results, story, gallery and quote, three journal articles, a contact page, privacy and terms placeholders and a custom 404." },
  ],
  customizeIntro:
    "Every heading, paragraph, plan and destination lives in site.config.ts, and the case studies and articles are plain data files. Replace the photos in public/images with your own at similar proportions.",
  customize: [
    { what: "Brand, copy, photo capsules, filmstrip, services, team, plans, FAQ and links", where: "site.config.ts" },
    { what: "Case studies (cards, /work and each case study page)", where: "data/work.ts" },
    { what: "Journal articles", where: "data/articles.ts" },
    { what: "Booking link, contact and newsletter endpoints", where: "site.config.ts → links" },
    { what: "Palette and type", where: "styles/base.css, app/layout.tsx" },
    { what: "Photos (shapes in the README)", where: "public/images/" },
    { what: "Section order", where: "app/page.tsx" },
  ],
  fonts: ["Bricolage Grotesque", "Geist"],
  dependencies: ["next", "react", "react-dom"],
  styling: "CSS",
  images:
    "Twenty-six original photographs generated for the template and shipped as WebP, about 1.8 MB in all. The mark, client wordmarks and icons are SVG.",
  node: "20.9",
  files: 95,
  lines: 5692,
  beforeLaunch:
    "Replace the fictional studio, clients, people, figures and case studies. Set `links.booking`, `links.contactEndpoint` and `links.newsletterEndpoint` (or keep the email fallbacks), plan links and `site.url` in `site.config.ts`, and swap in your own photography.",
  updated: "2026-10-10",
};
