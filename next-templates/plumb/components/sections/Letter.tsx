"use client";

import { site } from "@/site.config";
import { useScrollProgress } from "@/components/motion/Motion";
import { Tag } from "@/components/ui/Primitives";

/*
 * A NOTE FROM THE MAKER: a short letter, signed as you read it.
 *   read     each paragraph brightens as it reaches the middle of the screen
 *   sign     the signature is one pen stroke that writes itself in step with your
 *            scroll; scroll back and the ink lifts
 * Replace SIGNATURE with your own: sign on a tablet, export the stroke as an SVG path
 * (one path, no fill) and paste its d attribute here.
 */

const SIGNATURE =
  "M34 104C46 82 60 50 70 30C74 22 80 18 82 24C84 32 74 60 64 84C58 98 54 108 58 110C62 112 70 100 76 90C82 80 86 76 88 80C90 86 84 98 86 102C88 96 96 80 104 78C112 76 110 90 112 98C114 106 122 104 130 96C138 88 146 78 144 74C142 70 134 74 132 84C130 96 138 106 150 104C160 102 170 92 178 82C182 77 190 72 192 77C194 83 182 88 184 96C186 104 180 112 168 110C160 109 156 104 160 102C196 96 252 90 340 62";

function Paragraph({ text, index }: { text: string; index: number }) {
  const ref = useScrollProgress<HTMLParagraphElement>((p, el) => el.style.setProperty("--lit", p.toFixed(3)), { start: 0.85, end: 0.55 });
  return (
    <p ref={ref} className="letter-p" style={{ "--k": index } as React.CSSProperties}>
      {text}
    </p>
  );
}

export function Letter() {
  const { letter } = site;
  const sign = useScrollProgress<HTMLDivElement>((p, el) => el.style.setProperty("--ink", p.toFixed(4)), { start: 0.92, end: 0.5 });

  return (
    <section className="section letter" aria-labelledby="letter-title">
      <div className="wrap letter-grid">
        <div className="letter-head">
          <Tag>{letter.tag}</Tag>
          <h2 id="letter-title" className="h2 letter-hello" data-reveal>
            {letter.greeting}
          </h2>
          <span className="letter-avatar" aria-hidden="true" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            {letter.name
              .split(/\s+/)
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>

        <div className="letter-body">
          {letter.paragraphs.map((text, i) => (
            <Paragraph key={i} text={text} index={i} />
          ))}
          <div ref={sign} className="letter-sign">
            <svg viewBox="0 0 380 150" fill="none" role="img" aria-label={`Signed, ${letter.name}`}>
              <path d={SIGNATURE} pathLength={1} className="letter-ink" />
            </svg>
            <p className="letter-name">
              <b>{letter.name}</b>
              <span>{letter.role}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="letter-facts">
          {letter.facts.map((fact, i) => (
            <div key={fact.value} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
