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
  ChevronDown,
} from "lucide-react";
import { describeRow, executeWorkflow, money, workflows } from "@/data/workflows";
import { WorkflowGraph } from "./WorkflowGraph";
import { downloadFile } from "@/lib/download";
const stages = [
  "Read the source",
  "Apply your rules",
  "Check the limits",
  "Prepare for review",
];
export function Workbench({
  initial = "match",
  expanded = false,
}: {
  initial?: string;
  expanded?: boolean;
}) {
  const [selected, setSelected] = useState(
    workflows.find((item) => item.id === initial)?.id || "match",
  );
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [tolerance, setTolerance] = useState(5);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [recordedAt, setRecordedAt] = useState("");
  const [details, setDetails] = useState(expanded);
  const id = useId();
  const workflow = workflows.find((item) => item.id === selected)!;
  const result = useMemo(
    () => executeWorkflow(workflow, tolerance),
    [workflow, tolerance],
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
  // Buttons elsewhere on the page ask the canvas for a step and its details.
  useEffect(() => {
    const show = (event: Event) => {
      const wanted = (event as CustomEvent<string>).detail;
      if (wanted && workflows.some((item) => item.id === wanted)) select(wanted);
      setDetails(true);
    };
    window.addEventListener("arclo:workbench", show);
    return () => window.removeEventListener("arclo:workbench", show);
  }, []);
  const receipt = () =>
    JSON.stringify(
      {
        workflow: workflow.label,
        createdAt: recordedAt,
        source: workflow.source,
        criteria: workflow.id === "match" ? { toleranceUSD: tolerance } : null,
        output: result,
        delivery: "Prepared locally; nothing was posted to a ledger.",
      },
      null,
      2,
    );
  return (
    <div className={`workbench ${expanded ? "workbench-expanded" : ""}`}>
      <div className="workbench-top">
        <span className="workspace-name">
          <span className="status-dot" />
          October close
        </span>
        <span className="workspace-meta">Sample entity</span>
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
        {details && (
          <div className="workbench-detail" id={`${id}-details`}>
            <div>
              <span className="detail-label">01 / THE SOURCE</span>
              <h3>See what came in.</h3>
              <p>{workflow.context}</p>
              <ul className="source-list">
                {workflow.source.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{describeRow(workflow, item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="detail-label">02 / THE RULES</span>
              <h3>
                {workflow.id === "match"
                  ? "Set your tolerance."
                  : "Decide what counts."}
              </h3>
              {workflow.id === "match" ? (
                <label className="threshold-label">
                  Match tolerance <output>{money(tolerance, true)}</output>
                  <input
                    aria-label="Match tolerance in dollars"
                    type="range"
                    min="0"
                    max="50"
                    value={tolerance}
                    onChange={(event) => {
                      reset();
                      setTolerance(Number(event.target.value));
                    }}
                  />
                  <span className="muted small">
                    Lines further off than this wait for a person.
                  </span>
                </label>
              ) : (
                <p>{workflow.rules}</p>
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
          <button
            className="details-toggle"
            aria-expanded={details}
            aria-controls={`${id}-details`}
            onClick={() => setDetails(!details)}
          >
            {details ? "Hide the rules" : "Source and rules"}
            <ChevronDown size={14} style={{ transform: details ? "rotate(180deg)" : "none" }} />
          </button>
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
            <span className="detail-label">PREPARED FOR REVIEW</span>
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
                  Nothing matches at this tolerance. Raise it to accept small
                  differences.
                </li>
              )}
            </ul>
            <p className="muted small">
              Processed {result.processed} sample records. Prepared locally;
              nothing was posted.
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
