import { site, appHref } from "@/site.config";
import { href } from "@/lib/urls";
import { ArrowUpRight } from "lucide-react";
import { SectionHead, Art } from "../ui/Primitives";
import { Scene } from "../product/Scenes";
export function Features() {
  return (
    <section className="features section container" id="features">
      <SectionHead label={site.features.label} lines={site.features.heading} />
      <div className="feature-grid">
        {site.features.items.map((item, i) => (
          <article
            key={item.scene}
            data-reveal
            style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <a
              className="feature-visual"
              href={href(
                appHref(
                  item.scene === "answer"
                    ? "inbox"
                    : item.scene === "knowledge"
                      ? "knowledge"
                      : "triage",
                ),
              )}
              aria-label={`Explore: ${item.title}`}
            >
              <Art name={i === 1 ? "petal" : "blossom"} />
              <Scene type={item.scene} />
              <span className="feature-arrow">
                <ArrowUpRight size={17} />
              </span>
            </a>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
