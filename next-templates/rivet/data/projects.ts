export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  art: "orra" | "counter" | "forma" | "goodwell";
  challenge: string;
  approach: string;
  outcome: string;
  deliverables: string[];
};
/** Illustrative portfolio. Replace these projects with your own client work. */
export const projects: Project[] = [
  {
    slug: "orra",
    name: "Orra",
    sector: "Personal wellbeing",
    year: "2026",
    art: "orra",
    title: "A little space for a better day.",
    description:
      "A thoughtful identity and companion app for a new kind of daily ritual.",
    tags: ["Strategy", "Identity", "Digital product"],
    challenge:
      "Wellbeing tools can easily become another task to complete. Orra wanted a product that offered a moment of calm without adding scores, pressure, or another busy dashboard.",
    approach:
      "We began with the first sixty seconds of a person’s day. A quiet visual identity, a single daily intention, and a focused companion interface gave the product a rhythm people could understand without a tutorial.",
    outcome:
      "A connected identity and responsive prototype, with an accessible component system and a clear path from first visit to a personal daily ritual. The design leaves space for the person using it.",
    deliverables: [
      "Brand direction and verbal identity",
      "Responsive product design",
      "Interactive onboarding prototype",
      "Accessible component library",
      "Implementation and handover notes",
    ],
  },
  {
    slug: "counter",
    name: "Counter",
    sector: "Independent business",
    year: "2026",
    art: "counter",
    title: "Less admin. More independent.",
    description:
      "Making the money side of independent work feel clear, connected, and human.",
    tags: ["Product design", "Design system", "Engineering"],
    challenge:
      "Independent businesses need to understand their money without learning accounting software. Counter had the right capabilities, but its growing interface made ordinary tasks feel fragmented.",
    approach:
      "We mapped the journey from issuing an invoice to understanding cash flow. A consistent navigation model and a small set of reusable patterns replaced isolated screens with one coherent workspace.",
    outcome:
      "An integrated product direction with clear invoice states, readable summaries, and a reusable interface foundation. Design and engineering worked from the same components and interaction rules.",
    deliverables: [
      "Journey mapping and information architecture",
      "Product interface and content design",
      "Shared design tokens",
      "Responsive React component system",
      "Keyboard and accessibility review",
    ],
  },
  {
    slug: "forma",
    name: "Forma",
    sector: "Architecture & culture",
    year: "2025",
    art: "forma",
    title: "A digital home with a sense of place.",
    description:
      "An architectural practice, translated into a precise and expressive digital experience.",
    tags: ["Art direction", "Web design", "Development"],
    challenge:
      "Forma’s work was considered and tactile. Its website didn’t convey either. The practice needed a portfolio that gave each project room while making the studio’s point of view easy to find.",
    approach:
      "We treated the site like a small exhibition: careful sequencing, generous scale, material-led imagery, and concise editorial context. Motion connects the spaces rather than competing with the work.",
    outcome:
      "A restrained portfolio concept and a complete responsive implementation, with a structured project collection and a straightforward publishing workflow for the studio team.",
    deliverables: [
      "Editorial and visual direction",
      "Project content model",
      "Responsive website",
      "Image and performance optimization",
      "Publishing guide",
    ],
  },
  {
    slug: "goodwell",
    name: "Goodwell",
    sector: "Everyday healthcare",
    year: "2025",
    art: "goodwell",
    title: "Care, with the complicated parts removed.",
    description:
      "A warmer way to discover a practitioner and take the first step toward care.",
    tags: ["Research", "Experience design", "Product"],
    challenge:
      "Finding a practitioner is a personal decision. Goodwell wanted its first experience to make room for uncertainty, answer practical questions, and help people make an informed choice.",
    approach:
      "We organized the experience around people’s questions: who can help, what happens next, and what a visit involves. Plain language and an accessible, reassuring interface guide the journey at a comfortable pace.",
    outcome:
      "A clear discovery and booking prototype, with informative practitioner profiles, transparent appointment details, and a consistent foundation for the next phase of development.",
    deliverables: [
      "Discovery interviews and journey map",
      "Content and information architecture",
      "Practitioner and appointment interface",
      "Responsive interactive prototype",
      "Accessible design guidelines",
    ],
  },
];
