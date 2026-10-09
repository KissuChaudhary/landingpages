"use client";
import { useState } from "react";
import { Download, FileCode2 } from "lucide-react";
import { examples } from "@/data/examples";
import { ComponentDownload } from "@/components/ui/ComponentDownload";
import { site } from "@/site.config";
export function ExportPreview() {
  const [id, setId] = useState("signup");
  const [message, setMessage] = useState("");
  const example = examples.find((item) => item.id === id) || examples[0];
  return (
    <div className="export-demo">
      <div className="export-file" aria-hidden="true">
        <span className="export-fold" />
        <FileCode2 size={27} strokeWidth={1.3} />
        <strong>.tsx</strong>
      </div>
      <label className="export-selector">
        <span className="sr-only">Component to export</span>
        <select
          value={id}
          onChange={(event) => {
            setId(event.target.value);
            setMessage("");
          }}
        >
          {examples.map((item) => (
            <option key={item.id} value={item.id}>
              {item.file}
            </option>
          ))}
        </select>
      </label>
      <ComponentDownload
        className="text-link"
        code={example.after}
        file={example.file}
        onDownload={() => setMessage(`${example.file} export prepared.`)}
        onUnavailable={() => setMessage("Export unavailable in this browser.")}
      >
        {site.features.export.action}
        <Download size={14} />
      </ComponentDownload>
      <p role="status" className="export-status">
        {message || "The changed example. One actual file."}
      </p>
    </div>
  );
}
