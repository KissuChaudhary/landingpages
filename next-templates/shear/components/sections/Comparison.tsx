"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Mark } from "@/components/ui/Brand";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * COMPARISON: Shear between the two ways teams usually do it.
 *   column   Shear is a raised dark column; a sweep of light crosses its
 *            header every few seconds
 *   rows     pointing at a row lights it across every column
 *   phones   Shear beside one alternative at a time; the switch is thrown
 *            to the choice and the values slide in from that side
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const THROW = "cubic-bezier(0.34,1.36,0.64,1)";
type Side = "left" | "right";

function ShearHeader() {
  return (
    <div className="relative flex h-16 items-center justify-center gap-2 overflow-hidden rounded-[16px] border border-white/10 bg-ink-2">
      <span aria-hidden="true" className="loop pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-mint/25 to-transparent animate-[sh-sweep_5.5s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
      <Mark className="relative size-6 text-mint" />
      <span className="relative text-[19px] font-[560] tracking-[-0.045em] text-white" style={{ fontVariationSettings: '"wdth" 108' }}>
        {site.brand.name.toLowerCase()}
      </span>
    </div>
  );
}

export function Comparison() {
  const { comparison } = site;
  const { reduced } = useMotion();
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [side, setSide] = React.useState<Side>("left");
  const [dir, setDir] = React.useState(1);
  const toggleRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = React.useState({ left: 0, width: 0, ready: false });

  React.useLayoutEffect(() => {
    const el = toggleRefs.current[side === "left" ? 0 : 1];
    if (!el) return;
    const measure = () => setThumb((t) => (t.left === el.offsetLeft && t.width === el.offsetWidth ? t : { left: el.offsetLeft, width: el.offsetWidth, ready: t.width > 0 }));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [side]);

  const choose = (next: Side) => {
    if (next === side) return;
    setDir(next === "right" ? 1 : -1);
    setSide(next);
  };

  const rowClass = (i: number, tone: "light" | "dark") =>
    `flex h-14 items-center justify-center px-3 text-center text-[14px] transition-colors duration-300 ${
      hovered === i ? (tone === "dark" ? "bg-white/[0.06]" : "bg-mist") : ""
    } ${i > 0 ? (tone === "dark" ? "border-t border-white/[0.07]" : "border-t border-line") : ""}`;

  const column = (key: Side) => (
    <div className="rounded-[22px] border border-line bg-white px-2 pb-2">
      <p className="flex h-16 items-center justify-center text-[13.5px] font-[520] text-muted-foreground">{comparison.columns[key]}</p>
      {comparison.rows.map((row, i) => (
        <div key={row.label} className={`${rowClass(i, "light")} rounded-[12px] text-muted-foreground`} onPointerEnter={() => setHovered(i)}>
          {row[key]}
        </div>
      ))}
    </div>
  );

  return (
    <section id="compare" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="compare-title">
      <SectionIntro id="compare-title" align="center" badge={comparison.badge} title={comparison.title} description={comparison.description} />

      {/* Wide screens: the full table. */}
      <Reveal className="mt-16 max-lg:hidden">
        <table className="sr-only">
          <caption>{comparison.title}</caption>
          <thead>
            <tr>
              <td />
              <th scope="col">{comparison.columns.left}</th>
              <th scope="col">{site.brand.name}</th>
              <th scope="col">{comparison.columns.right}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.left}</td>
                <td>{row.shear}</td>
                <td>{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div aria-hidden="true" className="grid grid-cols-[1fr_1.1fr_1.2fr_1.1fr] items-start gap-3" onPointerLeave={() => setHovered(null)}>
          <div className="pt-[72px]">
            {comparison.rows.map((row, i) => (
              <div key={row.label} className={`${rowClass(i, "light")} !justify-start rounded-[12px] !px-4 font-[520] text-ink`} onPointerEnter={() => setHovered(i)}>
                {row.label}
              </div>
            ))}
          </div>
          {column("left")}
          <div className="-mt-4 rounded-[24px] bg-ink p-2 pb-4 text-white">
            <ShearHeader />
            <div className="mt-1">
              {comparison.rows.map((row, i) => (
                <div key={row.label} className={`${rowClass(i, "dark")} gap-2 rounded-[12px] font-[500]`} onPointerEnter={() => setHovered(i)}>
                  <Check aria-hidden="true" className="size-4 shrink-0 text-mint" strokeWidth={2.4} />
                  {row.shear}
                </div>
              ))}
            </div>
          </div>
          {column("right")}
        </div>
      </Reveal>

      {/* Phones and tablets: Shear beside one alternative. */}
      <Reveal className="mx-auto mt-12 max-w-[560px] lg:hidden">
        <div role="radiogroup" aria-label="Compare Shear with" className="relative mx-auto flex w-fit rounded-full border border-line bg-mist p-1">
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-0 rounded-full bg-white shadow-[0_0_0_1px_var(--line)]"
            style={{
              width: thumb.width,
              transform: `translateX(${thumb.left}px)`,
              transition: thumb.ready && !reduced ? `transform 520ms ${THROW}, width 420ms ${EASE}` : "none",
            }}
          />
          {(["left", "right"] as Side[]).map((key, i) => (
            <button
              key={key}
              ref={(el) => {
                toggleRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={side === key}
              onClick={() => choose(key)}
              className={`relative h-9 rounded-full px-4 text-[13px] font-[520] transition-colors duration-300 ${side === key ? "text-ink" : "text-muted-foreground"}`}
            >
              vs. {comparison.columns[key]}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="flex h-14 items-center justify-center gap-2 rounded-[16px] bg-ink text-white">
            <Mark className="size-5 text-mint" />
            <span className="text-[16px] font-[560] tracking-[-0.04em]">{site.brand.name.toLowerCase()}</span>
          </div>
          <div className="relative flex h-14 items-center justify-center overflow-hidden rounded-[16px] border border-line text-[13px] font-[520] text-muted-foreground">
            <span key={side} className="motion-safe:animate-[sh-slide-in_420ms_cubic-bezier(0.23,1,0.32,1)_both]" style={{ "--from": `${dir * 40}px` } as React.CSSProperties}>
              {comparison.columns[side]}
            </span>
          </div>
        </div>
        <dl className="mt-2 divide-y divide-line rounded-[18px] border border-line">
          {comparison.rows.map((row) => (
            <div key={row.label} className="px-4 py-3.5">
              <dt className="text-[12px] text-subtle">{row.label}</dt>
              <dd className="mt-1.5 grid grid-cols-2 gap-3 text-[14px] leading-snug">
                <span className="flex gap-1.5 font-[520] text-ink">
                  <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-mint-ink" strokeWidth={2.6} />
                  {row.shear}
                </span>
                <span className="relative overflow-hidden text-muted-foreground">
                  <span key={side} className="flex gap-1.5 motion-safe:animate-[sh-slide-in_420ms_cubic-bezier(0.23,1,0.32,1)_both]" style={{ "--from": `${dir * 28}px` } as React.CSSProperties}>
                    <Minus aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-subtle" strokeWidth={2.4} />
                    {row[side]}
                  </span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
