export type Theme = "light" | "dark";
export type ExampleId = "signup" | "pricing" | "command";
export type Plan = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  action: string;
  href: { monthly: string; yearly: string };
  features: string[];
  featured?: boolean;
};
export const site = {
  brand: {
    name: "patch",
    year: "2026",
    tagline: "Good ideas deserve a first commit.",
  },
  meta: {
    title: "Patch — From first thought to first commit",
    description:
      "A considered workspace for turning an idea into an interface. An original, grid-framed AI builder launch template with interactive code and output previews.",
  },
  appearance: {
    defaultTheme: "light" as Theme,
    storageKey: "patch-appearance-v1",
    showControl: true,
  },
  links: { app: "", email: "hello@example.com", docs: "" },
  navigation: [
    { label: "Workspace", href: "#workspace" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
  ],
  actions: {
    start: "Get started",
    try: "Try the workspace",
    copy: "Copy code",
    export: "Export component",
    apply: "Apply change",
    undo: "Undo change",
  },
  hero: {
    badge: "AI builder workspace",
    title: "From first thought to",
    emphasis: "first commit.",
    description:
      "A clear space to build, inspect, and make something your own. Bring the idea. Keep the good parts.",
    secondary: "See how it works",
  },
  capabilities: [
    { title: "Describe it", detail: "Start with the idea" },
    { title: "See the change", detail: "Every line, in context" },
    { title: "Make it yours", detail: "A real, usable output" },
    { title: "Keep building", detail: "Your next good step" },
  ],
  workspace: {
    badge: "Workspace",
    title: "The whole change.",
    emphasis: "Right in front of you.",
    presetsLabel: "Choose an example",
    note: "Prepared local examples. Nothing is sent.",
    screenshot: null as { src: string; alt: string } | null,
  },
  features: {
    badge: "Product details",
    title: "A little less in the way.",
    emphasis: "A lot more possibility.",
    preview: {
      title: "From code to something you can see.",
      description:
        "Inspect the output at different widths. A small screen deserves the same consideration.",
      desktop: "Wide",
      mobile: "Narrow",
    },
    context: {
      title: "The right files. Close at hand.",
      description:
        "Keep the relevant pieces together. Choose a file to take a closer look.",
    },
    keyboard: {
      title: "Good with a keyboard.",
      description:
        "One shortcut. A clear next step. Open the command menu from anywhere on the page.",
      action: "Open command menu",
      close: "Close command menu",
    },
    appearance: {
      title: "The same clarity. Either way.",
      description: "Chalk or graphite. Every detail has a place in both.",
      light: "Chalk",
      dark: "Graphite",
    },
    export: {
      title: "A file. Not a dead end.",
      description:
        "Export the changed example as a React component. A small starting point, ready for your next step.",
      action: "Get the example",
    },
  },
  workflow: {
    badge: "How it works",
    title: "Three steps.",
    emphasis: "One good beginning.",
    steps: [
      {
        title: "Describe",
        subtitle: "Give the idea a shape.",
        description:
          "Start with a clear intention. Choose one of the examples to see how a small, specific request becomes a useful change.",
      },
      {
        title: "Inspect",
        subtitle: "Know what changed.",
        description:
          "Read the proposal in context. Compare it with the original and see the output before deciding to keep it.",
      },
      {
        title: "Keep",
        subtitle: "Take the next step.",
        description:
          "Apply the change, copy the code, or export the component. The result is yours to build on.",
      },
    ],
  },
  useCases: {
    badge: "Starting points",
    title: "A starting point.",
    emphasis: "Not a stopping point.",
    items: [
      {
        id: "app",
        label: "Your next app",
        title: "A thought, made tangible.",
        description:
          "A considered first screen for the idea you keep coming back to.",
        example: "signup" as ExampleId,
        screenshot: null as { src: string; alt: string } | null,
      },
      {
        id: "extension",
        label: "A useful extension",
        title: "A small tool. A good shortcut.",
        description:
          "A compact command surface that feels right at home in someone's daily workflow.",
        example: "command" as ExampleId,
        screenshot: null as { src: string; alt: string } | null,
      },
      {
        id: "components",
        label: "A component product",
        title: "Good parts, brought together.",
        description:
          "Thoughtful interface pieces you can arrange, adapt, and make your own.",
        example: "pricing" as ExampleId,
        screenshot: null as { src: string; alt: string } | null,
      },
    ],
    action: "Explore this starting point",
  },
  pricing: {
    badge: "Plans & pricing",
    title: "A simple way",
    emphasis: "to keep making.",
    description:
      "Start with a little possibility. Make more room when you're ready.",
    monthly: "Monthly",
    yearly: "Yearly",
    note: "Illustrative plans. No payment collected in this preview.",
    plans: [
      {
        id: "personal",
        name: "Personal",
        description: "A good place for the first idea.",
        monthly: 0,
        yearly: 0,
        action: "Start with an idea",
        href: { monthly: "", yearly: "" },
        features: [
          "Your everyday workspace",
          "A place to inspect changes",
          "Component previews",
          "Local example exports",
        ],
      },
      {
        id: "builder",
        featured: true,
        name: "Builder",
        description: "More space for what comes next.",
        monthly: 15,
        yearly: 144,
        action: "Make room to build",
        href: { monthly: "", yearly: "" },
        features: [
          "Everything in Personal",
          "Larger project context",
          "Custom workspace presets",
          "A growing component library",
        ],
      },
      {
        id: "studio",
        name: "Studio",
        description: "A shared space for your next release.",
        monthly: 30,
        yearly: 288,
        action: "Build together",
        href: { monthly: "", yearly: "" },
        features: [
          "Everything in Builder",
          "Shared team workspaces",
          "Team component presets",
          "Project permissions",
        ],
      },
    ] satisfies Plan[],
    comparison: [
      {
        label: "A considered workspace",
        included: ["personal", "builder", "studio"],
      },
      {
        label: "Code and output, together",
        included: ["personal", "builder", "studio"],
      },
      {
        label: "Component export",
        included: ["personal", "builder", "studio"],
      },
      { label: "Larger project context", included: ["builder", "studio"] },
      { label: "Custom presets", included: ["builder", "studio"] },
      { label: "Shared team workspaces", included: ["studio"] },
      { label: "Project permissions", included: ["studio"] },
    ],
  },
  faq: {
    badge: "Questions & answers",
    title: "Before you",
    emphasis: "begin.",
    items: [
      {
        question: "What can I try here?",
        answer:
          "Choose a component example, switch the workspace view, apply or undo the proposed change, and inspect the result. You can copy or export the displayed code. These are local, deterministic examples.",
      },
      {
        question: "Does this page generate code with AI?",
        answer:
          "The Patch preview uses prepared examples, so every action works without an account or API key. A template buyer can connect the primary actions to their real app or add an AI service.",
      },
      {
        question: "What do the exports contain?",
        answer:
          "A standalone TSX file containing the selected React component, with the current change applied or undone. The examples use standard React and inline styles; adapt them to your project's conventions.",
      },
      {
        question: "Can I show my own product?",
        answer:
          "Yes. Replace the copy, brand, example data and theme tokens. Screenshot slots can replace the main workspace and the use-case previews while retaining the surrounding layout.",
      },
      {
        question: "What happens when I choose a plan?",
        answer:
          "You can review its price, billing period, and features. This preview doesn't create accounts or process payments. Monthly and yearly plan destinations are configured independently for your real product.",
      },
    ],
  },
  closing: {
    badge: "Ready to build?",
    title: "Make the",
    emphasis: "first move.",
    description: "The idea is already yours. Give it a place to begin.",
    secondary: "See it in action",
  },
  footer: {
    fictional: "Patch is a fictional product demonstration.",
    top: "Back to the beginning",
    contact: "Say hello",
    docs: "Documentation",
  },
  commandMenu: {
    title: "Find your next step",
    placeholder: "Where would you like to go?",
    empty: "No matching page sections.",
    note: "↑ ↓ to choose · Enter to go · Esc to close",
  },
};
