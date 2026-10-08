import { Plus } from "lucide-react";
import { site } from "@/site.config";
export function FAQ() {
  const content = site.faq;
  return (
    <section
      id="questions"
      className="grid-section faq-section"
      aria-label="Before you begin"
    >
      <div className="faq-heading">
        <p className="eyebrow">+ {content.eyebrow}</p>
        <h2>
          {content.title}
          <br />
          <span className="subtle-heading">{content.emphasis}</span>
        </h2>
        <a className="text-link" href={`mailto:${site.links.email}`}>
          {site.footer.contact} ↗
        </a>
      </div>
      <div className="faq-list">
        {content.items.map((item, index) => (
          <details key={item.question}>
            <summary>
              <span className="faq-index">0{index + 1}</span>
              <span>{item.question}</span>
              <Plus size={17} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
