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
const leads = workflows.find((item) => item.id === "leads");
assert.equal(
  executeWorkflow(leads, 10).matched,
  2,
  "Default lead filter must qualify both applicable teams.",
);
assert.equal(
  executeWorkflow(leads, 20).matched,
  1,
  "Higher threshold must exclude the smaller qualified team.",
);
assert.equal(
  executeWorkflow(leads, 30).matched,
  0,
  "Empty results must remain valid.",
);
assert.equal(
  executeWorkflow(workflows[1]).items[0].startsWith("Priority:"),
  true,
);
assert.equal(executeWorkflow(workflows[2]).items.length, 3);
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
  "PASS: lead thresholds, empty outputs, digest ordering, onboarding tasks, pricing, article content, routes and assets.",
);
