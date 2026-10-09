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
            <MessagesSquare size={14} />A little clarity
          </span>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p>
            A few things to know before your first idea becomes a working flow.
          </p>
          <div className="faq-contact">
            <AvatarStack />
            <h3>Still thinking it through?</h3>
            <p>We’re happy to help you find a starting point.</p>
            <Button secondary href={route("/contact")}>
              Let’s talk
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
