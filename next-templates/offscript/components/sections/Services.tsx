import { site } from "@/site.config";
import { Label, Title } from "../ui";
import { asset } from "@/lib/links";
export function Services() {
  return (
    <section
      id="services"
      className="services wrap section-pad"
      aria-labelledby="services-title"
    >
      <Label>{site.services.eyebrow}</Label>
      <Title lines={site.services.title} id="services-title" />
      <div className="capabilities">
        {site.services.items.map((item, index) => (
          <article
            key={item.title}
            className={`capability capability-${index}`}
            data-reveal
          >
            <div className="capability-poster" aria-hidden="true">
              <span className="poster-index">OS / 0{index + 1}</span>
              {index === 0 ? (
                <>
                  <span className="poster-question">
                    what
                    <br />
                    if<span>?</span>
                  </span>
                  <svg
                    className="question-ring"
                    viewBox="0 0 250 100"
                    fill="none"
                  >
                    <path
                      d="M235 55C258 14 142 2 68 13S-2 60 25 80s173 15 198-11C250 40 175 9 76 10"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                  </svg>
                </>
              ) : index === 1 ? (
                <>
                  <span className="poster-make">
                    MAKE
                    <br />
                    IT FELT.
                  </span>
                  <img
                    src={asset("/images/sip.webp")}
                    alt=""
                    loading="lazy"
                    width="1024"
                    height="1536"
                  />
                </>
              ) : (
                <>
                  <span className="poster-travel">
                    good
                    <br />
                    ideas
                    <br />
                    <em>travel.</em>
                  </span>
                  <span className="poster-route">↗</span>
                </>
              )}
            </div>
            <div className="capability-top">
              <span>
                0{index + 1} / {item.short}
              </span>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
            <ul>
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
