"use client";
import { ArrowUpRight, Check, Download, FileCode2 } from "lucide-react";
import { getExample } from "@/data/examples";
import { ComponentDownload } from "@/components/ui/ComponentDownload";
import { DiffView } from "./DiffView";
import { useState } from "react";
export function WorkflowArt({ step }: { step: number }) {
  const example = getExample("signup");
  const [message, setMessage] = useState("");
  if (step === 0)
    return (
      <div className="workflow-request-art">
        <div className="request-card">
          <span className="eyebrow">A THOUGHT / 001</span>
          <ArrowUpRight className="request-card-arrow" size={22} />
          <p>{example.request}</p>
          <div>
            <span className="request-tag">Newsletter signup</span>
            <span className="request-card-time">READY TO EXPLORE</span>
          </div>
        </div>
        <span className="workflow-art-note">
          A CLEAR INTENTION GOES A LONG WAY.
        </span>
      </div>
    );
  if (step === 1)
    return (
      <div className="workflow-diff-art">
        <DiffView example={example} applied={false} />
      </div>
    );
  return (
    <div className="workflow-export-art">
      <div className="workflow-kept-file">
        <FileCode2 size={37} strokeWidth={1.2} />
        <div>
          <strong>{example.file}</strong>
          <span>REACT COMPONENT / WITH YOUR CHANGE</span>
        </div>
        <span className="kept-check">
          <Check size={16} />
        </span>
      </div>
      <ComponentDownload
        className="button button-dark"
        code={example.after}
        file={example.file}
        onDownload={() => setMessage("Signup.tsx export prepared.")}
        onUnavailable={() => setMessage("Export unavailable in this browser.")}
      >
        Keep the component
        <Download size={15} />
      </ComponentDownload>
      <p role="status">
        {message || "A real example file, ready to build on."}
      </p>
    </div>
  );
}
