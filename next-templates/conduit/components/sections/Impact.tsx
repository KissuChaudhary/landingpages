import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
export function Impact() {
  return (
    <Frame className="section impact" id="impact">
      <SectionHead label={site.impact.label} title={site.impact.title} />
      <div className="impact-board" data-reveal>
        <div className="impact-plot">
          <div className="impact-metrics">
            <div>
              <strong>
                4<span> steps</span>
              </strong>
              <p>One connected example workflow</p>
            </div>
            <div>
              <strong>
                100<span>%</span>
              </strong>
              <p>Visible from intake to handoff</p>
            </div>
          </div>
          <svg
            viewBox="0 0 900 320"
            className="impact-graphic"
            role="img"
            aria-label="A blue flow line connects four glass workflow stages"
          >
            <defs>
              <linearGradient id="bar" x1="0" y1="0" x2="0.2" y2="1">
                <stop stopColor="#1a49ff" stopOpacity=".38" />
                <stop offset="1" stopColor="#1647ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="line">
                <stop stopColor="#7cbdff" />
                <stop offset=".7" stopColor="#1746ff" />
                <stop offset="1" stopColor="#97c5ff" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((n) => (
              <g key={n}>
                <path
                  d={`M${60 + n * 205} ${220 - n * 40}l75 -35 100 25 -75 35z`}
                  fill="#1746ff"
                  fillOpacity=".15"
                />
                <path
                  d={`M${60 + n * 205} ${220 - n * 40}l100 25v${100 + n * 40}h-100z`}
                  fill="url(#bar)"
                />
                <path
                  d={`M${160 + n * 205} ${245 - n * 40}l75 -35v${135 + n * 40}h-75z`}
                  fill="url(#bar)"
                  fillOpacity=".65"
                />
              </g>
            ))}
            <path
              className="impact-flow"
              d="M20 246C105 290 162 225 239 237S327 172 437 191S540 140 631 149S768 40 873 70"
              fill="none"
              stroke="url(#line)"
              strokeWidth="3"
            />
            {[0, 1, 2, 3].map((n) => (
              <circle
                key={n}
                cx={110 + n * 205}
                cy={253 - n * 51}
                r="5"
                fill="#1746ff"
              />
            ))}
          </svg>
        </div>
        <div className="impact-caption">
          <div>
            <h3>{site.impact.subtitle}</h3>
            <p>{site.impact.description}</p>
          </div>
          <div className="impact-result">
            <strong>1</strong>
            <p>
              Final decision.
              <br />
              Still yours.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
