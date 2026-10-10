export interface Note {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  color: string;
  intro: string;
  sections: { title: string; body: string }[];
}
export const notes: Note[] = [
  {
    slug: "after-the-first-order",
    title: "The first order is\nonly the beginning.",
    category: "Retention",
    readTime: "4 min read",
    color: "lime",
    intro:
      "A purchase is a moment of trust. What happens next helps decide whether that trust becomes a lasting relationship.",
    sections: [
      {
        title: "Start with the customer's next question",
        body: "After checkout, a customer wants to know what happens next. When will the order arrive? How should they use the product? A useful welcome journey answers those questions before asking for another purchase.",
      },
      {
        title: "Make the timing mean something",
        body: "The right follow-up depends on how people use the product. A replenishment message makes sense when a product is likely to run low. A helpful care note belongs closer to arrival. Build the rhythm around the customer's experience, rather than an arbitrary weekly send.",
      },
      {
        title: "Connect the promise to the experience",
        body: "The idea that earned the first click should still be recognisable after the first order. A consistent voice, clear product guidance and useful follow-up give the campaign promise somewhere to go.",
      },
      {
        title: "Give every message a job",
        body: "Map the journey in plain language. For each message, write the customer question, the useful answer and the next action. If its only job is to fill a calendar, reconsider it. A smaller, more thoughtful journey can be a better starting point.",
      },
    ],
  },
  {
    slug: "a-better-creative-brief",
    title: "A better test starts\nwith a better brief.",
    category: "Creative",
    readTime: "3 min read",
    color: "lilac",
    intro:
      "Creative testing becomes more useful when every variation has a clear reason to exist.",
    sections: [
      {
        title: "Write the question before the asset list",
        body: "A brief that asks for twelve ads describes production. A brief that asks which customer motivation makes the product more relevant describes a test. Start with what you want to learn, then decide what needs to be made.",
      },
      {
        title: "Change one meaningful thing",
        body: "Try a distinct customer insight, a different product benefit or a new way to show the offer. Give each creative territory enough consistency to judge the idea. When the hook, format, audience and offer all change, the response becomes harder to interpret.",
      },
      {
        title: "Choose a useful next decision",
        body: "Decide how the learning will influence the next move. It might guide a new campaign angle, a landing-page section or a product education sequence. A test is more valuable when its result can change the work.",
      },
    ],
  },
  {
    slug: "one-connected-growth-plan",
    title: "One journey.\nOne connected plan.",
    category: "Strategy",
    readTime: "5 min read",
    color: "coral",
    intro:
      "Acquisition, creative and retention work better when they share a customer story and a commercial question.",
    sections: [
      {
        title: "Look across the whole journey",
        body: "A campaign can earn attention while the product page leaves a key question unanswered. A first-order offer can convert while the welcome experience gives little reason to return. Review the moments together before deciding which channel needs more work.",
      },
      {
        title: "Choose a shared priority",
        body: "Bring the team around one practical question. It could be improving the clarity of an offer, attracting a better-fit audience or making the second order easier. A shared priority helps different disciplines contribute to the same direction.",
      },
      {
        title: "Keep the commercial context close",
        body: "A useful plan connects the creative idea to the product, margin, budget and customer experience. Agree on the measures and constraints early. That context gives both the strategy and the creative room to be ambitious without losing their purpose.",
      },
      {
        title: "Make the review a working session",
        body: "Use a regular rhythm to compare what you expected with what happened. Keep the notes simple: what changed, what it might mean, what to try next. A connected plan is a living set of decisions, rather than a deck finished at launch.",
      },
    ],
  },
];
