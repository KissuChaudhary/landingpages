const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../next-templates/conduit');
const postcss = require(require.resolve('postcss', { paths: [path.join(root, 'node_modules/next')] }));
const source = postcss.parse(fs.readFileSync(path.join(root, 'styles/sections.css'), 'utf8'));
const groups = { 'problem-impact': postcss.root(), capabilities: postcss.root(), 'industries-stories': postcss.root(), 'security-faq': postcss.root() };
function group(selector) {
  if (/\.(problem|impact|reveal-statement)/.test(selector)) return 'problem-impact';
  if (/\.(cap|data-|glass-layer|diagram-|builder-diagram|orbit-|orchestration-|model-|router-|tool|task-|rail-)/.test(selector)) return 'capabilities';
  if (/\.(industr|stor|quote-mark)/.test(selector)) return 'industries-stories';
  if (/\.(security|seal-code|faq)/.test(selector)) return 'security-faq';
  throw new Error(`Unassigned selector: ${selector}`);
}
source.nodes.forEach(node => {
  if (node.type === 'rule') groups[group(node.selector)].append(node.clone());
  else if (node.type === 'atrule') {
    const media = {};
    node.nodes.forEach(rule => { const name = group(rule.selector); media[name] ||= node.clone({ nodes: [] }); media[name].append(rule.clone()); });
    Object.entries(media).forEach(([name, value]) => groups[name].append(value));
  }
});
for (const [name, tree] of Object.entries(groups)) fs.writeFileSync(path.join(root, `styles/${name}.css`), tree.toString());
const globals = path.join(root, 'app/globals.css');
fs.writeFileSync(globals, fs.readFileSync(globals, 'utf8').replace("@import '../styles/sections.css';", Object.keys(groups).map(name => `@import '../styles/${name}.css';`).join('\n')));
fs.unlinkSync(path.join(root, 'styles/sections.css'));
console.log('Section styles split into four focused files.');
