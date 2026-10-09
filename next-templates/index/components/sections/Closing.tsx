import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Action } from "@/components/ui/Action";
import { AmbientField } from "@/components/motion/AmbientField";
import { Mark } from "@/components/ui/Mark";
export function Closing() {
  return (
    <section className="closing section" aria-labelledby="closing-heading">
      <AmbientField variant="accent" />
      <div className="container closing__inner">
        <div>
          <SectionBadge>{site.closing.badge}</SectionBadge>
          <h2 id="closing-heading">
            {site.closing.first}
            <br />
            {site.closing.accent}
          </h2>
          <p>{site.closing.description}</p>
          <Action href={site.links.app || "#examples"}>
            {site.closing.action}
          </Action>
        </div>
        <div className="closing-index" aria-hidden="true">
          <div className="closing-index__sheet">
            <span />
            <span />
            <span />
            <Mark />
          </div>
          <div className="closing-index__sheet">
            <span />
            <span />
            <span />
          </div>
          <div className="closing-index__sheet">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
