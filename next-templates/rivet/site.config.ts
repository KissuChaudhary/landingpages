/** Start here. Empty destinations use the included pages, never a fake success. */
export const site = {
  brand: "Rivet",
  descriptor: "Independent digital studio",
  title: "Rivet® — Good ideas deserve a great product.",
  description:
    "An independent design and engineering studio. We turn ambitious ideas into considered digital products, from the first sketch to the thing people use.",
  url: "", // Your canonical origin, e.g. https://yourstudio.com
  email: "", // Your public business inbox. Empty = download a project brief.
  location: "London · Working everywhere",
  copyrightYear: "2026",
  availability: "Open for select collaborations",
  links: { booking: "", contactEndpoint: "", instagram: "", linkedin: "" },
  navigation: [
    { label: "Selected work", href: "/#work" },
    { label: "The studio", href: "/about" },
    { label: "What we do", href: "/#services" },
    { label: "Field notes", href: "/journal" },
    { label: "Start a project", href: "/contact" },
  ],
  hero: {
    eyebrow: "A small studio for ambitious things",
    lineOne: "Good ideas deserve",
    lineTwo: "a great product.",
    highlight: "great",
    text: "We bring design and engineering to the same table. From the first sketch to the thing people use — thoughtfully made, ready for the real world.",
    primary: "Let's make it real",
    secondary: "Explore our approach",
    note: "Independent in spirit.\nConnected by craft.",
  },
  philosophy: {
    eyebrow: "A shared standard",
    heading: ["Small team.", "Unreasonably high standards."],
    text: "The best products feel inevitable. Getting there takes curiosity, care, and a team that stays with the problem long enough to make it simple.",
    steps: ["Question", "Shape", "Make", "Refine", "Release"],
  },
  studio: {
    heading: ["Different disciplines.", "One point of view."],
    text: "We’re designers who understand the build, and engineers who care how it feels. A deliberately small team, working directly with the people making the decisions.",
    facts: [
      { value: "01", label: "Connected team" },
      { value: "02", label: "Core disciplines" },
      { value: "00", label: "Unnecessary handoffs" },
    ],
  },
  work: {
    eyebrow: "Selected collaborations / 01—04",
    heading: "Ideas, out in the world.",
    text: "A few things we’ve shaped, built, and helped find their place.",
  },
  services: {
    eyebrow: "Our capabilities",
    heading: "The whole picture.",
    text: "From figuring out what matters to making every detail work. One team, all the way through.",
  },
  process: {
    eyebrow: "Less ceremony. More progress.",
    heading: "Close to the work.\nCloser to you.",
    text: "A clear rhythm, a shared workspace, and something tangible at every step. You always know where we are and what comes next.",
  },
  pricing: {
    eyebrow: "Ways to work together",
    heading: "A good place to start.",
    note: "Clear scope. Agreed milestones. Your source files, code, and intellectual property at handover.",
  },
  faq: [
    {
      q: "What stage should our idea be at?",
      a: "A question, a rough prototype, or a product that needs a new direction. We start by understanding what you’re trying to change, then agree the smallest useful next step together.",
    },
    {
      q: "Can we work with you on design only?",
      a: "Yes. We can shape a product, build a design system, or work alongside your engineers. The engagement is built around the help you need, with a clear set of deliverables.",
    },
    {
      q: "How do you keep us involved?",
      a: "We work in a shared project space, show progress each week, and leave room for considered feedback. You speak directly to the people doing the work.",
    },
    {
      q: "Who owns the work at the end?",
      a: "You do. The agreed deliverables include source files, the code we create for you, documentation, and a practical handover. Any third-party licenses are identified before we start.",
    },
    {
      q: "What happens after launch?",
      a: "We can plan a focused period of support, or continue as an embedded product partner. We agree the coverage, response times, and next priorities with you.",
    },
    {
      q: "How do we get a proposal?",
      a: "Send us a little context through the project page. We’ll arrange a conversation, understand your constraints, and come back with a scope, timeline, and fee you can review.",
    },
  ],
  closing: {
    eyebrow: "For the thing you can't stop thinking about",
    heading: "Let’s make\nsomething matter.",
    text: "Bring your idea, your difficult question, or your next chapter. We’ll bring a fresh pair of eyes.",
    cta: "Start a conversation",
  },
};
