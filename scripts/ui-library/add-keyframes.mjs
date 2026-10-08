// Adds a keyframes rule to both places it has to live:
//   UI_CSS in src/ui-library/registry.ts  (the shadcn CLI writes it into the user's stylesheet)
//   src/app/globals.css                   (so this site's previews can use it)
//
//   node scripts/ui-library/add-keyframes.mjs ui-chip-in "opacity: 0.35; transform: scale(0.9);" "opacity: 1; transform: none;"
//
// Then list '@keyframes <name>' in the component's items entry (css: [...]) so the CLI ships it.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [name, from, to] = process.argv.slice(2);
if (!name?.startsWith('ui-') || !from || !to) {
  console.error('Usage: node scripts/ui-library/add-keyframes.mjs ui-<name> "<from declarations>" "<to declarations>"');
  process.exit(1);
}

// globals.css: after the last ui- keyframes block.
const globals = path.join(process.cwd(), 'src', 'app', 'globals.css');
let css = readFileSync(globals, 'utf8');
if (!css.includes(`@keyframes ${name} {`)) {
  const blocks = [...css.matchAll(/@keyframes ui-[a-z-]+ \{[\s\S]*?\n\}\n/g)];
  const at = blocks.length ? blocks[blocks.length - 1].index + blocks[blocks.length - 1][0].length : css.length;
  css = `${css.slice(0, at)}@keyframes ${name} {\n  from { ${from.trim()} }\n  to { ${to.trim()} }\n}\n${css.slice(at)}`;
  writeFileSync(globals, css);
}

// registry.ts: before the '@layer base' entry of UI_CSS.
const registry = path.join(process.cwd(), 'src', 'ui-library', 'registry.ts');
let ts = readFileSync(registry, 'utf8');
const toObject = (decls) =>
  '{ ' +
  decls
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const i = d.indexOf(':');
      const key = d.slice(0, i).trim();
      const value = d.slice(i + 1).trim();
      return `${key.includes('-') ? `'${key}'` : key}: '${value}'`;
    })
    .join(', ') +
  ' }';
if (!ts.includes(`'@keyframes ${name}'`)) {
  const anchor = "  '@layer base': {";
  const at = ts.indexOf(anchor);
  if (at < 0) throw new Error("Couldn't find '@layer base' in UI_CSS");
  ts = `${ts.slice(0, at)}  '@keyframes ${name}': {\n    from: ${toObject(from)},\n    to: ${toObject(to)},\n  },\n${ts.slice(at)}`;
  writeFileSync(registry, ts);
}

console.log(`ok ${name}`);
