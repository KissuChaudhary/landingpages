import { FileVideo, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Clip } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

/**
 * The closing block, in full-bleed orange. The headline reuses the clip, inverted (an ink clip with orange
 * handles). Beside it, a drop zone drawn in markup with three queued files, which echoes what the visitor will
 * actually do next. The files are plain text from config; nothing is uploaded.
 */
export function FinalCta() {
  const { title, description, primary, secondary, drop } = siteConfig.cta;

  return (
    <section id="contact" className="relative scroll-mt-20 bg-flame py-16 text-ink md:py-24">
      <div className="mx-auto grid w-[var(--content)] items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="display max-w-[9em] text-balance text-[clamp(2.75rem,1.2rem+6vw,6rem)] leading-[0.98]">
            {title.before}{" "}
            <Clip className="bg-ink text-flame [&>span]:bg-flame">{title.clip}</Clip>
          </h2>
          <p className="text-pretty mt-7 max-w-[30rem] text-[1.0625rem] font-medium leading-[1.6] md:text-[1.25rem]">{description}</p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button href={primary.href}>{primary.label}</Button>
            <a
              href={secondary.href}
              className="rounded text-[16px] font-bold underline decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-flame"
            >
              {secondary.label}
            </a>
          </div>
        </div>

        <div aria-hidden className="lg:col-span-5">
          <div className="rounded-3xl border-2 border-dashed border-ink/50 p-5 sm:p-7">
            <div className="flex flex-col items-center py-4 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-ink text-flame">
                <UploadCloud className="size-6" strokeWidth={2} />
              </span>
              <p className="display mt-5 text-[1.5rem] leading-tight">{drop.title}</p>
              <p className="mt-1.5 text-[15px] font-medium">{drop.hint}</p>
            </div>
            <ul className="mt-3 space-y-2.5">
              {drop.files.map((file, i) => (
                <li key={file.name} className="flex items-center gap-3 rounded-xl bg-ink/10 p-3">
                  <FileVideo className="size-5 shrink-0" strokeWidth={2} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold">{file.name}</p>
                    <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-ink/20">
                      <span className="block h-full rounded-full bg-ink" style={{ width: `${[100, 72, 38][i % 3]}%` }} />
                    </span>
                  </div>
                  <span className="timecode shrink-0">{file.size}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
