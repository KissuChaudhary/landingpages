import React from 'react';
import { Scan, FileCheck, Swords, ArrowDown, ChevronRight, Activity, AlertCircle, CheckCircle2, Lock, Key, Users } from 'lucide-react';

const SolutionSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-ink">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Block */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-signal"></span>
            The Architecture
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-ink max-w-3xl">
              Auth for <span className="italic font-light">Humans</span>. <br />
              Security for <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ink/70">Robots.</span>
            </h2>
            <div className="max-w-md">
               <p className="font-mono text-sm text-ink/70 leading-relaxed border-l-2 border-signal pl-6">
                LoomAuth isn't just a login form. It's a comprehensive identity platform that scales with your infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* The Protocol Stack - Technical Layout */}
        <div className="flex flex-col border border-ink shadow-brutalist bg-cream">
          
          {/* STEP 01 */}
          <div className="group flex flex-col md:flex-row border-b border-ink relative overflow-hidden">
            {/* Number Column */}
            <div className="w-full md:w-24 md:border-r border-ink p-6 flex items-start justify-between md:justify-center bg-white">
              <span className="font-mono text-4xl font-bold text-ink/20 group-hover:text-signal transition-colors">01</span>
              <Scan className="md:hidden text-ink/40" />
            </div>

            {/* Content Column */}
            <div className="flex-1 p-8 md:p-10 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal bg-signal/10 px-2 py-1">
                   Integration
                 </div>
                 <span className="text-ink/30 text-xs font-mono hidden md:inline-block">// DROP_IN_SDK</span>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-2">5-Line Implementation</h3>
              <p className="font-serif italic text-ink/50 text-lg mb-4">The Fix for "Development Hell"</p>
              <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed max-w-2xl">
                We support every modern framework out of the box. Next.js, React, Vue, Svelte. Just wrap your application in our provider, and you have a fully secure, compliant authentication system running in minutes.
              </p>
            </div>

            {/* Visual Column - Light Mode UI Dashboard */}
            <div className="w-full md:w-80 bg-[#f5f5f5] relative flex items-center justify-center p-8 group-hover:bg-white transition-colors border-t md:border-t-0 md:border-l border-ink">
               
               {/* Subtle grid pattern for texture - Moved BEHIND the card */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0"></div>

               {/* Code Snippet Card */}
               <div className="w-64 bg-ink text-white border border-ink/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-sm overflow-hidden flex flex-col relative z-10 p-4 font-mono text-[10px]">
                  <div className="text-green-400 mb-2">// implementation.ts</div>
                  <div className="space-y-1 opacity-80">
                      <div><span className="text-purple-400">import</span> &#123; LoomProvider &#125; <span className="text-purple-400">from</span> <span className="text-yellow-300">'@loom/auth'</span>;</div>
                      <br/>
                      <div><span className="text-blue-400">export default</span> <span className="text-purple-400">function</span> App() &#123;</div>
                      <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                      <div className="pl-8 text-yellow-300">&lt;LoomProvider&gt;</div>
                      <div className="pl-12 text-white">&lt;Component /&gt;</div>
                      <div className="pl-8 text-yellow-300">&lt;/LoomProvider&gt;</div>
                      <div className="pl-4">);</div>
                      <div>&#125;</div>
                  </div>
               </div>
               
            </div>
          </div>

          {/* STEP 02 */}
          <div className="group flex flex-col md:flex-row border-b border-ink relative overflow-hidden">
            <div className="w-full md:w-24 md:border-r border-ink p-6 flex items-start justify-between md:justify-center bg-white">
              <span className="font-mono text-4xl font-bold text-ink/20 group-hover:text-signal transition-colors">02</span>
              <Lock className="md:hidden text-ink/40" />
            </div>

            <div className="flex-1 p-8 md:p-10 relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal bg-signal/10 px-2 py-1">
                   Security
                 </div>
                 <span className="text-ink/30 text-xs font-mono hidden md:inline-block">// ZERO_TRUST</span>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-2">Enterprise-Grade Protection</h3>
              <p className="font-serif italic text-ink/50 text-lg mb-4">The Fix for "Data Leaks"</p>
              <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed max-w-2xl">
                MFA, SOC2 Compliance, Anomaly Detection, and Session Management come standard. We handle the hard stuff so you don't have to hire a dedicated security team just to let users log in.
              </p>
            </div>

             <div className="w-full md:w-80 bg-[#f5f5f5] border-t md:border-t-0 md:border-l border-ink relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-white transition-colors">
               {/* Visual: Security Shield */}
               <div className="relative w-48 h-48 flex flex-col items-center justify-center">
                  
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>

                  <div className="relative w-32 bg-white border border-ink shadow-sm p-4 z-10 group-hover:scale-105 transition-transform duration-500">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <Lock size={24} />
                        </div>
                      </div>
                      <div className="text-center font-mono text-[10px]">
                          <div className="font-bold text-ink mb-1">ENCRYPTION: AES-256</div>
                          <div className="text-green-600">STATUS: SECURE</div>
                      </div>
                      {/* Validated Stamp */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                  </div>
               </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="group flex flex-col md:flex-row relative overflow-hidden">
            <div className="w-full md:w-24 md:border-r border-ink p-6 flex items-start justify-between md:justify-center bg-white">
              <span className="font-mono text-4xl font-bold text-ink/20 group-hover:text-signal transition-colors">03</span>
              <Users className="md:hidden text-ink/40" />
            </div>

            <div className="flex-1 p-8 md:p-10 relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal bg-signal/10 px-2 py-1">
                   Scalability
                 </div>
                 <span className="text-ink/30 text-xs font-mono hidden md:inline-block">// GLOBAL_EDGE</span>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-2">Scale to Millions</h3>
              <p className="font-serif italic text-ink/50 text-lg mb-4">The Fix for "Downtime"</p>
              <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed max-w-2xl">
                Our edge network ensures low-latency authentication from anywhere in the world. Whether you have 10 users or 10 million, LoomAuth scales automatically without you changing a single line of code.
              </p>
            </div>

            <div className="w-full md:w-80 bg-[#f5f5f5] border-t md:border-t-0 md:border-l border-ink relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-white transition-colors">
               {/* Visual: User Scale */}
               <div className="relative w-full h-32 flex items-end justify-center gap-3 px-4">
                  <div className="flex items-end gap-1 w-full h-full pb-4 justify-center">
                    <div className="w-4 h-8 bg-ink/10"></div>
                    <div className="w-4 h-12 bg-ink/20"></div>
                    <div className="w-4 h-16 bg-ink/30"></div>
                    <div className="w-4 h-24 bg-ink/50"></div>
                    <div className="w-4 h-32 bg-signal relative">
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-ink text-white text-[7px] font-mono px-1.5 py-0.5 whitespace-nowrap z-20">
                            1M+
                         </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,#00000005_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none -z-10"></div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SolutionSection;