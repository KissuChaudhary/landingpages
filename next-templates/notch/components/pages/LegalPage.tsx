import type { LegalDoc } from "@/data/legal";
import { formatDate } from "@/data/articles";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="page page-legal">
      <div className="container legal">
        <h1>{doc.title}</h1>
        <p className="legal-updated">Last updated {formatDate(doc.updated)}</p>
        <p className="legal-intro">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
