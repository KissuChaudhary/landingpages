import type { UiItem } from '../registry';

export const approvalCard: UiItem = {
  name: 'approval-card',
  title: 'Approval card',
  description: 'The agent asks before it acts: what it wants to do, the details, Approve or Deny.',
  summary:
    'Human-in-the-loop, designed. The card says plainly what the agent wants to do, lists the details worth checking, and asks. Once answered it folds into a single confirming line so the conversation stays readable. Destructive actions get a red Approve, and requests can count down and expire.',
  group: 'working',
  file: 'approval-card.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-up', '@keyframes ui-fade-in'],
  tabs: ['Pending', 'Destructive', 'Approved', 'Denied', 'Expired'],
  states: [
    { name: 'pending', description: 'The request with its details, an optional countdown, and Deny / Approve.' },
    { name: 'approved', description: 'Folds into one line: a check, "Approved" and the action.' },
    { name: 'denied', description: 'Folds into one line; the agent carries on without it.' },
    { name: 'expired', description: 'The countdown ran out before anyone answered.' },
  ],
  usage: `import { ApprovalCard } from "@/components/approval-card";

<ApprovalCard
  title="Send email to 3 people"
  description="The agent drafted a follow-up and wants to send it from your address."
  details={[
    { label: "To", value: "maya@acme.com, +2 more" },
    { label: "Subject", value: "Thursday tasting menu" },
  ]}
  onApprove={send}
  onDeny={skip}
/>`,
  recipe: `// Server: ask for approval before a tool runs
streamText({ model, messages, tools, toolApproval: { sendEmail: "user-approval" } });

// Client
import { useChat } from "@ai-sdk/react";
import { ApprovalCard } from "@/components/approval-card";

const { messages, addToolApprovalResponse } = useChat();

// for each part where part.type === "tool-sendEmail":
if (part.state === "approval-requested") {
  return (
    <ApprovalCard
      title={\`Send email to \${part.input.to.length} people\`}
      reason={part.approval.requestReason}
      details={[{ label: "Subject", value: part.input.subject }]}
      onApprove={() => addToolApprovalResponse({ id: part.approval.id, approved: true })}
      onDeny={() => addToolApprovalResponse({ id: part.approval.id, approved: false })}
    />
  );
}
if (part.state === "approval-responded") {
  return <ApprovalCard title="Send email" status={part.approval.approved ? "approved" : "denied"} />;
}
if (part.state === "output-denied") {
  return <ApprovalCard title="Send email" status="denied" />;
}`,
  props: [
    { name: 'title / description', type: 'string', description: 'What the agent wants to do, in plain words.' },
    { name: 'details', type: '{ label; value }[]', description: 'The specifics worth checking: recipients, amounts, files.' },
    { name: 'reason', type: 'string', description: 'Why approval is needed, e.g. the AI SDK’s requestReason.' },
    { name: 'status / defaultStatus', type: '"pending" | "approved" | "denied" | "expired"', default: '"pending"', description: 'Controlled, or let the card remember the choice.' },
    { name: 'onApprove / onDeny', type: '() => void', description: 'Send the decision back to your agent.' },
    { name: 'approveLabel / denyLabel', type: 'string', default: '"Approve" / "Deny"', description: 'Name the actual action, e.g. "Send" and "Don’t send".' },
    { name: 'destructive', type: 'boolean', default: 'false', description: 'Red Approve for deletes, payments and other irreversible actions.' },
    { name: 'expiresAt / onExpire', type: 'number / () => void', description: 'Countdown to when the request lapses.' },
  ],
  notes: [
    'The pending card is a labelled group; the answered line is a status, so screen readers hear the outcome.',
    'Approve is never focused automatically, so a stray Enter can’t approve an action.',
    'Details wrap rather than truncate, because they are what the user is approving.',
  ],
};
