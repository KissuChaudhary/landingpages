import React from 'react';
import { Search, PenTool, BarChart3, Fingerprint, Globe, Cpu } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  rotation?: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, rotation = "rotate-0" }) => (
  <div className={`bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white/60 hover:scale-[1.02] transition-transform duration-300 ${rotation}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    </div>
    <p className="text-slate-600 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Why SkyWrite?</h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            We don't just guess next tokens. We simulate the workflow of a professional human researcher and copywriter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard 
            icon={<Fingerprint size={28} />}
            title="Human Touch"
            description="Our proprietary style engine adds nuance, humor, and personal anecdotes so your readers never suspect AI."
            rotation="-rotate-1"
          />
          <FeatureCard 
            icon={<Search size={28} />}
            title="Deep Research"
            description="SkyWrite browses the live web to find stats, quotes, and recent events to back up your claims."
            rotation="rotate-2"
          />
          <FeatureCard 
            icon={<Cpu size={28} />}
            title="AI Search Ready"
            description="Optimized not just for keywords, but for 'Answer Engine' algorithms like Perplexity and Google Gemini."
            rotation="-rotate-1"
          />
          <FeatureCard 
            icon={<BarChart3 size={28} />}
            title="Competitor Spy"
            description="We analyze the top 10 ranking articles for your keyword and automatically find gaps they missed."
            rotation="rotate-1"
          />
           <FeatureCard 
            icon={<Globe size={28} />}
            title="30+ Languages"
            description="Native-level fluency in Spanish, French, German, Japanese, and more. Go global instantly."
            rotation="-rotate-2"
          />
          <FeatureCard 
            icon={<PenTool size={28} />}
            title="Bulk Generation"
            description="Upload a CSV of 500 topics and wake up to a fully populated blog. Scale without burnout."
            rotation="rotate-1"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;