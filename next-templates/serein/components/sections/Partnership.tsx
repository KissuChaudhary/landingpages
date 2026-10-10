import { site } from "@/site.config";
import { SectionHeading } from "../ui/SectionHeading";
import { Orbit } from "../visuals/Orbit";
import { Arrow } from "../ui/Arrow";
export function Partnership() {
  return (
    <section className="partnership section-space container">
      <div className="partnership-visual" data-reveal>
        <Orbit />
        <div className="visual-coordinates">
          <span>51°30′26″N</span>
          <span>CONNECTED / EVERYWHERE</span>
        </div>
      </div>
      <div className="partnership-copy" data-reveal>
        <SectionHeading
          label={`Why ${site.brand}`}
          title={site.partnership.title}
        />
        <p>{site.partnership.description}</p>
        <ul>
          {site.partnership.values.map((value) => (
            <li key={value}>
              <Arrow diagonal={false} />
              {value}
            </li>
          ))}
        </ul>
        <div className="partnership-signature">
          <span className="signature-mark">{site.brand.charAt(0)}.</span>
          <div>
            <strong>Independent by design.</strong>
            <span>Thoughtful in every detail.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
