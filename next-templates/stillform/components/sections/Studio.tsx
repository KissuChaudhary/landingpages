import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { BrandMark } from "@/components/ui/Brand";
import { Reveal } from "@/components/ui/Reveal";

export function Studio() {
  const { studio } = site;
  return (
    <section className="studio-section" id="studio">
      <div className="container">
        <Reveal className="studio-intro">
          <div>
            <p className="eyebrow">{studio.eyebrow}</p>
            <h2>
              {studio.lead}
              <br />
              <em>{studio.accent}</em>
            </h2>
            <BrandMark className="studio-star" />
          </div>
          <div>
            <p className="manifesto">{studio.manifesto}</p>
            <p className="studio-description">{studio.description}</p>
            <a href="#contact" className="text-link">
              Meet your next creative partner{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <Reveal className="principles">
          {studio.principles.map((item) => (
            <div key={item.number}>
              <span className="eyebrow">{item.number} /</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
