"use client";
import { useEffect, useId, useMemo, useState } from "react";
import {
  Play,
  RotateCcw,
  Download,
  Check,
  Copy,
  LoaderCircle,
  ArrowRight,
  CircleCheck,
} from "lucide-react";
import { executeWorkflow, workflows } from "@/data/workflows";
import { WorkflowGraph } from "./WorkflowGraph";
import { downloadFile } from "@/lib/download";
const stages = [
  "Read source records",
  "Apply agent instructions",
  "Check conditions",
  "Prepare output",
];
export function Workbench({
  initial = "leads",
  expanded = false,
}: {
  initial?: string;
  expanded?: boolean;
}) {
  const [selected, setSelected] = useState(
    workflows.find((item) => item.id === initial)?.id || "leads",
  );
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [minimum, setMinimum] = useState(10);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [recordedAt, setRecordedAt] = useState("");
  const id = useId();
  const workflow = workflows.find((item) => item.id === selected)!;
  const result = useMemo(
    () => executeWorkflow(workflow, minimum),
    [workflow, minimum],
  );
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      setStep((value) => value + 1);
      if (step === 3) {
        setRunning(false);
        setRecordedAt(new Date().toISOString());
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [step, running]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  const reset = () => {
    setRunning(false);
    setStep(0);
    setCopied(false);
    setCopyError(false);
    setRecordedAt("");
  };
  const select = (value: string) => {
    reset();
    setSelected(value);
  };
  const receipt = () =>
    JSON.stringify(
      {
        workflow: workflow.label,
        createdAt: recordedAt,
        source: workflow.source,
        criteria: workflow.id === "leads" ? { minimumTeam: minimum } : null,
        output: result,
        delivery: "Prepared locally; no messages sent.",
      },
      null,
      2,
    );
  return (
    <div className={`workbench ${expanded ? "workbench-expanded" : ""}`}>
      <div className="workbench-top">
        <span className="workspace-name">
          <span className="status-dot" />
          Your first workflow
        </span>
        <span className="workspace-meta">Example workspace</span>
        <div
          className="workbench-tabs"
          role="tablist"
          aria-label="Workflow examples"
        >
          {workflows.map((item, index) => (
            <button
              key={item.id}
              id={`${id}-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected === item.id}
              aria-controls={`${id}-panel`}
              tabIndex={selected === item.id ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (index + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  select(workflows[next].id);
                  document
                    .getElementById(`${id}-${workflows[next].id}`)
                    ?.focus();
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${selected}`}
      >
        <WorkflowGraph workflow={workflow} step={step} />
        {expanded && (
          <div className="workbench-detail">
            <div>
              <span className="detail-label">01 / THE CONTEXT</span>
              <h3>Start with something real.</h3>
              <p>{workflow.prompt}</p>
              <ul className="source-list">
                {workflow.source.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>
                      {item.team > 0 ? `${item.team} people · ` : ""}
                      {item.need}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="detail-label">02 / THE INSTRUCTIONS</span>
              <h3>
                {workflow.id === "leads"
                  ? "Define a good fit."
                  : "Give every step a purpose."}
              </h3>
              {workflow.id === "leads" ? (
                <label className="threshold-label">
                  Minimum team size <output>{minimum} people</output>
                  <input
                    aria-label="Minimum team size"
                    type="range"
                    min="1"
                    max="30"
                    value={minimum}
                    onChange={(event) => {
                      reset();
                      setMinimum(Number(event.target.value));
                    }}
                  />
                  <span className="muted small">
                    Needs must mention automation or qualification.
                  </span>
                </label>
              ) : (
                <p>
                  {workflow.id === "inbox"
                    ? "Urgent messages become priorities. Team updates stay together. Newsletters can wait."
                    : "Turn the three sample onboarding tasks into a simple, numbered first-day checklist."}
                </p>
              )}
              <div className="run-log" aria-label="Workflow log">
                {stages.map((stage, index) => (
                  <p key={stage}>
                    {step > index ? (
                      <CircleCheck size={15} />
                    ) : (
                      <span className="log-dot" />
                    )}
                    {stage}
                    <span>{step > index ? "Complete" : "Waiting"}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="workbench-bottom">
        <div role="status" aria-live="polite">
          {running ? (
            <>
              <LoaderCircle size={14} className="spin" />
              {stages[Math.min(step, 3)]}…
            </>
          ) : step === 4 ? (
            <>
              <Check size={15} />
              {result.title} · output ready
            </>
          ) : (
            <>
              <span className="status-dot" />
              Ready when you are
            </>
          )}
        </div>
        <div className="run-actions">
          {step > 0 && (
            <button
              className="icon-button"
              aria-label="Reset workflow"
              onClick={reset}
            >
              <RotateCcw size={16} />
            </button>
          )}
          <button
            className="run-button"
            disabled={running}
            onClick={() => {
              reset();
              setRunning(true);
            }}
          >
            {running ? (
              <LoaderCircle size={14} className="spin" />
            ) : (
              <Play size={13} fill="currentColor" />
            )}
            {step === 4 ? "Run again" : "Run workflow"}
          </button>
        </div>
      </div>
      {step === 4 && (
        <div className="workflow-result">
          <div>
            <span className="detail-label">PREPARED OUTPUT</span>
            <h3>{result.title}</h3>
            <ul>
              {result.items.length ? (
                result.items.map((item) => (
                  <li key={item}>
                    <ArrowRight size={14} />
                    {item}
                  </li>
                ))
              ) : (
                <li>
                  No leads match these criteria. Lower the minimum team size to
                  broaden the result.
                </li>
              )}
            </ul>
            <p className="muted small">
              Processed {result.processed} sample records. Prepared locally; no
              messages sent.
            </p>
          </div>
          <div className="result-actions">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    result.items.join("\n") || result.title,
                  );
                  setCopied(true);
                  setCopyError(false);
                } catch {
                  setCopyError(true);
                }
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
              {copied ? "Copied" : "Copy output"}
            </button>
            <button
              onClick={() =>
                downloadFile(`arclo-${selected}-run.json`, receipt())
              }
            >
              <Download size={15} /> Save run
            </button>
            {copyError && (
              <span role="status" className="small">
                Copy unavailable. Use Save run.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
