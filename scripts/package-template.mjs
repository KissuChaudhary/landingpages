#!/usr/bin/env node
// Builds the zip a buyer downloads for one template.
//
//   node scripts/package-template.mjs index            one template
//   node scripts/package-template.mjs index prism      several
//   node scripts/package-template.mjs --all            every template in next-templates/
//
// Options: --out <dir>     output folder (default dist/templates)
//          --list          print every file that goes in the zip
//          --allow-dirty   package even if the template has uncommitted changes
//          --verify        unzip the result, then install, typecheck and build it
//
// What goes in, and why, is written down in docs/buyer-zip.md. The rules below
// are the single source of truth for it.
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const templatesDir = path.join(root, "next-templates");

// Only files git tracks are packaged, so node_modules, .next, out, local
// environment files and build info can never leak in. On top of that, these
// tracked files are ours, not the buyer's:
const exclude = [
  /^QA\.md$/, //                        our verification log
  /^DESIGN\.md$/, //                    our design brief, with reference notes
  /^scripts\/export-demo\.mjs$/, //     copies the build into this repository
  /^screenshots\//, //                  captures for the catalog
  /^public\/[^/]+-full-page\.png$/, //  catalog screenshot, not used by the page
  /\.tsbuildinfo$/,
  /(^|\/)(node_modules|\.next|out|\.open-next|\.wrangler)\//,
  /(^|\/)\.env(\..*)?$/,
  /(^|\/)\.DS_Store$/,
];

