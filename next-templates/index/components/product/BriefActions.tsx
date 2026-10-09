"use client";
import { useEffect, useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import type { Topic } from "@/data/topics";
import { researchBrief } from "@/lib/content";
import { Dialog } from "@/components/ui/Dialog";
import { useCallback } from "react";
export function BriefActions({ topic }: { topic: Topic }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const [download, setDownload] = useState("");
  const text = researchBrief(topic);
  const close = useCallback(() => setManual(false), []);
  useEffect(() => {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    setDownload(url);
    setStatus("");
    return () => URL.revokeObjectURL(url);
  }, [text]);
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 2500);
    return () => clearTimeout(timer);
  }, [status]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Brief copied");
    } catch {
      setManual(true);
    }
  };
  return (
    <>
      <div className="brief-actions">
        <button type="button" onClick={copy}>
          {status ? <Check size={16} /> : <Copy size={16} />}
          {status || "Copy brief"}
        </button>
        <a
          href={download || undefined}
          download={`index-${topic.id}-brief.txt`}
          aria-disabled={!download}
        >
          <Download size={16} />
          Export .txt
        </a>
        <span className="sr-only" role="status">
          {status}
        </span>
      </div>
      <Dialog open={manual} onClose={close} title="Copy your research brief">
        <p className="manual-copy-note">
          Clipboard access is unavailable here. Select and copy the complete
          brief below.
        </p>
        <textarea
          className="manual-copy"
          aria-label="Complete research brief"
          readOnly
          value={text}
          onFocus={(event) => event.currentTarget.select()}
        />
      </Dialog>
    </>
  );
}
