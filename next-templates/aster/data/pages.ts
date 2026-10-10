export const articles=[
  {
    slug: "feedback-with-direction",label: "The next version",title: "Useful feedback names the change.",description: "Move from a broad opinion to a specific next step without losing the client’s intent.",art: "blossom"
  },
  {
    slug: "a-brief-worth-revisiting",label: "An agreed starting point",title: "Keep the brief in the conversation.",description: "Make the project’s direction a useful reference throughout the review process.",art: "petal"
  },
  {
    slug: "closing-a-review-round",label: "Finishing the work",title: "A review round deserves a decision.",description: "Give the next version a purpose, an owner and a clear path to sign-off.",art: "grass"
  }
];
export const pages: Record<string,{
  label: string;
  title: string;
  intro: string;
  sections: {
    title: string;
    text: string;
  }[];
}>={
  about: {
    label: "Our approach",title: "Good work takes a conversation.",
    intro: "Aster is a creative review workspace for independent practices and studios. It brings the client’s feedback, the agreed brief and the next decision into one considered place.",
    sections: [
      { title: "Stay close to the work",text: "A useful review has a project and a version. A useful comment explains what should change. Keeping both beside the brief gives the studio and the client a shared starting point." },
      { title: "A workspace you can make your own",text: "This template includes original creative-project scenarios, editable review interfaces and locally shipped artwork. Replace the fictional studios and connect your own product services before launching a live workspace." }
    ]
  },
  updates: {
    label: "In the studio",title: "A few things taking shape.",
    intro: "A sample release journal for the creative review workspace. Replace these entries with your own product’s updates.",
    sections: [
      { title: "October 9 · Decisions with a direction",text: "The local review board now brings twelve reviews across four creative projects together. Edit a studio response, approve a review or request a revision with an owner and reason. Reports and exports reflect each decision." },
      { title: "October 5 · The brief, alongside",text: "Each project has a searchable brief with the agreed direction, deliverables and constraints. Read it beside the feedback or include the full reference in a review export." }
    ]
  },
  privacy: {
    label: "The details",title: "Privacy, in plain language.",intro: "Policy placeholder for the Aster template. Replace this page with the policy that applies to your own service before launch.",
    sections: [
      { title: "The local demonstration",text: "Projects, studios and reviews are fictional. Decisions remain in browser memory and reset on reload. Motion follows the system setting without storing a separate preference. Downloads are prepared locally." },
      { title: "Your production service",text: "Document the project information you collect, its purpose, processors, retention, user rights and contact route. Explain client access to files and feedback. If you configure a contact endpoint, describe how submitted details are handled." }
    ]
  },
  terms: {
    label: "The details",title: "Terms for your review space.",intro: "Terms placeholder for the Aster template. Replace this page with your business’s own terms before launch.",
    sections: [
      { title: "The example experience",text: "The included workspace uses local fictional projects. It does not create an account, upload files, invite clients or collect a payment. The plans show example product pricing." },
      { title: "Your own service",text: "Describe access, billing, cancellation, permitted use, availability and ownership of project materials for your product. The template’s commercial usage terms are provided separately in LICENSE.md." }
    ]
  },
  accessibility: {
    label: "Room for everyone",title: "A considered experience.",intro: "Clear controls, readable type and a useful path through the page are part of the product experience.",
    sections: [
      { title: "Keyboard navigation",text: "Navigate links and controls with Tab. Product tabs support arrow keys, Home and End. Dialogs close on Escape and return focus to their invoking control. The page includes a skip link." },
      { title: "Motion and readability",text: "System reduced motion disables decorative movement. Product tours and the full review workspace provide readable versions of the compact marketing scenes." }
    ]
  },
  "feedback-with-direction": {
    label: "The next version",title: "Useful feedback names the change.",intro: "A broad opinion can open the conversation, but a specific request gives the next version somewhere to go. Keep the intent and the action together.",
    sections: [
      { title: "Find the reason beneath the preference",text: "If an image feels too loud, ask what it competes with. If a page feels crowded, identify the information that needs more room. Refer to the audience and purpose in the brief before choosing a visual change." },
      { title: "Record one actionable next step",text: "Write down the agreed change in terms the maker can use: replace the opening image, move availability ahead of contact fields, or open the wordmark spacing. Name the owner and retain the original feedback for context." }
    ]
  },
  "a-brief-worth-revisiting": {
    label: "An agreed starting point",title: "Keep the brief in the conversation.",intro: "A brief is useful beyond kickoff. It gives each review a shared reference for the audience, deliverables and constraints that shaped the work.",
    sections: [
      { title: "Make the direction easy to find",text: "Keep the agreed creative direction specific. Name the selected imagery, the intended tone and the delivery formats. Include what sits outside the project so a new request can be discussed before it becomes unplanned work." },
      { title: "Let the brief evolve deliberately",text: "When the direction changes, agree the change with the client and update the brief. Record its date and explain which version of the work will use the new direction. Avoid rewriting the reference silently midway through a review." }
    ]
  },
  "closing-a-review-round": {
    label: "Finishing the work",title: "A review round deserves a decision.",intro: "A review round should end with an approval or a clear request for another pass. The decision makes the next stage easier to plan.",
    sections: [
      { title: "Separate discussion from sign-off",text: "A positive comment can still carry an unresolved change. Read the complete feedback, confirm the current version and record an explicit decision. Keep production specifications separate from aesthetic approval when the project needs both." },
      { title: "Give the next pass a boundary",text: "When changes are requested, name what will be revised and who owns it. Refer back to the brief and agree what stays in place. A focused next pass is easier to review than a version that changes everything at once." }
    ]
  }
};
