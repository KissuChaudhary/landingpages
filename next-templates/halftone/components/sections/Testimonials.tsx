import { site } from "@/site.config";
import { Reveal, SectionHeader } from "@/components/ui/Reveal";
import { Face } from "@/components/ui/Status";

function Author({ name, role, index }: { name: string; role: string; index: number }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Face name={name} index={index} />
      <div>
        <p className="text-sm font-bold leading-tight text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500">{role}</p>
      </div>
    </figcaption>
  );
}

/** One long story with its result, and two short ones beside it. */
export function Testimonials() {
  const { testimonials } = site;
  const { featured } = testimonials;

  return (
    <section id="customers" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker={testimonials.kicker} lead={testimonials.lead} accent={testimonials.accent} />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
          <Reveal y={30} className="surface flex flex-col rounded-[30px] p-2 lg:col-span-7">
            <figure className="flex flex-1 flex-col justify-between gap-10 rounded-[24px] bg-white p-7 ring-1 ring-black/[0.05] sm:p-10">
              <blockquote className="text-pretty text-[22px] font-medium leading-[1.4] tracking-[-0.015em] text-heading sm:text-[26px]">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <Author name={featured.name} role={featured.role} index={0} />
            </figure>
            <div className="flex items-baseline gap-3 px-7 pb-5 pt-6 sm:px-10">
              <span className="text-[40px] font-semibold leading-none tracking-[-0.04em] text-accent">{featured.metric.value}</span>
              <span className="text-[15px] font-medium text-body">{featured.metric.label}</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:col-span-5">
            {testimonials.items.map((item, index) => (
              <Reveal key={item.name} y={30} delay={0.1 * (index + 1)} className="surface rounded-[30px] p-7 sm:p-8">
                <figure className="flex h-full flex-col justify-between gap-8">
                  <blockquote className="text-[16px] leading-relaxed text-neutral-700">&ldquo;{item.quote}&rdquo;</blockquote>
                  <Author name={item.name} role={item.role} index={index + 1} />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
