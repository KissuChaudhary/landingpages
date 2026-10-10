export const articles = [
  {
    slug: "make-the-first-minute-count",
    title: "Make the first minute count.",
    category: "Product thinking",
    date: "2026-09-18",
    read: "3 min",
    art: "counter" as const,
    excerpt:
      "Before the feature list, before the roadmap: what does the first minute of your product feel like?",
    paragraphs: [
      "The first minute of a product is a small thing with an outsized responsibility. It tells someone what this place is, what it expects of them, and whether they’re likely to feel at home. It deserves the same attention as the feature everyone came to build.",
      "We begin by writing that minute down in plain language. A person arrives with a question. They see an answer. They take one useful step. If the description requires a tour, a setup checklist, and three unfamiliar terms, we haven’t found the simple version yet.",
      "That doesn’t mean every product should show less. It means the first piece of information should earn the next. A financial tool might begin with a clear balance. A planning tool might show the one thing that needs a decision. A wellbeing product might offer a moment without asking for anything at all.",
      "Prototyping the opening before designing the entire system helps us make better decisions. We can put it in someone’s hands, watch where they pause, and hear the language they use. Their understanding is more valuable than our explanation.",
      "The work isn’t finished when the screen looks clear. Loading, empty states, keyboard focus, and the route back all belong to that same minute. These small details build confidence before a person knows they’re looking for it.",
      "A good first minute makes a modest promise and keeps it. Start there, and the rest of the product has something solid to build on.",
    ],
  },
  {
    slug: "design-and-code-at-the-same-table",
    title: "Design and code belong at the same table.",
    category: "Studio practice",
    date: "2026-08-27",
    read: "3 min",
    art: "forma" as const,
    excerpt:
      "The most useful conversations happen while the work can still change. Here’s how we keep them close.",
    paragraphs: [
      "A handoff can look perfectly organized and still lose the most important part of the work: why a decision was made. A beautiful file describes the result. It rarely captures every conversation that led there.",
      "We keep design and engineering at the same table from the beginning. The point isn’t to reach agreement on every detail immediately. It’s to make the right questions available while the answers are still flexible.",
      "An engineer can spot when a simple-looking interaction carries an expensive assumption. A designer can explain why a particular rhythm or sequence matters to the person using it. Together, they can often find a more elegant answer than either discipline would reach alone.",
      "That conversation becomes concrete in a small working slice. We take one meaningful journey, design it with care, and build enough of it to feel the transitions, the content, and the constraints. The prototype becomes a shared reference rather than a specification someone has to interpret.",
      "We also document the intent. A component’s name, a short note about its use, and a clear example do more for the next person than a collection of almost-identical screens. The design system should help someone make a good decision, not only repeat a previous one.",
      "Good collaboration reduces the distance between an idea and the thing that exists. Keeping the people close to the work is the most reliable way we know to do that.",
    ],
  },
  {
    slug: "the-details-that-make-it-yours",
    title: "The details that make it yours.",
    category: "Design notes",
    date: "2026-08-06",
    read: "3 min",
    art: "orra" as const,
    excerpt:
      "A distinctive product is rarely the result of one grand gesture. It’s a hundred small decisions pointing the same way.",
    paragraphs: [
      "You can often recognize a considered product before you can say what makes it distinctive. The words feel right. The spacing makes sense. The way a control responds seems to belong to the same place as everything else.",
      "That feeling comes from consistency of intent. A point of view gives a team a way to choose between two equally functional answers. It makes the decision about the person and the purpose, rather than the preference of whoever happens to be in the room.",
      "We start with a small set of qualities. A product might be direct, optimistic, and precise. Those words need to survive contact with the interface. Direct can mean shorter labels. Optimistic can mean an encouraging empty state. Precise can mean showing exactly what happens when someone confirms a choice.",
      "Motion is part of this language. A transition can tell you where something went, connect two states, or make a hierarchy easier to understand. When it has nothing to communicate, it usually needs to become quieter.",
      "The same standard applies to the less celebrated moments: a validation message, a long title, a slow connection, a small screen. These are the places where the product stops being a presentation and starts being a useful thing.",
      "A hundred small decisions pointing the same way make something recognizable. The work is to keep asking whether each detail belongs.",
    ],
  },
];
export function articleDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
