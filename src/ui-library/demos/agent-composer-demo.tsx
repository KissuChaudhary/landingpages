'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Brain, Sparkle, Zap } from 'lucide-react';
import { AgentComposer, type AgentComposerStatus } from '../registry/agent-composer';
import type { ModelOption } from '../registry/model-picker';

const MODELS: ModelOption[] = [
  { id: 'aurora-mini', name: 'Aurora Mini', description: 'Fast, small edits', icon: <Zap />, speed: 3, intelligence: 1 },
  { id: 'aurora', name: 'Aurora', description: 'Balanced for most work', icon: <Sparkle />, speed: 2, intelligence: 2 },
  { id: 'aurora-think', name: 'Aurora Think', description: 'Plans before it changes code', icon: <Brain />, speed: 1, intelligence: 3, reasoning: true },
];

// Working on Kept's till app: each message the agent answers fills a little more of its context.
export default function AgentComposerDemo() {
  const [status, setStatus] = useState<AgentComposerStatus>('ready');
  const [model, setModel] = useState('aurora');
  const [effort, setEffort] = useState('Medium');
  const [listening, setListening] = useState(false);
  const [used, setUsed] = useState(570_000);
  const [branch, setBranch] = useState('main');
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const send = (text: string) => {
    setStatus('submitted');
    if (branch === 'main') setBranch(`agent/${text.toLowerCase().replace(/[^a-z]+/g, '-').slice(0, 18).replace(/-$/, '')}`);
    timers.current.push(
      window.setTimeout(() => setStatus('streaming'), 700),
      window.setTimeout(() => {
        setStatus('ready');
        setUsed((u) => Math.min(1_000_000, u + 64_000));
      }, 3200)
    );
  };

  return (
    <div className="flex min-h-[340px] w-full max-w-[560px] flex-col justify-end py-4">
      <AgentComposer
        branch={branch}
        folder="kept-till"
        context={{ used, limit: 1_000_000 }}
        models={MODELS}
        model={model}
        onModelChange={setModel}
        effort={effort}
        onEffortChange={setEffort}
        status={status}
        onSubmit={send}
        onStop={() => {
          timers.current.forEach((t) => window.clearTimeout(t));
          setStatus('ready');
        }}
        onFilesSelected={() => {}}
        onVoice={() => setListening((l) => !l)}
        listening={listening}
        placeholder="Ask Kept's agent to change something"
      />
    </div>
  );
}
