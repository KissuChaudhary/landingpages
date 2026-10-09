import { ArrowUpRight } from "lucide-react";
import { asset, href } from "@/lib/urls";
import { site, appHref } from "@/site.config";
export function SectionHead({
  label,
  lines,
  text,
  center = false,
  primary = false,
}: {
  label: string;
  lines: string[];
  text?: string;
  center?: boolean;
  primary?: boolean;
}) {
  const Heading = primary ? "h1" : "h2";
  return (
    <div data-reveal className={`section-head ${center ? "center" : ""}`}>
      <p className="eyebrow">
        <i aria-hidden="true" />
        {label}
      </p>
      <Heading>
        {lines.map((line, i) => (
          <span key={line} className={i > 0 ? "muted-line" : ""}>
            {line}
          </span>
        ))}
      </Heading>
      {text && <p className="section-description">{text}</p>}
    </div>
  );
}
export function AppButton({
  children = site.hero.cta,
  view = "reviews",
  light = false,
}: {
  children?: React.ReactNode;
  view?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : ""}`}
      href={href(appHref(view))}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} />
    </a>
  );
}
export function Art({
  name = "blossom",
  className = "",
  eager = false,
}: {
  name?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={`art ${className}`}
      src={asset(`/images/${name}.webp`)}
      alt=""
      width="1200"
      height="1200"
      loading={eager ? "eager" : "lazy"}
      aria-hidden="true"
    />
  );
}
export function Avatar({
  initials,
  name,
  portrait,
}: {
  initials: string;
  name?: string;
  portrait?: string;
}) {
  return (
    <span className="avatar">
      {portrait ? (
        <img
          src={asset(`/images/${portrait}.webp`)}
          alt={name || "Fictional team member"}
          width="48"
          height="48"
          loading="lazy"
        />
      ) : (
        initials
      )}
    </span>
  );
}
