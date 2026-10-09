export const site = {
  brand: "Conduit",
  meta: {
    title: "Conduit — From intent to action",
    description:
      "A clearer way to build, orchestrate and understand AI workflows. Bring your tools, data and agents into one connected system.",
  },
  announcement: "A new way to put your agents to work",
  links: { app: "", contactEndpoint: "", email: "hello@example.com", docs: "" },
  hero: {
    badge: "Intelligence, put to work",
    title: "Give your agents a clear path from intent to action.",
    description:
      "Connect your tools, bring your context, and let intelligent agents move work forward. One system, from the first instruction to the final result.",
    primary: "Start building",
    secondary: "Talk to us",
  },
  problem: {
    label: "The disconnect",
    title: "Your tools are connected. Your work should be, too.",
    items: [
      {
        icon: "layers",
        title: "Too many moving parts",
        description:
          "Information lives in one place. Decisions happen in another. Every handoff is another chance for something to get lost.",
      },
      {
        icon: "repeat",
        title: "The same work, again",
        description:
          "Copying, checking, chasing. The tasks that keep your team busy are rarely the ones that move your business forward.",
      },
      {
        icon: "scan",
        title: "No clear line of sight",
        description:
          "When a workflow stops, you need to know why. A trail of disconnected tools makes answers harder to find.",
      },
    ],
  },
  solution: {
    label: "A better way",
    title:
      "One place to build your agents. One connected system to put them to work.",
    features: [
      {
        label: "Agent builder",
        title: "An idea. An instruction. An agent.",
        description:
          "Start with what you want to accomplish. Give your agent the context and tools it needs, then shape its behavior in a visual workspace.",
        bullets: [
          "Describe the outcome in plain language",
          "Start from a focused, editable blueprint",
          "Review every action before deployment",
        ],
      },
      {
        label: "Workflow orchestration",
        title: "Let the whole workflow flow.",
        description:
          "Go beyond a single task. Connect decisions, actions and approvals into a sequence that keeps moving, with you in control.",
        bullets: [
          "Coordinate tools and agents in one flow",
          "Keep a human in the moments that matter",
          "Trace every step, retry and result",
        ],
      },
      {
        label: "A clearer picture",
        title: "See the work behind the result.",
        description:
          "Follow every run from start to finish. Understand where time goes, what succeeds, and what could work a little better.",
        bullets: [
          "Watch activity as it happens",
          "Compare performance across agents",
          "Find the bottleneck before it grows",
        ],
      },
    ],
  },
  impact: {
    label: "The difference",
    title: "Less busywork. More possibility.",
    subtitle: "A small improvement, multiplied across every workflow.",
    description:
      "Explore what changes when routine steps become a connected flow. These figures describe the included example run, so you can inspect the result for yourself.",
  },
  capabilities: {
    label: "Built to connect",
    title: "Everything your agents need. Nothing standing in their way.",
    items: [
      {
        key: "data",
        title: "Context from anywhere",
        description:
          "Bring documents, databases and APIs into one context layer. Give every decision a clearer starting point.",
      },
      {
        key: "builder",
        title: "Logic you can see",
        description:
          "Triggers, decisions and actions, arranged in a visual flow. Understand the system you are building.",
      },
      {
        key: "workflow",
        title: "Work that keeps moving",
        description:
          "Sequence tasks, handle handoffs and leave room for a human decision. Every step has a place.",
      },
      {
        key: "models",
        title: "The right model for the moment",
        description:
          "Match the task to the model. Keep your workflows flexible as your needs and capabilities evolve.",
      },
      {
        key: "tools",
        title: "At home in your toolkit",
        description:
          "Work with the tools your team already knows. Connect the next piece without rebuilding the whole system.",
      },
    ],
    tasks: [
      "Summarize a conversation",
      "Qualify a new lead",
      "Prepare a weekly report",
      "Triage a support ticket",
      "Update a project",
      "Find the next step",
      "Organize your context",
      "Route a request",
    ],
  },
  industries: {
    label: "Made for your world",
    title: "Different teams. A shared possibility.",
    items: [
      {
        icon: "finance",
        title: "Financial services",
        description:
          "Turn account requests and document checks into a clear, reviewable workflow.",
        blueprint: "review",
      },
      {
        icon: "health",
        title: "Care & operations",
        description:
          "Coordinate scheduling and administrative handoffs, with people in control.",
        blueprint: "support",
      },
      {
        icon: "commerce",
        title: "Commerce",
        description:
          "Keep order updates, returns and customer conversations moving together.",
        blueprint: "support",
      },
      {
        icon: "education",
        title: "Education",
        description:
          "Help learners find answers and keep enrollment requests on the right path.",
        blueprint: "support",
      },
      {
        icon: "enterprise",
        title: "Internal operations",
        description:
          "Give everyday requests a consistent route, from intake to resolution.",
        blueprint: "review",
      },
      {
        icon: "sales",
        title: "Revenue teams",
        description:
          "Enrich incoming leads, surface context and prepare a thoughtful follow-up.",
        blueprint: "leads",
      },
    ],
  },
  stories: {
    label: "Workflow stories",
    title: "Small changes. A different working day.",
    action: "Explore the examples",
  },
  security: {
    label: "Control by design",
    title: "Your agents. Your boundaries.",
    seals: [
      { title: "Access", code: "01", detail: "Scoped permissions" },
      { title: "Data", code: "02", detail: "Defined context" },
      { title: "Oversight", code: "03", detail: "Human approval" },
    ],
    items: [
      {
        title: "Only the access you allow",
        description:
          "Define which tools each agent can use, and which actions require approval.",
      },
      {
        title: "Context with clear boundaries",
        description:
          "Choose what enters a workflow. Keep its sources visible and its purpose specific.",
      },
      {
        title: "A record you can follow",
        description:
          "See the instructions, decisions and results together in a readable run history.",
      },
    ],
  },
  faq: {
    label: "A little clarity",
    title: "Good questions. Clear answers.",
    intro:
      "Have a particular workflow in mind? We would love to hear about it.",
    items: [
      {
        question: "What can I try on this page?",
        answer:
          "Choose an agent in the hero, create an agent from a blueprint, run the lead-routing workflow, explore analytics, and switch between workflow stories. The examples run locally in your browser and do not connect to your accounts.",
      },
      {
        question: "How is an agent different from a chatbot?",
        answer:
          "A chatbot usually responds to a message. An agent can also work through a defined sequence of decisions and actions using tools and context. The included examples show that sequence without making external requests.",
      },
      {
        question: "Can I use my own models and tools?",
        answer:
          "Yes. The template is built to present your own agent platform. The model router and tool diagrams are editable visual components; connect your actual integrations in your application.",
      },
      {
        question: "Can I keep a human in the loop?",
        answer:
          "The example document-review agent includes a human approval step. Production permissions, approvals and audit records belong in your application; this template gives you a clear way to explain them.",
      },
      {
        question: "What happens when I select a plan?",
        answer:
          "With a configured checkout URL, the button opens that destination. Until then, it opens a local plan review with the exact monthly or annual price. Nothing is charged and no account is created.",
      },
      {
        question: "Can I customize the entire page?",
        answer:
          "The brand, copy, navigation, plans, FAQs and destinations live in site.config.ts. Blueprints and example stories have their own small data files. The styles and sections are modular, so you can adapt the design without untangling one large component.",
      },
    ],
  },
  closing: {
    label: "Make the connection",
    title: "Put your next idea to work.",
    description:
      "Start with one workflow. Give it a little intelligence. See how much further your team can go.",
    primary: "Start building",
    secondary: "Explore plans",
  },
  pricing: {
    label: "Room to grow",
    title: "Start small. Build what comes next.",
    description:
      "A clear starting point for your first workflow, and room for the ones that follow.",
    plans: [
      {
        id: "explore",
        name: "Explore",
        description: "Find your first useful workflow.",
        monthly: 0,
        annual: 0,
        cta: "Start exploring",
        features: [
          "3 active agents",
          "100 example runs / month",
          "Visual workflow builder",
          "Community resources",
        ],
        monthlyUrl: "",
        annualUrl: "",
      },
      {
        id: "build",
        name: "Build",
        description: "Make connected work an everyday thing.",
        monthly: 29,
        annual: 24,
        cta: "Choose Build",
        features: [
          "20 active agents",
          "5,000 example runs / month",
          "Shared workflow library",
          "Run history and analytics",
          "Priority support",
        ],
        monthlyUrl: "",
        annualUrl: "",
      },
      {
        id: "scale",
        name: "Scale",
        description: "More teams. More possibilities.",
        monthly: 99,
        annual: 79,
        cta: "Choose Scale",
        features: [
          "Unlimited active agents",
          "25,000 example runs / month",
          "Team roles and approvals",
          "Extended run history",
          "Dedicated onboarding",
        ],
        monthlyUrl: "",
        annualUrl: "",
      },
    ],
  },
  footer: {
    description:
      "A clearer connection between what you imagine and what gets done.",
    copyright: "© 2026 Conduit. All rights reserved.",
    groups: [
      {
        title: "Platform",
        links: [
          { label: "Product", href: "/#solution" },
          { label: "Capabilities", href: "/#capabilities" },
          { label: "Pricing", href: "/pricing" },
          { label: "Workflow stories", href: "/#stories" },
        ],
      },
      {
        title: "Discover",
        links: [
          { label: "About", href: "/about" },
          { label: "Guides", href: "/guides" },
          { label: "Changelog", href: "/changelog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "FAQ", href: "/#faq" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
  },
} as const;
