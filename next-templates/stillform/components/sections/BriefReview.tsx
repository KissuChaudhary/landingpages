"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/site.config";
import { emailDraft, type ContactDetails } from "@/lib/brief";

export function BriefReview({
  details,
  brief,
  onEdit,
}: {
  details: ContactDetails;
  brief: string;
  onEdit: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("Brief copied to clipboard.");
    } catch {
      setCopyStatus(
        "Copy is unavailable here. Download the brief or open an email draft.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "stillform-project-brief.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div
      className="brief-review"
      role="region"
      aria-labelledby="brief-review-title"
      tabIndex={-1}
    >
      <span className="brief-ready">
        <Check size={20} aria-hidden="true" />
      </span>
      <h3 id="brief-review-title">{site.contact.successTitle}</h3>
      <p>{site.contact.successText}</p>
      <pre>{brief}</pre>
      <Button href={emailDraft(details, brief)}>Open email draft</Button>
      <div className="brief-tools">
        <button onClick={copy}>
          <Copy size={15} aria-hidden="true" />
          Copy brief
        </button>
        <button onClick={download}>
          <Download size={15} aria-hidden="true" />
          Download .txt
        </button>
        <button onClick={onEdit}>Edit brief</button>
      </div>
      <p className="copy-status" role="status">
        {copyStatus}
      </p>
    </div>
  );
}
