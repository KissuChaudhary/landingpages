# What a buyer's zip contains

One zip per template, built by `node scripts/package-template.mjs <name>` (or `--all`) into `dist/templates/hairline-<name>.zip`. `dist/` is git-ignored. The script is the source of truth; this page explains the rules it enforces.

A buyer unzips one folder, runs `npm install` and `npm run dev`, and edits `site.config.ts`. Nothing in the folder should point back at us, at the marketplace, or at how we built it.

## What goes in

Every file git tracks under `next-templates/<name>/`, except the list below. Because only tracked files are packaged, `node_modules`, `.next`, `out`, `.env*` and `*.tsbuildinfo` can never end up in a zip.

| In the zip | Why |
| --- | --- |
| `app/`, `components/`, `lib/`, `data/`, `styles/`, `public/` | The template itself, including its optimised images and `icon.svg`. |
| `site.config.ts`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs` | Configuration the buyer edits. |
| `package.json`, `package-lock.json` | Reproducible install. `npm run build`, `typecheck` and `verify:content` (or `verify:examples`) are documented in the README and stay. |
| `README.md` | How to run, edit and deploy. |
| `ASSETS.md` | Where each image and font comes from, so the buyer can show provenance. |
| `LICENSE` or `LICENSE.md` | The commercial terms. Packaging fails without one. |
| `.gitignore` | The template's own, or a standard one added by the script, so a buyer's first commit doesn't include `node_modules`. |
| `scripts/verify-content.mjs` or `verify-examples.mjs` | Documented in the README as a check the buyer can run after editing content. |

## What stays out

| Left out | Why |
| --- | --- |
| `QA.md` | Our verification log. Mentions our browser tooling and the marketplace. |
| `DESIGN.md` | Our design brief. Includes notes on reference sites. |
| `scripts/export-demo.mjs` | Copies the build into this repository's `public/demos/`. Fails anywhere else. |
| `screenshots/` | Catalog captures. |
| `public/<name>-full-page.png` | Catalog screenshot on the older templates. Unused by the page, up to 10 MB. |

## What the script changes

- `package.json`: removes the `export:demo` script, since the file it runs isn't shipped.
- Adds a standard `.gitignore` when the template doesn't have one.
- Nothing else. Files are copied byte for byte, so the zip is exactly what we reviewed.

## What makes it refuse

The script stops, and writes no zip for that template, when:

- the template has uncommitted changes (pass `--allow-dirty` only for a trial run);
- a required file is missing (README, package files, config, a licence, `app/`);
- any shipped text file still mentions our internals: the marketplace, `export:demo`, `/demos/` paths, our `work/` folder, tool paths, `QA.md` or `DESIGN.md` (neither is shipped), our repository, or the name of a reference site.

The last rule is why template READMEs and `ASSETS.md` say nothing about the marketplace export. Maintainers run `npm run export:demo` from inside a template; that procedure lives in `CLAUDE.md` and isn't part of the buyer's README.

## Checking a zip as a buyer would

```bash
node scripts/package-template.mjs index --verify
```

`--verify` unzips into a temp folder, then runs `npm ci`, `npm run typecheck` and `npm run build` there. Run it for any template you changed before releasing it, and for a couple of others whenever the rules change. `--list` prints every file that goes in.

## When you add or change a template

1. Keep the template self-contained in `next-templates/<name>/` with a README and a licence.
2. Keep maintainer-only notes (marketplace export, QA results, design briefs, reference sites) in `QA.md` / `DESIGN.md`, not in the README or `ASSETS.md`.
3. Commit, then run the packager. A refusal names the file and what it mentions.
4. If a new kind of internal file shows up, add it to the `exclude` list in `scripts/package-template.mjs` and to the table above.
