import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const marketplace = path.resolve(root, "../..");
const destination = path.join(marketplace, "public/demos/shear");
if (!existsSync(path.join(marketplace, "src/data/templates.ts"))) {
  throw new Error(
    "Use npm run build for your own site. export:demo requires the Hairline UI repository.",
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
      SHEAR_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/demos/shear",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync(destination, { recursive: true });
for (const entry of readdirSync(path.join(root, "out"))) {
  const target = path.resolve(destination, entry);
  if (!target.startsWith(`${path.resolve(destination)}${path.sep}`))
    throw new Error("Export path escaped the Shear demo directory.");
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(path.join(root, "out", entry), target, { recursive: true });
}
console.log(`Shear demo exported to ${destination}`);
