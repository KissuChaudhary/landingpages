// Renders the Hairline mark into every icon the site needs. Run: node scripts/brand-icons.mjs
// Writes src/app/icon.svg, src/app/favicon.ico, src/app/apple-icon.png and public/web-app-manifest-{192,512}.png.
//
// The mark: four UI tiles fill a squircle, and the letter H exists only as the hairline seams between them. Two tall
// side tiles and a centre column split in two leave gaps that draw the H. `seam` is the gap; tiny sizes widen it.
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("../next-templates/turnout/node_modules/sharp");

const squircle =
  "M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z";

/** A rectangle with its own radius per corner: [top-left, top-right, bottom-right, bottom-left]. */
const rr = (x, y, w, h, [a, b, c, d]) =>
  `M${x + a} ${y}H${x + w - b}Q${x + w} ${y} ${x + w} ${y + b}V${y + h - c}Q${x + w} ${y + h} ${x + w - c} ${y + h}H${x + d}Q${x} ${y + h} ${x} ${y + h - d}V${y + a}Q${x} ${y} ${x + a} ${y}Z`;

/** The four tiles for a given seam width, inside a 64 grid. Outer corners follow the squircle; inner corners are
 * nearly square, so the seams between them read as straight hairlines. */
export function tiles(seam = 2) {
  const m = 7.5;
  const end = 64 - m;
  const mid = 14; // centre column width
  const cx0 = 32 - mid / 2;
  const cx1 = 32 + mid / 2;
  const o = 9; // outer radius
  const i = 1.2; // inner radius
  return [
    rr(m, m, cx0 - seam - m, end - m, [o, i, i, o]), // left
    rr(cx1 + seam, m, end - cx1 - seam, end - m, [i, o, o, i]), // right
    rr(cx0, m, mid, 32 - seam / 2 - m, [i, i, i, i]), // centre top
    rr(cx0, 32 + seam / 2, mid, end - 32 - seam / 2, [i, i, i, i]), // centre bottom
  ];
}

export const mark = ({ seam = 2, full = false } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b7cff"/><stop offset="1" stop-color="#1f3fbf"/></linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".45" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6e1ff"/></linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#9fb5f5" stop-opacity=".6"/></linearGradient>
  </defs>
  ${full ? '<rect width="64" height="64" fill="url(#bg)"/>' : `<path d="${squircle}" fill="url(#bg)"/><path d="${squircle}" transform="translate(32 32) scale(.975) translate(-32 -32)" fill="none" stroke="url(#rim)" stroke-width="1.4"/>`}
  ${tiles(seam)
    .map((d) => `<path d="${d}" fill="url(#tile)" stroke="url(#edge)" stroke-width=".5"/>`)
    .join("\n  ")}
</svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: Math.max(72, (size / 64) * 72 * 2) }).resize(size, size).png().toBuffer();

if (process.argv[1] && process.argv[1].endsWith("brand-icons.mjs")) {
  writeFileSync("src/app/icon.svg", mark({ seam: 2.6 }));
  writeFileSync("src/app/apple-icon.png", await png(mark({ seam: 2, full: true }), 180));
  writeFileSync("public/web-app-manifest-192x192.png", await png(mark({ seam: 2, full: true }), 192));
  writeFileSync("public/web-app-manifest-512x512.png", await png(mark({ seam: 1.6, full: true }), 512));
  writeFileSync("public/favicon.png", await png(mark({ seam: 3 }), 96));

  // favicon.ico: 16, 32 and 48px PNGs packed into one ICO; the seams widen so the H reads at 16px.
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map((s) => png(mark({ seam: s <= 16 ? 4.4 : s <= 32 ? 3.4 : 2.8 }), s)));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((s, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(s, e);
    header.writeUInt8(s, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(images[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += images[i].length;
  });
  writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...images]));
  console.log("icons written");
}
