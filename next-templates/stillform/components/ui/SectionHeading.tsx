export function SectionHeading({
  eyebrow,
  lead,
  accent,
  description,
}: {
  eyebrow: string;
  lead: string;
  accent: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {lead}
          <br />
          <em>{accent}</em>
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
