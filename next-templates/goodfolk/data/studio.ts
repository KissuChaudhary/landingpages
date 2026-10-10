export const capabilities = [
  {
    number: "01",
    title: "Find the story.",
    detail:
      "A point of view, a creative direction, and a plan that gives every piece a purpose.",
    tags: ["Social strategy", "Creative direction"],
  },
  {
    number: "02",
    title: "Make it human.",
    detail:
      "People who get your world. Content that sounds, looks, and feels like it belongs there.",
    tags: ["Creator partnerships", "Content production"],
  },
  {
    number: "03",
    title: "Keep it moving.",
    detail:
      "An ongoing rhythm of making, listening, and building on the ideas that connect.",
    tags: ["Social management", "Creative iteration"],
  },
];
export const process = [
  {
    title: "Listen closely",
    label: "01 / The direction",
    headline: "First, find\nthe real story.",
    body: "We get into your world: your people, your product, and what makes you different. Together, we turn that into a creative direction with room for personality.",
    outputs: [
      "Brand immersion workshop",
      "Audience & culture research",
      "Creative territory & brief",
    ],
    visual: "direction",
  },
  {
    title: "Make together",
    label: "02 / The making",
    headline: "Good ideas need\ngreat company.",
    body: "We match the idea with the right voices, build the creative, and stay close to the details. Your team has one point of contact and clear moments to review.",
    outputs: [
      "Creator casting & briefing",
      "Shoot, edit & art direction",
      "Platform-ready content",
    ],
    visual: "making",
  },
  {
    title: "Learn & repeat",
    label: "03 / The next idea",
    headline: "The next round\nstarts smarter.",
    body: "We pay attention to what people watch, save, share, and talk about. Then we turn those signals into practical creative decisions for the next round.",
    outputs: [
      "A clear campaign readout",
      "Creative learnings & recommendations",
      "Your next content direction",
    ],
    visual: "learning",
  },
] as const;
export const engagements = [
  {
    number: "01",
    name: "Campaign Sprint",
    label: "One big moment",
    price: "$4,800",
    cadence: "starting project fee",
    description:
      "A focused burst of creator content for a launch, a new story, or a fresh direction.",
    included: [
      "Creative strategy & campaign concept",
      "Creator shortlist & production direction",
      "A scoped content delivery package",
    ],
    cta: "Plan a sprint",
  },
  {
    number: "02",
    name: "Studio Partnership",
    label: "An ongoing rhythm",
    price: "$6,400",
    cadence: "starting monthly fee",
    description:
      "Your extended creative team. A consistent point of view, with new ideas every month.",
    included: [
      "Monthly planning & creative direction",
      "Ongoing content production & publishing",
      "Creative review & next-round learnings",
    ],
    cta: "Build a partnership",
  },
];
