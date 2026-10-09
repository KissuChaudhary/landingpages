export type Source = {
  id: string;
  kind: "Article" | "Note" | "Document";
  title: string;
  publisher: string;
  excerpt: string;
  passage: string;
  tag: string;
};
export type Finding = { text: string; sources: string[] };
export type Topic = {
  id: string;
  label: string;
  category: string;
  question: string;
  title: string;
  description: string;
  sources: Source[];
  findings: Finding[];
  takeaway: string;
  connections: string[];
};

// Original, fictional research collections. No external article content or implied endorsements.
export const topics: Topic[] = [
  {
    id: "quiet",
    label: "A calmer workspace",
    category: "Design research",
    question: "What makes a workspace feel calm?",
    title: "Designing for a little less noise.",
    description:
      "A few observations on attention, visual rhythm and giving the important things room.",
    sources: [
      {
        id: "quiet-1",
        kind: "Article",
        title: "The space between things",
        publisher: "Fieldnotes / Sample article",
        tag: "Visual rhythm",
        excerpt: "Space gives the important things a little more room.",
        passage:
          "A calm interface does not need to be empty. It needs a clear rhythm: group what belongs together, separate what needs a decision, and let the primary action have room. Consistent spacing can make a dense workspace feel surprisingly quiet.",
      },
      {
        id: "quiet-2",
        kind: "Note",
        title: "Attention is a material",
        publisher: "Your notes / Sample note",
        tag: "Attention",
        excerpt: "Every element asks for a moment of attention.",
        passage:
          "If every element is emphasized, nothing is. Use contrast where it helps a person decide. Reserve the strongest color for the next useful action, and keep secondary information close enough to find without competing for attention.",
      },
      {
        id: "quiet-3",
        kind: "Document",
        title: "A quieter default",
        publisher: "Studio journal / Sample document",
        tag: "Progressive detail",
        excerpt: "Start with what is useful. Reveal the rest when it matters.",
        passage:
          "The first view should help someone begin. Detail can appear at the point of need instead of surrounding every action. A predictable layout, readable type and fewer simultaneous choices reduce the effort of getting started.",
      },
    ],
    findings: [
      {
        text: "Give related ideas a shared rhythm, with space between decisions.",
        sources: ["quiet-1"],
      },
      {
        text: "Let one useful action carry the strongest visual emphasis.",
        sources: ["quiet-2"],
      },
      {
        text: "Keep the first view simple; bring detail in when it helps.",
        sources: ["quiet-1", "quiet-3"],
      },
    ],
    takeaway: "Calm comes from a clear hierarchy, rather than an empty screen.",
    connections: [
      "Space → Rhythm",
      "Contrast → Attention",
      "Less at once → A clearer start",
    ],
  },
  {
    id: "weekend",
    label: "A slower weekend",
    category: "Everyday planning",
    question: "How do I leave room for a slower weekend?",
    title: "A weekend with room to wander.",
    description:
      "Bring a few places and personal notes together into a plan that leaves space for discovery.",
    sources: [
      {
        id: "weekend-1",
        kind: "Article",
        title: "Take the long way",
        publisher: "Elsewhere / Sample article",
        tag: "Walking",
        excerpt: "The best part of a walk can be the unplanned turn.",
        passage:
          "Choose one neighborhood instead of crossing the whole city. Put a small park, a bookshop and a place to sit on the same walking route. A short list of possibilities is enough; the spaces between them leave room to notice something unexpected.",
      },
      {
        id: "weekend-2",
        kind: "Note",
        title: "Things I want more of",
        publisher: "Your notes / Sample note",
        tag: "Personal pace",
        excerpt: "Coffee, a good book, and no rush to get somewhere else.",
        passage:
          "I want a morning with a slow coffee, time to browse a bookshop and an afternoon outside. I don’t want a timetable full of reservations. One planned stop each day would give the weekend enough shape without turning it into work.",
      },
      {
        id: "weekend-3",
        kind: "Document",
        title: "A short list of places",
        publisher: "Saved collection / Sample document",
        tag: "Nearby places",
        excerpt: "Three small places, all within a comfortable walk.",
        passage:
          "The reading room, canal garden and corner café are within a twenty-minute walk of one another. The garden is a good place to pause between stops. Keep an indoor option in the list so the plan can change with the weather.",
      },
    ],
    findings: [
      {
        text: "Keep the day in one neighborhood, with a few places you can walk between.",
        sources: ["weekend-1", "weekend-3"],
      },
      {
        text: "Choose one anchor each day and let the rest stay open.",
        sources: ["weekend-2"],
      },
      {
        text: "Pair an outdoor pause with an indoor option so the plan can flex.",
        sources: ["weekend-3"],
      },
    ],
    takeaway: "A little structure can make more room for spontaneity.",
    connections: [
      "Nearby places → Less travel",
      "One anchor → More room",
      "Two options → A flexible day",
    ],
  },
  {
    id: "writing",
    label: "An idea worth writing",
    category: "Creative work",
    question: "How do I turn a collection of notes into an essay?",
    title: "Find the thread. Follow the idea.",
    description:
      "A reading list and a rough thought become the beginning of something you can share.",
    sources: [
      {
        id: "writing-1",
        kind: "Article",
        title: "An idea, in the margins",
        publisher: "Commonplace / Sample article",
        tag: "Observation",
        excerpt: "A good first sentence often starts as a small observation.",
        passage:
          "Look for the moment that keeps returning in your notes. A specific observation gives a reader somewhere to stand. Start with it, then ask what it might tell you about the larger idea. You can discover the structure while writing.",
      },
      {
        id: "writing-2",
        kind: "Note",
        title: "The thought I keep having",
        publisher: "Your notes / Sample note",
        tag: "A central question",
        excerpt: "What changes when we stop collecting and start connecting?",
        passage:
          "I keep saving things that feel related: attention, curiosity and the habit of noticing. The question underneath them is whether collecting more actually helps us see more. Maybe the useful shift is to spend time connecting what we already have.",
      },
      {
        id: "writing-3",
        kind: "Document",
        title: "A shape for the first draft",
        publisher: "Writing practice / Sample document",
        tag: "Structure",
        excerpt: "One question, three observations, and somewhere to land.",
        passage:
          "A first draft can have a simple shape: name the question, explore three observations, and return to the opening with a new perspective. Keep examples close to each claim. An outline should help the idea move, not decide every sentence in advance.",
      },
    ],
    findings: [
      {
        text: "Open with one specific observation that gives the reader a place to begin.",
        sources: ["writing-1"],
      },
      {
        text: "Use the recurring question in your notes as the thread of the essay.",
        sources: ["writing-2"],
      },
      {
        text: "Build three observations around that question and return with a new perspective.",
        sources: ["writing-1", "writing-3"],
      },
    ],
    takeaway:
      "The first draft begins when the saved pieces become a point of view.",
    connections: [
      "Observation → An opening",
      "Recurring thought → A question",
      "Three ideas → A first draft",
    ],
  },
];
