import { site } from "@/site.config";
export function FAQ() {
  return (
    <section className="faq section-pad wrap">
      <div data-reveal>
        <p className="eyebrow">A few things you might be wondering</p>
        <h2>
          Let's clear <br />
          <em>a little space.</em>
        </h2>
      </div>
      <div className="faq-list" data-reveal>
        {site.faqs.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
