import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const config = fs.readFileSync(path.join(root, "site.config.ts"), "utf8");
const fail = (message) => {
  throw new Error(message);
};
const images = [
  ...new Set(
    [...config.matchAll(/\/images\/[a-z-]+\.webp/g)].map((match) => match[0]),
  ),
];
for (const image of images)
  if (!fs.existsSync(path.join(root, "public", image)))
    fail(`Missing image: ${image}`);
const sections = fs
  .readdirSync(path.join(root, "components/sections"))
  .map((file) =>
    fs.readFileSync(path.join(root, "components/sections", file), "utf8"),
  )
  .join("\n");
for (const target of [...config.matchAll(/href: '#([^']+)'/g)].map(
  (match) => match[1],
))
  if (!sections.includes(`id="${target}"`))
    fail(`Missing navigation section: ${target}`);
let count = 0;
const inspect = (directory) => {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) inspect(file);
    else if (/\.(tsx?|css)$/.test(item.name)) {
      const source = fs.readFileSync(file, "utf8");
      if (source.split("\n").length > 600)
        fail(`Split this file into focused components: ${file}`);
      if (/role=["']dialog|<form\b|alert\(/.test(source))
        fail(`Unexpected application flow: ${file}`);
      count++;
    }
  }
};
for (const directory of ["app", "components", "lib", "styles"])
  inspect(path.join(root, directory));
if (images.length !== 3) fail("Expected three complete editorial images.");
console.log(
  `Verified ${images.length} local images, four section anchors and ${count} focused source files.`,
);
