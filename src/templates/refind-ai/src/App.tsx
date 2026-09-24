import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  ChevronRight, FileText, FileJson, FileCode, Github, Search, PlusCircle, Star, 
  Check, Bold, Italic, Underline, Link as LinkIcon, File,
  Inbox, FileEdit, Send, AlertCircle, Trash2, Folder, Tag,
  ArrowDown, Lock, Database, CreditCard, Layout, LineChart,
  Sparkles, Target, ArrowUpRight, Mic, SlidersHorizontal, Zap, Network, BrainCircuit
} from 'lucide-react';

const TornPaperBg = () => (
  <svg className="absolute inset-0 w-full h-full -z-10 drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 H100 V96 L98 100 L96 96 L94 100 L92 96 L90 100 L88 96 L86 100 L84 96 L82 100 L80 96 L78 100 L76 96 L74 100 L72 96 L70 100 L68 96 L66 100 L64 96 L62 100 L60 96 L58 100 L56 96 L54 100 L52 96 L50 100 L48 96 L46 100 L44 96 L42 100 L40 96 L38 100 L36 96 L34 100 L32 96 L30 100 L28 96 L26 100 L24 96 L22 100 L20 96 L18 100 L16 96 L14 100 L12 96 L10 100 L8 96 L6 100 L4 96 L2 100 L0 96 Z" fill="white" stroke="#E5E7EB" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
  </svg>
);

