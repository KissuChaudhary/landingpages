export const site = {
  brand: "Index",
  meta: {
    title: "Index — Make room for clear thinking",
    description:
      "Collect the useful parts. Connect the ideas. Keep the answer with its sources. A research workspace for curious minds.",
  },
  links: { app: "", docs: "", email: "hello@example.com" },
  hero: {
    badge: "A place for your thinking",
    first: "From open tabs",
    accent: "to clear thinking.",
    description:
      "Collect the useful parts. Connect the ideas. Keep the answer with its sources.",
    action: "Try Index",
  },
  intro: {
    badge: "Less searching. More understanding.",
    first: "You’ve found the pieces.",
    accent: "Now see the whole.",
    description:
      "Good ideas rarely arrive in one place. Index brings your reading, notes and questions together, so the next thought has somewhere to start.",
  },
  story: {
    badge: "Your curiosity, connected",
    heading: "A little order.\nA lot more possibility.",
    description:
      "One space for the things you find, the connections you make, and the work that comes next.",
  },
  evidence: {
    badge: "An answer you can follow",
    first: "Keep the insight.",
    accent: "Keep the evidence.",
    description:
      "An answer is only useful when you can see where it came from. Follow any reference back to the passage that shaped it.",
  },
  examples: {
    badge: "Room for every rabbit hole",
    heading: "Start with a question.\nSee where it takes you.",
    description:
      "A small collection of ways to bring your sources into focus. Choose one and explore the working example.",
  },
  pricing: {
    badge: "Make space for your ideas",
    heading: "A plan for your pace.",
    description:
      "Begin with a little curiosity. Add more room when you need it.",
  },
  plans: [
    {
      id: "personal",
      name: "Personal",
      description: "For the everyday discoveries.",
      monthly: 0,
      yearly: 0,
      action: "Start exploring",
      featured: false,
      features: [
        "3 research spaces",
        "50 saved sources",
        "Source-linked answers",
        "Copy and export your notes",
      ],
      checkout: { monthly: "", yearly: "" },
    },
    {
      id: "curious",
      name: "Curious",
      description: "For the ideas you keep coming back to.",
      monthly: 15,
      yearly: 12,
      action: "Choose Curious",
      featured: true,
      features: [
        "Unlimited research spaces",
        "2,000 saved sources",
        "PDFs, articles and your own notes",
        "Full-text search and connections",
      ],
      checkout: { monthly: "", yearly: "" },
    },
    {
      id: "together",
      name: "Together",
      description: "For thinking beyond your own desk.",
      monthly: 24,
      yearly: 19,
      action: "Think together",
      featured: false,
      features: [
        "Everything in Curious",
        "Shared spaces for your team",
        "Comments and shared collections",
        "Member and access controls",
      ],
      checkout: { monthly: "", yearly: "" },
    },
  ],
  faq: {
    badge: "A few things to know",
    heading: "Before you begin.",
    items: [
      {
        question: "What can I bring into Index?",
        answer:
          "The product direction supports articles, documents, links and your own notes. This landing page includes three prepared research collections so you can explore sources, connections and cited answers without an account.",
      },
      {
        question: "Are these answers generated live?",
        answer:
          "These are carefully prepared local examples. Topic switches, source previews, citations and exports work in your browser. No source or question is sent to an AI service in this template.",
      },
      {
        question: "Can I take my research with me?",
        answer:
          "Yes. Open any example and copy its synthesis or download a plain-text brief. The exported brief includes the same answer and source passages shown on the page.",
      },
      {
        question: "Can I use this with my own product?",
        answer:
          "Index is an adaptable landing page template for research, knowledge and AI products. Replace the content, plans and links in the configuration, then connect your own app, document processing and checkout.",
      },
      {
        question: "What happens when I choose a plan?",
        answer:
          "Each plan button goes to its checkout link. This preview does not charge you or create an account, so the free plan opens the working example and paid plans start an email until you add your own checkout links.",
      },
    ],
  },
  closing: {
    badge: "Your next thought starts here",
    first: "Make something",
    accent: "of your curiosity.",
    description:
      "The useful parts are already out there. Give them a place to come together.",
    action: "Find your starting point",
  },
} as const;
export type Plan = (typeof site.plans)[number];
