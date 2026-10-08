"use client";

import * as React from "react";
import { AlertCircle, File, FileCode, FileText, Image as ImageIcon, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * ATTACHMENT CHIP: a file on its way into a prompt
 *
 *   uploading   a progress ring fills around the file icon
 *   processing  uploaded; the model is reading it
 *   ready       type and size; can be removed
 *   error       what went wrong, with Retry
 *
 * Images show a thumbnail. The remove button appears on hover or
 * focus, and is always visible on touch screens.
 * ───────────────────────────────────────────────────────── */

export type AttachmentStatus = "uploading" | "processing" | "ready" | "error";

export interface AttachmentChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Size in bytes. */
  size?: number;
  /** MIME type, e.g. "application/pdf". Picks the icon. */
  type?: string;
  /** Thumbnail URL for images, e.g. from URL.createObjectURL(file). */
  previewUrl?: string;
  status?: AttachmentStatus;
  /** Upload progress, 0 to 1. */
  progress?: number;
  error?: string;
  onRemove?: () => void;
  onRetry?: () => void;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extension(name: string) {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toUpperCase() : "FILE";
}

function TypeIcon({ type, name }: { type?: string; name: string }) {
  const t = type ?? "";
  if (t.startsWith("image/")) return <ImageIcon className="size-4" />;
  if (t === "application/pdf" || t.startsWith("text/") || /\.(pdf|txt|md|docx?)$/i.test(name)) return <FileText className="size-4" />;
  if (/\.(tsx?|jsx?|py|go|rs|json|css|html)$/i.test(name)) return <FileCode className="size-4" />;
  return <File className="size-4" />;
}

export function AttachmentChip({
  name,
  size,
  type,
  previewUrl,
  status = "ready",
  progress = 0,
  error,
  onRemove,
  onRetry,
  className = "",
  ...props
}: AttachmentChipProps) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  const circumference = 2 * Math.PI * 16;
  const failed = status === "error";

  const meta =
    status === "uploading" ? (
      <span className="tabular-nums">Uploading {pct}%</span>
    ) : status === "processing" ? (
      <span className={SHIMMER}>Reading</span>
    ) : failed ? (
      <span className="text-red-500">
        {error ?? "Upload failed"}
        {onRetry && (
          <>
            {" · "}
            <button type="button" onClick={onRetry} className={`rounded font-medium text-foreground underline decoration-border underline-offset-2 hover:decoration-foreground ${FOCUS}`}>
              Retry
            </button>
          </>
        )}
      </span>
    ) : (
      <span>
        {extension(name)}
        {size !== undefined && ` · ${formatBytes(size)}`}
      </span>
    );

  return (
    <div
      className={`group relative inline-flex h-12 max-w-[260px] items-center gap-2.5 rounded-xl border bg-background pl-1.5 pr-3 animate-[ui-fade-up_260ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none ${
        failed ? "border-red-500/40" : "border-border"
      } ${className}`}
      {...props}
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
        {previewUrl && !failed ? (
          <img src={previewUrl} alt="" className={`size-full object-cover transition-opacity duration-300 ${status === "ready" ? "opacity-100" : "opacity-50"}`} />
        ) : failed ? (
          <AlertCircle className="size-4 text-red-500" />
        ) : (
          <TypeIcon type={type} name={name} />
        )}
        {status === "uploading" && (
          <svg aria-hidden="true" viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" strokeWidth="2" className="stroke-border" />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
              className="stroke-foreground transition-[stroke-dashoffset] duration-300"
            />
          </svg>
        )}
      </span>

      <span className="min-w-0">
        <span className="block truncate text-[12.5px] font-medium leading-4 text-foreground">{name}</span>
        <span role="status" aria-live="polite" className="mt-0.5 block truncate text-[11.5px] leading-4 text-muted-foreground">
          {meta}
        </span>
      </span>

      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          className={`absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100 ${FOCUS}`}
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  );
}
