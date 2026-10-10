import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
async function source(file) {
  const output = ts.transpileModule(
    readFileSync(path.join(root, file), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  return import(
    "data:text/javascript;base64," + Buffer.from(output).toString("base64")
  );
}
const [{ site }, { campaigns }, { notes }, { briefText, emailDraft }] =
  await Promise.all([
    source("site.config.ts"),
    source("data/campaigns.ts"),
    source("data/journal.ts"),
    source("lib/contact.ts"),
  ]);
for (const items of [campaigns, notes, site.services, site.plans])
  assert.equal(
    new Set(items.map((item) => item.slug || item.id)).size,
    items.length,
    "Duplicate content IDs",
  );
for (const image of [
  site.hero.image,
  ...campaigns.map((item) => item.image),
  ...site.services.map((item) => item.image),
])
  assert.ok(
    existsSync(path.join(root, "public", image)),
    "Missing local asset: " + image,
  );
for (const item of site.services)
  assert.ok(
    campaigns.some((campaign) => campaign.slug === item.related),
    "A service references a missing concept",
  );
assert.ok(existsSync(path.join(root, "public/fonts/Figtree-variable.ttf")));
assert.ok(existsSync(path.join(root, "public/fonts/OFL.txt")));
const brief = {
  name: "Alex & Sam",
  email: "alex@example.com",
  company: "A+B / café",
  service: site.services[1].name,
  engagement: site.plans[0].name,
  budget: "£5,000–£10,000",
  message: "Launch in June.\nA longer story & a useful next move.",
};
const text = briefText(brief, site.brand);
for (const value of Object.values(brief))
  assert.ok(text.includes(value), "Brief loses a field: " + value);
const draft = emailDraft(site.email, brief, site.brand);
assert.equal(
  new URL(draft).searchParams.get("body"),
  text,
  "Email encoding changes the complete brief",
);
assert.equal(
  new URL(draft).searchParams.get("subject"),
  "A new project — " + brief.company,
);
console.log(
  "Verified unique content IDs, local assets, service links and complete brief encoding.",
);
