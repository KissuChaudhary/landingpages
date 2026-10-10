import { plants } from "@/data/plants";
import { site } from "@/site.config";
import { PlantCard } from "../PlantCard";
import { SectionHeading, Button } from "../ui/Primitives";
export function Collection() {
  return (
    <section
      id="plants"
      className="collection"
      data-fan
      aria-labelledby="collection-heading"
    >
      <div className="collection-sticky wrap">
        <div id="collection-heading">
          <SectionHeading {...site.collection} centered />
        </div>
        <div className="plant-fan">
          {plants.map((plant, index) => (
            <PlantCard key={plant.slug} plant={plant} index={index} />
          ))}
        </div>
        <div className="collection-bottom">
          <Button to="/collection" outline>
            {site.collection.cta}
          </Button>
          <span>Find a shape that speaks to your space.</span>
        </div>
      </div>
    </section>
  );
}
