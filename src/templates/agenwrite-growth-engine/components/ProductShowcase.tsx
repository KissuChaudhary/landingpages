import React from 'react';

export const ProductShowcase: React.FC = () => {
  return (
    <section className="w-full px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
            
            {/* Main Outer Container (#e6e6d5) */}
            <div className="bg-[#e6e6d5] relative pt-16 pb-2 px-2 sm:pt-20 sm:pb-3 sm:px-3 rounded-[2.5rem] shadow-xl shadow-[#e6e6d5]/20 ring-1 ring-black/5">
                
                {/* Decorative Label - Top Left */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-10">
                    <span className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight -rotate-2 inline-block transition-transform duration-300 hover:rotate-0 cursor-default">
                        #StrategicEngine
                    </span>
                </div>

                {/* Green Pin Icon - Top Right Inner Side */}
                <img 
                    src="https://cdn.prod.website-files.com/687bec60028a11d6d37ac0bb/687c178495c454d47343094d_Green%20Pin.svg" 
                    alt="Pin"
                    className="absolute -top-5 -right-4 w-12 h-12 sm:w-16 sm:h-16 -translate-y-2 translate-x-2 pointer-events-none z-20 rotate-45"
                />

                {/* Inner White Card */}
                {/* Reduced padding around this card implies the outer container has less padding on sides/bottom */}
                <div className="bg-white rounded-[2rem] p-2 sm:p-3 shadow-sm border border-stone-100 overflow-hidden">
                    
                    {/* Browser/Desktop Window Frame */}
                    <div className="bg-stone-50 rounded-[1.5rem] border border-stone-200 overflow-hidden relative aspect-[1200/800] group">
                        
                        {/* Fake Browser Header */}
                        <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-white/80 backdrop-blur-md border-b border-stone-200/60 z-10 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-stone-300/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-stone-300/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-stone-300/80"></div>
                            </div>
                            <div className="mx-auto w-1/3 h-1.5 rounded-full bg-stone-100"></div>
                        </div>

                        {/* Desktop Image Content */}
                        <img 
                            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop" 
                            alt="FlipAEO Dashboard Interface" 
                            className="w-full h-full object-cover object-top pt-8 sm:pt-10 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        />

                        {/* Optional: Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/5 to-transparent pointer-events-none mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};