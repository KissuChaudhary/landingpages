// Catalog previews for Inlay from the exported demo (serve public/ on :3481 first).
// Writes next-templates/inlay/screenshots/*, public/previews/* and public/og/inlay.jpg.
// Run from the repository root: node work/inlay-previews.cjs
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require(path.join(process.env.USERPROFILE, "AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core"));
const sharp = require("../next-templates/turnout/node_modules/sharp");
const root = path.resolve(__dirname, "..");
const url = "http://localhost:3481/demos/inlay/index.html";
const shots = path.join(root, "next-templates/inlay/screenshots");
fs.mkdirSync(shots, { recursive: true });

async function capture(browser, { width, height, reduced, full, mobile, file, wait = 2200 }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: mobile ? 2 : 1, isMobile: !!mobile, hasTouch: !!mobile, reducedMotion: reduced ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  if (full) {
    // Let lazy images load, then return to the top.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 700) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.waitForTimeout(wait);
  await page.screenshot({ path: file, fullPage: !!full, type: "jpeg", quality: 92 });
  await ctx.close();
}

async function main() {
  const browser = await chromium.launch();
  const hero = path.join(shots, "hero.jpg");
  const desktop = path.join(shots, "desktop.jpg");
  const mobile = path.join(shots, "mobile.jpg");
  await capture(browser, { width: 1440, height: 900, file: hero, wait: 2600 });
  await capture(browser, { width: 1440, height: 900, reduced: true, full: true, file: desktop });
  await capture(browser, { width: 390, height: 844, reduced: true, full: true, mobile: true, file: mobile });
  await browser.close();

  const d = await sharp(desktop).metadata();
  const m = await sharp(mobile).metadata();
  // The full-page desktop capture starts with the motion hero (tiles scattered), then the rest.
  const heroBuf = await sharp(hero).toBuffer();
  const rest = await sharp(desktop).extract({ left: 0, top: 900, width: d.width, height: d.height - 900 }).toBuffer();
  const stitched = path.join(shots, "desktop-stitched.jpg");
  await sharp({ create: { width: d.width, height: d.height, channels: 3, background: "#ffffff" } })
    .composite([{ input: heroBuf, left: 0, top: 0 }, { input: rest, left: 0, top: 900 }])
    .jpeg({ quality: 90 })
    .toFile(stitched);

  const outputs = [
    ["public/previews/card/inlay.webp", sharp(hero).extract({ left: 0, top: 0, width: 1440, height: 900 }).resize(1280, 800).webp({ quality: 88 })],
    ["public/previews/card-full/inlay.jpg", sharp(stitched).resize({ width: 1200 }).jpeg({ quality: 86 })],
    ["public/previews/full/inlay.jpg", sharp(stitched).resize({ width: 1200 }).jpeg({ quality: 88 })],
    ["public/previews/mobile/inlay.jpg", sharp(mobile).resize({ width: 390 }).jpeg({ quality: 88 })],
    ["public/og/inlay.jpg", sharp(hero).extract({ left: 0, top: 70, width: 1440, height: 756 }).resize(1200, 630).jpeg({ quality: 88 })],
    ["next-templates/inlay/public/images/og.jpg", sharp(hero).extract({ left: 0, top: 70, width: 1440, height: 756 }).resize(1200, 630).jpeg({ quality: 84 })],
    ["next-templates/inlay/screenshots/preview.jpg", sharp(hero).resize({ width: 1100 }).jpeg({ quality: 90 })],
  ];
  for (const [file, pipeline] of outputs) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    await pipeline.toFile(target);
  }
  console.log({ desktop: `${d.width}×${d.height}`, mobile: `${m.width}×${m.height}`, previews: outputs.length });
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
