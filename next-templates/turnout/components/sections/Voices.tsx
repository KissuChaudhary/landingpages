import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Star } from "@/components/ui/Icons";

// Client notes: one featured quote with a portrait and four shorter ones.

function Stars() {
  return (
    <span className="stars" aria-label="Five out of five">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ "--i": i } as React.CSSProperties}>
          <Star size={14} />
        </span>
      ))}
    </span>
  );
}

export function Voices() {
  const { voices } = site;
  return (
    <section className="section voices" aria-labelledby="voices-title">
      <div className="container">
        <div className="section-head center">
          <span className="tag" data-reveal>
            {voices.label}
          </span>
          <h2 id="voices-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {voices.title}
          </h2>
        </div>
        <div className="voices-grid">
          <figure className="voice is-featured" data-reveal>
            <span className="voice-photo">
              <img src={asset(voices.featured.image)} alt={voices.featured.name} width={704} height={944} loading="lazy" />
            </span>
            <div className="voice-body">
              <Stars />
              <blockquote>
                <p className="voice-title">{voices.featured.title}</p>
                <p className="voice-quote">{voices.featured.quote}</p>
              </blockquote>
              <figcaption className="voice-who">
                <strong>{voices.featured.name}</strong>
                <span>{voices.featured.role}</span>
              </figcaption>
            </div>
          </figure>
          {voices.items.map((v, i) => (
            <figure key={v.name} className="voice" data-reveal style={{ "--d": `${(i % 3) * 90 + 90}ms` } as React.CSSProperties}>
              <div className="voice-body">
                <Stars />
                <blockquote>
                  <p className="voice-title">{v.title}</p>
                  <p className="voice-quote">{v.quote}</p>
                </blockquote>
                <figcaption className="voice-who has-avatar">
                  <img src={asset(v.avatar)} alt="" width={96} height={96} loading="lazy" />
                  <span>
                    <strong>{v.name}</strong>
                    <span>{v.role}</span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
