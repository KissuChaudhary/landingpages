import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = fileURLToPath(new URL("../", import.meta.url));
function load(file) {
  const code = ts.transpileModule(readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", code)(module, module.exports);
  return module.exports;
}
const { topics } = load("data/topics.ts");
const { site } = load("site.config.ts");
const { researchBrief, planPrice } = load("lib/content.ts");
for (const topic of topics) {
  assert.equal(
    new Set(topic.sources.map((source) => source.id)).size,
    topic.sources.length,
    "Source identifiers must be unique.",
  );
  const brief = researchBrief(topic);
  for (const finding of topic.findings) {
    assert.ok(
      brief.includes(finding.text),
      "An export must include every displayed finding.",
    );
    for (const id of finding.sources)
      assert.ok(
        topic.sources.some((source) => source.id === id),
        `Unresolved citation: ${id}`,
      );
  }
  for (const source of topic.sources)
    assert.ok(
      brief.includes(source.passage),
      "Every cited passage must travel with the export.",
    );
  assert.ok(
    !brief.includes("[0]"),
    "An exported citation must resolve to a numbered source.",
  );
}
assert.equal(site.plans.length, 3);
assert.equal(site.plans.filter((plan) => plan.featured).length, 1);
const paidPlan = site.plans.find((plan) => plan.id === "curious");
assert.equal(planPrice(paidPlan, "yearly").total, 144);
assert.equal(planPrice(paidPlan, "monthly").total, 15);
assert.equal(planPrice(paidPlan, "yearly").savings, 36);
assert.equal(
  planPrice(
    site.plans.find((plan) => plan.id === "together"),
    "yearly",
  ).perSeat,
  true,
);
assert.equal(planPrice(site.plans[0], "yearly").total, 0);
if (process.argv[2]) {
  const topic = topics.find((item) => item.id === process.argv[3]);
  assert.ok(topic, "Supply a valid topic ID with the downloaded file.");
  assert.equal(
    readFileSync(process.argv[2], "utf8"),
    researchBrief(topic),
    "Actual browser download must match the selected brief, including all citations.",
  );
  console.log("Actual browser download matches the complete selected brief.");
}
console.log(
  "Research citations, complete exports and plan billing pass content verification.",
);
