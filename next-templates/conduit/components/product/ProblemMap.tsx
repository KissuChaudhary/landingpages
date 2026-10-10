"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { useSite } from "../SiteShell";

type P = [number, number];
const nodes: { name: string; at: P }[] = [
  { name: "Inbox", at: [100, 70] },
  { name: "Docs", at: [70, 240] },
  { name: "Help desk", at: [120, 412] },
  { name: "CRM", at: [500, 70] },
  { name: "Sheets", at: [530, 240] },
  { name: "Chat", at: [480, 412] },
];
// Point-to-point handoffs, each one broken somewhere in the middle.
const broken: [P, P, P, P][] = [
  [[152, 76], [300, 40], [380, 200], [478, 234]],
  [[448, 76], [330, 110], [220, 160], [122, 234]],
  [[172, 406], [260, 330], [420, 200], [470, 88]],
  [[428, 406], [300, 330], [200, 200], [120, 88]],
  [[96, 258], [160, 360], [330, 430], [428, 418]],
  [[504, 258], [450, 360], [260, 390], [172, 418]],
];
// One route each, through the conduit.
const routes = [
  "M152 70H210Q220 70 220 80V216Q220 226 230 226H240",
  "M122 240H240",
  "M172 412H210Q220 412 220 402V264Q220 254 230 254H240",
  "M448 70H390Q380 70 380 80V216Q380 226 370 226H360",
  "M478 240H360",
  "M428 412H390Q380 412 380 402V264Q380 254 370 254H360",
];
const mid = ([a, b, c, d]: [P, P, P, P]): P => [
  (a[0] + 3 * b[0] + 3 * c[0] + d[0]) / 8,
  (a[1] + 3 * b[1] + 3 * c[1] + d[1]) / 8,
];

export function ProblemMap() {
  const { motion } = useSite();
  const figure = useRef<HTMLElement>(null);
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const set = (p: number) => {
      const q = Math.max(0, Math.min(1, (p - 0.3) / 0.6));
      el.style.setProperty("--p", p.toFixed(3));
      el.style.setProperty("--q", q.toFixed(3));
      setJoined(q >= 0.98);
    };
    if (!motion) return set(1);
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const start = innerHeight * 0.85;
      const span = innerHeight * 0.45 + r.height / 2;
      set(Math.max(0, Math.min(1, (start - r.top) / span)));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, [motion]);
  return (
    <figure
      className={`problem-map ${joined ? "is-joined" : ""}`}
      ref={figure}
      aria-label="Six tools with broken handoffs, re-routed through one conduit"
    >
      <svg viewBox="0 0 600 480" aria-hidden="true">
        <g className="map-broken">
          {broken.map((c, i) => {
            const [x, y] = mid(c);
            return (
              <g key={i}>
                <path
                  d={`M${c[0]}C${c[1]} ${c[2]} ${c[3]}`}
                  fill="none"
                  className="map-handoff"
                />
                <circle cx={x} cy={y} r="9" className="map-gap" />
                <path
                  d={`M${x - 3.5} ${y - 3.5}l7 7m0-7l-7 7`}
                  className="map-cross"
                />
              </g>
            );
          })}
        </g>
        <g className="map-routes">
          {routes.map((d, i) => (
            <g key={i}>
              <path d={d} pathLength={100} className="map-route" />
              <path
                d={d}
                pathLength={100}
                className="map-signal"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}
        </g>
        <g className="map-hub">
          <rect x="240" y="212" width="120" height="56" />
          <rect x="252" y="234" width="6" height="6" className="hub-port" />
          <rect x="264" y="246" width="6" height="6" className="hub-port" />
          <path d="M258 237H266V246" className="hub-route" />
          <text x="280" y="245">{site.brand}</text>
        </g>
        {nodes.map(({ name, at: [x, y] }, i) => (
          <g className="map-node" key={name}>
            <rect x={x - 52} y={y - 18} width="104" height="36" />
            <rect
              x={i < 3 ? x + 48 : x - 56}
              y={y - 4}
              width="8"
              height="8"
              className="node-port"
            />
            <text x={x} y={y + 4}>
              {name}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mono">
        <span className="caption-before">Before · six tools, six fragile handoffs</span>
        <span className="caption-after">With {site.brand} · one route, every step visible</span>
      </figcaption>
    </figure>
  );
}
