export const projects = [
  {
    slug: "sidequest",
    name: "SIDEQUEST",
    number: "01",
    color: "lilac",
    descriptor: "Take the scenic route.",
    type: "A footwear brand world",
    image: "/images/sidequest.webp",
    alt: "An off-white tennis sneaker and a yellow tennis ball on a lilac sculptural set",
    tags: ["Positioning", "Art direction", "Campaign concept"],
    intro:
      "A little less performance. A little more play. A creative direction for a footwear brand that believes the best part of the day is the unplanned part.",
    question:
      "What if a sports brand gave people permission to play, rather than another reason to perform?",
    direction:
      "We imagined a world where everyday detours feel like small adventures. Unexpected color pairings, tactile product imagery, and a voice that invites rather than instructs.",
    making:
      "The sneaker becomes a sculptural object. A tennis ball adds a small wink. Lilac, orange and cobalt carry the same energy from the main campaign frame to a simple social crop.",
    takeaway:
      "A brand can feel athletic without sounding competitive. The creative territory is the freedom to go your own way.",
  },
  {
    slug: "goodside",
    name: "GOODSIDE",
    number: "02",
    color: "mint",
    descriptor: "There’s good in going your own way.",
    type: "A culture-led lifestyle direction",
    image: "/images/creator.webp",
    alt: "A smiling adult in a cobalt shirt holding a green skateboard against a mint backdrop",
    tags: ["Brand voice", "Creator direction", "Social concept"],
    intro:
      "A lifestyle direction built around the people behind the product. Loose, human and full of good energy.",
    question:
      "How do you make a lifestyle brand feel like a community before it feels like a campaign?",
    direction:
      "Start with the people. We imagined an open, optimistic brand world that celebrates character over polish, and a point of view over a perfect pose.",
    making:
      "Hard daylight, a cobalt shirt, a well-loved skateboard and an unguarded smile. A simple visual language that gives personality the whole frame.",
    takeaway:
      "When a brand makes room for people to be themselves, the product becomes part of the story rather than the whole of it.",
  },
  {
    slug: "sundays",
    name: "SUNDAYS",
    number: "03",
    color: "coral",
    descriptor: "A sip of doing absolutely nothing.",
    type: "A drink with a different pace",
    image: "/images/sip.webp",
    alt: "An adult in lavender knitwear enjoying a drink from a coral can",
    tags: ["Creative strategy", "Campaign imagery", "Social direction"],
    intro:
      "A drink concept that celebrates the small pause. No productivity story, no extraordinary occasion. Just a moment that belongs to you.",
    question:
      "Could a drink brand own a feeling rather than another functional promise?",
    direction:
      "We chose the ordinary pleasure of a pause. The name, tone and photographic world all come back to a simple feeling: there is nowhere else you need to be.",
    making:
      "Warm coral and soft lavender meet direct flash. The image catches the feeling before it shows the product, with plenty of space for a quiet line of copy.",
    takeaway:
      "A distinctive brand world can begin with a very small human truth. The creative work is making that truth easy to feel.",
  },
] as const;
export type Project = (typeof projects)[number];
