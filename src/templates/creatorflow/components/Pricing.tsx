import React from 'react';
import { Sparkles, ArrowRight, Asterisk } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full" id="pricing">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
          <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Pricing</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Simple Plans
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Whether you're uploading weekly or scaling fast, we've got a plan tailored to your content flow.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Starter Plan */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-4 shadow-sm flex flex-col h-full">
            {/* Inner Top Card */}
            <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
                <h3 className="text-lg font-medium text-slate-600 mb-4">Starter Plan</h3>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$899</span>
                    <span className="text-slate-500 font-medium">/month</span>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 min-h-[48px]">
                    For growing creators who post 4–6 videos/month
                </p>
                <button className="group w-full flex items-center justify-between bg-slate-900 text-white pl-6 pr-2 py-2 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10">
                    Book a Call
                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform group-hover:rotate-[-45deg]">
                        <ArrowRight size={20} strokeWidth={2.5} />
                    </span>
                </button>
            </div>

            {/* Features */}
            <div className="px-4 pb-4 flex-grow">
                <h4 className="font-bold text-slate-900 mb-6 px-2">Features included:</h4>
                <ul className="space-y-4">
                    {[
                        "Up to 6 Videos/month",
                        "Revisions 2 per video",
                        "Basic color grading and audio sync",
                        "72 hour turnaround",
                        "Email support"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 px-2">
                            <Asterisk size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600 font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-4 shadow-sm flex flex-col h-full relative">
            {/* Inner Top Card */}
            <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 relative">
                <div className="absolute top-8 right-8 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-500/30">
                    Popular
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-4">Pro Plan</h3>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">$1599</span>
                    <span className="text-slate-500 font-medium">/month</span>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 min-h-[48px]">
                    For growing creators who post 4–6 videos/month
                </p>
                <button className="group w-full flex items-center justify-between bg-slate-900 text-white pl-6 pr-2 py-2 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10">
                    Book a Call
                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform group-hover:rotate-[-45deg]">
                        <ArrowRight size={20} strokeWidth={2.5} />
                    </span>
                </button>
            </div>

            {/* Features */}
            <div className="px-4 pb-4 flex-grow">
                <h4 className="font-bold text-slate-900 mb-6 px-2">Features included:</h4>
                <ul className="space-y-4">
                    {[
                        "Up to 20 Videos/month",
                        "Revisions 5 per video",
                        "Advance color grading and audio sync",
                        "48 hour turnaround",
                        "Video Call Support"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 px-2">
                            <Asterisk size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600 font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Custom Plan (Full Width) */}
      <div className="bg-[#111] rounded-3xl border-2 border-dashed border-white/10 p-4 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Side: Inner Top Card Style */}
            <div className="lg:w-1/2 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col justify-center">
                <h3 className="text-lg font-medium text-slate-300 mb-4">Custom Plan</h3>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-extrabold text-white tracking-tight">???</span>
                    <span className="text-slate-400 font-medium">/month</span>
                </div>
                <p className="text-slate-400 font-medium leading-relaxed mb-8">
                    For growing creators who post 4–6 videos/month
                </p>
                <button className="group w-full max-w-sm flex items-center justify-between bg-white text-slate-900 pl-6 pr-2 py-2 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl">
                    Book a Call
                    <span className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-[-45deg] shadow-lg shadow-orange-500/30">
                        <ArrowRight size={20} strokeWidth={2.5} />
                    </span>
                </button>
            </div>

            {/* Right Side: Features */}
            <div className="lg:w-1/2 px-4 pb-4 lg:py-8 flex flex-col justify-center">
                <h4 className="font-bold text-white mb-6 text-xl">Features included:</h4>
                <ul className="space-y-5">
                    {[
                        "Choose from 10 to 40+ Video Edits",
                        "24h / 48h / 72h Delivery",
                        "Title, thumbnail, and retention tips",
                        "Shorts, Reels, long-form, podcasts",
                        "One edit = multi-channel assets"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <Asterisk size={20} className="text-white mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 font-medium text-lg">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

          </div>
      </div>

    </section>
  );
}