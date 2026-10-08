export function SectionHeading({
  number,
  eyebrow,
  title,
  emphasis,
  children,
}: {
  number?: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number || "✳"}</span>
        {eyebrow}
      </p>
      <div>
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
