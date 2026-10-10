"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView, useMotion } from "@/components/Motion";
import { TileWords } from "@/components/ui/TileWords";
import { Bag, Calendar, Image, Link, Plus, Video } from "@/components/ui/Icons";

// A small board, tilted like a page on a desk, where a cursor performs each step: a tile
// drops into a free spot, a tile is resized while its neighbours make room, and a tall
// tile is dragged across while the grid rearranges around it. It plays while on screen;
// pick a step to jump to it.

type Box = [col: number, row: number, w: number, h: number];
type Layout = Record<string, Box>;

const tiles = [
  { id: "poster", image: "/images/tile-nordlys.webp" },
  { id: "album", image: "/images/tile-album.webp" },
  { id: "video", image: "/images/tile-glyph.webp" },
  { id: "photo", image: "/images/tile-noa.webp" },
  { id: "font", image: "/images/tile-font.webp" },
  { id: "booking", image: "/images/tile-booking.webp" },
  { id: "letter", image: "/images/tile-letter.webp" },
];

// The board after each step (4 columns × 3 rows). "letter" waits above the board at first.
const START: Layout = { poster: [0, 0, 2, 1], album: [2, 0, 1, 1], video: [3, 0, 1, 2], photo: [0, 1, 1, 1], font: [1, 1, 1, 1], booking: [2, 1, 1, 1], letter: [0, 2, 1, 1] };
const DROPPED: Layout = { ...START };
const SIZED: Layout = { ...DROPPED, font: [1, 1, 2, 1], booking: [1, 2, 1, 1] };
const MOVED: Layout = { ...SIZED, video: [0, 1, 1, 2], photo: [3, 0, 1, 1], letter: [3, 1, 1, 1] };
const LAYOUTS = [START, DROPPED, SIZED, MOVED];

// Cursor positions in board units (columns, rows), and what it does at each moment.
type Beat = { at: number; cursor?: [number, number]; press?: boolean; layout?: number; lift?: string | null; handle?: string | null; dropped?: boolean };
const SCRIPTS: Beat[][] = [
  [
    { at: 0, cursor: [1.9, 3.55], layout: 0, dropped: false },
    { at: 650, press: true },
    { at: 820, dropped: true, layout: 1 },
    { at: 1100, press: false, cursor: [0.6, 2.6] },
  ],
  [
    { at: 0, cursor: [1.92, 1.9], handle: "font" },
    { at: 750, press: true },
    { at: 950, layout: 2, cursor: [2.92, 1.9] },
    { at: 1900, press: false },
    { at: 2300, handle: null },
  ],
  [
    { at: 0, cursor: [3.5, 1] },
    { at: 750, press: true, lift: "video" },
    { at: 950, layout: 3, cursor: [0.5, 2] },
    { at: 2000, press: false, lift: null },
  ],
];
const STEP_MS = 4600;
const icons = [Image, Video, Link, Bag, Calendar];

export function Build() {
  const { build, page } = site;
  const { reduced } = useMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.4 });
  const [step, setStep] = useState(0);
  const [layout, setLayout] = useState(reduced ? 3 : 0);
  const [cursor, setCursor] = useState<[number, number]>([1.9, 3.55]);
  const [press, setPress] = useState(false);
  const [lift, setLift] = useState<string | null>(null);
  const [handle, setHandle] = useState<string | null>(null);
  const [dropped, setDropped] = useState(true);
  const [cycle, setCycle] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback((s: number) => {
    clear();
    // Start each step from the board as the previous step left it.
    setLayout(s === 0 ? 0 : s);
    setLift(null);
    setHandle(null);
    setPress(false);
    setDropped(s > 0);
    for (const beat of SCRIPTS[s]) {
      timers.current.push(
        window.setTimeout(() => {
          if (beat.cursor) setCursor(beat.cursor);
          if (beat.press !== undefined) setPress(beat.press);
          if (beat.layout !== undefined) setLayout(beat.layout);
          if (beat.lift !== undefined) setLift(beat.lift);
          if (beat.handle !== undefined) setHandle(beat.handle);
          if (beat.dropped !== undefined) setDropped(beat.dropped);
        }, beat.at),
      );
    }
    timers.current.push(window.setTimeout(() => setStep((n) => (n + 1) % SCRIPTS.length), STEP_MS));
  }, []);

  useEffect(() => {
    if (reduced) {
      setLayout(3);
      setDropped(true);
      return;
    }
    if (!inView) return clear();
    play(step);
    return clear;
  }, [step, inView, reduced, play, cycle]);

  const choose = (i: number) => {
    if (i === step) setCycle((c) => c + 1);
    else setStep(i);
  };

  const boxes = LAYOUTS[layout];

  return (
    <section className="section build" id="build" aria-labelledby="build-title" ref={ref}>
      <div className="container build-grid">
        <div className="build-copy">
          <TileWords id="build-title" text={build.title} className="h2" tone="line" />
          <ol className="build-steps">
            {build.steps.map((s, i) => (
              <li key={s.title} data-active={step === i}>
                <button type="button" onClick={() => choose(i)} aria-current={step === i}>
                  <span className="build-bar" aria-hidden="true">
                    {step === i && !reduced && inView && <span key={`${step}-${cycle}`} className="build-fill" style={{ "--dur": `${STEP_MS}ms` } as CSSProperties} />}
                  </span>
                  <span className="build-step-title">
                    <span className="build-n">{i + 1}</span>
                    {s.title}
                  </span>
                  <span className="build-step-body">
                    <span>{s.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="build-scene" aria-hidden="true">
          <div className="build-board">
            <div className="build-cells">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} style={{ gridColumn: (i % 4) + 1, gridRow: Math.floor(i / 4) + 1 }} />
              ))}
            </div>
            {tiles.map((t) => {
              const [c, r, w, h] = boxes[t.id];
              const waiting = t.id === "letter" && !dropped;
              return (
                <div
                  key={t.id}
                  className={`build-tile ${lift === t.id ? "is-lifted" : ""} ${waiting ? "is-waiting" : ""} ${handle === t.id ? "has-handle" : ""}`}
                  style={{ "--c": c, "--r": r, "--w": w, "--h": h } as CSSProperties}
                >
                  <img src={asset(t.image)} alt="" loading="lazy" decoding="async" />
                  <span className="build-handle" />
                </div>
              );
            })}
            <div className="build-tools">
              <span className={`build-add ${press && step === 0 ? "is-pressed" : ""}`}>
                <Plus size={13} />
              </span>
              {page.toolbar.map((label, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <span key={label} className="build-tool">
                    <Icon size={14} />
                  </span>
                );
              })}
            </div>
            <svg className={`build-cursor ${press ? "is-pressed" : ""}`} style={{ "--x": cursor[0], "--y": cursor[1] } as CSSProperties} width="26" height="26" viewBox="0 0 24 24">
              <path d="M5 3.5l13.5 7.2-6 1.6-2.6 5.9z" fill="#0d0e12" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
