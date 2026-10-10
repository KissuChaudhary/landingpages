import type { LegalPage as Page } from "@/data/legal";
import { formatDate } from "@/data/articles";

export function LegalPage({ page }: { page: Page }) {
  return (
    <article className="container legal">
      <header className="legal-head">
        <span className="tag">Legal</span>
        <h1 className="h1">{page.title}</h1>
        <p className="small">Last updated {formatDate(page.updated)}</p>
        <p className="lead">{page.intro}</p>
      </header>
      <div className="legal-body">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="h3">{s.heading}</h2>
            <p className="body">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
