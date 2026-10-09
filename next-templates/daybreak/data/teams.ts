export const teams = [
  {
    name: "Forma",
    mark: "tiles",
    person: "Mara Singh",
    role: "Growth lead",
    image: "mara",
    quote:
      "We wanted our Monday mornings back. Now the numbers are together, and the conversation can start with what comes next.",
  },
  {
    name: "Sundial",
    mark: "sun",
    person: "Elliot Park",
    role: "Co-founder",
    image: "elliot",
    quote:
      "A small team needs a clear picture. Having the channels in one place makes our next decision feel a little less complicated.",
  },
  {
    name: "Northline",
    mark: "arcs",
    person: "Noa Williams",
    role: "Strategy director",
    image: "noa",
    quote:
      "The useful part is the space between the data and the decision. This is where our team can finally think together.",
  },
  {
    name: "Fieldwork",
    mark: "diamonds",
    person: "Leo Martin",
    role: "Studio partner",
    image: "leo",
    quote:
      "Every client has a different story. A shared way to review performance gives us more time to tell it well.",
  },
] as const;
export const audiences = [
  {
    id: "marketing",
    label: "Marketing teams",
    title: "Start with the picture.\nThen make your move.",
    text: "Bring your channels into one view. Spend your meeting on the next decision, instead of the last report.",
    scene: "signals",
  },
  {
    id: "startup",
    label: "Small teams",
    title: "A smaller team.\nA little more possibility.",
    text: "Keep the useful routines moving. Let the weekly report prepare itself, while you focus on the work ahead.",
    scene: "workflow",
  },
  {
    id: "agency",
    label: "Studios & agencies",
    title: "Different clients.\nOne clear way to work.",
    text: "Keep each client's context close. Review results, shape a recommendation, and make the report your own.",
    scene: "charts",
  },
] as const;
export const workspaceIdentity = {
  team: teams[0].name,
  person: teams[0].person,
  firstName: teams[0].person.split(" ")[0],
  initials: teams[0].person
    .split(" ")
    .map((part) => part[0])
    .join(""),
};
