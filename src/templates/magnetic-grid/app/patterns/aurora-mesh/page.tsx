import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AuroraMeshBackground } from '@/templates/magnetic-grid/components/aurora-mesh-background';

export default function AuroraMeshPage() {
  return (
    <main className="relative w-full h-screen font-sans">
      <AuroraMeshBackground className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">Aurora Mesh</h1>
        <p className="text-gray-400 mb-8 max-w-lg text-lg">Luminous cinematic gradients drifting organically behind a premium noise texture.</p>
      </div>

      <Link href="/" className="absolute top-8 left-8 z-20 flex items-center px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-md text-sm font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Link>
    </main>
  );
}
