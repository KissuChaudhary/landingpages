"use client";
import { useEffect, useState } from "react";
import { ArrowUp, Check, ChevronDown, Download, Sparkles } from "lucide-react";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
export function BuilderDemo() {
  const [key, setKey] = useState<BlueprintKey>("support");
  const [built, setBuilt] = useState(false);
  const [inspect, setInspect] = useState(false);
  // Buttons elsewhere on the page ask the builder to show a blueprint.
  useEffect(() => {
    const show = (event: Event) => {
      const wanted = (event as CustomEvent<BlueprintKey>).detail;
      if (wanted in blueprints) setKey(wanted);
      setBuilt(true);
      setInspect(true);
    };
    window.addEventListener("conduit:blueprint", show);
    return () => window.removeEventListener("conduit:blueprint", show);
  }, []);
  const exportBlueprint = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify({ example: true, ...blueprints[key] }, null, 2)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `conduit-${key}-blueprint.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="product-window builder-window" id="builder">
      <div className="window-title">
        <span className="micro">Agent builder</span>
        <span className="status-dot" />{" "}
        <span className="micro status-label">Example</span>
      </div>
      <div className="builder-content">
        <div className="agent-message">
          <span className="message-symbol">
            <Sparkles size={16} />
          </span>
          <p>What would you like your agent to do?</p>
        </div>
        <div className="user-message">{blueprints[key].prompt}</div>
        <div className="agent-message">
          <span className="message-symbol">
            <Sparkles size={16} />
          </span>
          <div className="created-agent">
            <strong>{blueprints[key].name}</strong>
            <p>{blueprints[key].tools.join(" · ")}</p>
            <span className={`build-status ${built ? "is-built" : ""}`}>
              <Check size={13} />
              {built ? "Blueprint ready to inspect" : "Human approval included"}
            </span>
          </div>
        </div>
      </div>
      <form
        className="builder-input"
        onSubmit={(e) => {
          e.preventDefault();
          setBuilt(true);
        }}
      >
        <label className="sr-only" htmlFor="blueprint-select">
          Choose an agent blueprint
        </label>
        <select
          id="blueprint-select"
          value={key}
          onChange={(e) => {
            setKey(e.target.value as BlueprintKey);
            setBuilt(false);
            setInspect(false);
          }}
        >
          {Object.entries(blueprints).map(([value, bp]) => (
            <option key={value} value={value}>
              {bp.name}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="select-chevron" aria-hidden="true" />
        <button type="submit" aria-label="Build example agent">
          <ArrowUp size={17} />
        </button>
      </form>
      {built && inspect && (
        <div className="blueprint-inline" id="builder-blueprint">
          <ol>
            {blueprints[key].steps.map((step) => (
              <li key={step}>
                <Check size={13} />
                {step}
              </li>
            ))}
          </ol>
          <p>
            <strong>Decision boundary</strong>
            {blueprints[key].rule}
          </p>
          <button type="button" onClick={exportBlueprint}>
            <Download size={13} />
            Export blueprint
          </button>
        </div>
      )}
      {built && (
        <button
          className="window-footer-action"
          aria-expanded={inspect}
          aria-controls="builder-blueprint"
          onClick={() => setInspect(!inspect)}
        >
          {inspect ? "Hide the blueprint" : "Inspect the blueprint"}
          <ArrowUp size={14} style={{ transform: inspect ? "none" : "rotate(180deg)" }} />
        </button>
      )}
    </div>
  );
}
