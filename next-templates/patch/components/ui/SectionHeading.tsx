import { SectionBadge } from "./SectionBadge";
export function SectionHeading({
  badge,
  title,
  emphasis,
  children,
}: {
  badge: string;
  title: string;
  emphasis: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <SectionBadge label={badge} />
        <h2>
          {title}
          <br />
          <span className="subtle-heading">{emphasis}</span>
        </h2>
        {children}
      </div>
    </div>
  );
}
