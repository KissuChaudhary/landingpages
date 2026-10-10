import type { TemplateItem } from "../templates";
import type { TemplateDetails } from "../template-details";

export const turnoutTemplate: TemplateItem = {
  slug: "turnout",
  title: "Turnout: Experiential & Events Studio",
  category: "Landing Pages",
  defaultTheme: "light",
  badge: "Agency & Motion",
  description:
    "A motion-led site for a studio that runs pop-ups, launch nights and community programs. Words drift along a lime ribbon behind a self-shuffling photo deck, the page goes dark while the usual problems float past and get crossed out, services stack like folders, photos orbit a single link and the page lifts away to reveal the footer.",
  tags: ["Agency", "Events", "Motion", "Photography", "Light Theme", "Next.js 15"],
  features: [
    "Ribbon of words that drifts on its own and speeds up with your scroll",
    "Self-shuffling photo deck, a pinned problem scene and folder-stacked services",
    "Five case studies, a filterable work index, journal and a working contact form",
    "Rolling prices, morphing labels, a pause control and full reduced-motion support",
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
    "A complete studio site with original positioning: Turnout designs, builds and films brand experiences (pop-ups, launch nights, run clubs, supper clubs and creator trips) and turns each one into a season of content. Photography carries the page, a lime ribbon ties it together, and every label, figure and card that changes moves instead of swapping.",
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
        "A three-line headline with a lime marker that draws in, a photo deck that shuffles itself on a CSS timer (tap, swipe or the arrow to advance, pause to hold), a lime ribbon of words that drifts behind it and speeds up with scroll, a latest-project card and the main call to action.",
    },
    { name: "Navigation", detail: "A dark pill bar that narrows as you scroll, a highlight that glides between links and rests on the section you're reading, and a phone menu that grows out of the bar." },
    { name: "Client strip", detail: "An endless strip of fictional client wordmarks that pauses on hover and with the motion control." },
    {
      name: "Problem scene",
      detail:
        "The headline stays pinned while the page turns dark and five problems drift past. Each is crossed out as it passes the middle, then the headline morphs into the answer and the page turns light again.",
    },
    { name: "Mission and proof", detail: "A statement that lights up word by word, threads that draw themselves as you scroll, and two photo rows with figures that roll up." },
    { name: "Featured work", detail: "A wide card and four squares; each metric morphs into \"Read the case study\" on hover and links to a full case study page." },
    { name: "Orbit", detail: "Photos from every project circle one link and turn as you scroll; the ring opens when you point at the link." },
    { name: "Services", detail: "Four colour cards stack like folders as you scroll, with tabs that stay visible as an index you can jump from; the covered card dims and its photo settles back." },
    { name: "Comparison", detail: "Two askew cards, the usual way and yours, that swing into place; the checks on yours draw in sequence and hovering straightens a card." },
    { name: "Process", detail: "Four steps in a row; pointing at one widens it to show when it happens and what you get, and its icon draws itself." },
    { name: "Client notes and team", detail: "A featured quote with a portrait beside four shorter notes, then six portraits pinned along a thread whose name tags slide out on hover." },
    { name: "Pricing", detail: "Two retainers with a quarterly/yearly switch, rolling prices, a billing note that slides in from the side you chose, and a custom option; plan buttons open the contact form with the plan filled in." },
    { name: "Journal, FAQ and closing", detail: "Three articles, an accordion beside a sticky title and a dark closing panel with a line that draws itself." },
    { name: "Footer", detail: "The page lifts away to reveal a lime footer: links, contact details, a newsletter form whose button morphs through each state and a wordmark that rises letter by letter." },
    { name: "Pages", detail: "A filterable /work index, five case studies with facts, results, story, gallery and quote, three journal articles, a contact page, privacy and terms placeholders and a custom 404." },
  ],
  customizeIntro:
    "Every heading, paragraph, plan and destination lives in site.config.ts, and the case studies and articles are plain data files. Replace the photos in public/images with your own at similar proportions.",
  customize: [
    { what: "Brand, copy, ribbon words, services, team, plans, FAQ and links", where: "site.config.ts" },
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
  lines: 5227,
  beforeLaunch:
    "Replace the fictional studio, clients, people, figures and case studies. Set `links.booking`, `links.contactEndpoint` and `links.newsletterEndpoint` (or keep the email fallbacks), plan links and `site.url` in `site.config.ts`, and swap in your own photography.",
  updated: "2026-10-10",
};
