import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import assert from "node:assert/strict";
const root = fileURLToPath(new URL("../", import.meta.url));
async function readTS(file) {
  const code = ts.transpileModule(readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}
const { site } = await readTS("site.config.ts");
const { plants } = await readTS("data/plants.ts");
const { spaces } = await readTS("data/spaces.ts");
const { href } = await readTS("lib/urls.ts");
const { briefText } = await readTS("lib/brief.ts");
assert.equal(
  new Set(plants.map((item) => item.slug)).size,
  plants.length,
  "Plant slugs must be unique.",
);
assert.equal(
  new Set(spaces.map((item) => item.slug)).size,
  spaces.length,
  "Space slugs must be unique.",
);
const assets = [
  site.hero.image,
  site.hero.backdrop,
  site.approach.image,
  site.process.image,
  ...plants.map((item) => item.image),
  ...spaces.map((item) => item.image),
];
assets.forEach((asset) =>
  assert.ok(
    existsSync(path.join(root, "public", asset)),
    `Missing asset ${asset}`,
  ),
);
plants.forEach((plant) =>
  assert.equal(
    plant.care.length,
    3,
    `${plant.slug} needs complete care notes.`,
  ),
);
assert.equal(site.faqs.length, 5);
const brief = {
  name: "Alex",
  email: "alex@example.com",
  space: "At home",
  light: "Bright indirect",
  plant: "Monstera deliciosa",
  message: "A bright reading corner.\nKeep the existing chair.",
  consent: true,
};
const text = briefText(brief);
Object.values(brief)
  .filter((value) => typeof value === "string")
  .forEach((value) =>
    assert.ok(text.includes(value), "Export must contain every enquiry field."),
  );
assert.ok(text.includes("Permission to contact about this enquiry: Yes"));
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
assert.equal(
  href("/contact?plant=monstera#main"),
  `${base ? `${base}/contact.html` : "/contact"}?plant=monstera#main`,
);
assert.equal(href("/#plants"), `${base ? `${base}/index.html` : "/"}#plants`);
assert.equal(
  href("https://example.com/booking"),
  "https://example.com/booking",
);
function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory()
      ? sourceFiles(full)
      : /\.(tsx?|css)$/.test(entry.name)
        ? [full]
        : [];
  });
}
const files = ["app", "components", "data", "lib", "styles"].flatMap((folder) =>
  sourceFiles(path.join(root, folder)),
);
files.forEach((file) =>
  assert.ok(
    readFileSync(file, "utf8").split("\n").length < 600,
    `Split the oversized file ${file}.`,
  ),
);
console.log(
  `Verified ${plants.length} plant routes, ${spaces.length} space routes, ${new Set(assets).size} local images, enquiry export and base-path links. ${files.length} focused source files.`,
);
