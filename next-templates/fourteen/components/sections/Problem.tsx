import { Container } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

/** Nine small orange dots, the mark above each problem. */
function Dots() {
  return (
    <span aria-hidden className="grid size-7 grid-cols-3 gap-[3px]">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="size-[6px] rounded-full bg-orange-300" />
      ))}
    </span>
  );
}

/** Three problems, side by side, divided by thin orange rules. The heading is set entirely in italic. */
export function Problem() {
  const { problem } = siteConfig;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <header className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-balance font-serif text-[clamp(2.25rem,1.2rem+3.8vw,4rem)] italic leading-[1.1] tracking-tight text-ink">
            {problem.title.before} {problem.title.accent}
          </h2>
          <p className="text-pretty mx-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-ink-mid">{problem.description}</p>
        </header>

        <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-0">
          {problem.items.map((item, index) => (
            <li key={item.title} className={`md:px-8 ${index > 0 ? "md:border-l md:border-peach" : "md:pl-0"} ${index === problem.items.length - 1 ? "md:pr-0" : ""}`}>
              <Dots />
              <h3 className="mt-7 text-[1.25rem] font-medium text-ink">{item.title}</h3>
              <p className="text-pretty mt-3 text-[15px] leading-[1.7] text-ink-mid">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
