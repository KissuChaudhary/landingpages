export const site = {
  brand: "Daybreak",
  title: "Daybreak — a clearer day for marketing",
  description:
    "An intelligent marketing workspace. Bring your channels together, see what matters and move your next campaign forward.",
  links: { app: "", contactEndpoint: "", contactEmail: "" },
  hero: {
    label: "A clearer day for marketing",
    heading: ["Good mornings.", "Better marketing."],
    text: "Less time pulling reports. More room for your next good idea. Meet the AI workspace that brings your marketing into focus.",
    primary: "Start your day",
    secondary: "Talk to us",
    prompt: "Where should we focus our campaign budget?",
    suggestions: [
      "Review our channel performance",
      "Find the strongest campaign",
      "Prepare a weekly report",
    ],
  },
  product: {
    label: "A little clarity goes a long way",
    statement:
      "All your marketing, in a better light. Bring the signals together, understand the whole picture, and make your next move with confidence.",
    features: [
      {
        id: "insights",
        title: "A conversation with your data",
        text: "Ask a good question. Get a clear answer, with the numbers and sources right beside it.",
      },
      {
        id: "campaigns",
        title: "Every campaign, in context",
        text: "Compare spend, revenue and returns across your channels. Find the work worth building on.",
      },
      {
        id: "dashboard",
        title: "One calm place to see it all",
        text: "Your performance, your priorities, your next step. Together in a workspace that makes sense.",
      },
      {
        id: "workflows",
        title: "Good work, on repeat",
        text: "Turn a useful routine into a repeatable flow. Review the output before anything leaves your workspace.",
      },
    ],
  },
  integration: {
    label: "Make yourself at home",
    heading: "Your tools.\nWorking together.",
    text: "Keep the stack you love. Give your data a shared place to meet.",
    steps: [
      "Choose the sources that matter",
      "Set the scope of your connection",
      "Bring the picture together",
    ],
  },
  week: {
    label: "A week in a better light",
    heading: "Every morning starts\nwith one clear thing.",
    text: "Daybreak watches the numbers overnight, so each day opens with something worth your attention, and nothing that isn’t.",
    days: [
      {
        day: "Monday",
        short: "Mon",
        time: "8:00",
        title: "The weekly brief",
        text: "What moved, what didn’t and the one campaign worth a closer look, waiting before your first coffee.",
      },
      {
        day: "Tuesday",
        short: "Tue",
        time: "9:12",
        title: "A budget nudge",
        text: "A small, specific suggestion with the numbers beside it. Nothing moves until someone says yes.",
      },
      {
        day: "Wednesday",
        short: "Wed",
        time: "11:30",
        title: "A creative check-in",
        text: "Two versions, one clear leader. You see it before the rest of the budget does.",
      },
      {
        day: "Thursday",
        short: "Thu",
        time: "7:45",
        title: "Caught early",
        text: "When a campaign starts to slip, you hear about it midweek, not at the end of the month.",
      },
      {
        day: "Friday",
        short: "Fri",
        time: "16:00",
        title: "Ready for Monday",
        text: "The week wraps itself up, and next Monday’s brief is already scheduled for the people who need it.",
      },
    ],
  },
  trust: {
    label: "Calm by design",
    heading: "Clear about what\nit can touch.",
    text: "Daybreak reads your numbers. Anything that would change a campaign waits for a person.",
    principles: [
      {
        title: "Read-only to begin",
        text: "New connections start with reporting access. Nothing else.",
      },
      {
        title: "Changes wait for a yes",
        text: "Budget moves and pauses stay suggestions until someone approves them.",
      },
      {
        title: "Yours to take with you",
        text: "Reports, history and settings export whenever you like.",
      },
    ],
  },
  solutions: {
    label: "Room for the way you work",
    heading: "A good fit for every team.",
    text: "One focused workspace. Different ways to make it yours.",
  },
  stories: {
    label: "A few familiar perspectives",
    heading: "More space for the good work.",
    text: "Four example teams. One shared wish: less admin, more momentum.",
  },
  pricing: {
    label: "Find your starting point",
    heading: "Small start. Bright future.",
    text: "A little room to explore, or a workspace ready to grow with you.",
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      annual: 0,
      popular: false,
      description: "For a first look around.",
      cta: "Start exploring",
      features: [
        "1 workspace",
        "3 connected sources",
        "Weekly performance snapshots",
        "CSV report exports",
      ],
      checkout: { monthly: "", annual: "" },
    },
    {
      id: "pro",
      name: "Growth",
      monthly: 49,
      annual: 36,
      popular: true,
      description: "For teams finding their stride.",
      cta: "Make room to grow",
      features: [
        "Unlimited campaigns",
        "10 connected sources",
        "Custom reporting workflows",
        "5 team members",
      ],
      checkout: { monthly: "", annual: "" },
    },
    {
      id: "agency",
      name: "Studio",
      monthly: 149,
      annual: 109,
      popular: false,
      description: "For the work you do for others.",
      cta: "Build your studio",
      features: [
        "Everything in Growth",
        "15 client workspaces",
        "Branded report exports",
        "Flexible access controls",
      ],
      checkout: { monthly: "", annual: "" },
    },
  ],
  closing: {
    label: "Tomorrow looks promising",
    heading: "Make a little room\nfor what comes next.",
    text: "Your next good decision starts with a clearer picture.",
  },
  footer: {
    tagline: "A clearer day for marketing.",
    note: "Original example data and fictional teams. Ready to make your own.",
  },
  faq: [
    {
      question: "What can I try before connecting my tools?",
      answer:
        "Explore the example campaigns, ask a question, run the weekly-report workflow and download the results. The preview uses a shared local dataset, so you can see how the experience fits together.",
    },
    {
      question: "How does annual billing work?",
      answer:
        "Annual plans show an effective monthly price, billed once a year. Growth is $432 per year and Studio is $1,308 per year. The plan review always shows the full amount before you continue.",
    },
    {
      question: "Can my team review an automated report?",
      answer:
        "Yes. The example workflow ends at a review step, where you can inspect and download a report. Add your own approval and delivery service before sending reports to real recipients.",
    },
    {
      question: "Can I bring more than one client workspace?",
      answer:
        "The Studio plan is designed for separate client workspaces and branded reporting. Replace the included example allowances with the features of your own product.",
    },
  ],
} as const;
