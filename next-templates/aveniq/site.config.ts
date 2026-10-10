export const site = {
  name: "Aveniq",
  title: "Aveniq — Less noise. Clearer moves.",
  description:
    "One shared space for the signals, decisions and next steps that move your product forward.",
  links: {
    email: "hello@aveniq.example",
    start: "",
    sales: "",
    subject: "Get started with Aveniq",
    linkedin: "",
    github: "",
  },
  navigation: [
    { label: "Why Aveniq", href: "#platform" },
    { label: "How it works", href: "#workflow" },
    { label: "Use cases", href: "#use-cases" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "A clearer way to build",
    lines: ["Less noise.", "Clearer moves."],
    description:
      "Give scattered feedback a place to land. Turn it into a shared point of view—and a next step your whole team can get behind.",
    primary: "Find your next move",
    secondary: "Explore the platform",
    note: "Built for thoughtful product teams",
    image: "/images/flow.webp",
  },
  preview: {
    label: "Workspace preview",
    title: "The bigger picture",
    question: "What should we focus on next?",
    sources: ["Customer conversations", "Product feedback", "Team context"],
    result: "A clearer first-run experience",
    insight:
      "Bring onboarding feedback into one decision brief, with the context behind it.",
    action: "Review with the product team",
  },
  principles: [
    "Context before conclusions",
    "A shared point of view",
    "Progress with purpose",
  ],
  platform: {
    eyebrow: "From information to intention",
    title: ["A shared picture.", "A sharper next step."],
    description:
      "Aveniq brings the thinking together, so the important things stop getting lost between tools.",
    features: [
      {
        number: "01",
        title: "Find the signal in the scattered.",
        text: "Keep customer conversations, research and team notes close. See the themes emerge without losing the original context.",
        type: "signal",
      },
      {
        number: "02",
        title: "Make the reasoning visible.",
        text: "A decision is more useful when everyone can understand how you got there. Keep the evidence alongside the recommendation.",
        type: "reason",
      },
      {
        number: "03",
        title: "Give good thinking a next step.",
        text: "Turn a shared direction into a focused brief. Make the owner, the open questions and the next move easy to find.",
        type: "move",
      },
    ],
  },
  workflow: {
    eyebrow: "A little structure. A lot more clarity.",
    title: ["Good decisions", "have a rhythm."],
    description: "A simple loop that fits the way product work really happens.",
    steps: [
      {
        label: "Gather",
        title: "Bring the context closer.",
        text: "Start with the conversations, notes and observations that matter. Give them a shared home.",
        detail: "Customer notes · Research · Team input",
      },
      {
        label: "Understand",
        title: "Find the thread worth following.",
        text: "Look across the inputs. Explore the patterns, ask better questions and keep the source within reach.",
        detail: "Shared themes · Evidence · Open questions",
      },
      {
        label: "Move",
        title: "Leave with a clear next step.",
        text: "Write the decision together. Set a direction, name the owner and give the next conversation a head start.",
        detail: "Decision brief · Ownership · Next steps",
      },
    ],
  },
  stories: {
    eyebrow: "Built around the work",
    title: ["One space.", "Many ways forward."],
    description:
      "Three familiar moments where a little shared clarity makes all the difference.",
    items: [
      {
        number: "01",
        category: "Product discovery",
        title: "Hear the pattern behind the feedback.",
        text: "Bring the fragments of a customer story together. Give your team a grounded starting point for what to explore next.",
        tags: ["Feedback synthesis", "Research context"],
        image: "/images/prism.webp",
        tone: "dark",
        note: "Listen → Understand → Explore",
      },
      {
        number: "02",
        category: "Planning & alignment",
        title: "Get to the same page, with the why intact.",
        text: "Keep the trade-offs in view. Build a decision brief that helps design, engineering and product move in the same direction.",
        tags: ["Decision briefs", "Team alignment"],
        image: "/images/orbit.webp",
        tone: "light",
        note: "Evidence → Direction → Ownership",
      },
      {
        number: "03",
        category: "Learning & iteration",
        title: "Make the next cycle a little wiser.",
        text: "Keep the thinking from the last release close. Connect what you learned to the question your team is asking today.",
        tags: ["Learning loops", "Product context"],
        image: "/images/flow.webp",
        tone: "blue",
        note: "Launch → Learn → Refine",
      },
    ],
  },
  context: {
    eyebrow: "Keep the context. Lose the tab hopping.",
    title: ["Your thinking,", "in good company."],
    description:
      "A place for the inputs your team already works with. Bring them together around the decision, rather than the tool.",
    inputs: [
      "Customer calls",
      "Research notes",
      "Feedback threads",
      "Product docs",
      "Team observations",
      "Release learnings",
    ],
  },
  pricing: {
    eyebrow: "Room to think. Room to grow.",
    title: "Start with your next decision.",
    description:
      "Choose the space that fits your team. Monthly flexibility or a little more value over the year.",
    monthly: "Monthly",
    annual: "Yearly",
    annualNote: "Two months on us",
    plans: [
      {
        name: "Individual",
        tagline: "A little clarity for your own work.",
        monthly: 0,
        annual: 0,
        unit: "/ month",
        featured: false,
        features: [
          "One personal workspace",
          "Three active decision briefs",
          "Notes and source context",
          "Core synthesis views",
        ],
        cta: "Start your workspace",
        href: "",
      },
      {
        name: "Team",
        tagline: "A shared picture for a growing team.",
        monthly: 24,
        annual: 20,
        unit: "/ person / month",
        featured: true,
        features: [
          "Shared team workspaces",
          "Unlimited decision briefs",
          "Collaborative context and notes",
          "Workspace roles and permissions",
          "Priority email support",
        ],
        cta: "Bring your team together",
        href: "",
      },
      {
        name: "Organization",
        tagline: "Clarity across teams and projects.",
        monthly: null,
        annual: null,
        unit: "Designed around your team",
        featured: false,
        features: [
          "Everything in Team",
          "Workspace administration",
          "Guided team onboarding",
          "A dedicated point of contact",
        ],
        cta: "Let’s talk",
        href: "",
      },
    ],
    note: "Every plan begins with a conversation about your team’s needs.",
  },
  faq: {
    eyebrow: "A few things, made clear",
    title: ["Good questions.", "Straight answers."],
    items: [
      {
        question: "Who is Aveniq built for?",
        answer:
          "Aveniq is a decision workspace for product teams. It brings research, feedback and team thinking into a shared view around the next product decision.",
      },
      {
        question: "Does it replace our project management tool?",
        answer:
          "The focus is the thinking before the task list: understanding the context, considering the trade-offs and agreeing on a direction. Your delivery tools can stay part of the way you work.",
      },
      {
        question: "Can we begin with one project?",
        answer:
          "Yes. A single discovery question or planning decision is a useful place to start. Keep the scope focused, bring the relevant context together and expand when it feels right.",
      },
      {
        question: "How should we bring in our existing context?",
        answer:
          "Start with the notes, conversations and documents that inform the decision. Keep source material close enough that the team can inspect the reasoning and ask questions.",
      },
      {
        question: "What happens when our team grows?",
        answer:
          "Our plans offer a personal workspace, shared team spaces and an organization option. Choose a plan that fits your current team, then discuss a wider rollout when you need it.",
      },
    ],
  },
  closing: {
    eyebrow: "A little less noise. A little more possibility.",
    title: ["Your next good decision", "starts with a clearer view."],
    primary: "Make room for clarity",
    secondary: "Talk to our team",
  },
  footer: {
    description:
      "A shared space for thoughtful teams and the decisions that move them forward.",
    note: "Think clearly. Move together.",
  },
};
