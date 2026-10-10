import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}
function load(file, env = {}) {
  const js = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", "process", js)(module, module.exports, {
    env,
  });
  return module.exports;
}
const { site } = load("site.config.ts");
const { projects } = load("data/projects.ts");
const { articles } = load("data/articles.ts");
const { services, process, engagements } = load("data/services.ts");
const { route, asset } = load("lib/urls.ts", {
  NEXT_PUBLIC_BASE_PATH: "/studio",
  NEXT_PUBLIC_STATIC_EXPORT: "1",
});
assert.equal(
  route("/contact?engagement=launch"),
  "/studio/contact.html?engagement=launch",
);
assert.equal(route("/#process"), "/studio/index.html#process");
assert.equal(route("/work/orra"), "/studio/work/orra.html");
assert.equal(route("https://example.com/book"), "https://example.com/book");
assert.equal(asset("/images/hero.webp"), "/studio/images/hero.webp");
const normal = load("lib/urls.ts");
assert.equal(
  normal.route("/contact?engagement=launch"),
  "/contact?engagement=launch",
);
assert.equal(normal.route("/#work"), "/#work");
assert(
  site.hero.lineTwo.includes(site.hero.highlight),
  "The hero highlight must appear in lineTwo.",
);
assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
assert.equal(new Set(articles.map((a) => a.slug)).size, articles.length);
assert(projects.length >= 1 && articles.length >= 1);
for (const p of projects) {
  assert(p.challenge && p.approach && p.outcome);
  assert(p.deliverables.length);
  assert(["orra", "counter", "forma", "goodwell"].includes(p.art));
}
for (const a of articles) {
  assert(a.paragraphs.length >= 3);
  assert(!Number.isNaN(Date.parse(a.date)));
}
assert.equal(services.length, 4);
assert.equal(process.length, 4);
assert(engagements.every((e) => e.id && e.price && e.features.length));
assert.equal(new Set(engagements.map((e) => e.id)).size, engagements.length);
for (const file of ["images/hero.webp", "images/studio.webp", "icon.svg"])
  assert(
    fs.existsSync(path.join(root, "public", file)),
    `Missing asset: ${file}`,
  );
const endpoint = site.links.contactEndpoint;
if (endpoint)
  assert(
    endpoint.startsWith("/") || endpoint.startsWith("https://"),
    "Use a same-origin or HTTPS inquiry endpoint.",
  );
for (const href of [
  site.links.booking,
  site.links.instagram,
  site.links.linkedin,
])
  if (href)
    assert(
      href.startsWith("https://") || href.startsWith("/"),
      "Destinations must use HTTPS or a local path.",
    );
console.log(
  `Verified ${projects.length} projects, ${articles.length} articles, ${engagements.length} engagements, original assets, and normal/static routes with query and anchor preservation.`,
);
