import { href } from "@/lib/urls";
import { Arrow } from "./Arrow";
export function Button({
  children,
  to,
  light = false,
  secondary = false,
}: {
  children: React.ReactNode;
  to: string;
  light?: boolean;
  secondary?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : ""} ${secondary ? "button-secondary" : ""}`}
      href={href(to)}
    >
      <span>{children}</span>
      <span className="button-icon">
        <Arrow />
      </span>
    </a>
  );
}
