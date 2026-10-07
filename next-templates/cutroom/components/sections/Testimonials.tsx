import { Pin, ThumbsUp } from "lucide-react";

import { Section, SceneHead, Initial } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const TINTS = ["bg-flame", "bg-blue-soft", "bg-green-soft", "bg-flame-soft"];

/**
 * Testimonials set as a comment thread: creators talk in comments, so the quotes do too. The pinned one runs
 * across the top at a larger size; the rest sit in a row below. Names are plain text and the avatars are
 * initials, so there are no photos to license. No platform logos are used.
 */
export function Testimonials() {
  const { comments, ...intro } = siteConfig.testimonials;
  const pinned = comments.find((c) => c.pinned) ?? comments[0];
  const rest = comments.filter((c) => c !== pinned);

  const Meta = ({ comment, index }: { comment: (typeof comments)[number]; index: number }) => (
    <div className="flex items-center gap-3">
      <Initial name={comment.name} className={TINTS[index % TINTS.length]} />
      <div className="min-w-0">
        <p className="truncate text-[15px] font-bold text-text">{comment.handle}</p>
        <p className="text-[13px] leading-snug text-text-mid">
          {comment.name} <span className="text-text-low">· {comment.time}</span>
        </p>
      </div>
    </div>
  );

  const Likes = ({ value }: { value: string }) => (
    <p className="timecode flex items-center gap-2 text-text-low">
      <ThumbsUp className="size-4" strokeWidth={2} />
      {value}
      <span aria-hidden className="ml-3 normal-case tracking-normal">
        Reply
      </span>
    </p>
  );

  return (
    <Section id="creators">
      <SceneHead {...intro} />

      <figure className="rounded-3xl border border-line-strong bg-flame-soft p-6 sm:p-10">
        <p className="timecode mb-6 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-text-mid">
          <Pin className="size-3.5 text-flame-text" strokeWidth={2.25} />
          Pinned by creator
        </p>
        <blockquote className="display text-pretty text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-[1.18] text-text">
          {pinned.text}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Meta comment={pinned} index={0} />
          <Likes value={pinned.likes} />
        </figcaption>
      </figure>

      <ul className={cn("mt-4 grid gap-4", rest.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
        {rest.map((comment, i) => (
          <li key={comment.handle} className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-paper p-6">
            <blockquote className="text-pretty text-[1.0625rem] font-medium leading-[1.55] text-text">{comment.text}</blockquote>
            <div className="space-y-4">
              <Meta comment={comment} index={i + 1} />
              <Likes value={comment.likes} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
