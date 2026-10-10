import { site } from "@/site.config";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
export function Faq() {
  return (
    <section className="faq section-space container" id="faq">
      <div className="faq-heading" data-reveal>
        <SectionHeading
          label="A little clarity"
          title={"Before we\nsay hello."}
        />
        <p>
          Good questions make for good beginnings. Here's a little more about
          how we work.
        </p>
        <Button to="/contact" secondary>
          Something else on your mind?
        </Button>
      </div>
      <div className="faq-list" data-reveal>
        {site.faq.map((item, i) => (
          <details
            key={item.question}
            className="faq-item"
            name="studio-faq"
            open={i === 0}
          >
            <summary>
              <span className="faq-number">0{i + 1}</span>
              {item.question}
              <span className="plus" aria-hidden="true" />
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
