import React from 'react';
import { Sparkles, Layers, Cpu, Smartphone, ShieldCheck, Palette, Gauge, Terminal } from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: '35+ Specialized Layouts',
    desc: 'Never start from a blank screen. Includes SaaS landing pages, investment dashboards, developer tools, bento grids, and checkout flows.',
    color: 'text-indigo-400',
  },
  {
    icon: Smartphone,
    title: '100% Mobile Responsive',
    desc: 'Each template is tested on mobile, tablet, and ultra-wide screens with clean Tailwind responsive utility breakpoints.',
    color: 'text-purple-400',
  },
  {
    icon: Gauge,
    title: '95+ Google Lighthouse Score',
    desc: 'Zero bloated runtimes. Optimized code-splitting, static image assets, and lean bundle footprints for maximum SEO and speed.',
    color: 'text-emerald-400',
  },
  {
    icon: Palette,
    title: 'Modern Aesthetic & Dark Mode',
    desc: 'Crafted with contemporary visual trends: glowing borders, subtle dot matrix backdrops, glassmorphism, and vibrant accent colors.',
    color: 'text-pink-400',
  },
  {
    icon: Cpu,
    title: 'Framer Motion & Micro-Interactions',
    desc: 'Delightful fluid animations, interactive cards, magnetic physics, and subtle hover states powered by Framer Motion.',
    color: 'text-amber-400',
  },
  {
    icon: Terminal,
    title: 'Clean, Documented Code',
    desc: 'Modular React components, typed TypeScript interfaces, and accessible HTML landmarks ready for instant production deployment.',
    color: 'text-cyan-400',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Engineered for Modern Startups
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why founders build with FounderDada
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Everything you need to launch a world-class web application or landing page this weekend.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
