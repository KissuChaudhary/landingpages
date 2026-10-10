import { Sun, Droplets, Leaf, Flower2 } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { SectionHeading, TextLink } from "../ui/Primitives";
const icons = { sun: Sun, drop: Droplets, pot: Flower2, leaf: Leaf };
export function Care() {
  return (
    <section id="care" className="care section-pad" data-care>
      <div className="wrap">
        <SectionHeading {...site.care} centered />
        <div className="care-garden">
          <div className="care-specimen" aria-hidden="true">
            <div className="care-orbit" />
            <img src={asset("/images/rubber.webp")} alt="" loading="lazy" />
            <span>Small rituals. New leaves.</span>
          </div>
          {site.care.benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon as keyof typeof icons];
            return (
              <div
                key={benefit.title}
                className={`care-benefit benefit-${index}`}
                data-reveal
              >
                <div className="benefit-label">
                  <Icon size={23} strokeWidth={1} />
                  <span>{benefit.number}</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </div>
            );
          })}
        </div>
        <div className="care-link">
          <TextLink to="/care">A little plant wisdom</TextLink>
        </div>
      </div>
    </section>
  );
}
