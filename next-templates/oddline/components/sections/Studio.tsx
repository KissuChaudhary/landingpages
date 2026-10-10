import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Arrow, Label, Star } from "../ui";
export function Studio() {
  const words = site.studio.statement.split(" ");
  return (
    <section
      id="studio"
      className="studio section-pad"
      aria-labelledby="studio-statement"
    >
      <div className="wrap">
        <Label>{site.studio.eyebrow}</Label>
        <div className="studio-grid">
          <div className="studio-statement" data-statement>
            <h2 id="studio-statement">
              {words.map((word, index) => (
                <span
                  key={index}
                  style={{ "--word": index / words.length } as CSSProperties}
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <div className="studio-bottom">
              <p>{site.studio.description}</p>
              <a className="text-link" href={contact()}>
                Meet your creative partner <Arrow diagonal />
              </a>
            </div>
          </div>
          <aside className="studio-note" data-reveal>
            <span>THE ODDLINE WAY</span>
            <Star />
            <p>{site.studio.note}</p>
            <span className="studio-note-signature">a little out of the ordinary.</span>
          </aside>
        </div>
        <div className="studio-principles">
          {site.studio.principles.map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <p>{item}</p>
              <Arrow diagonal size={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
