import { site } from "@/site.config";
import { sales } from "@/lib/links";
import { Button, Label, Title } from "../ui";
export function FAQ() {
  return (
    <section className="faq section-shell section-space">
      <div className="faq-intro">
        <Label>{site.faq.eyebrow}</Label>
        <Title lines={site.faq.title} />
        <p>Still have something on your mind?</p>
        <Button href={sales()} variant="text">
          Talk it through with us
        </Button>
      </div>
      <div className="faq-list">
        {site.faq.items.map((item) => (
          <details key={item.question}>
            <summary>
              <span>{item.question}</span>
              <span className="faq-plus" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
