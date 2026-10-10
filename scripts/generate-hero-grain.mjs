import { writeFileSync } from 'node:fs';

// Fixed seed and irregular spacing keep the print-like grain stable, without an ordered pixel matrix.
let seed = 9137;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}

const marks = ['', '', ''];
const fixed = (n) => n.toFixed(2);
for (let y = 1; y < 319; y += 3.2) {
  for (let x = 1; x < 319; x += 3.2) {
    if (random() < 0.27) continue;
    const px = x + (random() - 0.5) * 2.8;
    const py = y + (random() - 0.5) * 2.8;
    const length = 0.4 + random() * 1.4;
    const angle = random() * Math.PI;
    const group = Math.floor(random() * marks.length);
    marks[group] += `M${fixed(px)} ${fixed(py)}l${fixed(Math.cos(angle) * length)} ${fixed(Math.sin(angle) * length)}`;
  }
}

const paths = marks.map((d, i) => `<path d="${d}" stroke-opacity="${[0.2, 0.34, 0.5][i]}"/>`).join('\n');
writeFileSync(new URL('../public/hero-grain.svg', import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" fill="none" stroke="#69717f" stroke-width="0.65" stroke-linecap="round">\n${paths}\n</svg>\n`);
