import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { Cover, Waveform } from "../ui/Art";

// A slow strip of tracks students finished. It pauses on hover and stands still with reduced motion.
export function TrackStrip() {
  const { tracks } = site;
  return (
    <section className="strip" aria-label={tracks.label}>
      <p className="strip-label" data-reveal="">
        <i aria-hidden="true" />
        {tracks.label}
      </p>
      <div className="marquee" data-reveal="" style={{ "--rd": "120ms" } as CSSProperties}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul className="marquee-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {tracks.items.map((t, i) => (
                <li className="track" key={t.title} style={{ "--a": t.colors[0] } as CSSProperties}>
                  <Cover colors={t.colors} />
                  <span className="track-meta">
                    <b>{t.title}</b>
                    <small>
                      {t.artist} · {t.genre}
                    </small>
                  </span>
                  <Waveform seed={i + 3} bars={16} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
