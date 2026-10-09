const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'tsconfig.json');
const baseline = fs.readFileSync(path.join(__dirname, 'daybreak-root-tsconfig-before.json'), 'utf8');
const current = JSON.parse(fs.readFileSync(configPath, 'utf8'));
current.include = current.include.filter(entry => entry !== '.next-daybreak-review/types/**/*.ts');
fs.writeFileSync(configPath, JSON.stringify(current) === JSON.stringify(JSON.parse(baseline)) ? baseline : JSON.stringify(current, null, 2) + '\n');
const envPath = path.join(root, 'next-env.d.ts');
const oldEnv = fs.readFileSync(path.join(__dirname, 'daybreak-root-nextenv-before.txt'), 'utf8');
const env = fs.readFileSync(envPath, 'utf8');
if (env.includes('.next-daybreak-review')) {
  const reference = oldEnv.split(/\r?\n/).find(line => line.includes('types/routes.d.ts'));
  fs.writeFileSync(envPath, env.replace(/^.*\.next-daybreak-review.*$/m, reference || ''));
}
console.log('Removed only Daybreak review-generated TypeScript references.');
