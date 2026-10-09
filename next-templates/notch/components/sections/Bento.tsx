import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Icon, SectionTitle } from "../ui/Primitives";

// Four product moments. Cards slide in from alternating sides; the product image
// inside each one rises in a beat later and lifts slightly on hover.
const sizes: Record<string, [number, number]> = {
  "/images/timesheet.webp": [760, 463],
  "/images/timer.webp": [500, 452],
  "/images/capacity.webp": [500, 362],
  "/images/approvals.webp": [760, 326],
};

export function Bento() {
  const { bento } = site;
  return (
    <section className="section bento-section" id="product">
      <div className="container">
        <SectionTitle lines={bento.heading} />
        <div className="bento">
          {bento.items.map((item, i) => {
            const [w, h] = sizes[item.image] ?? [760, 460];
            return (
              <article
                key={item.title}
                className={`bento-card${item.wide ? " is-wide" : ""}`}
                data-reveal=""
                style={{ "--rx": i % 2 ? "56px" : "-56px", "--ry": "0px", "--rd": `${(i % 2) * 90}ms` } as CSSProperties}
              >
                <div className="bento-copy">
                  <span className="icon-tile">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
                <div className="bento-media" data-reveal="" style={{ "--ry": "48px", "--rd": "220ms" } as CSSProperties}>
                  <img src={asset(item.image)} width={w} height={h} alt={item.alt} loading="lazy" decoding="async" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
