const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'tsconfig.json');
const envPath = path.join(root, 'next-env.d.ts');
const configBefore = fs.readFileSync(configPath);
const envBefore = fs.readFileSync(envPath);
const dist = 'build/relay-marketplace';
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: dist },
});
const configAfter = JSON.parse(fs.readFileSync(configPath, 'utf8'));
configAfter.include = configAfter.include.filter(entry => entry !== `${dist}/types/**/*.ts`);
const configBaseline = JSON.parse(configBefore.toString());
configAfter.include.sort();
configBaseline.include.sort();
if (JSON.stringify(configAfter) !== JSON.stringify(configBaseline)) {
  throw new Error('Concurrent tsconfig changes detected; keep them and inspect generated build references.');
}
fs.writeFileSync(configPath, configBefore);
const envAfter = fs.readFileSync(envPath, 'utf8').replace(`./${dist}/types/routes.d.ts`, './.next/types/routes.d.ts');
if (envAfter.replace(/\r\n/g, '\n') !== envBefore.toString().replace(/\r\n/g, '\n')) {
  throw new Error('Concurrent next-env changes detected; preserve them for review.');
}
fs.writeFileSync(envPath, envBefore);
process.exitCode = result.status ?? 1;
