import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import assert from "node:assert/strict";
const root = fileURLToPath(new URL("../", import.meta.url));
const output = ts.transpileModule(
  readFileSync(path.join(root, "site.config.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ESNext } },
).outputText;
const { site } = await import(
  `data:text/javascript;base64,${Buffer.from(output).toString("base64")}`
);
const images = [
  site.hero.image,
  ...site.work.projects.map((project) => project.image),
];
images.forEach((image) =>
  assert.ok(
    existsSync(path.join(root, "public", image)),
    `Missing image: ${image}`,
  ),
);
assert.equal(
  new Set(site.work.projects.map((project) => project.name)).size,
  3,
);
assert.equal(site.services.items.length, 3);
site.services.items.forEach((item) =>
  assert.ok(item.title && item.description && item.tags.length === 3),
);
assert.equal(site.pricing.plans.length, 2);
site.pricing.plans.forEach((plan) =>
  assert.ok(plan.price && plan.features.length === 4 && plan.cta),
);
assert.ok(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.links.email),
  "Supply your email address.",
);
const sectionFiles = readdirSync(path.join(root, "components/sections")).filter(
  (file) => file.endsWith(".tsx"),
);
const sections = sectionFiles
  .map((file) =>
    readFileSync(path.join(root, "components/sections", file), "utf8"),
  )
  .join("\n");
site.navigation.forEach((item) =>
  assert.ok(
    sections.includes(`id="${item.href.slice(1)}"`),
    `Missing navigation target ${item.href}`,
  ),
);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory()
      ? files(full)
      : /\.(tsx?|css)$/.test(entry.name)
        ? [full]
        : [];
  });
}
const source = ["app", "components", "lib", "styles"].flatMap((folder) =>
  files(path.join(root, folder)),
);
source.forEach((file) =>
  assert.ok(
    readFileSync(file, "utf8").split("\n").length < 600,
    `Split oversized file ${file}`,
  ),
);
console.log(
  `Verified ${images.length} images, ${site.navigation.length} navigation anchors, three services, two complete plans and ${source.length} focused source files.`,
);
