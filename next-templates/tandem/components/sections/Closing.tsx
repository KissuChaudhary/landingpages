import { site } from "@/site.config";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { AgentSculpture } from "@/components/motion/AgentSculpture";
import { SignupForm } from "./SignupForm";

export function Closing() {
  return (
    <section id="start" className="closing" aria-labelledby="closing-title">
      <div className="closing-sculpture">
        <AgentSculpture compact />
      </div>
      <div className="container closing-copy">
        <Reveal>
          <p className="eyebrow">
            <span />
            GOOD WORK. GREAT COMPANY.
          </p>
        </Reveal>
        <RevealText
          id="closing-title"
          text={site.closing.title}
          className="closing-title"
        />
        <Reveal delay={100}>
          <p>{site.closing.description}</p>
        </Reveal>
        <Reveal delay={200}>
          <SignupForm />
        </Reveal>
      </div>
      <span className="closing-coordinate">
        YOUR AMBITION × OUR INTELLIGENCE
      </span>
    </section>
  );
}
