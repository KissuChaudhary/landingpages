import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/site.config";
import { getWork, work } from "@/data/work";
import { asset } from "@/lib/urls";
import { SmartLink, ArrowDot } from "@/components/ui/Action";
import { StatRoll } from "@/components/ui/NumberRoll";
import { ArrowLeft } from "@/components/ui/Icons";
import { Closing } from "@/components/sections/Closing";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getWork((await params).slug);
  if (!item) return {};
  return { title: `${item.client}: ${item.title}`, description: item.summary, ...(site.url ? { openGraph: { images: [item.image] } } : {}) };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const item = getWork((await params).slug);
  if (!item) notFound();
  const next = work[(work.indexOf(item) + 1) % work.length];

  return (
    <>
      <article className="case" data-accent={item.accent}>
        <header className="container case-head">
          <SmartLink to="/work" className="back-link">
            <ArrowLeft size={16} /> All work
          </SmartLink>
          <div className="case-kicker" data-reveal>
            <span className="tag">{item.kind}</span>
            <span className="case-client">{item.client}</span>
          </div>
          <h1 className="h1 case-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {item.title}
          </h1>
          <p className="lead case-summary" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {item.summary}
          </p>
          <dl className="case-facts" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
            {item.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <figure className="container case-hero">
          <span className="case-hero-frame" data-reveal="mask">
            <img src={asset(item.image)} alt={item.alt} width={1088} height={680} />
          </span>
        </figure>

        <section className="container case-results" aria-label="Results">
          {item.results.map((r, i) => (
            <div key={r.label} className="case-result" data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
              <span className="case-figure">
                <StatRoll value={r.value} decimals={r.decimals} prefix={r.prefix} suffix={r.suffix} />
              </span>
              <span className="case-result-label">{r.label}</span>
            </div>
          ))}
        </section>

        <section className="container case-block">
          <h2 className="case-label label">The brief</h2>
          <p className="case-lede" data-reveal>
            {item.brief}
          </p>
        </section>

        <section className="container case-block">
          <h2 className="case-label label">What we built</h2>
          <ol className="case-built">
            {item.built.map((b, i) => (
              <li key={b.title} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                <span className="case-built-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="case-built-title">{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="container case-gallery" aria-label="Gallery">
          {item.gallery.map((g, i) => (
            <figure key={g.image} data-reveal="mask" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <img src={asset(g.image)} alt={g.alt} width={800} height={800} loading="lazy" />
            </figure>
          ))}
        </section>

        <section className="container case-block case-pair">
          <div data-reveal>
            <h2 className="case-label label">On the night</h2>
            <p className="body">{item.night}</p>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <h2 className="case-label label">Afterglow</h2>
            <p className="body">{item.afterglow}</p>
          </div>
        </section>

        <figure className="container case-quote" data-reveal>
          <blockquote className="h3">“{item.quote.text}”</blockquote>
          <figcaption>
            <strong>{item.quote.name}</strong> · {item.quote.role}
          </figcaption>
        </figure>

        <nav className="container case-next" aria-label="Next case study">
          <SmartLink to={`/work/${next.slug}`} className="next-card" data-accent={next.accent}>
            <span className="next-copy">
              <span className="label">Next turnout</span>
              <span className="h2 next-client">{next.client}</span>
              <span className="next-title">{next.title}</span>
            </span>
            <span className="next-media">
              <img src={asset(next.image)} alt="" width={600} height={600} loading="lazy" />
            </span>
            <ArrowDot tone="ink" size={56} />
          </SmartLink>
        </nav>
      </article>
      <Closing />
    </>
  );
}
