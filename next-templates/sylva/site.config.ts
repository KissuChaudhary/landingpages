/** Buyer entry point. Change copy, imagery and destinations here first. */
export const site = {
  brand: "Sylva",
  descriptor: "Botanical interiors",
  title: "Sylva — A little more life, indoors.",
  description:
    "Thoughtful plants, considered spaces. Sylva brings living greenery into homes, workspaces and the places we come together.",
  locale: "en-GB",
  copyrightYear: 2026,
  links: {
    booking: "", // Your booking URL. Empty uses the included project enquiry.
    contactEndpoint: "", // Optional public POST endpoint; keep credentials on your server.
    email: "", // Your studio email; empty hides email links.
    instagram: "", // Empty hides the social link.
  },
  navigation: [
    { label: "Our approach", href: "/#approach" },
    { label: "The plants", href: "/#plants" },
    { label: "Our spaces", href: "/#spaces" },
    { label: "Plant care", href: "/care" },
  ],
  hero: {
    eyebrow: "Considered greenery. Everyday living.",
    lineOne: "A little more life,",
    lineTwo: "indoors.",
    description:
      "A quiet corner. A brighter workspace. A room that feels like you. We find the right plants for your space — and help them feel at home.",
    primary: "Find your greenery",
    secondary: "Explore our approach",
    image: "/images/monstera.webp",
    backdrop: "/images/interior.webp",
    note: "Good things take root.",
  },
  approach: {
    eyebrow: "01 / A living point of view",
    title: "More than a plant.",
    accent: "A feeling of home.",
    description:
      "We look at the light, the rhythm of your day, and the way you use a room. Then we bring it all together with greenery that belongs there. Nothing overfilled. Nothing out of place.",
    image: "/images/nursery.webp",
  },
  collection: {
    eyebrow: "02 / Meet your next green companion",
    title: "Good company,",
    accent: "naturally.",
    description:
      "Sculptural leaves, soft silhouettes, a little wildness. A few of our favourites, each with a character of its own.",
    cta: "Explore the collection",
  },
  process: {
    eyebrow: "03 / From our hands to your home",
    title: "Chosen with care.",
    accent: "Placed with purpose.",
    description:
      "A beautiful room begins with a good conversation. We make space for your ideas, pair them with our plant knowledge, and keep things simple from the first visit to the first new leaf.",
    image: "/images/potting.webp",
    steps: [
      {
        id: "consultation",
        number: "01",
        title: "Get to know your space",
        body: "Tell us about your room, its light and the way you live. We start with what is already there, and what you would love it to become.",
      },
      {
        id: "styling",
        number: "02",
        title: "Find your natural fit",
        body: "Together, we choose the plants, scale and planters that suit the space. A calm desk corner and a statement entrance need different kinds of greenery.",
      },
      {
        id: "aftercare",
        number: "03",
        title: "Settle in, keep growing",
        body: "We help with placement and a practical care rhythm. You leave with guidance for your chosen plants, so the next chapter feels as good as the first.",
      },
    ],
  },
  care: {
    eyebrow: "04 / Room to grow",
    title: "A little guidance.",
    accent: "A lasting connection.",
    description:
      "The right plant is only the beginning. We help you understand what it needs, without turning care into a chore.",
    benefits: [
      {
        number: "01",
        title: "Light comes first",
        body: "Every recommendation starts with your windows, your light, and where a plant will actually live.",
        icon: "sun",
      },
      {
        number: "02",
        title: "Care that fits your day",
        body: "Simple observations and a considered watering rhythm, tailored to the greenery you choose.",
        icon: "drop",
      },
      {
        number: "03",
        title: "Details that belong",
        body: "Natural textures and thoughtful proportions. A planter should feel as considered as the plant.",
        icon: "pot",
      },
      {
        number: "04",
        title: "Here for the next leaf",
        body: "Clear guidance to come back to, from settling in to repotting when your plant needs more room.",
        icon: "leaf",
      },
    ],
  },
  spaces: {
    eyebrow: "05 / Places made greener",
    title: "Life looks good",
    accent: "here.",
    description:
      "Homes, workspaces and gathering places. Three ways to bring the outside a little closer.",
  },
  faqs: [
    {
      question: "Where do we start?",
      answer:
        "Start with a project enquiry. Share the kind of space, the light it receives and any plants you already have. From there, your studio can suggest a consultation and a suitable scope.",
    },
    {
      question: "Can you help with just one corner?",
      answer:
        "Absolutely. A single well-placed plant can change the feel of a room. Tell us what you have in mind and we can work from there.",
    },
    {
      question: "What if I am new to plants?",
      answer:
        "That is a lovely place to begin. We focus on greenery suited to your room and your routine, with straightforward care notes for each plant.",
    },
    {
      question: "Do you work with offices and hospitality spaces?",
      answer:
        "Yes. Our approach works for homes, shared workspaces and places people gather. Installation, maintenance and delivery arrangements are agreed as part of each project.",
    },
    {
      question: "Can I choose the planter as well?",
      answer:
        "Yes. Plant and planter are considered together: shape, texture, scale and practical drainage. Final options are confirmed with your studio before an order is placed.",
    },
  ],
  closing: {
    eyebrow: "A new leaf starts here",
    title: "Make room",
    accent: "for a little life.",
    description:
      "Tell us about your space. We will help you find its greener side.",
    cta: "Let's grow something",
  },
  footer: {
    note: "Thoughtful plants. Considered spaces.",
    small: "Rooted in nature. Made for everyday life.",
  },
};
export const bookingHref = () => site.links.booking || "/contact";
