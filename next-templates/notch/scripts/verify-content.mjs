// Checks the content you edit: plans and billing math, link fallbacks, articles, images and section anchors.
// Run with `npm run verify:content` after changing site.config.ts or data/.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, basePath = "") {
  const js = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const context = { exports: {}, process: { env: { NEXT_PUBLIC_BASE_PATH: basePath } }, encodeURIComponent };
  vm.runInNewContext(js, context);
  return context.exports;
}

const config = load("site.config.ts");
const { site, planHref, signupHref, yearlySaving } = config;
const { articles } = load("data/articles.ts");
const image = (path) => existsSync(new URL(`../public${path}`, import.meta.url));

// Plans: yearly is cheaper, and "2 months free" is exactly two months.
for (const plan of site.pricing.plans) {
  assert(plan.features.length && plan.extras.length, `${plan.name} needs features and extras`);
  if (!plan.price) continue;
  assert(plan.price.yearly < plan.price.monthly, `${plan.name}: yearly should be cheaper`);
  if (/2 months free/i.test(site.pricing.yearlyNote)) assert.equal(yearlySaving(plan.price), plan.price.monthly * 2, `${plan.name}: saving is not two months`);
}
assert.equal(site.pricing.plans.filter((p) => p.featured).length, 1, "mark exactly one plan as featured");

// Link fallbacks when nothing is configured.
const studio = site.pricing.plans[0];
const enterprise = site.pricing.plans.find((p) => !p.price);
if (!site.links.signup) assert.equal(signupHref(), "/#pricing");
if (!site.links.signup && !studio.checkout.monthly) assert(planHref(studio, "monthly").startsWith(`mailto:${site.links.email}`));
if (enterprise && !site.links.sales && !enterprise.checkout.monthly) assert(planHref(enterprise, "monthly").startsWith("mailto:"));
const withCheckout = { ...studio, checkout: { monthly: "https://pay.example.com/m", yearly: "https://pay.example.com/y" } };
assert.equal(planHref(withCheckout, "yearly"), "https://pay.example.com/y");

// Section anchors used by the menu and footer exist on the home page.
const sections = ["product", "workflow", "features", "customers", "pricing", "journal"];
for (const link of [...site.nav, ...site.footer.columns.flatMap((c) => c.links)]) {
  const anchor = link.href.split("#")[1];
  if (anchor) assert(sections.includes(anchor), `unknown section #${anchor}`);
}

// Articles.
assert.equal(new Set(articles.map((a) => a.slug)).size, articles.length, "article slugs must be unique");
assert(articles.length >= 2, "the home page shows two articles");
for (const a of articles) {
  assert(/^[a-z0-9-]+$/.test(a.slug), `bad slug ${a.slug}`);
  assert(!Number.isNaN(Date.parse(a.date)), `bad date on ${a.slug}`);
  assert(a.body.length > 2, `${a.slug} needs a body`);
  assert(image(a.cover), `missing cover ${a.cover}`);
}

// Every image the config points at is in public/.
const paths = JSON.stringify(site).match(/\/images\/[a-z0-9-]+\.webp/g) ?? [];
for (const p of new Set(paths)) assert(image(p), `missing image ${p}`);

// Static hosting under a base path.
const { href, asset } = load("lib/urls.ts", "/example");
assert.equal(href("/"), "/example/index.html");
assert.equal(href("/#pricing"), "/example/index.html#pricing");
assert.equal(href("/journal/the-75-percent-rule"), "/example/journal/the-75-percent-rule.html");
assert.equal(href("mailto:hello@example.com"), "mailto:hello@example.com");
assert.equal(asset("/images/dashboard.webp"), "/example/images/dashboard.webp");

console.log(`Verified ${site.pricing.plans.length} plans, link fallbacks, ${sections.length} section anchors, ${articles.length} articles and ${new Set(paths).size} images.`);
