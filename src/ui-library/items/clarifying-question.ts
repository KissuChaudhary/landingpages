import type { UiItem } from '../registry';

export const clarifyingQuestion: UiItem = {
  name: 'clarifying-question',
  title: 'Clarifying question',
  description: 'The agent pauses to ask. Pick with a click or a number key, or type your own; it folds into a one-line receipt.',
  summary:
    'Good agents ask before guessing. When yours needs a decision, it shows the question with a small "Needs your answer" pulse. The options are rows you can pick with a click or the number keys, and "Something else" turns into a text field right in its row. Multi-choice questions toggle, then Continue. Once answered, the card folds into a single line, question · answer, so the thread stays readable.',
  file: 'clarifying-question.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-in', '@keyframes ui-pop-in', '@keyframes ui-ping'],
  tabs: ['Single', 'Multiple', 'Answered'],
  states: [
    { name: 'asking', description: 'The question, an optional detail line and numbered options. A highlight follows the pointer and arrow keys.' },
    { name: 'other', description: '"Something else…" opens a field in its row; Enter sends, Escape goes back.' },
    { name: 'multiple', description: 'Checkboxes instead of numbers, and Continue with a count.' },
    { name: 'answered', description: 'The card’s height folds into one line: a check, the question and the answer.' },
    { name: 'skipped', description: 'With onSkip, Skip folds it into "Skipped, the agent will decide".' },
  ],
  usage: `import { ClarifyingQuestion } from "@/components/clarifying-question";

<ClarifyingQuestion
  question="Which shop is this plan for?"
  options={[{ id: "main", label: "Main Street" }, { id: "harbour", label: "Harbour Road" }]}
  onAnswer={(answer) => reply(answer)}
/>`,
  recipe: `// Server: a tool with no execute; the person's answer is its output
import { tool } from "ai";
import { z } from "zod";

const askUser = tool({
  description: "Ask the user a multiple-choice question when you need a decision. Don't guess.",
  inputSchema: z.object({
    question: z.string(),
    options: z.array(z.object({ id: z.string(), label: z.string(), description: z.string().optional() })),
    multiple: z.boolean().optional(),
  }),
});

// Client: continue automatically once the answer is in
import { useChat } from "@ai-sdk/react";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";

const { messages, addToolOutput } = useChat({ sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls });

// In your message parts:
if (part.type === "tool-askUser" && (part.state === "input-available" || part.state === "output-available")) {
  return (
    <ClarifyingQuestion
      {...part.input}
      answer={part.state === "output-available" ? part.output : undefined}
      onAnswer={(answer) => addToolOutput({ tool: "askUser", toolCallId: part.toolCallId, output: answer })}
    />
  );
}`,
  props: [
    { name: 'question / detail', type: 'string', description: 'The question, and an optional line of context.' },
    { name: 'options', type: '{ id; label; description? }[]', description: 'Up to nine get number keys.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Toggle several answers, then Continue.' },
    { name: 'allowOther / otherLabel', type: 'boolean / string', default: 'true / "Something else"', description: 'A last row that becomes a text field.' },
    { name: 'onAnswer', type: '(answer: { ids; labels; other? }) => void', description: 'Called once with the choice. labels are ready to show or send to the model.' },
    { name: 'answer', type: 'QuestionAnswer | null', description: 'The answer once given, e.g. the tool’s output; shows the folded line.' },
    { name: 'onSkip / skipped / skippedText', type: '() => void / boolean / string', description: 'Offer Skip and say what happens instead.' },
    { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Move focus to the first option when it appears.' },
  ],
  notes: [
    'Options are a radio group (or checkboxes when multiple) labelled by the question; arrow keys move and number keys pick.',
    'Number keys also work when nothing else has focus, but never while typing in a field.',
    'The folded line is a status, so screen readers hear the answer that was sent.',
    'The fold animates the card’s real height and is skipped with reduced motion.',
  ],
};
