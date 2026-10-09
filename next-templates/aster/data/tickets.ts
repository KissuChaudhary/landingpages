export type TicketStatus = "open" | "resolved" | "handoff";
export type Ticket = {
  id: string;
  customer: string;
  initials: string;
  subject: string;
  message: string;
  channel: "Chat" | "Email";
  category: "Orders" | "Accounts" | "Billing" | "Product";
  priority: "Normal" | "High";
  status: TicketStatus;
  source: string;
  draft: string;
  minutes: number;
  score: number | null;
  owner: string;
  needsHuman: boolean;
  handoffReason?: string;
};
export const tickets: Ticket[] = [
  {
    id: "AS-1042",
    customer: "Alex Morgan",
    initials: "AM",
    subject: "Where can I find my order?",
    message:
      "Hi! I ordered a few days ago and wanted to check where things are. Can you point me in the right direction?",
    channel: "Chat",
    category: "Orders",
    priority: "Normal",
    status: "open",
    source: "delivery",
    draft:
      "Hi Alex, happy to help. Your dispatch email will have the tracking link, and orders usually leave the studio within two working days. If the delivery estimate has passed, I can ask our team to take a closer look.",
    minutes: 4,
    score: null,
    owner: "Unassigned",
    needsHuman: false,
  },
  {
    id: "AS-1041",
    customer: "Jamie Ellis",
    initials: "JE",
    subject: "I need help with a duplicate charge",
    message:
      "There are two charges for the same order on my statement. Could someone take a look?",
    channel: "Email",
    category: "Billing",
    priority: "High",
    status: "handoff",
    source: "returns",
    draft:
      "Hi Jamie, thanks for flagging this. A teammate needs to review the billing details before we can confirm what happened. I’ll keep your question and the order context together for that review.",
    minutes: 12,
    score: null,
    owner: "Billing team",
    needsHuman: true,
  },
  {
    id: "AS-1040",
    customer: "Robin Chen",
    initials: "RC",
    subject: "How do I reset my password?",
    message: "I cannot remember my password. Is there a way to reset it?",
    channel: "Chat",
    category: "Accounts",
    priority: "Normal",
    status: "resolved",
    source: "access",
    draft:
      "Hi Robin, use the reset link on the sign-in page to request a recovery email. If it doesn’t arrive, check spam and make sure the address is the one used for your account. Please keep passwords and recovery codes private.",
    minutes: 2,
    score: 5,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1039",
    customer: "Sam Rivera",
    initials: "SR",
    subject: "A quick question about care",
    message: "What is the best way to clean my new purchase?",
    channel: "Email",
    category: "Product",
    priority: "Normal",
    status: "resolved",
    source: "care",
    draft:
      "Hi Sam, a soft damp cloth is a good place to start. Allow it to dry naturally and keep it away from prolonged direct heat. Let us know if you need anything else.",
    minutes: 3,
    score: 5,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1038",
    customer: "Taylor Brooks",
    initials: "TB",
    subject: "Can I return an unused item?",
    message:
      "I picked the wrong size. The item is unused. What should I do next?",
    channel: "Chat",
    category: "Billing",
    priority: "Normal",
    status: "open",
    source: "returns",
    draft:
      "Hi Taylor, unused items can be returned within 30 days of delivery. Keep your order reference handy and share a short reason with the team so they can guide you through the next step.",
    minutes: 5,
    score: null,
    owner: "Unassigned",
    needsHuman: false,
  },
  {
    id: "AS-1037",
    customer: "Casey Green",
    initials: "CG",
    subject: "My purchase arrived damaged",
    message:
      "The box arrived with a damaged item inside. I can share the details if that helps.",
    channel: "Email",
    category: "Product",
    priority: "High",
    status: "open",
    source: "care",
    draft:
      "Hi Casey, I’m sorry it arrived this way. Please share the order reference and a description of the damage. Our product team can review the next step with the relevant details in one place.",
    minutes: 8,
    score: null,
    owner: "Unassigned",
    needsHuman: true,
  },
  {
    id: "AS-1036",
    customer: "Drew Patel",
    initials: "DP",
    subject: "Finding the tracking link",
    message: "Where does the tracking link arrive?",
    channel: "Chat",
    category: "Orders",
    priority: "Normal",
    status: "resolved",
    source: "delivery",
    draft:
      "Hi Drew, the tracking link is in the dispatch email. If it is not in your inbox, check spam before asking the team to take a look.",
    minutes: 2,
    score: 4,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1035",
    customer: "Lee Wilson",
    initials: "LW",
    subject: "Still waiting for account recovery",
    message:
      "I tried the recovery email and checked spam. It still has not arrived.",
    channel: "Email",
    category: "Accounts",
    priority: "High",
    status: "handoff",
    source: "access",
    draft:
      "Hi Lee, thanks for trying those steps. Our account team can review this with you. Please don’t share a password or recovery code in the conversation.",
    minutes: 10,
    score: null,
    owner: "Account team",
    needsHuman: true,
  },
  {
    id: "AS-1034",
    customer: "Jordan Hayes",
    initials: "JH",
    subject: "When does an order dispatch?",
    message: "How long does it take for an order to leave the studio?",
    channel: "Chat",
    category: "Orders",
    priority: "Normal",
    status: "resolved",
    source: "delivery",
    draft:
      "Hi Jordan, orders normally leave the studio within two working days. The dispatch email has the tracking link for the next part of the journey.",
    minutes: 1,
    score: 5,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1033",
    customer: "Jess Miller",
    initials: "JM",
    subject: "A care question",
    message: "Can I dry the item beside a heater?",
    channel: "Email",
    category: "Product",
    priority: "Normal",
    status: "resolved",
    source: "care",
    draft:
      "Hi Jess, we recommend allowing it to dry naturally and keeping it away from prolonged direct heat.",
    minutes: 3,
    score: 4,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1032",
    customer: "Chris Park",
    initials: "CP",
    subject: "Which email should I use?",
    message: "Do I use my account email for a password reset?",
    channel: "Chat",
    category: "Accounts",
    priority: "Normal",
    status: "resolved",
    source: "access",
    draft:
      "Hi Chris, use the email address associated with your account to request a recovery link. Keep any recovery codes private.",
    minutes: 2,
    score: 5,
    owner: "Aster",
    needsHuman: false,
  },
  {
    id: "AS-1031",
    customer: "Sky Anderson",
    initials: "SA",
    subject: "How long is the return window?",
    message: "What is the return window for an unused item?",
    channel: "Email",
    category: "Billing",
    priority: "Normal",
    status: "resolved",
    source: "returns",
    draft:
      "Hi Sky, unused items can be returned within 30 days of delivery. The team can help with the next step using your order reference.",
    minutes: 4,
    score: 5,
    owner: "Aster",
    needsHuman: false,
  },
];
export type TicketFilters = {
  query?: string;
  status?: TicketStatus | "all";
  channel?: string;
  category?: string;
};
export const filterTickets = (rows: Ticket[], filters: TicketFilters) =>
  rows.filter(
    (t) =>
      (!filters.status ||
        filters.status === "all" ||
        t.status === filters.status) &&
      (!filters.channel ||
        filters.channel === "all" ||
        t.channel === filters.channel) &&
      (!filters.category ||
        filters.category === "all" ||
        t.category === filters.category) &&
      `${t.id} ${t.customer} ${t.subject} ${t.message}`
        .toLowerCase()
        .includes((filters.query || "").trim().toLowerCase()),
  );
