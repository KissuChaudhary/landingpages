import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const issues = [];
const visit = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".next", "out", "scripts"].includes(entry.name))
      return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? visit(file) : [file];
  });
for (const file of visit(root).filter((file) => /\.(tsx?|css)$/.test(file))) {
  const content = readFileSync(file, "utf8");
  if (/href=["']#["']/.test(content)) issues.push(`${file}: empty destination`);
  if (/\b(alert|confirm)\s*\(|role=["']dialog|<dialog\b/.test(content))
    issues.push(`${file}: unexpected popup`);
  if (/framerusercontent/.test(content))
    issues.push(`${file}: remote reference dependency`);
  if (content.split("\n").length > 350)
    issues.push(`${file}: split this file into smaller components`);
}
if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
console.log(
  "Content checks passed: complete destinations, no popups, local visuals and manageable files.",
);
