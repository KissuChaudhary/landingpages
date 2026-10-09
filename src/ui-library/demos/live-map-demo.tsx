'use client';

import React, { useEffect, useState } from 'react';
import { LiveMap, type MapPing } from '../registry/live-map';
import { NumberRoll } from '../registry/number-roll';

const CITIES: [string, number, number][] = [
  ['Lisbon, Portugal', 38.7, -9.1], ['Berlin, Germany', 52.5, 13.4], ['New York, USA', 40.7, -74], ['San Francisco, USA', 37.8, -122.4],
  ['Toronto, Canada', 43.7, -79.4], ['Mexico City, Mexico', 19.4, -99.1], ['São Paulo, Brazil', -23.5, -46.6], ['Buenos Aires, Argentina', -34.6, -58.4],
  ['Lagos, Nigeria', 6.5, 3.4], ['Nairobi, Kenya', -1.3, 36.8], ['Cape Town, South Africa', -33.9, 18.4], ['Cairo, Egypt', 30, 31.2],
  ['Dubai, UAE', 25.2, 55.3], ['Mumbai, India', 19.1, 72.9], ['Bengaluru, India', 12.97, 77.6], ['Singapore', 1.35, 103.8],
  ['Jakarta, Indonesia', -6.2, 106.8], ['Tokyo, Japan', 35.7, 139.7], ['Seoul, South Korea', 37.6, 127], ['Sydney, Australia', -33.9, 151.2],
  ['Auckland, New Zealand', -36.8, 174.8], ['London, UK', 51.5, -0.13], ['Paris, France', 48.9, 2.35], ['Stockholm, Sweden', 59.3, 18.1],
  ['Istanbul, Türkiye', 41, 29], ['Manila, Philippines', 14.6, 121], ['Bangkok, Thailand', 13.75, 100.5], ['Austin, USA', 30.3, -97.7],
  ['Vancouver, Canada', 49.3, -123.1], ['Bogotá, Colombia', 4.7, -74.1], ['Lima, Peru', -12, -77], ['Accra, Ghana', 5.6, -0.2],
];

const ROASTERY = { lat: 38.7, lon: -9.1 };
const PRICES = [18, 24, 32, 21, 46, 28, 36];

export default function LiveMapDemo({ tab = 'Signups' }: { tab?: string }) {
  const orders = tab === 'Orders';
  const [pings, setPings] = useState<MapPing[]>([]);
  const [count, setCount] = useState(orders ? 312 : 2847);

  // Something happens somewhere every second or so.
  useEffect(() => {
    let n = 0;
    let last = -1;
    const next = () => {
      let i = Math.floor(Math.random() * CITIES.length);
      if (i === last || (orders && CITIES[i][0].startsWith('Lisbon'))) i = (i + 5) % CITIES.length;
      last = i;
      const [place, lat, lon] = CITIES[i];
      const id = n++;
      setPings((p) => [
        ...p.slice(-12),
        orders
          ? { id, lat, lon, label: `Order · $${PRICES[id % PRICES.length]}`, detail: place, from: ROASTERY }
          : { id, lat, lon, label: 'New signup', detail: place },
      ]);
      setCount((c) => c + 1);
    };
    const first = window.setTimeout(next, 500);
    const timer = window.setInterval(next, orders ? 1900 : 1300);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [orders]);

  return (
    <div className="w-full max-w-[640px] rounded-[20px] border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 motion-safe:animate-[ui-ping_1.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            {orders ? 'Orders today' : 'Signups this week'}
          </p>
          <p className="mt-1 text-[22px] font-semibold leading-none tracking-tight text-foreground tabular-nums sm:text-[26px]">
            <NumberRoll value={count} />
          </p>
        </div>
        <p className="text-right text-[11.5px] text-muted-foreground">{orders ? 'Shipping from Lisbon' : 'In 32 cities'}</p>
      </div>
      <LiveMap pings={pings} markers={orders ? [ROASTERY] : []} afterglow={orders ? 7000 : 9000} />
    </div>
  );
}
