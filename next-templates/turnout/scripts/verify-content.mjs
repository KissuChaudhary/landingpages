// Checks the content you edit: plan prices and the yearly saving, case studies and
// articles, section anchors and every image the site points at.
// Run with `npm run verify:content` after changing site.config.ts or data/.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file) {
  const js = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const context = { exports: {}, require: () => ({}), process: { env: {} }, Intl, Date, Math, Array, Set };
  vm.runInNewContext(js, context);
  return context.exports;
}

const { site } = load("site.config.ts");
const { work } = load("data/work.ts");
const { articles } = load("data/articles.ts");
const image = (path) => existsSync(new URL(`../public${path}`, import.meta.url));
let checks = 0;
const check = (ok, message) => {
  assert(ok, message);
  checks++;
};

// Plans: the yearly price is the quarterly price less the advertised saving.
const { pricing } = site;
check(pricing.plans.filter((p) => p.featured).length === 1, "mark exactly one plan as featured");
for (const plan of pricing.plans) {
  check(plan.yearly < plan.quarterly, `${plan.name}: yearly should be cheaper than quarterly`);
  check(plan.yearly === Math.round(plan.quarterly * (1 - pricing.saving / 100)), `${plan.name}: yearly ${plan.yearly} is not ${pricing.saving}% off ${plan.quarterly}`);
  check(plan.features.length >= 3, `${plan.name}: list at least three features`);
}

// Case studies: unique slugs, complete pages and real links from the home page.
const slugs = work.map((w) => w.slug);
check(new Set(slugs).size === slugs.length, "case study slugs must be unique");
for (const w of work) {
  check(/^[a-z0-9-]+$/.test(w.slug), `bad case study slug "${w.slug}"`);
  check(w.results.length >= 1 && w.results.length <= 4, `${w.slug}: one to four results`);
  check(w.built.length >= 1, `${w.slug}: describe what you built`);
  check(w.facts.length === 4, `${w.slug}: four facts fill the row`);
  for (const r of w.results) check(Number.isFinite(r.value), `${w.slug}: result "${r.label}" needs a number`);
}
for (const slug of site.work.featured) check(slugs.includes(slug), `site.work.featured lists "${slug}", which isn't in data/work.ts`);
check(slugs.includes(site.hero.latest.work), `hero.latest.work "${site.hero.latest.work}" isn't in data/work.ts`);

// Articles.
check(new Set(articles.map((a) => a.slug)).size === articles.length, "article slugs must be unique");
check(articles.length >= 3, "the home page shows three articles");
for (const a of articles) {
  check(/^[a-z0-9-]+$/.test(a.slug), `bad article slug "${a.slug}"`);
  check(!Number.isNaN(Date.parse(a.date)), `bad date on ${a.slug}`);
  check(a.body.length >= 3, `${a.slug} needs a body`);
}

// Section links in the menu point at sections that exist on the home page.
const sources = readdirSync(new URL("../components/sections/", import.meta.url)).map((f) => readFileSync(new URL(`../components/sections/${f}`, import.meta.url), "utf8")).join("\n");
for (const link of site.nav) {
  const anchor = link.href.split("#")[1];
  if (anchor) check(sources.includes(`id="${anchor}"`), `the menu links to #${anchor}, but no section has that id`);
}

// Every image the content points at is in public/, and none is oversized.
const text = JSON.stringify({ site, work, articles });
const paths = new Set(text.match(/\/images\/[a-z0-9-]+\.(webp|jpg|png|svg)/g) ?? []);
for (const p of paths) {
  check(image(p), `missing image ${p}`);
  check(statSync(new URL(`../public${p}`, import.meta.url)).size < 600 * 1024, `${p} is over 600 KB; compress it`);
}

// The deck needs at least three moments to shuffle.
check(site.hero.moments.length >= 3, "hero.moments needs at least three photos");

console.log(`Content OK: ${checks} checks passed.`);
