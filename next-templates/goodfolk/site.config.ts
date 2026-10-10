/** Start here. All contact actions are ordinary links; no service is required. */
export const site = {
  brand: "Goodfolk",
  title: "Goodfolk — Content with a pulse",
  description:
    "An independent social and creator studio. We turn a brand’s point of view into content people want to spend time with.",
  url: "", // Your canonical https:// domain, without a trailing slash.
  email: "hello@example.com",
  contactHref:
    "mailto:hello@example.com?subject=Let%E2%80%99s%20make%20something",
  contactLabel: "Let’s talk",
  location: "Independent minds. Everywhere.",
  availability: "Open for good collaborations",
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "What we do", href: "/#approach" },
    { label: "The studio", href: "/#studio" },
  ],
  hero: {
    eyebrow: "The independent social & creator studio",
    lines: ["Less ad.", "More alive."],
    description:
      "We bring brands into the conversation. Creator-led content, sharp strategy, and a little unexpected energy.",
    primaryLabel: "Find your people",
    secondaryLabel: "Explore the work",
    caption: "Real energy. A clear point of view.",
    sticker: "Made to\nfeel something.",
    image: "/images/creator.webp",
    imageAlt:
      "A smiling creator in a blue T-shirt holding a green skateboard against a mint backdrop",
    insetImage: "/images/sip.webp",
    insetAlt: "A creator enjoying a drink in front of a coral backdrop",
  },
  approach: {
    eyebrow: "A different kind of chemistry",
    headline:
      "People don’t fall in love with a content calendar. They fall in love with a feeling.",
    description:
      "The right story. In the right hands. Told in a way that belongs in the feed. We connect those dots, then keep making it better.",
    closing: "Small team. Big feel.",
  },
  work: {
    eyebrow: "Selected collaborations / 01—03",
    title: "A little proof.\nA lot of personality.",
    description:
      "Different brands. Different worlds. The same obsession with making something worth a second look.",
  },
  process: {
    eyebrow: "How it comes together",
    title: "Good instincts.\nA better process.",
    description:
      "A close creative partnership, from the first conversation to the next great idea.",
  },
  engagements: {
    eyebrow: "Make room for good content",
    title: "Your next chapter,\non your terms.",
    description:
      "Start with a focused launch or bring us into your everyday rhythm. Two clear ways to work together.",
  },
  studio: {
    eyebrow: "The people behind the feeling",
    title: "A small studio.\nA shared obsession.",
    description:
      "We’re strategists, makers, and very online people. We like honest conversations, ambitious brands, and ideas that feel a little too good to leave in the group chat.",
    note: "Close to the work. Closer to you.",
    image: "/images/studio.webp",
    imageAlt: "A creative team working together around a studio table",
  },
  journal: {
    eyebrow: "From the studio notebook",
    title: "Things on our mind.",
  },
  faqs: [
    {
      question: "What kinds of brands do you work with?",
      answer:
        "We work with consumer brands that have a clear point of view, or want help finding one. Lifestyle, food, beauty, and culture are our favorite places to start. A first conversation helps us both decide whether it’s a good fit.",
    },
    {
      question: "Can we start with one campaign?",
      answer:
        "Absolutely. The Campaign Sprint gives us a focused brief, a defined set of deliverables, and a clear finish line. An ongoing partnership can follow when it makes sense.",
    },
    {
      question: "Do you find the creators as well?",
      answer:
        "Yes. Creator research, outreach, briefing, and creative direction can all be part of the scope. We agree usage rights, licensing periods, and production costs before anything goes into production.",
    },
    {
      question: "How involved will our team need to be?",
      answer:
        "We ask for an initial workshop, one person to consolidate feedback, and agreed review windows. You stay close to the decisions without having to manage every moving part.",
    },
    {
      question: "What happens after the content goes live?",
      answer:
        "We look at the signals that matter for the brief, capture what we learn, and recommend what to try next. Content is a creative practice, and each round should give the next one a better starting point.",
    },
  ],
  closing: {
    eyebrow: "Your people are out there.",
    title: "Give them\nsomething to feel.",
    label: "Let’s make it happen",
  },
  // Add only destinations you actually use. Empty arrays hide optional links.
  socials: [] as { label: string; href: string }[],
  legalLinks: [] as { label: string; href: string }[],
};
