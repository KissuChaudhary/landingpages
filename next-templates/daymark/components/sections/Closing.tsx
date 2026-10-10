import { site } from "@/site.config";
import { Button } from "../ui/Button";
import { Mark } from "../ui/Brand";
export function Closing() {
  return (
    <section className="closing wrap">
      <div data-reveal>
        <p className="eyebrow">
          <span />
          {site.closing.eyebrow}
        </p>
        <h2>{site.closing.title}</h2>
        <p>{site.closing.description}</p>
        <Button to={site.links.booking || "/contact"} light>
          {site.closing.action}
        </Button>
      </div>
      <div className="closing-art" data-loop aria-hidden="true">
        <div className="closing-ring ring-one" />
        <div className="closing-ring ring-two" />
        <div className="closing-ring ring-three" />
        <Mark />
      </div>
    </section>
  );
}
