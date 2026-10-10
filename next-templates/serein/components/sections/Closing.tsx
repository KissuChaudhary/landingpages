import { site } from "@/site.config";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Ribbon } from "../visuals/Ribbon";
export function Closing() {
  return (
    <section className="closing dark-section">
      <Ribbon className="closing-ribbon" />
      <div className="container closing-inner" data-reveal>
        <Eyebrow>{site.closing.eyebrow}</Eyebrow>
        <h2>{site.closing.title}</h2>
        <p>{site.closing.description}</p>
        <Button to={site.links.booking || "/contact"} light>
          Start a conversation
        </Button>
      </div>
    </section>
  );
}
