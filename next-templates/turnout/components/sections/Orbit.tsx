"use client";

import { site } from "@/site.config";
import { work } from "@/data/work";
import { asset } from "@/lib/urls";
import { pinned, useScrollProgress } from "@/components/Motion";
import { ArrowDot, SmartLink } from "@/components/ui/Action";

// Photos from every project circle a single link. The ring turns as you scroll, and it
// opens up a little when you point at the link. Positions use CSS cos() and sin(); the
// script only writes one number per frame.

const extra = [
  { image: "/images/hero-runclub.webp", alt: "A run club crossing a bridge at sunrise" },
  { image: "/images/svc-launch.webp", alt: "Confetti over a launch night crowd" },
  { image: "/images/hero-supper.webp", alt: "A supper club in a greenhouse" },
];

// Angle around the ring, size and tilt for each tile.
const seats = [
  { a: -100, w: 15, tilt: -8 },
  { a: -52, w: 17, tilt: 9 },
  { a: -8, w: 14, tilt: -12 },
  { a: 32, w: 16, tilt: 7 },
  { a: 78, w: 15, tilt: -6 },
  { a: 126, w: 17, tilt: 11 },
  { a: 172, w: 14, tilt: -9 },
  { a: 214, w: 16, tilt: 6 },
];

export function Orbit() {
  const tiles = [...work.map((w) => ({ image: w.image, alt: w.alt })), ...extra].slice(0, seats.length);
  const ref = useScrollProgress<HTMLElement>((p, el) => {
    el.style.setProperty("--spin", `${(p * 80 - 40).toFixed(2)}deg`);
    el.style.setProperty("--grow", (0.9 + p * 0.16).toFixed(3));
  }, pinned);

  return (
    <section ref={ref} className="orbit" aria-label={site.work.more}>
      <div className="orbit-sticky">
        <ul className="orbit-ring" aria-hidden="true">
          {tiles.map((tile, i) => (
            <li
              key={tile.image}
              className="orbit-tile"
              style={{ "--base": `${seats[i].a}deg`, "--tw": seats[i].w, "--tilt": `${seats[i].tilt}deg` } as React.CSSProperties}
            >
              <img src={asset(tile.image)} alt="" width={400} height={300} loading="lazy" />
            </li>
          ))}
        </ul>
        <SmartLink to="/work" className="orbit-link">
          <span className="h2">{site.work.more}</span>
          <ArrowDot tone="lime" size={64} />
        </SmartLink>
      </div>
    </section>
  );
}
