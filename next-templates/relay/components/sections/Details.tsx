import { site } from "@/site.config";
import { FeatureVisual } from "@/components/product/FeatureVisual";
import { GridSection } from "@/components/ui/GridSection";
export function Details() {
  return (
    <GridSection
      className="details-section"
      hatch
      id="details"
      aria-labelledby="details-title"
    >
      <div className="section-introduction">
        <h2 id="details-title">{site.details.title}</h2>
        <p>{site.details.description}</p>
      </div>
      <div className="feature-grid">
        {site.details.rows.map((row, index) => (
          <article className="feature-cell" key={row.title}>
            <FeatureVisual index={index} />
            <div className="feature-copy">
              <h3>{row.title}</h3>
              <p>{row.text}</p>
            </div>
          </article>
        ))}
      </div>
    </GridSection>
  );
}
