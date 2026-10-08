'use client';

import React, { useState } from 'react';

export default function CopyCommand({ commands }: { commands: string[] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the commands stay selectable.
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-neutral-200 px-4 py-3">
      <pre className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-mono text-[13px] leading-6 text-neutral-900">
        <code>
          {commands.map((line) => (
            <span key={line} className="block">
              <span className="select-none text-neutral-400">$ </span>
              {line}
            </span>
          ))}
        </code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 pt-0.5 text-xs text-neutral-500 transition-colors hover:text-neutral-950"
        aria-live="polite"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
