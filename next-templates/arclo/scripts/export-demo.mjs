import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const marketplace = path.resolve(root, "../..");
const destination = path.resolve(marketplace, "public/demos/arclo");
if (!existsSync(path.join(marketplace, "src/data/templates.ts")))
  throw new Error(
    "Use npm run build for your site. This script exports into the Hairline UI catalog.",
  );
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      ARCLO_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/demos/arclo",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync(destination, { recursive: true });
for (const entry of readdirSync(path.join(root, "out"))) {
  const target = path.resolve(destination, entry);
  if (!target.startsWith(`${destination}${path.sep}`))
    throw new Error("Export target escaped the Arclo demo directory.");
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(path.join(root, "out", entry), target, { recursive: true });
}
console.log(`Arclo demo exported to ${destination}`);
