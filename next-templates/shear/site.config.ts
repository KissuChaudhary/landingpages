/**
 * Everything a visitor reads on the page lives here: brand, copy, numbers,
 * plans, questions and where every button goes. Edit this file first.
 *
 * Destinations: any `href` can be an anchor ("#pricing"), a full URL or a
 * mailto: link. Leave a destination empty ("") and the page uses the safe
 * fallback described next to it.
 */

export type Link = { label: string; href: string };

export type CompanyLogo = {
  name: string;
  /** A built-in mark drawn in SVG, or set `src` to your own logo file in public/. */
  mark: "peak" | "orbit" | "grid" | "wave" | "leaf" | "stack" | "spark" | "ring";
  src?: string;
};

export type ProofStat = {
  value: number;
  /** Shown before and after the figure, e.g. "−" and "%". */
  prefix?: string;
  suffix?: string;
  format?: Intl.NumberFormatOptions;
  title: string;
  body: string;
  icon: "trend" | "coins" | "timer" | "merge" | "bell";
};

export type FeatureVisual = "radar" | "rightsize" | "commit" | "anomaly" | "unit" | "forecast";

export type Feature = {
  title: string;
  body: string;
  visual: FeatureVisual;
  /** The colour of the light behind the visual. */
  glow: string;
  /** Use your own screenshot instead of the built-in visual (a path in public/). */
  image?: string;
};

export type Step = {
  title: string;
  body: string;
  scene: "connect" | "review" | "merge";
  image?: string;
};

export type TeamTab = {
  id: string;
  label: string;
  title: string;
  body: string;
  /** Three colours for the light field beside the copy. */
  colors: [string, string, string];
  /** The small card that floats over the light field. */
  card: { label: string; value: string; detail: string };
};

export type Testimonial = { quote: string; name: string; role: string; company: string };

export type Plan = {
  id: string;
  name: string;
  description: string;
  /** Per month. Use null for a custom price. */
  price: { monthly: number; yearly: number } | null;
  featured?: boolean;
  badge?: string;
  cta: string;
  /** Your checkout link for each billing period. Empty: free plans go to sign-up, paid plans email sales. */
  checkout: { monthly: string; yearly: string };
  features: string[];
};

const salesEmail = "sales@example.com";

