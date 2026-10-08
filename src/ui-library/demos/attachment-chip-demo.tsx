'use client';

import React, { useEffect, useState } from 'react';
import { AttachmentChip, type AttachmentStatus } from '../registry/attachment-chip';

export default function AttachmentChipDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<AttachmentStatus>(tab === 'Error' ? 'error' : tab === 'Image' ? 'ready' : 'uploading');
  const [progress, setProgress] = useState(0);
  const [run, setRun] = useState(0);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (tab !== 'Live') return;
    setStatus('uploading');
    setProgress(0);
    const ticks = Array.from({ length: 10 }, (_, i) => window.setTimeout(() => setProgress((i + 1) / 10), 250 * (i + 1)));
    ticks.push(window.setTimeout(() => setStatus('processing'), 2800));
    ticks.push(window.setTimeout(() => setStatus('ready'), 4400));
    return () => ticks.forEach((t) => window.clearTimeout(t));
  }, [tab, run]);

  if (removed) {
    return (
      <button type="button" onClick={() => setRemoved(false)} className="text-[12.5px] text-muted-foreground underline underline-offset-4">
        Removed. Bring it back
      </button>
    );
  }

  if (tab === 'Image') {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <AttachmentChip name="shop-front.webp" type="image/webp" size={820_000} previewUrl="/previews/card/stillform.webp" onRemove={() => setRemoved(true)} />
        <AttachmentChip name="menu-board.webp" type="image/webp" size={640_000} previewUrl="/previews/card/kept.webp" status="processing" />
      </div>
    );
  }

  return (
    <AttachmentChip
      name="q3-flavor-sales.pdf"
      type="application/pdf"
      size={2_400_000}
      status={status}
      progress={progress}
      error="File is over 20 MB"
      onRetry={() => setRun((r) => r + 1)}
      onRemove={() => setRemoved(true)}
    />
  );
}
