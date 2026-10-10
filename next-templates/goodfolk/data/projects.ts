export interface Project {
  slug: string;
  name: string;
  category: string;
  year: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
  tone: string;
  challenge: string;
  idea: string;
  outcome: string;
  deliverables: string[];
}
/** Fictional campaign concepts. Replace with your own portfolio before launch. */
export const projects: Project[] = [
  {
    slug: "day-off",
    name: "Day Off",
    category: "Culture / Creator campaign",
    year: "2026",
    headline: "A little less routine.\nA little more outside.",
    description:
      "Giving an everyday movement brand a world that feels as good as getting out of the house.",
    image: "/images/creator.webp",
    alt: "Day Off campaign concept: a creator holding a green skateboard",
    tone: "mint",
    challenge:
      "Day Off needed a launch story that made everyday movement feel accessible. The brief was to make the brand feel like an invitation, with less polished performance language and more real-life energy.",
    idea: "We built the campaign around small detours: a longer walk home, a first skate lesson, an afternoon without a plan. Creators brought their own rituals and personalities to a consistent visual direction.",
    outcome:
      "A creator-first launch system with a hero portrait, short-form story directions, a reusable edit language, and a simple publishing rhythm. Each piece adds to the same recognizable world.",
    deliverables: [
      "Campaign creative direction",
      "Creator briefing framework",
      "Portrait & short-form concepts",
      "Social launch toolkit",
    ],
  },
  {
    slug: "good-sip",
    name: "Good Sip",
    category: "Food & drink / Social launch",
    year: "2026",
    headline: "A good taste.\nAn even better mood.",
    description:
      "A bright, character-filled launch for a drink made for small, happy rituals.",
    image: "/images/sip.webp",
    alt: "Good Sip campaign concept: a creator enjoying a red-orange can",
    tone: "coral",
    challenge:
      "Good Sip wanted to stand out in a feed full of product promises. The story needed to show how the drink fits into a day, with a light touch and an unmistakable personality.",
    idea: "The creative territory was the first-sip feeling. Instead of a list of ingredients, each concept begins with a moment: an afternoon break, a catch-up, or a small reason to stop and enjoy something.",
    outcome:
      "An expressive set of launch concepts, a color-led photography direction, creator prompts, and modular edits that give the brand a consistent voice across formats.",
    deliverables: [
      "Social launch direction",
      "Creator story prompts",
      "Campaign portrait concept",
      "Platform edit framework",
    ],
  },
  {
    slug: "in-good-company",
    name: "In Good Company",
    category: "Community / Brand storytelling",
    year: "2026",
    headline: "Make space\nfor your people.",
    description:
      "Turning a creative community into a story about the people who make it feel like home.",
    image: "/images/studio.webp",
    alt: "In Good Company campaign concept: a creative team at a shared table",
    tone: "lilac",
    challenge:
      "The community had a strong identity in person, but its social presence focused on the space. It needed a way to tell the story of the people, rituals, and relationships that make the place matter.",
    idea: "We moved the camera toward the everyday: shared tables, half-finished ideas, and conversations between work. A warm documentary direction gives each member a voice in the brand.",
    outcome:
      "A people-led story system, a practical interview guide, an editorial photography direction, and repeatable social formats for the community’s own team to make their own.",
    deliverables: [
      "Community story strategy",
      "Editorial photo direction",
      "Member interview framework",
      "Repeatable social formats",
    ],
  },
];
