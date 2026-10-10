import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const repository = path.resolve(root, "../..");
const destination = path.resolve(repository, "public/demos/aveniq");
if (!existsSync(path.join(repository, "src/data/templates.ts")))
  throw new Error(
    "This maintainer export helper requires the template repository. Use npm run build for your own site.",
  );
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      AVENIQ_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/demos/aveniq",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync(destination, { recursive: true });
for (const entry of readdirSync(path.join(root, "out"))) {
  const target = path.resolve(destination, entry);
  if (!target.startsWith(destination + path.sep))
    throw new Error("Export escaped the intended demo directory.");
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(path.join(root, "out", entry), target, { recursive: true });
}
console.log(`Aveniq exported to ${destination}`);
