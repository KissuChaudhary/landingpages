import { site } from "@/site.config";
import { Mark } from "@/components/ui/Brand";
import { Check } from "@/components/ui/Icons";

// Two cards, side by side and slightly askew: the usual way and ours. They swing into
// place as they arrive; pointing at one straightens it and brings it forward.

export function Compare() {
  const { compare } = site;
  return (
    <section className="section compare" aria-labelledby="compare-title">
      <div className="container">
        <h2 id="compare-title" className="h2 compare-title" data-reveal>
          {compare.title}
        </h2>
        <div className="compare-pair">
          <div className="compare-card is-them" data-reveal>
            <h3 className="compare-head">{compare.them.label}</h3>
            <ul>
              {compare.them.items.map((item) => (
                <li key={item}>
                  <span className="compare-tick">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-card is-us" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            <h3 className="compare-head">
              <Mark size={30} />
              <span className="brand-name">{site.brand}</span>
            </h3>
            <ul>
              {compare.us.items.map((item, i) => (
                <li key={item} style={{ "--i": i } as React.CSSProperties}>
                  <span className="compare-tick">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
