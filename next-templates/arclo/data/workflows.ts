export type SourceRow = {
  name: string;
  /** This month's figure: a bank line, an account balance or an entry. */
  amount: number;
  /** What it's compared with: the ledger amount or last month's balance. */
  compare?: number;
  note: string;
};

export const workflows = [
  {
    id: "match",
    label: "Match bank lines",
    trigger: "Bank feed synced",
    engine: "Matching rules",
    condition: "Within your tolerance",
    action: "Post matches",
    tool: "ledger",
    context:
      "Three lines from this morning’s bank feed, each next to the ledger entry it should clear.",
    rules:
      "A line matches when it differs from its ledger entry by no more than your tolerance. Anything else waits for a person.",
    source: [
      { name: "Halden Payments payout · 3 Oct", amount: 12480, compare: 12480, note: "Payout clearing" },
      { name: "Nimbus Cloud · 5 Oct", amount: 2316.42, compare: 2311.9, note: "Hosting accrual" },
      { name: "Wharf Street lease · 1 Oct", amount: 8500, compare: 8250, note: "Office lease" },
    ] as SourceRow[],
  },
  {
    id: "flux",
    label: "Explain variances",
    trigger: "Trial balance imported",
    engine: "Variance review",
    condition: "Over 10% and $2,000",
    action: "Draft variance notes",
    tool: "document",
    context: "Three accounts from the October trial balance, next to September.",
    rules:
      "Flag a movement only when it’s both above 10% and above $2,000, then draft a note from the supporting detail.",
    source: [
      { name: "6100 Software", amount: 18400, compare: 14200, note: "Annual design tool renewal booked in October" },
      { name: "6400 Travel", amount: 3100, compare: 2950, note: "Two client visits" },
      { name: "4000 Revenue", amount: 212000, compare: 188500, note: "Two enterprise go-lives" },
    ] as SourceRow[],
  },
  {
    id: "approve",
    label: "Route approvals",
    trigger: "Journal entry drafted",
    engine: "Approval policy",
    condition: "Above approval limits",
    action: "Request sign-off",
    tool: "approval",
    context: "Three journal entries drafted for the October close.",
    rules:
      "Entries from $5,000 need the controller. From $25,000 the CFO signs as well. Smaller entries post after a peer review.",
    source: [
      { name: "JE-1042 Accrued bonuses", amount: 42000, note: "Prepared by Lena" },
      { name: "JE-1043 Prepaid insurance", amount: 3600, note: "Prepared by Omar" },
      { name: "JE-1044 FX revaluation", amount: 9800, note: "Prepared by Lena" },
    ] as SourceRow[],
  },
];
export type Workflow = (typeof workflows)[number];

export const money = (value: number, cents = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value);

/** How a source row reads in the workflow explorer. */
export function describeRow(workflow: Workflow, row: SourceRow) {
  if (workflow.id === "match") return `${money(row.amount, true)} · ledger ${money(row.compare ?? 0, true)} · ${row.note}`;
  if (workflow.id === "flux") return `${money(row.amount)} · September ${money(row.compare ?? 0)}`;
  return `${money(row.amount)} · ${row.note}`;
}

/** Runs a workflow over its sample rows. Tolerance applies to bank matching, in dollars. */
export function executeWorkflow(workflow: Workflow, tolerance = 5) {
  const rows = workflow.source;
  if (workflow.id === "match") {
    const difference = (row: SourceRow) => Math.round(Math.abs(row.amount - (row.compare ?? 0)) * 100) / 100;
    const matched = rows.filter((row) => difference(row) <= tolerance);
    const open = rows.filter((row) => difference(row) > tolerance);
    return {
      title: `${matched.length} of ${rows.length} lines matched`,
      items: [
        ...matched.map((row) => `Matched · ${row.name} → ${row.note}${difference(row) ? ` (${money(difference(row), true)} within tolerance)` : ""}`),
        ...open.map((row) => `Review · ${row.name} is ${money(difference(row), true)} off ${row.note}`),
      ],
      processed: rows.length,
      matched: matched.length,
    };
  }
  if (workflow.id === "flux") {
    const flagged = rows.filter((row) => {
      const change = row.amount - (row.compare ?? 0);
      return Math.abs(change) >= 2000 && Math.abs(change) / (row.compare || 1) >= 0.1;
    });
    return {
      title: `${flagged.length} variance${flagged.length === 1 ? "" : "s"} to explain`,
      items: flagged.map((row) => {
        const change = row.amount - (row.compare ?? 0);
        const percent = ((change / (row.compare || 1)) * 100).toFixed(1);
        return `${row.name} ${change > 0 ? "up" : "down"} ${percent}% (${money(Math.abs(change))}) · ${row.note}`;
      }),
      processed: rows.length,
      matched: flagged.length,
    };
  }
  const route = (amount: number) => (amount >= 25000 ? "Controller, then CFO" : amount >= 5000 ? "Controller" : "Peer review, then post");
  return {
    title: `${rows.length} entries routed`,
    items: rows.map((row) => `${row.name} · ${money(row.amount)} → ${route(row.amount)}`),
    processed: rows.length,
    matched: rows.filter((row) => row.amount >= 5000).length,
  };
}
