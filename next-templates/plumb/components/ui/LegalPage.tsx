import type { LegalPage as Page } from "@/data/legal";
import { Tag } from "@/components/ui/Primitives";

export function LegalPage({ page }: { page: Page }) {
  const updated = new Date(`${page.updated}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <header className="wrap page-head">
        <Tag>Updated {updated}</Tag>
        <h1 className="page-title">{page.title}</h1>
        <p className="lead" style={{ maxWidth: "36em" }}>
          {page.intro}
        </p>
      </header>
      <div className="wrap page-body">
        <div className="legal">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
