import React from 'react';

export function Partners() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6 bg-black relative z-10">
      <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-8">
        Trusted by the teams behind
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full max-w-5xl mx-auto">
        {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((partner) => (
          <span key={partner} className="text-2xl md:text-3xl font-heading italic text-white">
            {partner}
          </span>
        ))}
      </div>
    </section>
  );
}
