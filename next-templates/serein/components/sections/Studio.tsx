import { site } from "@/site.config";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Spark } from "../ui/Brand";
export function Studio() {
  return (
    <section
      className="studio section-space container"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="studio-statement frame" data-reveal>
        <Eyebrow>The studio</Eyebrow>
        <div>
          <h2 id="studio-title">{site.studio.statement}</h2>
          <div className="studio-description">
            <p>{site.studio.description}</p>
            <Button to="/contact">Get to know us</Button>
          </div>
        </div>
        <Spark className="frame-spark spark-top" />
        <Spark className="frame-spark spark-bottom" />
      </div>
      <div className="studio-principles">
        {site.studio.principles.map((principle, i) => (
          <div
            key={principle.value}
            data-reveal
            style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <span className="tiny-number">0{i + 1}</span>
            <h3>{principle.value}</h3>
            <span>{principle.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
