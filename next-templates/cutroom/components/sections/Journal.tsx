import { ArrowUpRight, Play } from "lucide-react";

import { Section, SceneHead } from "@/components/ui/Section";
import { siteConfig, type Tone } from "@/site.config";

/** Painted with CSS, so the journal cards need no cover images. */
const ART: Record<Tone, string> = {
  flame: "bg-[linear-gradient(135deg,var(--color-flame),var(--color-plum)_75%,var(--color-ink))]",
  blue: "bg-[linear-gradient(135deg,var(--color-blue),var(--color-plum)_75%,var(--color-ink))]",
  green: "bg-[linear-gradient(135deg,var(--color-green),var(--color-ink)_80%)]",
  ink: "bg-[linear-gradient(135deg,var(--color-ink-raised),var(--color-ink))]",
};

export function Journal() {
  const { posts, link, ...intro } = siteConfig.journal;

  return (
    <Section id="journal">
      <SceneHead {...intro} />

      <ul className="grid gap-x-5 gap-y-10 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.title}>
            <a href={link.href} className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-4">
              <div className={`relative aspect-video overflow-hidden rounded-2xl ${ART[post.tone]}`}>
                <span aria-hidden className="absolute -right-[10%] -top-[40%] size-[70%] rounded-full bg-white/15" />
                <span aria-hidden className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-4 fill-current" />
                </span>
                <span className="timecode absolute bottom-3 right-3 rounded bg-ink/70 px-2 py-1 text-on-ink">{post.read}</span>
              </div>
              <p className="timecode mt-5 flex items-center gap-3 text-text-low">
                <span className="text-flame-text">{post.tag}</span>
                <span aria-hidden>/</span>
                {post.date}
              </p>
              <h3 className="display mt-3 flex items-start justify-between gap-4 text-[1.375rem] leading-[1.18] text-text">
                <span className="text-balance underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-flame">{post.title}</span>
                <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-text-low transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
              </h3>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
