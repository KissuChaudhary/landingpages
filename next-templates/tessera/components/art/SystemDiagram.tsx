import { Arrow } from "@/components/ui";
export function SystemDiagram({
  nodes,
  color = "mint",
}: {
  nodes: string[];
  color?: string;
}) {
  return (
    <div
      className={`system-diagram tone-${color}`}
      aria-label={`Workflow: ${nodes.join(" to ")}`}
    >
      <div className="diagram-grid" aria-hidden="true" />
      <span className="diagram-caption mono">
        SYSTEM MAP / 4 CONNECTED STEPS
      </span>
      <div className="diagram-nodes">
        {nodes.map((node, i) => (
          <div className="diagram-step" key={node}>
            <span className="diagram-node">
              <span className="node-symbol" aria-hidden="true">
                {i === 3 ? (
                  <svg viewBox="0 0 24 24">
                    <path
                      d="m5 12 4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <span />
                )}
              </span>
              <span>{node}</span>
              <small className="mono">0{i + 1}</small>
            </span>
            {i < nodes.length - 1 && (
              <span className="diagram-connector">
                <Arrow />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="diagram-footer mono">
        <span>EXAMPLE ARCHITECTURE</span>
        <span>
          HUMAN IN THE LOOP <i />
        </span>
      </div>
    </div>
  );
}
