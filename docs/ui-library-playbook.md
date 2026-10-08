# Hairline UI component playbook

The brief for anyone (human or AI session) building components in this repo. It records what we are building, why, the exact design and motion standard the owner signed off on, how a component is put together, how to verify and ship it, where the library stands, and what to do next. **Read it fully before writing a component.** The bar is high and specific; generic "nice" components get rejected.

---

## 1. What we're building

**Hairline UI** is one brand, one site (`hairlineui.com`, set via `NEXT_PUBLIC_SITE_URL`; formerly FounderDada):

- **Paid:** premium Next.js + Tailwind landing page templates, $39 each or $99 all-access (`src/data/templates.ts`, `src/data/pricing.ts`, pages under `src/app/template/[slug]`).
- **Free:** a component library at `/ui`, installable with the shadcn CLI from our own registry (`/r/<name>.json`, index `/r/registry.json`, namespace `hairline`).

Never split templates and components into separate brands or domains. `SITE_NAME` in `src/data/site.ts` is the one name.

### Strategy (why the library exists and how it wins)

- The library is the funnel: it attracts founders and developers, proves the craft, and sells the templates. *Free components, paid templates, same hands.*
- We **do not** compete on breadth. assistant-ui has 150+ chat elements, a runtime and 12k stars; Vercel ships AI Elements officially. A smaller copy of them loses.
- We win on **interaction craft**: components where every change of state is a moment people stop and share ("how did they do that?"). Small builders show these off on X; that is the distribution.
- Positioning line: **"Hairline UI: the interaction layer of products that look expensive."** `/ui` headline: *"Interactions that make it / feel expensive."*
- The library is **one list** (no category groups): landing interactions first, then the product/AI UI pieces. Do not reintroduce "AI groups"; it made us look like a half-built agentic library.
- Our real technical differentiators: one file per component, plain props, no runtime/provider to adopt, no animation library, every state designed.

---

## 2. Working with the owner (Harvansh)

- Solo builder with a day job; casual, direct, fast. Taste feedback comes bluntly ("pathetic", "noob work"): treat it as signal, fix the root cause, don't argue or over-explain.
- **Judged by feel, on the deployed site.** "To take a look in browser you will have to deploy." Push to `main` = Vercel deploys. Push in sensible batches so the owner can review live.
- Commit/push only when asked (usually "Push" / "deploy"); once the owner has said "let's do this, build them all", pushing finished batches for review is expected.
- Give honest strategic opinions when asked (e.g. assistant-ui comparison), with a clear recommendation, not a survey.
- Other sessions work in this repo in parallel (new templates like `next-templates/relay/`, `work/`, `.codex-remote-attachments/`). **Never commit files you didn't change.** Stage paths explicitly.

---

## 3. The design standard: "hairline"

Signed off explicitly; violations were called "filthy":

