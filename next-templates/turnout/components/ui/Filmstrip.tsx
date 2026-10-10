"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/urls";
import { useFrameLoop, useMotion, useScrollVelocity } from "@/components/Motion";

// A strip of event photos that drifts on its own and runs faster while the page scrolls,
// in the direction you scroll. The list is rendered twice so it can wrap without a jump.

export type Frame = { image: string; alt: string; caption: string; wide?: boolean };

const SPEED = 0.04; // px per ms at rest

export function Filmstrip({ frames }: { frames: Frame[] }) {
  const { reduced } = useMotion();
  const velocity = useScrollVelocity();
  const track = useRef<HTMLUListElement>(null);
  const unit = useRef(0);
  const offset = useRef(0);

  // The width of one copy of the list, so the drift can wrap around seamlessly.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const read = () => (unit.current = el.scrollWidth / 2);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const loop = useFrameLoop<HTMLDivElement>((dt) => {
    const el = track.current;
    if (!el || !unit.current) return;
    const boost = Math.max(-3, Math.min(3, velocity.current));
    velocity.current *= 0.9;
    offset.current -= (SPEED + boost * SPEED * 7) * dt;
    if (offset.current <= -unit.current) offset.current += unit.current;
    if (offset.current > 0) offset.current -= unit.current;
    el.style.transform = `translate3d(${offset.current.toFixed(1)}px, 0, 0)`;
  }, !reduced);

  return (
    <div ref={loop} className="filmstrip">
      <ul ref={track} className="filmstrip-track">
        {[0, 1].map((copy) =>
          frames.map((frame, i) => (
            <li
              key={`${copy}-${frame.image}`}
              className={`frame ${frame.wide ? "is-wide" : ""}`}
              aria-hidden={copy === 1}
              style={{ "--i": i } as React.CSSProperties}
            >
              <img src={asset(frame.image)} alt={copy === 0 ? frame.alt : ""} width={frame.wide ? 640 : 360} height={480} loading={i < 4 ? "eager" : "lazy"} draggable={false} />
              <span className="frame-caption">{frame.caption}</span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
