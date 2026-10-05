import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { HeroVideoDialog } from '../ui/hero-video-dialog';
import { GlobalCard } from '../GlobalCard';

export function Hero() {
    return (
        <section className="relative overflow-hidden px-4 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center min-h-screen">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#e78468]/10 rounded-[100%] blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e78468] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e78468]"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">AI-Powered Biometric Studio</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Perfect Passport Photos, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e78468] to-orange-500">Guaranteed.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Skip the pharmacy line. Create compliant 2x2" US passport photos instantly from your home using our advanced biometric AI engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <Link 
                            href="/studio"
                            className="w-full sm:w-auto px-8 py-4 bg-[#e78468] hover:brightness-110 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-[0_8px_20px_-4px_rgba(231,132,104,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(231,132,104,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            Start Studio <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link 
                            href="#how-it-works"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            How it works
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-6 text-xs font-medium text-stone-400 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>100% Compliant</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Instant Download</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-[#e78468]" />
                            <span>Print Ready</span>
                        </div>
                    </div>
                </div>

                {/* Visual Preview */}
                <div className="relative w-full mx-auto max-w-5xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
                    <GlobalCard className="shadow-2xl shadow-stone-200/50">
                        <HeroVideoDialog
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/XqZsoesa55w"
                            thumbnailSrc="https://images.unsplash.com/photo-1616075149633-b6b74aee3b46?q=80&w=2500&auto=format&fit=crop"
                            thumbnailAlt="Biometric Passport Photo Studio"
                            className="block w-full"
                        />
                    </GlobalCard>
                </div>
            </div>
        </section>
    );
}
