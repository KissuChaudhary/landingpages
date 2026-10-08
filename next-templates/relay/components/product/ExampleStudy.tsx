import type { ScenarioId } from "@/site.config";
export function ExampleStudy({ id }: { id: ScenarioId }) {
  if (id === "week")
    return (
      <div className="study study-week" aria-hidden="true">
        <div>
          <span>Tuesday</span>
          <strong>A quiet half hour.</strong>
          <i />
        </div>
        <div>
          <span>Thursday</span>
          <strong>One protected hour.</strong>
          <i />
        </div>
        <div>
          <span>Weekend</span>
          <strong>A small thing, made.</strong>
          <i />
        </div>
      </div>
    );
  if (id === "research")
    return (
      <div className="study study-research" aria-hidden="true">
        <div>
          <span>One document</span>
          <i style={{ width: "86%" }} />
        </div>
        <div>
          <span>A few notes</span>
          <i style={{ width: "62%" }} />
        </div>
        <div>
          <span>Something on paper</span>
          <i style={{ width: "40%" }} />
        </div>
      </div>
    );
  return (
    <div className="study study-draft" aria-hidden="true">
      <span>A small update</span>
      <p>
        Little by little,
        <br />
        the first idea
        <br />
        is taking shape.
      </p>
      <div>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
