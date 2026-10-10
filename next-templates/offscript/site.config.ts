/** The studio's identity, copy and destinations. Campaigns and articles live in data/. */
export const site = {
  brand: "Offscript",
  title: "Offscript — A little off script. A lot more you.",
  description:
    "An independent creative studio for brands with a point of view. Strategy, campaigns and social-first creative, all in good company.",
  url: "https://example.com",
  year: 2026,
  links: {
    email: "hello@example.com",
    booking: "",
    instagram: "",
    linkedin: "",
  },
  navigation: [
    {
      label: "The work",
      href: "#work",
      note: "A few different points of view",
    },
    {
      label: "The studio",
      href: "#studio",
      note: "Small team. Wide horizons.",
    },
    {
      label: "Our approach",
      href: "#process",
      note: "From first thought to final frame",
    },
    {
      label: "Work together",
      href: "#pricing",
      note: "Find your kind of partnership",
    },
  ],
  hero: {
    eyebrow: "Independent creative. In good company.",
    lines: ["A little off script.", "A lot more you."],
    description:
      "We turn what makes your brand different into something people feel. Clear thinking. Unexpected creative. A point of view that’s yours.",
    primary: "Come see what we mean",
    note: "Strategy, campaigns & social-first creative",
  },
  work: {
    eyebrow: "01 / Selected creative worlds",
    title: ["Different brands.", "Same restless curiosity."],
    description:
      "Three self-initiated directions. Three different ways to make a brand feel like itself.",
  },
  studio: {
    eyebrow: "02 / The way we see it",
    statement:
      "People don’t fall in love with content. They fall in love with a point of view.",
    description:
      "We’re an independent studio for brands with a little something about them. We get close, ask the awkward questions, and build a creative world you can call your own.",
    note: "Good taste is a start. Good thinking takes it somewhere.",
    principles: [
      "Curiosity before certainty",
      "A clear idea, beautifully made",
      "Good people, in it together",
    ],
    image: "/images/studio.webp",
    imageCaption:
      "A shared table. A few strong opinions. Plenty of room for yours.",
  },
  services: {
    eyebrow: "03 / What we bring",
    title: ["From finding your voice", "to making it heard."],
    items: [
      {
        title: "Find the angle.",
        short: "Strategy & direction",
        description:
          "Before we make anything, we find the thing worth saying. Your audience, your difference, your next move.",
        tags: ["Brand positioning", "Cultural research", "Creative strategy"],
        graphic: "strategy",
      },
      {
        title: "Make it felt.",
        short: "Creative & production",
        description:
          "We build a world around the idea. Art direction, imagery and words that feel like they belong together.",
        tags: ["Art direction", "Campaigns & shoots", "Design & editing"],
        graphic: "creative",
      },
      {
        title: "Let it travel.",
        short: "Social & iteration",
        description:
          "Good creative has a life beyond launch. We adapt it, put it in the right places, and keep learning.",
        tags: ["Platform creative", "Content planning", "Creative testing"],
        graphic: "social",
      },
    ],
  },
  process: {
    eyebrow: "04 / First thought → final frame",
    title: ["The good part", "is getting there."],
    description:
      "A close collaboration, with room for the unexpected. Here’s how an idea becomes a whole creative world.",
    steps: [
      {
        title: "Get curious",
        label: "The question",
        description:
          "We listen to your story, meet your audience, and explore what makes the brand yours. Then we agree on one clear direction.",
        output: "A brief with a point of view",
        details: [
          "Brand & audience conversations",
          "Creative territories",
          "An agreed brief",
        ],
      },
      {
        title: "Make the leap",
        label: "The exploration",
        description:
          "We turn the direction into words, images and a connected campaign. You’re in the conversation, from the first rough idea to the final detail.",
        output: "A world, built around the idea",
        details: [
          "Concept & art direction",
          "Design & production",
          "Considered feedback rounds",
        ],
      },
      {
        title: "Give it a life",
        label: "The release",
        description:
          "The final frame is only the beginning. We prepare the work for its channels, make the handoff clear, and reflect on what connects.",
        output: "Creative ready for the real world",
        details: [
          "Platform-ready assets",
          "Launch & handoff",
          "A shared creative review",
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "05 / A good fit, by design",
    title: ["One great moment.", "Or a longer conversation."],
    description:
      "Two ways to make good work together. The same care, at a different rhythm.",
    plans: [
      {
        name: "A campaign",
        category: "A focused creative world",
        price: "$3,500",
        suffix: "projects from",
        description:
          "For a launch, a new product, or a story that deserves its moment.",
        features: [
          "Strategy & campaign direction",
          "A tailored set of creative assets",
          "Two feedback rounds",
          "Final files for your channels",
        ],
        timing: "Scope & schedule agreed together",
        cta: "Let’s talk about your idea",
      },
      {
        name: "A partnership",
        category: "A seat at your table",
        price: "$4,800",
        suffix: "per month, from",
        description:
          "An ongoing creative partner who knows your brand and keeps it moving.",
        features: [
          "A shared creative roadmap",
          "Strategy, design & production",
          "Regular content development",
          "Monthly review & next steps",
        ],
        timing: "A monthly scope shaped around you",
        cta: "Let’s find our rhythm",
      },
    ],
    note: "Example starting fees. Production expenses, media spend and specialist services are scoped separately.",
  },
  faq: [
    {
      question: "Who do you work with?",
      answer:
        "Independent consumer brands, ambitious founders and teams looking for a more distinctive creative presence. A clear point of view matters more to us than the size of the business.",
    },
    {
      question: "Can we start with one project?",
      answer:
        "Of course. A focused campaign is a great way to get to know each other. We agree on the direction, deliverables, schedule and fee before the work begins.",
    },
    {
      question: "Can you work with our in-house team?",
      answer:
        "Yes. We can lead the creative or work alongside your team, photographer or media partner. We agree on responsibilities at the start so collaboration stays clear.",
    },
    {
      question: "How do feedback rounds work?",
      answer:
        "We bring you into the conversation early and set clear review moments. Your proposal defines the rounds and who signs off each stage.",
    },
    {
      question: "What should we bring to the first call?",
      answer:
        "Your point of view, a little ambition and whatever questions are on your mind. We’ll talk about what you want to change and what a useful partnership might look like.",
    },
  ],
  closing: {
    eyebrow: "The next good idea could be yours.",
    title: ["Go on.", "Go a little off script."],
    cta: "Tell us what’s on your mind",
    note: "A conversation is a good place to start.",
  },
  footer: {
    note: "Independent thinking.\nCollective energy.",
    location: "A creative studio for the independently minded.",
    tagline: "A little off script. A lot more you.",
  },
} as const;
