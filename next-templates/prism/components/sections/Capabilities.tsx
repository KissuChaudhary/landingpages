import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CanvasVisual,
  CollectionVisual,
  StylesVisual,
  ToneVisual,
} from "@/components/product/CapabilityVisuals";

const visuals = [StylesVisual, CollectionVisual, CanvasVisual, ToneVisual];
export function Capabilities() {
  return (
    <section
      className="section capabilities-section container"
      aria-labelledby="capabilities-title"
    >
      <SectionHeading {...site.capabilities} id="capabilities-title" />
      <div className="capability-grid">
        {site.capabilities.cards.map((card, i) => {
          const Visual = visuals[i];
          return (
            <article
              className={`capability-card capability-${i}`}
              key={card.title}
            >
              <div className="capability-copy">
                <span className="mono capability-index">0{i + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              <Visual />
            </article>
          );
        })}
      </div>
    </section>
  );
}
