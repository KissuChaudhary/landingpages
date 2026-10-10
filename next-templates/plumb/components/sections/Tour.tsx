"use client";

import * as React from "react";
import { site, type Chapter } from "@/site.config";
import { asset, signupHref } from "@/lib/links";
import { useLive } from "@/lib/live";
import { NumberRoll } from "@/components/hairline/number-roll";
import { TextMorph } from "@/components/hairline/text-morph";
import { easeInOut, smooth, span, useReducedMotion } from "@/components/motion/Motion";
import { Button, SmartLink, Tag } from "@/components/ui/Primitives";
import { Logos } from "@/components/ui/Logos";

/*
 * THE TOUR: the hero and the product tour are one pinned scene, and one surface.
 *
 *   token      the live counter sits inside the headline like a word
 *   chapters   scroll and it pulls out of the sentence, which drifts apart, and
 *              takes each chapter's shape in turn (site.config.ts → tour.chapters):
 *                line    a pill holding one line of code, with a Copy button
 *                screen  a window the size of the chapter's image
 *                phone   the surface becomes the bezel around a phone screen
 *              In the demo: the install line, the dashboard, the live view,
 *              Monday's email and the phone app
 *   dock       at the end it flies up into the navigation's "Start free" button,
 *              which it was all along
 *
 * The counter rides through every shape: it is one element, placed on each screen's
 * empty slot (`live` on a chapter). The scroll position is eased a beat behind the
 * page, so the surface has weight. Product screens are images, not coded UI.
 *
 * With reduced motion or without JavaScript nothing pins: the hero is followed by the
 * chapters as ordinary blocks. Screen readers always get those blocks.
 */

const CHAPTERS = site.tour.chapters;
/** Every shape the surface takes: the token, one per chapter, then the dock. */
const FRAMES = ["token", ...CHAPTERS.map((c) => c.frame), "dock"];
const DOCK = FRAMES.length - 1;
const wide = (c: Chapter) => c.frame === "screen" && (c.aspect ?? 1.6) >= 1.2;
/** Scroll, in screen heights, to morph into each shape and then to hold it. */
const INTO = [0, 0.95, ...CHAPTERS.slice(1).map((c) => (wide(c) ? 0.85 : 0.75)), 0.8];
const HOLD = [0.04, ...CHAPTERS.map((c) => (wide(c) ? 0.65 : 0.52)), 0.18];
const STOPS = (() => {
  let u = 0;
  return FRAMES.map((_, i) => {
    u += INTO[i];
    const from = u;
    u += HOLD[i];
    return [from, u] as const;
  });
})();
const TOTAL = STOPS[STOPS.length - 1][1];
/** The counter's own font size; every shape scales it down, so it stays crisp. */
const BASE = 64;
const BEZEL = 7;

type Box = { x: number; y: number; w: number; h: number; r: number };
type Chip = { x: number; y: number; s: number; dot: number; o: number };
type Geometry = {
  boxes: Box[];
  chips: Chip[];
  words: { dx: number; dy: number }[];
  labelX: number;
  labelSize: number;
  narrow: boolean;
  stacked: boolean;
};

