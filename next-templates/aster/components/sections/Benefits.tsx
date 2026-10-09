import { site } from "@/site.config";
import { SectionHead, Art, AppButton } from "../ui/Primitives";
import { Scene } from "../product/Scenes";
export function Benefits() {
  return (
    <section className="benefits section container">
      <SectionHead label={site.benefits.label} lines={site.benefits.heading} />
      <div className="benefit-stack">
        {site.benefits.items.map((item, i) => (
          <article
            className="benefit-panel"
            key={item.scene}
            style={{ "--panel": i } as React.CSSProperties}
          >
            <div className="benefit-visual">
              <Art name={item.art} />
              <Scene type={item.scene} />
            </div>
            <div className="benefit-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <AppButton view={item.view}>{item.cta}</AppButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
