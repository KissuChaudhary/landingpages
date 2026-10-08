export function SectionIntro({
  label,
  title,
  children,
  centered = false,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`section-intro ${centered ? "centered" : ""}`}>
      <p className="eyebrow">
        <span className="little-cross">✳</span>
        {label}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
