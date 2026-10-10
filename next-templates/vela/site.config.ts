export type Billing = "monthly" | "annual";
export const site = {
  brand: "Vela",
  title: "Vela — make every relationship move forward",
  description: "A relationship workspace for growing service teams. Bring your accounts, follow-ups and renewals into one clear view.",
  url: "", // Your canonical origin, e.g. https://your-domain.com
  links: { app: "", booking: "", email: "", contactEndpoint: "" },
  navigation: [
    { label: "Product", href: "/#product" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ],
  hero: {
    announcementLabel: "HELLO, VELA",
    announcement: "A little less admin. A lot more momentum.",
    heading: ["Good relationships.", "Great things ahead."],
    text: "Keep the people, the promises and the next steps together. The relationship workspace built for teams that grow through trust.",
    primary: "Find your flow",
    secondary: "Book a walkthrough",
    note: "Your accounts. Your next steps. One clear view.",
  },
  logos: { label: "For teams doing good work, together", names: ["Layers", "Quotient", "Circooles", "Sisyphus", "Catalog"] },
  signals: {
    label: "Clarity, at a glance",
    heading: ["Less looking around.", "More moving forward."],
    text: "A clear picture of your relationships, without another spreadsheet to keep up to date.",
    items: [
      { label: "Account health", title: "See the whole relationship", text: "Bring recent conversations, open work and renewal dates into the same picture." },
      { label: "The next step", title: "Keep good things moving", text: "Give every follow-up an owner and a date. Know what needs your attention today." },
      { label: "Revenue visibility", title: "Look ahead with confidence", text: "See what’s renewing, what’s growing and what needs a conversation before it slips." },
    ],
  },
  product: {
    label: "A shared rhythm",
    heading: ["The context you need.", "The momentum you want."],
    text: "From the first hello to the next renewal, keep your team on the same page.",
    items: [
      { id: "accounts", label: "01 / Relationships", title: "Know the people.\nRemember the details.", text: "Your accounts are more than rows in a database. Keep the conversations, the people and the important dates connected, so every interaction picks up where the last one left off.", points: ["A shared account timeline", "Context that stays with the customer", "A clear owner for every relationship"] },
      { id: "followups", label: "02 / Follow-through", title: "A promise made.\nA next step taken.", text: "Turn a useful conversation into a clear action. Bring follow-ups into your day, give them a home and keep the handoff simple for everyone involved.", points: ["Follow-ups with owners and due dates", "One view of what needs attention", "Less chasing. More progress."] },
      { id: "renewals", label: "03 / What’s ahead", title: "Make room for\nthe next opportunity.", text: "Get a clearer view of the months ahead. Bring renewal dates, account health and expansion opportunities together, so your team can start the right conversation at the right time.", points: ["A forward-looking renewal calendar", "Account signals beside every opportunity", "A pipeline your whole team can read"] },
    ],
  },
  principles: {
    label: "Built for the way you work",
    heading: ["A lighter workspace.", "A stronger team."],
    items: [
      { icon: "users", title: "A shared point of view", text: "Keep sales, delivery and account teams working from the same context." },
      { icon: "check", title: "Fewer loose ends", text: "Make the owner, the date and the next step easy to find." },
      { icon: "search", title: "Find the useful detail", text: "Go from an account to the conversation behind it in a moment." },
      { icon: "chart", title: "A clearer horizon", text: "Bring upcoming renewals into today’s conversations." },
    ],
  },
  process: {
    label: "From scattered to connected",
    heading: ["A little setup.", "A better everyday."],
    text: "Start with the relationships you already have. Give the work ahead a little structure.",
    steps: [
      { title: "Bring your people together", text: "Start with your account list. Add the people, the owner and the details that matter.", visual: "Contacts, connected" },
      { title: "Find your shared rhythm", text: "Agree your stages and next steps. Make the handoff clear for the whole team.", visual: "A workflow that fits" },
      { title: "Keep the good work going", text: "Check in, follow through and make the next renewal a natural conversation.", visual: "Your next step, in view" },
    ],
  },
  integrations: {
    label: "In good company",
    heading: ["Your favorite tools.", "A little more connected."],
    text: "Keep your everyday tools in the picture. Make Vela the place where the relationship comes together.",
    items: [
      { name: "Slack", category: "Team conversations", color: "#51445e", mark: "#" },
      { name: "Google Calendar", category: "Meetings & reminders", color: "#3776c8", mark: "31" },
      { name: "Notion", category: "Briefs & shared context", color: "#282523", mark: "N" },
      { name: "Gmail", category: "Customer conversations", color: "#bd5144", mark: "M" },
      { name: "HubSpot", category: "Sales handoffs", color: "#de7150", mark: "H" },
      { name: "Zapier", category: "Connected workflows", color: "#ea6444", mark: "✳" },
    ],
    note: "An illustrative connection lineup. Availability depends on your product.",
  },
  stories: {
    label: "The human side of the work",
    heading: ["Good work travels", "through good relationships."],
    items: [
      { quote: "We stopped asking who had the latest update. Now the context is right there, and the next conversation starts in a better place.", name: "Maya Chen", role: "Client director, Layers", initials: "MC", tone: "sage" },
      { quote: "It gives our team a shared rhythm. A follow-up is a small thing, but following through is how you earn trust.", name: "Daniel Reed", role: "Co-founder, Quotient", initials: "DR", tone: "peach" },
    ],
    note: "Illustrative stories from fictional teams.",
  },
  pricing: {
    label: "A plan for your next chapter",
    heading: ["Start small.", "Keep good company."],
    text: "Simple plans for the team you are today, with room for what comes next.",
    currency: "USD",
    plans: [
      { id: "essential", name: "Essential", monthly: 19, annual: 15, text: "A clear starting point for a small team.", features: ["Up to 3 team members", "500 shared accounts", "Account timelines & next steps", "Renewal calendar", "Email support"], cta: "Start with Essential", featured: false, checkout: { monthly: "", annual: "" } },
      { id: "team", name: "Team", monthly: 39, annual: 31, text: "A shared rhythm for a growing business.", features: ["Up to 10 team members", "Unlimited shared accounts", "Everything in Essential", "Custom stages & team views", "Connection workflows", "Priority support"], cta: "Bring your team together", featured: true, checkout: { monthly: "", annual: "" } },
      { id: "scale", name: "Scale", monthly: 79, annual: 63, text: "More room, more control, more possibility.", features: ["Up to 30 team members", "Everything in Team", "Multiple workspaces", "Advanced access controls", "Guided onboarding", "Dedicated support"], cta: "Find your next chapter", featured: false, checkout: { monthly: "", annual: "" } },
    ],
    note: "Per workspace. All prices in USD. Example plans for this template.",
  },
  faq: {
    label: "A few good questions",
    heading: ["Let’s clear", "a few things up."],
    text: "A little context before you find your flow.",
    items: [
      { q: "Who is Vela designed for?", a: "Vela is built for service teams that grow through long-term customer relationships. Agencies, consultancies and account-led businesses can bring the people, conversations and next steps into one shared view." },
      { q: "Can I try the product view on this page?", a: "Yes. Change the period in the revenue view, inspect the monthly bars and select an onboarding step. The figures come from a small, clearly labeled example dataset. They do not connect to a live CRM." },
      { q: "How does annual billing work?", a: "The yearly price is the monthly equivalent of one annual payment. Switch the billing control to see the complete yearly total and exact savings for each plan. All plans are priced per workspace." },
      { q: "Does this replace the tools we already use?", a: "Vela gives your relationships a shared home alongside your everyday tools. Keep conversations, calendars and project context in the picture, while the team works from the same account view. The connection lineup on this page is illustrative." },
      { q: "What happens when I book a walkthrough?", a: "Start with a little context about your team and the work you want to bring together. In this preview, the request page saves a copy to your device. Nothing is sent and no meeting is booked until a live contact or scheduling service is connected." },
    ],
  },
  closing: {
    label: "The next chapter starts here",
    heading: ["Less busywork.", "More good relationships."],
    text: "Give your team a clearer view of the people and the possibilities ahead.",
    cta: "Find your flow",
  },
  footer: { text: "A clear space for the relationships that move your business forward.", copyright: "Vela", note: "Fictional product. Real attention to detail." },
  contact: { title: "Let’s find your flow.", text: "Tell us a little about your team and what you want to bring together.", success: "Your request has been received. We’ll be in touch." },
};
