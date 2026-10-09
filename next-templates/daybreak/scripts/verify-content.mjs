import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import ts from "typescript";
import vm from "node:vm";
function source(file) {
  const js = ts.transpileModule(
    readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const context = { exports: {}, Intl };
  vm.runInNewContext(js, context);
  return context.exports;
}
const { site } = source("site.config.ts");
const data = source("data/campaigns.ts");
const { integrations } = source("data/integrations.ts");
const { pages, articles } = source("data/pages.ts");
assert.equal(site.plans[1].annual * 12, 432);
assert.equal(site.plans[2].annual * 12, 1308);
assert.equal(site.plans[0].monthly, 0);
for (const period of ["month", "quarter"]) {
  const rows = data.campaignRows(period);
  const totals = data.totals(period);
  assert.equal(
    totals.revenue,
    rows.reduce((s, c) => s + c.revenue, 0),
  );
  assert.equal(
    totals.spend,
    rows.reduce((s, c) => s + c.spend, 0),
  );
  assert.equal(totals.roas, totals.revenue / totals.spend);
  for (const channel of ["Search", "Social", "Email"]) {
    assert.deepEqual(
      data.campaignRows(period, channel),
      rows.filter((c) => c.channel === channel),
      "Filtering must preserve the values of every campaign",
    );
    assert(
      data.campaignRows(period, channel).every((c) => c.channel === channel),
    );
    assert(data.totals(period, channel).spend > 0);
  }
}
assert.equal(data.totals("month").revenue, 50730);
assert.equal(data.totals("month").spend, 12950);
assert.equal(data.totals("month").conversions, 538);
assert(data.answerFor("strongest campaign").includes("9.0"));
assert(data.answerFor("weekly report").includes("50,730"));
assert.equal(new Set(integrations.map((i) => i.id)).size, integrations.length);
articles.forEach((a) => assert(pages[a.slug]));
for (const image of ["hero", "landscape", "mara", "elliot", "noa", "leo", "dashboard", "dashboard-phone"])
  assert(
    existsSync(new URL(`../public/images/${image}.webp`, import.meta.url)),
  );
console.log(
  "Billing, campaign totals, channel filters, recommendations, routes and eight local images verified.",
);
