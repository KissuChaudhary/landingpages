"use client";

import * as React from "react";
import { site } from "@/site.config";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useScrollProgress } from "@/components/motion/Motion";
import { Tag } from "@/components/ui/Primitives";

/*
 * DRAWN TO SCALE: each row is two bars, theirs and ours, on the same scale.
 *   grow     their bar is drawn across the page as the row rises into view, and its
 *            figure rolls up as it lands
 *   us       then ours drops in: at this scale it is a hairline
 * Scroll back up and the bars retract. Reduced motion: everything drawn from the start.
 */

type Row = (typeof site.scale.rows)[number];

const cut = (them: number, us: number) => (us === 0 ? "None at all" : `${(Math.round((1 - us / them) * 1000) / 10).toLocaleString(site.locale)}% less`);

function ScaleRow({ row, index }: { row: Row; index: number }) {
  const [landed, setLanded] = React.useState(false);
  const ref = useScrollProgress<HTMLLIElement>(
    (p, el) => {
      const grow = Math.min(1, p / 0.78);
      const eased = 1 - Math.pow(1 - grow, 3);
      el.style.setProperty("--g", eased.toFixed(4));
      el.style.setProperty("--u", Math.min(1, Math.max(0, (p - 0.78) / 0.22)).toFixed(4));
      setLanded((l) => (l === p > 0.62 ? l : p > 0.62));
    },
    { start: 0.96, end: 0.42 },
  );
  const share = row.them ? row.us / row.them : 0;
  const decimals = (n: number) => (n % 1 ? 1 : 0);

  return (
    <li ref={ref} className="scale-row" style={{ "--w": share.toFixed(5), "--k": index } as React.CSSProperties}>
      <div className="scale-meta">
        <span className="scale-label">{row.label}</span>
        <span className="scale-cut">{cut(row.them, row.us)}</span>
      </div>
      <div className="scale-track">
        <div className="scale-bar is-them">
          <span className="scale-fill" />
          <span className="scale-value">
            <NumberRoll value={landed ? row.them : 0} locales={site.locale} format={{ maximumFractionDigits: decimals(row.them) }} />
            {row.unit ? <span className="scale-unit">{row.unit}</span> : null}
          </span>
        </div>
        <div className="scale-bar is-us">
          <span className="scale-fill" />
          <span className="scale-value">
            {row.us.toLocaleString(site.locale, { maximumFractionDigits: decimals(row.us) })}
            {row.unit ? <span className="scale-unit">{row.unit}</span> : null}
            <em>{site.brand.name}</em>
          </span>
        </div>
      </div>
      <span className="sr-only">
        {site.scale.legend.them}: {row.them} {row.unit}. {site.brand.name}: {row.us} {row.unit}.
      </span>
    </li>
  );
}

export function Scale() {
  const { scale } = site;
  return (
    <section id="weight" className="section scale" aria-labelledby="scale-title">
      <div className="wrap">
        <div className="scale-head">
          <Tag>{scale.tag}</Tag>
          <h2 id="scale-title" className="h2" data-reveal>
            {scale.title}
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {scale.body}
          </p>
          <div className="scale-legend" data-reveal style={{ "--d": "140ms" } as React.CSSProperties} aria-hidden="true">
            <span>
              <i className="is-them" />
              {scale.legend.them}
            </span>
            <span>
              <i className="is-us" />
              {scale.legend.us}
            </span>
          </div>
        </div>
        <ul className="scale-rows">
          {scale.rows.map((row, i) => (
            <ScaleRow key={row.label} row={row} index={i} />
          ))}
        </ul>
        <p className="scale-foot">{scale.footnote}</p>
      </div>
    </section>
  );
}
