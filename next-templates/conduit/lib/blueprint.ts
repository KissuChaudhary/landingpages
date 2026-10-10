import type { BlueprintKey } from "@/data/blueprints";
import { href } from "./urls";
/** Scrolls to the hero route board and runs the chosen blueprint there. */
export function showBlueprint(key: BlueprintKey) {
  const board = document.getElementById("route");
  if (!board) return window.location.assign(href("/#route"));
  const still = document.documentElement.dataset.motion === "off";
  board.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent("conduit:blueprint", { detail: key }));
}
