import {
  Bot,
  Database,
  FileText,
  Mail,
  MessageSquare,
  CalendarDays,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
const icons: Record<string, { icon: LucideIcon; color: string }> = {
  agent: { icon: Bot, color: "purple" },
  database: { icon: Database, color: "orange" },
  document: { icon: FileText, color: "blue" },
  email: { icon: Mail, color: "red" },
  chat: { icon: MessageSquare, color: "green" },
  calendar: { icon: CalendarDays, color: "blue" },
  trigger: { icon: Sparkles, color: "orange" },
};
export function ToolIcon({
  name = "agent",
  small = false,
}: {
  name?: string;
  small?: boolean;
}) {
  const { icon: Icon, color } = icons[name] || icons.agent;
  return (
    <span className={`tool-icon tool-${color} ${small ? "tool-small" : ""}`}>
      <Icon size={small ? 17 : 25} strokeWidth={1.7} />
    </span>
  );
}
