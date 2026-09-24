import React from 'react';
import { Check } from 'lucide-react';

const PricingCard: React.FC<{ title: string; price: string; features: string[]; isPopular?: boolean; color: string }> = ({ title, price, features, isPopular, color }) => (
  <div className={`relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border-4 ${isPopular ? 'border-orange-400 transform md:-translate-y-4 z-10' : 'border-white'} flex flex-col h-full`}>
    {isPopular && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-bold py-1 px-4 rounded-full text-sm shadow-md rotate-[-2deg]">
        Most Popular
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-500 mb-2 uppercase tracking-wider">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-black text-slate-900">{price}</span>
        {price !== "Custom" && <span className="text-slate-500 font-medium">/mo</span>}
      </div>
    </div>

    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
          <div className={`mt-1 p-0.5 rounded-full ${color} text-white`}>
            <Check size={12} strokeWidth={4} />
          </div>
          {feature}
        </li>
      ))}
    </ul>

    <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${isPopular ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
      Choose Plan
    </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple Pricing</h2>
          <p className="text-xl text-slate-700">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <PricingCard 
            title="Starter"
            price="$29"
            color="bg-blue-400"
            features={[
              "10 Articles / month",
              "Basic SEO Optimization",
              "English Only",
              "Standard Support"
            ]}
          />
          <PricingCard 
            title="Pro Writer"
            price="$79"
            isPopular={true}
            color="bg-orange-500"
            features={[
              "50 Articles / month",
              "Advanced Competitor Analysis",
              "30+ Languages",
              "Auto-WordPress Publishing",
              "Priority Support"
            ]}
          />
          <PricingCard 
            title="Agency"
            price="$199"
            color="bg-purple-400"
            features={[
              "200 Articles / month",
              "White Label Reports",
              "API Access",
              "Dedicated Account Manager",
              "Custom Brand Voice Models"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;