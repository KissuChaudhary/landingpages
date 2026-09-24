import React from 'react';
import { Check } from 'lucide-react';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonAvatar?: string;
}

const PricingCard: React.FC<PlanProps> = ({ name, price, description, features, buttonText, isPopular, buttonAvatar }) => {
  return (
    <div className={`
      relative p-8 rounded-[2rem] flex flex-col h-full transition-transform duration-300 hover:-translate-y-2
      ${isPopular 
        ? 'bg-[#1A1A1A] shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] border border-white/10 z-10' 
        : 'bg-[#1A1A1A] border border-transparent'}
    `}>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <span className="text-xl font-bold text-white">{price}</span>
      </div>
      
      {/* Description */}
      <p className="text-neutral-400 text-sm leading-relaxed mb-8 h-10">
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-200 font-medium">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button 
        className={`
          w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3
          ${isPopular 
            ? 'bg-white text-black hover:bg-neutral-200 shadow-lg hover:shadow-xl' 
            : 'bg-[#262626] text-white hover:bg-[#333]'}
        `}
      >
        {buttonAvatar && (
          <img src={buttonAvatar} alt="User" className="w-6 h-6 rounded-full border border-gray-300" />
        )}
        {buttonText}
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 font-bold text-[10px] tracking-widest uppercase mb-6">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Flexible plans <br />
            built for growth.
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl">
            Pick a plan that fits your content <br className="hidden md:block" />
            needs and lets us do the heavy lifting.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <PricingCard
            name="Starter plan"
            price="$750/m"
            description="Perfect for creators looking to grow an audience."
            features={[
              "8 short-form videos (15-60s each)",
              "5-day turnaround",
              "1 revision per video",
              "Monthly performance report"
            ]}
            buttonText="Get started"
          />

          <PricingCard
            name="Growth plan"
            price="$1,500/m"
            description="Ideal for brands ready to post frequently and grow fast."
            features={[
              "20 short-form videos (15-60s each)",
              "3-day turnaround",
              "Unlimited revisions",
              "Monthly performance report"
            ]}
            buttonText="Book an intro call"
            isPopular={true}
            buttonAvatar="https://picsum.photos/32/32?random=99"
          />

          <PricingCard
            name="Scale plan"
            price="$2,800/m"
            description="For founders, agencies, or creators building a dominant presence."
            features={[
              "32 short-form videos (15-60s each)",
              "48-hr turnaround",
              "Unlimited revisions",
              "Monthly performance report"
            ]}
            buttonText="Get started"
          />

        </div>
      </div>
    </section>
  );
};

export default Pricing;
