import ts from "typescript";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.resolve(root, "out/example-validation");
if (!directory.startsWith(`${path.resolve(root, "out")}${path.sep}`))
  throw new Error("Invalid verification path.");
mkdirSync(directory, { recursive: true });
const files = [];
try {
  for (const name of ["signup", "pricing", "command"]) {
    const compiled = ts.transpileModule(
      readFileSync(path.join(root, `data/${name}.ts`), "utf8"),
      {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.CommonJS,
        },
      },
    );
    const context = { exports: {} };
    vm.runInNewContext(compiled.outputText, context);
    const example = context.exports[name];
    for (const [state, excerpts] of [
      ["before", example.removed],
      ["after", example.added],
    ]) {
      for (const excerpt of excerpts) {
        if (!example[state].includes(excerpt))
          throw new Error(
            `${name}: review excerpt does not match ${state} code.`,
          );
      }
    }
    for (const state of ["before", "after"]) {
      const file = path.join(directory, `${name}-${state}.tsx`);
      writeFileSync(file, example[state]);
      files.push(file);
    }
  }
  const program = ts.createProgram(files, {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
    types: ["react"],
  });
  const errors = ts.getPreEmitDiagnostics(program);
  if (errors.length) {
    console.error(
      ts.formatDiagnosticsWithColorAndContext(errors, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => root,
        getNewLine: () => "\n",
      }),
    );
    process.exitCode = 1;
  } else
    console.log(
      "All six before/after TSX exports pass strict TypeScript checking.",
    );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