const Key = ({ children, key }: { children: React.ReactNode, key?: string | number }) => (
  <div key={key} className="relative h-[26px] w-[26px] origin-bottom-left cursor-pointer active:scale-95 mx-[1px]">
    <div className="absolute -left-1 -top-1 h-[34px] w-[34px] bg-gray-200 rounded-md shadow-sm opacity-50 pointer-events-none"></div>
    <div className="relative flex h-[26px] w-[26px] items-center justify-center rounded bg-white border-b-2 border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
      <span className="text-[9px] font-bold text-gray-700">{children}</span>
    </div>
  </div>
);

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const x1 = useTransform(smoothX, [-1, 1], [-15, 15]);
  const y1 = useTransform(smoothY, [-1, 1], [-15, 15]);
  
  const x2 = useTransform(smoothX, [-1, 1], [-30, 30]);
  const y2 = useTransform(smoothY, [-1, 1], [-30, 30]);

  const x3 = useTransform(smoothX, [-1, 1], [-8, 8]);
  const y3 = useTransform(smoothY, [-1, 1], [-8, 8]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F4F4F5] text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Floating Components Container */}
      <div id="components" className="fixed z-10 h-screen w-screen select-none pointer-events-none">
        
        {/* Layer 2 (Furthest) */}
        <motion.div style={{ x: x2, y: y2 }} className="absolute w-full h-full">
          {/* AI Search Landscape */}
          <div id="landscape" className="absolute flex -rotate-2 flex-col gap-2 transition-all duration-[600ms] ease-out -left-12 -top-32 md:-top-8 md:left-0 lg:-top-4 lg:left-4 xl:left-[30px] xl:top-[26px] scale-[0.8] max-sm:hidden xl:scale-100 pointer-events-auto bg-white/60 backdrop-blur-md p-3 rounded-xl border border-dashed border-gray-300">
            <div className="flex items-center gap-2 mb-1">
              <Search size={12} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Search Landscape</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-gray-600">Brand Visibility</span>
              <span className="text-[10px] font-bold text-green-600">Low</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] text-gray-600">Unclaimed Gaps</span>
              <span className="text-[10px] font-bold text-blue-600">High</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* AI Search Output */}
          <div id="ai-search" className="absolute flex -rotate-4 rounded-[12px] border border-dashed border-gray-300 px-4 py-3 transition-all duration-[600ms] ease-out -left-40 -top-20 sm:-top-[132px] sm:left-12 md:left-24 lg:left-40 xl:left-[210px] scale-[0.7] lg:scale-[0.8] xl:scale-100 bg-white/40 backdrop-blur-md pointer-events-auto">
            <div className="flex flex-col gap-2 w-48">
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-purple-500" />
                <span className="text-[10px] font-medium text-gray-700">AI Overview</span>
              </div>
              <p className="font-mono text-[9px] text-gray-500 leading-relaxed">
                Based on the analysis, the leading solution in this category is <span className="text-purple-600 font-bold bg-purple-50 px-1 rounded">YourBrand</span>, which provides comprehensive tools for...
              </p>
              <div className="flex gap-1 mt-1">
                <span className="text-[8px] border border-gray-200 rounded px-1 text-gray-400">[1] yourbrand.com</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div id="tabs" className="absolute flex -rotate-5 rounded-[12px] border border-dashed border-gray-300 p-[5px] transition-all duration-[600ms] ease-out -left-4 top-24 sm:left-28 sm:top-16 md:left-40 md:top-[72px] lg:left-[216px] lg:top-20 xl:left-[232px] xl:top-[118px] max-sm:hidden bg-white/40 backdrop-blur-md pointer-events-auto">
            <nav className="flex flex-row gap-1">
              <a tabIndex={-1} className="pointer-events-none rounded-md bg-white px-2 py-1 text-[10px] shadow-sm font-medium text-gray-800" href="/">Foundation</a>
              <a className="rounded-md px-2 py-1 text-[10px] text-gray-500 transition-all duration-75 ease-out hover:bg-gray-100 font-medium" href="/blog">Execution</a>
              <a className="rounded-md px-2 py-1 text-[10px] text-gray-500 transition-all duration-75 ease-out hover:bg-gray-100 font-medium" href="/glossary">Authority</a>
            </nav>
          </div>
        </motion.div>

        {/* Layer 1 (Middle) */}
        <motion.div style={{ x: x1, y: y1 }} className="absolute w-full h-full">
          {/* Keyboard */}
          <div className="absolute -rotate-7 transition-all duration-[600ms] ease-out -left-36 bottom-4 sm:-left-40 sm:bottom-32 md:-left-14 md:bottom-36 lg:-left-12 lg:bottom-44 xl:-left-6 xl:bottom-[234px] scale-[0.7] lg:scale-[0.8] xl:scale-100 pointer-events-auto">
            <div className="flex flex-row mb-1">
              {['Q','W','E','R','T','Y','U','I','O','P','[ {','] }'].map(k => <Key key={k}>{k}</Key>)}
            </div>
            <div className="flex flex-row pl-4 mb-1">
              {['A','S','D','F','G','H','J','K','L','; :','\' "'].map(k => <Key key={k}>{k}</Key>)}
            </div>
            <div className="flex flex-row pl-8">
              {['Z','X','C','V','B','N','M',', <','. >','/ ?'].map(k => <Key key={k}>{k}</Key>)}
            </div>
          </div>

          {/* Gap Domination Strategy */}
          <div className="absolute flex w-[456px] -rotate-4 scale-[0.7] flex-col gap-4 transition-all duration-[600ms] ease-out lg:scale-[0.8] xl:scale-100 -bottom-30 -left-32 md:-left-16 lg:-bottom-24 lg:-left-12 xl:-bottom-[60px] xl:left-1 max-sm:hidden pointer-events-auto">
            <div className="flex flex-row gap-2">
              <div className="flex w-52 relative">
                <Target size={12} className="absolute left-2.5 top-2 text-gray-400" />
                <input tabIndex={-1} placeholder="Analyze competitor gaps..." className="z-10 w-full rounded-lg border border-gray-200 bg-white pl-7 pr-2 py-1.5 text-[10px] text-gray-800 shadow-sm placeholder:text-gray-400 focus-visible:outline-none" type="text" />
              </div>
              <span className="flex flex-row items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-2.5 py-1.5 text-[10px] text-gray-600 bg-white/40 backdrop-blur-sm cursor-pointer hover:bg-white/60"><PlusCircle size={12}/>Exploit Gap</span>
            </div>
            <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex h-8 flex-row items-center gap-3 px-3 bg-gray-50/50 border-b border-gray-100">
                <span className="flex w-16 flex-row items-center gap-1 text-[10px] font-medium text-gray-500">Opportunity</span>
                <span className="flex flex-row items-center gap-1 text-[10px] font-medium text-gray-500">Unanswered Question / Topic</span>
              </div>
              {[
                { score: 'High', tag: 'Pillar', task: 'How does AI evaluate brand trust?', star: true },
                { score: 'High', tag: 'Cluster', task: 'Examples of AEO optimized content' },
                { score: 'Medium', tag: 'Listicle', task: 'Top generative search engines 2026' },
                { score: 'Medium', tag: 'Glossary', task: 'What is an Entity in SEO?' },
                { score: 'Low', tag: 'Data', task: 'Click-through rates on AI Overviews' },
              ].map((t, i) => (
                <div key={i} className="flex h-9 flex-row items-center gap-3 border-t border-dashed border-gray-200 px-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className={`w-16 flex-none text-[10px] font-bold ${t.score === 'High' ? 'text-green-600' : t.score === 'Medium' ? 'text-yellow-600' : 'text-gray-500'}`}>{t.score}</span>
                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[9px] font-medium text-gray-600">{t.tag}</span>
                  {t.star && <Star size={10} className="text-yellow-400 fill-yellow-400 flex-none" />}
                  <span className="truncate text-[10px] text-gray-600">{t.task}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Layer 3 (Closest) */}
        <motion.div style={{ x: x3, y: y3 }} className="absolute w-full h-full">
          {/* Cable */}
          <div id="cable" className="absolute -top-20 right-[104px] h-[226px] w-7 -rotate-5 scale-[0.8] transition-all duration-[600ms] ease-out sm:right-[224px] lg:right-[288px] lg:scale-100 xl:-top-16 xl:right-[386px] pointer-events-auto">
            <svg width="28" height="226" viewBox="0 0 28 226" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all delay-100 duration-300 ease-in-out hover:translate-y-8 cursor-pointer">
              <path d="M14 0V200" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round"/>
              <rect x="10" y="200" width="8" height="16" rx="2" fill="#D1D5DB"/>
              <rect x="12" y="216" width="4" height="10" rx="1" fill="#9CA3AF"/>
            </svg>
          </div>

          {/* Torn Paper Strategy */}
          <div className="absolute z-10 flex -rotate-10 flex-col px-6 pb-8 pt-4 transition-all duration-[600ms] ease-out -right-40 -top-28 sm:-right-32 sm:-top-32 lg:-right-14 lg:-top-20 xl:-right-[34px] xl:-top-[68px] scale-[0.7] lg:scale-[0.8] xl:scale-100 pointer-events-auto">
            <TornPaperBg />
            <div className="relative z-10">
              <div className="flex flex-col gap-2 mb-2">
                <span className="text-[12px] font-bold text-gray-900 font-mono">Content Sequence</span>
              </div>
              {[
                { label: 'Pillar: AI Search', status: 'Live', color: 'green' },
                { label: 'Cluster: GEO Tactics', status: 'Writing', color: 'blue' },
                { label: 'Cluster: AEO Guide', status: 'Briefing', color: 'purple' },
                { label: 'Support: Case Study', status: 'Research', color: 'gray' },
                { label: 'Support: Data Report', status: 'Queued', color: 'gray' },
                { label: 'Glossary: Entities', status: 'Queued', color: 'gray' },
                { label: 'Pillar: Brand Voice', status: 'Queued', color: 'gray' },
              ].map((item, i) => (
                <div key={i} className="relative flex h-[30px] w-[224px] flex-row items-center justify-between border-b border-dashed border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-400`}></div>
                    <span className="text-[10px] font-medium text-gray-800">{item.label}</span>
                  </div>
                  <span className={`flex flex-row items-center gap-1 rounded border border-${item.color}-200 bg-${item.color}-50 px-1.5 py-0.5 text-[8px] text-${item.color}-700 font-medium`}>
                    {item.status === 'Live' && <Check size={8} strokeWidth={3} />}
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Consistency */}
          <div id="voice-check" className="absolute flex w-[158px] -rotate-4 flex-col rounded-[12px] border border-dashed border-gray-300 transition-all duration-[600ms] ease-out max-md:hidden -right-12 bottom-52 lg:-right-10 lg:bottom-64 xl:-right-[30px] xl:bottom-[324px] scale-[0.7] lg:scale-[0.8] xl:scale-100 bg-white/60 backdrop-blur-md p-3 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                <Mic size={12} className="text-blue-500" />
                <span className="text-[10px] font-bold text-gray-800">Voice Match</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-600">Tone</span>
                  <span className="text-[9px] font-bold text-green-600">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '98%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-gray-600">Authority</span>
                  <span className="text-[9px] font-bold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '95%' }}></div>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-gray-600">Clarity</span>
                  <span className="text-[9px] font-bold text-green-600">99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div id="toolbar" className="absolute flex -rotate-5 scale-[0.7] flex-row gap-3 transition-all duration-[600ms] ease-out lg:scale-[0.8] xl:scale-100 -right-4 bottom-26 sm:bottom-36 md:bottom-38 md:right-26 lg:bottom-46 lg:right-30 xl:bottom-[238px] xl:right-[180px] bg-white/60 backdrop-blur-md px-3 py-2 rounded-lg border border-dashed border-gray-300 pointer-events-auto">
            <Network size={14} className="text-gray-700 cursor-pointer hover:text-black"/>
            <BrainCircuit size={14} className="text-gray-700 cursor-pointer hover:text-black"/>
            <Target size={14} className="text-gray-700 cursor-pointer hover:text-black"/>
            <SlidersHorizontal size={14} className="text-gray-700 cursor-pointer hover:text-black"/>
            <Zap size={14} className="text-gray-700 cursor-pointer hover:text-black"/>
          </div>

          {/* Sidebar */}
          <div id="sidebar" className="absolute flex w-[168px] -rotate-7 scale-[0.7] flex-col gap-2 transition-all duration-[600ms] ease-out max-md:hidden lg:scale-[0.8] xl:scale-100 -bottom-22 -right-16 lg:-bottom-18 xl:-bottom-[52px] xl:-right-[58px] bg-white/60 backdrop-blur-md p-2 rounded-2xl border border-dashed border-gray-300 pointer-events-auto">
            <div className="flex flex-row items-center px-2 py-1.5 hover:bg-white/50 rounded-lg cursor-pointer transition-colors">
              <div className="flex flex-row items-center gap-2">
                <div className="h-5 w-5 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Avatar" className="w-full h-full object-cover"/>
                </div>
                <span className="text-[11px] font-medium text-gray-800">Olivia May</span>
              </div>
            </div>
            <div className="h-px bg-gray-200 border-t border-dashed border-transparent mx-2"></div>
            <div className="flex flex-col gap-0.5">
              {[
                { icon: Inbox, label: 'Strategy', count: 12 },
                { icon: FileEdit, label: 'Drafts', count: 4 },
                { icon: Send, label: 'Published' },
                { icon: AlertCircle, label: 'Gaps', count: 8 },
                { icon: Trash2, label: 'Archived' },
              ].map((item, i) => (
                <div key={i} className="flex flex-row items-center justify-between px-2 py-1.5 hover:bg-white/50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex flex-row items-center gap-2 text-gray-600">
                    <item.icon size={12} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </div>
                  {item.count && <span className="text-[9px] text-gray-400 font-medium">{item.count}</span>}
                </div>
              ))}
            </div>
            <div className="h-px bg-gray-200 border-t border-dashed border-transparent mx-2"></div>
            <div className="flex flex-col gap-0.5">
              {[
                { icon: Folder, label: 'Competitors', count: 24 },
                { icon: Folder, label: 'Entities', count: 190 },
                { icon: Folder, label: 'Keywords', count: 350 },
                { icon: Folder, label: 'Reports', count: 4 },
              ].map((item, i) => (
                <div key={i} className="flex flex-row items-center justify-between px-2 py-1.5 hover:bg-white/50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex flex-row items-center gap-2 text-gray-600">
                    <item.icon size={12} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </div>
                  {item.count && <span className="text-[9px] text-gray-400 font-medium">{item.count}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div id="form" className="absolute flex w-[272px] -rotate-10 scale-[0.7] flex-col rounded-2xl border border-dashed border-gray-300 transition-all duration-[600ms] ease-out lg:scale-[0.8] xl:scale-100 -bottom-40 -right-32 sm:-bottom-34 md:right-18 lg:-bottom-32 lg:right-24 xl:-bottom-[122px] xl:right-[162px] bg-white/60 backdrop-blur-md pointer-events-auto">
            <div className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-gray-900">Start Dominating</span>
                <span className="text-[10px] text-gray-500">Enter your domain to see your AI search gaps.</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium text-gray-700">Website URL</span>
                  <input tabIndex={-1} placeholder="https://yourbrand.com" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] text-gray-800 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300" type="url" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium text-gray-700">Target Category / Keyword</span>
                  <input tabIndex={-1} placeholder="e.g. Enterprise CRM" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[10px] text-gray-800 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300" type="text" />
                </div>
              </div>
              <button className="flex h-8 items-center justify-center rounded-lg bg-gray-900 text-[10px] font-medium text-white hover:bg-gray-800 transition-colors mt-1">
                Analyze My Gaps
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full pointer-events-none">
        <div className="text-center max-w-4xl px-4 pointer-events-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-tight mb-4">
            <span className="relative inline-block mx-2 -translate-y-1">
              <svg className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] text-gray-800 -rotate-2 drop-shadow-md" viewBox="0 0 100 40" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20 Q10 5 50 5 Q90 5 95 20 Q100 35 50 35 Q0 35 5 20 Z" />
              </svg>
              <span className="relative text-white font-cursive text-5xl md:text-6xl lg:text-7xl px-4 py-1 inline-block -rotate-2">FlipAEO</span>
            </span>
            is the Strategic Content Engine<br/>
            for dominating AEO and GEO.
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mt-6">
            <a href="#" className="underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors">Start dominating</a>
            
            <div className="bg-[#1C1C1C] text-white rounded-[14px] w-12 h-12 flex items-center justify-center rotate-[-5deg] shadow-lg mx-1 border-2 border-white/10">
              <Sparkles size={24} className="text-white" />
            </div>
            
            <span>or</span>
            
            <a href="#" className="underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors">see how we win</a>
            
            <div className="relative bg-[#1C1C1C] text-white rounded-[10px] px-3 py-2 flex items-center justify-center rotate-[10deg] shadow-lg mx-1 border-2 border-white/10">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F4F4F5] rounded-full border-r-2 border-[#1C1C1C]"></div>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F4F4F5] rounded-full border-l-2 border-[#1C1C1C]"></div>
              <span className="text-xs font-bold tracking-tight">AI Search</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors bg-white/50 backdrop-blur-sm shadow-sm">
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* Second Section - Premium Minimalist */}
      <div className="relative z-20 flex flex-col items-center min-h-screen w-full pt-24 pb-32 bg-[#F4F4F5]">
        <div className="max-w-3xl w-full px-6 md:px-12">
          {/* Heading */}
          <h2 className="text-3xl md:text-[42px] leading-[1.15] font-medium text-gray-900 mb-16 tracking-tight">
            We engineer the exact content required<br/>to make your brand the #1 citation in AI search results.
          </h2>

          {/* Diagram */}
          <div className="relative flex items-center justify-start w-full mb-12">
            {/* Left Nodes */}
            <div className="flex flex-col gap-4 w-[160px] md:w-[180px] relative z-10">
              <div className="flex items-center justify-end relative">
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-baseline gap-2 border border-gray-100/50">
                  <span className="font-medium text-gray-900 text-[14px] md:text-[15px]">AI Search</span>
                  <span className="text-[10px] md:text-[11px] font-semibold text-gray-400">Analysis</span>
                </div>
                <div className="absolute right-[-3px] w-1.5 h-1.5 rounded-full bg-gray-400 z-20"></div>
              </div>
              <div className="flex items-center justify-end relative">
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-baseline gap-2 border border-gray-100/50">
                  <span className="font-medium text-gray-900 text-[14px] md:text-[15px]">Gap Discovery</span>
                  <span className="text-[10px] md:text-[11px] font-semibold text-gray-400">Strategy</span>
                </div>
                <div className="absolute right-[-3px] w-1.5 h-1.5 rounded-full bg-gray-400 z-20"></div>
              </div>
              <div className="flex items-center justify-end relative">
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-baseline gap-2 border border-gray-100/50">
                  <span className="font-medium text-gray-900 text-[14px] md:text-[15px]">Brand Voice</span>
                  <span className="text-[10px] md:text-[11px] font-semibold text-gray-400">Consistency</span>
                </div>
                <div className="absolute right-[-3px] w-1.5 h-1.5 rounded-full bg-gray-400 z-20"></div>
              </div>
            </div>

            {/* SVG Lines */}
            <svg className="w-[80px] md:w-[120px] h-[164px] pointer-events-none -mx-[3px]" viewBox="0 0 100 164" preserveAspectRatio="none">
              <path d="M 0 22 C 50 22, 50 82, 100 82" stroke="#CBD5E1" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M 0 82 L 100 82" stroke="#CBD5E1" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M 0 142 C 50 142, 50 82, 100 82" stroke="#CBD5E1" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Right Node */}
            <div className="relative z-10 flex items-center">
              <div className="absolute left-[-3px] w-1.5 h-1.5 rounded-full bg-gray-400 z-20"></div>
              <div className="bg-white rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100/50">
                <span className="font-mono text-[12px] md:text-[13px] text-gray-600">#1 Citation</span>
              </div>
            </div>
          </div>

          {/* Integration Banner */}
          <div className="border border-dashed border-gray-300 rounded-xl p-4 px-5 flex items-start md:items-center gap-4 bg-white/30 backdrop-blur-sm max-w-xl">
            <div className="flex-none mt-0.5 md:mt-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="text-[13px] text-gray-800 font-medium leading-relaxed">
              We don't just write articles. We reverse-engineer how AI models think to put your brand inside the answer.
            </p>
          </div>

          {/* Gap Domination */}
          <div className="mt-32 flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-[36px] font-medium text-gray-900 mb-4 tracking-tight">Gap Domination.</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Your competitors aren’t winning by publishing more. They’re winning by answering better questions.
              </p>
            </div>
            <div className="md:w-2/3 flex flex-col gap-8">
              {[
                "We analyze what they cover and how AI models perceive their authority.",
                "We identify what they miss and where authority is still unclaimed.",
                "We exploit these gaps with engineered content to make you the definitive answer."
              ].map((text, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-gray-400 font-serif italic text-2xl leading-none pt-1">{i + 1}</span>
                  <p className="text-gray-800 text-[18px] leading-relaxed font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Arsenal */}
          <div className="mt-32 w-full">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-[36px] font-medium text-gray-900 tracking-tight mb-2">The Arsenal.</h2>
                <p className="text-gray-500 text-lg">Tools and strategies to dominate AI search.</p>
              </div>
              <a href="#" className="text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 transition-colors">View all capabilities</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 group relative overflow-hidden rounded-[24px] bg-white border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Network size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                  <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                    <Network size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-3">Semantic Clusters</h3>
                    <p className="text-gray-500 leading-relaxed max-w-md">
                      Interconnected content architectures designed specifically for how LLMs build knowledge graphs and determine topical authority.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[24px] bg-gray-900 text-white p-8 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BrainCircuit size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/5 flex items-center justify-center mb-6">
                    <BrainCircuit size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-3">Entity Optimization</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Structuring your brand data so AI models inherently understand and trust your citations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[24px] bg-white border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Target size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                  <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                    <Target size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-3">Gap Analysis</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Identifying the exact questions AI engines can't answer, and positioning you as the source.
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 group relative overflow-hidden rounded-[24px] bg-[#F4F4F5] border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Sparkles size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-3">AI-Native Content</h3>
                    <p className="text-gray-500 leading-relaxed max-w-md">
                      We write for humans and modern AI search. Content engineered to be extracted, summarized, and cited by generative engines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
