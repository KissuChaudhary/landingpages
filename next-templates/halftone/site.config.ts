/**
 * All page copy lives in this file, along with the sample events, endpoints, regions and code the
 * animated product panels play. Change the text, save, and the page updates. TypeScript flags a
 * missing or misspelled field.
 *
 * The few small labels inside the panels themselves (column headings, status codes) sit in a
 * constant at the top of each panel's file, in components/visuals/ and components/sections/.
 *
 * "Ferry" and every name, number, quote and price below are placeholders for the demo. Replace them.
 */

export type Language = "node" | "python" | "go" | "curl";

export type Snippet = {
  label: string;
  filename: string;
  code: string;
  /** First and last line (1-based) of each Developers step, in the same order as `developers.steps`. */
  steps: [number, number][];
};

export type Plan = {
  name: string;
  description: string;
  /** Monthly base price in USD. */
  base: number;
  /** Events included in the base price. */
  included: number;
  /** USD per additional million events. Leave out for a plan with a hard limit. */
  perMillion?: number;
  /** Hard monthly limit, for a free tier. */
  limit?: number;
  cta: string;
  href: string;
  features: string[];
};

export const site = {
  brand: {
    name: "Ferry",
    email: "hello@ferry.dev",
    company: "Ferry Labs, Inc.",
  },

  meta: {
    title: "Ferry: webhooks that always arrive",
    description:
      "Ferry is webhook infrastructure for API products. Send an event once; Ferry signs it, retries it, logs it and delivers it to every customer endpoint.",
  },

  /**
   * The halftone colour fields behind the hero, the numbers band and the closing card. Six [r, g, b]
   * colours placed around the edges from the top-left, clockwise. The code panels use the same six.
   */
  dither: [
    [48, 93, 222],
    [139, 92, 246],
    [255, 106, 61],
    [255, 176, 32],
    [16, 185, 129],
    [236, 72, 153],
  ] as [number, number, number][],

  nav: {
    links: [
      { label: "Product", href: "#product" },
      { label: "Developers", href: "#developers" },
      { label: "Customers", href: "#customers" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    signIn: { label: "Sign in", href: "#" },
    cta: { label: "Start free", href: "#start" },
  },

  status: { label: "All systems normal", href: "#" },

  hero: {
    badge: { tag: "New", text: "Event replay is now generally available", href: "#product" },
    lead: "Webhooks that",
    accent: "always arrive.",
    description:
      "Send an event once. Ferry signs it, queues it, retries it and delivers it to every customer endpoint, with a log your support team can actually read.",
    primary: { label: "Start free", href: "#start" },
    install: "npm i @ferry/node",
    proof: ["SOC 2 Type II", "99.99% uptime SLA", "Free up to 50k events"],
  },

  /** Sample data for the live console, the pipeline and the product panels. */
  samples: {
    /** The hero console plays these in order and loops. `fails` marks a delivery that fails once, then succeeds on retry. */
    deliveries: [
      { type: "invoice.paid", endpoint: "api.acme.com/hooks", ms: 38 },
      { type: "customer.created", endpoint: "hooks.globex.io/ferry", ms: 52 },
      { type: "invoice.failed", endpoint: "api.initech.dev/events", ms: 0, fails: true },
      { type: "subscription.updated", endpoint: "api.acme.com/hooks", ms: 41 },
      { type: "payout.sent", endpoint: "webhooks.umbrella.co/in", ms: 64 },
      { type: "invoice.paid", endpoint: "hooks.globex.io/ferry", ms: 35 },
      { type: "refund.created", endpoint: "api.stark.app/webhooks", ms: 47 },
      { type: "customer.deleted", endpoint: "api.initech.dev/events", ms: 58 },
    ],
    /** Three customer endpoints in the pipeline diagram. The last one is down for the first attempt. */
    endpoints: [
      { name: "Acme", host: "api.acme.com" },
      { name: "Globex", host: "hooks.globex.io" },
      { name: "Initech", host: "api.initech.dev" },
    ],
    regions: [
      { code: "iad", city: "N. Virginia", ms: 31, share: 0.92 },
      { code: "fra", city: "Frankfurt", ms: 36, share: 0.74 },
      { code: "nrt", city: "Tokyo", ms: 41, share: 0.58 },
      { code: "sin", city: "Singapore", ms: 44, share: 0.5 },
      { code: "syd", city: "Sydney", ms: 48, share: 0.34 },
      { code: "gru", city: "São Paulo", ms: 52, share: 0.28 },
    ],
    eventTypes: ["invoice.paid", "invoice.failed", "customer.created"],
    portal: { company: "Acme", url: "https://hooks.acme.com/ferry" },
  },

  logos: {
    label: "Delivering 2.1 billion events a month for product teams at",
    names: ["Northwind", "Lumen", "Arcwise", "Pinecrest", "Halcyon", "Outset"],
  },

  buildVsBuy: {
    kicker: "Build vs. Ferry",
    lead: "Webhooks look like a weekend.",
    accent: "They are a quarter.",
    description:
      "A POST request is easy. Delivering it reliably to thousands of endpoints you do not control is a product of its own, with its own on-call rotation.",
    build: { title: "Build it yourself", total: "About 9 engineer-weeks, then on-call forever" },
    buy: { title: "With Ferry", totalLabel: "Time to ship", total: "One afternoon", note: "Included" },
    rows: [
      { item: "Queue and retry workers", estimate: "2 weeks" },
      { item: "Backoff, dead letters and alerting", estimate: "1 week" },
      { item: "Payload signing and key rotation", estimate: "4 days" },
      { item: "Searchable delivery logs", estimate: "2 weeks" },
      { item: "Endpoint settings for your customers", estimate: "2 weeks" },
      { item: "Replays after an outage", estimate: "1 week" },
    ],
  },

  pipeline: {
    kicker: "How it works",
    lead: "You send it once.",
    accent: "Ferry gets it there.",
    description:
      "Your app makes one API call per event. Ferry takes it from there: signing, queueing, fan-out to every subscribed endpoint, and retries until it lands.",
    /** The four steps shown inside the Ferry node, in order. */
    stages: ["Sign", "Queue", "Fan out", "Retry"],
    steps: [
      { title: "Send once", body: "One API call from your backend with the event type and payload. Ferry responds in milliseconds." },
      { title: "Ferry delivers", body: "Every endpoint subscribed to that event gets a signed request, from the region closest to it." },
      { title: "Failures recover", body: "A 5xx or a timeout schedules a retry with exponential backoff. Nobody gets paged." },
    ],
  },

  features: {
    kicker: "Product",
    lead: "Everything between your API",
    accent: "and your customer’s server.",
    description: "The parts every team ends up building, built once and run at scale.",
    items: {
      retries: {
        title: "Retries that know when to stop",
        body: "Exponential backoff over 24 hours, a dead-letter queue when an endpoint stays down, and an email to its owner before you hear about it.",
      },
      signing: {
        title: "Signed, every time",
        body: "HMAC-SHA256 signatures and timestamps on every request, with key rotation that never breaks a receiver.",
      },
      replay: {
        title: "Replay after an outage",
        body: "Select everything that failed while a customer was down and send it again in one click.",
      },
      latency: {
        title: "Fast by default",
        body: "Dispatch in under 40 ms at the median, with p99 alerts you can route to Slack or PagerDuty.",
      },
      regions: {
        title: "Delivered from nearby",
        body: "Twelve regions, picked automatically per endpoint, so a customer in Tokyo is not waiting on Virginia.",
      },
      portal: {
        title: "A portal your customers can use",
        body: "Drop in an embeddable, white-label page where customers add endpoints, choose events, read their own logs and send test events. Your support queue gets quieter.",
        cta: { label: "See the portal docs", href: "#" },
      },
    },
  },

  developers: {
    kicker: "Developers",
    lead: "From npm install",
    accent: "to your first delivery.",
    description: "Typed SDKs for every major language, a REST API for everything else, and a CLI that forwards events to localhost.",
    steps: [
      { title: "Create a client", body: "Install the SDK and authenticate with your API key." },
      { title: "Register an endpoint", body: "Add each customer's URL and the events it should receive. Or let them do it in the portal." },
      { title: "Send the event", body: "Call send once. Signing, retries and logs happen without another line of code." },
    ],
    languages: ["node", "python", "go", "curl"] as Language[],
    snippets: {
      node: {
        label: "Node.js",
        filename: "send-event.ts",
        code: `import { Ferry } from "@ferry/node";

const ferry = new Ferry(process.env.FERRY_API_KEY);

// Each of your customers gets their own endpoints
await ferry.endpoints.create("acme", {
  url: "https://api.acme.com/webhooks",
  events: ["invoice.paid", "invoice.failed"],
});

// Send once. Ferry signs, queues, retries and logs it.
await ferry.events.send("acme", {
  type: "invoice.paid",
  data: { id: "inv_2048", amount: 4900, currency: "usd" },
});`,
        steps: [
          [1, 3],
          [5, 9],
          [11, 15],
        ],
      },
      python: {
        label: "Python",
        filename: "send_event.py",
        code: `import os
from ferry import Ferry

ferry = Ferry(os.environ["FERRY_API_KEY"])

# Each of your customers gets their own endpoints
ferry.endpoints.create(
    "acme",
    url="https://api.acme.com/webhooks",
    events=["invoice.paid", "invoice.failed"],
)

# Send once. Ferry signs, queues, retries and logs it.
ferry.events.send(
    "acme",
    type="invoice.paid",
    data={"id": "inv_2048", "amount": 4900, "currency": "usd"},
)`,
        steps: [
          [1, 4],
          [6, 11],
          [13, 18],
        ],
      },
      go: {
        label: "Go",
        filename: "main.go",
        code: `client := ferry.New(os.Getenv("FERRY_API_KEY"))

// Each of your customers gets their own endpoints
client.Endpoints.Create(ctx, "acme", ferry.Endpoint{
    URL:    "https://api.acme.com/webhooks",
    Events: []string{"invoice.paid", "invoice.failed"},
})

// Send once. Ferry signs, queues, retries and logs it.
client.Events.Send(ctx, "acme", ferry.Event{
    Type: "invoice.paid",
    Data: map[string]any{"id": "inv_2048", "amount": 4900},
})`,
        steps: [
          [1, 1],
          [3, 7],
          [9, 13],
        ],
      },
      curl: {
        label: "cURL",
        filename: "terminal",
        code: `export FERRY_API_KEY="fy_test_4f9c2a"

# Each of your customers gets their own endpoints
curl https://api.ferry.dev/v1/apps/acme/endpoints \\
  -H "Authorization: Bearer $FERRY_API_KEY" \\
  -d url="https://api.acme.com/webhooks"

# Send once. Ferry signs, queues, retries and logs it.
curl https://api.ferry.dev/v1/apps/acme/events \\
  -H "Authorization: Bearer $FERRY_API_KEY" \\
  -d type="invoice.paid" -d data[id]="inv_2048"`,
        steps: [
          [1, 1],
          [3, 6],
          [8, 11],
        ],
      },
    } satisfies Record<Language, Snippet>,
  },

  metrics: [
    { value: "99.99%", label: "Uptime SLA on every paid plan" },
    { value: "2.1B", label: "Events delivered last month" },
    { value: "38 ms", label: "Median time to dispatch" },
    { value: "4,000+", label: "Teams sending in production" },
  ],

  testimonials: {
    kicker: "Customers",
    lead: "Teams that stopped",
    accent: "thinking about webhooks.",
    featured: {
      quote:
        "We deleted four services, a Redis cluster and an on-call runbook the week we moved to Ferry. Webhook tickets went from our top support category to one we have to scroll to find.",
      name: "Hannah Okafor",
      role: "Staff Engineer, Northwind",
      metric: { value: "92%", label: "fewer webhook support tickets" },
    },
    items: [
      {
        quote: "The portal sold it. Our customers fix their own endpoint problems now, and they can see exactly what we sent and when.",
        name: "Diego Ramos",
        role: "CTO, Pinecrest",
      },
      {
        quote: "A customer was down for six hours. We replayed 40,000 events in a minute and nobody outside engineering noticed.",
        name: "Mei Tanaka",
        role: "Platform Lead, Lumen",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    lead: "Pay for what you send.",
    accent: "Nothing for what you retry.",
    description: "Every plan includes signing, retries, logs and the customer portal. Retries and replays never count as new events.",
    slider: {
      question: "How many events do you send each month?",
      /** Log-scale range, in events per month. */
      min: 10_000,
      max: 100_000_000,
      initial: 2_500_000,
      ticks: [10_000, 100_000, 1_000_000, 10_000_000, 100_000_000],
    },
    plans: [
      {
        name: "Free",
        description: "For side projects and your first integration.",
        base: 0,
        included: 50_000,
        limit: 50_000,
        cta: "Start free",
        href: "#start",
        features: ["50k events a month", "3 days of logs", "Signing and retries", "Community support"],
      },
      {
        name: "Pro",
        description: "For products with paying customers.",
        base: 49,
        included: 1_000_000,
        perMillion: 12,
        cta: "Start a 14-day trial",
        href: "#start",
        features: ["1M events included", "30 days of logs", "Customer portal", "Event replay", "Email support"],
      },
      {
        name: "Scale",
        description: "For high-volume platforms with an SLA to keep.",
        base: 399,
        included: 25_000_000,
        perMillion: 3,
        cta: "Talk to sales",
        href: "#",
        features: ["25M events included", "90 days of logs", "99.99% uptime SLA", "SSO and audit logs", "Dedicated Slack channel"],
      },
    ] satisfies Plan[],
    enterprise: { text: "Over 100M events, a dedicated region or on-premise delivery?", link: { label: "Talk to us", href: "#" } },
    footnote: "Prices in USD, billed monthly. Overage is billed per event, rounded to the nearest thousand.",
  },

  faq: {
    kicker: "FAQ",
    lead: "Questions engineers",
    accent: "ask us first.",
    description: "The short answers. The docs have the long ones.",
    contact: {
      title: "Talk to an engineer",
      body: "Migrating from a home-grown system? We will help you plan it, usually in one call.",
      label: "Book a call",
      href: "#",
    },
    items: [
      {
        question: "What counts as an event?",
        answer:
          "One call to send, no matter how many endpoints receive it. Fan-out, retries and replays are free, so an event delivered to ten customers and retried three times still counts once.",
      },
      {
        question: "What happens when an endpoint is down?",
        answer:
          "Ferry retries with exponential backoff for up to 24 hours. If the endpoint is still failing, the event moves to a dead-letter queue, the endpoint owner gets an email, and you can replay it later.",
      },
      {
        question: "How do receivers verify a request came from you?",
        answer:
          "Every request carries an HMAC-SHA256 signature and a timestamp. Our SDKs verify both in one line, and you can rotate signing keys without breaking anyone mid-delivery.",
      },
      {
        question: "Can our customers manage their own endpoints?",
        answer:
          "Yes. The customer portal is an embeddable, white-label page where they add URLs, choose event types, read their delivery logs and send test events.",
      },
      {
        question: "Do you guarantee ordering?",
        answer:
          "Events for the same endpoint are delivered in the order you sent them by default. You can turn ordering off per endpoint for higher throughput.",
      },
      {
        question: "Where is our data stored?",
        answer:
          "Payloads are encrypted at rest and kept for your plan's log retention, then deleted. Scale and Enterprise plans can pin storage to the US or the EU.",
      },
    ],
  },

  finalCta: {
    kicker: "Get started",
    lead: "Ship webhooks",
    accent: "this afternoon.",
    description: "Free up to 50k events a month. No credit card, and a CLI that forwards events to localhost while you build.",
    primary: { label: "Start free", href: "#start" },
    secondary: { label: "Read the docs", href: "#" },
    /** The terminal in the closing card. Lines print one after another, then loop. */
    terminal: {
      command: "ferry listen --forward localhost:3000/webhooks",
      ready: "Ready. Forwarding events from acme (test mode)",
      lines: [
        { type: "customer.created", status: 200, ms: 14 },
        { type: "invoice.paid", status: 200, ms: 11 },
        { type: "invoice.failed", status: 500, ms: 9 },
        { type: "invoice.failed", status: 200, ms: 12, retry: true },
        { type: "subscription.updated", status: 200, ms: 16 },
      ],
    },
  },

  footer: {
    blurb: "Webhook infrastructure for API products. Send an event once and Ferry gets it to every customer endpoint.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "How it works", href: "#product" },
          { label: "Customer portal", href: "#product" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Docs", href: "#" },
          { label: "API reference", href: "#" },
          { label: "SDKs", href: "#developers" },
          { label: "Status", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Customers", href: "#customers" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "mailto:hello@ferry.dev" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Security", href: "#" },
          { label: "DPA", href: "#" },
        ],
      },
    ],
  },
};

export type SiteConfig = typeof site;
