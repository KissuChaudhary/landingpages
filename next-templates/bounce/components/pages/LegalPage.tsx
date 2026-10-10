import type { LegalDoc } from "@/data/legal";

const format = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="page legal">
      <div className="container legal-body">
        <h1>{doc.title}</h1>
        <p className="legal-updated">Last updated {format(doc.updated)}</p>
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
