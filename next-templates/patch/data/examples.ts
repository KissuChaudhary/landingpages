import { signup } from "./signup";
import { pricing } from "./pricing";
import { command } from "./command";
import type { ExampleId } from "@/site.config";
export const examples = [signup, pricing, command];
export function getExample(id: ExampleId) {
  return examples.find((example) => example.id === id) || signup;
}
