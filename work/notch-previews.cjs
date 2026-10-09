// Captures the exported Notch demo (public/demos/notch) and writes the catalog previews.
// Serve /public on :3418 first (any static server), then: node work/notch-previews.cjs
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require(path.join(process.env.USERPROFILE, "AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core"));
const sharp = require("../next-templates/conduit/node_modules/sharp");
const root = path.resolve(__dirname, "..");
const url = "http://localhost:3418/demos/notch/index.html";

async function capture(browser, width, height, file) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: width < 500 ? 2 : 1, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  for (let y = 0; y < 14000; y += 700) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  const desktop = path.join(__dirname, "notch-desktop.png");
  const mobile = path.join(__dirname, "notch-mobile.png");
  await capture(browser, 1440, 900, desktop);
  await capture(browser, 390, 844, mobile);
  await browser.close();
  const d = await sharp(desktop).metadata();
  const tasks = [
    ["public/previews/card/notch.webp", sharp(desktop).extract({ left: 0, top: 0, width: d.width, height: Math.round(d.width / 1.6) }).resize(1280, 800).webp({ quality: 88 })],
    ["public/previews/card-full/notch.jpg", sharp(desktop).resize({ width: 1200 }).jpeg({ quality: 87 })],
    ["public/previews/full/notch.jpg", sharp(desktop).resize({ width: 1200 }).jpeg({ quality: 90 })],
    ["public/previews/mobile/notch.jpg", sharp(mobile).resize({ width: 390 }).jpeg({ quality: 88 })],
    ["public/og/notch.jpg", sharp(desktop).extract({ left: 0, top: 0, width: d.width, height: Math.round((d.width * 630) / 1200) }).resize(1200, 630).jpeg({ quality: 89 })],
    ["work/notch-preview.jpg", sharp(desktop).extract({ left: 0, top: 0, width: d.width, height: 930 }).resize({ width: 1100 }).jpeg({ quality: 90 })],
  ];
  for (const [file, pipeline] of tasks) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    await pipeline.toFile(target);
    console.log(file, Math.round(fs.statSync(target).size / 1024) + "KB");
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
