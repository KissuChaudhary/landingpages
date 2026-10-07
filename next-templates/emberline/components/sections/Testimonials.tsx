import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/** Initials in a warm gradient, so there are no avatar photos to license or host. */
function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-ember-200 to-ember-500 text-[13px] font-semibold text-on-ember",
        className,
      )}
    >
      {initials}
    </span>
  );
}

function Person({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={name} />
      <div className="min-w-0">
        <p className="truncate text-[14px] font-medium text-ink">{name}</p>
        <p className="truncate text-[13px] text-ink-low">{role}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { eyebrow, title, description, featured, items, stats } = siteConfig.testimonials;

  return (
    <Section id="testimonials">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Featured quote */}
        <Card className="flex flex-col justify-between gap-10 lg:col-span-2 lg:p-9">
          <figure className="flex h-full flex-col justify-between gap-10">
            <div>
              <span aria-hidden className="block font-serif text-[64px] leading-[0.6] text-ember-400">
                “
              </span>
              <blockquote className="text-pretty mt-4 text-[1.25rem] font-medium leading-[1.4] tracking-[-0.015em] text-ink sm:text-[1.5rem]">
                {featured.quote}
              </blockquote>
            </div>
            <figcaption>
              <Person name={featured.name} role={featured.role} />
            </figcaption>
          </figure>
        </Card>

        {/* Numbers */}
        <Card className="flex flex-col justify-center divide-y divide-line !py-3">
          {stats.map((s) => (
            <dl key={s.label} className="py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="bg-gradient-to-b from-ember-100 to-ember-400 bg-clip-text font-serif text-[3rem] italic leading-none tracking-[-0.01em] text-transparent">
                {s.value}
              </dd>
              <dd className="mt-2 text-[14px] text-ink-mid" aria-hidden>
                {s.label}
              </dd>
            </dl>
          ))}
        </Card>

        {/* Short quotes */}
        {items.map((q) => (
          <Card key={q.name} className="flex flex-col justify-between gap-8">
            <figure className="flex h-full flex-col justify-between gap-8">
              <blockquote className="text-pretty text-[1.0625rem] leading-[1.55] text-ink">“{q.quote}”</blockquote>
              <figcaption>
                <Person name={q.name} role={q.role} />
              </figcaption>
            </figure>
          </Card>
        ))}
      </div>
    </Section>
  );
}
