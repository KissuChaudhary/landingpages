import { Container, Ring, SectionHead } from "@/components/ui/Kit";
import { Visual } from "@/components/visuals/Visuals";
import { siteConfig } from "@/site.config";

/** Eight cards in two columns. Each is a drawing on white above a cream footer holding the number, title and text. */
export function Features() {
  const { features } = siteConfig;

  return (
    <section id="features" className="scroll-mt-28 pb-24 sm:pb-32">
      <Container>
        <SectionHead title={features.title} description={features.description} />

        <ul className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          {features.items.map((item, index) => (
            <li key={item.title}>
              <Ring className="h-full" innerClassName="flex flex-col p-1.5 sm:p-2">
                <div className="h-56 px-2 pb-2 pt-6 sm:px-4">
                  <Visual name={item.visual} />
                </div>
                <div className="mt-auto rounded-2xl bg-wash px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-card text-[11px] font-semibold text-ink-mid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-[1.5rem] leading-[1.2] text-ink">{item.title}</h3>
                  <p className="text-pretty mt-3 text-[15px] leading-[1.65] text-ink-mid">{item.text}</p>
                </div>
              </Ring>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
