import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transpileModule, ModuleKind } from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
async function module(path) {
  const source = readFileSync(`${root}${path}`, "utf8");
  const code = transpileModule(source, {
    compilerOptions: { module: ModuleKind.ESNext },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}
const { site } = await module("site.config.ts");
const { blueprints, workflowReceipt } = await module("data/blueprints.ts");
const { stories } = await module("data/stories.ts");
const { planQuote } = await module("lib/billing.ts");
assert.deepEqual(planQuote(site.pricing.plans[1], true), {
  monthlyRate: 24,
  due: 288,
  cadence: "year",
  free: false,
});
assert.deepEqual(planQuote(site.pricing.plans[2], false), {
  monthlyRate: 99,
  due: 99,
  cadence: "month",
  free: false,
});
assert.equal(planQuote(site.pricing.plans[2], true).due, 948);
assert.equal(planQuote(site.pricing.plans[0], true).due, 0);
assert.equal(planQuote(site.pricing.plans[0], false).free, true);
assert.equal(new Set(site.pricing.plans.map((p) => p.id)).size, 3);
assert.equal(Object.keys(blueprints).length, 4);
for (const blueprint of Object.values(blueprints)) {
  assert.equal(blueprint.steps.length, 4);
  assert.ok(blueprint.rule);
  assert.ok(blueprint.result);
}
for (const story of stories) assert.ok(blueprints[story.blueprint]);
for (const industry of site.industries.items)
  assert.ok(blueprints[industry.blueprint]);
assert.equal(workflowReceipt.example, true);
assert.equal(workflowReceipt.actions.length, 4);
assert.match(workflowReceipt.externalActions, /None/);
for (const image of ["glass", "portrait", "mesh"])
  assert.ok(existsSync(`${root}public/images/${image}.webp`));
assert.ok(site.faq.items.length >= 6);
console.log(
  "Conduit billing totals, agent boundaries, story mappings, run receipt and shipped assets verified.",
);
