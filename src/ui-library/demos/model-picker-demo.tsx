'use client';

import React, { useRef, useState } from 'react';
import { ArrowUp, Brain, Gem, Paperclip, Sparkle, Zap } from 'lucide-react';
import { ModelPicker, type ModelOption } from '../registry/model-picker';

const MODELS: ModelOption[] = [
  { id: 'aurora-mini', name: 'Aurora Mini', description: 'Fast, everyday questions', icon: <Zap />, speed: 3, intelligence: 1 },
  { id: 'aurora', name: 'Aurora', description: 'Balanced for most work', icon: <Sparkle />, speed: 2, intelligence: 2 },
  { id: 'aurora-think', name: 'Aurora Think', description: 'Reasons before it answers', icon: <Brain />, speed: 1, intelligence: 3, reasoning: true },
  { id: 'aurora-ultra', name: 'Aurora Ultra', description: 'The longest, hardest problems', icon: <Gem />, speed: 1, intelligence: 3, reasoning: true, locked: true },
];

export default function ModelPickerDemo() {
  const [model, setModel] = useState('aurora-think');
  const [effort, setEffort] = useState('Medium');
  const [upsell, setUpsell] = useState(false);
  const composer = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-[380px] w-full max-w-[500px] flex-col justify-end gap-3">
      <div ref={composer} className="rounded-[22px] border border-border bg-background p-2">
        <p className="px-2.5 pb-3 pt-1.5 text-[14px] leading-6 text-muted-foreground">Plan the autumn menu launch</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Attach"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Paperclip className="size-4" />
          </button>
          {/* The model sits with Send: it's a setting on how this message goes out. */}
          <ModelPicker
            models={MODELS}
            value={model}
            onValueChange={(id) => {
              setModel(id);
              setUpsell(false);
            }}
            effort={effort}
            onEffortChange={setEffort}
            onLockedSelect={() => setUpsell(true)}
            align="end"
            collisionPadding={28}
            anchorRef={composer}
            className="ml-auto"
          />
          <button
            type="button"
            aria-label="Send"
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-[0.94]"
          >
            <ArrowUp className="size-4" strokeWidth={2.4} />
          </button>
        </div>
      </div>
      <p aria-live="polite" className="h-4 px-1 text-[12px] text-muted-foreground">
        {upsell && <span className="animate-[ui-fade-in_250ms_ease-out_both]">Aurora Ultra is on the Pro plan. In your app, this opens pricing.</span>}
      </p>
    </div>
  );
}
