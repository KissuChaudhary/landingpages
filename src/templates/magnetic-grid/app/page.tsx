import Link from 'next/link';
import { ArrowLeft, ArrowRight, Grid3x3, FastForward, Cpu, Layers, Hexagon, Waves } from 'lucide-react';
import { BeamGridBackground } from '@/templates/magnetic-grid/components/beam-grid-background';

export default function ComponentLibrary() {
  const components = [
    { 
      name: 'Hexagonal Lattice', 
      route: '/patterns/hexagonal-lattice', 
      description: 'Precision-rendered geometric lattice with interactive focal illumination and edge-lighting.', 
      icon: Hexagon,
    },
    { 
      name: 'Silk Waves', 
      route: '/patterns/silk-waves', 
      description: 'Math-driven interfering waveforms generating a luxurious, fluid moiré aesthetic.', 
      icon: Waves,
    },
    { 
      name: 'Perspective Grid', 
      route: '/patterns/perspective-grid', 
      description: 'Sleek 3D converging perspective grid undulating dynamically and adapting to cursor gravitation.', 
      icon: Layers,
    },
    { 
      name: 'Circuit Trace', 
      route: '/patterns/circuit-trace', 
      description: 'Branching logic circuit pathways tracing glowing light pulses reactive to cursor snap positions.', 
      icon: Cpu,
    },
    { 
      name: 'Distorted Grid', 
      route: '/patterns/distorted-grid', 
      description: 'Physics-based surface tension and mouse repulsion mapping onto a structural grid interface.', 
      icon: Grid3x3,
    },
    { 
      name: 'Beam Grid', 
      route: '/patterns/beam-grid', 
      description: 'Linear-inspired exact 1px geometries intersected by high-velocity gradient light streaks.', 
      icon: FastForward,
    },
    { 
      name: 'Magnetic Matrix', 
      route: '/patterns/magnetic-grid', 
      description: 'Discrete coordinate markers with elastic spring-physics reacting to cursor velocity.', 
      icon: Grid3x3,
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#000000] text-neutral-200 font-sans selection:bg-white/20">
      
      {/* Background Hero Layer */}
      <div className="fixed inset-0 z-0 select-none">
        <BeamGridBackground 
          gridColor="rgba(255,255,255,0.03)"
          beamColor="rgba(255,255,255,0.6)"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl mb-24">
          <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-400 backdrop-blur-md uppercase tracking-wider">
            Modern UI Assets
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-white leading-tight">
            Premium interaction <br className="hidden md:block"/>
            canvases.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            A meticulous collection of modern background patterns. Built entirely on Native Canvas APIs for uncompromised framerates, zero DOM bloat, and perfect physics sync. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {components.map((item) => (
            <Link 
              key={item.name} 
              href={item.route}
              className="group flex flex-col p-6 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 hover:bg-[#111111]/90 transition-all duration-300"
            >
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl w-fit mb-8 group-hover:scale-105 transition-transform duration-300">
                <item.icon className="w-5 h-5 text-neutral-300" />
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-white tracking-tight">
                    {item.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
