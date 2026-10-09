export type ThemeName = "graphite" | "paper" | "studio";
export type HeroLayout = "centered" | "split";
export type ArtworkCategory = "3D & objects" | "Photography" | "Worlds";

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  style: string;
  image: string;
  alt: string;
  prompt: string;
  background: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthly: number;
  annualMonthly: number;
  credits: string;
  features: readonly string[];
  featured?: boolean;
  href?: string;
}

// Edit the nouns, images, prices and links here. The same components can launch
// a photo editor, avatar app, design utility or another consumer product.
export const site = {
  brand: {
    name: "prism",
    descriptor: "A little imagination. A whole new world.",
  },
  meta: {
    title: "Prism — Your next idea. Made visible.",
    description:
      "A new space for your imagination. Explore, create and refine remarkable visuals with Prism.",
  },
  appearance: {
    defaultTheme: "graphite" as ThemeName,
    defaultHero: "split" as HeroLayout,
    showControls: true,
    storageKey: "prism-appearance-v1",
  },
  // Set to your app URL to replace the local interactive demo on primary CTAs.
  appUrl: "",
  // Paid plans start an email to this address until each has a checkout `href`.
  email: "hello@example.com",
  nav: [
    { label: "Explore", href: "#explore" },
    { label: "How it works", href: "#product" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    badge: "Meet your new creative space",
    title: "Your next idea.",
    accent: "Made visible.",
    description:
      "Turn a spark of imagination into something worth sharing. Create, refine, and make it unmistakably yours.",
    primary: "Start creating",
    secondary: "Find your inspiration",
    note: "A blank canvas. Endless possibilities.",
    proof: [
      "For the moodboard makers",
      "The late-night thinkers",
      "The what-if people",
    ],
  },
  workspace: {
    title: "Your creative space",
    project: "Untitled imagination",
    promptLabel: "Describe your idea",
    action: "Preview result",
    note: "Interactive preview · example results",
    styles: ["3D render", "Editorial", "Cinematic"],
  },
  gallery: {
    eyebrow: "A little inspiration",
    title: "See where an idea can go.",
    description: "Something surreal. Something simple. Something entirely you.",
    filters: ["All ideas", "3D & objects", "Photography", "Worlds"],
    note: "Original example artwork. Pick an image to explore its prompt.",
  },
  product: {
    eyebrow: "From what if, to what’s next",
    title: "One space. Every possibility.",
    description: "Follow your curiosity. The tools stay out of the way.",
    tabs: [
      {
        id: "create",
        label: "Create",
        number: "01",
        title: "Start with a thought.",
        description:
          "A few words, a rough direction, a wild idea. Find the look you had in mind—and the one you didn’t know you needed.",
        points: [
          "Explore different visual directions",
          "Save the ideas you want to come back to",
          "Make room for happy accidents",
        ],
      },
      {
        id: "refine",
        label: "Refine",
        number: "02",
        title: "Make it feel like you.",
        description:
          "Keep the idea. Change the mood. Fine-tune your direction without starting from a blank canvas every time.",
        points: [
          "Dial in colour and atmosphere",
          "Compare your original and your edit",
          "Stay in control of the details",
        ],
      },
      {
        id: "export",
        label: "Export",
        number: "03",
        title: "Good ideas deserve daylight.",
        description:
          "From your next post to your next big project. Choose a format that fits, and take your favourite creation with you.",
        points: [
          "Square, portrait or landscape",
          "A format for every destination",
          "Your creative work, ready to share",
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Built for the creative detour",
    title: "Less friction. More flow.",
    cards: [
      {
        title: "Find your visual language.",
        description:
          "Follow a style, mix it up, or make something wonderfully hard to label.",
      },
      {
        title: "Keep the good ones close.",
        description:
          "Your ideas, collected in one place. Ready for the next spark.",
      },
      {
        title: "A canvas for every idea.",
        description:
          "Go wide. Go tall. Give your imagination a little more room.",
      },
      {
        title: "Small changes. Big difference.",
        description:
          "A little warmer. A little bolder. The final touch is yours.",
      },
    ],
  },
  workflow: {
    eyebrow: "A very short learning curve",
    title: "Dream it. Shape it. Share it.",
    steps: [
      {
        title: "Bring an idea",
        description:
          "Describe a scene, a feeling, or something you can’t stop thinking about.",
        detail: "A chrome sculpture in lavender light…",
      },
      {
        title: "Follow your taste",
        description:
          "Explore a direction, adjust the details, and find the version that feels right.",
        detail: "3D render · Soft light · Square",
      },
      {
        title: "Make it yours",
        description:
          "Take it into your next project. A post, a pitch, a personal experiment.",
        detail: "Your next favourite creation",
      },
    ],
  },
  stories: {
    eyebrow: "Made for people with ideas",
    title: "A new part of your process.",
    note: "Illustrative creator stories · replace with your own community",
    quotes: [
      {
        quote:
          "The best part is finding a direction I wouldn’t have thought of on my own. It feels like a sketchbook that sketches back.",
        name: "Alex Morgan",
        role: "Independent designer",
        initials: "AM",
        color: "#ddd0fb",
      },
      {
        quote:
          "An idea used to live in my notes app for weeks. Now I can actually see it, change it, and decide where to take it.",
        name: "Jamie Park",
        role: "Content creator",
        initials: "JP",
        color: "#c4dfd4",
      },
      {
        quote:
          "It’s become the first place I go when a moodboard needs something a little unexpected.",
        name: "Sam Rivera",
        role: "Art director",
        initials: "SR",
        color: "#f1d1b6",
      },
    ],
  },
  pricing: {
    eyebrow: "Room to explore",
    title: "A little idea, or a big one.",
    description: "Start small. Make space for more when inspiration strikes.",
    currency: "$",
    annualLabel: "Save 20% on paid plans",
    note: "Illustrative product pricing. Plan selection is a preview; no payment is collected.",
    plans: [
      {
        id: "free",
        name: "Free",
        description: "For your first what if.",
        monthly: 0,
        annualMonthly: 0,
        credits: "50 credits / month",
        features: [
          "Explore the creative workspace",
          "Standard image exports",
          "Your own private collection",
        ],
      },
      {
        id: "creator",
        name: "Creator",
        description: "For a regular creative habit.",
        monthly: 20,
        annualMonthly: 16,
        credits: "2,000 credits / month",
        features: [
          "Everything in Free",
          "More room to create and refine",
          "High-resolution exports",
          "All visual styles",
        ],
        featured: true,
      },
      {
        id: "studio",
        name: "Studio",
        description: "For ideas that keep coming.",
        monthly: 40,
        annualMonthly: 32,
        credits: "5,000 credits / month",
        features: [
          "Everything in Creator",
          "Larger monthly credit allowance",
          "Organized project collections",
          "Priority support",
        ],
      },
    ] satisfies Plan[],
  },
  faq: {
    eyebrow: "A few good questions",
    title: "Curious? Good.",
    items: [
      {
        question: "What can I try in this preview?",
        answer:
          "Choose an example prompt, switch styles, browse the artwork, compare a colour edit, and try export settings. The workspace uses original preset images so you can explore the experience without an account.",
      },
      {
        question: "Does this page generate new images?",
        answer:
          "This is a landing-page demonstration. Preview result shows an existing example image; it does not call an AI model. A real product can connect this interface to its generation service.",
      },
      {
        question: "Can I use my own prompt?",
        answer:
          "Yes, you can type and edit a prompt in the workspace. The text stays in your browser during the session. The preview still shows the selected example rather than generating an image from your text.",
      },
      {
        question: "What happens when I choose a plan?",
        answer:
          "Each plan button goes to that plan’s checkout link. This demo does not create an account or collect payment, so the free plan opens the workspace and paid plans start an email until a product owner connects their own checkout.",
      },
      {
        question: "Can the look work for a different creative app?",
        answer:
          "Absolutely. The brand, artwork, wording, plans and links are configurable. The three visual themes and two hero layouts provide different starting points for photo tools, design apps and other creative products.",
      },
    ],
  },
  closing: {
    title: "That idea in your head?",
    accent: "Let’s see it.",
    description: "There’s a whole world on the other side of what if.",
    action: "Start with an idea",
  },
  footer: {
    copyright: "© 2026 Prism. A fictional creative app demo.",
    links: [
      { label: "Explore", href: "#explore" },
      { label: "The workspace", href: "#product" },
      { label: "Plans", href: "#pricing" },
      { label: "Questions", href: "#faq" },
    ],
  },
};

export const artworks: Artwork[] = [
  {
    id: "ribbon",
    title: "A study in possibility",
    category: "3D & objects",
    style: "3D render",
    image: "ribbon",
    alt: "A reflective chrome and lavender glass ribbon folded into a sculptural loop",
    prompt:
      "A liquid chrome ribbon, folded into an impossible knot. Translucent lilac glass, soft lavender light, a quiet studio backdrop.",
    background: "#aaa8dc",
  },
  {
    id: "headphones",
    title: "Soft sounds",
    category: "3D & objects",
    style: "3D render",
    image: "headphones",
    alt: "Mint and silver headphones against a clear sky-blue studio backdrop",
    prompt:
      "Sculptural mint headphones with polished silver details, floating in a sky-blue studio. Soft directional light, elevated product photography.",
    background: "#86bfd7",
  },
  {
    id: "portrait",
    title: "In her own light",
    category: "Photography",
    style: "Editorial",
    image: "portrait",
    alt: "An editorial portrait of a fictional woman in cobalt blue, lit by warm amber light",
    prompt:
      "A confident editorial portrait. Short sculptural curls, a cobalt jacket, amber studio light and the texture of analog film.",
    background: "#c4833d",
  },
  {
    id: "chair",
    title: "Somewhere slower",
    category: "Worlds",
    style: "Cinematic",
    image: "chair",
    alt: "A coral sculptural chair in the sand beside a warm stone arch",
    prompt:
      "A coral sculptural chair in ivory sand. A monumental travertine arch, a slice of blue sky, long afternoon shadows. A place to slow down.",
    background: "#e1b388",
  },
  {
    id: "botanical",
    title: "A brighter kind of still",
    category: "Photography",
    style: "Editorial",
    image: "botanical",
    alt: "Tangerines, green leaves and a blossom inside a clear glass block on a lime backdrop",
    prompt:
      "Tangerines and an orange blossom suspended in clear glass. Acid-yellow backdrop, hard daylight, impossible refractions and very real texture.",
    background: "#d7db23",
  },
  {
    id: "landscape",
    title: "Beyond the ordinary",
    category: "Worlds",
    style: "Cinematic",
    image: "landscape",
    alt: "A cobalt alpine lake below charcoal mountain peaks and an enormous pale peach sun",
    prompt:
      "A cobalt alpine lake beneath charcoal mountains. An impossibly large peach sun, dusty pink sky, a little mist. Quiet, cinematic, otherworldly.",
    background: "#354767",
  },
];
