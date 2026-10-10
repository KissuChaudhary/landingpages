import { site } from "@/site.config";
import { Mark } from "@/components/ui/Brand";
import { Check } from "@/components/ui/Icons";

// Not a vendor: the usual way and ours, row by row. As each row arrives the usual way is
// struck through and ours checks in, on a lime column that runs the full height.

export function Compare() {
  const { compare } = site;
  const rows = compare.them.items.map((them, i) => ({ them, us: compare.us.items[i] }));
  return (
    <section className="section compare" aria-labelledby="compare-title">
      <div className="container compare-inner">
        <div className="compare-titles">
          <span className="tag" data-reveal>
            {compare.label}
          </span>
          <h2 id="compare-title" className="h2 compare-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {compare.title}
          </h2>
        </div>
        <div className="ledger" role="table" aria-label={compare.title}>
          <span className="ledger-column" aria-hidden="true" />
          <div className="ledger-row ledger-head" role="row">
            <span role="columnheader" className="ledger-them">
              {compare.them.label}
            </span>
            <span role="columnheader" className="ledger-us">
              <Mark size={26} />
              <span className="brand-name">{site.brand}</span>
            </span>
          </div>
          {rows.map((row, i) => (
            <div key={row.them} className="ledger-row js-draw" role="row" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <span role="cell" className="ledger-them">
                <span className="ledger-strike">{row.them}</span>
              </span>
              <span role="cell" className="ledger-us">
                <span className="ledger-tick">
                  <Check size={12} />
                </span>
                {row.us}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
