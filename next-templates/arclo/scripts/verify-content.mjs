import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
async function readModule(file) {
  const source = readFileSync(path.join(root, file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}
const { workflows, executeWorkflow } = await readModule("data/workflows.ts");
const { site } = await readModule("site.config.ts");
const { articles } = await readModule("data/articles.ts");
const { amount, annualSavings } = await readModule("lib/billing.ts");
assert.equal(amount(199 / 12), "16.58", "Fractional monthly equivalents should display as currency.");
assert.equal(annualSavings([{ monthly: 20, annual: 180 }]), 25, "Savings should derive from the configured annual charge.");
const match = workflows.find((item) => item.id === "match");
assert.equal(executeWorkflow(match, 0).matched, 1, "At zero tolerance only the exact bank line matches.");
assert.equal(executeWorkflow(match, 5).matched, 2, "The default $5 tolerance accepts the $4.52 difference.");
assert.equal(executeWorkflow(match, 50).matched, 2, "The $250 lease difference always waits for review.");
assert.equal(executeWorkflow(match, 5).items.length, 3, "Matched and unmatched lines are both reported.");
assert.ok(executeWorkflow(match, 5).items.at(-1).startsWith("Review ·"), "Exceptions are listed after the matches.");
const flux = workflows.find((item) => item.id === "flux");
const variances = executeWorkflow(flux);
assert.equal(variances.matched, 2, "Only movements above 10% and $2,000 are flagged.");
assert.ok(variances.items[0].includes("29.6%"), "Variance percentages derive from the sample balances.");
const approvals = executeWorkflow(workflows.find((item) => item.id === "approve"));
assert.equal(approvals.items.length, 3);
assert.ok(approvals.items[0].endsWith("Controller, then CFO"), "Entries from $25,000 need two approvers.");
assert.ok(approvals.items[1].endsWith("Peer review, then post"), "Small entries post after a peer review.");
assert.equal(approvals.matched, 2, "Two entries are above the controller's limit.");
for (const plan of site.plans) {
  assert.equal(plan.limits.length, 4);
  assert.ok(Number.isInteger(plan.annual));
  assert.ok(plan.annual <= plan.monthly * 12);
  assert.ok(plan.annual / 12 >= 0);
  if (plan.monthly) assert.ok(annualSavings([plan]) >= 0 && annualSavings([plan]) <= 100);
}
assert.equal(new Set(articles.map((item) => item.slug)).size, articles.length);
for (const article of articles) assert.ok(article.sections.length >= 4);
for (const asset of ["public/images/team.webp", "public/icon.svg"])
  assert.ok(existsSync(path.join(root, asset)), `Missing ${asset}`);
for (const route of [
  "app/page.tsx",
  "app/pricing/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/contact/page.tsx",
  "app/waitlist/page.tsx",
  "app/[slug]/page.tsx",
  "app/not-found.tsx",
])
  assert.ok(existsSync(path.join(root, route)), `Missing ${route}`);
console.log(
  "PASS: match tolerance, exceptions, variance thresholds, approval routing, pricing, article content, routes and assets.",
);
