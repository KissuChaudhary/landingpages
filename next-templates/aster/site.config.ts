export type Billing="monthly"|"annual";
export const site={
  brand: "Aster",
  title: "Aster — a shared space for creative reviews",
  description: "Present the work, gather client feedback and record the next decision. A considered review workspace for independent creatives and studios.",
  links: {
    app: "",contactEndpoint: "",contactEmail: ""
  },
  hero: {
    announcement: "For the work between versions",
    heading: ["Share the work.","Shape what’s next."],
    text: "A shared space for creative reviews. Bring the brief, the feedback and the next decision together, so your best work keeps moving.",
    cta: "Explore Aster"
  },
  features: {
    label: "From first look to final sign-off",
    heading: ["Thoughtful feedback.","A clear way forward."],
    items: [
      {
        title: "Give the work a conversation",text: "Keep each review with its project and version. Read the feedback without piecing together a thread of emails.",scene: "feedback"
      },
      {
        title: "Keep the brief in view",text: "Bring the agreed direction into the review. A useful reference makes every comment more specific.",scene: "briefs"
      },
      {
        title: "Turn a note into a next step",text: "Agree what needs changing, choose who takes it forward and keep the decision with the work.",scene: "revision"
      }
    ]
  },
  benefits: {
    label: "A little structure for the process",
    heading: ["Room for the work.","Clarity for everyone."],
    items: [
      {
        title: "Know where each project stands.",text: "See the reviews waiting for a decision, the work returning for another pass and the pieces ready to move on. Keep the studio’s next steps in one view.",scene: "performance",art: "grass",cta: "See the project overview",view: "reporting"
      },
      {
        title: "Make feedback useful to the maker.",text: "Read the client’s note beside the brief. Write a considered response, capture the change and leave the next person with something they can act on.",scene: "response",art: "blossom",cta: "Open a creative review",view: "reviews"
      },
      {
        title: "Close a round with a decision.",text: "A review should lead somewhere. Record an approval or request a revision with an owner and a reason, so the next version begins with a clear direction.",scene: "queue",art: "grass",cta: "Browse the review board",view: "board"
      }
    ]
  },
  useCases: { label: "Inside the studio",heading: ["One review process.","Many kinds of work."] },
  trust: {
    label: "Care in the details",heading: ["The work changes.","The context stays."],
    text: "Make it easy to understand what was asked, what was agreed and who is taking the next step.",
    items: [
      {
        title: "An agreed starting point",text: "Read the project brief alongside each feedback thread.",icon: "book"
      },
      {
        title: "A named next step",text: "Give revision requests an owner and a specific change to make.",icon: "people"
      },
      {
        title: "A record of decisions",text: "See approvals and revision requests in this visit’s activity trail.",icon: "history"
      },
      {
        title: "A useful handover",text: "Export the review, edited response and full brief together.",icon: "download"
      }
    ]
  },
  pricing: {
    label: "A place for your practice",heading: ["Start with a project.","Grow with your studio."],text: "Three ways to bring a little more order to the creative process."
  },
  plans: [
    {
      id: "solo",name: "Solo",monthly: 0,annual: 0,text: "For an independent practice finding its rhythm.",features: ["Three active projects","One studio member","Client review threads","Project briefs and decisions","Review exports"],cta: "Find your starting point",checkout: { monthly: "",annual: "" }
    },
    {
      id: "studio",name: "Studio",monthly: 32,annual: 26,text: "For a small team shaping the work together.",features: ["Twenty active projects","Six studio members","Shared revision board","Project review reporting","Reusable brief library"],cta: "Bring your studio together",checkout: { monthly: "",annual: "" }
    },
    {
      id: "collective",name: "Collective",monthly: null,annual: null,text: "For a creative practice with a wider circle.",features: ["A tailored project allowance","Multiple studio teams","Workspace configuration","Guided team onboarding","A dedicated point of contact"],cta: "Talk about your practice",checkout: { monthly: "",annual: "" }
    }
  ],
  story: {
    label: "A studio in focus",heading: ["Better work begins","with a shared direction."],
    quote: "The useful part isn’t collecting more opinions. It’s knowing which change we’ve agreed to make. We can keep that decision beside the brief and get back to designing.",
    person: "Nina Shah",role: "Creative director at Willow",
    note: "An illustrative studio story. Counts below come from the fictional review board."
  },
  perspectives: {
    label: "Around the creative table",heading: ["Different practices.","A shared point of view."],note: "Fictional studios and original portraits. Replace with your own client stories."
  },
  faq: {
    label: "Before your first review",heading: ["A few things","you might be wondering."],
    items: [
      { q: "What can I try in the review space?",a: "Explore twelve fictional reviews across four creative projects. Filter by format, discipline or decision, edit a response, approve a review or request changes with an owner and reason. The board, report and exports reflect your local decisions." },
      { q: "Does a decision notify the client?",a: "This template demonstrates the review process with local data. Decisions stay in browser memory until reload; no client receives a notification. Connect your own storage, permissions and delivery services for a live workspace." },
      { q: "Can I read the brief while reviewing?",a: "Each example review links to a full project brief with its direction, deliverables and constraints. Open that reference beside the feedback or search the separate brief library. Review exports include the complete linked brief." },
      { q: "What does annual Studio billing cost?",a: "Studio is shown at $32 monthly or $312 billed once a year. Annual billing works out to $26 per month, saving $72 over twelve monthly payments. The plan review shows the total before you continue." },
      { q: "Can I tailor this to my own creative product?",a: "Yes. Branding, page copy, example plans and destinations are configured separately from reviews, project briefs, connection guides and editorial articles. The product scenes are editable React interfaces and the artwork ships locally." },
      { q: "Can I upload files or invite a client here?",a: "The included demo covers feedback and decisions; it does not upload files or invite real people. The connection directory outlines design files, storage and team workflows you can connect when building your production service." }
    ]
  },
  closing: {
    label: "For the next version",heading: ["Good work deserves","a clear next step."],text: "Bring the project. Gather the feedback. Leave with a shared direction.",cta: "Open the review space"
  },
  footer: { text: "A considered review space for the people who make things together.",note: "Fictional studios. Working local reviews." }
};
export const appHref=(view="reviews") => site.links.app||`/workspace?view=${view}`;
