"use client";
import { useState } from "react";
import { plants } from "@/data/plants";
import { PlantCard } from "../PlantCard";
export function PlantCollection() {
  const [light, setLight] = useState("All light");
  const [size, setSize] = useState("All sizes");
  const filtered = plants.filter(
    (plant) =>
      (light === "All light" || plant.light === light) &&
      (size === "All sizes" || plant.size === size),
  );
  return (
    <div className="collection-page wrap">
      <div className="collection-filters">
        <label>
          Light in your room
          <select
            value={light}
            onChange={(event) => setLight(event.target.value)}
          >
            <option>All light</option>
            <option>Bright indirect</option>
            <option>Filtered light</option>
          </select>
        </label>
        <label>
          A little or a lot?
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option>All sizes</option>
            <option>Statement</option>
            <option>Compact</option>
          </select>
        </label>
        <span role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "plant" : "plants"} to
          explore
        </span>
        <button
          className="filter-reset"
          onClick={() => {
            setLight("All light");
            setSize("All sizes");
          }}
        >
          Reset filters
        </button>
      </div>
      {filtered.length ? (
        <div className="plant-fan">
          {filtered.map((plant) => (
            <PlantCard
              key={plant.slug}
              plant={plant}
              index={plants.indexOf(plant)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-collection">
          <h2>A different kind of corner?</h2>
          <p>
            Try another combination, or tell us about your space. We can help
            you find a natural fit.
          </p>
          <button
            onClick={() => {
              setLight("All light");
              setSize("All sizes");
            }}
          >
            Show all plants
          </button>
        </div>
      )}
    </div>
  );
}
