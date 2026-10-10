import { site } from "@/site.config";
import { SectionHead, Reveal } from "@/components/ui/Primitives";
import { BrandMark } from "@/components/ui/Brand";
export function Integrations() {
  return (
    <section className="integrations section frame">
      <SectionHead {...site.integrations} />
      <div className="integration-network reveal">
        <div className="network-hub">
          <BrandMark />
          <span>A shared relationship layer</span>
        </div>
        <div className="network-wires" aria-hidden="true">
          <svg viewBox="0 0 1000 90" preserveAspectRatio="none">
            <path d="M500 0V32M166 90V48Q166 32 182 32H818Q834 32 834 48V90M500 32V90" />
          </svg>
          <span className="network-pulse" />
        </div>
        <div className="integration-grid">
          {site.integrations.items.map((item, index) => (
            <Reveal
              className="integration-tile"
              delay={index * 50}
              key={item.name}
            >
              <span className="tool-mark" style={{ color: item.color }}>
                {item.mark}
              </span>
              <b>{item.name}</b>
              <span>{item.category}</span>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="section-note">{site.integrations.note}</p>
    </section>
  );
}
