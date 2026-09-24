import React from 'react';
import { 
  Scissors, 
  Megaphone, 
  Subtitles, 
  TrendingUp, 
  MousePointerClick, 
  Layers, 
  Package, 
  Zap,
  Sparkles
} from 'lucide-react';

const services = [
  {
    title: "Youtube Shorts Editing",
    description: "We turn raw clips into high-retention, caption-packed vertical videos that pop on Reels, Shorts, and TikTok. Great for content repurposing and explosive growth.",
    tags: [
      { icon: Scissors, label: "Snappy Pacing" },
      { icon: Megaphone, label: "Viral-Ready" },
      { icon: Subtitles, label: "Subtitled" },
    ]
  },
  {
    title: "Long Form Edits",
    description: "From vlogs to deep dives, we trim the fluff, tighten the pacing, and add engagement elements to keep viewers watching until the very end.",
    tags: [
      { icon: TrendingUp, label: "Retention-Driven" },
    ]
  },
  {
    title: "Thumbnail Design",
    description: "High-CTR designs that stop the scroll. We analyze competitors and trends to create click magnets that give your video the best chance to go viral.",
    tags: [
      { icon: MousePointerClick, label: "Click Magnet" },
    ]
  },
  {
    title: "Content Repurposing Package",
    description: "One video, 10 pieces of content — cut into Shorts, Reels, quote cards, and teasers. Perfect for creators who want to stay visible everywhere.",
    tags: [
      { icon: Layers, label: "Multi-Platform" },
      { icon: Package, label: "Batch Delivery" },
      { icon: Zap, label: "Quick" },
    ]
  }
];

export default function Services() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto w-full" id="services">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
          <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Services</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          What We Do Best
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We craft scroll-stopping edits that keep your audience hooked and your content looking top-tier.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group relative bg-[#0F0F0F] rounded-[32px] p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[320px] transition-transform hover:-translate-y-1 duration-300"
          >
            {/* Subtle Background Stars/Particles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
                <div className="absolute bottom-1/4 right-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
            </div>

            {/* Gradient Glow Effect on Hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium mb-12">
                {service.description}
              </p>
            </div>

            {/* Tags */}
            <div className="relative z-10 flex flex-wrap gap-3 mt-auto">
              {service.tags.map((tag, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 bg-[#1A1A1A] border border-white/5 pl-3 pr-4 py-2 rounded-xl transition-colors group-hover:border-white/10"
                >
                  <tag.icon size={16} className="text-brand-orange" />
                  <span className="text-sm font-semibold text-slate-200">{tag.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}