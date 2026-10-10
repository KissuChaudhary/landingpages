// Checks the content you edit: the tour's chapters and their images, the live counter,
// pricing tiers, the changelog, section anchors and every image the site points at.
// Run with `npm run verify:content` after changing site.config.ts or data/.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file) {
  const js = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const context = { exports: {}, require: () => ({}), process: { env: {} }, Intl, Date, Math, Array, Set, Number };
  vm.runInNewContext(js, context);
  return context.exports;
}

const { site } = load("site.config.ts");
const { releases } = load("data/changelog.ts");
const file = (path) => new URL(`../public${path}`, import.meta.url);
let checks = 0;
const check = (ok, message) => {
  assert(ok, message);
  checks++;
};
const inside = (n) => typeof n === "number" && n >= 0 && n <= 1;

// The tour: every chapter has a shape, and every shape has what it needs.
const chapters = site.tour.chapters;
check(chapters.length >= 2, "the tour needs at least two chapters");
check(new Set(chapters.map((c) => c.id)).size === chapters.length, "chapter ids must be unique");
for (const c of chapters) {
  check(["line", "screen", "phone"].includes(c.frame), `${c.id}: frame must be "line", "screen" or "phone"`);
  check(c.kicker && c.title && c.body, `${c.id}: needs a kicker, title and body`);
  if (c.frame === "line") check(typeof c.code === "string" && c.code.length > 0, `${c.id}: a line chapter needs its code`);
  else {
    check(Boolean(c.image) && existsSync(file(c.image)), `${c.id}: image ${c.image} is missing`);
    check(typeof c.aspect === "number" && c.aspect > 0.2 && c.aspect < 4, `${c.id}: give the image's aspect (width ÷ height)`);
    check(Boolean(c.alt), `${c.id}: describe the image in alt`);
    if (c.phoneImage) check(existsSync(file(c.phoneImage)) && typeof c.phoneAspect === "number", `${c.id}: phoneImage needs to exist and have a phoneAspect`);
  }
  for (const slot of [c.live, c.phoneLive].filter(Boolean)) {
    check(inside(slot.x) && inside(slot.y) && slot.size > 0 && slot.size < 0.3, `${c.id}: live slot values are shares of the image (0 to 1)`);
  }
}

// The live counter starts inside its demo range.
const [lo, hi] = site.live.range;
check(lo <= site.live.value && site.live.value <= hi, "live.value should sit inside live.range");
check(site.live.every >= 1000, "live.every is in ms; refresh no faster than once a second");

// Pricing: tiers rise in traffic and in price, and cover the slider.
const { pricing } = site;
for (let i = 1; i < pricing.tiers.length; i++) {
  check(pricing.tiers[i].upTo > pricing.tiers[i - 1].upTo, `pricing tier ${i + 1} must cover more pageviews than the one before`);
  check(pricing.tiers[i].price >= pricing.tiers[i - 1].price, `pricing tier ${i + 1} shouldn't cost less than the one before`);
}
check(pricing.tiers[pricing.tiers.length - 1].upTo >= pricing.max, "the last tier should reach pricing.max");
check(pricing.min <= pricing.start && pricing.start <= pricing.max, "pricing.start should sit between min and max");
check(pricing.marks.every((m) => m.value >= pricing.min && m.value <= pricing.max), "pricing marks must sit on the slider");
check(pricing.yearlyDiscount >= 0 && pricing.yearlyDiscount < 1, "yearlyDiscount is a share, e.g. 0.2 for 20%");

// Drawn to scale: ours is the smaller figure in every row.
for (const row of site.scale.rows) check(row.us <= row.them && row.them > 0, `${row.label}: the comparison expects ours to be the smaller number`);

// Changelog: unique ids, known tags, newest first.
const ids = releases.map((r) => r.id);
check(new Set(ids).size === ids.length, "release ids must be unique");
for (const r of releases) {
  check(/^\d{4}-\d{2}-\d{2}$/.test(r.date) && !Number.isNaN(Date.parse(r.date)), `${r.id}: dates are YYYY-MM-DD`);
  check(r.tags.length && r.tags.every((t) => ["new", "improved", "fixed"].includes(t)), `${r.id}: tags are new, improved or fixed`);
}
for (let i = 1; i < releases.length; i++) check(releases[i].date <= releases[i - 1].date, `${releases[i].id}: list releases newest first`);
check(site.shipped.count >= 2 && site.shipped.count <= releases.length, "shipped.count should be between 2 and the number of releases");
const announcement = site.hero.announcement.href.match(/^\/changelog#(.+)$/);
if (announcement) check(ids.includes(announcement[1]), `the announcement links to a release (${announcement[1]}) that isn't in data/changelog.ts`);

// Section links point at sections that exist.
const sources = ["components/sections/Tour.tsx", "components/sections/Pricing.tsx", "components/sections/Shipped.tsx", "components/sections/Faq.tsx", "components/sections/Scale.tsx"]
  .map((f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8"))
  .join("\n");
const anchors = new Set(["tour", ...chapters.map((c) => `tour-${c.id}`), "main"]);
for (const m of sources.matchAll(/id="([\w-]+)"/g)) anchors.add(m[1]);
const links = [...site.nav.map((l) => l.href), site.hero.secondary.href, ...site.footer.columns.flatMap((c) => c.links.map((l) => l.href))];
for (const href of links.filter((h) => h.startsWith("/#"))) check(anchors.has(href.slice(2)), `${href} points at a section that doesn't exist`);

// Images: every file the site points at exists and is a sensible size.
const referenced = JSON.stringify(site).match(/\/images\/[\w./-]+/g) ?? [];
for (const path of referenced) check(existsSync(file(path)), `missing image ${path}`);
for (const name of readdirSync(new URL("../public/images", import.meta.url))) {
  const size = statSync(new URL(`../public/images/${name}`, import.meta.url)).size;
  if (size > 600 * 1024) console.warn(`warning: public/images/${name} is ${Math.round(size / 1024)} KB; aim for under 600 KB`);
}

console.log(`${checks} content checks passed.`);