- **Hairlines only.** Surfaces are separated by a 1px line: `border border-border`, or `shadow-[0_0_0_1px_var(--border)]` / `shadow-[inset_0_0_0_1px_var(--border)]` on surfaces whose size animates (a ring doesn't change layout). **No offset/soft drop shadows, no glow, no backdrop blur** in library components.
- **Theme tokens only** (shadcn): `background`, `foreground`, `muted`, `muted-foreground`, `accent`, `border`, `popover`, `primary`, `primary-foreground`, `ring`. Status colours only for status: red (error), emerald (success), amber (warning), always with a text/shape signal too.
- The main action is `bg-primary text-primary-foreground` (this site's primary is blue `#305dde`; foreground is grey `#454545`, so never use `bg-foreground` for main buttons).
- Calm, restrained, typographic. Sizes we use: labels 12–13.5px, body 13.5–14px, figures 40–64px with `tracking-[-0.03em…-0.04em]`, `tabular-nums` for numbers, `font-mono` only for code/kbd/counters.
- Concentric geometry: e.g. a 36px pill with 28px controls inset 4px; rounded-full pills, `rounded-[14px]`–`rounded-[22px]` panels.
- **Floating surfaces never cover the thing they belong to.** Dropdowns from a composer open *clear of the composer* (an `anchorRef` prop), lined up with its edge, and fit narrow screens (`collisionPadding`, shrink/shift to viewport).
- The model pill sits on the right beside Send (`align="end"`), stays visible (pressed, chevron up) while its panel is open.
- Never the "Claude default" look (cream/serif/orange). The site keeps: blue primary, frosted pill navbar, Geist font. The frosted navbar is the *site's* brand, not a library pattern.

---

## 4. The motion standard (the benchmark)

The owner's words after seeing it live: **"this is the level I want in each interaction of any component… even a save button."**

### The benchmark components (study these files first)
- `number-roll.tsx`: odometer digits that roll **in the direction the number moved** (a 9 going up rolls on to 0, never back), places slide open/fold away, re-centres silently after each roll.
- `pricing-toggle.tsx`: thumb thrown with a slight overshoot, labels trade colour, badge fills, every price rolls, the billing note slides in **from the side the toggle moved**.
- `text-morph.tsx`: letters two labels share stay alive and glide to new places; new letters rise out of a 4px blur, staggered; leaving letters lift away; the width eases so the container (button/pill) resizes in the same motion; unrelated words crossfade whole.
- `status-button.tsx`: Save → Saving → Saved → Try again in one motion (icon slot opens, spinner blurs into a self-drawing check, error shakes).
- `model-picker.tsx`, `selection-actions.tsx`, `announcement-pill.tsx`: **one surface that changes shape** (pill grows into panel: size + radius animate, the label cross-fades into the content, folds back on close).

### Principles
1. **Never a hard swap.** Every text, icon, size or position change morphs. Labels change through `TextMorph`; numbers through `NumberRoll`; icons cross-fade with scale (0.6→1) + blur (3px→0); checks draw themselves (`pathLength={1}` + `strokeDashoffset` 1→0).
2. **One surface changes shape.** Don't pop a new panel; grow the existing pill/row/button into it.
3. **Motion has direction and meaning.** Content enters from the side you moved toward and leaves the other way; numbers roll the way they changed; things that are "thrown" overshoot slightly, things that "settle" ease out.
4. **Sizes animate from measured numbers**, never `auto`: measure with `offsetWidth/Height` + `ResizeObserver`, transition px values (or `grid-template-rows: 0fr → 1fr` for open/close heights).
5. **Nothing moves while invisible**: spinners spin only while pending; timers are CSS animations with `animation-play-state` (no re-render loop); clean up every timer/rAF.
6. **Reduced motion respected everywhere**: no slides/rolls/shakes; state changes in place.
7. **No animation library.** CSS transitions, CSS keyframes, the Web Animations API (`el.animate`) for FLIP/one-offs, rAF only for tweens like playbackRate.

### The numbers we use
| Use | Value |
| --- | --- |
| Settle / morph easing | `cubic-bezier(0.16,1,0.3,1)` (and `0.23,1,0.32,1` for UI slides) |
| "Thrown" (thumbs, indicators) | `cubic-bezier(0.34,1.36,0.64,1)` on transform; width without overshoot |
| Glide between anchors | `cubic-bezier(0.77,0,0.175,1)` |
| Morph durations | 380–560ms (surfaces, heights, widths); digit roll 900–1200ms |
| Fades | out 100–200ms (fast), in 240–420ms with 60–140ms delay |
| Stagger | letters 16ms (cap 160ms); stats 140ms |
| Blur on content swap | 4–8px |
| Enter offset | 0.35em for letters, 6–32px for panels |
| Shake | ±4–5px, 380ms, ease-out |

### Techniques (reuse, don't reinvent)
- **Label change:** `<TextMorph>{label}</TextMorph>` (import `./text-morph`, add `registryDependencies: ['text-morph']`).
- **Any number:** `<NumberRoll value={n} format={…} />` (`registryDependencies: ['number-roll']`). Counters, prices, timers, "2 / 3", percentages, "3 to review".
- **Sliding indicator** (tabs/toggles/highlights): measure the active element's `offsetLeft/offsetWidth`, translateX + width; first placement without transition (`ready` flag), then transitions.
- **Content swap with direction:** keep a `leaving` list rendered absolutely; animate leaving out (`translateX(-dir*N)`, blur, opacity) and the new one in from `+dir*N`; container height eases to the new content's measured height. See `feature-tabs.tsx`, `morphing-nav.tsx`, `testimonials.tsx`.
- **Pill → panel morph:** phases `closed | opening | open | closing`; render the surface at the pill's measured size on "opening", next double-rAF switch to "open" so width/height/radius transition; a copy of the pill's label fades out as it grows; on close, reverse and unmount after the duration. Keep any chevron in the copy rotating in step so the hand-off back to the real pill never flips.
- **Draw-in lines:** `scaleY(0)→none` or `stroke-dashoffset`, origin-center.
- **Timer that pauses:** CSS keyframes (`ui-progress`, `ui-ring-fill`, `ui-drain`) with `animationPlayState`, `onAnimationEnd` to advance.
- **Actions:** use `StatusButton` itself (`variant="ghost" | "outline" | "primary"`, `size="sm"` for 28px toolbars) for anything with pending/success/error (code block Copy/Apply, chat notice Retry).
- **Icon swap:** stack every icon in absolute layers and drive each with the shared `swap(on, reduced)` style (opacity, scale 0.6, blur 3px); checks are a `pathLength={1}` path that draws only when it becomes visible.
- **Inline piece that comes and goes** ("· 3", "exit 1", a chevron, Retry): a `Reveal` = `grid` with `grid-template-columns: 0fr ↔ 1fr` + opacity/blur, inner `min-w-0` clipped with `[clip-path:inset(-4px_-2px)]` (keeps the baseline). Put the gap inside it (`pl-…`), not on the parent, or an empty piece leaves a gap.
- **Block that comes and goes:** `grid-template-rows: 0fr ↔ 1fr`; keep the last children in state so it doesn't empty while closing.
- **Sweep of light on a morphing label:** `SHEEN` (a moving `mask-image`, keyframe `ui-sheen`), never `bg-clip-text`: the clip can't see TextMorph's inline-block letters and the label goes invisible.
- **Timers:** re-render once per whole second (setTimeout aligned to the second), `NumberRoll direction="up"` for elapsed time, `direction="down"` for countdowns (00 → 59 rolls back like a clock); tenths only once settled ("Done in 12.4s").
- **One surface, many states** (approval card, clarifying question, task progress, voice input, chat-history rows): keep the element, layer or fold the states inside it, and move focus to the card or the control that took the pressed button's place.

---

## 5. The code standard

- One file per component: `src/ui-library/registry/<name>.tsx`, `"use client"`, a header comment block listing the states (house style), named export(s), exported prop types.
- React 19 (`ref` as a prop, `inert` attribute), Tailwind v4, lucide-react is the only allowed external dependency (prefer inline SVG for tiny glyphs).
- Plain props, controlled **or** uncontrolled (`value`/`defaultValue`/`onValueChange`). Async actions take a function returning a promise; the component owns pending/success/error UI (e.g. `onSubmit`, `onAction`, `onApply`).
- Accessibility is part of "done": real roles (radiogroup/tablist/listbox/combobox/disclosure/dialog/log/meter), keyboard (arrows, Home/End, Enter/Space, Escape returns focus), `aria-live` regions **outside** buttons and **never** on a ticking timer, the real text in `sr-only` when visuals are split into glyphs/digits, focus rings via `focus-visible` only (and hide them after mouse use if focus is moved programmatically).
- The shared reduced-motion hook (copy into each file):
  ```ts
  const reducedQuery = "(prefers-reduced-motion: reduce)";
  const subscribeReduced = (onChange: () => void) => {
    const query = window.matchMedia(reducedQuery);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  };
  const useReducedMotion = () =>
    React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);
  ```
- Long single-line class strings are house style (~160 cols). If you run Prettier, use `--print-width 160`.

### Bugs we already paid for (don't repeat)
- **Render loops:** measurement setters must bail when nothing changed: `setX(p => p.a === a && p.b === b ? p : {a, b})`. Default array props must be module constants (`efforts = EFFORTS`), not inline literals in the signature.
- **Animation class added after mount replays on every element**: decide "is this new?" once in `useState(() => mountedRef.current)`.
- **CSS animation `fill: both` overrides later inline styles**: use `backwards` for entrances you later fade with transitions.
- **Flex children shrink and wrap inside a fold**: give measured inner rows `w-max shrink-0 whitespace-nowrap`.
- **`overflow:hidden` moves the inline baseline**: clip with `[clip-path:inset(0)]` when baseline alignment matters.
- **Tailwind `calc()` needs spaces**: `calc(100%_-_4.5rem)`, not `calc(100%-4.5rem)`.
- **Upward scroll detection**: only treat scroll-up as the user's if they recently used wheel/touch/keys/scrollbar (content shrink clamps `scrollTop` too).
- **Clamp tweened rates** (`playbackRate` ≥ 0) so loops never run backwards.
- **Disabled buttons don't show tooltips**: use `aria-disabled` when you need to explain why.
- **StrictMode runs state updaters twice**: never mutate counters inside `setState(updater)`.
- **`background-clip: text` misses TextMorph letters** (inline-blocks): use the `SHEEN` mask instead.
- **TextMorph wrapped mid-morph** while its width eased: fixed in TextMorph (it holds one line during the resize). Still pass `animateWidth={false}` for real paragraphs.
- **NumberRoll fed faster than its roll** (a progress percent) never re-centred and ran off its strip: fixed (it rebases mid-roll by whole sets).
- **Live regions on ticking things**: a countdown inside a `role="status"` notice re-announced every second. Hide the digits (`aria-hidden`) and announce steps or the end time instead.
- **Hidden text in a zero-width column** wraps into a tall stack and stretches its row: fold such blocks by height, not width.
- **A countdown that starts from `resetAt` on the server** reads as "reset" on first paint: keep `now` null until mounted.
- **FLIP from positions recorded at the last render** goes stale while something else animates; snapshot positions right before the change (the click, the keystroke) and use them once.

---

## 6. Anatomy of a component (4 files + 1 command)

1. **`src/ui-library/registry/<name>.tsx`**: the component (above).
2. **`src/ui-library/items/<name>.ts`**: its docs entry, `export const <camelName>: UiItem = { … }`:
   - `name`, `title`, `description` (one line under the title), `summary` (paragraph: what's wrong with the usual version, then what ours does, told through its motion).
   - `file`, `dependencies` (npm), `registryDependencies` (other items, e.g. `['text-morph']`), `css` (keyframe keys it uses, e.g. `['@keyframes ui-fade-in']`).
   - `tabs` (preview tabs, usually states) / `tabsLabel`.
   - `states[]` (name + precise description with durations), `usage` (smallest snippet), `recipe` + `recipeTitle` + `recipeIntro` (a real integration: AI SDK for product UI, or "In a pricing section" for landing pieces), `props[]`, `notes[]` (accessibility & motion facts).
   - Write all copy in plain, concrete British-leaning English like the existing entries. No hype words, no em-dash-heavy prose; describe what moves and why.
3. **`src/ui-library/demos/<name>-demo.tsx`**: `export default function XDemo({ tab = '…' }: { tab?: string })`. Stand-in data/timers live **here only**, never in the component. Use the tab to show each state. Hairline styling, realistic copy (the running example is an ice-cream shop "Kept" / product "Relay" / fictional companies like Northwind, Fernhill).
4. **Keyframes** (if new): `node scripts/ui-library/add-keyframes.mjs ui-<name> "<from>" "<to>"` (writes UI_CSS in `src/ui-library/registry.ts` and `src/app/globals.css`), then list it in the item's `css`.
5. **Register**: add the name to `ORDER` in `scripts/ui-library/register.mjs`, run `node scripts/ui-library/register.mjs`.

The `/ui` index, `/ui/<name>` page (States, Usage, example, Props, Accessibility and motion, Requirements, Source, More) and `/r/<name>.json` registry item are generated from these. Registry dependencies install automatically with the CLI.

---

## 7. Verify and ship

1. **Typecheck:** `npx tsc --noEmit -p . 2>&1 | grep -v -E "next-templates|nousu-saas"` (those folders have unrelated errors). Must print nothing.
2. **Browser:** dev server on `http://localhost:3000` (check `preview_list`; it's usually already running). Open `/ui/<name>`. If :3000 belongs to another session (or serves 404 chunks), start `hairline-motion-dev` from `.claude/launch.json` (:3300, dist `.next-verify`; stop it before the production build). If the app's browser pane can't draw (screenshots time out), drive headless Chromium from the Playwright in the npx cache instead and sample DOM state.
   - The first request to a newly registered page can 404 (static params cache): reload once.
   - Previews mount lazily on scroll: scroll before querying the DOM.
   - The browser pane may be hidden: `requestAnimationFrame` and CSS transitions pause until a frame is drawn. Take a screenshot to force frames; verify behaviour by sampling DOM state (`getComputedStyle`, `getAnimations()`, element identity) rather than trusting mid-animation screenshots.
   - Test every state: mouse, keyboard path, narrow width (`resize_window` mobile), reduced motion where relevant. Reset to desktop afterwards.
3. **Production build:** `NEXT_DIST_DIR=.next-verify npx next build`, then `git restore next-env.d.ts tsconfig.json` (the build rewrites them).
4. **Commit** only your paths (`git add src/ui-library src/app/globals.css …`), message: a short title, a blank line, bullets describing what moves, then `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Push to `main` when asked → Vercel deploys (check `gh api repos/KissuChaudhary/landingpages/commits/<sha>/status`).

---

## 8. Where the library stands (39 components, in /ui order)

**Landing interactions (built to the benchmark):** text-morph, status-button, number-roll, pricing-toggle, waitlist-field, morphing-nav, feature-tabs, stats-band, announcement-pill, testimonials, faq-accordion, logo-marquee.

**Product / AI UI (brought up to the benchmark in the motion pass, 2026-10-08):**
- Asking: prompt-composer, mention-menu, attachment-chip, mode-switcher, model-picker, voice-input
- While it works: thinking-indicator, thinking-trace, tool-call, clarifying-question, approval-card, plan, web-research, command-output, task-progress
- The answer and after: streaming-answer, code-block, citation, response-versions, selection-actions, diff-review, action-receipt, chat-notice, usage-meter
- Around the chat: chat-scroll, message-edit, chat-history

All are hairline-only, and every label, number and icon change now morphs (TextMorph, NumberRoll, blur icon swaps, drawn checks, one-surface folds). Shared keyframes available: ui-sheen (mask sweep; use this one with TextMorph), ui-shimmer (text-clip sweep, plain text only), ui-fade-up, ui-fade-in, ui-blink, ui-draw, ui-wave, ui-bounce, ui-breathe, ui-scan, ui-slide-from-right/left, ui-pop-in, ui-chip-in, ui-ping, ui-drop-in, ui-drain, ui-col-in/out, ui-note-in, ui-progress, ui-ring-fill.

Primitive changes in the pass: StatusButton gained `variant="ghost"` and `size="sm"`; NumberRoll gained `direction` and survives values faster than its roll; TextMorph holds one line while its width eases.

Latest commits: the motion pass `7ab99fd` (code block, message edit, web research), `14e8ff8` (approval card, tool call, thinking indicator/trace), `84d3dd6` (task progress, plan, usage meter, chat notice), `fdc202d` (command output, action receipts, diff review, clarifying question), `a09675d` (attachment chip, voice input, chat scroll, response versions), `be629d0` (model picker, mode switcher, streaming answer, composer), `663446a` (chat history, citation, mention menu, selection actions). Before it: `acc9e82`, `65150c3`, `8b55a34`, `dd1b533`.

---

## 9. Next (start here)

**Done: the motion upgrade pass** (2026-10-08, pushed in the seven batches above, awaiting the owner's review on the live site). The table below is kept as the record of what each component got; any feedback from that review comes first. Then the next job is **playback mode** (below).

| Component | What to upgrade |
| --- | --- |
| code-block | Copy → Copied via TextMorph (currently a crossfade grid); Apply → Applying → Applied with the status-button icon slot + self-drawing check |
| message-edit | Copy icon → check (draw-in) and label; "2 / 2" version counter via NumberRoll |
| web-research | "Searching" ↔ "Reading" via TextMorph; "7 sites" and the "3 searches · 9 sources" summary via NumberRoll |
| approval-card | Pending → Approved / Denied / Expired label via TextMorph, buttons collapse into the result (one surface); countdown via NumberRoll |
| tool-call | Status label (Preparing → Running → Done / Failed) via TextMorph; duration via NumberRoll; icon cross-fades to a drawn check |
| thinking-trace | "Thinking" → "Thought for 12s" via TextMorph + NumberRoll seconds |
| thinking-indicator | Timer via NumberRoll; done label via TextMorph |
| task-progress | Phase label via TextMorph; stats and percent via NumberRoll; cancel/finished states as one surface |
| plan | "3 of 5" progress via NumberRoll; task status icons draw/cross-fade |
| usage-meter | "1,240 of 2,000 left" and the ring percent via NumberRoll; low/out label via TextMorph |
| chat-notice | Rate-limit countdown via NumberRoll; title/description changes via TextMorph; Retry via status-button |
| command-output | Elapsed timer and exit code via NumberRoll; "Running" → "Finished" status via TextMorph |
| action-receipt | Undo → Undoing → Undone via TextMorph (status-button style icon slot) |
| diff-review | "3 to review" / "2 of 3 accepted" via NumberRoll + TextMorph; Accept/Reject → Accepted/Rejected morph |
| clarifying-question | "Continue · 3" count via NumberRoll; answered receipt via TextMorph |
| attachment-chip | "Uploading 42%" via NumberRoll; Uploading → Reading → ready via TextMorph |
| voice-input | Timer via NumberRoll; Listening → Transcribing via TextMorph |
| chat-scroll | "Writing" → "New reply" via TextMorph (the pill already widens) |
| response-versions | "2 / 3" via NumberRoll |
| model-picker | Effort label in the pill via TextMorph when effort changes |
| mode-switcher | Description line via TextMorph |
| streaming-answer | Answer actions: Copy → Copied, feedback icons fill/draw |
| prompt-composer | Check send ↔ stop morph and attachment count meet the bar |
| chat-history, citation, mention-menu, selection-actions | Review for any remaining hard swaps |

### Next job
- **Playback mode** for 5 product components (composer, thinking trace, tool call, streaming answer, web research): a hands-off, looping, believable demo for landing-page heroes, so AI startups can show their product working (this is the bridge to the templates).
- More signature landing interactions in the same style (ideas: command palette, toast stack, onboarding checklist, pricing calculator slider, theme toggle morph, comparison table, changelog timeline, cookie banner, newsletter footer).
- Link each component page to the templates that use it; use the components inside the templates.
- Site/business loose ends: connect `hairlineui.com` in Vercel with `NEXT_PUBLIC_SITE_URL`; add a license (MIT recommended) and submit `@hairline` to the shadcn registry directory; real checkout links in `src/data/pricing.ts`; 260 unused files in `public/` (~131MB) await the owner's approval to delete.
