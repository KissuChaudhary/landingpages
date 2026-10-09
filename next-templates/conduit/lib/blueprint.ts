import type { BlueprintKey } from "@/data/blueprints";
import { href } from "./urls";
/** Scrolls to the agent builder and opens the chosen blueprint in place. */
export function showBlueprint(key: BlueprintKey) {
  const builder = document.getElementById("builder");
  if (!builder) return window.location.assign(href("/#builder"));
  const still = document.documentElement.dataset.motion === "off";
  builder.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent("conduit:blueprint", { detail: key }));
}
