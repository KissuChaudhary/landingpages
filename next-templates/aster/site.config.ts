export type Billing = "monthly" | "annual";
export const site = {
  brand: "Aster",
  title: "Aster — a little more human support",
  description:
    "A thoughtful support workspace. Bring your knowledge, conversations and people into one clear picture.",
  links: { app: "", contactEndpoint: "", contactEmail: "" },
  hero: {
    announcement: "A clearer support day",
    heading: ["Good support.", "A little more human."],
    text: "Meet the AI workspace that makes room for your customers. Helpful answers, thoughtful handoffs, and a team that stays in the loop.",
    cta: "Try Aster",
  },
  features: {
    label: "What Aster brings",
    heading: ["A good answer.", "The right next step."],
    items: [
      {
        title: "Make the everyday easier",
        text: "Find the useful answer in your knowledge, right when a customer needs it.",
        scene: "answer",
      },
      {
        title: "Keep your knowledge close",
        text: "Help articles and clear policies give every conversation a stronger starting point.",
        scene: "knowledge",
      },
      {
        title: "Leave room for a person",
        text: "When a question needs care, your team gets the context to pick it up.",
        scene: "handoff",
      },
    ],
  },
  benefits: {
    label: "A calmer way to work",
    heading: ["One shared space.", "More thoughtful support."],
    items: [
      {
        title: "See what needs your attention.",
        text: "A shared view makes the work easier to read. Keep an eye on what is resolved, what is waiting, and where your team can help.",
        scene: "performance",
        art: "grass",
        cta: "Explore the overview",
        view: "reporting",
      },
      {
        title: "Sound like the people behind your product.",
        text: "Start with your own words and policies. Review a suggested answer, give it your voice, and keep its source in sight.",
        scene: "voice",
        art: "blossom",
        cta: "Try a conversation",
        view: "inbox",
      },
      {
        title: "Make a little room for tomorrow.",
        text: "Give the routine a useful rhythm. Sort the queue, review the handoffs, and begin the next day with a clearer picture.",
        scene: "queue",
        art: "grass",
        cta: "Review the queue",
        view: "triage",
      },
    ],
  },
  useCases: {
    label: "Ways to work",
    heading: ["Every conversation.", "A place to begin."],
  },
  trust: {
    label: "Thoughtful by design",
    heading: ["Clear boundaries.", "People in the loop."],
    text: "A good support experience makes its sources, decisions and next steps easy to understand.",
    items: [
      {
        title: "Know the source",
        text: "Keep the relevant help article beside the suggested answer.",
        icon: "book",
      },
      {
        title: "Choose the handoff",
        text: "Give complex questions a person, a reason and a clear owner.",
        icon: "people",
      },
      {
        title: "See the changes",
        text: "Review the local activity trail when a ticket changes state.",
        icon: "history",
      },
      {
        title: "Keep the context",
        text: "Export the conversation and its sources for a useful review.",
        icon: "download",
      },
    ],
  },
  pricing: {
    label: "Find your fit",
    heading: ["A simple start.", "Room to grow."],
    text: "Choose a workspace that fits the way your team works.",
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      annual: 0,
      text: "For a first look at a more thoughtful support day.",
      features: [
        "100 example resolutions",
        "One support channel",
        "Knowledge and source context",
        "Human handoff",
        "Conversation exports",
      ],
      cta: "Start exploring",
      checkout: { monthly: "", annual: "" },
    },
    {
      id: "team",
      name: "Team",
      monthly: 59,
      annual: 49,
      text: "For teams making more room for their customers.",
      features: [
        "2,000 resolutions per month",
        "Chat, email and help desk",
        "Triage and reporting",
        "Shared knowledge library",
        "Five team members",
      ],
      cta: "Make room for your team",
      checkout: { monthly: "", annual: "" },
    },
    {
      id: "scale",
      name: "Scale",
      monthly: null,
      annual: null,
      text: "For a bigger conversation about your support needs.",
      features: [
        "Everything in Team",
        "Custom resolution volume",
        "Workspace and access options",
        "A tailored onboarding plan",
        "A dedicated point of contact",
      ],
      cta: "Talk to us",
      checkout: { monthly: "", annual: "" },
    },
  ],
  story: {
    label: "A clearer picture",
    heading: ["Good work starts", "with a little context."],
    quote:
      "We wanted a support day with room to think. Seeing the question, its source and the next step together is a good place to start.",
    person: "Nina Shah",
    role: "Support lead at Willow",
    note: "An illustrative team story with local sample data.",
  },
  perspectives: {
    label: "A few familiar perspectives",
    heading: ["Less noise.", "More room for people."],
    note: "Fictional teams and original portraits. Replace with your customer stories.",
  },
  faq: {
    label: "A little clarity",
    heading: ["A few good questions.", "Some useful answers."],
    items: [
      {
        q: "What can I try in the workspace?",
        a: "Open the local example inbox, find a ticket, edit its draft and resolve or hand it off. You can search knowledge, filter the queue, review its metrics and export a report. These actions use local example data.",
      },
      {
        q: "Does this demo send replies to customers?",
        a: "No. Resolving or handing off a ticket changes its state in the local demonstration. It does not send a message or connect a customer account.",
      },
      {
        q: "Where do the suggested answers come from?",
        a: "Each sample ticket has a suggested draft linked to a local help article. The template makes that source visible. Connect your production search, retrieval and AI services for your own product.",
      },
      {
        q: "How does annual billing work?",
        a: "The example Team plan is $59 each month, or $588 billed once per year. Annual billing works out to $49 per month and saves $120 over twelve monthly payments. The plan review shows the full amount before you continue.",
      },
      {
        q: "Can I use my own brand and product?",
        a: "Yes. Brand, copy, plans and destinations live in site.config.ts. Tickets, knowledge, connection guides and team perspectives have separate editable data files. All product interfaces are built in React.",
      },
      {
        q: "Can I connect my existing help desk?",
        a: "The connection directory shows example fields and scopes. Connect your provider, authentication and consent flow when adapting the template to your real service.",
      },
    ],
  },
  closing: {
    label: "For your next support day",
    heading: ["Make room for", "a better conversation."],
    text: "Bring the question. Keep the context. Give your people a little more space.",
    cta: "Explore Aster",
  },
  footer: {
    text: "A thoughtful workspace for the people on both sides of the conversation.",
    note: "Fictional brand. Working local examples.",
  },
};
export const appHref = (view = "inbox") =>
  site.links.app || `/workspace?view=${view}`;
