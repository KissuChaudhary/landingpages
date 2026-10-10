// Renders the Hairline mark into every icon the site needs. Run: node scripts/brand-icons.mjs
// Writes src/app/icon.svg, src/app/favicon.ico, src/app/apple-icon.png and public/web-app-manifest-{192,512}.png.
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("../next-templates/turnout/node_modules/sharp");

const squircle =
  "M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z";

/** The mark. `bar` is the crossbar's thickness; `full` paints a full square (for iOS, which masks it itself). */
const mark = ({ bar = 2.6, full = false } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a7bff"/><stop offset="1" stop-color="#2343c4"/></linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".14"/></linearGradient>
    <linearGradient id="stem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dce5ff"/></linearGradient>
  </defs>
  ${full ? '<rect width="64" height="64" fill="url(#bg)"/>' : `<path d="${squircle}" fill="url(#bg)"/><path d="${squircle}" transform="translate(32 32) scale(.975) translate(-32 -32)" fill="none" stroke="url(#rim)" stroke-width="1.5"/>`}
  <rect x="16" y="15" width="10" height="34" rx="5" fill="url(#stem)"/>
  <rect x="38" y="15" width="10" height="34" rx="5" fill="url(#stem)"/>
  <rect x="25" y="${32 - bar / 2}" width="14" height="${bar}" rx="${bar / 2}" fill="#fff"/>
</svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: Math.max(72, (size / 64) * 72 * 2) }).resize(size, size).png().toBuffer();

// The browser tab gets a thicker crossbar so the hairline survives at 16px.
writeFileSync("src/app/icon.svg", mark({ bar: 3.2 }));
writeFileSync("src/app/apple-icon.png", await png(mark({ bar: 3, full: true }), 180));
writeFileSync("public/web-app-manifest-192x192.png", await png(mark({ bar: 3, full: true }), 192));
writeFileSync("public/web-app-manifest-512x512.png", await png(mark({ bar: 2.6, full: true }), 512));
writeFileSync("public/favicon.png", await png(mark({ bar: 4 }), 96));

// favicon.ico: 16, 32 and 48px PNGs packed into one ICO.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(mark({ bar: s <= 16 ? 5 : 4 }), s)));
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
