export const articles = [
  {
    slug: "five-day-close",
    title: "A five-day close, one habit at a time.",
    excerpt:
      "You don’t shorten the close in one project. You move a little of it into the month, and keep moving.",
    author: "Maya Chen",
    category: "The close",
    read: "5 min read",
    art: "orbit",
    person: 1,
    sections: [
      {
        heading: "Count the days honestly.",
        text: "Write down when the last entry for a month actually posts, not when the checklist says it should. Most teams find the long pole isn’t one task but a queue: reconciliations waiting on statements, accruals waiting on invoices, reviews waiting on reviewers. The number of days is a symptom; the queue is the thing to fix.",
      },
      {
        heading: "Reconcile during the month.",
        text: "Bank and card lines don’t have to wait for the statement. Matching them daily against the ledger means the first business day starts with a handful of exceptions instead of a few thousand lines. The work doesn’t disappear, it just stops arriving all at once.",
      },
      {
        heading: "Give every task one owner and one day.",
        text: "A close checklist with shared ownership is a list of things everyone assumes someone else is doing. Name one person per task and the business day it’s due. When a task slips, you’ll know which one, and the conversation is about that task rather than the whole close.",
      },
      {
        heading: "Protect the review time.",
        text: "The last two days are where judgment happens: variances, estimates, the entries that need a second look. Everything you move earlier in the month buys time back here. A shorter close that skips the review isn’t faster, it’s just less careful.",
      },
    ],
  },
  {
    slug: "what-auditors-ask-for",
    title: "What your auditors will actually ask for.",
    excerpt:
      "Most audit requests are the same few questions. Answer them once, as you close, and the fieldwork gets quieter.",
    author: "David Ellis",
    category: "Audit",
    read: "6 min read",
    art: "stack",
    person: 3,
    sections: [
      {
        heading: "Where did this number come from?",
        text: "For any balance or entry, an auditor wants to trace it back to something outside the ledger: a bank statement, an invoice, a contract, a calculation. Keep the link to that support on the entry itself. Folders organised by month are a filing system; links on entries are evidence.",
      },
      {
        heading: "Who prepared it, and who checked it?",
        text: "Segregation of duties is easy to describe and tedious to prove. Record the preparer and the approver on every manual entry, with the date each acted. If your approval limits are written down, show that the entry followed them.",
      },
      {
        heading: "What changed after it was posted?",
        text: "Reversals, reclassifications and late adjustments are where questions cluster. Keep the reason for each change next to the change. A one-line note written at the time is worth more than a long explanation reconstructed months later.",
      },
      {
        heading: "Can you show it for the whole year?",
        text: "Sampling means the auditor picks the month, not you. A close that’s documented the same way every period means you can answer for March as easily as for December. Consistency matters more than polish.",
      },
    ],
  },
  {
    slug: "variance-notes",
    title: "Writing variance notes people read.",
    excerpt:
      "A good flux explanation is short, specific and ends with what happens next. Here’s how to write one.",
    author: "Alex Rivera",
    category: "Reporting",
    read: "4 min read",
    art: "connections",
    person: 0,
    sections: [
      {
        heading: "Set a threshold and keep it.",
        text: "Explaining every movement teaches readers to skip the notes. Pick a rule, such as above 10% and above a set amount, and apply it every month. A consistent threshold is also easier to defend when someone asks why a line wasn’t explained.",
      },
      {
        heading: "Say what happened, not what moved.",
        text: "“Software expense increased” repeats the number. “The annual design tool renewal was paid in October” explains it. Name the event, the vendor or the customer, and the amount it accounts for. If two things drove the change, say both and roughly how much each contributed.",
      },
      {
        heading: "Say whether it will happen again.",
        text: "The reader’s real question is usually about next month. A one-off payment, a timing difference and a new run rate need very different responses. End the note with which one this is, and any entry you’ll make because of it.",
      },
      {
        heading: "Draft early, finish late.",
        text: "Start the notes as soon as the trial balance is close, with what you already know. Fill in the details as reconciliations finish. In the Arclo examples, variance notes are drafted locally from sample data; your own close decides what’s written and who signs it off.",
      },
    ],
  },
];
