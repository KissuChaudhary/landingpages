import {
  ScanSearch,
  PenLine,
  Workflow,
  ChartNoAxesCombined,
  MessagesSquare,
  Braces,
} from "lucide-react";
const icons = {
  research: ScanSearch,
  creative: PenLine,
  operations: Workflow,
  analyst: ChartNoAxesCombined,
  support: MessagesSquare,
  builder: Braces,
};
export function AgentIcon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name as keyof typeof icons] || ScanSearch;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
