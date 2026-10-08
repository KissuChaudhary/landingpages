// All brands, projects and rates below are fictional demonstration content.
// Replace the contact email, portfolio and prices before publishing your studio.
export interface Project {
  id: string;
  name: string;
  title: string;
  category: "Beauty" | "Objects";
  medium: string;
  image: string;
  alt: string;
  description: string;
  deliverables: string[];
  year: string;
}

export interface ShootFormat {
  id: string;
  name: string;
  description: string;
  setup: number;
  perImage: number;
  imagesPerProduct: number;
  turnaround: string;
}

export const site = {
  brand: {
    name: "stillform",
    descriptor: "Independent image-making studio",
    email: "hello@stillform.studio",
    location: "Based in London. Working everywhere.",
    availability: "Open for new projects",
    copyright: "© 2026 Stillform Studio",
  },
  meta: {
    title: "Stillform — Product photography & CGI",
    description:
      "Considered images for considered products. An independent product photography and CGI studio creating campaigns, packshots and visual worlds for ambitious brands.",
  },
  nav: [
    { label: "Selected work", href: "#work" },
    { label: "The studio", href: "#studio" },
    { label: "The process", href: "#process" },
    { label: "Investment", href: "#investment" },
  ],
  hero: {
    eyebrow: "Product photography / Art direction / CGI",
    lead: "Good products.",
    accent: "Great presence.",
    description:
      "We turn things into things you feel. Considered photography and CGI for brands with something worth looking at.",
    cta: "Explore our work",
    project: "SOLA — A study in golden hour",
    note: "Campaign photography · Art direction",
    image: "/images/sola-campaign.webp",
    alt: "Amber SOLA fragrance with a spherical chrome cap on a terracotta pedestal in warm directional sunlight.",
    caption: "Light, material, a little imagination.",
  },
  specialties: [
    "Beauty & skincare",
    "Fragrance",
    "Design objects",
    "Consumer technology",
  ],
  work: {
    eyebrow: "01 / Selected work",
    lead: "Every object has",
    accent: "a point of view.",
    description: "We find it. Then we make it impossible to scroll past.",
    filters: ["All work", "Beauty", "Objects"],
    openLabel: "Explore project",
    projects: [
      {
        id: "nori",
        name: "NORI",
        title: "A softer kind of science.",
        category: "Beauty",
        medium: "Photography + set design",
        image: "/images/nori-campaign.webp",
        alt: "NORI skincare tubes and a silver-lidded jar beside a sculptural pistachio set and travertine plinth.",
        description:
          "A tactile visual world for a quieter skincare ritual. Soft greens, honest materials and light you can almost feel.",
        deliverables: [
          "Creative direction",
          "Campaign stills",
          "Product detail crops",
          "Digital & social formats",
        ],
        year: "2026",
      },
      {
        id: "sola",
        name: "SOLA",
        title: "Bottling the golden hour.",
        category: "Beauty",
        medium: "Photography + art direction",
        image: "/images/sola-campaign.webp",
        alt: "SOLA amber perfume bottle casting glass caustics on a warm cream and terracotta set.",
        description:
          "A fragrance translated into a feeling. We built a world around amber glass, sculptural forms and the last light of the day.",
        deliverables: [
          "Visual concept",
          "Campaign photography",
          "Clean packshots",
          "E-commerce image set",
        ],
        year: "2026",
      },
      {
        id: "tempo",
        name: "TEMPO",
        title: "Sound, given shape.",
        category: "Objects",
        medium: "CGI + creative direction",
        image: "/images/tempo-campaign.webp",
        alt: "Sculptural cobalt blue over-ear headphones on a reflective curved chrome cylinder against a blue studio backdrop.",
        description:
          "A precise study in colour, form and reflection. A bold CGI campaign that makes an audio product feel as good as it sounds.",
        deliverables: [
          "CGI product rendering",
          "Lighting & material studies",
          "Launch campaign stills",
          "Multi-format crops",
        ],
        year: "2026",
      },
    ] satisfies Project[],
  },
  studio: {
    eyebrow: "02 / The studio",
    lead: "Small team.",
    accent: "A very good eye.",
    manifesto:
      "We believe the best product images don't just show you what something looks like. They show you why it matters.",
    description:
      "We're image makers, set builders and detail obsessives. We work directly with your team, from the first reference to the last retouch. One considered visual language, wherever your brand shows up.",
    principles: [
      {
        number: "01",
        title: "Idea before image",
        text: "We start with your product and its point of difference. The moodboard comes second.",
      },
      {
        number: "02",
        title: "Details do the talking",
        text: "The right reflection. The texture of a cap. The shadow that makes a flat image feel real.",
      },
      {
        number: "03",
        title: "Built for the real world",
        text: "A campaign hero and a product page have different jobs. We plan for both from the start.",
      },
    ],
  },
  shots: {
    eyebrow: "03 / One product, more possibilities",
    lead: "The same product.",
    accent: "A different feeling.",
    description:
      "From the clarity of a product page to the atmosphere of a campaign. Every frame has a purpose.",
    options: [
      {
        id: "campaign",
        label: "The campaign",
        index: "01",
        image: "/images/sola-campaign.webp",
        alt: "Art-directed SOLA fragrance campaign with warm sunlight and terracotta set.",
        title: "Make them feel something.",
        description:
          "A visual world with its own light, colour and character. Made for launches, homepages and moments that deserve attention.",
        tags: ["Art direction", "Set design", "Brand campaigns"],
        zoom: false,
      },
      {
        id: "packshot",
        label: "The packshot",
        index: "02",
        image: "/images/sola-packshot.webp",
        alt: "Front-facing SOLA amber fragrance bottle on a clean warm-white background.",
        title: "Let the product speak.",
        description:
          "Clean, consistent images with true materials and careful reflections. The details your customer needs to say yes.",
        tags: ["E-commerce", "Colour accuracy", "Clean backgrounds"],
        zoom: false,
      },
      {
        id: "detail",
        label: "The detail",
        index: "03",
        image: "/images/sola-packshot.webp",
        alt: "Close crop of SOLA fragrance showing ribbed amber glass and the product label.",
        title: "Get a little closer.",
        description:
          "A closer crop that reveals what a wider frame can't. Texture, finish and the small details that make your product yours.",
        tags: ["Material details", "Close crops", "Product pages"],
        zoom: true,
      },
    ],
  },
  services: {
    eyebrow: "04 / What we make",
    lead: "From first idea",
    accent: "to final frame.",
    description:
      "Choose the right ingredients for your project. We'll bring them together.",
    items: [
      {
        number: "01",
        name: "Product photography",
        text: "Precise packshots, thoughtful details and styled still lifes. Beautiful images that work as hard as your product does.",
        tags: ["Packshots", "Still life", "E-commerce"],
        format: "catalog",
      },
      {
        number: "02",
        name: "Campaign & art direction",
        text: "One clear idea, a world built around it. From reference and palette to sets, lighting and the final campaign.",
        tags: ["Creative concept", "Set design", "Campaign stills"],
        format: "campaign",
      },
      {
        number: "03",
        name: "CGI & digital worlds",
        text: "Images without the limits of a physical set. Materials you can feel, impossible compositions, considered down to the pixel.",
        tags: ["3D rendering", "Material studies", "Product launches"],
        format: "cgi",
      },
    ],
  },
  process: {
    eyebrow: "05 / A good process makes good pictures",
    lead: "Clear from",
    accent: "the first hello.",
    description:
      "You know what's happening, what's next, and what you're getting. Creativity likes a little clarity.",
    steps: [
      {
        number: "01",
        name: "The conversation",
        timing: "Before we begin",
        text: "Your product, your people, your plans. We agree the scope, deliverables and a fixed quote before anything moves.",
        artifact: "A clear brief",
      },
      {
        number: "02",
        name: "The direction",
        timing: "Concept & planning",
        text: "We build the moodboard, choose the palette and map every shot. You approve the creative direction before production.",
        artifact: "An approved visual world",
      },
      {
        number: "03",
        name: "The making",
        timing: "Shoot or render",
        text: "Sets, lights, materials. We create your images and share a first selection for your consolidated feedback.",
        artifact: "A considered first selection",
      },
      {
        number: "04",
        name: "The finishing",
        timing: "Retouch & delivery",
        text: "The final polish. You receive organised, retouched files in the sizes and formats agreed in your brief.",
        artifact: "Your launch-ready image library",
      },
    ],
  },
  pricing: {
    eyebrow: "06 / Plan your shoot",
    lead: "A little clarity",
    accent: "before the brief.",
    description:
      "Every project is different. Build a starting estimate, then let's work out the details together.",
    currency: "USD",
    defaultFormat: "campaign",
    defaultProducts: 3,
    maxProducts: 12,
    formats: [
      {
        id: "catalog",
        name: "The essentials",
        description: "Clean product imagery",
        setup: 250,
        perImage: 30,
        imagesPerProduct: 3,
        turnaround: "5–7 working days",
      },
      {
        id: "campaign",
        name: "The campaign",
        description: "Styled, art-directed stills",
        setup: 650,
        perImage: 65,
        imagesPerProduct: 5,
        turnaround: "7–10 working days",
      },
      {
        id: "cgi",
        name: "The digital world",
        description: "CGI product imagery",
        setup: 950,
        perImage: 90,
        imagesPerProduct: 4,
        turnaround: "10–15 working days",
      },
    ] satisfies ShootFormat[],
    extras: {
      social: {
        label: "Add social crops",
        description: "Square + portrait versions",
        price: 120,
      },
      rush: {
        label: "Priority production",
        description: "Subject to studio availability",
        rate: 0.25,
      },
    },
    included: [
      "Creative planning",
      "Retouched final images",
      "One consolidated revision round",
      "Web + high-resolution files",
    ],
    note: "Planning estimate in USD, excluding tax, shipping, custom props and specialist production. Your scope and usage are confirmed in a fixed quote before we begin.",
    cta: "Take this into my brief",
  },
  faq: {
    eyebrow: "07 / Before you ask",
    lead: "Good questions.",
    accent: "Clear answers.",
    items: [
      {
        question: "Can you work with a brand outside London?",
        answer:
          "Yes. We work remotely with brands worldwide. For photography, you ship your products to the studio; for CGI, we start with reference images, dimensions and any available CAD files. Shipping, customs and return arrangements are agreed in your quote.",
      },
      {
        question: "What do you need to get started?",
        answer:
          "A short brief: what your product is, where the images will be used, how many you need and when you need them. References are welcome, but you don't need a finished creative direction. That's part of what we do.",
      },
      {
        question: "Do we need to choose photography or CGI?",
        answer:
          "No. We recommend the right approach for the product and the brief. Photography is ideal for real textures and physical styling. CGI offers control over materials, angles and sets that would be difficult to build. Some projects use both.",
      },
      {
        question: "What usage rights are included?",
        answer:
          "We agree the channels, territories and duration of your image licence before production. Digital brand channels are scoped into a standard brief. Print, retail and broader paid media usage can be included in your final quote.",
      },
      {
        question: "How do feedback and revisions work?",
        answer:
          "You'll approve the creative direction before production. Each project includes one consolidated round of feedback on the first image selection. Additional revisions or changes to an approved concept are quoted separately.",
      },
      {
        question: "Is the calculator a final quote?",
        answer:
          "It's a planning estimate. Product complexity, props, specialist equipment, usage and deadlines can change the scope. We send a fixed quote after reviewing your brief, so you know what you're approving before we start.",
      },
    ],
  },
  contact: {
    eyebrow: "08 / Make something worth looking at",
    lead: "Your product.",
    accent: "Our next obsession.",
    description:
      "Tell us a little about what you're making. We'll bring the questions, the ideas and a very good eye.",
    submit: "Prepare my project brief",
    note: "Prefer a conversation?",
    response: "A considered reply within two working days.",
    successTitle: "A good place to start.",
    successText:
      "Your brief is ready to share. Open an email draft or copy it into your preferred email app.",
  },
  footer: {
    statement: "Considered images. Lasting impressions.",
    backToTop: "Back to the top",
    note: "Photography / Art direction / CGI",
  },
};