export const site = {
  /** Used for every number and price, so the server and browser format them the same way. */
  locale: "en-US",

  brand: {
    name: "Shear",
    legalName: "Shear Labs, Inc.",
    description: "Shear finds and fixes cloud waste across AWS, Google Cloud, Azure and Kubernetes.",
  },

  meta: {
    title: "Shear | Turn cloud spend into margin",
    description:
      "Shear finds idle, oversized and forgotten cloud resources, then ships the fix as a pull request your team approves. Read-only access, savings on the next invoice.",
  },

  contact: {
    sales: salesEmail,
    hello: "hello@example.com",
  },

  /**
   * The email form in the hero.
   * - Set `endpoint` to POST { email } as JSON (your waitlist, CRM or sign-up API).
   *   The form waits for the answer and shows success or "Try again".
   * - Or set `url` to open your app's sign-up page with the email filled in (?email=…).
   * - With neither, the form takes visitors to the plans below.
   */
  signup: {
    endpoint: "",
    url: "",
    param: "email",
    placeholder: "Your work email",
    button: "Start free trial",
    success: "Check your inbox. Your workspace link is on its way.",
    note: "14-day trial on your real bill. Read-only access, no credit card.",
  },

  nav: {
    links: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "Teams", href: "#teams" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ] as Link[],
    /** Hidden while empty. */
    login: { label: "Log in", href: "" } as Link,
    cta: { label: "Start free", href: "#pricing" } as Link,
  },

  hero: {
    rating: { score: "4.9", label: "from 600+ platform teams" },
    headline: {
      before: "Turn cloud spend into",
      /** The highlighted word cycles through these. Keep them short. */
      words: ["margin", "runway", "savings", "headroom", "profit"],
      after: "automatically",
    },
    description:
      "Shear watches every resource across AWS, Google Cloud, Azure and Kubernetes, finds the spend nobody is using, and ships the fix as a pull request your team approves.",
    trustedLabel: "Running in production at",
    logos: [
      { name: "Northvale", mark: "peak" },
      { name: "Kestrel", mark: "spark" },
      { name: "Quarry", mark: "stack" },
      { name: "Fernway", mark: "leaf" },
      { name: "Tessel", mark: "grid" },
      { name: "Lumora", mark: "ring" },
      { name: "Orbitfold", mark: "orbit" },
      { name: "Brightwater", mark: "wave" },
    ] as CompanyLogo[],
  },

  proof: {
    badge: "Proof on the invoice",
    title: "Results you can read\non the bill",
    description: "Averages across teams in their first 90 days, measured from invoices, not forecasts.",
    stats: [
      {
        value: 38,
        prefix: "−",
        suffix: "%",
        title: "average cloud bill",
        body: "Lower spend in the first quarter, with no change to what you run.",
        icon: "trend",
      },
      {
        value: 2.4,
        prefix: "$",
        suffix: "M",
        format: { minimumFractionDigits: 1, maximumFractionDigits: 1 },
        title: "reclaimed last month",
        body: "Idle, oversized and orphaned resources, shut down or resized with approval.",
        icon: "coins",
      },
      {
        value: 6,
        suffix: " min",
        title: "to the first finding",
        body: "Connect read-only access and the waste report is ready before your coffee is.",
        icon: "timer",
      },
      {
        value: 94,
        suffix: "%",
        title: "of fixes merged",
        body: "Changes arrive as pull requests your engineers already know how to review.",
        icon: "merge",
      },
      {
        value: 4,
        suffix: " min",
        title: "to flag a spike",
        body: "Anomalies reach your team chat while they cost dollars, not thousands.",
        icon: "bell",
      },
    ] as ProofStat[],
    bill: {
      label: "Monthly cloud bill",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      /** Before Shear, then after connecting in February. */
      before: [148320, 151200, 153900, 156100, 158400, 160800],
      after: [148320, 139400, 117800, 104300, 96100, 91960],
    },
  },

  comparison: {
    badge: "Comparison",
    title: "Shear vs. doing it by hand",
    description: "Spreadsheets find waste once a quarter. Shear finds it the hour it starts.",
    columns: { left: "Spreadsheets & scripts", right: "FinOps consultancy" },
    rows: [
      { label: "First saving", left: "4–6 weeks", shear: "Same day", right: "2–3 months" },
      { label: "Coverage", left: "Accounts someone remembers", shear: "Every account and cluster", right: "A sampled audit" },
      { label: "How often", left: "Quarterly clean-ups", shear: "Every hour, continuously", right: "Monthly reviews" },
      { label: "How fixes ship", left: "Tickets in a backlog", shear: "Pull requests, ready to merge", right: "Slides and advice" },
      { label: "Pricing", left: "Engineer hours", shear: "Flat monthly plan", right: "Retainer plus a cut" },
      { label: "Safety", left: "Manual changes in prod", shear: "Reviewed and reversible", right: "Depends on the consultant" },
      { label: "Reporting", left: "A stale spreadsheet", shear: "Live savings ledger", right: "End-of-project PDF" },
    ],
  },

  product: {
    badge: "Product",
    title: "Everything that moves the bill,\nin one place.",
    description:
      "Shear reads usage, not just invoices, so every recommendation arrives with the evidence an engineer needs to say yes.",
    cta: { label: "See how it works", href: "#how" } as Link,
    features: [
      {
        title: "Waste radar",
        body: "Idle instances, unattached volumes, forgotten snapshots and empty load balancers, ranked by what they cost you this month.",
        visual: "radar",
        glow: "#7cf0b5",
      },
      {
        title: "Rightsizing",
        body: "Fourteen days of real CPU and memory per workload, and a smaller size that still leaves headroom for the peak.",
        visual: "rightsize",
        glow: "#67e8f9",
      },
      {
        title: "Commitment planner",
        body: "Savings plans and reserved capacity sized to the baseline you actually run, with the break-even month shown before you buy.",
        visual: "commit",
        glow: "#a78bfa",
      },
      {
        title: "Anomaly alerts",
        body: "A spike reaches your team chat within minutes, with the resource, the deploy behind it and the cost per hour.",
        visual: "anomaly",
        glow: "#fbbf24",
      },
      {
        title: "Unit costs",
        body: "Cost per customer, per request or per feature, so pricing and architecture start from the same number.",
        visual: "unit",
        glow: "#93c5fd",
      },
      {
        title: "Forecasts",
        body: "Next month's bill projected from your real usage curve, with the fixes you haven't merged shown as the gap.",
        visual: "forecast",
        glow: "#f0abfc",
      },
    ] as Feature[],
  },

  steps: {
    badge: "How it works",
    title: "First saving in three steps",
    description: "Most teams merge their first fix within a day of connecting.",
    items: [
      {
        title: "Connect read-only",
        body: "Grant a read-only role in your cloud accounts. Shear never gets write access to production.",
        scene: "connect",
      },
      {
        title: "Review the findings",
        body: "Every finding shows the resource, its usage, who owns it and what it costs each month.",
        scene: "review",
      },
      {
        title: "Merge the fix",
        body: "Fixes arrive as pull requests to your infrastructure code. Approve, merge and watch the line drop.",
        scene: "merge",
      },
    ] as Step[],
  },

  teams: {
    badge: "Teams",
    title: "Built for everyone\nwho touches the bill",
    description: "Engineers get evidence, finance gets forecasts, and leadership gets one number everyone trusts.",
    cta: { label: "Book a demo", href: `mailto:${salesEmail}?subject=Shear%20demo` } as Link,
    stat: { value: 1284920, label: "saved by Shear customers this week" },
    tabs: [
      {
        id: "engineering",
        label: "Engineering",
        title: "Fix waste without leaving the pull request",
        body: "Recommendations arrive as code changes with the usage graph attached. No new dashboard to babysit, no ticket to chase.",
        colors: ["#7cf0b5", "#67e8f9", "#e0f2fe"],
        card: { label: "Pull request", value: "−$4,120/mo", detail: "Rightsize api-prod node pool" },
      },
      {
        id: "platform",
        label: "Platform",
        title: "Guardrails before the bill arrives",
        body: "Budgets per team, cluster and environment, with alerts that name the workload instead of the account.",
        colors: ["#a78bfa", "#67e8f9", "#ede9fe"],
        card: { label: "Budget", value: "72% used", detail: "data-platform · 9 days left" },
      },
      {
        id: "finance",
        label: "Finance",
        title: "Forecasts that match the invoice",
        body: "Accruals, showback and chargeback reports that reconcile to the bill to the cent, every month.",
        colors: ["#fbbf24", "#7cf0b5", "#fef3c7"],
        card: { label: "June forecast", value: "$92,410", detail: "Within 0.6% of the invoice" },
      },
      {
        id: "leadership",
        label: "Leadership",
        title: "One number for the board deck",
        body: "Cost per customer and gross margin impact, tracked month over month, next to the plan.",
        colors: ["#f0abfc", "#93c5fd", "#fce7f3"],
        card: { label: "Gross margin", value: "+6.8 pts", detail: "Since January" },
      },
    ] as TeamTab[],
  },

  benefits: {
    badge: "Why Shear",
    title: "Make cost a feature you ship, not a fire you fight.",
    description:
      "Cloud bills drift because nobody owns the drift. Shear gives every team a clear owner, a clear number and a fix they can merge.",
    cta: { label: "Compare plans", href: "#pricing" } as Link,
    items: [
      { icon: "clock", text: "Save 12+ engineer hours a week on cost reviews." },
      { icon: "trend", text: "Cut the bill 30–40% in the first quarter." },
      { icon: "bell", text: "Catch spikes in minutes, not at month end." },
      { icon: "shield", text: "Every change reviewed, logged and reversible." },
    ] as { icon: "clock" | "trend" | "bell" | "shield"; text: string }[],
    digest: {
      title: "Your week in cloud spend",
      saved: 12480,
      rows: [
        { label: "Fixes merged", value: "3", tone: "good" },
        { label: "Anomaly caught", value: "export-job · $38/hr", tone: "warn" },
        { label: "Next up", value: "api-prod · −$2,140/mo", tone: "plain" },
      ] as { label: string; value: string; tone: "good" | "warn" | "plain" }[],
    },
  },

  testimonials: {
    badge: "Customers",
    title: "Teams who stopped dreading the invoice",
    description: "Platform, engineering and finance leads on what changed after the first month.",
    items: [
      {
        quote:
          "We knew we were overspending. We didn't know it was a third of the bill until Shear put a dollar figure next to every idle cluster.",
        name: "Maya Lindqvist",
        role: "Head of Platform",
        company: "Northvale",
      },
      {
        quote: "The fixes show up as pull requests, so my team reviews them like any other change. That's why we actually merge them.",
        name: "Daniel Osei",
        role: "Staff Engineer",
        company: "Kestrel",
      },
      {
        quote: "Our forecast used to be a guess with a spreadsheet attached. Now it reconciles with the invoice every month.",
        name: "Priya Raman",
        role: "VP Finance",
        company: "Quarry",
      },
      {
        quote: "We caught a runaway data job forty minutes after it started. Last year the same mistake cost us eleven thousand dollars.",
        name: "Tom Becker",
        role: "CTO",
        company: "Fernway",
      },
    ] as Testimonial[],
    highlight: { value: 61400, label: "less on Northvale's monthly bill, 90 days after connecting", company: "Northvale" },
  },

  pricing: {
    badge: "Pricing",
    title: "Priced on what you manage,\nnot what you save",
    description: "Flat plans by monthly cloud spend under management. Never a percentage of your savings.",
    yearlyBadge: "Save 20%",
    currency: "USD",
    plans: [
      {
        id: "starter",
        name: "Starter",
        description: "One cloud account under $10k a month.",
        price: { monthly: 0, yearly: 0 },
        cta: "Start free",
        checkout: { monthly: "", yearly: "" },
        features: ["1 cloud account", "Waste radar", "Weekly digest", "Community support"],
      },
      {
        id: "team",
        name: "Team",
        description: "Growing teams up to $100k a month.",
        price: { monthly: 249, yearly: 199 },
        cta: "Start trial",
        checkout: { monthly: "", yearly: "" },
        features: ["10 cloud accounts", "Rightsizing pull requests", "Anomaly alerts in chat", "Budgets per team", "Email support"],
      },
      {
        id: "scale",
        name: "Scale",
        description: "Multi-cloud teams up to $1M a month.",
        price: { monthly: 799, yearly: 639 },
        featured: true,
        badge: "Most popular",
        cta: "Start trial",
        checkout: { monthly: "", yearly: "" },
        features: ["Unlimited accounts", "Commitment planner", "Unit costs and showback", "SSO and audit log", "Priority support"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Cloud spend above $1M a month.",
        price: null,
        cta: "Talk to sales",
        checkout: { monthly: "", yearly: "" },
        features: ["Dedicated cost engineer", "Custom integrations", "Private collector", "Security review and DPA", "99.9% uptime SLA"],
      },
    ] as Plan[],
  },

  faq: {
    badge: "FAQ",
    title: "Questions, answered",
    description: "Everything teams ask before they connect their first account.",
    cta: { label: "Talk to us", href: `mailto:${salesEmail}` } as Link,
    items: [
      {
        question: "Does Shear need write access to our cloud?",
        answer:
          "No. Shear reads usage and billing data through a read-only role. Fixes arrive as pull requests to your infrastructure repository, and nothing changes until someone on your team merges them.",
      },
      {
        question: "Which clouds and tools do you support?",
        answer:
          "AWS, Google Cloud, Azure and any Kubernetes cluster, with fixes written for Terraform, Pulumi or CloudFormation. Data warehouse and observability costs come in through their billing exports.",
      },
      {
        question: "How is this different from our provider's cost tools?",
        answer:
          "Native tools show what you spent. Shear shows which resource caused it, who owns it and the change that removes it, across every provider in one place.",
      },
      {
        question: "How long until we see savings?",
        answer:
          "First findings appear within minutes of connecting. Most teams merge their first fix the same day and see it on the next invoice.",
      },
      {
        question: "What happens to our data?",
        answer:
          "Usage metrics are encrypted in transit and at rest, kept for 13 months and never used to train models. You can export or delete everything from settings.",
      },
      {
        question: "Can we cancel anytime?",
        answer:
          "Yes. Monthly plans end at the close of the billing period. Yearly plans can be cancelled with a prorated refund in the first 30 days.",
      },
    ],
  },

  closing: {
    title: "Stop paying for servers\nnobody uses.",
    description: "Connect a read-only role and see your first findings before the meeting ends.",
    primary: "Start free trial",
    secondary: { label: "Talk to sales", href: `mailto:${salesEmail}` } as Link,
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#product" },
          { label: "How it works", href: "#how" },
          { label: "Teams", href: "#teams" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Customers", href: "#customers" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "mailto:hello@example.com" },
          { label: "Security", href: "mailto:security@example.com" },
        ],
      },
    ] as { title: string; links: Link[] }[],
    /** Shown only when they have an href. */
    social: [
      { label: "GitHub", href: "" },
      { label: "LinkedIn", href: "" },
      { label: "X", href: "" },
    ] as Link[],
    legal: [
      { label: "Privacy", href: "" },
      { label: "Terms", href: "" },
    ] as Link[],
  },

  motion: {
    /** Where the visitor's "pause motion" choice is remembered. */
    storageKey: "shear-motion",
  },
};

export type Site = typeof site;
