import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
function source(file, basePath = "") {
  const js = ts.transpileModule(
    readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2021,
      },
    },
  ).outputText;
  const context = {
    exports: {},
    process: { env: { NEXT_PUBLIC_BASE_PATH: basePath } },
  };
  vm.runInNewContext(js, context);
  return context.exports;
}
const { site } = source("site.config.ts");
const { tickets, filterTickets, ticketMetrics, updateTicket, ticketCSV } =
  source("data/tickets.ts");
const { knowledge, findKnowledge, searchKnowledge } =
  source("data/knowledge.ts");
const { articles, pages } = source("data/pages.ts");
const { integrations } = source("data/integrations.ts");
assert.equal(site.plans[1].annual * 12, 588);
assert.equal(site.plans[1].monthly * 12 - site.plans[1].annual * 12, 120);
assert.equal(site.plans[2].annual, null);
assert.equal(new Set(tickets.map((t) => t.id)).size, tickets.length);
const metrics = ticketMetrics(tickets);
assert.equal(metrics.total, 12);
assert.equal(metrics.resolved, 7);
assert.equal(metrics.open, 3);
assert.equal(metrics.handoff, 2);
assert.equal(metrics.rate, 58);
assert.equal(metrics.median, 3.5);
assert.equal(metrics.csat.toFixed(1), "4.7");
assert.equal(
  filterTickets(tickets, {
    status: "open",
    channel: "Chat",
    category: "Orders",
    query: "alex",
  })[0].id,
  "AS-1042",
);
assert.equal(
  filterTickets(tickets, { status: "resolved", query: "duplicate" }).length,
  0,
);
assert.equal(filterTickets(tickets, { query: "  RECOVERY  " }).length, 1);
const resolved = updateTicket(
  tickets,
  "AS-1042",
  "resolved",
  "Reviewed answer",
  "Aster",
);
assert.equal(ticketMetrics(resolved).resolved, 8);
assert.equal(ticketMetrics(resolved).rate, 67);
assert.equal(tickets[0].status, "open");
assert.equal(resolved[0].score, null);
assert.equal(ticketMetrics(resolved).csat, metrics.csat);
const guarded = updateTicket(
  tickets,
  "AS-1041",
  "resolved",
  "Do not invent a refund",
  "Aster",
);
assert.equal(guarded[1].status, "handoff");
const handed = updateTicket(
  tickets,
  "AS-1037",
  "handoff",
  "An edited draft",
  "Product team",
);
assert.equal(handed[5].owner, "Product team");
assert.equal(handed[5].draft, "An edited draft");
assert.equal(handed[5].status, "handoff");
assert.equal(ticketMetrics([]).median, 0);
assert.equal(ticketMetrics([]).csat, 0);
assert(
  ticketCSV([{ ...tickets[0], customer: 'Alex "A", Morgan' }]).includes(
    '"Alex ""A"", Morgan"',
  ),
);
assert.equal(
  ticketCSV(filterTickets(tickets, { status: "open" })).split("\r\n").length,
  4,
);
tickets.forEach((t) => assert(findKnowledge(t.source)));
assert.equal(knowledge.length, 4);
assert(searchKnowledge("password").some((a) => a.id === "access"));
assert.equal(new Set(integrations.map((i) => i.id)).size, integrations.length);
articles.forEach((a) => assert(pages[a.slug]));
const { href, asset } = source("lib/urls.ts", "/demos/aster");
assert.equal(href("/"), "/demos/aster/index.html");
assert.equal(
  href("/workspace?view=triage"),
  "/demos/aster/workspace.html?view=triage",
);
assert.equal(href("/#faq"), "/demos/aster/index.html#faq");
assert.equal(href("https://example.com/path"), "https://example.com/path");
assert.equal(asset("/images/blossom.webp"), "/demos/aster/images/blossom.webp");
for (const name of ["blossom", "grass", "petal", "nina", "owen", "mei", "ari"])
  assert(existsSync(new URL(`../public/images/${name}.webp`, import.meta.url)));
console.log(
  "Verified billing, ticket metrics, combined filters, guarded resolution, handoff edits, CSV quoting, knowledge, routes and seven original assets.",
);
