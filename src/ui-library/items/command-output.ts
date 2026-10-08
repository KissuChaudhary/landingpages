import type { UiItem } from '../registry';

export const commandOutput: UiItem = {
  name: 'command-output',
  title: 'Command output',
  description: 'A command the agent runs: the log streams in, folds away on success, and stays open on failure.',
  summary:
    'Coding agents run commands constantly, and raw logs drown the conversation. This block shows the command, "running" with seconds that roll, and Stop, while the log streams underneath and follows the newest line. On success the spinner blurs into a check that draws itself, "running" morphs to "done", the time gains its tenths, Stop folds away as the chevron opens in, and the log folds away a beat later, leaving one tidy line. On failure "exit 1" rolls in red, the log stays open, and the first failing line is marked and scrolled into view.',
  file: 'command-output.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-fade-in', '@keyframes ui-blink'],
  tabs: ['Passing', 'Failing'],
  states: [
    { name: 'running', description: '"$ pnpm test", a spinner, "running" with seconds that roll once a second, and Stop. Lines fade in and the log follows them unless you scroll up.' },
    { name: 'success', description: 'The spinner blurs into a check that draws itself (380ms), "running" morphs to "done" and "1s" settles to "1.8s"; Stop folds away as the chevron opens in (420ms); the log folds away after 0.9s.' },
    { name: 'error', description: '"exit" morphs in and the code rolls in after it, in red. The log stays open, failing lines are tinted, and the first one scrolls into view.' },
    { name: 'cancelled', description: 'A stop mark and "stopped", with the log folded. Focus moves from Stop to the chevron.' },
  ],
  usage: `import { CommandOutput } from "@/components/command-output";

<CommandOutput command="pnpm test" status="running" lines={lines} startedAt={startedAt} onStop={stop} />`,
  recipe: `// Server: a tool that streams its log by yielding as it goes
const runCommand = tool({
  description: "Run a shell command in the project sandbox",
  inputSchema: z.object({ command: z.string() }),
  async *execute({ command }, { abortSignal }) {
    const startedAt = Date.now();
    const lines: string[] = [];
    const proc = sandbox.spawn(command, { signal: abortSignal }); // your sandbox
    for await (const line of proc.lines()) {
      lines.push(line);
      yield { status: "running", lines, startedAt };
    }
    const exitCode = await proc.exitCode;
    yield { status: exitCode === 0 ? "success" : "error", lines, exitCode, startedAt, endedAt: Date.now() };
  },
});

// Client: each yield updates the part's output; the last one is final
if (part.type === "tool-runCommand" && part.input?.command) {
  const out = part.state === "output-available" ? part.output : undefined;
  return (
    <CommandOutput
      command={part.input.command}
      status={part.state === "output-error" ? "error" : out?.status ?? "running"}
      lines={out?.lines ?? []}
      exitCode={out?.exitCode}
      startedAt={out?.startedAt}
      endedAt={out?.endedAt}
      onStop={stop} // from useChat: aborts the request, and the abort signal stops the process
    />
  );
}`,
  props: [
    { name: 'command', type: 'string', description: 'Shown after a muted "$".' },
    { name: 'status', type: '"running" | "success" | "error" | "cancelled"', description: 'Where the process is.' },
    { name: 'lines', type: '(string | { text; level? })[]', description: 'The log so far. ANSI colour codes are stripped; error-looking lines are marked unless you set level.' },
    { name: 'exitCode', type: 'number', description: 'Shown in red on failure.' },
    { name: 'startedAt / endedAt', type: 'number', description: 'A live timer while running, then the duration (1.8s, 2m 4s).' },
    { name: 'onStop', type: '() => void', description: 'Shows Stop while running.' },
    { name: 'open / onOpenChange', type: 'boolean / (open) => void', description: 'Control the log yourself; by default it is open while running or failed.' },
  ],
  notes: [
    'The log is a role="log" region you can focus and scroll with the keyboard; only status changes are announced, never the ticking timer.',
    'It keeps following new lines only while you are at the bottom of the log.',
    'Colour is never the only signal: failing lines are also announced by the "Failed with exit code" status.',
    'Installs Number roll and Text morph. With reduced motion, the fold, rolls and the scroll to the error are instant.',
  ],
};
