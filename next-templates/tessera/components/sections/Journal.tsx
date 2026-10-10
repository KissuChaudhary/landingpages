import { site } from "@/site.config";
import { notes } from "@/data/notes";
import { href } from "@/lib/links";
import { Arrow, Eyebrow, Title } from "@/components/ui";
export function Journal() {
  return (
    <section className="journal section light">
      <Eyebrow>{site.journal.eyebrow}</Eyebrow>
      <Title lines={[site.journal.title]} />
      <div className="note-grid">
        {notes.map((note, i) => (
          <a
            href={href(`/journal/${note.slug}`)}
            className={`note-card tone-${note.color}`}
            key={note.slug}
            data-reveal
          >
            <div className={`note-art note-art-${i}`} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="note-card-copy">
              <span className="mono">
                {note.category} / {note.time}
              </span>
              <h3>{note.title}</h3>
              <span className="case-link">
                {site.journal.action}
                <Arrow />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
