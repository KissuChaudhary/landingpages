import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BeamGridBackground } from '@/templates/magnetic-grid/components/beam-grid-background';

export default function BeamGridPage() {
  return (
    <main className="relative w-full h-screen font-sans">
      <BeamGridBackground className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 text-white">Beam Grid</h1>
        <p className="text-gray-400 mb-8 max-w-lg text-lg font-light">Linear-inspired strict geometry with elegant traveling energy beams and a flawless edge fade.</p>
      </div>

      <Link href="/" className="absolute top-8 left-8 z-20 flex items-center px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-md text-sm font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Link>
    </main>
  );
}
