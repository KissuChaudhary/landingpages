"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import type { Topic } from "@/data/topics";
import { researchBrief } from "@/lib/content";
export function BriefActions({ topic }: { topic: Topic }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const [download, setDownload] = useState("");
  const text = researchBrief(topic);
  const fallback = useRef<HTMLTextAreaElement>(null);
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
  useEffect(() => {
    if (manual) fallback.current?.focus();
  }, [manual]);
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
      {manual && (
        <div className="manual-copy-panel">
          <p className="manual-copy-note">
            Clipboard access is unavailable here. Select and copy the complete
            brief below.
          </p>
          <textarea
            ref={fallback}
            className="manual-copy"
            aria-label="Complete research brief"
            readOnly
            value={text}
            onFocus={(event) => event.currentTarget.select()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setManual(false);
            }}
          />
          <button
            type="button"
            className="text-link"
            onClick={() => setManual(false)}
          >
            Hide
          </button>
        </div>
      )}
    </>
  );
}
