const fs = require('node:fs');
const path = require('node:path');
function luminance(hex) {
  const channels = hex.replace('#', '').match(/../g).map(c => parseInt(c, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
const palettes = [
  { name: 'cloud', surfaces: ['#fbfcff', '#f3f6fc', '#ffffff'], text: ['#182137', '#58677e'], button: ['#ffffff', '#295cf1'] },
  { name: 'ink', surfaces: ['#121b2b', '#182437', '#202e43'], text: ['#edf2fb', '#b3bfd2'], button: ['#14213e', '#a9bfff'] },
];
let minimum = Infinity;
for (const p of palettes) for (const [fg,bg] of [...p.surfaces.flatMap(bg => p.text.map(fg => [fg,bg])), p.button, ['#e2e9ff', p.name === 'cloud' ? '#2456e7' : '#2443b3']]) {
  const values = [luminance(fg), luminance(bg)].sort((a,b)=>b-a);
  const ratio = (values[0] + .05) / (values[1] + .05);
  minimum = Math.min(minimum, ratio);
  if (ratio < 4.5) throw new Error(`${p.name} ${fg} on ${bg} has contrast ${ratio}`);
}
const source = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (!['node_modules', '.next', 'out'].includes(entry.name)) walk(file); }
    else if (/\.(tsx?|css)$/.test(entry.name)) source.push(file);
  }
}
walk('next-templates/relay');
const lines = source.reduce((n,file) => n + fs.readFileSync(file,'utf8').trimEnd().split(/\r?\n/).length, 0);
const detailPath = 'src/data/template-details.ts';
const detail = fs.readFileSync(detailPath, 'utf8');
const start = detail.indexOf('  relay: {');
if (start < 0) throw new Error('Relay detail entry missing.');
fs.writeFileSync(detailPath, detail.slice(0,start) + detail.slice(start).replace(/files: \d+,/, `files: ${source.length},`).replace(/lines: \d+,/, `lines: ${lines},`));
console.log(`Relay: ${source.length} TypeScript/CSS files, ${lines} lines. Minimum tested text contrast ${minimum.toFixed(2)}:1.`);
