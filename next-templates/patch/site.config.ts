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
    close: "Keep exploring",
    copy: "Copy code",
    export: "Export component",
    apply: "Apply change",
    undo: "Undo change",
  },
  hero: {
    eyebrow: "AN IDEA IS A GOOD PLACE TO START",
    title: "From first thought to",
    emphasis: "first commit.",
    description:
      "A clear space to build, inspect, and make something your own. Bring the idea. Keep the good parts.",
    secondary: "See how it works",
    note: "A fictional product. A working little preview.",
    annotation: "LESS FRICTION. MORE MAKING.",
  },
  capabilities: [
    { number: "01", title: "Describe it", detail: "Start with the idea" },
    { number: "02", title: "See the change", detail: "Every line, in context" },
    { number: "03", title: "Make it yours", detail: "A real, usable output" },
    { number: "04", title: "Keep building", detail: "Your next good step" },
  ],
  workspace: {
    number: "01",
    eyebrow: "A CLEARER WAY TO BUILD",
    title: "The whole change.",
    emphasis: "Right in front of you.",
    description:
      "A request, a considered change, and the thing it becomes. No hunting between tabs to see what happened.",
    presetsLabel: "CHOOSE A STARTING POINT",
    note: "These examples run locally. Nothing is generated or sent to a server.",
    emptyLink: "Try an example",
    screenshot: null as { src: string; alt: string } | null,
  },
  features: {
    number: "02",
    eyebrow: "THOUGHTFUL, DOWN TO THE LAST BRACKET",
    title: "A little less in the way.",
    emphasis: "A lot more possibility.",
    preview: {
      tag: "01 / THE THING YOU'RE MAKING",
      title: "From code to something you can see.",
      description:
        "Inspect the output at different widths. A small screen deserves the same consideration.",
      desktop: "Wide",
      mobile: "Narrow",
    },
    context: {
      tag: "02 / JUST ENOUGH CONTEXT",
      title: "The right files. Close at hand.",
      description:
        "Keep the relevant pieces together. Choose a file to take a closer look.",
    },
    keyboard: {
      tag: "03 / STAY IN YOUR FLOW",
      title: "Good with a keyboard.",
      description:
        "One shortcut. A clear next step. Open the command menu from anywhere on the page.",
      action: "Open command menu",
    },
    appearance: {
      tag: "04 / IN ANOTHER LIGHT",
      title: "The same clarity. Either way.",
      description: "Chalk or graphite. Every detail has a place in both.",
      light: "Chalk",
      dark: "Graphite",
    },
    export: {
      tag: "05 / YOURS TO KEEP",
      title: "A file. Not a dead end.",
      description:
        "Export the changed example as a React component. A small starting point, ready for your next step.",
      action: "Get the example",
    },
  },
  workflow: {
    number: "03",
    eyebrow: "FROM A THOUGHT TO A THING",
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
    number: "04",
    eyebrow: "MADE FOR WHAT YOU WANT TO MAKE",
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
    number: "05",
    eyebrow: "ROOM TO START. ROOM TO GROW.",
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
    ] satisfies Plan[],
    comparison: [
      { label: "A considered workspace", personal: true, builder: true },
      { label: "Code and output, together", personal: true, builder: true },
      { label: "Component export", personal: true, builder: true },
      { label: "Larger project context", personal: false, builder: true },
      { label: "Custom presets", personal: false, builder: true },
    ],
  },
  faq: {
    eyebrow: "A LITTLE CLARITY",
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
    eyebrow: "THE NEXT GOOD THING STARTS SOMEWHERE",
    title: "Make the",
    emphasis: "first move.",
    description: "The idea is already yours. Give it a place to begin.",
    small: "YOUR NEXT IDEA / YOUR FIRST COMMIT",
  },
  footer: {
    fictional: "Patch is a fictional product demonstration.",
    top: "Back to the beginning",
    contact: "Say hello",
    docs: "Documentation",
  },
  dialogs: {
    app: {
      label: "START SOMEWHERE",
      title: "Pick a first thought.",
      description:
        "Choose a working example, then inspect the change and make it your own.",
      note: "Local examples. No account or AI service required.",
    },
    plan: {
      label: "YOUR SELECTED PLAN",
      note: "This is a local plan preview. Connect a real checkout to accept payments or create accounts.",
      total: "Billing total",
      yearly: "Billed once a year",
      monthly: "Billed each month",
      free: "Free",
      action: "Try a local example",
    },
    command: {
      title: "Find your next step",
      placeholder: "Where would you like to go?",
      empty: "No matching page sections.",
      note: "↑ ↓ to choose · Enter to go · Esc to close",
    },
  },
};
