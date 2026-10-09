// Turns the generated Notch photographs (work/notch-art/raw-*.jpg) into the template's WebP files.
const path = require("node:path");
const fs = require("node:fs");
const sharp = require("../next-templates/conduit/node_modules/sharp");
const art = path.join(__dirname, "notch-art");
const dest = path.resolve(__dirname, "../next-templates/notch/public/images");
const photos = { "raw-0": "studio-review", "raw-1": "studio-plan", "raw-2": "studio-focus", "raw-3": "journal-notes", "raw-4": "journal-pricing", "raw-5": "journal-wall" };
// Portrait grid: 3 columns x 2 rows with thin gutters.
const cells = [["ananya", 0, 0], ["marcus", 1, 0], ["yuna", 2, 0], ["daniel", 0, 1], ["lucia", 1, 1], ["karim", 2, 1]];
(async () => {
  for (const [raw, name] of Object.entries(photos)) {
    const file = path.join(dest, `${name}.webp`);
    await sharp(path.join(art, `${raw}.jpg`)).webp({ quality: 80, effort: 6 }).toFile(file);
    console.log(name, Math.round(fs.statSync(file).size / 1024) + "KB");
  }
  const grid = path.join(art, "raw-6.jpg");
  const cw = 502, ch = 503, xs = [0, 517, 1034], ys = [0, 521];
  for (const [name, c, r] of cells) {
    const size = 440;
    const left = xs[c] + Math.round((cw - size) / 2);
    const top = ys[r] + 14;
    const file = path.join(dest, `${name}.webp`);
    await sharp(grid).extract({ left, top, width: size, height: size }).resize(192, 192).webp({ quality: 82 }).toFile(file);
    console.log(name, Math.round(fs.statSync(file).size / 1024) + "KB");
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
