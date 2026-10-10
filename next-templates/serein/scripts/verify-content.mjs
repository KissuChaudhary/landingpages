import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function source(file, env = {}) {
  const output = ts.transpileModule(
    readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const context = { exports: {}, process: { env } };
  vm.runInNewContext(output, context);
  return context.exports;
}
const { site } = source("site.config.ts");
const { projects } = source("data/projects.ts");
const { articles } = source("data/journal.ts");
const { href, asset } = source("lib/urls.ts", {
  NEXT_PUBLIC_BASE_PATH: "/example",
  NEXT_PUBLIC_STATIC_EXPORT: "1",
});
assert.equal(href("/"), "/example/index.html");
assert.equal(href("/#work"), "/example/index.html#work");
assert.equal(
  href("/contact?service=Brand%20%26%20digital"),
  "/example/contact.html?service=Brand%20%26%20digital",
);
assert.equal(href("/work/vela"), "/example/work/vela.html");
assert.equal(
  href("https://example.com/book?q=a#time"),
  "https://example.com/book?q=a#time",
);
assert.equal(href("mailto:hello@example.com"), "mailto:hello@example.com");
assert.equal(href("//example.com/image.webp"), "//example.com/image.webp");
assert.equal(asset("/images/vela.webp"), "/example/images/vela.webp");
const live = source("lib/urls.ts");
assert.equal(
  live.href("/work/vela?view=full#story"),
  "/work/vela?view=full#story",
);
assert.equal(new Set(projects.map((item) => item.slug)).size, projects.length);
assert.equal(new Set(articles.map((item) => item.slug)).size, articles.length);
assert.equal(
  new Set(site.services.map((item) => item.id)).size,
  site.services.length,
);
assert.equal(
  new Set(site.plans.map((item) => item.id)).size,
  site.plans.length,
);
for (const project of projects) {
  assert(
    existsSync(new URL(`../public${project.image}`, import.meta.url)),
    `Missing ${project.image}`,
  );
  assert(
    project.challenge && project.approach && project.outcome && project.alt,
  );
}
assert(existsSync(new URL(`../public${site.visuals.silk}`, import.meta.url)));
for (const article of articles) assert(article.paragraphs.length >= 5);
for (const service of site.services)
  assert(
    existsSync(
      new URL(`../public/images/${service.image}.webp`, import.meta.url),
    ),
  );
const { briefText, emailDraft } = source("lib/contact.ts");
const brief = {
  name: "  Alex Morgan  ",
  email: "alex@example.com",
  company: "A & B / Studio",
  service: "Brand strategy & identity",
  engagement: "partner",
  budget: "£5,000–£10,000",
  message: "A first line.\nA second line with & + ? # and Unicode: café.",
};
const draft = emailDraft(site.email, brief);
const query = new URLSearchParams(draft.slice(draft.indexOf("?") + 1));
assert.equal(query.get("subject"), "A new project — A & B / Studio");
assert.equal(query.get("body"), briefText(brief));
assert(briefText(brief).includes("Name: Alex Morgan"));
assert(
  briefText(brief).includes("A second line with & + ? # and Unicode: café."),
);
assert(
  briefText({ ...brief, company: " " }).includes("Company: Not specified"),
);
const root = new URL("../", import.meta.url);
const sourceFiles = readdirSync(root, { recursive: true }).filter(
  (file) =>
    /\.(tsx?|css)$/.test(file) &&
    !/node_modules|\.next|out\//.test(file.replaceAll("\\", "/")),
);
for (const file of sourceFiles) {
  const text = readFileSync(new URL(file.replaceAll("\\", "/"), root), "utf8");
  assert(
    text.split("\n").length < (file.endsWith(".css") ? 600 : 300),
    `${file} should be split into focused files.`,
  );
  assert(
    !/role=["']dialog|<dialog\b/.test(text),
    `${file} contains a marketing dialog.`,
  );
}
console.log(
  "Verified standalone/static URLs, contact encoding, unique routes, complete case studies, local artwork and manageable source files.",
);
