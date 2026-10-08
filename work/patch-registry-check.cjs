const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const origin = process.argv[2] || 'http://localhost:3018';
const names = ['mention-menu', 'model-picker', 'clarifying-question', 'web-research', 'command-output', 'chat-scroll', 'message-edit'];
const expectedAnimations = { 'mention-menu': '@keyframes ui-chip-in', 'chat-scroll': '@keyframes ui-ping', 'web-research': '@keyframes ui-drop-in' };
async function verify() {
  const index = await (await fetch(`${origin}/r/registry.json`)).json();
  await Promise.all(names.map(async name => {
    const response = await fetch(`${origin}/r/${name}.json`);
    assert.equal(response.status, 200, name);
    const item = await response.json();
    assert.equal(item.name, name);
    assert.equal(item.files[0].content, fs.readFileSync(path.join(root, `src/ui-library/registry/${name}.tsx`), 'utf8'));
    assert.ok(index.items.some(entry => entry.name === name));
    const used = new Set(item.files[0].content.match(/ui-(?:shimmer|fade-up|fade-in|blink|draw|wave|bounce|breathe|scan|slide-from-right|slide-from-left|pop-in|chip-in|ping|drop-in)/g));
    for (const animation of used) assert.ok(item.css[`@keyframes ${animation}`], `${name}: missing ${animation}`);
    if (expectedAnimations[name]) assert.ok(item.css[expectedAnimations[name]], name);
    console.log(`${name}: installable source and animation CSS verified`);
  }));
  console.log(`${index.items.length} registry items; all seven new components pass.`);
}
verify().catch(error => { console.error(error); process.exitCode = 1; });
