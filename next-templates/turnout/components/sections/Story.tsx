"use client";

import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useScrollProgress, type Range } from "@/components/Motion";
import { StatRoll } from "@/components/ui/NumberRoll";
import { Thread } from "@/components/ui/Thread";

// The mission statement lights up word by word as it scrolls into the middle of the
// screen, then two proof rows, each a photo with a figure and a short argument.

const statementRange: Range = (el, vh) => ({ start: vh * 0.85, distance: el.offsetHeight + vh * 0.35 });

function Statement({ text }: { text: string }) {
  const words = text.split(" ");
  const ref = useScrollProgress<HTMLParagraphElement>((p, el) => el.style.setProperty("--p", p.toFixed(4)), statementRange);
  return (
    <p ref={ref} className="h2 statement">
      {words.map((word, i) => (
        <span key={i} className="statement-word" style={{ "--w": (i / words.length).toFixed(3) } as React.CSSProperties}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export function Story() {
  const { mission, proof } = site;
  return (
    <section className="story" aria-labelledby="mission-label">
      <div className="container mission">
        <span id="mission-label" className="tag" data-reveal>
          {mission.label}
        </span>
        <Statement text={mission.statement} />
      </div>

      <Thread
        className="thread-a"
        viewBox="0 0 600 520"
        d="M330 10C300 120 210 190 140 210 60 232 20 180 64 134 118 80 214 140 196 250 178 360 70 430 -20 470"
      />

      <div className="container proof">
        {proof.map((row, i) => (
          <article key={row.title} className={`proof-row ${i % 2 ? "is-flipped" : ""}`}>
            <figure className="proof-media" data-reveal="mask">
              <span className="proof-frame">
                <img src={asset(row.image)} alt={row.alt} width={944} height={944} loading="lazy" />
              </span>
              <figcaption className="proof-stat" data-accent={row.accent}>
                <span className="proof-figure">
                  <StatRoll value={row.stat.value} decimals={row.stat.value % 1 ? 1 : 0} suffix={row.stat.suffix} />
                </span>
                <span className="proof-label">{row.stat.label}</span>
              </figcaption>
            </figure>
            <div className="proof-copy">
              <h3 className="h2 proof-title lines" data-reveal>
                <span className="line">
                  <span>{row.title}</span>
                </span>
              </h3>
              <p className="lead" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
                {row.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Thread
        className="thread-b"
        tone="iris"
        viewBox="0 0 420 640"
        d="M440 30C330 40 250 120 270 230 286 320 380 330 384 260 388 190 300 170 250 240 190 330 230 470 120 620"
      />
    </section>
  );
}
