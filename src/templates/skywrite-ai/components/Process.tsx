import React from 'react';

const ProcessStep: React.FC<{ number: string; title: string; desc: string; color: string }> = ({ number, title, desc, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-white/60">
     <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 ${color} group-hover:scale-150 transition-transform duration-500`}></div>
     <div className="relative z-10">
        <span className="block text-5xl font-black text-slate-100 mb-4">{number}</span>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 font-medium">{desc}</p>
     </div>
  </div>
);

const Process: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How it works</h2>
          <p className="text-slate-700">From a single keyword to a ranking masterpiece.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProcessStep 
            number="01"
            title="Topic Analysis"
            desc="We scan SERPs to understand search intent and find content gaps."
            color="bg-blue-500"
          />
          <ProcessStep 
            number="02"
            title="Structuring"
            desc="AI builds a logical outline with optimal H2s and H3s for readability."
            color="bg-purple-500"
          />
          <ProcessStep 
            number="03"
            title="Drafting"
            desc="Writing happens with variable sentence length and burstiness to mimic humans."
            color="bg-pink-500"
          />
          <ProcessStep 
            number="04"
            title="Optimization"
            desc="Automatic internal linking, meta descriptions, and schema markup."
            color="bg-emerald-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Process;