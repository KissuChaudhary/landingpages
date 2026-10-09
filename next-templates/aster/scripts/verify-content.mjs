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
const { reviews, filterReviews, reviewMetrics, updateReview, reviewCSV } = source("data/reviews.ts");
const { briefs, findBrief, searchBriefs } = source("data/briefs.ts");
const { articles, pages } = source("data/pages.ts");
const { integrations } = source("data/integrations.ts");
assert.equal(site.plans[1].annual * 12, 312);
assert.equal(site.plans[1].monthly * 12 - site.plans[1].annual * 12, 72);
assert.equal(site.plans[2].annual, null);
assert.equal(new Set(reviews.map((r) => r.id)).size, reviews.length);
const metrics = reviewMetrics(reviews);
assert.equal(metrics.total, 12);
assert.equal(metrics.projects, 4);
assert.equal(metrics.approved, 7);
assert.equal(metrics.pending, 3);
assert.equal(metrics.changes, 2);
assert.equal(metrics.rate, 58);
assert.equal(metrics.median, 17);
assert.equal(filterReviews(reviews, { status: "pending", format: "Digital", discipline: "Identity", query: "alex" })[0].id, "AR-2042");
assert.equal(filterReviews(reviews, { status: "approved", query: "booking page" }).length, 0);
assert.equal(filterReviews(reviews, { query: "  KINDRED WEBSITE  " }).length, 3);
const approved = updateReview(reviews, "AR-2042", "approved", "  Spacing proof reviewed.  ", "Nina Shah");
assert.equal(reviewMetrics(approved).approved, 8);
assert.equal(reviewMetrics(approved).rate, 67);
assert.equal(reviews[0].status, "pending");
assert.equal(approved[0].draft, "Spacing proof reviewed.");
assert.equal(approved[0].owner, "Nina Shah");
const revision = updateReview(approved, "AR-2042", "changes", "Open the wordmark spacing.", "Owen Reed", "Check the spacing at small sizes.");
assert.equal(revision[0].status, "changes");
assert.equal(revision[0].owner, "Owen Reed");
assert.equal(revision[0].revisionReason, "Check the spacing at small sizes.");
assert.equal(revision[0].draft, "Open the wordmark spacing.");
assert.equal(reviewMetrics(revision).rate, 58);
assert.equal(updateReview(reviews, "AR-2042", "changes", "A response", "Nina Shah", ""), reviews);
assert.equal(updateReview(reviews, "AR-2042", "approved", "   ", "Nina Shah"), reviews);
assert.equal(updateReview(reviews, "AR-2042", "changes", "A response", "", "A detailed reason"), reviews);
const reapproved = updateReview(revision, "AR-2042", "approved", "Final proof agreed.", "Owen Reed");
assert.equal(reapproved[0].revisionReason, undefined);
assert.equal(reviewMetrics([]).median, 0);
assert.equal(reviewMetrics([]).rate, 0);
assert.equal(reviewMetrics([]).projects, 0);
assert(reviewCSV([{ ...reviews[0], reviewer: 'Alex "A", Morgan' }]).includes('"Alex ""A"", Morgan"'));
assert(reviewCSV(revision).includes('"Open the wordmark spacing."'));
assert.equal(reviewCSV(filterReviews(reviews, { status: "pending" })).split("\r\n").length, 4);
reviews.forEach((r) => assert(findBrief(r.briefId)));
assert.equal(briefs.length, 4);
assert(searchBriefs("safe area").some((b) => b.id === "tandem"));
assert.equal(new Set(integrations.map((i) => i.id)).size, integrations.length);
articles.forEach((a) => assert(pages[a.slug]));
const { href, asset } = source("lib/urls.ts", "/demos/aster");
assert.equal(href("/"), "/demos/aster/index.html");
assert.equal(
  href("/workspace?view=board"),
  "/demos/aster/workspace.html?view=board",
);
assert.equal(href("/#faq"), "/demos/aster/index.html#faq");
assert.equal(href("https://example.com/path"), "https://example.com/path");
assert.equal(asset("/images/blossom.webp"), "/demos/aster/images/blossom.webp");
for (const name of ["blossom", "grass", "petal", "nina", "owen", "mei", "ari"])
  assert(existsSync(new URL(`../public/images/${name}.webp`, import.meta.url)));
console.log("Verified billing, creative review metrics, project filters, immutable decisions, revision validation, edited exports, briefs, routes and seven original assets.");
