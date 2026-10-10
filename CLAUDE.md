# Hairline UI

One brand, one site (`hairlineui.com` via `NEXT_PUBLIC_SITE_URL`, formerly FounderDada): paid Next.js landing page templates ($39 each, $99 all-access) and a free component library at `/ui`, installable from our own shadcn registry (`/r/<name>.json`, namespace `hairline`). Next.js 15 App Router, React 19, Tailwind CSS v4, pnpm. Hosted on Cloudflare Workers through OpenNext (`wrangler.jsonc`, `open-next.config.ts`, Worker `hairline-ui`); Vercel also still deploys `main` until it's disconnected.

**Before building or changing anything in `src/ui-library/`, read [docs/ui-library-playbook.md](docs/ui-library-playbook.md) in full.** It holds the design and motion standard, the code standard, the workflow, where the library stands and the next job.

## Rules that always apply

- **Templates (`next-templates/`) are landing pages, not apps:** no popups or modals for marketing interactions (links go somewhere, demos run in place; mobile nav menus and app-UI confirmations inside a product demo are fine). Keep page and scroll animations intact without global motion play/pause controls in templates. Respect system reduced motion; product playback controls may remain. Maintainer notes (marketplace export, QA, design briefs, reference sites) go in `QA.md` / `DESIGN.md`, never in a template's README or `ASSETS.md`: those ship to buyers, and `scripts/package-template.mjs` refuses internal mentions.

- **Hairline only:** 1px borders (`border-border`) or a 1px ring on animating surfaces. No drop shadows, no glow, no backdrop blur in library components. shadcn theme tokens only; red/emerald/amber only for status.
- **The motion bar:** every text, icon, number or size change morphs. Labels through `TextMorph`, numbers through `NumberRoll`, actions in the `StatusButton` style, one surface that changes shape instead of popping new ones. No animation library; reduced motion respected.
- Never the default cream/serif/orange "AI" look.
- Commit and push only when the owner asks. Other sessions work in this repo at the same time: stage your own paths explicitly and never commit files you didn't change.
- After a production build, run `git restore next-env.d.ts tsconfig.json`.

## Commands

```bash
npx tsc --noEmit -p . 2>&1 | grep -v -E "next-templates|nousu-saas"   # typecheck (must print nothing)
NEXT_DIST_DIR=.next-verify npx next build                              # production build
node scripts/ui-library/register.mjs                                   # regenerate the /ui component indexes
node scripts/ui-library/add-keyframes.mjs ui-<name> "<from>" "<to>"    # add a keyframes rule to globals.css and UI_CSS
node scripts/package-template.mjs <name>|--all [--verify]              # build the buyer zip(s) into dist/templates, see docs/buyer-zip.md
```

Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.