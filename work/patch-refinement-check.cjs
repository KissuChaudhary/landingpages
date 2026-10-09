const fs = require('node:fs');
const path = require('node:path');
const ts = require('../node_modules/typescript');
const root = path.resolve(__dirname, '..');
const files = ['src/data/templates.ts', 'src/data/template-details.ts', 'src/templates/patch/index.tsx'];
const program = ts.createProgram(files.map(file => path.join(root, file)), {
  strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.Preserve, esModuleInterop: true, resolveJsonModule: true,
  baseUrl: root, paths: {'@/*': ['./src/*']}, lib: ['lib.dom.d.ts', 'lib.esnext.d.ts'],
});
const errors = ts.getPreEmitDiagnostics(program);
if (errors.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(errors, {
    getCanonicalFileName: name => name, getCurrentDirectory: () => root, getNewLine: () => '\n',
  }));
  process.exitCode = 1;
} else console.log('Patch catalog data and preview entry pass strict TypeScript checking.');
if (process.argv[2]) {
const source = fs.readFileSync(path.join(root, 'next-templates/patch/data/signup.ts'), 'utf8');
const output = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
const exampleModule = {exports: {}};
new Function('exports', 'module', output)(exampleModule.exports, exampleModule);
const downloaded = fs.readFileSync(process.argv[2], 'utf8');
if (downloaded !== exampleModule.exports.signup.after) throw new Error('Downloaded Signup differs from the source.');
console.log('Actual downloaded Signup.tsx matches the complete selected source exactly.');

}
