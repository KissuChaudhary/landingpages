import { href } from "@/lib/urls";
export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className="page-intro wrap">
      <a className="back-link" href={href("/")}>
        ← Back to Sylva
      </a>
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title} <em>{accent}</em>
      </h1>
      <p className="page-description">{description}</p>
    </div>
  );
}
