import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const marketplace = path.resolve(root, "../..");
const destination = path.join(marketplace, "public/demos/stillform");
if (!existsSync(path.join(marketplace, "src/data/templates.ts"))) {
  throw new Error(
    "Run export:demo inside the FounderDada repository. Use npm run build for your standalone site.",
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
      STILLFORM_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/demos/stillform",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
// Copy only after a successful build. Keep the existing preview available if the build fails.
mkdirSync(destination, { recursive: true });
const output = path.join(root, "out");
for (const entry of readdirSync(output)) {
  const target = path.join(destination, entry);
  if (
    !path.resolve(target).startsWith(`${path.resolve(destination)}${path.sep}`)
  ) {
    throw new Error("Export destination escaped the Stillform demo directory.");
  }
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(path.join(output, entry), target, { recursive: true });
}
console.log(`Stillform demo exported to ${destination}`);
