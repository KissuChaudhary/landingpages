import { site } from "@/site.config";
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <Mark />
      <span>{site.brand}</span>
    </span>
  );
}
export function SampleLogo({
  name,
  variant = 0,
}: {
  name: string;
  variant?: number;
}) {
  return (
    <span className={`sample-logo logo-${variant}`}>
      <span aria-hidden="true">{["✳", "↗", "◒", "〰"][variant % 4]}</span>
      {name}
    </span>
  );
}
