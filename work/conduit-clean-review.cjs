const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'tsconfig.json');
const oldConfig = fs.readFileSync(path.join(__dirname, 'conduit-root-tsconfig-before.json'), 'utf8');
const current = JSON.parse(fs.readFileSync(configPath, 'utf8'));
current.include = current.include.filter(entry => entry !== '.next-conduit-review/types/**/*.ts');
fs.writeFileSync(configPath, JSON.stringify(current) === JSON.stringify(JSON.parse(oldConfig)) ? oldConfig : JSON.stringify(current, null, 2) + '\n');
const envPath = path.join(root, 'next-env.d.ts');
const oldEnv = fs.readFileSync(path.join(__dirname, 'conduit-root-nextenv-before.txt'), 'utf8');
const currentEnv = fs.readFileSync(envPath, 'utf8');
if (currentEnv.includes('.next-conduit-review')) {
  const oldReference = oldEnv.split(/\r?\n/).find(line => line.includes('types/routes.d.ts'));
  fs.writeFileSync(envPath, currentEnv.replace(/^.*\.next-conduit-review.*$/m, oldReference || ''));
}
const details = path.join(root, 'src/data/template-details.ts');
fs.writeFileSync(details, fs.readFileSync(details, 'utf8').trimEnd() + '\n');
console.log('Removed only the Conduit review-generated TypeScript references.');
