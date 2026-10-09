import type { UiItem } from '../registry';

export const liveMap: UiItem = {
  name: 'live-map',
  title: 'Live map',
  description: 'The world as dots, lighting up where things happen: pings ripple, the light lingers, and one card follows the newest event from city to city.',
  summary:
    '"Used in 140 countries" is a sentence; this is the feeling. The continents are an even field of dots, and every time something happens somewhere (a signup, an order, a deploy) the dots around it light up and a hairline ring ripples out. The light fades slowly, so the last minute of activity stays on the map as a faint tint that shows where people are. One card follows the newest event, gliding from Lisbon to Tokyo with its words morphing rather than stacking up popups, and swinging to the other side near an edge. Give an event a starting point and a route arcs across from there, with a short dash running along it like a parcel. Fixed places, an office or a roastery, sit as rings.',
  file: 'live-map.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: [],
  tabs: ['Signups', 'Orders'],
  states: [
    { name: 'land', description: 'A staggered grid every 2.6° sampled against hand-drawn coastlines (no map data to load), drawn as one path; cropped between 76°N and 56°S.' },
    { name: 'ping', description: 'Dots within about 5° light in the primary colour, brightest at the centre; a 1px ring scales out and fades (1.4s). The light holds briefly, then fades to a faint tint over afterglow (9s by default).' },
    { name: 'card', description: 'Follows the newest ping (620ms glide); its two lines morph letter by letter; flips left near the right edge and below near the bottom.' },
    { name: 'route', description: 'With from, a curve lifted in proportion to the distance draws itself (pathLength 1), a 2px dash runs from end to end (1.5s), then the curve fades.' },
    { name: 'markers', description: 'A hairline ring with a dot in the middle, always shown.' },
  ],
  usage: `import { LiveMap } from "@/components/live-map";

<LiveMap
  pings={[
    { id: 1, lat: 38.7, lon: -9.1, label: "New signup", detail: "Lisbon, Portugal" },
    { id: 2, lat: 35.7, lon: 139.7, label: "New signup", detail: "Tokyo, Japan" },
  ]}
/>`,
  recipeTitle: 'From an event stream',
  recipeIntro: 'Keep the last dozen events and pass them in; ids the map hasn’t seen before ping once. Cities can come from your geo-IP lookup.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { LiveMap, type MapPing } from "@/components/live-map";

const STORE = { lat: 38.7, lon: -9.1 };

export function OrdersMap() {
  const [pings, setPings] = useState<MapPing[]>([]);
  useEffect(() => {
    const source = new EventSource("/api/orders/stream");
    source.onmessage = (e) => {
      const order = JSON.parse(e.data); // { id, total, city, country, lat, lon }
      setPings((all) => [
        ...all.slice(-11),
        { id: order.id, lat: order.lat, lon: order.lon, label: \`Order · $\${order.total}\`, detail: \`\${order.city}, \${order.country}\`, from: STORE },
      ]);
    };
    return () => source.close();
  }, []);
  return <LiveMap pings={pings} markers={[STORE]} />;
}`,
  props: [
    { name: 'pings', type: '{ id, lat, lon, label?, detail?, from? }[]', description: 'Recent events, oldest first. Each id pings once, the first time it’s seen.' },
    { name: 'markers', type: '{ lat, lon, label? }[]', description: 'Places that are always marked, like a store or an office.' },
    { name: 'afterglow', type: 'number', default: '9000', description: 'Milliseconds for a ping’s light to fade to its faint tint.' },
    { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show the card on the newest ping.' },
  ],
  notes: [
    'The map is decorative to assistive tech; each new event’s label and detail are announced through a polite status region.',
    'Points use plain latitude and longitude; the projection is a stretched equirectangular, so it reads like the maps people know without a library.',
    'The coastlines are deliberately coarse; at this dot size the detail wouldn’t show. Antarctica and the far north are cropped.',
    'Installs Text morph. With reduced motion nothing ripples, glides or draws; pings simply light their dots.',
  ],
};
