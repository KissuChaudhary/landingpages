import BentoGrid from '@/templates/premium-bento/components/BentoGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle dotted background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Everything you need to succeed
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive suite of tools and resources designed to accelerate your growth.
          </p>
        </div>
        <BentoGrid />
      </div>
    </main>
  );
}
