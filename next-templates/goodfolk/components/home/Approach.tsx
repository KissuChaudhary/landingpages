import { site } from "@/site.config";
import { capabilities } from "@/data/studio";
import { Eyebrow, Mark } from "../ui";
export function Approach() {
  return (
    <section
      className="approach section-pad"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="wrapper">
        <Eyebrow>{site.approach.eyebrow}</Eyebrow>
        <div className="manifesto">
          <h2 id="approach-title" aria-label={site.approach.headline} data-word-reveal>
            {site.approach.headline.split(" ").map((word, i) => (
              <span data-word key={i}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className="manifesto-aside">
            <Mark />
            <p>{site.approach.description}</p>
          </div>
        </div>
        <div className="capabilities">
          {capabilities.map((item, i) => (
            <article
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              key={item.number}
            >
              <span className="capability-number">({item.number})</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="tags">
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="approach-bottom">
          <span>{site.approach.closing}</span>
          <span>Strategy ↗ Creation ↗ Connection</span>
        </div>
      </div>
    </section>
  );
}
