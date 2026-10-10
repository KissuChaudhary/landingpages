// Renders the shots in shots.cjs (and ui.cjs when present) at 2x and writes WebP into
// next-templates/inlay/public/images. Usage: node work/inlay-shots/render.cjs [name-filter]
const path = require("path");
const fs = require("fs");
const { chromium } = require(path.join(process.env.USERPROFILE, "AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core"));
const sharp = require(path.join(__dirname, "../../next-templates/turnout/node_modules/sharp"));

const here = __dirname;
const outRaw = path.join(here, "out");
const outWeb = path.join(here, "../../next-templates/inlay/public/images");
fs.mkdirSync(outRaw, { recursive: true });
fs.mkdirSync(outWeb, { recursive: true });

const kit = fs.readFileSync(path.join(here, "kit.css"), "utf8");
const fonts =
  "https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&family=Anybody:wdth,wght@50..150,100..900&display=block";

const sets = ["shots.cjs", "ui.cjs", "pages.cjs"].filter((f) => fs.existsSync(path.join(here, f)));
const all = {};
for (const f of sets) {
  delete require.cache[require.resolve(path.join(here, f))];
  const mod = require(path.join(here, f));
  Object.assign(all, mod.tiles || {}, mod.shots || {});
}

const filter = process.argv[2];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const [name, shot] of Object.entries(all)) {
    if (filter && !name.includes(filter)) continue;
    const doc = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fonts}"><style>${kit}</style></head><body>${shot.html}</body></html>`;
    await page.setContent(doc, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(120);
    const el = await page.$(".shot");
    const png = path.join(outRaw, `${name}.png`);
    await el.screenshot({ path: png, omitBackground: !!shot.transparent });
    const webp = path.join(outWeb, `${name}.webp`);
    await sharp(png).webp({ quality: shot.quality || 84, effort: 6, alphaQuality: 90 }).toFile(webp);
    const meta = await sharp(webp).metadata();
    console.log(name.padEnd(22), `${meta.width}x${meta.height}`, `${Math.round(fs.statSync(webp).size / 1024)}KB`);
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
