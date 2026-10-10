import { route } from "@/lib/urls";
import { Arrow } from "./Mark";
export function Action({
  href,
  children,
  quiet = false,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  quiet?: boolean;
  dark?: boolean;
}) {
  return (
    <a
      className={`action ${quiet ? "action-quiet" : ""} ${dark ? "action-dark" : ""}`}
      href={route(href)}
    >
      <span>{children}</span>
      <span className="action-arrow">
        <Arrow diagonal={quiet} />
        <Arrow diagonal={quiet} />
      </span>
    </a>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="label">
      <span className="label-cross" aria-hidden="true">
        +
      </span>
      {children}
    </p>
  );
}
