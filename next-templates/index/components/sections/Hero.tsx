import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Action } from "@/components/ui/Action";
import { AccentReveal } from "@/components/motion/AccentReveal";
import { ResearchScene } from "@/components/product/ResearchScene";
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <SectionBadge>{site.hero.badge}</SectionBadge>
      <div className="hero__intro">
        <h1 id="hero-heading">
          {site.hero.first}
          <br />
          <AccentReveal>{site.hero.accent}</AccentReveal>
        </h1>
        <div className="hero__aside">
          <p>{site.hero.description}</p>
          <Action href={site.links.app || "#research"}>
            {site.hero.action}
          </Action>
          <a className="text-link" href="#how-it-works">
            See how it comes together <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div id="research">
        <ResearchScene />
      </div>
    </section>
  );
}
