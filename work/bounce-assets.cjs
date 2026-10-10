// Turns the generated Bounce photographs (work/bounce-art/raw-*.jpg) into the template's WebP files.
const path = require("node:path");
const fs = require("node:fs");
const sharp = require("../next-templates/conduit/node_modules/sharp");
const art = path.join(__dirname, "bounce-art");
const dest = path.resolve(__dirname, "../next-templates/bounce/public/images");
fs.mkdirSync(dest, { recursive: true });
const photos = { "raw-0": "outcome-idea", "raw-1": "outcome-drums", "raw-2": "outcome-mix", "raw-3": "outcome-sound", "raw-4": "outcome-release", "raw-5": "teacher" };
// Avatar grid: 3 columns x 2 rows with thin gutters, 1024 x 768.
const cells = [["ama", 0, 0], ["kenji", 1, 0], ["ruth", 2, 0], ["arjun", 0, 1], ["valeria", 1, 1], ["karim", 2, 1]];
(async () => {
  for (const [raw, name] of Object.entries(photos)) {
    const file = path.join(dest, `${name}.webp`);
    await sharp(path.join(art, `${raw}.jpg`)).webp({ quality: 80, effort: 6 }).toFile(file);
    console.log(name, Math.round(fs.statSync(file).size / 1024) + "KB");
  }
  const xs = [0, 344, 688], ys = [0, 384];
  for (const [name, c, r] of cells) {
    const size = 300;
    const file = path.join(dest, `${name}.webp`);
    await sharp(path.join(art, "raw-6.jpg")).extract({ left: xs[c] + 18, top: ys[r] + 14, width: size, height: size }).resize(160, 160).webp({ quality: 82 }).toFile(file);
    console.log(name, Math.round(fs.statSync(file).size / 1024) + "KB");
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
