import type { UiItem } from '../registry';

export const taskLog: UiItem = {
  name: 'task-log',
  title: 'Task log',
  description: 'What the agent did, task by task, as it does it: steps arrive on a hairline trail, files sit in chips, titles turn past tense.',
  summary:
    'An agent that edits code should show its work without dumping a terminal on people. The task log groups what it did under plain titles: while a task runs its title carries a sweep of light and its steps arrive one at a time on a hairline trail, each opening to its height and rising out of a light blur, the newest shimmering. Files it read or changed sit in small chips, and outcomes like "52 files" or "0 errors" trail after in a quieter grey. When a task finishes its title morphs into the past tense, "Finding project files" becoming "Found project files", and its steps can fold away. Once everything has settled, "Run again" folds in underneath.',
  file: 'task-log.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['text-morph'],
  css: ['@keyframes ui-sheen'],
  tabs: ['Live', 'Done'],
  states: [
    { name: 'running', description: 'A 1.4s sweep of light crosses the task title and the newest step. Each step opens to its height (380ms) and rises 4px out of a 4px blur; tasks arrive the same way.' },
    { name: 'done', description: 'The title morphs from title to doneTitle, keeping the letters they share, and the sweep stops. The title is a disclosure: the chevron turns and the steps fold away (380ms).' },
    { name: 'error', description: 'The title turns red behind an alert icon, keeping the steps that ran.' },
    { name: 'rerun', description: 'With onRerun, "Run again" folds open under the log once no task is running.' },
  ],
  usage: `import { TaskLog } from "@/components/task-log";

<TaskLog
  tasks={[
    { id: "find", title: "Finding project files", doneTitle: "Found project files", status: "done",
      steps: [{ id: "1", text: "Read", file: "page.tsx" }, { id: "2", text: "Scanning", detail: "52 files" }] },
  ]}
  onRerun={rerun}
/>`,
  recipe: `"use client";
import { useChat } from "@ai-sdk/react";
import { TaskLog, type TaskLogTask } from "@/components/task-log";

// Each data-task part streams { id, title, doneTitle, status, steps } as the agent works.
export function AgentWork() {
  const { messages, regenerate } = useChat();
  const last = messages.at(-1);
  const tasks = (last?.parts ?? []).flatMap((p) => (p.type === "data-task" ? [p.data as TaskLogTask] : []));
  return <TaskLog tasks={tasks} onRerun={() => regenerate()} />;
}`,
  props: [
    { name: 'tasks', type: 'TaskLogTask[]', description: '{ id, title, doneTitle?, icon?, status, steps } in order; status is "running", "done" or "error".' },
    { name: 'steps', type: 'TaskLogStep[]', description: 'On each task: { id, text, file?, detail? }. A file shows as a chip, detail trails after in grey.' },
    { name: 'onRerun', type: '() => void', description: 'Shows "Run again" once no task is running.' },
    { name: 'rerunLabel', type: 'string', default: '"Run again"', description: 'The button’s words.' },
  ],
  notes: [
    'Each task title is a button with aria-expanded controlling its steps, which are inert while folded.',
    'A polite status region names the running task and its newest step, then "All tasks finished"; it never re-reads the whole log.',
    'The sweep of light is a moving mask, so it reaches letters that are mid-morph; with reduced motion there is no sweep and steps simply appear.',
    'Steps and tasks present on the first render don’t animate, so a finished log renders still.',
    'Installs Text morph.',
  ],
};
