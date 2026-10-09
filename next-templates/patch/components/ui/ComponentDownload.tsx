"use client";
import { useEffect, useState, type ReactNode } from "react";

/** A native file link whose contents stay in sync with the selected example. */
export function ComponentDownload({
  code,
  file,
  children,
  className,
  label,
  onDownload,
  onUnavailable,
}: {
  code: string;
  file: string;
  children: ReactNode;
  className?: string;
  label?: string;
  onDownload: () => void;
  onUnavailable: () => void;
}) {
  const [source, setSource] = useState<{ code: string; url: string } | null>(
    null,
  );
  useEffect(() => {
    try {
      const url = URL.createObjectURL(
        new Blob([code], { type: "text/plain;charset=utf-8" }),
      );
      setSource({ code, url });
      return () => URL.revokeObjectURL(url);
    } catch {
      setSource(null);
    }
  }, [code]);
  const href = source?.code === code ? source.url : undefined;
  return (
    <a
      href={href}
      download={file}
      className={className}
      aria-label={label}
      aria-disabled={!href || undefined}
      onClick={(event) => {
        if (!href) {
          event.preventDefault();
          onUnavailable();
        } else onDownload();
      }}
    >
      {children}
    </a>
  );
}
