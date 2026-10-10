import { site } from "@/site.config";
import { Tag } from "@/components/ui/Primitives";

/*
 * THE REST: a hairline grid of smaller features.
 *   arrive   the grid's lines draw themselves, then each cell rises in a diagonal
 *            wave and its icon draws its own strokes
 *   point    the cell you point at lifts its icon a little
 * Icons are inline strokes (pathLength 1), so they draw without a library.
 */

// Each icon is a list of strokes; every stroke draws itself (pathLength 1).
const icons: Record<string, string[]> = {
  funnel: ["M3.5 5h17l-6.5 7.5V19l-4 1.5v-8z"],
  tag: ["M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.7 6.7a1.4 1.4 0 0 1-2 0z", "M8.2 8.2h.01"],
  share: ["M8.6 10.7 15.4 7M8.6 13.3l6.8 3.7", "M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  team: ["M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6", "M16 4.3a3.5 3.5 0 0 1 0 6.4", "M18.5 14.4c1.8.8 3 2.9 3 5.6"],
  export: ["M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5", "M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"],
  shield: ["M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z", "m8.8 12 2.2 2.2 4.2-4.4"],
  bot: ["M6 8.5h12a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.5a2 2 0 0 1 2-2z", "M12 8.5V5", "M9 14h.01M15 14h.01", "M3 21 21 3"],
  search: ["M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z", "m16 16 5 5"],
  globe: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M3 12h18", "M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"],
};

function Icon({ name }: { name: string }) {
  const strokes = icons[name] ?? icons.funnel;
  return (
    <svg className="spec-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, i) => (
          <path key={i} d={d} pathLength={1} className="draw" style={{ "--s": i } as React.CSSProperties} />
        ))}
      </g>
    </svg>
  );
}

export function Spec() {
  const { spec } = site;
  return (
    <section className="section spec" aria-labelledby="spec-title">
      <div className="wrap">
        <div className="spec-head">
          <Tag>{spec.tag}</Tag>
          <h2 id="spec-title" className="h2" data-reveal>
            {spec.title}
          </h2>
        </div>
        <ul className="spec-grid" data-reveal="lines">
          {spec.items.map((item, i) => (
            <li key={item.title} className="spec-cell" data-reveal style={{ "--d": `${((i % 3) + Math.floor(i / 3)) * 90 + 200}ms` } as React.CSSProperties}>
              <Icon name={item.icon} />
              <h3 className="spec-title">{item.title}</h3>
              <p className="spec-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
