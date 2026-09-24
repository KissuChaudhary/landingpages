import React, { useState, useEffect, useRef } from 'react';
import { Frame } from './ui/Frame';
import { Loader2, CheckCircle2, Search, FileText, Quote, Eraser, Terminal as TerminalIcon } from 'lucide-react';

interface LogLine {
  id: number;
  text: string;
  type: 'info' | 'success' | 'process' | 'draft' | 'style' | 'edit';
}

// Renamed internally to SystemLog to reflect the style shift, but keeping filename for compatibility
export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: 1, text: 'Initializing Agentic Protocol v2.1...', type: 'info' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation Script
  useEffect(() => {
    const script = [
      { text: 'User Input: "Future of Agentic SEO"', delay: 800, type: 'info' },
      // Step 1: Style Thief
      { text: 'Invoking [Style_Thief] on user_sample.txt...', delay: 1600, type: 'style' },
      { text: 'Detected: Punchy sentences, high entropy, low adjective count.', delay: 2400, type: 'success' },
      // Step 2: Research
      { text: 'Deploying [Research_Agent] to live web...', delay: 3200, type: 'process' },
      { text: 'Scanned 14 competitor articles. Identifying "The Gap"...', delay: 4200, type: 'process' },
      { text: 'Fact Sheet built. 12 verified citations found.', delay: 5000, type: 'success' },
      // Step 3: Snowball
      { text: 'Initiating [Snowball_Method] drafting sequence...', delay: 5800, type: 'info' },
      { text: 'Writing Section 1 (Referencing Intro Context)...', delay: 6500, type: 'draft' },
      { text: 'Writing Section 2 (Referencing Sec 1 Context)...', delay: 7200, type: 'draft' },
      // Step 4: Editor
      { text: 'Activating [Ruthless_Editor]...', delay: 8000, type: 'edit' },
      { text: 'Scrubbed 4 instances of "delve". Removed passive voice.', delay: 8800, type: 'success' },
      { text: 'Content Ready for Deployment.', delay: 9500, type: 'success' },
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
    <div className="w-full max-w-lg mx-auto bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
      {/* Header - Sleek Dark Mode, no window controls */}
      <div className="h-10 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-900">
        <div className="flex items-center gap-2 text-zinc-400">
          <TerminalIcon size={14} />
          <span className="text-xs font-mono">system_log</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500">LIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>

      {/* Body */}
      <div 
        ref={scrollRef}
        className="h-[300px] overflow-y-auto p-4 font-mono text-xs space-y-3 bg-zinc-950/50"
      >
        {logs.map((line) => (
          <div key={line.id} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="shrink-0 pt-0.5">
               {line.type === 'process' && <Loader2 size={12} className="animate-spin text-zinc-500" />}
               {line.type === 'success' && <CheckCircle2 size={12} className="text-emerald-500" />}
               {line.type === 'info' && <Search size={12} className="text-blue-500" />}
               {line.type === 'draft' && <FileText size={12} className="text-zinc-500" />}
               {line.type === 'style' && <Quote size={12} className="text-purple-500" />}
               {line.type === 'edit' && <Eraser size={12} className="text-red-500" />}
            </span>
            <span className={`leading-relaxed
              ${line.type === 'draft' ? 'text-zinc-500 italic' : 'text-zinc-300'}
              ${line.type === 'success' ? 'text-emerald-400' : ''}
              ${line.type === 'edit' ? 'text-red-400' : ''}
              ${line.type === 'style' ? 'text-purple-400' : ''}
            `}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};