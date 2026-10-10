// Journal articles. Each one gets a card on the home page and /journal, and its own
// page at /journal/<slug>. Body blocks: paragraphs, subheadings and pull quotes.

export type Block = { type: "p" | "h2" | "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  author: { name: string; role: string; image: string };
  image: string;
  alt: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "guest-list-over-venue",
    title: "Your guest list matters more than your venue",
    excerpt: "The best room in the city can't save the wrong crowd. How we build lists that actually show up.",
    date: "2026-09-18",
    author: { name: "Inés Romero", role: "Partnerships", image: "/images/team-ines.webp" },
    image: "/images/journal-guestlist.webp",
    alt: "A door host fastening a lime wristband on a guest's wrist",
    body: [
      { type: "p", text: "Every brief we get starts with a venue. A rooftop, a gallery, a warehouse someone saw on a scouting trip. It's a natural place to start, because a venue is easy to picture. But after more than 300 events, the thing we'd change first in almost every brief is the order: start with who's coming, then find the room that suits them." },
      { type: "h2", text: "A full room beats a famous one" },
      { type: "p", text: "A half-empty room photographs badly, feels awkward and makes guests leave early. A full room in an ordinary space feels like the place to be. That's why we plan capacity from the list, not the other way round. If we can confidently fill 180, we'd rather find a room for 160 than a room for 400." },
      { type: "p", text: "Turnout, the number of RSVPs who walk through the door, is the metric we watch most closely. Free events in big cities often see half their RSVPs turn up. Ours average 92 percent, and none of that comes from luck." },
      { type: "h2", text: "Three habits that fill a room" },
      { type: "p", text: "First, we confirm twice: once a week out, once the day before, by text rather than email. People who reply are coming. People who don't get a friendly nudge and their place goes to the waitlist." },
      { type: "p", text: "Second, we mix the list on purpose. A good room has regulars, newcomers, a few people your audience looks up to and the people who actually make the product. Each group makes the others want to come." },
      { type: "quote", text: "A room full of the right people turns an ordinary venue into the place everyone wishes they'd been." },
      { type: "p", text: "Third, we give people a reason to arrive early. A first drop, a short talk, a limited menu before nine. Early arrivals make the room feel full by the time everyone else gets there, and the first hour is when the best photos happen." },
      { type: "h2", text: "Then pick the room" },
      { type: "p", text: "Once we know who's coming, the venue choice gets easier and usually cheaper. We look for rooms that suit the crowd's size, light well for camera and are easy to reach on a weeknight. The famous rooftop can wait for the year you have the list to fill it." },
    ],
  },
  {
    slug: "the-48-hour-edit",
    title: "The 48-hour edit: how we keep a night posting",
    excerpt: "Content that arrives three weeks later is a recap. Content that arrives in two days is a campaign.",
    date: "2026-08-27",
    author: { name: "Priya Nair", role: "Content Director", image: "/images/team-priya.webp" },
    image: "/images/journal-edit.webp",
    alt: "An editor cutting event footage on two monitors late at night",
    body: [
      { type: "p", text: "The day after an event is when people are still talking about it. Guests are posting their own photos, friends who missed it are curious and the brand has a short window where the moment still feels current. Most event content arrives weeks later, after the window has shut." },
      { type: "p", text: "So we promise the first edits within 48 hours, and we plan the whole event around making that possible." },
      { type: "h2", text: "Plan the shots before the build" },
      { type: "p", text: "Our content director joins the project in week one, not the week of the event. While the space is being designed, we're mapping where the camera will stand, which moments will happen when and what each channel needs: vertical cuts for short-form, wide stills for press, detail shots for paid." },
      { type: "p", text: "That shot list shapes the room. A platform gets placed where the light is best. The confetti cue happens when the crew is in position. Nothing is left to chance on the night." },
      { type: "quote", text: "If the content plan starts the week of the event, you'll get a recap. If it starts in week one, you'll get a campaign." },
      { type: "h2", text: "Edit while the room is still full" },
      { type: "p", text: "An editor works on site, pulling selects as the crew shoots. By the time doors close, the first stills are graded and the first short cut is roughed out. The next day the team finishes the cutdowns, captions and formats." },
      { type: "h2", text: "Deliver in waves" },
      { type: "p", text: "Edits arrive in three waves: a first set of stills and one hero video at 24 hours, the full photo set and short cuts at 48 hours, then longer recaps and creator content over the following two weeks. The brand has something to post every day for a month, and every post points back to the night." },
    ],
  },
  {
    slug: "run-clubs-are-a-habit",
    title: "Run clubs aren't a trend. They're a habit.",
    excerpt: "Why a weekly community program can outperform a launch, and what it takes to keep one running.",
    date: "2026-07-30",
    author: { name: "Sam Keller", role: "Community Lead", image: "/images/team-sam.webp" },
    image: "/images/journal-runclub.webp",
    alt: "Running shoes and coffee cups on a café terrace after a run",
    body: [
      { type: "p", text: "Brands have discovered run clubs, and plenty of them will fade by next summer. The ones that last aren't really about running. They're about a reason to see the same people every week, and brands that understand that end up with the most loyal channel they have." },
      { type: "h2", text: "Frequency beats scale" },
      { type: "p", text: "A launch party reaches a few hundred people once. A weekly club reaches fewer people, but it reaches them fifty times a year. By the third month, members are bringing friends, posting without being asked and asking what's next." },
      { type: "p", text: "That's why we measure community programs by return rate, not attendance. If more than half the group comes back the following week, the program is working." },
      { type: "h2", text: "Hosts make or break it" },
      { type: "p", text: "The single biggest factor is the host. We recruit hosts from the community itself, people who already run, cook or gather, and we train and pay them. A good host remembers names, notices newcomers and makes the slowest runner feel like the reason everyone showed up." },
      { type: "quote", text: "People join for the activity and stay for each other. Your job is to make the second part easy." },
      { type: "h2", text: "Rituals over swag" },
      { type: "p", text: "Free merchandise brings people once. Rituals bring them back: the same start time, the same finish point, a photo at the end, a small token for first-timers that regulars recognise. Northpaw's bandanas cost almost nothing and became the club's badge." },
      { type: "h2", text: "Hand it over" },
      { type: "p", text: "We design every program to run without us. After the first season we hand over the routes, hosts, member list and a content kit, so the brand owns the community it built, which is the whole point." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** About 200 words a minute, rounded up. */
export const readingTime = (article: Article) =>
  Math.max(1, Math.ceil(article.body.reduce((words, block) => words + block.text.split(/\s+/).length, 0) / 200));