function locate(u: number) {
  for (let i = 0; i < STOPS.length; i++) {
    const [from, to] = STOPS[i];
    if (u <= to) return u >= from || i === 0 ? { a: i, b: i, t: 0 } : { a: i - 1, b: i, t: span(u, STOPS[i - 1][1], from) };
  }
  const last = STOPS.length - 1;
  return { a: last, b: last, t: 0 };
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function chapterAt(u: number) {
  const { a, b, t } = locate(u);
  const state = t < 0.5 ? a : b;
  return Math.min(CHAPTERS.length - 1, Math.max(0, state - 1));
}

export function Tour() {
  const { hero, tour } = site;
  const reduced = useReducedMotion();
  const live = useLive();
  const chapters = CHAPTERS;

  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const tokenRef = React.useRef<HTMLSpanElement>(null);
  const wordRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const layerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const chipRef = React.useRef<HTMLSpanElement>(null);
  const chipDotRef = React.useRef<HTMLSpanElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const outroRef = React.useRef<HTMLDivElement>(null);

  const [ready, setReady] = React.useState(false);
  const [chapter, setChapter] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [shape, setShape] = React.useState(0);
  const [heroGone, setHeroGone] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Headline words: `before`, the counter, then `after` ("\n" breaks the line on wide screens).
  const before = hero.headline.before.split(" ").filter(Boolean);
  const after = hero.headline.after.split(/( |\n)/).filter((w) => w && w !== " ");
  let w = 0;

  React.useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const token = tokenRef.current;
    const surface = surfaceRef.current;
    const chip = chipRef.current;
    const copy = copyRef.current;
    if (!section || !stage || !token || !surface || !chip || !copy || reduced) {
      setReady(false);
      return;
    }

    let geo: Geometry | null = null;
    let target = 0;
    let current = -1;
    let frame = 0;
    let last = 0;
    let near = true;
    let landed = false;
    const state = { chapter: -1, shape: -1, heroGone: false };

    const rel = (el: Element, s: DOMRect) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    };

    const measure = (): Geometry => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const s = stage.getBoundingClientRect();
      const isNarrow = W < 768;
      const stacked = W < 1024 || W / H < 1.25;
      const nav = isNarrow ? 60 : 68;

      // Where the chapter copy goes, then the room left for the surface.
      let area: { x: number; y: number; w: number; h: number };
      if (stacked) {
        const side = isNarrow ? 16 : 40;
        copy.style.setProperty("--copy-x", `${side}px`);
        copy.style.setProperty("--copy-y", `${nav + (isNarrow ? 10 : 22)}px`);
        copy.style.setProperty("--copy-w", `${W - side * 2}px`);
        const top = nav + (isNarrow ? 10 : 22) + copy.offsetHeight + (isNarrow ? 16 : 28);
        area = { x: side, y: top, w: W - side * 2, h: Math.max(220, H - top - (isNarrow ? 16 : 32)) };
      } else {
        const gutter = Math.max(32, (W - 1360) / 2 + 40);
        const copyW = Math.min(340, Math.max(270, W * 0.23));
        const x = gutter + copyW + 56;
        copy.style.setProperty("--copy-x", `${gutter}px`);
        copy.style.setProperty("--copy-w", `${copyW}px`);
        copy.style.setProperty("--copy-y", `${Math.max(nav + 24, (H - copy.offsetHeight) / 2)}px`);
        area = { x, y: nav + 20, w: W - gutter - x, h: H - nav - 20 - 36 };
      }
      const center = (bw: number, bh: number, r: number): Box => ({ x: area.x + (area.w - bw) / 2, y: area.y + (area.h - bh) / 2, w: bw, h: bh, r });
      const fit = (aspect: number, maxW: number, maxH: number, r: number) => {
        let bw = Math.min(area.w, maxW);
        let bh = bw / aspect;
        const limit = Math.min(area.h, maxH);
        if (bh > limit) {
          bh = limit;
          bw = bh * aspect;
        }
        return center(bw, bh, r);
      };

      const tk = rel(token, s);
      const navCta = document.querySelector("[data-nav-cta]");
      const dock = navCta ? rel(navCta, s) : { x: W - 136, y: 14, w: 116, h: 40 };
      const lineH = isNarrow ? 112 : 76;
      const shapeOf = (c: Chapter): Box => {
        if (c.frame === "line") return center(isNarrow ? area.w : Math.min(area.w, c.maxWidth ?? 800), lineH, isNarrow ? 26 : lineH / 2);
        if (c.frame === "phone") {
          const ph = Math.min(area.h, 660);
          return center((ph - BEZEL * 2) * (c.aspect ?? 272 / 606) + BEZEL * 2, ph, isNarrow ? 40 : 46);
        }
        const aspect = isNarrow && c.phoneImage ? (c.phoneAspect ?? c.aspect ?? 1) : (c.aspect ?? 1.6);
        const broad = aspect >= 1.2;
        return fit(aspect, isNarrow ? 440 : (c.maxWidth ?? (broad ? 1140 : 490)), broad ? 9999 : 660, isNarrow ? 24 : broad ? 20 : 26);
      };
      const boxes: Box[] = [{ ...tk, r: tk.h / 2 }, ...chapters.map(shapeOf), { ...dock, r: dock.h / 2 }];

      // The counter on each shape.
      const cw = chip.offsetWidth;
      const s0 = (tk.h * 0.52) / BASE;
      const lineS = (isNarrow ? 16 : 19) / BASE;
      // A slot is the number's left edge, its vertical centre and its font size, as shares of the screen.
      const onSlot = (box: Box, slot: Chapter["live"]): Chip | null =>
        slot ? { x: box.x + slot.x * box.w, y: box.y + slot.y * box.h - (slot.size * box.w) / 2, s: (slot.size * box.w) / BASE, dot: 0, o: 1 } : null;
      const hidden = (box: Box): Chip => ({ x: box.x + box.w / 2 - (cw * 0.2) / 2, y: box.y + box.h / 2, s: 0.2, dot: 0, o: 0 });
      const screen = (box: Box): Box => ({ x: box.x + BEZEL, y: box.y + BEZEL, w: box.w - BEZEL * 2, h: box.h - BEZEL * 2, r: box.r - BEZEL });
      const slotFor = (i: number) => (isNarrow ? (chapters[i].phoneLive ?? chapters[i].live) : chapters[i].live);
      const chips: Chip[] = [
        { x: tk.x + tk.h * 0.24, y: tk.y + (tk.h - BASE * s0) / 2, s: s0, dot: 1, o: 1 },
        ...chapters.map((c, i): Chip => {
          const box = boxes[i + 1];
          if (c.frame === "line") return { x: box.x + (isNarrow ? 20 : 28), y: isNarrow ? box.y + 18 : box.y + (lineH - BASE * lineS) / 2, s: lineS, dot: 1, o: 1 };
          return onSlot(c.frame === "phone" ? screen(box) : box, slotFor(i)) ?? hidden(box);
        }),
        hidden(boxes[DOCK]),
      ];

      // The words drift away from the counter as it leaves.
      const tc = { x: tk.x + tk.w / 2, y: tk.y + tk.h / 2 };
      const words = wordRefs.current.map((el) => {
        if (!el) return { dx: 0, dy: 0 };
        const r = rel(el, s);
        const dx = r.x + r.w / 2 - tc.x;
        const dy = r.y + r.h / 2 - tc.y;
        return { dx: dx * 0.55 + Math.sign(dx) * 40, dy: dy * 0.8 + Math.sign(dy) * 24 };
      });

      // Copy layout for the install line: code starts after the counter.
      surface.style.setProperty("--line-code-x", `${(isNarrow ? 20 : 28) + cw * lineS + (isNarrow ? 0 : 18)}px`);
      return { boxes, chips, words, labelX: tk.h * 0.24 + cw * s0 + tk.h * 0.14, labelSize: tk.h * 0.3, narrow: isNarrow, stacked };
    };

    const sizeLayers = (g: Geometry) => {
      layerRefs.current.forEach((layer, k) => {
        if (!layer) return;
        const box = g.boxes[k];
        layer.style.width = `${box.w}px`;
        layer.style.height = `${box.h}px`;
        layer.style.borderRadius = `${box.r}px`;
        layer.style.setProperty("--r", `${box.r}px`);
      });
      const label = labelRef.current;
      if (label) {
        label.style.left = `${g.labelX}px`;
        label.style.fontSize = `${g.labelSize}px`;
      }
    };

    const draw = (u: number) => {
      if (!geo) return;
      const { a, b, t } = locate(u);
      const e = easeInOut(t);
      const A = geo.boxes[a];
      const B = geo.boxes[b];
      // The dock target follows the navigation in case it changed size.
      const box = { x: mix(A.x, B.x, e), y: mix(A.y, B.y, e), w: mix(A.w, B.w, e), h: mix(A.h, B.h, e), r: mix(A.r, B.r, e) };
      const atEnd = a === DOCK;
      surface.style.transform = `translate3d(${box.x.toFixed(2)}px, ${box.y.toFixed(2)}px, 0)`;
      surface.style.width = `${box.w.toFixed(2)}px`;
      surface.style.height = `${box.h.toFixed(2)}px`;
      surface.style.borderRadius = `${box.r.toFixed(2)}px`;
      surface.style.opacity = atEnd ? "0" : "1";
      if (atEnd !== landed) {
        landed = atEnd;
        document.documentElement.toggleAttribute("data-docked", atEnd);
      }

      // Layers: the one leaving fades early, the one arriving settles in late.
      layerRefs.current.forEach((layer, k) => {
        if (!layer) return;
        let o = 0;
        let sc = 1;
        if (k === a && k === b) o = 1;
        else if (k === a) {
          o = 1 - smooth(t, 0.1, 0.48);
          sc = 1 + (1 - o) * 0.035;
        } else if (k === b) {
          o = smooth(t, 0.46, 0.9);
          sc = 0.965 + o * 0.035;
        }
        if (o <= 0.001) {
          if (layer.style.visibility !== "hidden") layer.style.visibility = "hidden";
          return;
        }
        const L = geo!.boxes[k];
        // A line grows out of the counter, so it keeps to the surface's left edge.
        const x = FRAMES[k] === "line" ? 0 : (box.w - L.w) / 2;
        layer.style.visibility = "visible";
        layer.style.opacity = o.toFixed(3);
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${((box.h - L.h) / 2).toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
      });

      // The counter.
      const ca = geo.chips[a];
      const cb = geo.chips[b];
      const cx = mix(ca.x, cb.x, e) - box.x;
      const cy = mix(ca.y, cb.y, e) - box.y;
      chip.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0) scale(${mix(ca.s, cb.s, e).toFixed(4)})`;
      chip.style.opacity = mix(ca.o, cb.o, smooth(t, 0.15, 0.85)).toFixed(3);
      if (chipDotRef.current) chipDotRef.current.style.opacity = mix(ca.dot, cb.dot, smooth(t, 0.3, 0.7)).toFixed(3);

      // The hero leaves with the first morph.
      const out = a === 0 ? t : 1;
      const hero = heroRef.current;
      if (hero) {
        hero.style.setProperty("--out", out.toFixed(4));
        hero.style.visibility = out >= 1 ? "hidden" : "visible";
      }
      const drift = easeInOut(smooth(out, 0, 0.7));
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = geo!.words[i];
        el.style.transform = out ? `translate3d(${(d.dx * drift).toFixed(1)}px, ${(d.dy * drift).toFixed(1)}px, 0)` : "";
        el.style.opacity = (1 - smooth(out, 0.06, 0.52)).toFixed(3);
        el.style.filter = out ? `blur(${(smooth(out, 0, 0.6) * 9).toFixed(1)}px)` : "";
      });

      // Chapter copy fades in after the hero and out before the dock.
      const docking = a === DOCK - 1 && b === DOCK;
      const copyIn = a === 0 ? smooth(t, 0.56, 1) : docking ? 1 - smooth(t, 0, 0.4) : atEnd ? 0 : 1;
      copy.style.setProperty("--in", copyIn.toFixed(3));
      copy.style.visibility = copyIn <= 0.001 ? "hidden" : "visible";
      const first = STOPS[1][0];
      const lastHold = STOPS[DOCK - 1][1];
      if (barRef.current) barRef.current.style.transform = `scaleX(${span(u, first, lastHold).toFixed(4)})`;

      const outro = outroRef.current;
      if (outro) {
        const o = docking ? smooth(t, 0.45, 0.95) : atEnd ? 1 : 0;
        outro.style.setProperty("--in", o.toFixed(3));
        outro.style.visibility = o <= 0.001 ? "hidden" : "visible";
      }

      // Discrete changes go through React.
      const nextChapter = chapterAt(u);
      if (nextChapter !== state.chapter) {
        setDir(nextChapter > state.chapter ? 1 : -1);
        state.chapter = nextChapter;
        setChapter(nextChapter);
      }
      const nextShape = t < 0.5 ? a : b;
      if (nextShape !== state.shape) {
        state.shape = nextShape;
        setShape(nextShape);
      }
      const gone = out > 0.5;
      if (gone !== state.heroGone) {
        state.heroGone = gone;
        setHeroGone(gone);
      }
    };

    const read = () => {
      const distance = section.offsetHeight - stage.offsetHeight;
      const top = section.getBoundingClientRect().top;
      target = Math.min(1, Math.max(0, -top / Math.max(1, distance))) * TOTAL;
    };

    const tick = (now: number) => {
      const dt = Math.min(64, last ? now - last : 16);
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / 90));
      if (Math.abs(target - current) < 0.0006) current = target;
      draw(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const schedule = () => {
      read();
      if (!near || frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const relayout = () => {
      geo = measure();
      sizeLayers(geo);
      read();
      if (current < 0) current = target;
      draw(current);
    };

    const watch = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
    }, { rootMargin: "20% 0px" });
    watch.observe(section);
    const resize = new ResizeObserver(() => relayout());
    resize.observe(stage);
    if (titleRef.current) resize.observe(titleRef.current);
    relayout();
    document.fonts?.ready.then(relayout);
    setReady(true);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      watch.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeAttribute("data-docked");
    };
  }, [reduced, chapters]);

  // Jump to a chapter from the step list.
  const go = (i: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const [from, to] = STOPS[i + 1];
    const distance = section.offsetHeight - stage.offsetHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + ((from + to) / 2 / TOTAL) * distance;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const anchor = (i: number) => `${(((STOPS[i][0] + STOPS[i][1]) / 2) * 100).toFixed(2)}vh`;

  return (
    <section
      ref={sectionRef}
      id="tour-section"
      className={`tour ${ready ? "is-ready" : ""}`}
      style={{ "--total": TOTAL } as React.CSSProperties}
      aria-labelledby="hero-title"
    >
      <div ref={stageRef} className="tour-stage">
        {/* ── Hero ── */}
        <div ref={heroRef} className={`tour-hero ${ready ? "is-in" : ""}`} inert={heroGone || undefined}>
          <SmartLink to={hero.announcement.href} className="announce" data-rise style={{ "--d": "0ms" } as React.CSSProperties}>
            <b>{hero.announcement.tag}</b>
            <span>{hero.announcement.label}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SmartLink>

          <h1 id="hero-title" ref={titleRef} className="hero-title">
            <span className="sr-only">
              {hero.headline.before}
              {hero.headline.after.replace(/\n/g, " ")}
            </span>
            <span aria-hidden="true">
              {before.map((word) => {
                const i = w++;
                return (
                  <React.Fragment key={`b${i}`}>
                    <span
                      className="hw"
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {word}
                    </span>{" "}
                  </React.Fragment>
                );
              })}
              <span ref={tokenRef} className="token">
                <span className="token-dot" />
                <span className="token-num">
                  <NumberRoll value={live} locales={site.locale} />
                </span>
                <span className="token-label">{hero.tokenLabel}</span>
              </span>
              {after.map((word, k) => {
                if (word === "\n") return <br key={`n${k}`} className="hero-break" />;
                const i = w++;
                const glued = k === 0 && /^[,.;:!?]/.test(word);
                return (
                  <React.Fragment key={`a${i}`}>
                    {glued ? null : " "}
                    <span
                      className="hw"
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {word}
                    </span>
                  </React.Fragment>
                );
              })}
            </span>
          </h1>

          <p className="hero-lead" data-rise style={{ "--d": "380ms" } as React.CSSProperties}>
            {hero.description}
          </p>
          <div className="hero-actions" data-rise style={{ "--d": "480ms" } as React.CSSProperties}>
            <Button to={signupHref()} label={hero.primary} size="lg" />
            <Button to={hero.secondary.href} label={hero.secondary.label} tone="line" size="lg" arrow={false} />
          </div>
          <p className="hero-note" data-rise style={{ "--d": "560ms" } as React.CSSProperties}>
            {hero.note}
          </p>
          <div className="hero-trusted" data-rise style={{ "--d": "680ms" } as React.CSSProperties}>
            <p>{hero.trusted}</p>
            <Logos />
          </div>
        </div>

        {/* ── Chapter copy (decorative; the same text is in the list below for screen readers) ── */}
        <div ref={copyRef} className="tour-copy">
          <div className="tour-count" aria-hidden="true">
            <span className="tour-count-label">{tour.label}</span>
            <span className="tour-count-num">
              <NumberRoll value={chapter + 1} format={{ minimumIntegerDigits: 2 }} locales={site.locale} />
              <span className="tour-count-of">/ {String(chapters.length).padStart(2, "0")}</span>
            </span>
          </div>
          <span className="tour-bar" aria-hidden="true">
            <span ref={barRef} />
          </span>
          <div className="tour-chapters" aria-hidden="true">
            {chapters.map((c, i) => (
              <div key={c.id} className={`tour-chapter ${i === chapter ? "is-active" : ""}`} data-dir={i < chapter ? "past" : i > chapter ? "next" : "now"} style={{ "--dir": dir } as React.CSSProperties}>
                <p className="tour-kicker">{c.kicker}</p>
                <p className="tour-title">{c.title}</p>
                <p className="tour-body">{c.body}</p>
                {c.tags?.length ? (
                  <ul className="tour-platforms">
                    {c.tags.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
          <nav className="tour-steps" aria-label="Tour chapters">
            {chapters.map((c, i) => (
              <button key={c.id} type="button" className={i === chapter ? "is-active" : ""} aria-current={i === chapter ? "step" : undefined} onClick={() => go(i)}>
                {c.kicker}
              </button>
            ))}
          </nav>
        </div>

        {/* ── The surface ── */}
        <div ref={surfaceRef} className="surface" data-shape={FRAMES[shape]}>
          <div className="surface-skin">
            {FRAMES.map((frame, k) => {
              const c = k > 0 && k < DOCK ? chapters[k - 1] : null;
              return (
                <div
                  key={c?.id ?? frame}
                  ref={(el) => {
                    layerRefs.current[k] = el;
                  }}
                  className={`layer layer-${frame}`}
                  inert={shape !== k || undefined}
                  aria-hidden={frame === "line" ? undefined : true}
                >
                  {frame === "token" ? (
                    <span ref={labelRef} className="layer-token-label">
                      {hero.tokenLabel}
                    </span>
                  ) : null}
                  {c && frame === "line" ? (
                    <>
                      <code className="line-code" aria-hidden="true">
                        <Snippet text={c.code ?? ""} />
                      </code>
                      <button type="button" className={`line-copy ${copied ? "is-done" : ""}`} onClick={() => copy(c.code ?? "")} aria-label={copied ? "Copied" : `Copy ${c.kicker.toLowerCase()} code`}>
                        <span className="line-copy-icon" aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none" data-on={!copied}>
                            <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                            <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                          <svg viewBox="0 0 16 16" fill="none" data-on={copied}>
                            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="line-check" />
                          </svg>
                        </span>
                        <TextMorph>{copied ? "Copied" : "Copy"}</TextMorph>
                      </button>
                    </>
                  ) : null}
                  {c && frame === "screen" && c.image ? (
                    <picture>
                      {c.phoneImage ? <source media="(max-width: 767px)" srcSet={asset(c.phoneImage)} /> : null}
                      <img src={asset(c.image)} alt="" loading={k <= 2 ? "eager" : "lazy"} draggable={false} />
                    </picture>
                  ) : null}
                  {c && frame === "phone" && c.image ? (
                    <span className="phone-screen">
                      <img src={asset(c.image)} alt="" loading="lazy" draggable={false} />
                      <i className="phone-island" />
                    </span>
                  ) : null}
                  {frame === "dock" ? <span className="layer-cta-label">{site.cta}</span> : null}
                </div>
              );
            })}
            <span ref={chipRef} className="chip" aria-hidden="true">
              <span ref={chipDotRef} className="chip-dot" />
              <span className="chip-num">
                <NumberRoll value={live} locales={site.locale} />
              </span>
            </span>
          </div>
        </div>

        <div ref={outroRef} className="tour-outro" aria-hidden="true">
          <p className="tour-outro-title">{tour.outro.title}</p>
          <p className="tour-outro-body">{tour.outro.body}</p>
        </div>
      </div>

      {/* Anchors, so links land on a chapter (with reduced motion, on the chapter list below). */}
      <span id="tour" className="tour-anchor" style={{ top: anchor(1) }} aria-hidden="true" />
      {chapters.map((c, i) => (
        <span key={c.id} id={`tour-${c.id}`} className="tour-anchor" style={{ top: anchor(i + 1) }} aria-hidden="true" />
      ))}

      {/* ── The chapters as plain blocks: shown with reduced motion, read by screen readers always ── */}
      <ol className="tour-static">
        {chapters.map((c, i) => (
          <li key={c.id} className="tour-static-item">
            <div className="tour-static-copy">
              <Tag>{`${String(i + 1).padStart(2, "0")} · ${c.kicker}`}</Tag>
              <h2 className="tour-static-title">{c.title}</h2>
              <p>{c.body}</p>
            </div>
            {c.frame === "line" ? (
              <code className="tour-static-code">{c.code}</code>
            ) : c.image ? (
              <picture className={`tour-static-media is-${c.frame === "phone" ? "phone" : wide(c) ? "wide" : "tall"}`}>
                {c.phoneImage ? <source media="(max-width: 767px)" srcSet={asset(c.phoneImage)} /> : null}
                <img src={asset(c.image)} alt={c.alt ?? ""} loading="lazy" />
              </picture>
            ) : null}
          </li>
        ))}
        <li className="tour-static-outro">
          <p className="tour-static-title">{tour.outro.title}</p>
          <p>{tour.outro.body}</p>
        </li>
      </ol>
    </section>
  );
}

/** The install line with light syntax colouring: tags, attributes and values. */
function Snippet({ text }: { text: string }) {
  const parts = text.split(/(<\/?\w+|>|\s[\w-]+=|"[^"]*")/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const kind = part.startsWith('"') ? "str" : /=$/.test(part) ? "attr" : /^<\/?\w+$|^>$/.test(part) ? "tag" : "txt";
        return (
          <span key={i} className={`tok-${kind}`}>
            {part}
          </span>
        );
      })}
    </>
  );
}
