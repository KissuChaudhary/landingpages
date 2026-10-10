import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const config = readFileSync(path.join(root, "site.config.ts"), "utf8");
const errors = [];
const images = [
  ...new Set([...config.matchAll(/"(\/images\/[^\"]+)"/g)].map((m) => m[1])),
];
for (const src of images)
  if (!existsSync(path.join(root, "public", src)))
    errors.push(`Missing image: ${src}`);
for (const file of ["README.md", "ASSETS.md", "LICENSE.md", "public/icon.svg"])
  if (!existsSync(path.join(root, file))) errors.push(`Missing ${file}`);
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
for (const file of walk(path.join(root, "components")))
  if (readFileSync(file, "utf8").split("\n").length > 500)
    errors.push(`Split this component: ${path.relative(root, file)}`);
const weight = images.reduce(
  (sum, src) =>
    sum +
    (existsSync(path.join(root, "public", src))
      ? statSync(path.join(root, "public", src)).size
      : 0),
  0,
);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `${images.length} images verified (${Math.round(weight / 1024)} KB). Required files and component sizes pass.`,
);
