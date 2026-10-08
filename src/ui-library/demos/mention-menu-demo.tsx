'use client';

import React, { useRef, useState } from 'react';
import { AlignLeft, ArrowUp, FileSpreadsheet, FileText, Globe, Languages, Lightbulb, ListTodo, UserRound } from 'lucide-react';
import {
  MentionInput,
  type MentionInputHandle,
  type MentionItem,
  type MentionSegment,
  type MentionTrigger,
  type MentionValue,
} from '../registry/mention-menu';

const CONTEXT: MentionItem[] = [
  { id: 'q3', label: 'q3-flavor-sales.pdf', description: 'Report · 2.4 MB', icon: <FileText /> },
  { id: 'menu', label: 'autumn-menu.csv', description: 'Sheet · 14 rows', icon: <FileSpreadsheet /> },
  { id: 'notes', label: 'onboarding-notes.md', description: 'Doc · edited today', icon: <FileText /> },
  { id: 'ana', label: 'Ana Ruiz', description: 'Shift lead', icon: <UserRound /> },
  { id: 'site', label: 'kept-icecream.com', description: 'Website', icon: <Globe /> },
  { id: 'brand', label: 'brand-guide.pdf', description: 'Guide · 18 pages', icon: <FileText /> },
];

const COMMANDS: MentionItem[] = [
  { id: 'summarize', label: 'summarize', description: 'Key points in a few lines', icon: <AlignLeft /> },
  { id: 'translate', label: 'translate', description: 'Into another language', icon: <Languages /> },
  { id: 'explain', label: 'explain', description: 'In plain words', icon: <Lightbulb /> },
  { id: 'todo', label: 'todo', description: 'Turn it into tasks', icon: <ListTodo /> },
];

const lower = (s: string) => s.toLowerCase();

const TRIGGERS: MentionTrigger[] = [
  {
    char: '@',
    label: 'Context',
    // A stand-in for a file search: answers after a short wait.
    items: (query) =>
      new Promise((resolve) =>
        window.setTimeout(() => resolve(CONTEXT.filter((item) => lower(item.label).includes(lower(query)) || lower(item.description ?? '').includes(lower(query)))), 260)
      ),
  },
  { char: '/', label: 'Commands', items: COMMANDS, startOnly: true, variant: 'command' },
];

const STARTER: MentionSegment[] = [
  { type: 'mention', trigger: '/', id: 'summarize', label: 'summarize' },
  { type: 'text', text: ' the weekend numbers in ' },
  { type: 'mention', trigger: '@', id: 'q3', label: 'q3-flavor-sales.pdf' },
  { type: 'text', text: ' for ' },
  { type: 'mention', trigger: '@', id: 'ana', label: 'Ana Ruiz' },
];

function Sent({ segments }: { segments: MentionSegment[] }) {
  return (
    <p className="ml-auto w-fit max-w-[85%] animate-[ui-fade-up_300ms_cubic-bezier(0.23,1,0.32,1)_both] whitespace-pre-wrap rounded-2xl bg-muted px-3.5 py-2 text-[13.5px] leading-relaxed text-foreground">
      {segments.map((s, i) =>
        s.type === 'text' ? (
          <React.Fragment key={i}>{s.text}</React.Fragment>
        ) : (
          <span
            key={i}
            className={
              s.trigger === '/'
                ? 'mx-px rounded-md bg-background px-1 font-mono text-[0.92em]'
                : 'mx-px rounded-md bg-primary/10 px-1 font-medium text-primary'
            }
          >
            <span className="opacity-50">{s.trigger}</span>
            {s.label}
          </span>
        )
      )}
    </p>
  );
}

export default function MentionMenuDemo({ tab = 'Try it' }: { tab?: string }) {
  const input = useRef<MentionInputHandle>(null);
  const [value, setValue] = useState<MentionValue | null>(null);
  const [sent, setSent] = useState<MentionSegment[] | null>(null);
  const canSend = Boolean(value?.segments.length);

  const send = (v: MentionValue | null) => {
    if (!v?.segments.length) return;
    setSent(v.segments);
    input.current?.clear();
  };

  return (
    <div className="flex min-h-[300px] w-full max-w-[500px] flex-col justify-end gap-4">
      {sent && <Sent key={JSON.stringify(sent)} segments={sent} />}
      <div className="rounded-[22px] bg-background p-2 shadow-[0_0_0_1px_var(--border),0_8px_24px_-16px_rgba(0,0,0,0.25)]">
        <MentionInput
          ref={input}
          triggers={TRIGGERS}
          defaultValue={tab === 'With context' ? STARTER : undefined}
          onChange={setValue}
          onSubmit={send}
          placeholder="Ask anything"
          className="px-2.5 pb-1 pt-1.5 text-[14px] leading-6 text-foreground"
        />
        <div className="flex items-center justify-between pl-2.5">
          <span className="text-[12px] text-muted-foreground">
            <kbd className="font-sans">@</kbd> for context · <kbd className="font-sans">/</kbd> for commands
          </span>
          <button
            type="button"
            aria-label="Send"
            disabled={!canSend}
            onClick={() => send(value)}
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[opacity,transform] duration-150 active:scale-[0.94] disabled:opacity-30"
          >
            <ArrowUp className="size-4" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
