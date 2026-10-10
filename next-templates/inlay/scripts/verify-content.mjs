// Checks the content you edit: plan prices and the yearly saving, handles, the example
// page's tiles, section anchors and every image the site points at.
// Run with `npm run verify:content` after changing site.config.ts.
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
let checks = 0;
const check = (ok, message) => {
  assert(ok, message);
  checks++;
};
const handle = /^[a-z0-9](?:[a-z0-9._]{1,22})[a-z0-9]$/;

// Plans: one featured, and each yearly price is the monthly price less the advertised saving.
const { pricing } = site;
check(pricing.plans.filter((p) => p.featured).length === 1, "mark exactly one plan as featured");
for (const plan of pricing.plans) {
  check(plan.features.length >= 3, `${plan.name}: list at least three features`);
  if (plan.monthly === 0) {
    check(plan.yearly === 0, `${plan.name}: a free plan is free yearly too`);
    continue;
  }
  check(plan.yearly < plan.monthly, `${plan.name}: yearly should be cheaper than monthly`);
  check(plan.yearly === Math.round(plan.monthly * (1 - pricing.saving / 100)), `${plan.name}: yearly ${plan.yearly} is not ${pricing.saving}% off ${plan.monthly}`);
}

// Handles: the claim field's examples and the example page must be valid handles.
for (const h of site.hero.handles) check(handle.test(h), `hero.handles: "${h}" isn't a valid handle (3–24 lowercase letters, numbers, dots or underscores)`);
check(handle.test(site.page.handle), `page.handle "${site.page.handle}" isn't a valid handle`);
check(!/^https?:|\//.test(site.handleDomain), `handleDomain is a bare domain like "inlay.me", without https:// or slashes`);

// The example page: one tile per slot, slots a–g, sensible waiting positions.
const slots = site.page.tiles.map((t) => t.slot);
check(new Set(slots).size === slots.length, "each tile needs its own slot");
for (const t of site.page.tiles) {
  check(/^[a-g]$/.test(t.slot), `tile slot "${t.slot}" must be one of a–g (see the grid in styles/hero.css)`);
  check(t.alt && t.alt.length > 8, `tile ${t.slot}: describe the image in alt`);
  for (const [name, at] of [["scatter", t.scatter], ["phone", t.phone]]) {
    if (!at) continue;
    check(at.x > -0.4 && at.x < 1.1 && at.y > -0.4 && at.y < 1.2, `tile ${t.slot}: ${name} position is far off the hero`);
    check(Math.abs(at.r) <= 25, `tile ${t.slot}: ${name} tilt above 25°`);
  }
}
check(site.page.tiles.length >= 3, "the example page needs at least three tiles");

// Headings use at most one [tile] phrase, with matching brackets.
const headings = [site.hero.title.join(" "), site.pay.title, site.extras.title, site.early.title, site.sell.title, site.connect.title, site.build.title, site.showcase.title, site.pricing.title, site.faq.title, ...site.story.chapters.map((c) => c.title)];
for (const h of headings) {
  const open = (h.match(/\[/g) ?? []).length;
  check(open === (h.match(/]/g) ?? []).length && open <= 1, `"${h}": use one [bracketed] phrase at most`);
}

// Sections and lists the layout expects.
check(site.story.chapters.length >= 2 && site.story.chapters.length <= 6, "story: two to six chapters");
for (const c of site.story.chapters) check(["ultra", "ink", "paper", "citrine"].includes(c.tone), `story "${c.label}": tone must be ultra, ink, paper or citrine`);
check(site.extras.cards.length >= 3, "extras: at least three cards");
check(site.build.steps.length === 3, "build: the board plays exactly three steps");
check(site.pay.incoming.length >= 3, "pay: at least three incoming payments");
check(site.pay.views.length >= 2 && site.pay.views.length <= 4, "pay: two to four balance views");
check(site.showcase.pages.length >= 2, "showcase: at least two pages");
check(site.faq.items.length >= 2, "faq: at least two questions");

// Menu links point at sections that exist on the home page.
const sources = readdirSync(new URL("../components/sections/", import.meta.url))
  .map((f) => readFileSync(new URL(`../components/sections/${f}`, import.meta.url), "utf8"))
  .join("\n");
for (const link of site.nav) {
  const anchor = link.href.split("#")[1];
  if (anchor) check(sources.includes(`id="${anchor}"`) || sources.includes(`id: "${anchor}"`), `the menu links to #${anchor}, but no section has that id`);
}

// Every image the content points at is in public/, and none is oversized.
const text = JSON.stringify(site);
const paths = new Set(text.match(/\/images\/[a-z0-9-]+\.(webp|jpg|png|svg)/g) ?? []);
for (const p of paths) {
  const file = new URL(`../public${p}`, import.meta.url);
  check(existsSync(file), `missing image ${p}`);
  check(statSync(file).size < 600 * 1024, `${p} is over 600 KB; compress it`);
}

console.log(`Content OK: ${checks} checks passed.`);
