// Journal articles. The first two appear on the home page; all of them are listed at /journal.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string; // ISO date
  readTime: string;
  author: { name: string; role: string };
  cover: string;
  coverAlt: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "stop-asking-for-friday-timesheets",
    title: "Why we stopped asking for timesheets on Friday",
    excerpt: "Reconstructing a week from memory produces fiction. Here is what replaced the Friday reminder at the studios we work with.",
    tags: ["Operations", "Time"],
    date: "2026-09-18",
    readTime: "6 min read",
    author: { name: "Elena Voss", role: "Head of Product" },
    cover: "/images/journal-notes.webp",
    coverAlt: "Hands writing in a notebook beside a laptop and a cup of coffee.",
    body: [
      { type: "p", text: "Every studio has the same ritual. At four on Friday a reminder goes out, and twenty people try to remember what they did on Tuesday. Some open their calendar, some scroll their commits, most guess. The result is a timesheet that looks precise and is mostly fiction." },
      { type: "p", text: "The cost is not the twenty minutes. It is the hours that never make it onto an invoice, the budget that looks healthy until it suddenly isn't, and the quiet resentment of people who became designers and engineers to do the work, not to account for it." },
      { type: "h2", text: "The work already leaves a trail" },
      { type: "p", text: "Nearly everything a studio does is recorded somewhere. Meetings live in calendars. Code lives in commits. Design work lives in version histories. Calls have start and end times. The information needed for an honest timesheet exists before anyone opens one." },
      { type: "p", text: "So we stopped asking people to write their week and started asking them to confirm it. Notch drafts each day from those sources, matches entries to projects, and marks anything it is unsure about. Confirming a week takes about a minute." },
      { type: "quote", text: "People are good at recognising what they did. They are bad at recalling it from nothing." },
      { type: "h2", text: "What changed for the studios" },
      { type: "list", items: ["Captured billable time rose by a median of 9% in the first month, mostly from short calls and review sessions that used to vanish.", "Month-end closed a week earlier, because timesheets were approved as the month went, not at the end of it.", "Nobody missed the Friday reminder."] },
      { type: "p", text: "Drafted timesheets are not about watching people more closely. Notch only reads the sources a person connects, and everything stays a suggestion until they confirm it. The goal is fewer guesses, not more surveillance." },
    ],
  },
  {
    slug: "pricing-a-retainer",
    title: "Pricing a retainer that survives scope creep",
    excerpt: "Retainers fail slowly. A few small habits keep them profitable without turning every request into a negotiation.",
    tags: ["Pricing", "Clients"],
    date: "2026-08-27",
    readTime: "5 min read",
    author: { name: "Daniel Okafor", role: "Customer lead" },
    cover: "/images/journal-pricing.webp",
    coverAlt: "Two people sketching a plan on paper in a glass meeting room.",
    body: [
      { type: "p", text: "A retainer is a promise of attention, not a bucket of hours. That is what makes it valuable to clients, and it is exactly why it drifts. Small requests arrive, each reasonable on its own, and three months later the studio is doing a fifth more work for the same fee." },
      { type: "h2", text: "Write down what the retainer is for" },
      { type: "p", text: "The most useful line in a retainer agreement is the one that names its purpose: maintaining a design system, shipping a monthly campaign, keeping a product moving. Requests that serve the purpose are in scope. Requests that don't are a conversation, not a favour." },
      { type: "h2", text: "Track it against an allowance, not a ceiling" },
      { type: "p", text: "Give each retainer an hours allowance and watch burn weekly, not monthly. When a retainer runs above its allowance two months in a row, that is information about the relationship, and it is far easier to discuss with a chart than with a feeling." },
      { type: "list", items: ["Review retainer burn every Monday, for five minutes.", "Share the same view with the client in their portal.", "Reprice at the quarter, using what actually happened."] },
      { type: "quote", text: "Clients rarely object to paying for more work. They object to finding out late." },
      { type: "p", text: "Retainers that are visible on both sides stay healthy. The studio sees drift early, and the client sees the value of the attention they are paying for." },
    ],
  },
  {
    slug: "the-75-percent-rule",
    title: "The 75% rule for project budgets",
    excerpt: "Most overruns are visible weeks before they happen. One threshold gives you time to act while there are still good options.",
    tags: ["Budgets"],
    date: "2026-07-30",
    readTime: "4 min read",
    author: { name: "Elena Voss", role: "Head of Product" },
    cover: "/images/journal-wall.webp",
    coverAlt: "A designer pinning printed layouts to a studio wall.",
    body: [
      { type: "p", text: "By the time a project hits 100% of its budget, the options are poor: absorb the loss, or ask the client for money after the fact. At 75%, the options are still good. You can trim scope, re-sequence work, or agree on a change order while there is something to trade." },
      { type: "h2", text: "Why 75%" },
      { type: "p", text: "On most projects, the burn rate in the final quarter of a budget is rarely lower than in the third. If a project is at 75% of budget with less than 75% of the work done, the overrun is already baked in. The threshold gives a team roughly two to three weeks to respond on a typical engagement." },
      { type: "h2", text: "What to do when the alert fires" },
      { type: "list", items: ["Compare budget used with work completed, honestly.", "Decide whether the gap is scope, estimate or execution.", "Talk to the client within a week, with a proposal, not just a problem."] },
      { type: "p", text: "Notch sends the alert to the project lead and the account owner at the same time, with the burn chart attached. The point is not the notification. It is making the conversation early and ordinary." },
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
