export interface Campaign {
  slug: string;
  brand: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  color: string;
  summary: string;
  challenge: string;
  idea: string;
  deliverables: string[];
  moments: { title: string; description: string }[];
}
export const campaigns: Campaign[] = [
  {
    slug: "common-ground",
    brand: "Common Ground",
    title: "Make a morning\nworth repeating.",
    category: "Positioning / Lifecycle",
    image: "/images/common-ground.webp",
    alt: "Coral and black Common Ground coffee bags beside a turquoise espresso cup",
    color: "coral",
    summary:
      "A coffee subscription built around the small ritual people look forward to. A campaign concept connecting a considered first order to the next everyday cup.",
    challenge:
      "A subscription needs more than a good first offer. The brand needs a reason to become part of a customer's routine, without turning every message into a discount.",
    idea: "Build the story around the morning, rather than the mechanics of a subscription. Warm product imagery, a clear tasting choice and a thoughtful welcome journey make the first order feel like the start of something.",
    deliverables: [
      "Brand and offer direction",
      "Campaign art direction",
      "Welcome journey",
      "Replenishment message framework",
    ],
    moments: [
      {
        title: "Find your morning",
        description:
          "An introduction grounded in taste, routine and a clear first choice.",
      },
      {
        title: "Make it yours",
        description:
          "A welcome sequence helps the customer get the most from the coffee.",
      },
      {
        title: "Keep the ritual",
        description:
          "Timely replenishment messages give the next order a useful context.",
      },
    ],
  },
  {
    slug: "pace-supply",
    brand: "Pace Supply",
    title: "A little further.\nOn your terms.",
    category: "Strategy / Creative",
    image: "/images/pace-supply.webp",
    alt: "Off-white running shoes with forest panels and coral laces on a silver cube",
    color: "blue",
    summary:
      "A running brand for the everyday miles. A campaign concept that gives performance creative a more human starting point.",
    challenge:
      "Technical product features can blur together in a crowded category. The opportunity is to connect a credible shoe to the kind of running people actually want to do.",
    idea: "Move the story from personal records to personal rhythm. Confident product still life and concise creative territories put the everyday runner at the centre, with a clear reason to explore the shoe.",
    deliverables: [
      "Audience and proposition",
      "Creative territories",
      "Product campaign direction",
      "Testing and landing-page plan",
    ],
    moments: [
      {
        title: "A reason to run",
        description: "A simple human insight leads each creative angle.",
      },
      {
        title: "A reason to choose",
        description:
          "Product detail gives the idea substance on the landing page.",
      },
      {
        title: "A reason to keep going",
        description:
          "Post-purchase content helps the shoe become part of a routine.",
      },
    ],
  },
  {
    slug: "sola",
    brand: "Sola",
    title: "A daily ritual.\nA longer relationship.",
    category: "Acquisition / Retention",
    image: "/images/sola.webp",
    alt: "Lime Sola daily-care bottle and jar in a lilac studio scene",
    color: "lilac",
    summary:
      "A daily-care brand with a simpler point of view. A campaign concept connecting the first product discovery to a considered skincare routine.",
    challenge:
      "The first purchase is only one moment in a daily-care journey. A clear introduction, useful product education and well-timed follow-up need to work together.",
    idea: "Give a simple daily ritual a distinctive visual world. Lime packaging and lilac campaign imagery create recognition; a connected journey makes the proposition clear before and after checkout.",
    deliverables: [
      "Audience and offer mapping",
      "Product campaign art direction",
      "Landing-page content",
      "Welcome and replenishment journey",
    ],
    moments: [
      {
        title: "Meet a simpler routine",
        description:
          "A distinctive product world and a clear introduction earn attention.",
      },
      {
        title: "Start with confidence",
        description:
          "Useful product information connects curiosity to the first purchase.",
      },
      {
        title: "Make it a daily habit",
        description:
          "Care instructions and thoughtful reminders support the next order.",
      },
    ],
  },
];
export const findCampaign = (slug: string) =>
  campaigns.find((item) => item.slug === slug);
