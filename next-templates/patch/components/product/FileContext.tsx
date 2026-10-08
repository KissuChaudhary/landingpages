"use client";
import { useState } from "react";
import {
  ChevronRight,
  FileCode2,
  FileText,
  Folder,
  Palette,
} from "lucide-react";
const files = [
  {
    name: "Signup.tsx",
    icon: FileCode2,
    lines: ["export function Signup() {", "  return <form>…</form>;", "}"],
  },
  {
    name: "tokens.css",
    icon: Palette,
    lines: [":root {", "  --canvas: #fafaf7;", "  --accent: #dceb99;", "}"],
  },
  {
    name: "README.md",
    icon: FileText,
    lines: [
      "# A good place to start",
      "A small component.",
      "A few good possibilities.",
    ],
  },
];
export function FileContext() {
  const [selected, setSelected] = useState(0);
  const file = files[selected];
  return (
    <div className="file-context">
      <div className="file-folder">
        <ChevronRight size={12} />
        <Folder size={14} />
        <span>your-next-idea</span>
      </div>
      <div
        className="file-context-tree"
        role="group"
        aria-label="Example files"
      >
        {files.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <Icon size={13} />
              <span>{item.name}</span>
              <span className="file-dot">{selected === index ? "●" : ""}</span>
            </button>
          );
        })}
      </div>
      <div className="file-excerpt" aria-live="polite">
        <span>{file.name} / EXCERPT</span>
        <pre>
          <code>{file.lines.join("\n")}</code>
        </pre>
      </div>
    </div>
  );
}
