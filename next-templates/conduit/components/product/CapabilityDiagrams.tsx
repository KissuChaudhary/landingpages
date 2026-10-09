"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
  FileText,
  Layers3,
  MessageSquare,
  Sparkles,
  Webhook,
} from "lucide-react";
import { Mark } from "../ui/Brand";
export function DataDiagram() {
  return (
    <div className="cap-diagram data-diagram" aria-hidden="true">
      <div className="data-stack">
        {["Documents", "Database", "API", "Team notes"].map((name, i) => (
          <div
            className="glass-layer"
            style={{ "--layer": i } as React.CSSProperties}
            key={name}
          >
            {name}
          </div>
        ))}
      </div>
      <span className="diagram-wire" />
      <span className="data-hub">Context</span>
      <span className="diagram-wire" />
      <div className="data-output">
        <Mark />
      </div>
    </div>
  );
}
export function BuilderDiagram() {
  return (
    <div className="cap-diagram builder-diagram" aria-hidden="true">
      {[
        { label: "Trigger", text: "A new request", Icon: Webhook },
        { label: "Understand", text: "Read the context", Icon: Sparkles },
        { label: "Act", text: "Prepare a response", Icon: MessageSquare },
      ].map(({ label, text, Icon }) => (
        <div className="diagram-node" key={label}>
          <Icon size={17} />
          <div>
            <span>{label}</span>
            <strong>{text}</strong>
          </div>
        </div>
      ))}
      <span className="diagram-ready">
        <i />
        Ready when you are
      </span>
    </div>
  );
}
export function WorkflowDiagram() {
  return (
    <div className="cap-diagram orchestration-diagram" aria-hidden="true">
      <div className="orbit-path" />
      {[
        "Request received",
        "Context connected",
        "Decision prepared",
        "Human approved",
      ].map((name, i) => (
        <span className={`orbit-task orbit-${i}`} key={name}>
          <Check size={13} />
          {name}
        </span>
      ))}
      <span className="orbit-core">
        <Mark />
      </span>
    </div>
  );
}
export function ModelDiagram() {
  const [model, setModel] = useState(0);
  const models = ["Reasoning", "Language", "Vision", "Voice"];
  return (
    <div className="cap-diagram model-diagram">
      <span className="model-input">Your task</span>
      <i className="router-wire" />
      <span className="model-router">
        <Sparkles size={17} />
        Intelligent routing
      </span>
      <div className="model-branches" aria-hidden="true" />
      <div
        className="model-options"
        role="group"
        aria-label="Example model type"
      >
        {models.map((name, i) => (
          <button
            aria-pressed={model === i}
            key={name}
            onClick={() => setModel(i)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="model-selection">
        Route: {models[model].toLowerCase()} model
      </p>
    </div>
  );
}
const tools = [
  { name: "Documents", Icon: FileText },
  { name: "Messaging", Icon: MessageSquare },
  { name: "Database", Icon: Database },
  { name: "Webhooks", Icon: Webhook },
  { name: "Knowledge", Icon: Layers3 },
];
export function ToolsDiagram() {
  const [start, setStart] = useState(0);
  return (
    <div className="cap-diagram tools-diagram">
      <div className="tool-orbit">
        {[0, 1, 2].map((offset) => {
          const tool = tools[(start + offset) % tools.length];
          const Icon = tool.Icon;
          return (
            <div className="tool-object" key={`${start}-${offset}`}>
              <Icon size={28} strokeWidth={1.2} />
              <span>{tool.name}</span>
            </div>
          );
        })}
      </div>
      <div className="tool-controls">
        <button
          aria-label="Previous tool connections"
          onClick={() => setStart((start + tools.length - 1) % tools.length)}
        >
          <ArrowLeft size={16} />
        </button>
        <span aria-live="polite">{tools[start].name} and your toolkit</span>
        <button
          aria-label="Next tool connections"
          onClick={() => setStart((start + 1) % tools.length)}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
