import { Spark } from "./Brand";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <Spark />
      {children}
    </p>
  );
}
export function SectionHeading({
  label,
  title,
  description,
  centered = false,
  id,
  as = "h2",
}: {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  id?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div
      className={`section-heading ${centered ? "centered" : ""}`}
      data-reveal
    >
      <Eyebrow>{label}</Eyebrow>
      <Heading id={id}>{title}</Heading>
      {description && <p className="heading-description">{description}</p>}
    </div>
  );
}
