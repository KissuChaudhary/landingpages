import { ArrowUpRight, Fingerprint, Eye, CircleCheck } from "lucide-react";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
const icons = [Fingerprint, Eye, CircleCheck];

export function Control() {
  const c = site.control;
  return (
    <section
      className="control section container"
      aria-labelledby="control-title"
    >
      <div className="control-layout">
        <SectionIntro id="control-title" eyebrow={c.eyebrow} title={c.title} />
        <div className="control-items">
          {c.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.number} delay={i * 80}>
                <article>
                  <span className="control-icon">
                    <Icon size={23} strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="mono">{item.number}</span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Reveal>
        <div className="control-receipt">
          <span className="receipt-check">
            <CircleCheck size={19} />
          </span>
          <span>
            Ready when you are. <strong>Nothing moves without your say.</strong>
          </span>
          <a href="#workflow" aria-label="See the review workflow">
            <ArrowUpRight size={19} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