// A zip is refused if any shipped text file still mentions our internals.
const forbidden = [
  [/npm run export:demo|scripts\/export-demo/, "the marketplace export helper"],
  [/marketplace/i, "the marketplace"],
  [/\/demos\//, "a /demos/ path"],
  [/(^|[\s`'"(])work\/[a-z]/, "our work/ folder"],
  [/codex/i, "an internal tool path"],
  [/in-app browser/i, "an internal QA note"],
  [/\b(QA|DESIGN)\.md\b/, "a document that is not in the zip"],
  [/hairline ui repository|inside hairline/i, "our repository"],
  [/agentlab|skyagent|codeforge|infisical|herospark/i, "a reference site"],
];

const requiredFiles = [
  "README.md",
  "package.json",
  "package-lock.json",
  "site.config.ts",
  "next.config.ts",
  "tsconfig.json",
];
const textFile = /\.(md|json|ts|tsx|mjs|js|css|svg|txt|html)$/;
const fallbackGitignore = [
  "node_modules",
  ".next",
  "out",
  "*.tsbuildinfo",
  ".env",
  ".env*.local",
  ".DS_Store",
  "",
].join("\n");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const at = args.indexOf(name);
  return at === -1 ? undefined : args[at + 1];
};
const outDir = path.resolve(root, option("--out") ?? "dist/templates");
// --all skips folders git doesn't track yet (a template still being written).
const tracked = (name) =>
  Boolean(git("ls-files", "--", `next-templates/${name}/package.json`).trim());
const names = flag("--all")
  ? readdirSync(templatesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter(tracked)
      .sort()
  : args.filter((arg, i) => !arg.startsWith("--") && args[i - 1] !== "--out");
if (!names.length) {
  console.error("Name a template, or pass --all.");
  process.exit(1);
}

function git(...gitArgs) {
  return execFileSync("git", gitArgs, { cwd: root, encoding: "utf8" });
}

function plan(name) {
  const dir = path.join(templatesDir, name);
  if (!existsSync(path.join(dir, "package.json")))
    throw new Error(`next-templates/${name} is not a template.`);
  const rel = `next-templates/${name}`;
  if (!flag("--allow-dirty") && git("status", "--porcelain", "--", rel).trim())
    throw new Error(
      `${rel} has uncommitted changes. Commit them first, or pass --allow-dirty.`,
    );
  const tracked = git("ls-files", "-z", "--", rel)
    .split("\0")
    .filter(Boolean)
    .map((file) => file.slice(rel.length + 1));
  const included = [];
  const excluded = [];
  for (const file of tracked) {
    (exclude.some((rule) => rule.test(file)) ? excluded : included).push(file);
  }
  const has = (file) => included.includes(file);
  for (const file of requiredFiles)
    if (!has(file)) throw new Error(`${name}: ${file} is missing.`);
  if (!has("LICENSE") && !has("LICENSE.md"))
    throw new Error(`${name}: a LICENSE file is missing.`);
  if (!included.some((file) => file.startsWith("app/")))
    throw new Error(`${name}: there is no app/ folder.`);

  const entries = included.map((file) => {
    let data = readFileSync(path.join(dir, file));
    if (file === "package.json") {
      const pkg = JSON.parse(data.toString("utf8"));
      delete pkg.scripts?.["export:demo"];
      data = Buffer.from(`${JSON.stringify(pkg, null, 2)}\n`);
    }
    return { name: file, data };
  });
  if (!has(".gitignore"))
    entries.push({ name: ".gitignore", data: Buffer.from(fallbackGitignore) });

  const problems = [];
  for (const { name: file, data } of entries) {
    if (file === "package-lock.json" || !textFile.test(file)) continue;
    const text = data.toString("utf8");
    for (const [pattern, what] of forbidden)
      if (pattern.test(text)) problems.push(`${file}: mentions ${what}`);
  }
  if (problems.length)
    throw new Error(
      `${name} still mentions our internals:\n  ${problems.join("\n  ")}`,
    );
  const stamp = git("log", "-1", "--format=%cI", "--", rel).trim();
  return { name, entries, excluded, date: stamp ? new Date(stamp) : new Date() };
}

// --- a small, dependency-free zip writer ------------------------------------

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
function crc32(buffer) {
  if (typeof zlib.crc32 === "function") return zlib.crc32(buffer) >>> 0;
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zip(folder, entries, date) {
  const dosTime =
    (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
  const dosDate =
    (Math.max(date.getFullYear() - 1980, 0) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data } of entries) {
    if (name.includes("..") || name.startsWith("/"))
      throw new Error(`Unsafe path in zip: ${name}`);
    const fileName = Buffer.from(`${folder}/${name}`, "utf8");
    const deflated = zlib.deflateRawSync(data, { level: 9 });
    const stored = deflated.length >= data.length;
    const body = stored ? data : deflated;
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(stored ? 0 : 8, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(fileName.length, 26);
    locals.push(local, fileName, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(stored ? 0 : 8, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(fileName.length, 28);
    central.writeUInt32LE((0o100644 << 16) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, fileName);

    offset += local.length + fileName.length + body.length;
  }
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  if (offset + centralSize > 0xfffffff0 || entries.length > 0xfff0)
    throw new Error("This template is too large for a plain zip.");
  return Buffer.concat([...locals, ...centrals, end]);
}

// --- run --------------------------------------------------------------------

// Uses a real unzip (Info-ZIP, or bsdtar on Windows and macOS) rather than our
// own reader, so the check doesn't trust the code that wrote the archive.
function extract(file, destination) {
  const attempts = [
    ["unzip", ["-q", file, "-d", destination]],
    ["tar", ["-xf", path.basename(file), "-C", destination]],
  ];
  for (const [command, commandArgs] of attempts) {
    try {
      execFileSync(command, commandArgs, {
        cwd: path.dirname(file),
        stdio: "pipe",
      });
      return;
    } catch {}
  }
  throw new Error("Neither unzip nor a zip-capable tar could open the archive.");
}

function verify(file, name) {
  const work = mkdtempSync(path.join(tmpdir(), `buyer-${name}-`));
  try {
    extract(file, work);
    const project = path.join(work, name);
    const run = (...command) => {
      const result = spawnSync(command.join(" "), {
        cwd: project,
        stdio: "inherit",
        shell: true,
      });
      if (result.status !== 0)
        throw new Error(`${name}: \`${command.join(" ")}\` failed in the unzipped copy.`);
    };
    run("npm", "ci", "--no-audit", "--no-fund");
    run("npm", "run", "typecheck");
    run("npm", "run", "build");
    console.log(`  verified: ${name} installs, typechecks and builds from the zip`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

mkdirSync(outDir, { recursive: true });
let failed = false;
for (const name of names) {
  try {
    const { entries, excluded, date } = plan(name);
    const file = path.join(outDir, `hairline-${name}.zip`);
    const buffer = zip(name, entries, date);
    writeFileSync(file, buffer);
    const size = (buffer.length / 1024 / 1024).toFixed(1);
    console.log(
      `${name}: ${entries.length} files, ${size} MB -> ${path.relative(root, file)}` +
        (excluded.length ? `  (left out: ${excluded.join(", ")})` : ""),
    );
    if (flag("--list")) for (const { name: item } of entries) console.log(`  ${item}`);
    if (flag("--verify")) verify(file, name);
  } catch (error) {
    failed = true;
    console.error(`${name}: ${error.message}`);
  }
}
process.exitCode = failed ? 1 : 0;
