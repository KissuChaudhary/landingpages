'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Telescope, Zap } from 'lucide-react';
import { PromptComposer, type ComposerStatus } from '../registry/prompt-composer';
import { ModeSwitcher } from '../registry/mode-switcher';
import { AttachmentChip, type AttachmentStatus } from '../registry/attachment-chip';

const MODES = [
  { value: 'fast', label: 'Fast', icon: <Zap /> },
  { value: 'thinking', label: 'Thinking', icon: <Brain /> },
  { value: 'research', label: 'Research', icon: <Telescope />, locked: true },
];

type Chip = { id: number; name: string; size: number; type: string; status: AttachmentStatus; progress: number; previewUrl?: string };

export default function PromptComposerDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<ComposerStatus>('ready');
  const [sent, setSent] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const [chips, setChips] = useState<Chip[]>(
    tab === 'With files'
      ? [
          { id: 1, name: 'q3-flavor-sales.pdf', size: 2_400_000, type: 'application/pdf', status: 'uploading', progress: 0 },
          { id: 2, name: 'shop-front.webp', size: 820_000, type: 'image/webp', status: 'ready', progress: 1, previewUrl: '/previews/card/stillform.webp' },
        ]
      : []
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // Simulate an upload for any chip still uploading.
  useEffect(() => {
    if (!chips.some((c) => c.status === 'uploading' || c.status === 'processing')) return;
    const t = window.setTimeout(() => {
      setChips((prev) =>
        prev.map((c) =>
          c.status === 'uploading'
            ? c.progress >= 1
              ? { ...c, status: 'processing' }
              : { ...c, progress: Math.min(1, c.progress + 0.12) }
            : c.status === 'processing'
              ? { ...c, status: 'ready' }
              : c
        )
      );
    }, chips.some((c) => c.status === 'processing') ? 1100 : 160);
    return () => window.clearTimeout(t);
  }, [chips]);

  const send = (text: string) => {
    setSent(text || 'Attached files');
    setChips([]);
    setStatus('submitted');
    timers.current.push(window.setTimeout(() => setStatus('streaming'), 700));
    timers.current.push(window.setTimeout(() => setStatus('ready'), 3600));
  };

  const addFiles = (files: File[]) =>
    setChips((prev) => [
      ...prev,
      ...files.map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        size: f.size,
        type: f.type,
        status: 'uploading' as const,
        progress: 0,
        previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
      })),
    ]);

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-3">
      <p className="h-5 truncate text-center text-[12.5px] text-muted-foreground">
        {sent ? (
          <span className="animate-[ui-fade-in_250ms_ease-out_both]">
            {status === 'ready' ? 'Answered' : status === 'submitted' ? 'Sending' : 'Answering'} · “{sent}”
          </span>
        ) : (
          'Type something and press Enter'
        )}
      </p>
      <PromptComposer
        defaultValue={tab === 'Live' ? 'Plan a peach special for this weekend' : ''}
        status={status}
        onSubmit={send}
        onStop={() => {
          timers.current.forEach((t) => window.clearTimeout(t));
          setStatus('ready');
        }}
        disabled={tab === 'Rate limited'}
        disabledReason={tab === 'Rate limited' ? 'You’ve used today’s 50 messages. They reset at midnight.' : undefined}
        onFilesSelected={addFiles}
        allowEmpty={chips.length > 0}
        maxLength={2000}
        attachments={
          chips.length > 0 &&
          chips.map((c) => (
            <AttachmentChip
              key={c.id}
              name={c.name}
              size={c.size}
              type={c.type}
              status={c.status}
              progress={c.progress}
              previewUrl={c.previewUrl}
              onRemove={() => setChips((prev) => prev.filter((x) => x.id !== c.id))}
            />
          ))
        }
        toolbar={<ModeSwitcher modes={MODES} defaultValue="fast" />}
      />
    </div>
  );
}
