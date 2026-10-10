export type Plant = {
  slug: string;
  name: string;
  botanical: string;
  character: string;
  description: string;
  image: string;
  light: "Bright indirect" | "Filtered light";
  size: "Statement" | "Compact";
  care: { title: string; body: string }[];
};
export const plants: Plant[] = [
  {
    slug: "monstera",
    name: "The sculptural one",
    botanical: "Monstera deliciosa",
    character: "A little wild. A lot of character.",
    description:
      "Generous split leaves and an easy, open silhouette. A Monstera makes a bright living-room corner feel like its own small jungle.",
    image: "/images/monstera.webp",
    light: "Bright indirect",
    size: "Statement",
    care: [
      {
        title: "Find its light",
        body: "Choose bright, indirect light. Keep tender leaves out of strong direct summer sun.",
      },
      {
        title: "Read the soil",
        body: "Water when the top layer of compost has started to dry, then allow excess water to drain. Check the soil rather than following a fixed weekly schedule.",
      },
      {
        title: "Give it room",
        body: "Leave space for the leaves to spread. A climbing support can help an established plant grow upright.",
      },
    ],
  },
  {
    slug: "kentia-palm",
    name: "The quiet companion",
    botanical: "Howea forsteriana",
    character: "Soft fronds. A slower kind of living.",
    description:
      "Arching fronds bring movement and softness to a room. Kentia is our pick for a reading corner that could use a little calm.",
    image: "/images/palm.webp",
    light: "Filtered light",
    size: "Statement",
    care: [
      {
        title: "Keep it gentle",
        body: "Filtered light suits Kentia well. Protect the fronds from strong direct sunlight.",
      },
      {
        title: "Check before watering",
        body: "Let the surface of the compost begin to dry before watering. Water thoroughly and empty any collected water from the outer pot.",
      },
      {
        title: "A calm corner",
        body: "Avoid draughts and radiators. Wipe dusty leaves gently and remove only fronds that are fully brown.",
      },
    ],
  },
  {
    slug: "rubber-plant",
    name: "The bold little detail",
    botanical: "Ficus elastica",
    character: "Deep green. Perfectly understated.",
    description:
      "Glossy leaves with a rich, almost burgundy finish. A rubber plant adds a confident shape beside a desk, a console or your favourite chair.",
    image: "/images/rubber.webp",
    light: "Bright indirect",
    size: "Compact",
    care: [
      {
        title: "A bright position",
        body: "Give it good, indirect light and a stable position away from cold draughts.",
      },
      {
        title: "Less guesswork",
        body: "Allow the top of the compost to dry before watering. Water less frequently during quieter winter growth.",
      },
      {
        title: "Keep the leaves clear",
        body: "Wipe broad leaves with a soft, damp cloth. Rotate occasionally to encourage balanced growth.",
      },
    ],
  },
];
export const getPlant = (slug: string) =>
  plants.find((plant) => plant.slug === slug);
