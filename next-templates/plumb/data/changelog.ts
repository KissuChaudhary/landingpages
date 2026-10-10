/*
 * Releases, newest first. The home page shows the newest few on a ruler you can scrub
 * (site.shipped.count); /changelog lists them all. Tags: "new", "improved", "fixed".
 * Each release can be linked to as /changelog#<id>.
 */

export type Release = {
  id: string;
  date: string;
  version: string;
  title: string;
  tags: ("new" | "improved" | "fixed")[];
  body: string;
};

export const releases: Release[] = [
  {
    id: "funnels",
    date: "2026-10-06",
    version: "2.9.0",
    title: "Funnels",
    tags: ["new"],
    body: "Pick up to six pages or goals and see where people drop off between them. Funnels are on every plan, like everything else.",
  },
  {
    id: "faster-live-view",
    date: "2026-09-24",
    version: "2.8.2",
    title: "A faster live view",
    tags: ["improved"],
    body: "The live view now updates every second instead of every five, with half the requests it used to make.",
  },
  {
    id: "search-keywords",
    date: "2026-09-15",
    version: "2.8.0",
    title: "Search keywords",
    tags: ["new"],
    body: "Connect Search Console and see the queries that brought people in, right next to the pages they landed on.",
  },
  {
    id: "bot-filter-two",
    date: "2026-09-02",
    version: "2.7.4",
    title: "Bot filter, round two",
    tags: ["improved", "fixed"],
    body: "Twelve more crawler families are filtered out before they reach your chart, and preview bots from chat apps no longer count as visits.",
  },
  {
    id: "public-dashboards",
    date: "2026-08-20",
    version: "2.7.0",
    title: "Public dashboards",
    tags: ["new"],
    body: "Share a read-only link to any site's dashboard, with or without a password. Embed it in your docs or your open startup page.",
  },
  {
    id: "timezones",
    date: "2026-08-05",
    version: "2.6.1",
    title: "Midnight, fixed",
    tags: ["fixed"],
    body: "Daily totals for sites outside UTC no longer split a day in two around midnight.",
  },
  {
    id: "weekly-email",
    date: "2026-07-22",
    version: "2.6.0",
    title: "The weekly email, redesigned",
    tags: ["improved"],
    body: "Shorter, with your best day and top source up front. You can read it in thirty seconds.",
  },
  {
    id: "team-seats",
    date: "2026-07-08",
    version: "2.5.0",
    title: "Unlimited seats",
    tags: ["new"],
    body: "Invite as many people as you like to any site. Seats are free on every plan, and always will be.",
  },
  {
    id: "csv-export",
    date: "2026-06-17",
    version: "2.4.0",
    title: "CSV export",
    tags: ["new"],
    body: "Export any table, or a whole site's history, as CSV from the menu on each card.",
  },
  {
    id: "smaller-script",
    date: "2026-06-02",
    version: "2.3.2",
    title: "An even smaller script",
    tags: ["improved"],
    body: "The tracking script lost another 180 bytes. It's now 0.9 KB, compressed.",
  },
  {
    id: "campaigns",
    date: "2026-05-12",
    version: "2.3.0",
    title: "Campaigns",
    tags: ["new"],
    body: "UTM tags are read and grouped for you, so each campaign gets its own row without a spreadsheet.",
  },
  {
    id: "proxy",
    date: "2026-04-21",
    version: "2.2.0",
    title: "Serve it from your own domain",
    tags: ["new"],
    body: "A one-line proxy setup for Next.js, Netlify, Vercel and Cloudflare, so ad blockers count your visitors too.",
  },
];
