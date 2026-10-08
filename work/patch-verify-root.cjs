const ts = require('../node_modules/typescript');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const names = ['src/data/templates.ts', 'src/data/template-details.ts', 'src/data/pricing.ts', 'src/templates/patch/index.tsx', 'src/app/demo/[slug]/page.tsx', 'src/app/template/[slug]/page.tsx', 'src/app/ui/page.tsx', 'src/app/ui/[slug]/page.tsx', 'src/app/r/[name]/route.ts', 'src/ui-library/demos/index.ts'];
const program = ts.createProgram(names.map(name => path.join(root, name)), {
  strict:true, noEmit:true, skipLibCheck:true, target:ts.ScriptTarget.ES2022,
  module:ts.ModuleKind.ESNext, moduleResolution:ts.ModuleResolutionKind.Bundler,
  jsx:ts.JsxEmit.Preserve, esModuleInterop:true, resolveJsonModule:true,
  baseUrl:root, paths:{'@/*':['./src/*']}, lib:['lib.dom.d.ts','lib.dom.iterable.d.ts','lib.esnext.d.ts'],
});
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {getCanonicalFileName:n=>n,getCurrentDirectory:()=>root,getNewLine:()=> '\n'}));
  process.exitCode=1;
} else console.log('Patch marketplace integration and the full UI library pass strict TypeScript checking.');
