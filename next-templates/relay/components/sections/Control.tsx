import { Check, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { GridSection } from "@/components/ui/GridSection";
export function Control() {
  return (
    <GridSection
      className="control-section"
      innerClassName="control-layout"
      aria-labelledby="control-title"
    >
      <div>
        <h2 id="control-title">{site.control.title}</h2>
        <p>{site.control.description}</p>
        <a className="quiet-link" href="#workspace">
          Choose your context
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="control-list">
        <ul>
          {site.control.items.map((item) => (
            <li key={item}>
              <Check size={22} />
              {item}
            </li>
          ))}
        </ul>
        <p>{site.control.note}</p>
      </div>
    </GridSection>
  );
}
