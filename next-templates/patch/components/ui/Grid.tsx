import type { ReactNode } from "react";
export function GridFrame({ children }: { children: ReactNode }) {
  return <div className="grid-frame">{children}</div>;
}
export function GridIntersections() {
  return (
    <span className="grid-intersections" aria-hidden="true">
      <span className="grid-intersection-left" />
      <span className="grid-intersection-right" />
    </span>
  );
}
export function GridRow({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div {...props} className={`grid-row ${className}`}>
      {children}
    </div>
  );
}
export function GridCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`grid-cell ${className}`}>{children}</div>;
}
