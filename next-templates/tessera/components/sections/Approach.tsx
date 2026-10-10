import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
export function Approach() {
  const data = site.approach;
  return (
    <section className="approach section light" id="approach" data-scene>
      <div className="approach-intro">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <Title lines={data.title} />
        <p data-reveal>{data.description}</p>
        <div className="approach-symbol" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="process-steps">
        {data.steps.map((step, i) => (
          <article className="process-step" key={step.title} data-reveal>
            <div className="step-meta mono">
              <span>0{i + 1}</span>
              <span>{step.timing}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <div className="step-output">
              <span aria-hidden="true">↳</span>
              {step.output}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
