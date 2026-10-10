import { site } from "@/site.config";
import { engagements } from "@/data/studio";
import { ButtonLink, Eyebrow, Multiline } from "../ui";
export function Engagements() {
  return (
    <section
      className="engagements wrapper section-pad"
      id="engagements"
      aria-labelledby="engagements-title"
    >
      <div className="section-intro">
        <div>
          <Eyebrow>{site.engagements.eyebrow}</Eyebrow>
          <h2 id="engagements-title" data-reveal>
            <Multiline text={site.engagements.title} />
          </h2>
        </div>
        <p>{site.engagements.description}</p>
      </div>
      <div className="engagement-list">
        {engagements.map((item, i) => (
          <article
            key={item.name}
            className={`engagement-row engagement-row-${i}`}
            data-reveal
          >
            <div className="engagement-name">
              <span className="eyebrow">
                {item.number} / {item.label}
              </span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <ul>
              {item.included.map((text) => (
                <li key={text}>
                  <span>+</span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="engagement-action">
              <p className="engagement-price">{item.price}</p>
              <span>{item.cadence}</span>
              <ButtonLink href={site.contactHref}>{item.cta}</ButtonLink>
            </div>
          </article>
        ))}
      </div>
      <p className="engagement-note">
        Final scope, production costs, and creator usage rights are agreed
        before we begin.
      </p>
    </section>
  );
}
