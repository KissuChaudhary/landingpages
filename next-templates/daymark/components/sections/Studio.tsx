import { site } from "@/site.config";
import { Mark } from "../ui/Brand";
import { Arrow } from "../ui/Arrow";
export function Studio() {
  return (
    <section className="studio section wrap">
      <div className="studio-main" data-reveal>
        <p className="eyebrow">
          <span />
          {site.studio.eyebrow}
        </p>
        <h2>{site.studio.title}</h2>
        <p className="studio-description">{site.studio.description}</p>
        <div className="studio-connection">
          <span>What people see</span>
          <Arrow />
          <span>Why they buy</span>
          <Arrow />
          <span>Why they return</span>
        </div>
      </div>
      <div className="principles" data-reveal>
        <Mark className="studio-mark" />
        {site.studio.principles.map((item, index) => (
          <div className="principle" key={item.title}>
            <span>0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
