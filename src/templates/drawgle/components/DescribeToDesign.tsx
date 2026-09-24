"use client";
import React, { useState, useEffect } from 'react';
import { Settings, ArrowRight, Check, Activity, Flame, ChevronRight, MapPin, Trophy, ChevronLeft, ShoppingBag, Home, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DescribeToDesign() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    const runSequence = async () => {
      if (!mounted) return;
      setCurrentStep(0);
      await new Promise(r => setTimeout(r, 800));
      
      if (!mounted) return;
      setCurrentStep(1);
      await new Promise(r => setTimeout(r, 2500));
      
      if (!mounted) return;
      setCurrentStep(2);
      await new Promise(r => setTimeout(r, 2500));
      
      if (!mounted) return;
      setCurrentStep(3);
      await new Promise(r => setTimeout(r, 5000));
      
      if (!mounted) return;
      runSequence();
    };

    runSequence();

    return () => {
      mounted = false;
    };
  }, []);

  const panelStyle = {
    border: '1px solid #C5D4D8',
    background: 'rgba(250, 252, 253, 0.7)',
    boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.96), inset 0 -2px 9px rgba(166, 188, 196, 0.33), inset 0 0 0 6px rgba(255, 255, 255, 0.42), 0 4px 16px rgba(86, 182, 198, 0.06)',
  };

  const codeBlocks = [
    {
      step: 1,
      lines: [
        { label: '"colors"', text: '{' },
        { label: '  "primary"', text: '"#000000",', color: '#8C999E' },
        { label: '  "surface"', text: '"#F5F5F5",', color: '#8C999E' },
        { label: '  "ink"', text: '"#000000"', color: '#8C999E' },
        { label: '},', text: '' },
      ]
    },
    {
      step: 2,
      lines: [
        { label: '"typography"', text: '{' },
        { label: '  "fontFamily"', text: '"Inter",', color: '#41ABBC' },
        { label: '  "heading"', text: '"800"', color: '#41ABBC' },
        { label: '},', text: '' },
      ]
    },
    {
      step: 3,
      lines: [
        { label: '"components"', text: '{' },
        { label: '  "card.radius"', text: '"28px",', color: '#b28ced' },
        { label: '  "nav.style"', text: '"floating",', color: '#41ABBC' },
        { label: '  "image.blend"', text: '"multiply"', color: '#b28ced' },
        { label: '}', text: '' },
      ]
    }
  ];

  return (
    <section className="relative w-full max-w-[1138px] mx-auto px-4 md:px-6 py-24 mb-16 z-10">
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5D4D8] bg-[#F4FBFC] text-[11px] font-bold text-[#41ABBC] uppercase tracking-widest mb-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]"
        >
          <Settings size={12} strokeWidth={2.5} />
          <span>AI Design Studio</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[48px] font-extrabold text-[#2C3132] leading-[1.05] tracking-[-0.03em] mb-4"
        >
          Describe the app.<br />Watch it become <span className="text-[#56B6C6]">reality.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#6A7174] text-[17px] font-medium max-w-xl"
        >
          Instantly generate beautiful, production-ready interfaces without touching a design tool. Build faster, design better.
        </motion.p>
      </div>

      {/* Prompts/Steps Strip */}
      <div className="relative mt-16 mb-8 max-w-[800px] mx-auto flex flex-wrap justify-center md:justify-between items-center z-10 gap-3 px-4">
        {/* Decorative connecting line */}
        <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-[1px] border-t border-dashed border-[#C5D4D8] -z-10 mt-[-0.5px]"></div>
        
        {/* Pill 1 */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${currentStep >= 1 ? 'border-[#D5E0E2] bg-[#F4FBFC] shadow-[0_2px_4px_rgba(86,182,198,0.03),inset_0_1px_0_rgba(255,255,255,0.9)]' : 'border-[#E6ECEE] bg-white opacity-50'} text-[12px] md:text-[13px] font-bold text-[#2C3132]`}>
           <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${currentStep >= 1 ? 'bg-[#56B6C6] text-white shadow-sm' : 'bg-[#E6ECEE] text-transparent'}`}>
             {currentStep >= 1 ? <Check size={10} strokeWidth={4} /> : null}
           </div>
           Minimal storefront
        </div>
        
        <div className="hidden md:flex text-[#A1B8BF] bg-white rounded-full p-0.5 z-10 flex-shrink-0">
          <ArrowRight size={14} strokeWidth={3} />
        </div>

        {/* Pill 2 */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${currentStep >= 2 ? 'border-[#D5E0E2] bg-[#F4FBFC] shadow-[0_2px_4px_rgba(86,182,198,0.03),inset_0_1px_0_rgba(255,255,255,0.9)]' : currentStep === 1 ? 'border-[#56B6C6]/30 bg-white shadow-[0_0_0_2px_rgba(86,182,198,0.1)] scale-105' : 'border-[#E6ECEE] bg-white opacity-50'} text-[12px] md:text-[13px] font-bold text-[#2C3132]`}>
           <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${currentStep >= 2 ? 'bg-[#56B6C6] text-white shadow-sm' : currentStep === 1 ? 'bg-transparent border border-[#56B6C6] text-[#56B6C6]' : 'bg-[#E6ECEE] text-transparent'}`}>
             {currentStep >= 2 ? <Check size={10} strokeWidth={4} /> : currentStep === 1 ? <span className="animate-pulse leading-none mb-1">...</span> : null}
           </div>
           Product sections
        </div>

        <div className="hidden md:flex text-[#A1B8BF] bg-white rounded-full p-0.5 z-10 flex-shrink-0">
          <ArrowRight size={14} strokeWidth={3} />
        </div>

        {/* Pill 3 */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${currentStep >= 3 ? 'border-[#D5E0E2] bg-[#F4FBFC] shadow-[0_2px_4px_rgba(86,182,198,0.03),inset_0_1px_0_rgba(255,255,255,0.9)]' : currentStep === 2 ? 'border-[#56B6C6]/30 bg-white shadow-[0_0_0_2px_rgba(86,182,198,0.1)] scale-105' : 'border-[#E6ECEE] bg-white opacity-50'} text-[12px] md:text-[13px] font-bold text-[#2C3132]`}>
           <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${currentStep >= 3 ? 'bg-[#56B6C6] text-white shadow-sm' : currentStep === 2 ? 'bg-transparent border border-[#56B6C6] text-[#56B6C6]' : 'bg-[#E6ECEE] text-transparent'}`}>
             {currentStep >= 3 ? <Check size={10} strokeWidth={4} /> : currentStep === 2 ? <span className="animate-pulse leading-none mb-1">...</span> : null}
           </div>
           Floating navigation
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <svg width="2" height="24" viewBox="0 0 2 24" fill="none" className="text-[#C5D4D8]">
           <path d="M1 0v24" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Main Split Panel */}
      <div 
        className="relative w-full max-w-[1000px] mx-auto rounded-[36px] p-2 overflow-hidden backdrop-blur-xl"
        style={panelStyle}
      >
        <div className="grid lg:grid-cols-[1fr_1.2fr] h-auto min-h-[640px]">
          
          {/* LEFT: Code Panel */}
          <div className="bg-white rounded-[28px] border border-[#E6ECEE] flex flex-col overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] relative m-0 mb-2 lg:m-1 lg:mr-1 h-[350px] sm:h-[400px] lg:h-auto w-full min-w-0">
            <div className="h-[46px] border-b border-[#E6ECEE] flex items-center px-5 bg-[#FAFDFD]">
              <div className="flex gap-1.5 mr-4 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5D4D8]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5D4D8]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5D4D8]"></div>
              </div>
              <div className="text-[11px] font-mono text-[#8C999E] font-bold flex items-center gap-2 uppercase tracking-widest">
                <Settings size={14} />
                design-tokens.json
              </div>
            </div>
            
            <div className="flex-1 p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-[1.8] bg-[#FAFCFC] overflow-x-auto overflow-y-hidden relative">
              <div className="flex">
                 <div className="w-8 text-right pr-4 text-[#C5D4D8] select-none flex flex-col font-medium">
                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                 </div>
                 <div className="flex-1 text-[#2C3132]">
                    <motion.div initial={{opacity:0}} animate={{opacity: currentStep >= 1 ? 1 : 0}}>{"{"}</motion.div>
                    
                    {codeBlocks.map((block) => (
                      <AnimatePresence key={block.step}>
                        {currentStep >= block.step && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            {block.lines.map((line, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 + 0.2 }}
                                className="pl-6 flex whitespace-pre"
                              >
                                <span className="text-[#56B6C6] font-semibold">{line.label}</span>
                                {line.text && <><span className="text-[#8C999E]">: </span><span style={{color: line.color}} className="font-semibold">{line.text}</span></>}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                    
                    <motion.div initial={{opacity:0}} animate={{opacity: currentStep >= 1 ? 1 : 0}}>{"}"}</motion.div>

                    {/* Blinking Cursor */}
                    {currentStep > 0 && currentStep < 3 && (
                      <motion.div 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-[15px] bg-[#56B6C6] ml-6 mt-1"
                      />
                    )}
                 </div>
              </div>
            </div>
            {/* Elegant fading gradient at the bottom of the code panel */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAFCFC] to-transparent pointer-events-none"></div>
          </div>

          {/* RIGHT: UI Preview Panel (Taller, 10x Better Phone Frame) */}
          <div className="rounded-[28px] bg-transparent flex items-start sm:items-center justify-center p-0 py-8 sm:p-6 relative min-h-[550px] lg:min-h-0 overflow-hidden w-full min-w-0">
             {/* Abstract grid background fade */}
             <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(circle at center, #C5D4D8 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
             
             {/* Glowing highlight tracking current step */}
             <motion.div 
               animate={{ 
                 opacity: currentStep > 0 ? 0.2 : 0,
                 scale: currentStep === 3 ? 1.2 : 1,
               }}
               transition={{ duration: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-gradient-to-tr from-[#56B6C6] to-[#FF8A66] rounded-full filter blur-[80px] z-0"
             />

             {/* The Premium Hardware Phone Frame */}
             <div className="w-[320px] h-[650px] bg-[#B4B9B8] rounded-[54px] p-[8px] shadow-[0_32px_64px_rgba(26,29,30,0.18),0_0_0_1px_rgba(44,49,50,0.08),inset_0_2px_6px_rgba(255,255,255,0.6)] relative z-10 flex flex-col box-border border-2 border-[#D8DDDC] scale-[0.8] sm:scale-90 md:scale-100 origin-top sm:origin-center flex-shrink-0">
                
                {/* Hardware buttons */}
                <div className="absolute left-[-4px] top-[120px] w-[4px] h-[26px] bg-[#A1A5A4] rounded-l-md shadow-[inset_1px_0_2px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute left-[-4px] top-[170px] w-[4px] h-[54px] bg-[#A1A5A4] rounded-l-md shadow-[inset_1px_0_2px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute left-[-4px] top-[236px] w-[4px] h-[54px] bg-[#A1A5A4] rounded-l-md shadow-[inset_1px_0_2px_rgba(0,0,0,0.1)]"></div>
                <div className="absolute right-[-4px] top-[190px] w-[4px] h-[82px] bg-[#A1A5A4] rounded-r-md shadow-[inset_-1px_0_2px_rgba(0,0,0,0.1)]"></div>

                {/* Inner Bezel Screen */}
                <div className="w-full h-full bg-white rounded-[46px] border-[6px] border-black relative overflow-hidden flex flex-col shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full z-[60] flex items-center justify-between px-3 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.1)]">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/5"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-indigo-400 blur-[1px]"></div>
                     </div>
                  </div>

                  {/* UI Render Area (Sneakers Store) */}
                  <div className="flex-1 relative z-10 font-sans text-black w-full h-full flex flex-col bg-white overflow-x-hidden overflow-y-auto no-scrollbar">
                    
                    {/* Placeholder Base (Always there but hidden when UI comes) */}
                    <AnimatePresence>
                      {currentStep === 0 && (
                        <motion.div 
                          exit={{ opacity: 0 }} 
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                           <div className="w-[120px] h-[120px] border-[2px] border-dashed border-gray-200 rounded-full flex items-center justify-center text-gray-300">
                             <Settings size={32} className="animate-[spin_10s_linear_infinite]" />
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 1: Header + Hero */}
                    <AnimatePresence>
                      {currentStep >= 1 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, type: 'spring' }}
                          className="flex flex-col w-full pt-12 shrink-0"
                        >
                          <div className="flex items-center justify-between px-6 h-16">
                            <button className="w-11 h-11 flex items-center justify-center border border-[#EEEEEE] rounded-[12px] bg-white">
                              <ChevronLeft size={20} />
                            </button>
                            <div className="italic font-black text-[20px] tracking-tighter text-black opacity-20">JMDF</div>
                            <button className="w-11 h-11 flex items-center justify-center border border-[#EEEEEE] rounded-[12px] bg-white relative">
                              <ShoppingBag size={20} />
                              <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white"></div>
                            </button>
                          </div>

                          <div className="px-6 mt-2">
                            <div className="text-[24px] font-[800] leading-[28px] text-black m-0">New Collection</div>
                            <div className="text-[12px] font-[400] text-[#666666] mt-1">JMDA Original 2025</div>
                          </div>

                          <div className="px-6 mt-6 relative">
                            <div className="w-full h-[180px] bg-[#F5F5F5] rounded-[28px] p-[16px] flex flex-col justify-center relative overflow-visible shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                              <div className="z-10 w-[55%]">
                                <div className="text-[20px] font-[700] leading-[24px] text-black m-0">JMDA Max Lift 001</div>
                                <div className="text-[12px] font-[400] text-[#666666] mb-4 mt-1">Men&apos;s shoes</div>
                                <button className="h-[36px] px-6 bg-black text-white rounded-full text-[14px] font-[600] flex items-center justify-center">
                                  Shop now
                                </button>
                              </div>
                              <div className="absolute -right-[15%] top-[10%] w-[220px] h-[160px] pointer-events-none z-20">
                                <img src="https://static.vecteezy.com/system/resources/previews/058/272/032/non_2x/sleek-and-minimalist-running-shoe-with-transparent-design-free-png.png" alt="Running Shoe" className="w-full h-full object-contain drop-shadow-xl" />
                              </div>
                              <div className="absolute bottom-[20px] left-[50%] -translate-x-1/2 flex gap-1.5 z-30">
                                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#E0E0E0]"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#E0E0E0]"></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 2: Categories */}
                    <AnimatePresence>
                      {currentStep >= 2 && (
                         <motion.div 
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                           className="w-full mt-8 shrink-0"
                         >
                            <div>
                              <div className="flex overflow-x-hidden px-6 gap-6 items-end">
                                <div className="flex flex-col flex-shrink-0">
                                  <span className="text-[20px] font-[700] text-black">Running</span>
                                  <span className="text-[12px] text-[#666666]">4 items</span>
                                </div>
                                <div className="flex flex-col flex-shrink-0 opacity-30">
                                  <span className="text-[20px] font-[700] text-black">Lifestyle</span>
                                  <span className="text-[12px] text-[#666666]">9 items</span>
                                </div>
                                <div className="flex flex-col flex-shrink-0 opacity-30">
                                  <span className="text-[20px] font-[700] text-black">Gym</span>
                                  <span className="text-[12px] text-[#666666]">5 items</span>
                                </div>
                              </div>
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 3: Product Grid and Bottom Nav */}
                    <AnimatePresence>
                      {currentStep >= 3 && (
                         <motion.div 
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                           className="w-full mt-6 shrink-0"
                         >
                            <div className="px-6 grid grid-cols-2 gap-[12px] pb-[100px]">
                              <div className="bg-[#F5F5F5] rounded-[28px] p-4 flex flex-col min-h-[200px] relative">
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-[600]">JMDA Air</span>
                                  <div className="flex gap-1 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                                  </div>
                                </div>
                                <div className="flex-1 flex items-center justify-center py-2">
                                  <img src="https://static.vecteezy.com/system/resources/previews/058/272/032/non_2x/sleek-and-minimalist-running-shoe-with-transparent-design-free-png.png" alt="Sneaker" className="w-full h-auto object-contain rotate-[-15deg] drop-shadow-md" />
                                </div>
                                <div className="flex items-end justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-[16px] font-[700] leading-none">$ 200</span>
                                    <span className="text-[12px] text-[#666666] mt-1">Price</span>
                                  </div>
                                  <button className="w-7 h-7 rounded-lg border border-[#EEEEEE] flex items-center justify-center bg-white text-black shadow-sm">
                                    <ArrowRight size={14} strokeWidth={3} />
                                  </button>
                                </div>
                              </div>

                              <div className="bg-[#F5F5F5] rounded-[28px] p-4 flex flex-col min-h-[200px] relative">
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-[600]">JMDA Fly</span>
                                  <div className="flex gap-1 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                  </div>
                                </div>
                                <div className="flex-1 flex items-center justify-center py-2">
                                  <img src="https://static.vecteezy.com/system/resources/previews/058/272/032/non_2x/sleek-and-minimalist-running-shoe-with-transparent-design-free-png.png" alt="Sneaker" className="w-full h-auto object-contain rotate-[-15deg] drop-shadow-md" />
                                </div>
                                <div className="flex items-end justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-[16px] font-[700] leading-none">$ 200</span>
                                    <span className="text-[12px] text-[#666666] mt-1">Price</span>
                                  </div>
                                  <button className="w-7 h-7 rounded-lg border border-[#EEEEEE] flex items-center justify-center bg-white text-black shadow-sm">
                                    <ArrowRight size={14} strokeWidth={3} />
                                  </button>
                                </div>
                              </div>
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating Bottom Nav */}
                    <AnimatePresence>
                      {currentStep >= 3 && (
                        <motion.div 
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, type: 'spring' }}
                          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-end z-[90]"
                        >
                          <div className="flex items-center justify-between w-[220px] h-[64px] px-4 bg-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#EEEEEE]">
                            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-black relative">
                                <Home size={22} strokeWidth={2.5} />
                                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black"></span>
                            </button>
                            <div className="relative -top-5">
                              <button className="flex items-center justify-center w-[56px] h-[56px] bg-black rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                                <Search size={22} className="text-white" />
                              </button>
                            </div>
                            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-[#BDBDBD]">
                                <Heart size={22} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Gradient to cover overscroll/overlap at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-[80]"></div>

                  {/* Home indicator pill */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[5px] bg-[#000000]/30 rounded-full z-[100]"></div>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Stats row below using the brand aesthetic */}
      <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-0 md:divide-x divide-[#C5D4D8]/60 max-w-[800px] mx-auto text-center px-4 relative z-20">
         <div className="px-6 md:px-12 flex flex-col gap-1">
           <div className="text-[36px] font-extrabold text-[#2C3132] leading-none mb-1">6+</div>
           <div className="text-[12px] font-bold text-[#8C999E] uppercase tracking-widest">Screens Generated</div>
         </div>
         <div className="px-6 md:px-12 flex flex-col gap-1">
           <div className="text-[36px] font-extrabold text-[#2C3132] leading-none mb-1">1</div>
           <div className="text-[12px] font-bold text-[#8C999E] uppercase tracking-widest">Cohesive Identity</div>
         </div>
         <div className="px-6 md:px-12 flex flex-col gap-1">
           <div className="text-[36px] font-extrabold text-[#56B6C6] leading-none mb-1">0</div>
           <div className="text-[12px] font-bold text-[#8C999E] uppercase tracking-widest">Generic Templates</div>
         </div>
      </div>
    </section>
  );
}
