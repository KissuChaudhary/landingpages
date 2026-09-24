import React from 'react';
import { Star } from 'lucide-react';

const features = [
  "Top Rated Editors On Fiverr",
  "10 years on industry",
  "Fast Delivery",
  "500+ Videos Delivered",
  "2x Engagement Boost",
  "4.9 Stars Rating"
];

export default function FeatureBar() {
  return (
    <section className="w-full overflow-hidden py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 select-none"
            >
              <Star size={14} className="fill-slate-900 text-slate-900" />
              <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}