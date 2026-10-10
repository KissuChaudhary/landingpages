import { site } from "@/site.config";
import { Eyebrow } from "../ui";
export function FAQ() {
  return (
    <section className="faq wrapper section-pad" aria-labelledby="faq-title">
      <div>
        <Eyebrow>A few good questions</Eyebrow>
        <h2 data-reveal id="faq-title">
          Glad
          <br />
          you asked.
        </h2>
        <p>
          Still curious?
          <br />
          <a href={`mailto:${site.email}`}>Send us a note ↗</a>
        </p>
      </div>
      <div className="faq-list">
        {site.faqs.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
