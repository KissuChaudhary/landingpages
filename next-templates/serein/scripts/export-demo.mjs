import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const catalog = path.resolve(root, "../..");
const destination = path.join(catalog, "public/demos/serein");
const output = path.join(root, ".next-export");
if (!existsSync(path.join(catalog, "src/data/templates.ts"))) {
  throw new Error(
    "Use npm run build for your own site. This helper exports the Hairline UI demo.",
  );
}
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/demos/serein",
      NEXT_DIST_DIR: ".next-export",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync(destination, { recursive: true });
for (const entry of readdirSync(output)) {
  const target = path.resolve(destination, entry);
  if (!target.startsWith(`${path.resolve(destination)}${path.sep}`))
    throw new Error("Export target escaped the Serein demo directory.");
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(path.join(output, entry), target, { recursive: true });
}
console.log(`Serein demo exported to ${destination}`);
