export const articles = [
  {
    slug: "the-human-handoff",
    label: "People in the loop",
    title: "The next person deserves the whole picture.",
    description:
      "A handoff is more useful when it carries the question, its source and a clear next step.",
    art: "blossom",
  },
  {
    slug: "knowledge-that-helps",
    label: "A stronger starting point",
    title: "Good knowledge makes room for a good answer.",
    description: "Keep help articles useful, specific and easy to review.",
    art: "petal",
  },
  {
    slug: "a-calmer-queue",
    label: "A clearer support day",
    title: "Begin with the queue. Make room for the person.",
    description:
      "A few useful habits for reading the work before assigning it.",
    art: "grass",
  },
];
export const pages: Record<
  string,
  {
    label: string;
    title: string;
    intro: string;
    sections: { title: string; text: string }[];
  }
> = {
  about: {
    label: "Our approach",
    title: "Good support leaves room for people.",
    intro:
      "Aster is an original white-label example of a more thoughtful support workspace. Its design brings the question, knowledge and next step together.",
    sections: [
      {
        title: "Keep the useful context close",
        text: "A visible source gives a draft a better starting point. A clear owner gives a handoff somewhere to go. A shared view helps a team understand what needs care.",
      },
      {
        title: "Make it your own",
        text: "This template includes editable interfaces, sample tickets and original artwork. Replace the example brand, stories and policies with your own, then connect your product services.",
      },
    ],
  },
  updates: {
    label: "What's taking shape",
    title: "A few useful next steps.",
    intro:
      "A sample changelog for the white-label workspace. Replace these entries with your product's own releases.",
    sections: [
      {
        title: "October 9 · A clearer workspace",
        text: "The local inbox brings ticket review, source context, draft editing and handoff into one place. Search the queue, review the reporting view and export the current results.",
      },
      {
        title: "October 5 · Knowledge in context",
        text: "Help articles have a readable revision date, topic and full body. Search the knowledge library and keep the relevant article beside the conversation.",
      },
    ],
  },
  privacy: {
    label: "The details",
    title: "Privacy, in plain language.",
    intro:
      "Policy placeholder for the Aster template. Replace this page with the policy that applies to your own service before launch.",
    sections: [
      {
        title: "The local demonstration",
        text: "Example tickets are fictional. Ticket edits remain in browser memory and reset when the workspace reloads. A motion preference may be stored in this browser. Downloads are prepared locally.",
      },
      {
        title: "Your production service",
        text: "Document the information you collect, its purpose, processors, retention, customer rights and contact route. If you configure a contact endpoint, explain how submitted details are handled.",
      },
    ],
  },
  terms: {
    label: "The details",
    title: "Terms for your workspace.",
    intro:
      "Terms placeholder for the Aster template. Replace this page with your business's own terms before launch.",
    sections: [
      {
        title: "The example experience",
        text: "The included workspace uses local fictional data. It does not create an account, send customer messages or collect a payment. The plans show example product pricing.",
      },
      {
        title: "Your own service",
        text: "Describe access, billing, cancellation, permitted use, availability, ownership and support for your product. The template's commercial usage terms are provided separately in LICENSE.md.",
      },
    ],
  },
  accessibility: {
    label: "Room for everyone",
    title: "A considered experience.",
    intro:
      "Clear controls, readable type and a useful path through the page are part of the product experience.",
    sections: [
      {
        title: "Keyboard navigation",
        text: "Navigate links and controls with Tab. Product tabs support arrow keys, Home and End. Dialogs close on Escape and return focus to their invoking control. The page includes a skip link.",
      },
      {
        title: "Motion and readability",
        text: "System reduced motion disables decorative movement. The footer includes a remembered manual motion control. Product tours and the full workspace provide readable versions of the compact marketing scenes.",
      },
    ],
  },
  "the-human-handoff": {
    label: "People in the loop",
    title: "The next person deserves the whole picture.",
    intro:
      "A customer should not have to begin the conversation again when a person joins it. A good handoff keeps the useful context intact.",
    sections: [
      {
        title: "Give it a reason",
        text: "Describe what needs a person: an exception, an unresolved account question or a decision the current source cannot support. A short reason helps the next teammate read the work.",
      },
      {
        title: "Keep the source",
        text: "Carry the customer's original question, the relevant policy and the draft already reviewed. Make the owner clear. Preserve the customer's own words where they explain what went wrong.",
      },
    ],
  },
  "knowledge-that-helps": {
    label: "A stronger starting point",
    title: "Good knowledge makes room for a good answer.",
    intro:
      "The best source is one a person can understand and review. Keep the useful rule, its exceptions and the next step together.",
    sections: [
      {
        title: "Write for the question",
        text: "Use specific titles and clear examples. A return policy should explain the window, conditions and what happens next. An account article should describe the usual recovery path without asking for private credentials.",
      },
      {
        title: "Leave a review trail",
        text: "Give articles a revision date and an owner in your own knowledge service. When the policy changes, make it easy to see which drafts relied on the earlier source.",
      },
    ],
  },
  "a-calmer-queue": {
    label: "A clearer support day",
    title: "Begin with the queue. Make room for the person.",
    intro:
      "A queue is more useful when it makes the work legible. Read what is waiting before deciding who should pick it up.",
    sections: [
      {
        title: "Separate urgency from arrival",
        text: "A newer question may need more care than an older routine one. Make the category, priority and current owner visible. Keep a way to review the original conversation.",
      },
      {
        title: "Review the useful picture",
        text: "Read the resolved, waiting and handoff counts together. A summary is a starting point for the team conversation, not a substitute for the customer context beneath it.",
      },
    ],
  },
};
