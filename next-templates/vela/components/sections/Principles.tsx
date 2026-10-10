import { Users, CheckCheck, Search, ChartNoAxesCombined } from "lucide-react";
import { site } from "@/site.config";
import { Reveal, SectionHead } from "@/components/ui/Primitives";
const icons = [Users, CheckCheck, Search, ChartNoAxesCombined];
export function Principles() {
  return (
    <section className="principles section frame">
      <SectionHead {...site.principles} align="left" />
      <div className="principle-grid">
        {site.principles.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal
              className="principle-card"
              key={item.title}
              delay={index * 60}
            >
              <span className="principle-icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <span className="principle-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
