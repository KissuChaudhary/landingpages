import React from 'react';
import CheckIcon from './CheckIcon';

export interface PricingFeature {
  text: string;
}

export interface PricingData {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
}

interface PricingCardProps {
  data: PricingData;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ data, isPopular = false }) => {
  return (
    <div className={`
      relative rounded-3xl p-8 flex flex-col h-full transition-transform duration-300
      ${isPopular ? 'bg-mint-light shadow-soft-xl scale-100 z-10 border border-transparent' : 'bg-mint-light/60 scale-[0.98] border border-transparent hover:border-mint-light/80'}
    `}>
      
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-forest-black text-white px-4 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest shadow-lg">
          <span className="text-[#34d399] mr-1.5">●</span>
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-sans font-bold text-sm tracking-wider text-forest-black uppercase mb-4 opacity-90">
          {data.title}
        </h3>
        <div className="flex items-baseline mb-4">
          <span className="font-serif font-bold text-5xl text-forest-black tracking-tight">{data.price}</span>
          <span className="font-mono text-sage-grey text-sm ml-2">/mo</span>
        </div>
        <p className="font-mono text-sm text-sage-grey leading-relaxed max-w-[240px]">
          {data.description}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-forest-black/5 mb-8"></div>

      {/* Features */}
      <ul className="flex-grow space-y-4 mb-10">
        {data.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckIcon active={isPopular} />
            <span className="font-mono text-sm text-sage-grey pt-0.5">{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button 
        className={`
          w-full py-4 rounded-full font-mono text-xs font-bold tracking-[0.15em] transition-all duration-300 uppercase
          ${isPopular 
            ? 'bg-forest-black text-white hover:bg-opacity-90 shadow-lg' 
            : 'bg-white border border-[#d1dcd7] text-forest-black hover:border-forest-black/30 hover:bg-white/50 shadow-sm'
          }
        `}
      >
        Get Started
      </button>

    </div>
  );
};

export default PricingCard;