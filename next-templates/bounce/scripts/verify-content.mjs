// Checks the content you edit: cohort numbers, plans and instalments, beat pad patterns,
// weeks, images, section anchors and link fallbacks. Run with `npm run verify:content`.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, basePath = "") {
  const js = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const context = { exports: {}, process: { env: { NEXT_PUBLIC_BASE_PATH: basePath } }, encodeURIComponent, Date, Math };
  vm.runInNewContext(js, context);
  return context.exports;
}

const { site, enrollHref, tierHref, seatsLeft } = load("site.config.ts");
const image = (path) => existsSync(new URL(`../public${path}`, import.meta.url));
const colors = ["pink", "violet", "blue", "lime", "cyan", "amber"];

// Cohort.
const { cohort } = site;
assert(!Number.isNaN(Date.parse(cohort.start)), "cohort.start must be a date");
assert(cohort.taken >= 0 && cohort.taken <= cohort.seats, "cohort.taken must be between 0 and seats");
assert.equal(seatsLeft(), cohort.seats - cohort.taken);

// Plans: instalments never cost less than paying once, and the default tier exists.
const { pricing } = site;
assert(pricing.tiers.some((t) => t.id === pricing.defaultTier), "defaultTier must match a tier id");
assert.equal(new Set(pricing.tiers.map((t) => t.id)).size, pricing.tiers.length, "tier ids must be unique");
for (const t of pricing.tiers) {
  assert(colors.includes(t.color), `${t.name}: unknown colour ${t.color}`);
  assert(t.features.length > 0, `${t.name} needs features`);
  if (t.installments) {
    const total = t.installments.count * t.installments.amount;
    assert(total >= t.price, `${t.name}: instalments add up to less than the price`);
    assert(total <= t.price * 1.15, `${t.name}: instalments cost more than 15% over the price`);
  }
}

// Beat pad: one pattern row per instrument, 16 steps of x or . each.
const { pad } = site;
for (const p of pad.presets) {
  assert.equal(p.pattern.length, pad.rows.length, `${p.name}: one pattern row per instrument`);
  for (const row of p.pattern) assert(/^[x.]{16}$/.test(row), `${p.name}: "${row}" must be 16 steps of x or .`);
  assert(p.bpm >= 60 && p.bpm <= 160, `${p.name}: BPM between 60 and 160`);
}
for (const r of pad.rows) assert(colors.includes(r.color), `pad row ${r.name}: unknown colour`);

// Weeks, stories and colours.
for (const w of site.weeks.items) {
  assert(colors.includes(w.color), `week ${w.title}: unknown colour`);
  assert(w.lessons.length > 0, `week ${w.title} needs lessons`);
}
for (const s of site.stories.items) assert(colors.includes(s.color), `story ${s.name}: unknown colour`);

// Every image the config points at is in public/.
const paths = [...new Set(JSON.stringify(site).match(/\/images\/[a-z0-9-]+\.webp/g) ?? [])];
for (const p of paths) assert(image(p), `missing image ${p}`);

// Section anchors used by the menu and footer exist on the home page.
const sections = ["top", "outcomes", "weeks", "teacher", "stories", "pricing", "faq"];
for (const link of [...site.nav, ...site.footer.columns.flatMap((c) => c.links)]) {
  const anchor = link.href.split("#")[1];
  if (anchor) assert(sections.includes(anchor), `unknown section #${anchor}`);
}

// Link fallbacks when nothing is configured.
if (!site.links.enroll) assert.equal(enrollHref(), "/#pricing");
const cohortTier = pricing.tiers.find((t) => t.cohort);
if (cohortTier && !cohortTier.checkout && !site.links.enroll) assert(tierHref(cohortTier).startsWith(`mailto:${site.links.email}`));
assert.equal(tierHref({ ...cohortTier, checkout: "https://pay.example.com/c" }), "https://pay.example.com/c");

// Static hosting under a base path.
const { href, asset } = load("lib/urls.ts", "/example");
assert.equal(href("/"), "/example/index.html");
assert.equal(href("/#pricing"), "/example/index.html#pricing");
assert.equal(href("/syllabus"), "/example/syllabus.html");
assert.equal(asset("/images/teacher.webp"), "/example/images/teacher.webp");

console.log(`Verified the cohort, ${pricing.tiers.length} plans, ${pad.presets.length} beat presets, ${site.weeks.items.length} weeks, ${paths.length} images and ${sections.length} section anchors.`);
