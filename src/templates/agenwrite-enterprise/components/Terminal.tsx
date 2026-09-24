import React, { useState, useEffect, useRef } from 'react';
import { Frame } from './ui/Frame';
import { Loader2, CheckCircle2, Search, FileText } from 'lucide-react';

interface LogLine {
  id: number;
  text: string;
  type: 'info' | 'success' | 'process' | 'draft';
}

export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, text: 'Initializing Agentic Protocol v2.1...', type: 'info' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation Script
  useEffect(() => {
    const script = [
      { text: 'Target Topic: "Future of Agentic SEO"', delay: 800, type: 'info' },
      { text: 'Scanning retrieval vectors on Perplexity...', delay: 1600, type: 'process' },
      { text: 'Found 14 authority citations.', delay: 2400, type: 'success' },
      { text: 'Analyzing competitor keyword density...', delay: 3200, type: 'process' },
      { text: 'Calibrating tone: "Authoritative yet Conversational"', delay: 4000, type: 'info' },
      { text: 'Drafting structure: H1 -> H2 -> Data Table -> Conclusion', delay: 4800, type: 'process' },
      { text: 'Writing Section 1: The Shift to GEO...', delay: 5500, type: 'draft' },
      { text: 'Writing Section 2: Optimizing for LLMs...', delay: 6500, type: 'draft' },
      { text: 'Fact checking statistical claims...', delay: 7500, type: 'process' },
      { text: 'Optimization Complete. Ready for deployment.', delay: 8500, type: 'success' },
    ];

    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    script.forEach((step) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, { id: Date.now(), text: step.text, type: step.type as any }]);
      }, step.delay);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Frame className="h-[400px] w-full max-w-lg mx-auto shadow-2xl shadow-zinc-200/50" label="Agent_Core_View_01" noPadding>
      {/* Header */}
      <div className="h-9 border-b border-border flex items-center px-4 justify-between bg-zinc-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-zinc-300 bg-transparent"></div>
          <div className="w-2.5 h-2.5 rounded-full border border-zinc-300 bg-transparent"></div>
        </div>
        <div className="text-[10px] font-mono text-muted flex items-center gap-2">
          <span>STATUS: RUNNING</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      {/* Body */}
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto p-6 font-mono text-xs space-y-3 pb-12"
      >
        {logs.map((line) => (
          <div key={line.id} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-zinc-300 shrink-0">
               {line.type === 'process' && <Loader2 size={12} className="animate-spin mt-0.5" />}
               {line.type === 'success' && <CheckCircle2 size={12} className="text-green-600 mt-0.5" />}
               {line.type === 'info' && <Search size={12} className="text-blue-600 mt-0.5" />}
               {line.type === 'draft' && <FileText size={12} className="text-zinc-600 mt-0.5" />}
            </span>
            <span className={`
              ${line.type === 'draft' ? 'text-zinc-400 italic' : 'text-zinc-800'}
              ${line.type === 'success' ? 'font-semibold text-green-700' : ''}
            `}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-zinc-400 mt-4">
          <span className="w-1.5 h-4 bg-zinc-400 animate-pulse block"></span>
        </div>
      </div>
    </Frame>
  );
};