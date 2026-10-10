import { site } from "@/site.config";
import { asset } from "@/lib/urls";

// Client notes: one quote set large on the left, and a column of shorter notes on the
// right that drifts upward on its own and holds while you read it.

export function Voices() {
  const { voices } = site;
  return (
    <section className="section voices" aria-labelledby="voices-title">
      <div className="container voices-inner">
        <div className="voices-lead">
          <span className="tag" data-reveal>
            {voices.label}
          </span>
          <h2 id="voices-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {voices.title}
          </h2>
          <figure className="voices-feature" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            <span className="voices-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              <p className="voices-headline">{voices.featured.title}</p>
              <p className="lead">{voices.featured.quote}</p>
            </blockquote>
            <figcaption className="voices-who">
              <img src={asset(voices.featured.image)} alt="" width={128} height={128} loading="lazy" />
              <span>
                <strong>{voices.featured.name}</strong>
                <span>{voices.featured.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="voices-feed" data-reveal="fade" style={{ "--d": "200ms" } as React.CSSProperties}>
          <ul className="voices-track">
            {[0, 1].map((copy) =>
              voices.items.map((v) => (
                <li key={`${copy}-${v.name}`} className="note" aria-hidden={copy === 1}>
                  <p className="note-title">{v.title}</p>
                  <p className="note-quote">{v.quote}</p>
                  <p className="note-who">
                    <img src={asset(v.avatar)} alt="" width={80} height={80} loading="lazy" />
                    <span>
                      <strong>{v.name}</strong>
                      <span>{v.role}</span>
                    </span>
                  </p>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
