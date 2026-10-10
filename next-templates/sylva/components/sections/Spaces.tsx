import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { spaces } from "@/data/spaces";
import { asset, href } from "@/lib/urls";
import { SectionHeading } from "../ui/Primitives";
export function Spaces() {
  return (
    <section id="spaces" className="spaces section-pad wrap">
      <div className="spaces-heading">
        <SectionHeading {...site.spaces} />
        <p className="small-note">
          Every room has a story.
          <br />
          Give yours a greener chapter.
        </p>
      </div>
      <div className="spaces-grid">
        {spaces.map((space, index) => (
          <a
            key={space.slug}
            href={href(`/spaces/${space.slug}`)}
            className={`space-card space-${index}`}
            data-reveal
          >
            <div className="space-image">
              <img
                src={asset(space.image)}
                alt={`Considered greenery ${space.name.toLowerCase()}`}
                loading="lazy"
              />
              <span className="space-index">
                {space.number} / {space.name}
              </span>
              <span className="space-arrow">
                <ArrowUpRight size={22} strokeWidth={1.3} />
              </span>
            </div>
            <div className="space-caption">
              <h3>{space.label}</h3>
              <span>{space.name}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
