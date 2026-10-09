import {
  BookOpenText,
  CalendarCheck,
  CreditCard,
  FileText,
  Landmark,
  ListChecks,
  RefreshCw,
  Scale,
  Stamp,
  Users,
  type LucideIcon,
} from "lucide-react";
const icons: Record<string, { icon: LucideIcon; color: string }> = {
  rules: { icon: Scale, color: "petrol" },
  ledger: { icon: BookOpenText, color: "ink" },
  bank: { icon: Landmark, color: "champagne" },
  card: { icon: CreditCard, color: "petrol" },
  document: { icon: FileText, color: "slate" },
  approval: { icon: Stamp, color: "sage" },
  check: { icon: ListChecks, color: "champagne" },
  calendar: { icon: CalendarCheck, color: "slate" },
  payroll: { icon: Users, color: "sage" },
  trigger: { icon: RefreshCw, color: "champagne" },
};
export function ToolIcon({
  name = "rules",
  small = false,
}: {
  name?: string;
  small?: boolean;
}) {
  const { icon: Icon, color } = icons[name] || icons.rules;
  return (
    <span className={`tool-icon tool-${color} ${small ? "tool-small" : ""}`}>
      <Icon size={small ? 17 : 25} strokeWidth={1.7} />
    </span>
  );
}
