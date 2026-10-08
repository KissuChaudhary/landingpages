export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  id?: string;
}) {
  return (
    <div className={`section-heading${centered ? " centered" : ""}`}>
      <p className="eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
