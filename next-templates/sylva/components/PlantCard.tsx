import { ArrowUpRight } from "lucide-react";
import { type Plant } from "@/data/plants";
import { asset, href } from "@/lib/urls";
export function PlantCard({
  plant,
  index = 0,
}: {
  plant: Plant;
  index?: number;
}) {
  return (
    <a
      className={`plant-card plant-card-${index}`}
      href={href(`/plants/${plant.slug}`)}
    >
      <div className="plant-card-number">
        0{index + 1}
        <span>{plant.light}</span>
      </div>
      <div className={`plant-card-image image-${plant.slug}`}>
        <img
          src={asset(plant.image)}
          alt={`${plant.botanical} in a ceramic planter`}
          loading="lazy"
        />
      </div>
      <div className="plant-card-copy">
        <p className="botanical-name">{plant.botanical}</p>
        <h3>{plant.name}</h3>
        <p>{plant.character}</p>
        <span className="plant-card-link">
          Meet the plant
          <span className="arrow-circle">
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </span>
        </span>
      </div>
    </a>
  );
}
