import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  return (
    <section className="section container faq-section" id="faq">
      <Reveal>
        <p className="eyebrow">{site.faq.eyebrow}</p>
        <h2>
          {site.faq.lead}
          <br />
          <em>{site.faq.accent}</em>
        </h2>
        <a href="#contact" className="text-link">
          Ask us something else ↗
        </a>
      </Reveal>
      <div className="faq-list">
        {site.faq.items.map((item, index) => (
          <details key={item.question} name="stillform-faq">
            <summary>
              <span className="eyebrow">0{index + 1}</span>
              <h3>{item.question}</h3>
              <Plus size={19} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
