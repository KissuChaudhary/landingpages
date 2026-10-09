import { ArrowRight, MessagesSquare } from "lucide-react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Section, Button } from "../ui/Primitives";
import { AvatarStack } from "../ui/Portrait";
export function Faq() {
  return (
    <Section id="faq" className="faq-section">
      <div className="faq-grid">
        <div className="faq-intro reveal">
          <span className="eyebrow">
            <MessagesSquare size={14} />Before you start
          </span>
          <h2>
            What finance teams
            <br />
            ask us first.
          </h2>
          <p>
            Straight answers on systems, controls and audit.
          </p>
          <div className="faq-contact">
            <AvatarStack />
            <h3>Something we didn’t cover?</h3>
            <p>Walk us through your close and we’ll show you where to start.</p>
            <Button secondary href={route("/contact")}>
              Book a walkthrough
            </Button>
          </div>
        </div>
        <div className="faq-list">
          {site.faq.map((item, index) => (
            <details
              className="surface faq-item reveal"
              key={item.question}
              open={index === 0}
            >
              <summary>
                <span className="faq-arrow">
                  <ArrowRight size={17} />
                </span>
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
