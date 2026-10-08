import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function FAQ() {
  return (
    <section
      className="faq-section container section"
      id="questions"
      aria-label="A few good questions"
    >
      <SectionIntro
        label="A little clarity"
        title={
          <>
            A few good
            <br />
            <em>questions.</em>
          </>
        }
      />
      <div className="faq-list">
        {site.faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={17} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
