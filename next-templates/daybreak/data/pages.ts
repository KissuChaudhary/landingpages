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
    label: "A little perspective",
    title: "Good tools leave\nroom to think.",
    intro:
      "Daybreak is an example of a calmer marketing workspace. One place for your signals, and a little more room for your judgment.",
    sections: [
      {
        title: "Start with what matters",
        text: "A team doesn't need another busy screen. It needs a shared picture of the work, the context behind it, and a clear way to decide what comes next.",
      },
      {
        title: "Keep people in the picture",
        text: "A useful recommendation has a source. A useful workflow has a review step. Build around the people making the decisions, and give them the context to do it well.",
      },
      {
        title: "Make it your own",
        text: "The brand, teams and product in this site are fictional examples. Use the included experience as a starting point for the story of your own business.",
      },
    ],
  },
  "a-better-monday": {
    label: "The journal · Working well",
    title: "A better Monday\nbegins on Friday.",
    intro:
      "The weekly review is a rhythm, not a race to finish another spreadsheet.",
    sections: [
      {
        title: "Agree on the questions",
        text: "Before choosing the chart, choose the conversation. What changed? Which campaign deserves another look? Where is the next useful experiment? A small set of shared questions gives the report a purpose.",
      },
      {
        title: "Keep the source close",
        text: "A summary is useful when the team can inspect what shaped it. Put the campaign, time period and attribution context beside the conclusion. Make the underlying numbers available to download.",
      },
      {
        title: "Leave room for the next move",
        text: "A report is a beginning. End with a short list of decisions to review, rather than a long list of things that happened. A calmer Monday leaves time for the work ahead.",
      },
    ],
  },
  "reading-a-return": {
    label: "The journal · Seeing clearly",
    title: "A return is a signal.\nGive it some context.",
    intro: "A useful number asks for a thoughtful conversation.",
    sections: [
      {
        title: "Compare like with like",
        text: "Keep the time period, currency and attribution window consistent. A returning customer's purchase and a first interaction with a brand can mean different things, even when the return looks similar.",
      },
      {
        title: "Look beyond the strongest number",
        text: "A small campaign with a high return can be a useful clue. Review audience size and creative performance before assuming it can carry a larger budget. The next test is where the idea becomes useful.",
      },
      {
        title: "Make the assumption visible",
        text: "The example workspace divides attributed revenue by campaign spend. Real teams should bring their own attribution model, costs and business context to the review.",
      },
    ],
  },
  "shared-context": {
    label: "The journal · Thinking together",
    title: "A shared picture.\nA better conversation.",
    intro: "Context is the quiet work that makes a decision possible.",
    sections: [
      {
        title: "Give each source a role",
        text: "Your campaign platform, website analytics and customer records each see a different part of the work. Label the contribution of each source instead of treating the numbers as interchangeable.",
      },
      {
        title: "Write down the useful boundary",
        text: "A workflow becomes easier to trust when the team knows what it reads, what it prepares and where it stops for review. Put that boundary beside the output.",
      },
      {
        title: "Keep the team in charge",
        text: "Automation can prepare the routine work. People bring the purpose and judgment. A good workspace makes the handoff between those two parts feel clear.",
      },
    ],
  },
  privacy: {
    label: "The details",
    title: "Privacy, with a\nlittle clarity.",
    intro:
      "This page is an editable policy placeholder for the template's future owner. It is not a production privacy policy.",
    sections: [
      {
        title: "What the preview stores",
        text: "The preview remembers only the motion preference in local browser storage. Its campaign examples run on your device. A locally prepared contact brief is not sent to a server.",
      },
      {
        title: "Your production services",
        text: "Replace this page with a policy that accurately describes your own contact handling, analytics, account systems, integrations, processors, retention and visitor rights before publishing your business.",
      },
      {
        title: "Questions and requests",
        text: "Add the contact route and processes your business uses for privacy questions and data requests. The template does not implement account or data deletion services.",
      },
    ],
  },
  terms: {
    label: "The details",
    title: "A clear starting\npoint for the details.",
    intro:
      "This page is an editable terms placeholder. Replace it with the terms that apply to your own product and business before launch.",
    sections: [
      {
        title: "The example experience",
        text: "This website uses fictional teams and local campaign data to demonstrate a marketing workspace. Reviewing a plan does not create an account or collect a payment.",
      },
      {
        title: "Your service and billing",
        text: "Describe the real service you offer, its access rules, billing and cancellation processes, ownership terms, support and other applicable conditions. Configure your checkout destinations before offering paid subscriptions.",
      },
      {
        title: "Template usage",
        text: "The source download includes a separate commercial template license. That license governs use of the template itself and should not be confused with your own customer terms.",
      },
    ],
  },
  accessibility: {
    label: "A little room for everyone",
    title: "A workspace you can\nfind your way around.",
    intro:
      "Thoughtful details help people move through the page in the way that works for them.",
    sections: [
      {
        title: "Keyboard and navigation",
        text: "Use Tab to move between controls. The product and perspective tabs support arrow keys, Home and End. Dialogs can be closed with Escape and return focus to the control that opened them.",
      },
      {
        title: "Motion preferences",
        text: "The site respects the operating system's reduced-motion setting. The footer pause control also remembers a preference on this device. Pausing motion keeps every example interaction available.",
      },
      {
        title: "A continuing practice",
        text: "This page records the template's intended behavior; it is not a formal conformance certification. Recheck accessibility when changing content, integrations or visual styles.",
      },
    ],
  },
};
export const articles = [
  {
    slug: "a-better-monday",
    category: "Working well",
    title: "A better Monday begins on Friday.",
    text: "Build a reporting rhythm that leaves room for the next good decision.",
  },
  {
    slug: "reading-a-return",
    category: "Seeing clearly",
    title: "A return is a signal. Give it some context.",
    text: "A few useful questions to ask before moving the campaign budget.",
  },
  {
    slug: "shared-context",
    category: "Thinking together",
    title: "A shared picture. A better conversation.",
    text: "Bring the right context close, so the team can move forward together.",
  },
] as const;
