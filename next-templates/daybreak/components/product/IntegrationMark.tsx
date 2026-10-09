import {
  Search,
  Mail,
  ChartNoAxesColumn,
  Table2,
  MessagesSquare,
  Blocks,
  Infinity,
} from "lucide-react";
const marks = {
  search: Search,
  mail: Mail,
  bars: ChartNoAxesColumn,
  sheet: Table2,
  diamonds: MessagesSquare,
  tiles: Blocks,
  arcs: Infinity,
};
export function IntegrationMark({
  mark,
  color,
}: {
  mark: string;
  color: string;
}) {
  const Icon = marks[mark as keyof typeof marks] || Blocks;
  return (
    <span className="integration-mark" style={{ color }}>
      <Icon size={27} strokeWidth={2} />
    </span>
  );
}
