"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="faq section light">
      <div>
        <Eyebrow>{site.faq.eyebrow}</Eyebrow>
        <Title lines={site.faq.title} />
      </div>
      <div className="faq-list">
        {site.faq.items.map((item, i) => (
          <article
            className={`faq-item ${active === i ? "faq-open" : ""}`}
            key={item.question}
          >
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              aria-hidden={active !== i}
              className="faq-answer"
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
