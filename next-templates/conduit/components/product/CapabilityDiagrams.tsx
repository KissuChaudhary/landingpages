// Small line diagrams for each layer of the stack. Plain SVG, no data.
const box = (x: number, y: number, w: number, h: number, label: string, on = false) => (
  <g key={`${x}-${y}`}>
    <rect x={x} y={y} width={w} height={h} className={on ? "d-box is-on" : "d-box"} />
    <text x={x + w / 2} y={y + h / 2 + 3.5} className="d-text">
      {label}
    </text>
  </g>
);

export function DataDiagram() {
  return (
    <svg viewBox="0 0 240 72" className="layer-visual" aria-hidden="true">
      {["Docs", "DB", "API", "Mail"].map((s, i) => box(0, i * 18, 42, 14, s))}
      <path d="M42 7H86V36M42 25H78Q86 25 86 33M42 43H78Q86 43 86 39M42 61H86V36H128" className="d-line" />
      {box(128, 26, 112, 20, "One context", true)}
    </svg>
  );
}
export function BuilderDiagram() {
  return (
    <svg viewBox="0 0 240 72" className="layer-visual" aria-hidden="true">
      {box(0, 26, 54, 20, "Trigger")}
      <path d="M54 36H86" className="d-line" />
      <path d="M100 22L114 36L100 50L86 36Z" className="d-box is-on" />
      <path d="M114 36H136V14H164M136 36V58H164" className="d-line" />
      {box(164, 4, 76, 20, "Reply")}
      {box(164, 48, 76, 20, "Escalate")}
    </svg>
  );
}
export function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 240 72" className="layer-visual" aria-hidden="true">
      <path d="M0 36H240" className="d-line" />
      {[0, 1, 2, 4].map((n) => (
        <rect key={n} x={n * 48 + 10} y={28} width="16" height="16" className="d-box is-on" />
      ))}
      <rect x={154} y={24} width="24" height="24" className="d-box d-person" />
      <text x={166} y={62} className="d-text">
        Person
      </text>
    </svg>
  );
}
export function ModelDiagram() {
  return (
    <svg viewBox="0 0 240 72" className="layer-visual" aria-hidden="true">
      {box(0, 26, 54, 20, "Task")}
      <path d="M54 36H96M96 36V10H140M96 36H140M96 36V62H140" className="d-line" />
      <rect x="92" y="32" width="8" height="8" className="d-box is-on" />
      {box(140, 1, 100, 18, "Fast")}
      {box(140, 27, 100, 18, "Reasoning", true)}
      {box(140, 53, 100, 18, "Vision")}
    </svg>
  );
}
export function ToolsDiagram() {
  return (
    <svg viewBox="0 0 240 72" className="layer-visual" aria-hidden="true">
      <path d="M0 58H240" className="d-line" />
      {["CRM", "Desk", "Sheets", "Chat", "Cal"].map((t, i) => (
        <g key={t}>
          <path d={`M${i * 49 + 20} 30V58`} className="d-line" />
          {box(i * 49, 6, 40, 24, t, i === 1)}
        </g>
      ))}
    </svg>
  );
}
