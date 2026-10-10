import { href } from "@/lib/urls";
import { Arrow } from "./Arrow";
export function Button({
  children,
  to = "/contact",
  light = false,
  secondary = false,
}: {
  children: React.ReactNode;
  to?: string;
  light?: boolean;
  secondary?: boolean;
}) {
  return (
    <a
      className={[
        "button",
        light ? "button-light" : "",
        secondary ? "button-secondary" : "",
      ].join(" ")}
      href={href(to)}
    >
      <span>{children}</span>
      <span className="button-icon">
        <Arrow />
      </span>
    </a>
  );
}
export function TextLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <a className="text-link" href={href(to)}>
      {children}
      <Arrow diagonal />
    </a>
  );
}
