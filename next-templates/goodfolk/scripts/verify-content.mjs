import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const errors = [];
let media = 0;
function walk(dir) {
  for (const entry of readdirSync(path.join(root, dir), {
    withFileTypes: true,
  })) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(relative);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const source = readFileSync(path.join(root, relative), "utf8");
      for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) {
        media++;
        if (!existsSync(path.join(root, "public", match[1])))
          errors.push(`${relative}: missing ${match[1]}`);
      }
    }
  }
}
["app", "components", "data"].forEach(walk);
const config = readFileSync(path.join(root, "site.config.ts"), "utf8");
for (const match of config.matchAll(/["'](\/images\/[^"']+)["']/g)) {
  media++;
  if (!existsSync(path.join(root, "public", match[1])))
    errors.push(`site.config.ts: missing ${match[1]}`);
}
for (const file of ["data/projects.ts", "data/notes.ts"]) {
  const slugs = Array.from(
    readFileSync(path.join(root, file), "utf8").matchAll(
      /slug:\s*["']([^"']+)["']/g,
    ),
    (m) => m[1],
  );
  if (new Set(slugs).size !== slugs.length)
    errors.push(`${file}: duplicate slug`);
  slugs.forEach((slug) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      errors.push(`${file}: invalid slug ${slug}`);
  });
}
for (const file of [
  "public/fonts/manrope-latin.woff2",
  "public/fonts/OFL.txt",
  "public/icon.svg",
])
  if (!existsSync(path.join(root, file))) errors.push(`Missing ${file}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Content verified: ${media} local image references, unique page slugs, font and icon.`,
);
