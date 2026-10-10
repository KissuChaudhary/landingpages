"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { signupHref } from "@/lib/links";
import { useInView, useMotion } from "@/components/Motion";
import { platforms } from "@/components/ui/Platforms";
import { TileWords } from "@/components/ui/TileWords";
import { Button } from "@/components/ui/Action";

// Platforms float around the headline. When the section arrives, a hairline draws from
// each one toward the middle, and small pulses keep travelling inward along them: posts,
// videos and tracks flowing into one page. Pointing at a platform lights its line.

// Positions in percent of the section, desktop and phone (phones show the first eight).
const spots = [
  [8, 16], [21, 30], [5, 52], [16, 76], [31, 88], [27, 9],
  [92, 18], [78, 28], [95, 50], [83, 74], [68, 88], [72, 8], [50, 4], [50, 95],
];
const phoneSpots = [[12, 9], [38, 4], [64, 6], [88, 11], [10, 90], [36, 95], [62, 93], [88, 88]];

export function Connect() {
  const { connect } = site;
  const handle = useHandle();
  const { reduced } = useMotion();
  const [ref, inView] = useInView<HTMLElement>({ once: false, threshold: 0.25 });
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const svg = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<{ d: string; len: number }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);
  const [phone, setPhone] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const w = box.width;
      const h = box.height;
      const cx = w / 2;
      const cy = h / 2;
      const rx = Math.min(w * 0.24, 360);
      const ry = Math.min(h * 0.2, 150);
      const out = tiles.current.map((tile) => {
        if (!tile || tile.offsetParent === null) return { d: "", len: 0 };
        const r = tile.getBoundingClientRect();
        const x = r.left - box.left + r.width / 2;
        const y = r.top - box.top + r.height / 2;
        // End where the line meets an ellipse around the headline, so it never crosses the words.
        const a = Math.atan2(y - cy, x - cx);
        const ex = cx + Math.cos(a) * rx;
        const ey = cy + Math.sin(a) * ry;
        return { d: `M${x.toFixed(1)} ${y.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`, len: Math.hypot(ex - x, ey - y) };
      });
      setSize({ w, h });
      setLines(out);
      setPhone(window.innerWidth < 760);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, phone]);

  useEffect(() => {
    if (inView) setDrawn(true);
    const el = svg.current;
    if (!el || reduced) return;
    if (inView) el.unpauseAnimations();
    else el.pauseAnimations();
  }, [inView, reduced]);

  const list = phone ? phoneSpots : spots;

  return (
    <section className={`section connect js-draw ${drawn ? "is-in" : ""}`} ref={ref} aria-labelledby="connect-title">
      <svg className="connect-lines" ref={svg} width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
        {lines.map((l, i) =>
          l.d ? (
            <g key={i} className={hover === i ? "is-hot" : undefined}>
              <path className="draw" pathLength={1} d={l.d} style={{ "--dd": `${120 + i * 50}ms` } as CSSProperties} />
              {!reduced && (
                <circle r="2.6" className="connect-pulse">
                  <animateMotion dur={`${2.2 + (i % 4) * 0.45}s`} begin={`${1.2 + i * 0.37}s`} repeatCount="indefinite" path={l.d} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${2.2 + (i % 4) * 0.45}s`} begin={`${1.2 + i * 0.37}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ) : null,
        )}
      </svg>

      <ul className="connect-tiles" aria-label="Embed from 40+ platforms, including">
        {platforms.map((p, i) => {
          const at = list[i];
          return (
            <li
              key={p.name}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              className="connect-tile"
              hidden={!at}
              style={at ? ({ left: `${at[0]}%`, top: `${at[1]}%`, "--i": i } as CSSProperties) : undefined}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                {p.glyph}
              </svg>
              <span className="connect-name">{p.name}</span>
            </li>
          );
        })}
      </ul>

      <div className="container connect-center">
        <p className="small connect-eyebrow" data-reveal="fade">
          {connect.eyebrow}
        </p>
        <TileWords id="connect-title" text={connect.title} className="h2" />
        <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
          {connect.description}
        </p>
        <div data-reveal style={{ "--d": "200ms" } as CSSProperties}>
          <Button to={signupHref(handle)} label={connect.cta} tone="ink" />
        </div>
      </div>
    </section>
  );
}
