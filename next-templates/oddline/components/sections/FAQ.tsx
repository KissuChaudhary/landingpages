import { site } from "@/site.config";
import { Label } from "../ui";
export function FAQ() {
  return (
    <section className="faq wrap section-pad" aria-labelledby="faq-title">
      <div>
        <Label>A few things, before we start</Label>
        <h2 id="faq-title" data-reveal>
          Glad you
          <br />
          <span className="muted-line">asked.</span>
        </h2>
      </div>
      <div className="faq-list">
        {site.faq.map((item, index) => (
          <details key={item.question}>
            <summary>
              <span>0{index + 1}</span>
              <h3>{item.question}</h3>
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
