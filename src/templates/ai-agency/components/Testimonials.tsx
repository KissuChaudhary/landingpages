import React from 'react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "A complete rebuild in five days. The speed is unmatched, but the quality is what truly blew us away. It feels like a site that took six months to craft.",
      name: "Sarah Chen",
      role: "CEO Luminary",
    },
    {
      quote: "Conversions up 4x in the first month. The AI didn't just make it look pretty; it fundamentally understood our user journey and optimized for it.",
      name: "Marcus Webb",
      role: "Head of Growth Arcline",
    },
    {
      quote: "They didn't just design our site, they elevated our entire brand identity. The liquid glass aesthetic perfectly captures the premium feel we wanted.",
      name: "Elena Voss",
      role: "Brand Director Helix",
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-16 lg:px-24 bg-black relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-4">
            What They Say
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Don't take our word for it.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="liquid-glass rounded-2xl p-8 flex flex-col justify-between h-full">
              <p className="text-white/80 font-body font-light text-sm italic leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="text-white font-body font-medium text-sm mb-1">
                  {testimonial.name}
                </div>
                <div className="text-white/50 font-body font-light text-xs">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
