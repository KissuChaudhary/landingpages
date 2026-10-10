"use client";

import type { CSSProperties } from "react";
import { Check, FileAudio } from "lucide-react";
import { site } from "@/site.config";
import { useScrollProgress } from "../Motion";

// A pinned statement. As you scroll, its words light up and the unfinished project
// files scattered around it are pulled into one finished master.
const spots: [number, number][] = [
  [10, 22], [74, 18], [6, 52], [80, 50], [16, 78], [70, 80], [38, 12], [56, 86],
];

export function Statement() {
  const { statement } = site;
  const words = statement.text.split(" ");
  const ref = useScrollProgress<HTMLElement>(
    (p, el) => el.style.setProperty("--p", p.toFixed(3)),
    (el, vh) => ({ start: 0, distance: Math.max(1, el.offsetHeight - vh) }),
  );
  return (
    <section className="statement" ref={ref} aria-label="Why Bounce">
      <div className="statement-stage">
        {statement.files.slice(0, spots.length).map((file, i) => (
          <span
            key={file}
            className="file"
            aria-hidden="true"
            style={{ "--x": spots[i][0], "--y": spots[i][1], "--k": (i % 3) * 0.08 } as CSSProperties}
          >
            <FileAudio size={14} strokeWidth={2} />
            {file}
          </span>
        ))}
        <p className="statement-text" style={{ "--n": words.length } as CSSProperties}>
          {words.map((w, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
        <span className="master" aria-hidden="true">
          <span className="master-check">
            <Check size={14} strokeWidth={3} />
          </span>
          {statement.finished}
        </span>
      </div>
    </section>
  );
}
