// Everything a buyer usually changes lives here: brand, links, copy, plans and stories.
// Images live in public/images. Replace them with your own screens and photos at the same proportions.

export type Billing = "monthly" | "yearly";

export type IconName =
  | "sparkles" | "timer" | "grid" | "network" | "receipt" | "gauge" | "wallet"
  | "calendar" | "building" | "badge-dollar" | "chart" | "smartphone";

export const site = {
  brand: "Notch",
  legalName: "Notch Labs, Inc.",
  title: "Notch: time, capacity and invoicing for service teams",
  description:
    "Notch fills timesheets from the work your team already does, keeps every project staffed and drafts invoices before month-end. Built for agencies, studios and consultancies.",

  // Destinations. Leave a value empty to use the fallback described next to it.
  links: {
    signup: "", // Your sign-up or trial URL. Empty: "Start free trial" scrolls to pricing.
    signin: "", // Your app's login URL. Empty: the "Sign in" link is hidden.
    sales: "", // A booking link for the custom plan. Empty: opens an email to `email`.
    email: "hello@example.com",
    appStore: "", // Optional mobile app links shown in the closing section.
    playStore: "",
  },

  social: [
    { label: "X", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],

  nav: [
    { label: "Product", href: "/#product" },
    { label: "Workflow", href: "/#workflow" },
    { label: "Customers", href: "/#customers" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Journal", href: "/journal" },
  ],

  hero: {
    heading: ["Every hour counted.", "Every invoice sent."],
    text: "Notch fills timesheets from the work your team already does, keeps every project staffed and drafts invoices before month-end.",
    primary: "Start free trial",
    secondary: { label: "See how it works", href: "/#workflow" },
    note: "14-day trial · No card needed · Cancel anytime",
    image: { src: "/images/dashboard.webp", phone: "/images/dashboard-phone.webp", alt: "The Notch home screen: billable hours, utilization, a running timer, team capacity, project budgets and invoices for Morrow Studio." },
  },

  logos: {
    label: "The back office for 2,400 studios, agencies and consultancies",
    names: ["Kiln", "Halden & Co", "Tessellate", "Ferro", "Atlas Grey", "Quarry", "Plover", "Morrow"],
  },

  bento: {
    heading: ["Stop rebuilding the week", "from memory every Friday."],
    items: [
      {
        icon: "sparkles" as IconName,
        title: "Timesheets that fill themselves",
        text: "Notch reads calendars, commits, design files and calls, then drafts each person's week. Your team confirms it in a tap.",
        image: "/images/timesheet.webp",
        alt: "A drafted week with suggested entries from a calendar, code commits, a design file and a video call.",
        wide: true,
      },
      {
        icon: "timer" as IconName,
        title: "A timer for deep work",
        text: "Start, pause and switch from the browser, desktop or phone. Anything you forget, Notch fills in later.",
        image: "/images/timer.webp",
        alt: "A running timer on Kestrel's website redesign showing 2 hours 47 minutes.",
      },
      {
        icon: "grid" as IconName,
        title: "Capacity before it's a crisis",
        text: "A live heatmap of everyone's next three weeks shows who is stretched and who has room to take on more.",
        image: "/images/capacity.webp",
        alt: "A capacity heatmap for six people over three weeks, with one overbooked day highlighted.",
      },
      {
        icon: "network" as IconName,
        title: "Approvals that follow your team",
        text: "Hours and expenses route to the right lead automatically, with a clear trail for every change and sign-off.",
        image: "/images/approvals.webp",
        alt: "An approval chain from the studio lead to delivery and finance leads, with each person's status.",
        wide: true,
      },
    ],
  },

  workflow: {
    heading: ["Set it up once.", "It runs every month."],
    interval: 7000, // Milliseconds each step stays on screen while the section is in view.
    items: [
      {
        icon: "receipt" as IconName,
        title: "Month-end without the scramble",
        text: "Approved hours become draft invoices the moment a period closes, split by client, project and rate card.",
        photo: "/images/studio-review.webp",
        photoAlt: "Two colleagues reviewing work on a laptop in a bright studio.",
        card: "/images/card-invoice.webp",
        cardAlt: "A draft invoice for Kestrel Ltd totalling $20,880 for September.",
      },
      {
        icon: "gauge" as IconName,
        title: "Budgets that speak up early",
        text: "Notch tracks burn against every estimate and flags a project at 75%, so the client conversation happens before the overrun.",
        photo: "/images/studio-plan.webp",
        photoAlt: "A project lead talking through a timeline on the wall with two designers.",
        card: "/images/card-budget.webp",
        cardAlt: "Oakfold's brand refresh at 81% of budget, with an alert sent at 75%.",
      },
      {
        icon: "wallet" as IconName,
        title: "Contractors paid from the same hours",
        text: "Pay freelancers from the hours you already bill, in their own currency, with rates that only finance can see.",
        photo: "/images/studio-focus.webp",
        photoAlt: "A designer working at a standing desk beside a large window.",
        card: "/images/card-payout.webp",
        cardAlt: "October payouts to three contractors in euros, pounds and dollars.",
      },
    ],
  },

  toolkit: {
    heading: ["Everything a studio needs,", "nothing it doesn't."],
    items: [
      { icon: "calendar" as IconName, label: "Resource planner", text: "Book people onto projects by the hour and see gaps and double-bookings before they cost you.", image: "/images/planner.webp", alt: "A two-week schedule booking six people onto client projects." },
      { icon: "building" as IconName, label: "Client portal", text: "Give clients a live view of budget, milestones and approvals, so status emails write themselves.", image: "/images/portal.webp", alt: "A client portal for Kestrel Ltd with budget used, milestones and items awaiting approval." },
      { icon: "badge-dollar" as IconName, label: "Rate cards", text: "Set default rates by role, override them per client and currency, and keep them private to finance.", image: "/images/rates.webp", alt: "Rate cards by role with overrides for three clients." },
      { icon: "chart" as IconName, label: "Profitability reports", text: "Revenue, delivery cost and margin for every project, calculated from the hours you already track.", image: "/images/reports.webp", alt: "A profitability report with revenue, cost and margin by project for the quarter." },
      { icon: "smartphone" as IconName, label: "Mobile approvals", text: "Approve hours, check a budget or start a timer from your phone between meetings.", image: "/images/mobile.webp", alt: "Two phone screens: approving hours and a running timer." },
    ],
  },

  customers: {
    heading: ["Studios that stopped", "chasing timesheets."],
    stories: [
      {
        tone: "light" as const,
        stats: [
          { value: "11", suffix: "h", label: "Saved per person each month" },
          { value: "98", suffix: "%", label: "Of worked hours now billed" },
          { value: "6", suffix: " days", label: "Faster month-end close" },
        ],
        quote: "We used to lose a day every month rebuilding timesheets. Now the week is drafted before anyone opens it, and invoices go out on the first.",
        name: "Ananya Rao",
        role: "Founder, Kiln Studio",
        avatar: "/images/ananya.webp",
      },
      {
        tone: "dark" as const,
        stats: [{ value: "32", suffix: "%", label: "Fewer projects over budget" }],
        quote: "The 75% alert changed how we talk to clients. We raise scope early instead of apologising late.",
        name: "Marcus Bell",
        role: "Operations director, Halden & Co",
        avatar: "/images/marcus.webp",
      },
      {
        tone: "light" as const,
        stats: [{ value: "4.2", suffix: "×", label: "Faster invoicing" }],
        quote: "Contractors get paid from the same approved hours we bill. Finance stopped being the bottleneck.",
        name: "Yuna Sato",
        role: "Studio manager, Tessellate",
        avatar: "/images/yuna.webp",
      },
    ],
    rating: { score: "4.9", text: "from 1,200+ reviews", avatars: ["/images/daniel.webp", "/images/lucia.webp", "/images/karim.webp", "/images/ananya.webp"], more: "2k+" },
  },

  pricing: {
    heading: ["Pricing that grows", "with your studio."],
    yearlyNote: "2 months free",
    footnote: "Prices are per person per month, before tax. Clients and view-only guests are always free.",
    plans: [
      {
        id: "studio",
        name: "Studio",
        badge: "Most popular",
        price: { monthly: 18, yearly: 15 },
        text: "For studios up to 25 people.",
        features: ["Automatic timesheets", "Timer on web, desktop and mobile", "Project budgets and alerts", "Invoices from approved hours"],
        extras: ["Up to 25 people", "Email support"],
        cta: "Start with Studio",
        checkout: { monthly: "", yearly: "" },
        featured: true,
      },
      {
        id: "agency",
        name: "Agency",
        badge: "",
        price: { monthly: 30, yearly: 25 },
        text: "For growing teams with many clients.",
        features: ["Everything in Studio", "Resource planner and capacity", "Client portal", "Rate cards and multiple currencies"],
        extras: ["Contractor payouts", "Priority support"],
        cta: "Start with Agency",
        checkout: { monthly: "", yearly: "" },
        featured: false,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        badge: "",
        price: null,
        text: "For groups of studios and larger firms.",
        features: ["Everything in Agency", "SSO and SCIM provisioning", "Custom approval chains", "EU or US data residency"],
        extras: ["A dedicated success manager", "99.9% uptime commitment"],
        cta: "Talk to sales",
        checkout: { monthly: "", yearly: "" },
        featured: false,
      },
    ],
  },

  journal: {
    heading: ["Notes for people", "who run studios."],
    more: "All articles",
  },

  closing: {
    app: { title: "Approve hours from anywhere", text: "Notch for iOS and Android" },
    heading: "Ready to close the month on time?",
    text: "Start a 14-day trial, import last month's hours in minutes and send your first drafted invoice this week.",
    cta: "Get started",
    image: "/images/dashboard.webp",
  },

  footer: {
    blurb: "Time, capacity and invoicing for agencies, studios and consultancies.",
    columns: [
      { title: "Product", links: [{ label: "Timesheets", href: "/#product" }, { label: "Workflow", href: "/#workflow" }, { label: "Features", href: "/#features" }, { label: "Pricing", href: "/#pricing" }] },
      { title: "Resources", links: [{ label: "Journal", href: "/journal" }, { label: "Customers", href: "/#customers" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
    ],
  },
};

/** Where the primary "Start free trial" style buttons go. */
export const signupHref = () => site.links.signup || "/#pricing";

/** Where a plan button goes for the selected billing period. */
export function planHref(plan: (typeof site.pricing.plans)[number], billing: Billing) {
  const checkout = plan.checkout[billing];
  if (checkout) return checkout;
  if (!plan.price) return site.links.sales || mailto(`${site.brand} ${plan.name}`);
  return site.links.signup || mailto(`${site.brand} ${plan.name} plan, billed ${billing}`);
}

export const mailto = (subject: string) => `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;

/** Yearly savings for a plan, per person per year. */
export const yearlySaving = (price: { monthly: number; yearly: number }) => (price.monthly - price.yearly) * 12;
