export type ScenarioId = "week" | "research" | "draft";
export type SourceId = "notes" | "calendar" | "reading";
export type Theme = "light" | "dark";
export type Plan = {
  name: string;
  description: string;
  monthly: number;
  annual: number;
  features: string[];
  action: string;
  href: { monthly: string; yearly: string };
};
export const site = {
  brand: "relay",
  meta: {
    title: "Relay — A quieter way to move forward.",
    description:
      "An assistant for the things on your mind. Turn scattered thoughts into clear plans, useful answers, and words worth sharing.",
  },
  appearance: {
    defaultTheme: "light" as Theme,
    storageKey: "relay-appearance",
  },
  savedKey: "relay-saved-examples",
  links: { app: "", docs: "", email: "hello@example.com" },
  navigation: [
    { label: "Features", href: "#details" },
    { label: "How it works", href: "#workspace" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "Your personal AI workspace",
    first: "Meet your second mind.",
    second: "Make room for what matters.",
    description:
      "Bring the scattered pieces of your day together. Turn a thought into a clear plan, a useful answer, or words ready to share.",
    action: "Try the assistant",
    secondary: "See how it works",
  },
  workspace: {
    title: "Your workspace",
    tabs: [
      { id: "week" as ScenarioId, label: "Make a plan", short: "Plan" },
      { id: "research" as ScenarioId, label: "Find some clarity", short: "Explore" },
      { id: "draft" as ScenarioId, label: "Put it into words", short: "Write" },
    ],
    contextTitle: "Your context",
    contextDescription: "Only what you choose.",
    resultTitle: "A useful next step",
    note: "A fictional assistant. Three working local examples. Nothing is sent.",
    screenshot: null as null | { src: string; alt: string },
    customNotice:
      "This preview runs the three examples above. Your request is kept here; connect your own app to answer it.",
    sources: [
      {
        id: "notes" as SourceId,
        label: "Your notes",
        detail: "Ideas you’ve been keeping",
      },
      {
        id: "calendar" as SourceId,
        label: "Your week",
        detail: "A little room in the calendar",
      },
      {
        id: "reading" as SourceId,
        label: "Reading list",
        detail: "A few useful perspectives",
      },
    ],
  },
  details: {
    title: "Everything you need.\nAlready in the conversation.",
    description:
      "Less time moving between tools. More space to follow a thought through. Your context, your plans and your next step, connected.",
    rows: [
      {
        title: "Start with a thought.",
        text: "A question, a rough note, or the thing you have been meaning to do. There is no perfect way to begin.",
      },
      {
        title: "Bring your world in.",
        text: "Choose the notes, calendar and reading that matter to this moment. See exactly what shaped the response.",
      },
      {
        title: "Leave with momentum.",
        text: "Get a plan, an answer or a draft you can work with. Save it here, or take it anywhere.",
      },
      {
        title: "Pick up the thread.",
        text: "Keep the useful pieces close. Come back to a saved example or carry its text into your own tools.",
      },
    ],
  },
  possibilities: {
    title: "Small thoughts.\nUseful beginnings.",
    description: "There’s more than one way to make a little progress.",
    action: "Try this example",
  },
  control: {
    title: "You decide\nwhat comes along.",
    description:
      "Good assistance starts with clear boundaries. Choose the context for each example, see what was included, and keep the output you want.",
    items: [
      "Context is selected by you",
      "Examples stay in this browser",
      "Take your words into any tool",
    ],
    note: "Keep what helps. Leave the rest. You choose what becomes part of your next step.",
  },
  pricing: {
    title: "A little help.\nRoom to grow.",
    description: "Start small. Make more room when you need it.",
    note: "Illustrative product plans. This preview does not collect payment.",
    plans: [
      {
        name: "Everyday",
        description: "For the first thought and the next small step.",
        monthly: 0,
        annual: 0,
        features: [
          "Your personal workspace",
          "Context you can choose",
          "Saved examples and text exports",
        ],
        action: "Start with a thought",
        href: { monthly: "", yearly: "" },
      },
      {
        name: "Plus",
        description: "For a little more of what you want to make.",
        monthly: 15,
        annual: 144,
        features: [
          "Everything in Everyday",
          "More room for project context",
          "Your own connected workflows",
        ],
        action: "Make a little room",
        href: { monthly: "", yearly: "" },
      },
    ] satisfies Plan[],
  },
  faq: {
    title: "A few things to know.",
    items: [
      {
        question: "What can I try here?",
        answer:
          "Three prepared examples: a gentle weekly plan, a comparison of note-taking approaches, and an update drafted from notes. Choose context, replay the sequence, save an example or export its text.",
      },
      {
        question: "Is this connected to an AI model?",
        answer:
          "This landing-page preview works locally. It does not generate answers to arbitrary requests or connect to your accounts. The application destination is configurable for a real product.",
      },
      {
        question: "Where do saved examples go?",
        answer:
          "Only example IDs are stored in this browser’s local storage. Removing an example deletes that saved ID. No account or cloud sync is involved.",
      },
      {
        question: "Can I show my own assistant?",
        answer:
          "Yes. Replace the prepared scenarios and context labels, add your own product screenshot, and connect your application and pricing destinations in the typed config.",
      },
      {
        question: "What happens when I choose a plan?",
        answer:
          "You’ll see the selected plan, billing period and total. Monthly and yearly destinations can be connected independently to your real checkout. No payment is collected here.",
      },
    ],
  },
  closing: {
    title: "Make space for\nwhat’s next.",
    description: "One thought can change the shape of a day. Start with yours.",
    action: "Begin with a thought",
  },
  footer: {
    statement: "A quieter way to move forward.",
    note: "Relay is a fictional product demonstration.",
  },
};
