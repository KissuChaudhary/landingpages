// Renders the Notch product screens (screens.cjs) to transparent PNGs, then WebP for the template.
// Usage: node work/notch-shots/render.cjs [name ...]
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require(path.join(process.env.USERPROFILE, "AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core"));
const sharp = require("../../next-templates/conduit/node_modules/sharp");
const { css, screens } = require("./screens.cjs");

const kit = fs.readFileSync(path.join(__dirname, "kit.css"), "utf8");
const out = path.join(__dirname, "out");
const dest = path.resolve(__dirname, "../../next-templates/notch/public/images");
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(dest, { recursive: true });

const only = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  for (const s of screens) {
    if (only.length && !only.includes(s.name)) continue;
    const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=block" rel="stylesheet">
<style>${kit}${css[s.css]}</style></head><body><div id="root" style="display:inline-block">${s.html()}</div>
<script src="https://unpkg.com/lucide@0.475.0/dist/umd/lucide.min.js"></script><script>lucide.createIcons();</script></body></html>`;
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const png = path.join(out, `${s.name}.png`);
    await page.locator("#root").screenshot({ path: png, omitBackground: true });
    const meta = await sharp(png).metadata();
    const file = path.join(dest, `${s.name}.webp`);
    await sharp(png).webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(file);
    console.log(s.name, `${meta.width}x${meta.height}`, `${Math.round(fs.statSync(file).size / 1024)}KB`);
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
