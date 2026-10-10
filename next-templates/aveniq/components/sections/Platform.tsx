import { site } from "@/site.config";
import { Label, Title } from "../ui";
import { SignalArt, ReasonArt, MoveArt } from "../FeatureArt";
export function Platform() {
  return (
    <section id="platform" className="platform section-shell section-space">
      <div className="section-heading">
        <Label>{site.platform.eyebrow}</Label>
        <div>
          <Title lines={site.platform.title} />
          <p className="section-description">{site.platform.description}</p>
        </div>
      </div>
      <div className="feature-grid">
        {site.platform.features.map((feature, index) => (
          <article
            className={`feature-card feature-${feature.type}`}
            key={feature.number}
            data-reveal
          >
            <div className="feature-visual">
              {index === 0 ? (
                <SignalArt />
              ) : index === 1 ? (
                <ReasonArt />
              ) : (
                <MoveArt />
              )}
            </div>
            <div className="feature-copy">
              <span className="feature-number">{feature.number} /</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
