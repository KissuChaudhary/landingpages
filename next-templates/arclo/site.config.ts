export const site = {
  brand: "Arclo",
  title: "Arclo — Make work flow",
  description:
    "A thoughtful workspace for building AI agents, connecting your tools and putting repetitive work on autopilot.",
  email: "hello@example.com",
  links: { app: "", contactEndpoint: "", waitlistEndpoint: "" },
  hero: {
    announcement: "A new way to make work flow",
    title: ["Automate your work.", "Make room for more."],
    description:
      "Build, connect and launch AI agents that take care of the everyday. From your first lead to your next big idea, all in one workspace.",
    primary: "Try a workflow",
    secondary: "Explore the platform",
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      monthly: 0,
      annual: 0,
      audience: "A little automation goes a long way.",
      features: [
        "2 active agents",
        "1 workflow",
        "100 runs per month",
        "Community support",
      ],
      limits: ["2", "1", "100", "7 days"],
      monthlyHref: "",
      annualHref: "",
    },
    {
      id: "pro",
      name: "Pro",
      monthly: 19,
      annual: 180,
      audience: "For small teams with big ideas.",
      features: [
        "10 active agents",
        "5 workflows",
        "2,000 runs per month",
        "Analytics & email support",
      ],
      limits: ["10", "5", "2,000", "30 days"],
      monthlyHref: "",
      annualHref: "",
    },
    {
      id: "business",
      name: "Business",
      monthly: 49,
      annual: 468,
      audience: "More possibilities. Fewer limits.",
      features: [
        "Unlimited agents",
        "Unlimited workflows",
        "10,000 runs per month",
        "Priority support & team roles",
      ],
      limits: ["Unlimited", "Unlimited", "10,000", "90 days"],
      monthlyHref: "",
      annualHref: "",
    },
  ],
  faq: [
    {
      question: "What can I put on autopilot?",
      answer:
        "Start with a repeatable task: qualify an incoming lead, summarize an inbox or prepare a new teammate’s onboarding checklist. The examples on this site let you explore each workflow using a small local dataset.",
    },
    {
      question: "Do I need to know how to code?",
      answer:
        "The visual builder presents triggers, instructions and actions as connected steps. You can try the included examples without writing code. Connect your own product to turn these previews into production automations.",
    },
    {
      question: "What happens to the data in the preview?",
      answer:
        "Workflow examples run entirely in your browser. They don’t access your accounts or send messages. Contact and waitlist forms submit only when you configure an endpoint; otherwise you can save a local brief.",
    },
    {
      question: "How quickly can I try my first workflow?",
      answer:
        "Choose an example, review its source data and press Run workflow. Each step produces a visible result, and you can download the completed run as JSON. No account is needed to explore.",
    },
    {
      question: "Can I use my existing tools?",
      answer:
        "This template includes visual examples for email, spreadsheets, documents and team messaging. The integration diagrams are editable. Authentication, provider permissions and live connections belong in your own application.",
    },
  ],
  footer: {
    headline: ["Automate the everyday.", "Create the extraordinary."],
    closing: ["Less busywork.", "More possibility."],
    description: "Your next great idea deserves your full attention.",
  },
};
export type Plan = (typeof site.plans)[number];
