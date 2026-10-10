import { asset } from "@/lib/urls";
import type { Project } from "@/data/projects";
/** Real DOM compositions: type, geometry, and interfaces remain editable. */
export function ProjectArt({ kind }: { kind: Project["art"] }) {
  if (kind === "orra")
    return (
      <div className="project-art art-orra" aria-hidden="true">
        <span className="art-wordmark">
          orra<span>®</span>
        </span>
        <div className="orra-orbit">
          <div className="orra-disc">
            <span>Make room.</span>
            <span className="orra-time">08:24</span>
            <span>For a better day.</span>
            <i />
          </div>
        </div>
        <p className="art-caption">
          A little space.
          <br />A new perspective.
        </p>
        <span className="art-corner">A DAILY RITUAL / 01</span>
      </div>
    );
  if (kind === "counter")
    return (
      <div className="project-art art-counter" aria-hidden="true">
        <span className="art-wordmark">
          counter<span>↗</span>
        </span>
        <div className="counter-app">
          <div className="counter-sidebar">
            <b>c↗</b>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="counter-main">
            <span className="counter-greeting">A clearer picture.</span>
            <div className="counter-balance">
              <small>Available balance</small>
              <strong>
                £24,680<span>.00</span>
              </strong>
              <small>↗ Your next move, made simpler.</small>
            </div>
            <div className="counter-chart">
              {[35, 48, 42, 64, 52, 73, 69, 90, 81, 105, 98, 125].map(
                (n, i) => (
                  <i key={i} style={{ height: n }} />
                ),
              )}
            </div>
            <div className="counter-row">
              <span>Recent activity</span>
              <span>View all ↗</span>
            </div>
            <div className="counter-transaction">
              <b>↗</b>
              <span>
                Design partnership<small>Invoice paid · Today</small>
              </span>
              <strong>+ £3,200</strong>
            </div>
          </div>
        </div>
        <span className="art-corner">INDEPENDENT BY DESIGN</span>
      </div>
    );
  if (kind === "forma")
    return (
      <div className="project-art art-forma" aria-hidden="true">
        <img src={asset("/images/hero.webp")} alt="" loading="lazy" />
        <span className="art-wordmark">Forma.</span>
        <div className="forma-title">
          Space,
          <br />
          <i>considered.</i>
        </div>
        <div className="forma-footer">
          <span>
            ARCHITECTURE
            <br />& THE IN-BETWEEN
          </span>
          <span>EXPLORE THE PRACTICE ↗</span>
        </div>
      </div>
    );
  return (
    <div className="project-art art-goodwell" aria-hidden="true">
      <span className="art-wordmark">
        goodwell<span>✳</span>
      </span>
      <div className="goodwell-circle">
        <span>
          Good care.
          <br />
          <i>Closer.</i>
        </span>
      </div>
      <div className="goodwell-card">
        <span className="goodwell-icon">✳</span>
        <div>
          <b>A good place to begin.</b>
          <span>Find the right care for you.</span>
        </div>
        <span>↗</span>
      </div>
      <span className="art-corner">A MORE HUMAN KIND OF HEALTHCARE</span>
    </div>
  );
}
