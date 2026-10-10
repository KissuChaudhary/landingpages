/** All visible copy and production destinations. Demo content is illustrative. */
export const site = {
  brand: { name: "tandem", tagline: "Good work. Great company." },
  meta: {
    title: "Tandem — Your ambition. A little backup.",
    description:
      "A team of AI agents for the work between your ideas and your next big thing. Research, create, and move projects forward with you in control.",
  },
  locale: "en-US",
  contact: "hello@example.com",
  signup: {
    url: "",
    endpoint: "",
    success: "You're on the list. We'll be in touch.",
  },
  nav: [
    { label: "Meet your agents", href: "#agents" },
    { label: "How it works", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "A LITTLE INTELLIGENCE. A LOT OF POSSIBILITY.",
    line1: "Your ambition.",
    line2: "A little",
    words: ["backup.", "headroom.", "momentum."],
    description:
      "Meet the AI agents that turn your to-do into done. A thoughtful team behind your next big thing.",
    cta: "Find your flow",
    secondary: "See Tandem in action",
    note: "Start small. Dream irresponsibly big.",
    prompt: "Research our next launch and put together a plan…",
    agents: [
      {
        label: "Research agent",
        detail: "Connecting the dots",
        position: "research",
        icon: "research",
      },
      {
        label: "Creative agent",
        detail: "Making the first move",
        position: "creative",
        icon: "creative",
      },
      {
        label: "Operations agent",
        detail: "Keeping things moving",
        position: "operations",
        icon: "operations",
      },
    ],
  },
  manifesto: {
    eyebrow: "LESS BUSYWORK. MORE YOU.",
    title: "You have the vision.\nWe make room for it.",
    description:
      "The research rabbit holes. The blank documents. The follow-ups that follow you home. Give them to a team that makes the small things happen, so you can do the big ones.",
    stats: [
      { value: 6, suffix: "", label: "specialists. One shared context." },
      { value: 24, suffix: "/7", label: "ready when inspiration strikes." },
      { value: 1, suffix: "", label: "place to turn ideas into action." },
    ],
  },
  workspace: {
    eyebrow: "YOUR NEW WAY TO WORK",
    title: "Big ideas don't need\na bigger to-do list.",
    description:
      "Tell Tandem where you're headed. Your agents find the way, share the work, and bring it back for your approval.",
    image: "/images/workspace.webp",
    alt: "Illustrative Tandem workspace showing a launch plan, agent handoffs, and a brief ready for review.",
    chips: ["A shared memory", "Clear handoffs", "Your final say"],
  },
  agents: {
    eyebrow: "SIX SPECIALISTS. ZERO EGO.",
    title: "Meet your\nextra pair of hands.",
    description:
      "Different strengths. The same goal. Each agent knows its craft—and when to pass the baton.",
    items: [
      {
        id: "research",
        name: "The Researcher",
        role: "For your next rabbit hole.",
        description:
          "Find the signal in the noise. Go from a question to a sourced brief you can actually use.",
        tag: "RESEARCH & INSIGHT",
        image: "/images/agent-research.webp",
        example: "What does our next customer need?",
        icon: "research",
      },
      {
        id: "creative",
        name: "The Creative",
        role: "For your blank-page days.",
        description:
          "Explore directions, write the first draft, and turn a half-formed thought into a proper starting point.",
        tag: "CONTENT & IDEAS",
        image: "/images/agent-creative.webp",
        example: "Give this launch a point of view.",
        icon: "creative",
      },
      {
        id: "operations",
        name: "The Operator",
        role: "For all the moving parts.",
        description:
          "Break a goal into next steps, organize the handoffs, and give every loose end somewhere to land.",
        tag: "WORKFLOWS & PLANNING",
        image: "/images/agent-operations.webp",
        example: "Keep our launch moving forward.",
        icon: "operations",
      },
      {
        id: "analyst",
        name: "The Analyst",
        role: "For the story in the numbers.",
        description:
          "Make your data make sense. Find patterns, surface the why, and turn observations into a decision.",
        tag: "DATA & DECISIONS",
        image: "/images/agent-analyst.webp",
        example: "What changed in our funnel?",
        icon: "analyst",
      },
      {
        id: "support",
        name: "The Helper",
        role: "For a more human response.",
        description:
          "Draft useful replies from your knowledge base, with context and care. You approve what gets sent.",
        tag: "CUSTOMERS & CONTEXT",
        image: "/images/agent-support.webp",
        example: "Help this customer get unstuck.",
        icon: "support",
      },
      {
        id: "builder",
        name: "The Builder",
        role: "For ideas that need a shape.",
        description:
          "Translate a brief into a working spec, map the implementation, and prepare changes for review.",
        tag: "SPECS & DEVELOPMENT",
        image: "/images/agent-builder.webp",
        example: "Turn this idea into a clear spec.",
        icon: "builder",
      },
    ],
  },
  workflow: {
    eyebrow: "FROM A SPARK TO SOMETHING REAL",
    title: "Good things\nhappen in tandem.",
    description: "One conversation. A whole team moving with you.",
    steps: [
      {
        title: "Start with a what-if.",
        description:
          "A rough idea is enough. Tell your agents what you're trying to do, share the context, and choose the finish line.",
        image: "/images/step-brief.webp",
        label: "01 / THE SPARK",
      },
      {
        title: "Let the work find its flow.",
        description:
          "Your researcher finds the evidence. Your creative shapes the story. Your operator connects the next steps. Each handoff keeps the context.",
        image: "/images/step-flow.webp",
        label: "02 / THE MOMENTUM",
      },
      {
        title: "Make the final call.",
        description:
          "See what happened, check the sources, and review the output. Every meaningful action comes back to you before it goes anywhere.",
        image: "/images/step-review.webp",
        label: "03 / THE MOMENT THAT MATTERS",
      },
    ],
  },
  useCases: {
    eyebrow: "MADE FOR YOUR KIND OF AMBITIOUS",
    title: "A small team.\nAn unfair advantage.",
    tabs: [
      {
        id: "founders",
        label: "For founders",
        title: "All the hats. A little less juggling.",
        description:
          "Validate an idea, map your market, and shape your first launch. Keep building while your agents fill in the gaps.",
        output: "YOUR NEXT LAUNCH, A LITTLE CLOSER",
        image: "/images/team-founders.webp",
        tasks: [
          "A market worth entering",
          "A story worth telling",
          "A plan you can start today",
        ],
      },
      {
        id: "marketing",
        label: "For marketers",
        title: "More good ideas. Fewer loose ends.",
        description:
          "Turn an audience insight into a campaign brief, a first draft, and a clear set of next steps. Keep your voice in every handoff.",
        output: "FROM INSIGHT TO CAMPAIGN",
        image: "/images/team-marketing.webp",
        tasks: [
          "An audience with context",
          "A sharper creative direction",
          "A launch everyone can follow",
        ],
      },
      {
        id: "operations",
        label: "For operators",
        title: "Make space in your systems.",
        description:
          "Bring scattered processes into focus. Map the moving parts, organize the work, and make the next handoff a little easier.",
        output: "LESS CHASING. MORE MOVING.",
        image: "/images/team-operations.webp",
        tasks: [
          "One place for the context",
          "A repeatable set of steps",
          "A clear owner for every action",
        ],
      },
    ],
  },
  integrations: {
    eyebrow: "RIGHT AT HOME IN YOUR WORKDAY",
    title: "Your tools.\nNow a little more together.",
    description:
      "Context belongs with the work. Bring your documents, conversations, and projects into the same flow.",
    tools: ["Notion", "Slack", "Google Drive", "Linear", "GitHub", "Gmail"],
    note: "Connect only what you need. Decide what each agent can access.",
  },
  control: {
    eyebrow: "A COPILOT. YOU'RE STILL THE PILOT.",
    title: "A little autonomy.\nA lot of accountability.",
    items: [
      {
        number: "01",
        title: "You set the boundaries.",
        description:
          "Choose the tools, the context, and the permissions for every agent.",
      },
      {
        number: "02",
        title: "The thinking stays visible.",
        description:
          "Follow the sources, decisions, and handoffs behind the finished work.",
      },
      {
        number: "03",
        title: "Your yes means something.",
        description:
          "Review meaningful actions before anything gets published, sent, or changed.",
      },
    ],
  },
  pricing: {
    eyebrow: "ROOM TO GROW",
    title: "Big possibilities.\nSmall starting point.",
    description: "Start with a little backup. Add more as your ambition grows.",
    plans: [
      {
        name: "Solo",
        description: "Your ideas, with a little company.",
        monthly: 39,
        yearly: 29,
        featured: false,
        cta: "Start your own thing",
        checkout: { monthly: "", yearly: "" },
        features: [
          "All six specialist agents",
          "1,000 agent tasks per month",
          "3 connected tools",
          "Shared project context",
          "Review before action",
        ],
      },
      {
        name: "Together",
        description: "Small teams. Bigger possibilities.",
        monthly: 99,
        yearly: 79,
        featured: true,
        cta: "Bring your team",
        checkout: { monthly: "", yearly: "" },
        features: [
          "Everything in Solo",
          "5,000 agent tasks per month",
          "Unlimited connected tools",
          "Up to 5 team members",
          "Shared workflows & permissions",
        ],
      },
      {
        name: "Your way",
        description: "For work that needs a wider canvas.",
        monthly: null,
        yearly: null,
        featured: false,
        cta: "Let's talk",
        checkout: { monthly: "", yearly: "" },
        features: [
          "Custom task capacity",
          "Workspace access controls",
          "A dedicated onboarding plan",
          "Custom agent workflows",
          "A person to talk to",
        ],
      },
    ],
  },
  faq: {
    title: "A few things\nyou might be wondering.",
    items: [
      {
        question: "What exactly is an AI agent?",
        answer:
          "Think of an agent as a specialist that can work through a goal in steps: gather context, use the tools you allow, and prepare an output. In Tandem, specialists can hand work to each other while you stay in charge of the final result.",
      },
      {
        question: "How is this different from a chatbot?",
        answer:
          "A chat gives you an answer. An agent workflow connects the steps around that answer: research, drafting, organizing, and review. Shared context means you don't have to explain the same project at every handoff.",
      },
      {
        question: "Will agents send or publish things on their own?",
        answer:
          "Meaningful external actions need your approval. You choose an agent's permissions, inspect the proposed output, and make the final call before something is sent, published, or changed.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "No. Start with a plain-language goal and the context you want to share. More technical teams can extend workflows with their own integrations.",
      },
      {
        question: "Can I use Tandem with my existing tools?",
        answer:
          "Tandem is designed to bring your documents, conversations, and projects into one flow. Connect the context you need, and give each agent access only to the tools that make sense for its work.",
      },
      {
        question: "Can I change or cancel my plan?",
        answer:
          "Choose the plan that fits your stage. If your team needs a different capacity or workspace setup, get in touch and we can help you find the right starting point.",
      },
    ],
  },
  closing: {
    title: "Your next big thing\ncould use a little tandem.",
    description: "Less on your plate. More on the horizon.",
    cta: "Make room for what's next",
  },
  footer: {
    note: "A little backup for a bigger life.",
    links: [
      { label: "Meet the agents", href: "#agents" },
      { label: "How it works", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
      { label: "Get in touch", href: "mailto:hello@example.com" },
    ],
  },
};

export type Agent = (typeof site.agents.items)[number];
