/** All studio claims and offers below are editable example content. */
export const site = {
  brand: "Tessera",
  title: "Tessera — Thoughtful systems. Better work.",
  description:
    "An independent AI systems studio. We turn fragmented operations into clear, connected workflows that your team can own.",
  url: "https://example.com",
  email: "hello@tessera.example",
  location: "Independent studio. Working everywhere.",
  links: {
    booking: "/contact",
    // Optional HTTPS endpoint accepting {name,email,company,engagement,message} as JSON.
    contactEndpoint: "",
  },
  nav: [
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Systems", href: "/#systems" },
    { label: "Approach", href: "/#approach" },
    { label: "Engagements", href: "/#engagements" },
  ],
  hero: {
    eyebrow: "AI SYSTEMS / HUMAN AMBITION",
    lines: ["Less busywork.", "More possibility."],
    description:
      "We build thoughtful AI systems that connect your tools, clear the repetitive work and give your team room to move.",
    primary: "Find your next move",
    secondary: "Explore the systems",
    note: "Strategy, engineering & a proper handover.",
    artLabel: "Many moving parts. One working system.",
  },
  manifesto: {
    eyebrow: "THE PIECES FIT. THE WORK FLOWS.",
    lines: [
      "Good technology should",
      "make work feel lighter.",
      "We make the pieces fit.",
    ],
    body: "A considered layer between the people, information and software you already have. Built around the way your business actually works, with clear connections and fewer loose ends.",
    principles: [
      "Your tools, connected",
      "Your judgment, preserved",
      "Your system, to own",
    ],
  },
  capabilities: {
    eyebrow: "01 / WHAT WE BUILD",
    title: ["Intelligence,", "put to work."],
    description: "Start with the friction. Build only what earns its place.",
    items: [
      {
        title: "Connected workflows",
        short: "From handoff to flow.",
        description:
          "A request arrives once. The right information follows it, the next step is clear and the exceptions reach a person who can help.",
        deliverables: [
          "Workflow mapping",
          "Tool integrations",
          "Exception handling",
        ],
        labels: ["Intake", "Route", "Review", "Deliver"],
        color: "mint",
      },
      {
        title: "Knowledge systems",
        short: "An answer with a source.",
        description:
          "Turn scattered documents into a useful place to ask questions. Clear references, defined access and a path back to the original information.",
        deliverables: [
          "Source preparation",
          "Retrieval & citations",
          "Access boundaries",
        ],
        labels: ["Sources", "Index", "Retrieve", "Cite"],
        color: "lilac",
      },
      {
        title: "Practical AI agents",
        short: "A little autonomy. Clear limits.",
        description:
          "Give routine tasks a dependable first pass. Keep approvals, evaluation and recovery built in, so your team stays in control.",
        deliverables: ["Task design", "Human approvals", "Evaluation suites"],
        labels: ["Observe", "Draft", "Approve", "Act"],
        color: "blue",
      },
      {
        title: "Decision support",
        short: "The signal, without the search.",
        description:
          "Bring the right context together before the meeting. Useful summaries, explicit assumptions and a traceable view of what changed.",
        deliverables: [
          "Data connections",
          "Operational briefs",
          "Source visibility",
        ],
        labels: ["Collect", "Compare", "Explain", "Decide"],
        color: "peach",
      },
    ],
  },
  systems: {
    eyebrow: "02 / SYSTEM STUDIES",
    title: ["Small changes.", "A different working day."],
    description:
      "Three example systems. Real-world problems, thoughtfully resolved.",
  },
  approach: {
    eyebrow: "03 / HOW THE PIECES COME TOGETHER",
    title: ["Designed with you.", "Built to stay useful."],
    description:
      "We work in the open. You see the thinking, test the system and understand what you’re taking forward.",
    steps: [
      {
        title: "Find the friction",
        timing: "Discover",
        body: "Walk the workflow with the people who use it. Agree on a useful outcome before choosing a model or tool.",
        output: "A focused system brief",
      },
      {
        title: "Make it tangible",
        timing: "Prototype",
        body: "Test a narrow version against representative tasks. Explore the edge cases while change is still easy.",
        output: "A working, testable prototype",
      },
      {
        title: "Build the whole loop",
        timing: "Implement",
        body: "Connect the tools, add the approvals and define what happens when something needs human judgment.",
        output: "An integrated, evaluated system",
      },
      {
        title: "Leave you in control",
        timing: "Handover",
        body: "Document the decisions, train the owners and agree on what good performance looks like after launch.",
        output: "A system your team can own",
      },
    ],
  },
  foundation: {
    eyebrow: "A SOLID FOUNDATION",
    title: "Useful is the real breakthrough.",
    body: "The strongest system is one your team understands. Every engagement includes the foundations that make it practical to run, adapt and maintain.",
    items: [
      {
        number: "01",
        title: "Visible decisions",
        body: "Sources, approvals and exceptions are part of the design.",
      },
      {
        number: "02",
        title: "Open handover",
        body: "Clear documentation and ownership from the first conversation.",
      },
      {
        number: "03",
        title: "Measured usefulness",
        body: "Test against your tasks, rather than a polished demo alone.",
      },
    ],
    tools: [
      "Your CRM",
      "Your documents",
      "Your help desk",
      "Your data",
      "Your team",
    ],
  },
  engagements: {
    eyebrow: "04 / A GOOD PLACE TO START",
    title: ["One clear next step.", "Then the right partnership."],
    description:
      "A focused project or an ongoing build partner. Choose the shape that fits the work.",
    modes: ["Focused project", "Ongoing partner"],
    plans: [
      {
        name: "System sprint",
        label: "A focused beginning",
        description:
          "Understand one workflow and put a useful first version in your team’s hands.",
        price: 4800,
        partnerPrice: 3600,
        unit: "from / project",
        partnerUnit: "from / month",
        features: [
          "One priority workflow",
          "Discovery & prototype",
          "Integration & evaluation",
          "Documentation & handover",
        ],
        action: "Discuss a sprint",
        color: "mint",
      },
      {
        name: "Build partnership",
        label: "More connected possibilities",
        description:
          "An embedded partner to design, ship and improve a connected set of systems.",
        price: 9200,
        partnerPrice: 7800,
        unit: "from / project",
        partnerUnit: "from / month",
        features: [
          "A connected system roadmap",
          "Dedicated design & engineering",
          "Regular working sessions",
          "Ongoing evaluation & support",
        ],
        action: "Explore a partnership",
        color: "lilac",
      },
    ],
    note: "Illustrative starting prices. Scope, timeline and ongoing costs are agreed before work begins.",
    custom: "Something more specific in mind?",
    customAction: "Let’s map it out",
  },
  faq: {
    eyebrow: "THE PRACTICAL QUESTIONS",
    title: ["Clarity, before", "we get started."],
    items: [
      {
        question: "Where should we start with AI?",
        answer:
          "Start with one repeated task that has a clear owner and a useful outcome. A discovery conversation helps determine whether automation, a simpler integration or a change in process is the best next step.",
      },
      {
        question: "Will you work with our existing tools?",
        answer:
          "We begin with your current tools and access requirements. Integration options, vendor limitations and any additional running costs are documented before implementation.",
      },
      {
        question: "What stays with a human?",
        answer:
          "We define approval boundaries together. Sensitive decisions, unusual cases and actions outside the agreed scope can be routed to your team instead of being handled automatically.",
      },
      {
        question: "Who owns the finished system?",
        answer:
          "Ownership, source delivery and third-party licenses are agreed in the project proposal. The intended handover includes the documentation and access needed for your team to operate the system.",
      },
      {
        question: "What happens after the first launch?",
        answer:
          "We agree on a support and evaluation plan before launch. A focused project can end with a handover, or continue through a separate ongoing engagement.",
      },
    ],
  },
  journal: {
    eyebrow: "FIELD NOTES",
    title: "A little less hype. A little more useful.",
    action: "Read the note",
  },
  closing: {
    eyebrow: "LET’S MAKE THE NEXT PIECE FIT",
    title: ["What could your team", "do with more room?"],
    body: "Tell us where the work gets tangled. We’ll start there.",
    action: "Start a conversation",
  },
  contact: {
    eyebrow: "A CONVERSATION, NOT A SALES DECK",
    title: ["Start with", "the messy part."],
    body: "Tell us what your team is trying to do and what keeps getting in the way. A short, honest brief is plenty.",
    note: "Your brief will open as an email draft for you to review and send.",
    submit: "Prepare your brief",
    sending: "Sending your brief",
    sent: "Brief received",
    draft: "Your brief is ready to email.",
  },
  footer: {
    line: "Thoughtful systems. Better work.",
    copyright: "Tessera. All rights reserved.",
    sample: "An independent studio concept.",
  },
};
