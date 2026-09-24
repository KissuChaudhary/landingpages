import React from 'react';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      title: 'Days, Not Months',
      description: 'Concept to launch at a pace that redefines fast.',
    },
    {
      icon: <Palette className="w-5 h-5 text-white" />,
      title: 'Obsessively Crafted',
      description: 'Every detail considered. Every element refined.',
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      title: 'Built to Convert',
      description: 'Layouts informed by data. Decisions backed by performance.',
    },
    {
      icon: <Shield className="w-5 h-5 text-white" />,
      title: 'Secure by Default',
      description: 'Enterprise-grade protection comes standard.',
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-black relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            Why Us
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            The difference is everything.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((feature, index) => (
            <div key={index} className="liquid-glass rounded-2xl p-6 flex flex-col items-start text-left">
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading italic text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
