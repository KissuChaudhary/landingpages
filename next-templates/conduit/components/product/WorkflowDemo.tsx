"use client";
import { useEffect, useState } from "react";
import { Check, Play, RotateCcw, ArrowDownToLine } from "lucide-react";
import { workflowReceipt, workflowSteps } from "@/data/blueprints";
export function WorkflowDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [download, setDownload] = useState("");
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () => setStep((value) => Math.min(4, value + 1)),
      750,
    );
    return () => clearInterval(timer);
  }, [running]);
  useEffect(() => {
    if (step === 4) setRunning(false);
  }, [step]);
  useEffect(() => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(workflowReceipt, null, 2)], {
        type: "application/json",
      }),
    );
    setDownload(url);
    return () => URL.revokeObjectURL(url);
  }, []);
  return (
    <div className="product-window workflow-window">
      <div className="window-title">
        <span className="micro">Lead routing</span>
        <span className="status-dot" />
        <span className="micro status-label">
          {running ? "Running" : step === 4 ? "Complete" : "Ready"}
        </span>
      </div>
      <ol className="workflow-list">
        {workflowSteps.map((item, i) => (
          <li
            className={
              step > i ? "complete" : running && step === i ? "working" : ""
            }
            key={item}
          >
            <span className="step-icon">
              {step > i ? <Check size={13} /> : <span>{i + 1}</span>}
            </span>
            <span>{item}</span>
            <span className="step-state">
              {step > i
                ? "Done"
                : running && step === i
                  ? "Working"
                  : "Waiting"}
            </span>
          </li>
        ))}
      </ol>
      <div className="workflow-progress">
        <div>
          <span className="micro">Progress</span>
          <span className="micro">{step * 25}%</span>
        </div>
        <progress value={step} max={4} aria-label="Workflow progress" />
      </div>
      <div className="workflow-controls">
        {step === 4 ? (
          <>
            <button
              onClick={() => {
                setStep(0);
                setRunning(false);
              }}
            >
              <RotateCcw size={13} />
              Reset
            </button>
            <a href={download || undefined} download="conduit-example-run.json">
              <ArrowDownToLine size={13} />
              Run receipt
            </a>
          </>
        ) : (
          <>
            <span className="fine-print">
              Local example · no external actions
            </span>
            <button disabled={running} onClick={() => setRunning(true)}>
              <Play size={13} />
              {running ? "Running" : "Run example"}
            </button>
          </>
        )}
      </div>
      <div className="sr-only" role="status">
        {step === 4
          ? "Example complete. Aster Studio is ready for review. Download the run receipt."
          : running
            ? `${step} of 4 steps completed.`
            : "Example ready."}
      </div>
    </div>
  );
}
