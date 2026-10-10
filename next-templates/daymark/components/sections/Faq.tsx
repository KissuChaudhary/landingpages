import { site } from "@/site.config";
export function Faq() {
  return (
    <section className="faq section wrap">
      <div data-reveal>
        <p className="eyebrow">
          <span />A few useful answers
        </p>
        <h2>
          Before we
          <br />
          say hello.
        </h2>
        <p>
          Good collaborations begin
          <br />
          with clear expectations.
        </p>
      </div>
      <div className="faq-list" data-reveal>
        {site.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <span aria-hidden="true" className="faq-plus" />
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
