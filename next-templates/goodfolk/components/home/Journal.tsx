import { site } from "@/site.config";
import { notes } from "@/data/notes";
import { route } from "@/lib/urls";
import { Arrow, Eyebrow, Mark, Multiline } from "../ui";
export function Journal() {
  return (
    <section
      className="journal wrapper section-pad"
      aria-labelledby="journal-title"
    >
      <Eyebrow>{site.journal.eyebrow}</Eyebrow>
      <h2 data-reveal id="journal-title">
        {site.journal.title}
      </h2>
      <div className="note-grid">
        {notes.map((note, i) => (
          <a
            key={note.slug}
            data-reveal
            href={route(`/notes/${note.slug}`)}
            className={`note-card note-${note.tone}`}
          >
            <div className="note-art" aria-hidden="true">
              {i === 0 ? (
                <>
                  <span className="note-faces">:)</span>
                  <span className="note-art-caption">A little more you.</span>
                </>
              ) : (
                <>
                  <span className="note-art-word">
                    WHAT
                    <br />
                    IF<span>?</span>
                  </span>
                  <Mark />
                </>
              )}
            </div>
            <div className="note-card-meta">
              <span>{note.category}</span>
              <Arrow diagonal />
            </div>
            <h3>
              <Multiline text={note.title} />
            </h3>
            <p>{note.displayDate}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
