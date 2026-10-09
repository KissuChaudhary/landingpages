import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { AppButton, Art } from "../ui/Primitives";
import { InboxPreview } from "../product/InboxPreview";
export function Hero() {
  return (
    <section id="hero" className="hero container">
      <div className="hero-copy">
        <a href={href("/updates")} className="announcement">
          <span>{site.brand} notes</span>
          {site.hero.announcement}
          <ArrowRight size={15} />
        </a>
        <h1>
          {site.hero.heading.map((line, i) => (
            <span
              className={i ? "muted-line" : ""}
              style={{ "--line": i } as React.CSSProperties}
              key={line}
            >
              {line}
            </span>
          ))}
        </h1>
        <p>{site.hero.text}</p>
        <AppButton>{site.hero.cta}</AppButton>
      </div>
      <div className="hero-stage">
        <Art eager />
        <div className="hero-inbox">
          <InboxPreview />
        </div>
      </div>
    </section>
  );
}