export function ticketMetrics(rows: Ticket[]) {
  const resolved = rows.filter((t) => t.status === "resolved");
  const scores = resolved.flatMap((t) => (t.score === null ? [] : [t.score]));
  const sorted = rows.map((t) => t.minutes).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return {
    total: rows.length,
    resolved: resolved.length,
    open: rows.filter((t) => t.status === "open").length,
    handoff: rows.filter((t) => t.status === "handoff").length,
    rate: rows.length ? Math.round((resolved.length / rows.length) * 100) : 0,
    median: sorted.length
      ? sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2
      : 0,
    csat: scores.length
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0,
  };
}
export type TicketEvent = {
  action: "resolved" | "handoff";
  ticketId: string;
  detail: string;
  time: string;
};
export function updateTicket(
  rows: Ticket[],
  id: string,
  action: "resolved" | "handoff",
  draft: string,
  owner: string,
  reason = "",
): Ticket[] {
  return rows.map((ticket) =>
    ticket.id !== id || (action === "resolved" && ticket.needsHuman)
      ? ticket
      : {
          ...ticket,
          status: action === "resolved" ? "resolved" : "handoff",
          draft,
          owner: action === "resolved" ? "Aster" : owner,
          handoffReason: action === "handoff" ? reason : undefined,
          score:
            action === "resolved" && ticket.status !== "resolved"
              ? null
              : ticket.score,
        },
  );
}
const quoteCell = (value: string | number) =>
  `"${String(value).replaceAll('"', '""')}"`;
export const ticketCSV = (rows: Ticket[]) =>
  [
    "Ticket,Customer,Channel,Category,Priority,Status,Owner,Response minutes",
    ...rows.map((t) =>
      [
        t.id,
        t.customer,
        t.channel,
        t.category,
        t.priority,
        t.status,
        t.owner,
        t.minutes,
      ]
        .map(quoteCell)
        .join(","),
    ),
  ].join("\r\n");
