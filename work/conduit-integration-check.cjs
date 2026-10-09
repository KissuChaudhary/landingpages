const path = require('node:path');
const ts = require('../node_modules/typescript');
const root = path.resolve(__dirname, '..');
const files = ['src/data/templates.ts', 'src/data/template-details.ts', 'src/data/pricing.ts', 'src/templates/conduit/index.tsx'];
const program = ts.createProgram(files.map(file => path.join(root, file)), {
  strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.Preserve, esModuleInterop: true, resolveJsonModule: true,
  baseUrl: root, paths: {'@/*': ['./src/*']}, lib: ['lib.dom.d.ts', 'lib.esnext.d.ts'],
});
const errors = ts.getPreEmitDiagnostics(program);
if (errors.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(errors, { getCanonicalFileName: name => name, getCurrentDirectory: () => root, getNewLine: () => '\n' }));
  process.exitCode = 1;
} else console.log('Conduit catalog, detail, checkout and preview entry pass strict TypeScript checking.');
