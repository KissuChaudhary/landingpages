import { ArrowUpRight } from "lucide-react";

export function Button({
  href,
  children,
  variant = "blue",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "blue" | "white" | "outline";
  className?: string;
}) {
  return (
    <a href={href} className={`button button-${variant} ${className}`}>
      <span>{children}</span>
      <span className="button-disc">
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </a>
  );
}
