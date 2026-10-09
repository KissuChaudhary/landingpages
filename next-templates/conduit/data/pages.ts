import { site } from "@/site.config";
export const pages = {
  about: {
    label: "The idea behind Conduit",
    title: "Good tools should bring work together.",
    intro: `${site.brand} is a fictional agent platform built around a simple idea: useful intelligence belongs inside the work, alongside the people who know it best.`,
    chapters: [
      {
        title: "Start with the outcome",
        body: "The clearest workflows begin with a useful result. A resolved request. A prepared decision. A person who can take the next step with the context they need.",
      },
      {
        title: "Make the system understandable",
        body: "A workflow should be something you can read. Triggers, context, decisions and actions should have visible relationships, with a clear record of what happened.",
      },
      {
        title: "Keep people in the right places",
        body: "Some work benefits from automation. Some decisions benefit from judgment. A thoughtful system makes room for both, and makes that boundary easy to see.",
      },
    ],
  },
  guides: {
    label: "Field notes",
    title: "A practical place to begin.",
    intro:
      "A few ideas for turning a broad ambition into a focused, useful agent workflow.",
    chapters: [
      {
        title: "01 / Choose a repeatable starting point",
        body: "Look for a task that happens often and follows a pattern. Begin with a narrow outcome, a small set of inputs and a clear definition of done.",
      },
      {
        title: "02 / Give the agent the right context",
        body: "Supply the documents, records or instructions that actually matter to the task. More information is not always better; relevant, current information is.",
      },
      {
        title: "03 / Draw the decision boundary",
        body: "Decide which actions the agent can prepare and which actions a person must approve. Document that boundary before connecting live systems.",
      },
      {
        title: "04 / Review the whole run",
        body: "Evaluate each step as well as the final result. Look for missing context, ambiguous instructions and handoffs that could be simpler.",
      },
    ],
  },
  changelog: {
    label: "What is new",
    title: "The connections keep growing.",
    intro: "Release notes for the included Conduit workspace examples.",
    chapters: [
      {
        title: "October 2026 / The first connection",
        body: "Four example agent blueprints, a four-step lead-routing run, a readable JSON run receipt and a switchable analytics overview.",
      },
      {
        title: "October 2026 / More ways to explore",
        body: "Keyboard-accessible workflow stories, interactive model and tool diagrams, local workflow briefs and three configurable product plans.",
      },
      {
        title: "October 2026 / A considered foundation",
        body: "Self-hosted fonts, original generated imagery, reduced-motion support, responsive layouts and a standalone Next.js project with a static demo export.",
      },
    ],
  },
  privacy: {
    label: "Privacy",
    title: "A clear view of your information.",
    intro:
      "This is a template privacy notice. Replace it with a policy that describes your business and actual data practices before launch.",
    chapters: [
      {
        title: "The local demonstration",
        body: "Agent examples run in the browser and do not connect to external accounts. The contact form prepares a local brief unless a contact endpoint has been configured. Exporting saves a file to your device.",
      },
      {
        title: "Preference storage",
        body: "The motion preference is stored in localStorage under conduit-motion. The template does not include tracking scripts or analytics cookies.",
      },
      {
        title: "Your production policy",
        body: "State the information you collect, how it is used, where it is stored, retention periods, processors, applicable rights and a real contact destination. Review the finished policy for your service and jurisdiction.",
      },
    ],
  },
  terms: {
    label: "Terms",
    title: "A clear starting point.",
    intro:
      "This is template content, not a completed service agreement. Replace it with the terms that apply to your product before launch.",
    chapters: [
      {
        title: "The preview experience",
        body: "The displayed platform, plans, team identities and example activity are fictional. Plan reviews do not collect payment or create an account. Local examples do not execute actions in third-party services.",
      },
      {
        title: "Your service terms",
        body: "Describe eligibility, account responsibilities, permitted uses, pricing, billing, cancellation, acceptable use, ownership, warranties and the terms applicable to your actual service.",
      },
      {
        title: "Template use",
        body: "The included LICENSE describes the rights to use this design in personal and client end products. It is separate from the service terms that your own customers accept.",
      },
    ],
  },
  accessibility: {
    label: "Access for everyone",
    title: "A thoughtful experience, by default.",
    intro:
      "Clear reading, useful controls and considered motion are part of the design.",
    chapters: [
      {
        title: "Navigate in your own way",
        body: "The page provides a skip link, visible focus states, semantic headings, labeled form controls and native FAQ disclosures. Workflow story tabs support the arrow keys, Home and End.",
      },
      {
        title: "Choose the amount of motion",
        body: "Your system preference for reduced motion is respected. A footer control lets you pause ambient effects and remembers your preference in this browser.",
      },
      {
        title: "Make the template your own",
        body: "Keep meaningful image descriptions, label new controls, maintain readable contrast and check the page again after replacing the content. Accessibility is an ongoing practice.",
      },
    ],
  },
} as const;
export type ContentPageKey = keyof typeof pages;
