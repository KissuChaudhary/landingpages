import type { ExampleId } from "@/site.config";
export type Example = {
  id: ExampleId;
  label: string;
  file: string;
  request: string;
  summary: string;
  before: string;
  after: string;
  removed: string[];
  added: string[];
  output: { title: string; description: string; action: string };
};
