import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
function load(file) {
  const source = readFileSync(path.join(root, file), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("module", "exports", code)(module, module.exports);
  return module.exports;
}
const { site } = load("site.config.ts");
const { systems } = load("data/systems.ts");
const { notes } = load("data/notes.ts");
const failures = [];
const check = (valid, message) => {
  if (!valid) failures.push(message);
};
const destination = (value) =>
  /^\/(?!\/)|^https:\/\/|^mailto:|^tel:/.test(value);
check(
  Boolean(site.brand && site.title && site.description && site.email),
  "Set the brand, title, description and email.",
);
check(
  /^https?:\/\//.test(site.url),
  "site.url must be an absolute HTTP(S) URL.",
);
check(
  destination(site.links.booking),
  "Set a real page, HTTPS booking link or email destination.",
);
check(
  !site.links.contactEndpoint || /^https:\/\//.test(site.links.contactEndpoint),
  "The contact endpoint must use HTTPS.",
);
site.nav.forEach((item) =>
  check(
    destination(item.href),
    `Invalid navigation destination: ${item.label}`,
  ),
);
check(
  site.capabilities.items.length === 4,
  "Keep four capabilities, or update the tab layout and diagram.",
);
site.capabilities.items.forEach((item) =>
  check(
    item.labels.length === 4 && item.deliverables.length > 0,
    `Complete the ${item.title} workflow.`,
  ),
);
check(
  site.engagements.plans.length === 2,
  "Keep two offers, or update the engagement layout.",
);
site.engagements.plans.forEach((plan) =>
  check(
    Number.isFinite(plan.price) &&
      Number.isFinite(plan.partnerPrice) &&
      plan.price >= 0 &&
      plan.partnerPrice >= 0,
    `Invalid price: ${plan.name}`,
  ),
);
for (const [name, items] of [
  ["systems", systems],
  ["notes", notes],
]) {
  check(
    new Set(items.map((item) => item.slug)).size === items.length,
    `Duplicate ${name} slugs.`,
  );
  items.forEach((item) => {
    check(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug),
      `Invalid slug: ${item.slug}`,
    );
    check(
      Boolean(item.title && item.sections.length),
      `Incomplete ${name} entry: ${item.slug}`,
    );
    item.sections.forEach((section) =>
      check(
        Boolean(section.title && section.body),
        `Empty section in ${item.slug}`,
      ),
    );
  });
}
for (const file of [
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "public/icon.svg",
  "public/fonts/geist-latin.woff2",
  "public/fonts/geist-mono-latin.woff2",
])
  check(existsSync(path.join(root, file)), `Missing file: ${file}`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Content valid: ${systems.length} system studies, ${notes.length} notes, ${site.capabilities.items.length} capabilities and ${site.engagements.plans.length} offers.`,
);
if (site.url === "https://example.com" || site.email.endsWith(".example"))
  console.log(
    "Before launch: replace the example URL, email, studio identity, offers and legal starter copy.",
  );
