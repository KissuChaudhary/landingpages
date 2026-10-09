import { Check, ArrowUpRight, CircleDot } from "lucide-react";
import type { Workflow } from "@/data/workflows";
import { ToolIcon } from "./ToolIcon";
export function WorkflowGraph({
  workflow,
  step,
}: {
  workflow: Workflow;
  step: number;
}) {
  const nodes = [
    { tool: "trigger", label: "Trigger", title: workflow.trigger },
    { tool: "rules", label: "Rules", title: workflow.engine },
    { tool: "check", label: "Condition", title: workflow.condition },
    { tool: workflow.tool, label: "Action", title: workflow.action },
  ];
  return (
    <div className="workflow-graph">
      <div className="graph-grid" aria-hidden="true" />
      <svg
        className="graph-connections"
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M125 90H875M375 90V250M235 250H655M655 90V250" />
        <path className={step > 0 ? "active-path" : ""} d="M125 90H875" />
      </svg>
      <div className="graph-main">
        {nodes.map((node, index) => (
          <div
            key={node.label}
            className={`flow-node ${step > index ? "node-complete" : ""} ${step === index + 1 && step < 4 ? "node-processing" : ""}`}
          >
            <ToolIcon name={node.tool} />
            <div>
              <span>{node.label}</span>
              <strong>{node.title}</strong>
            </div>
            <span className="node-dot">
              {step > index ? <Check size={13} /> : <CircleDot size={12} />}
            </span>
          </div>
        ))}
      </div>
      <div className="graph-tools">
        <div className="flow-node resource-node">
          <ToolIcon name="bank" small />
          <div>
            <span>Source</span>
            <strong>Bank and card feeds</strong>
          </div>
          <ArrowUpRight size={13} />
        </div>
        <div className="flow-node resource-node">
          <ToolIcon name="ledger" small />
          <div>
            <span>Ledger</span>
            <strong>Chart of accounts</strong>
          </div>
          <ArrowUpRight size={13} />
        </div>
        <div className="flow-node resource-node">
          <ToolIcon name="approval" small />
          <div>
            <span>Policy</span>
            <strong>Approval limits</strong>
          </div>
          <ArrowUpRight size={13} />
        </div>
      </div>
      <span className="canvas-label">EVERY NUMBER, ACCOUNTED FOR.</span>
    </div>
  );
}
