import Image from 'next/image';
import React from 'react';
import { MessageCircle, Brain, Rocket, Zap, XCircle, CheckCircle2, ShoppingBag, Mail, Plus, Check } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      {/* 
        HERO CONTAINER 
        Giant inset container with soft pink gradient, massive border radius 
      */}
      <div className="relative isolate w-full max-w-[1400px] mx-auto rounded-[40px] pt-6 px-6 sm:px-12 pb-[320px] bg-[#FDF2F4] overflow-hidden">
        
        {/* SVG Folds Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
            <defs>
              <linearGradient id="heroBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDF2F4" />
                <stop offset="100%" stopColor="#FAE8EB" />
              </linearGradient>

              <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              
              <linearGradient id="fadeLeftDeep" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="fadeRight" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect width="1200" height="800" fill="url(#heroBg)" />

            <path d="M 0 0 C 250 250, 150 650, 0 800 Z" fill="url(#fadeLeftDeep)" />
            
            <path d="M -50 -100 C 350 200, 250 750, -50 900 Z" fill="url(#fadeLeft)" />

            <path d="M 1200 0 C 950 250, 1050 650, 1200 800 Z" fill="url(#fadeLeftDeep)" transform="matrix(-1, 0, 0, 1, 2400, 0)" />
            
            <path d="M 1250 -100 C 850 200, 950 750, 1250 900 Z" fill="url(#fadeRight)" />
          </svg>
        </div>

        {/* TOP NAVIGATION */}
        <nav className="flex items-center justify-between relative z-20">
          {/* Logo Container */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Stylized 'N' Ribbon Logo mimicking the image */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C8 5.79086 9.79086 4 12 4H14V28H12C9.79086 28 8 26.2091 8 24V8Z" fill="#FF8387"/>
                <path d="M24 24C24 26.2091 22.2091 28 20 28H18V4H20C22.2091 4 24 5.79086 24 8V24Z" fill="#FF5A5F"/>
                <path d="M12 4H14L20 28H18L12 4Z" fill="#FFA5A8" className="mix-blend-multiply opacity-80"/>
              </svg>
            </div>
            <span className="font-semibold text-[20px] tracking-tight text-[#3A2121]">Nousu</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#6B7280]">
            <a href="#" className="hover:text-[#3A2121] transition-colors">Product</a>
            <a href="#" className="hover:text-[#3A2121] transition-colors">Resources</a>
            <a href="#" className="hover:text-[#3A2121] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#3A2121] transition-colors">Pricing</a>
          </div>

          {/* Login Button */}
          <button className="bg-gradient-to-b from-[#4A4A4A] to-[#2B2B2B] text-white px-7 py-2.5 rounded-[14px] font-bold text-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.2)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] ring-1 ring-white/10 transition-all">
            Login
          </button>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-20 mt-20 flex flex-col items-center text-center">
          
          {/* Social Proof Pill */}
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-8 transition-transform hover:-translate-y-0.5">
            <div className="flex -space-x-2">
              <img src="https://picsum.photos/seed/face1/64/64" alt="User" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              <img src="https://picsum.photos/seed/face2/64/64" alt="User" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              <img src="https://picsum.photos/seed/face3/64/64" alt="User" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-[12px] font-bold text-[#3A2121]/90 pr-1 tracking-wide">Trusted By 1200+ Users Worldwide</span>
          </div>

          {/* Headline */}
          <h1 className="text-[48px] sm:text-[64px] font-bold text-[#3A2121] leading-[1.1] tracking-[-0.02em] max-w-[800px]">
            Boost Your Team with<br />
            Smart AI
            {/* Embedded 3D Icon */}
            <span className="inline-flex relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] rounded-[18px] mx-4 align-middle bg-gradient-to-b from-[#4A3232] to-[#221212] shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_12px_24px_-4px_rgba(34,18,18,0.4)] overflow-hidden items-center justify-center -translate-y-1">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-soft-light"></div>
              {/* Abstract Avatar Shape */}
              <div className="relative flex flex-col items-center translate-y-2">
                <div className="w-[22px] h-[22px] bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.3)] border border-white/40"></div>
                <div className="w-[42px] h-[30px] bg-gradient-to-t from-gray-200 to-white rounded-t-full rounded-b-[4px] shadow-[0_-2px_10px_rgba(0,0,0,0.2)] mt-[-4px] border-t border-white/60"></div>
              </div>
            </span>
            Support
          </h1>

          {/* Subheadline */}
          <p className="max-w-[540px] mt-8 text-[18px] text-[#6B7280] leading-[28px] font-medium">
            Nousu is a fast, intelligent AI chatbot that offers human-like<br className="hidden sm:block" />
            support and instant responses — available 24/7.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <button className="w-full sm:w-auto bg-gradient-to-b from-[#ff6d72] to-[#FE4E54] text-white px-8 py-4 rounded-[14px] font-bold text-[16px] shadow-[0_12px_28px_rgba(255,90,95,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_rgba(255,90,95,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)] ring-1 ring-white/20 transition-all">
              Try For Free
            </button>
            <button className="w-full sm:w-auto bg-gradient-to-b from-[#FFFFFF] to-[#F9FAFB] text-[#3A2121] px-8 py-4 rounded-[14px] font-bold text-[16px] shadow-[0_12px_28px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] ring-1 ring-gray-200 transition-all">
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* 
        BREAKOUT MOCKUP CARD 
        Massive landscape image overlapping the hero container 
      */}
      <div className="relative w-full max-w-[1000px] mx-auto px-4 sm:px-8 -mt-[260px] z-30 perspective-1000">
        
        {/* Card Frame */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#1a1622] rounded-[32px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] border-[6px] border-white/50 backdrop-blur-2xl ring-1 ring-black/5">
          
          {/* Hazy Mountain Background */}
          <Image 
            src="https://picsum.photos/seed/purplemountain/1600/1000" 
            alt="Soft hazy sunset over mountains" 
            fill 
            className="object-cover opacity-80 mix-blend-screen mix-blend-plus-lighter blur-[1px] scale-105"
            priority
            unoptimized
          />
          {/* Gradients to enhance the dreamy atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c263d]/80 via-[#9c788d]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

          {/* INNER INTERFACE WINDOW */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            
            {/* Header / Brand in Mockup */}
            <div className="flex items-center gap-2.5 mb-5 translate-y-2">
              <div className="w-[26px] h-[26px] bg-[#1C1C1E] rounded-full flex items-center justify-center shadow-lg border border-white/10">
                <span className="text-white text-[12px] font-bold">N</span>
              </div>
              <span className="text-white font-semibold text-[15px] drop-shadow-md tracking-wide">Nousou Agent</span>
            </div>

            {/* Chat Box Container */}
            <div className="w-full max-w-[560px] bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 relative">
              
              <div className="flex flex-col space-y-5">
                
                {/* User Message (Right) */}
                <div className="flex items-end justify-end gap-3 translate-x-2">
                  <div className="bg-[#1A1A1A] text-white px-5 py-3 rounded-[20px] rounded-br-[4px] text-[15px] font-medium shadow-sm leading-[22px]">
                    Hi, my package hasn't arrived yet
                  </div>
                  <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden border-[2px] border-white shadow-sm">
                    <img src="https://picsum.photos/seed/chatuser/100/100" alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* AI Message 1 (Left) */}
                <div className="flex items-end justify-start gap-3 -translate-x-2">
                  <div className="w-9 h-9 rounded-full bg-[#2A1E1E] shrink-0 border-[2px] border-white shadow-sm overflow-hidden flex flex-col items-center justify-end pb-1 relative">
                    {/* Tiny representation of the 3D avatar */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#221212] to-[#4A3232]"></div>
                    <div className="w-2.5 h-2.5 bg-gray-200 rounded-full relative z-10 shadow-sm border border-white/20"></div>
                    <div className="w-4 h-3 bg-white rounded-t-full relative z-10 mt-[-2px] shadow-sm border-t border-white/40"></div>
                  </div>
                  <div className="bg-[#F8F2F3] text-[#3A2121] px-5 py-3 rounded-[20px] rounded-bl-[4px] text-[15px] font-medium shadow-sm">
                    I'll check that for you.
                  </div>
                </div>

                {/* AI Message 2 (Left) - Block */}
                <div className="flex items-end justify-start gap-3 pl-12 -translate-x-2">
                  <div className="bg-[#F8F2F3] text-[#3A2121] px-5 py-3.5 rounded-[20px] text-[15px] leading-[24px] font-medium shadow-sm max-w-[85%]">
                    Found it. Your package is delayed and will be delivered later today.
                  </div>
                </div>

              </div>

              {/* Hand-drawn Annotation overlay */}
              <div className="absolute -bottom-[3.5rem] left-[4rem] sm:left-[6rem] flex items-center gap-2.5 -rotate-2 group">
                {/* Organic, loopy arrow SVG */}
                <svg width="48" height="42" viewBox="0 0 60 50" fill="none" className="stroke-[#FF5A5F] opacity-90 drop-shadow-sm mt-2 translate-y-1">
                  <path d="M 40,2 C 15,-5 2,20 15,35 C 25,45 45,35 55,42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 45,35 L 55,42 L 48,48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Cursive Font Application */}
                <span className="font-cursive text-[28px] text-[#7A3E3E] font-bold tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  Handled without human intervention
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* FEATURES COMPARISON SECTION */}
      <section className="relative z-20 w-full max-w-[1240px] mx-auto mt-32 sm:mt-[220px] px-4 sm:px-6 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="relative w-full max-w-3xl flex flex-col items-center text-center">
          
          {/* Floating 3D Icons */}
          <div className="hidden md:flex absolute -left-12 -top-6 w-16 h-16 bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-2xl rotate-[-12deg] shadow-[0_16px_32px_-8px_rgba(255,90,95,0.6)] items-center justify-center border border-white/20 transition-transform hover:-translate-y-2">
            <MessageCircle className="w-8 h-8 text-white stroke-[2.5px]" fill="rgba(255,255,255,0.2)" />
          </div>
          <div className="hidden md:flex absolute -left-[110px] top-28 w-[52px] h-[52px] bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-[14px] rotate-[8deg] shadow-[0_16px_32px_-8px_rgba(255,90,95,0.6)] items-center justify-center border border-white/20 transition-transform hover:-translate-y-2">
            <Brain className="w-[26px] h-[26px] text-white stroke-[2.5px]" fill="rgba(255,255,255,0.2)" />
          </div>
          <div className="hidden md:flex absolute -right-12 -top-4 w-[60px] h-[60px] bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-2xl rotate-[15deg] shadow-[0_16px_32px_-8px_rgba(255,90,95,0.6)] items-center justify-center border border-white/20 transition-transform hover:-translate-y-2">
            <Rocket className="w-[30px] h-[30px] text-white stroke-[2.5px]" fill="rgba(255,255,255,0.2)" />
          </div>
          <div className="hidden md:flex absolute -right-24 top-[104px] w-[54px] h-[54px] bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-[14px] rotate-[-10deg] shadow-[0_16px_32px_-8px_rgba(255,90,95,0.6)] items-center justify-center border border-white/20 transition-transform hover:-translate-y-2">
            <Zap className="w-7 h-7 text-white stroke-[2.5px]" fill="rgba(255,255,255,0.2)" />
          </div>

          {/* Tag */}
          <div className="inline-flex items-center gap-1 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8">
            <span className="text-[13px] text-gray-500 font-medium">Why <strong className="text-gray-900 font-bold ml-0.5">Choose</strong> Us</span>
          </div>

          {/* Headline */}
          <h2 className="text-[44px] sm:text-[56px] font-bold text-[#3A2121] leading-[1.1] tracking-[-0.03em] mb-6 relative z-20">
            Why Nousu Stands Out<br />Beyond Basic Chatbots!
          </h2>

          {/* Subtitle */}
          <p className="text-[17px] text-[#6B7280] leading-[1.6] max-w-lg font-medium">
            Advanced AI that handles complex tasks faster<br className="hidden sm:block" />and smarter than traditional bots.
          </p>
        </div>

        {/* Comparison Board */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-20 rounded-[44px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] border-[4px] border-white relative bg-white">
          
          {/* Left Panel - Classic Chatbots */}
          <div className="bg-[#F5EBE9] flex flex-col justify-between h-full pt-16 relative">
            <div className="px-8 sm:px-14 flex flex-col h-full z-10">
              
              <div className="text-center mb-12">
                <h3 className="text-[34px] font-bold text-[#3A2121] mb-2 tracking-tight">Classic Chatbots</h3>
                <div className="flex justify-center items-center gap-1.5 text-[12px] font-bold text-[#867F7D]">
                  <XCircle className="w-4 h-4 text-[#A8A09E]" />
                  <span>Return approved. Email queued. Size swap suggested</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end space-y-5 pb-[72px] w-full mt-auto">
                {/* User Message */}
                <div className="flex justify-end gap-3 translate-x-2">
                  <div className="bg-white px-5 py-4 rounded-[20px] rounded-tr-[4px] text-[14.5px] font-medium text-[#4A403F] shadow-[0_2px_12px_rgba(0,0,0,0.03)] max-w-[280px] leading-[1.5]">
                    Hi, I'd like to return my shirt. I think I need a bigger size.
                  </div>
                  <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden border-[2px] border-white shadow-sm self-end">
                    <img src="https://picsum.photos/seed/classicuser/100/100" alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Bot Messages */}
                <div className="flex justify-start gap-3 -translate-x-2">
                  <div className="w-9 h-9 rounded-full bg-[#1A1A1A] shrink-0 border-[2px] border-white shadow-sm overflow-hidden flex items-center justify-center self-end">
                    <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="bg-[#E4D4D2] px-5 py-3 rounded-[20px] rounded-tl-[4px] text-[14.5px] font-medium text-[#4A403F] max-w-[280px]">
                      Hi Lisa! see order #232
                    </div>
                    <div className="bg-[#E4D4D2] px-5 py-3.5 rounded-[20px] rounded-bl-[4px] text-[14.5px] font-medium text-[#4A403F] max-w-[280px]">
                      I will process your return now!
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Footer */}
            <div className="border-t border-[#E8DCDA] w-full pt-8 pb-10 px-8 text-center mt-auto">
              <span className="font-serif italic text-[22px] text-[#A29795] font-medium tracking-tight">Basic Chatbots, Slow execution</span>
            </div>
          </div>

          {/* Right Panel - Nousu AI */}
          <div className="bg-[#EEDADB] flex flex-col justify-between h-full pt-16 relative">
            <div className="px-8 sm:px-14 flex flex-col h-full z-10">
              
              <div className="text-center mb-12 mt-1 sm:mt-0">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <div className="relative w-8 h-8 flex items-center justify-center translate-y-[-2px]">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C8 5.79086 9.79086 4 12 4H14V28H12C9.79086 28 8 26.2091 8 24V8Z" fill="#ff9094"/>
                      <path d="M24 24C24 26.2091 22.2091 28 20 28H18V4H20C22.2091 4 24 5.79086 24 8V24Z" fill="#FF5A5F"/>
                      <path d="M12 4H14L20 28H18L12 4Z" fill="#FFA5A8" className="mix-blend-multiply opacity-80"/>
                    </svg>
                  </div>
                  <h3 className="text-[34px] font-bold text-[#3A2121] tracking-tight">Nousu AI</h3>
                </div>
                <div className="flex justify-center items-center gap-1.5 text-[12px] font-bold text-[#f5595e]">
                  <CheckCircle2 className="w-4 h-4 fill-[#f5595e]/20 text-[#f5595e]" />
                  <span>Order Found. Return initiated. Label generating....</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end space-y-6 pb-[72px] w-full mt-auto">
                <div className="flex justify-end gap-3 translate-x-2">
                  <div className="bg-white px-5 py-4 rounded-[20px] rounded-tr-[4px] text-[14.5px] font-medium text-[#4A403F] shadow-[0_4px_16px_rgba(0,0,0,0.04)] max-w-[280px] leading-[1.5]">
                    Hi, I'd like to return my shirt. I think I need a bigger size.
                  </div>
                  <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden border-[2px] border-white shadow-sm self-end">
                    <img src="https://picsum.photos/seed/nousuuser/100/100" alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex justify-start gap-3 -translate-x-2">
                  <div className="w-9 h-9 rounded-full bg-[#1A1A1A] shrink-0 border-[2px] border-white shadow-sm overflow-hidden flex items-center justify-center self-end">
                    <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div className="bg-white px-[22px] py-[18px] rounded-[20px] rounded-bl-[4px] text-[14.5px] font-medium text-[#4A403F] shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.02] max-w-[340px] leading-[1.55]">
                    Hi Lisa! I've processed your return request. You'll get an email with next steps later today – including your label!
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-[#E0CBCB] w-full pt-8 pb-10 px-8 text-center mt-auto">
              <span className="font-serif italic text-[22px] text-[#8C4646] font-medium tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">Does Complex works within seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN FEATURES GRID SECTION */}
      <section className="relative z-20 w-full max-w-[1240px] mx-auto mt-24 sm:mt-32 px-4 sm:px-6 flex flex-col items-center pb-32">
        
        {/* Section Header */}
        <div className="relative w-full max-w-2xl flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-6">
            <span className="text-[13px] text-gray-500 font-medium">Features</span>
          </div>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-[#3A2121] leading-[1.1] tracking-[-0.02em] mb-5 relative z-20">
            What Your AI Team<br />Member Can Do
          </h2>
          <p className="text-[17px] text-[#6B7280] leading-[1.6] max-w-[440px] font-medium">
            Advanced AI that handles complex tasks faster<br className="hidden sm:block" />and smarter than traditional bots.
          </p>
        </div>

        {/* CSS Grid for 3 Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0">
          
          {/* Card 1: Converse Like a Pro */}
          <div className="relative rounded-none bg-[#FDF2F4] border-[2px] border-[#FAE4E7] p-2.5 overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(255,90,95,0.1)] transition-all duration-300 hover:-translate-y-1">
            {/* Corner Decorative Dots */}
            <div className="absolute top-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute top-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            
            {/* Inner White Card */}
            <div className="relative bg-white rounded-[32px] h-full shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col pt-12 pb-10 px-8">
              
              {/* Card 1 Visual Area */}
              <div className="flex-1 flex flex-col justify-start relative min-h-[300px]">
                
                {/* Brain + Connections */}
                <div className="relative w-full flex justify-center mb-[44px]">
                  <svg className="absolute w-[240px] h-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" viewBox="0 0 240 80">
                    <path d="M 120 40 L 40 15 L 20 15" fill="none" stroke="#FDE0E7" strokeWidth="2.5" />
                    <circle cx="20" cy="15" r="5.5" fill="white" stroke="#FDE0E7" strokeWidth="2.5" />
                    <path d="M 120 40 L 60 40 L 45 60 L 30 60" fill="none" stroke="#FDE0E7" strokeWidth="2.5" />
                    <circle cx="30" cy="60" r="5.5" fill="white" stroke="#FDE0E7" strokeWidth="2.5" />
                    
                    <path d="M 120 40 L 200 15 L 220 15" fill="none" stroke="#FDE0E7" strokeWidth="2.5" />
                    <circle cx="220" cy="15" r="5.5" fill="white" stroke="#FDE0E7" strokeWidth="2.5" />
                    <path d="M 120 40 L 180 40 L 195 60 L 210 60" fill="none" stroke="#FDE0E7" strokeWidth="2.5" />
                    <circle cx="210" cy="60" r="5.5" fill="white" stroke="#FDE0E7" strokeWidth="2.5" />
                  </svg>
                  <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-[18px] flex items-center justify-center shadow-[0_12px_24px_-4px_rgba(255,90,95,0.5)]">
                    <Brain className="w-7 h-7 text-white stroke-[2.5px]" />
                  </div>
                </div>

                {/* Chat Mockups */}
                <div className="w-full flex flex-col space-y-5">
                  <div className="flex justify-end gap-2 translate-x-2">
                    <div className="bg-[#F5EEEE] text-[#4A403F] text-[13px] px-4 py-3 rounded-[16px] rounded-tr-[4px] leading-[1.5] max-w-[210px] shadow-sm">
                      I'm really done with this!! I've been waiting for 2 weeks already!
                    </div>
                    <div className="w-6 h-6 rounded-full overflow-hidden border-[1.5px] border-white shadow-sm shrink-0 self-end mt-1">
                      <img src="https://picsum.photos/seed/angryuser/100/100" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex justify-start gap-2 relative -translate-x-3">
                    {/* Floating Accent Marks */}
                    <div className="absolute top-0 right-4 w-6 h-6 z-20 opacity-80 rotate-[-10deg]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-[#FF5A5F]">
                        <path d="M 4 14 C 6 8 12 6 12 6" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 8 18 C 12 12 18 10 18 10" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] shrink-0 border-[1.5px] border-white shadow-sm overflow-hidden flex items-center justify-center self-end mt-1 z-10">
                      <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C8 5.79086 9.79086 4 12 4H14V28H12C9.79086 28 8 26.2091 8 24V8Z" fill="#ff9094"/>
                        <path d="M24 24C24 26.2091 22.2091 28 20 28H18V4H20C22.2091 4 24 5.79086 24 8V24Z" fill="#FF5A5F"/>
                      </svg>
                    </div>
                    <div className="bg-[#E4D4D2] text-[#4A403F] text-[13px] px-4 py-3 rounded-[16px] rounded-tl-[4px] leading-[1.5] max-w-[210px] shadow-sm relative z-10">
                      Good news! Your package has already been shipped and DHL has tried to deliver it 3 times.
                    </div>
                  </div>
                </div>

              </div>

              {/* Card 1 Text */}
              <div className="mt-auto">
                <h3 className="text-[24px] font-bold text-[#3A2121] mb-2.5 tracking-tight">Converse Like a Pro</h3>
                <p className="text-[15px] text-[#6B7280] leading-[1.6]">Handles complex conversations with context, empathy for human-like experience</p>
              </div>
            </div>
          </div>

          {/* Card 2: Take Real Action */}
          <div className="relative rounded-none bg-[#FDF2F4] border-[2px] border-[#FAE4E7] -mt-[2px] md:-ml-[2px] md:mt-0 p-2.5 overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(255,90,95,0.1)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute top-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            
            <div className="relative bg-white rounded-[32px] h-full shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col pt-12 pb-10 px-8">
              
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] pb-10 pt-4">
                
                {/* Integration Top */}
                <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center justify-center w-full max-w-[200px] z-20 gap-3">
                  <div className="w-8 h-8 rounded shrink-0 bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
                    <ShoppingBag className="w-4.5 h-4.5 stroke-[2.5px]" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-[14px] font-bold text-gray-900 truncate">Shopify</div>
                    <div className="text-[11px] text-gray-400 font-medium truncate">Retour - JXSN Sweater</div>
                  </div>
                </div>

                {/* Glowing Line */}
                <div className="w-[3px] h-8 bg-gradient-to-b from-[#FFA5A8]/30 via-[#FF4B50] to-[#FF4B50] shadow-[0_0_12px_rgba(255,90,95,0.8)] -my-1 z-10 block"></div>

                {/* Central CPU Core */}
                <div className="relative z-30">
                  <div className="w-[68px] h-[68px] bg-[#1C1C1E] rounded-[22px] shadow-[0_16px_32px_-4px_rgba(220,38,38,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] flex items-center justify-center ring-1 ring-white/5 bg-gradient-to-br from-[#2a2a2e] to-[#121214]">
                    <Brain className="w-8 h-8 text-[#FF5A5F] drop-shadow-[0_0_12px_rgba(255,90,95,1)] stroke-[2px]" />
                  </div>
                  <div className="absolute inset-0 bg-[#FF5A5F] blur-xl opacity-30 rounded-full -z-10"></div>
                </div>

                 {/* Glowing Line */}
                 <div className="w-[3px] h-8 bg-gradient-to-b from-[#FF4B50] via-[#FF4B50] to-[#FFA5A8]/30 shadow-[0_0_12px_rgba(255,90,95,0.8)] -my-1 z-10 block"></div>

                {/* Integration Bottom */}
                <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center justify-center w-full max-w-[200px] z-20 gap-3">
                  <div className="w-8 h-8 rounded shrink-0 bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
                    <Mail className="w-4.5 h-4.5 stroke-[2.5px]" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-[14px] font-bold text-gray-900 truncate">Email</div>
                    <div className="text-[11px] text-gray-400 font-medium truncate">Customer question</div>
                  </div>
                </div>

              </div>
              
              <div className="mt-auto">
                <h3 className="text-[24px] font-bold text-[#3A2121] mb-2.5 tracking-tight">Take Real Action, Instantly</h3>
                <p className="text-[15px] text-[#6B7280] leading-[1.6]">Seamless connects to your systems to actually perform tasks- not just offer advice</p>
              </div>
            </div>
          </div>

          {/* Card 3: Always Getting Smarter */}
          <div className="relative rounded-none bg-[#FDF2F4] border-[2px] border-[#FAE4E7] -mt-[2px] md:-ml-[2px] md:mt-0 p-2.5 overflow-hidden group hover:shadow-[0_20px_40px_-10px_rgba(255,90,95,0.1)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute top-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] left-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            <div className="absolute bottom-[2px] right-[2px] w-1.5 h-1.5 rounded-full bg-[#E8CDD1]"></div>
            
            <div className="relative bg-white rounded-[32px] h-full shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col pt-12 pb-10 px-8">
              
              <div className="flex-1 flex flex-col justify-start relative min-h-[300px]">
                
                {/* Header Graphic */}
                <div className="w-full flex items-center justify-center relative mb-8 h-[60px] pl-6">
                  {/* Swooping Arrow SVG */}
                  <svg className="absolute left-[-5px] top-[10px] w-8 h-10 stroke-[#FF5A5F] opacity-70" viewBox="0 0 30 40" fill="none">
                    <path d="M 22 4 C 5 4 0 20 10 32" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 4 26 L 10 32 L 18 28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-serif italic text-[22px] text-[#8C4646] tracking-tight font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] whitespace-nowrap">
                    Real-time Review builds better
                  </span>
                </div>

                {/* Chat Mockup with Stickers */}
                <div className="w-full flex flex-col space-y-4">
                  <div className="flex justify-end gap-2 translate-x-2">
                    <div className="bg-[#F5EEEE] text-[#4A403F] text-[12px] px-3.5 py-2.5 rounded-[16px] rounded-tr-[4px] leading-[1.5] max-w-[170px] shadow-sm relative">
                      Can I also buy shoes with a leopard print from you?
                      {/* Connecting vertical line back */}
                      <div className="absolute left-[20px] -bottom-[16px] w-0.5 h-[16px] bg-[#FF5A5F]/40 z-0"></div>
                    </div>
                    <div className="w-5 h-5 rounded-full overflow-hidden border-[1px] border-white shadow-sm shrink-0 self-end mt-1 z-10">
                      <img src="https://picsum.photos/seed/leoparduser/100/100" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex justify-start gap-2 relative z-10 -translate-x-2">
                    
                    {/* Thumbs Down Sticker */}
                    <div className="absolute -bottom-2 -left-4 w-7 h-7 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[-12deg] z-20 text-[12px] transition-transform hover:scale-110">👎</div>
                    {/* Thumbs Up Sticker */}
                    <div className="absolute -top-3 -right-3 w-7 h-7 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[10deg] z-20 text-[12px] transition-transform hover:scale-110">👍</div>
                    
                    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] shrink-0 border-[1.5px] border-white shadow-sm overflow-hidden flex items-center justify-center self-end mt-1 z-10">
                      <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C8 5.79086 9.79086 4 12 4H14V28H12C9.79086 28 8 26.2091 8 24V8Z" fill="#ff9094"/>
                        <path d="M24 24C24 26.2091 22.2091 28 20 28H18V4H20C22.2091 4 24 5.79086 24 8V24Z" fill="#FF5A5F"/>
                      </svg>
                    </div>
                    <div className="bg-[#E4D4D2] text-[#4A403F] text-[13px] px-4 py-3 rounded-[16px] rounded-tl-[4px] leading-[1.5] max-w-[210px] shadow-sm">
                      Yes, we sell several leopard print shoes! You can find them in our 'Panther Collection'.
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-auto">
                <h3 className="text-[24px] font-bold text-[#3A2121] mb-2.5 tracking-tight">Always Getting Smarter</h3>
                <p className="text-[15px] text-[#6B7280] leading-[1.6]">Continuously learns from team interactions and grows more capable over time</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="relative z-20 w-full max-w-[1400px] mx-auto mt-20 sm:mt-32 px-4 sm:px-6 flex flex-col items-center pb-40">
        
        {/* Section Header */}
        <div className="relative w-full max-w-2xl flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center justify-center bg-white px-5 py-2 rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-6">
            <span className="text-[13px] text-gray-600 font-medium">Pricing</span>
          </div>
          <h2 className="text-[44px] sm:text-[52px] font-bold text-[#3A2121] leading-[1.1] tracking-[-0.02em] mb-4">
            Find Your Plan
          </h2>
          <p className="text-[16px] text-[#6B7280] font-medium">
            Trusted by millions. We help teams all around the world.
          </p>
          
          {/* Billing Toggle */}
          <div className="bg-[#FAF9F9] p-1.5 rounded-[20px] inline-flex items-center border border-gray-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] mt-8 relative z-20">
             <button className="bg-white px-8 py-2.5 rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-[14px] font-bold text-[#3A2121] border border-gray-100/50">Monthly</button>
             <button className="px-8 py-2.5 rounded-[16px] text-[14px] font-medium text-[#867F7D] transition-colors hover:text-gray-900">Annual</button>
          </div>
        </div>

        {/* Architectural Grid & Cards Wrapper */}
        <div className="relative w-full max-w-[1080px] mx-auto mt-6 sm:mt-12">
            
            {/* Background Lines & Crosshairs Overlay */}
            <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
               {/* Horizontal Lines */}
               <div className="absolute top-0 w-[calc(100%+80px)] sm:w-[calc(100%+160px)] -ml-[40px] sm:-ml-[80px] h-[1px] bg-gray-200/80"></div>
               <div className="absolute bottom-0 w-[calc(100%+80px)] sm:w-[calc(100%+160px)] -ml-[40px] sm:-ml-[80px] h-[1px] bg-gray-200/80"></div>
               
               {/* Vertical Lines */}
               <div className="absolute left-0 h-[calc(100%+60px)] sm:h-[calc(100%+120px)] -mt-[30px] sm:-mt-[60px] w-[1px] bg-gray-200/80"></div>
               <div className="absolute left-1/3 h-[calc(100%+60px)] sm:h-[calc(100%+120px)] -mt-[30px] sm:-mt-[60px] w-[1px] bg-gray-200/80 hidden md:block"></div>
               <div className="absolute right-1/3 h-[calc(100%+60px)] sm:h-[calc(100%+120px)] -mt-[30px] sm:-mt-[60px] w-[1px] bg-gray-200/80 hidden md:block"></div>
               <div className="absolute right-0 h-[calc(100%+60px)] sm:h-[calc(100%+120px)] -mt-[30px] sm:-mt-[60px] w-[1px] bg-gray-200/80"></div>

               {/* Crosshairs (+) - Standard outer corners */}
               <Plus className="absolute -left-3 -top-3 w-6 h-6 text-gray-300 stroke-[1.5px]" />
               <Plus className="absolute -right-3 -top-3 w-6 h-6 text-gray-300 stroke-[1.5px]" />
               <Plus className="absolute -left-3 -bottom-3 w-6 h-6 text-gray-300 stroke-[1.5px]" />
               <Plus className="absolute -right-3 -bottom-3 w-6 h-6 text-gray-300 stroke-[1.5px]" />
               
               {/* Crosshairs (+) - Desktop inner grid points */}
               <Plus className="absolute left-[calc(33.333%-12px)] -top-3 w-6 h-6 text-gray-300 stroke-[1.5px] hidden md:block" />
               <Plus className="absolute right-[calc(33.333%-12px)] -top-3 w-6 h-6 text-gray-300 stroke-[1.5px] hidden md:block" />
               <Plus className="absolute left-[calc(33.333%-12px)] -bottom-3 w-6 h-6 text-gray-300 stroke-[1.5px] hidden md:block" />
               <Plus className="absolute right-[calc(33.333%-12px)] -bottom-3 w-6 h-6 text-gray-300 stroke-[1.5px] hidden md:block" />
            </div>

            {/* Content Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 w-full h-[100%]">
                
                {/* Column 1: Core */}
                <div className="p-6 sm:p-8 flex items-center justify-center relative">
                   <div className="w-full bg-white rounded-[24px] border border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] pt-10 pb-8 px-8 flex flex-col min-h-[460px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition-all">
                      <h3 className="text-[22px] font-medium text-[#3A2121] mb-5 tracking-tight">Core</h3>
                      
                      <div className="flex items-end gap-1.5 mb-1.5">
                        <span className="text-[52px] font-bold text-[#3A2121] leading-[0.9] tracking-tighter">$69</span>
                        <span className="text-[14px] text-gray-500 mb-1.5 font-medium">/month</span>
                      </div>
                      <p className="text-[12.5px] text-[#A29795] font-medium pb-8 border-b border-transparent">Per user/month, billed annually</p>
                      
                      <div className="mt-8 mb-6 text-[13.5px] font-bold text-[#3A2121]">For Growing Teams</div>
                      
                      <div className="flex-1 flex flex-col space-y-4.5 mb-10">
                        {['Automatic data enrichment', 'Up to 3 Seats', 'Custom Billing'].map((feature, i) => (
                           <div key={i} className="flex items-center gap-3.5">
                              <div className="w-[18px] h-[18px] rounded-full bg-[#FFF0F2] flex items-center justify-center shrink-0">
                                 <Check className="w-2.5 h-2.5 text-[#FF5A5F] stroke-[3px]" />
                              </div>
                              <span className="text-[13.5px] font-medium text-[#6B7280]">{feature}</span>
                           </div>
                        ))}
                      </div>

                      <button className="mt-auto w-full bg-gradient-to-b from-[#4A4A4A] to-[#2B2B2B] text-white py-4 rounded-[14px] text-[14px] font-bold shadow-[0_8px_16px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform">
                        Continue with Core
                      </button>
                   </div>
                </div>

                {/* Column 2: Plus (Highlighted) */}
                <div className="p-4 sm:p-6 relative flex items-center justify-center">
                   {/* Massive soft background glow */}
                   <div className="absolute inset-4 sm:inset-6 bg-[#FF5A5F] blur-[40px] opacity-[0.06] pointer-events-none rounded-[32px]"></div>
                   
                   <div className="w-full bg-[#FFFDFD] rounded-[28px] border-[3px] border-[#FFE9EB] shadow-[0_8px_40px_rgba(255,90,95,0.06)] pt-[38px] pb-8 px-8 flex flex-col h-[104%] min-h-[480px] relative z-10 transform sm:-translate-y-[2%] hover:-translate-y-[4%] transition-all duration-300">
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[22px] font-medium text-[#3A2121] tracking-tight">Plus</h3>
                        <span className="bg-[#FFE5E7] text-[#FF5A5F] text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">Most Wanted</span>
                      </div>
                      
                      <div className="flex items-end gap-1.5 mb-1.5">
                        <span className="text-[52px] font-bold text-[#3A2121] leading-[0.9] tracking-tighter">$129</span>
                        <span className="text-[14px] text-gray-500 mb-1.5 font-medium">/month</span>
                      </div>
                      <p className="text-[12.5px] text-[#A29795] font-medium pb-8 border-b border-transparent">Per user/month, billed annually</p>
                      
                      <div className="mt-8 mb-6 text-[13.5px] font-bold text-[#3A2121]">For scaling business</div>
                      
                      <div className="flex-1 flex flex-col space-y-4.5 mb-10">
                        {['Fully adjustable permissions', 'Advanced data enrichment', 'Priority Support'].map((feature, i) => (
                           <div key={i} className="flex items-center gap-3.5">
                              <div className="w-[18px] h-[18px] rounded-full bg-[#FFF0F2] flex items-center justify-center shrink-0">
                                 <Check className="w-2.5 h-2.5 text-[#FF5A5F] stroke-[3px]" />
                              </div>
                              <span className="text-[13.5px] font-medium text-[#6B7280]">{feature}</span>
                           </div>
                        ))}
                      </div>

                      <button className="mt-auto w-full bg-gradient-to-b from-[#ff6d72] to-[#FE4E54] text-white py-4 rounded-[14px] text-[14px] font-bold shadow-[0_8px_24px_rgba(255,90,95,0.35)] ring-1 ring-white/20 hover:scale-[1.02] transition-transform">
                        Get Started
                      </button>
                   </div>
                </div>

                {/* Column 3: Enterprise */}
                <div className="p-6 sm:p-8 flex items-center justify-center relative">
                   <div className="w-full bg-white rounded-[24px] border border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] pt-10 pb-8 px-8 flex flex-col min-h-[460px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition-all">
                      <h3 className="text-[22px] font-medium text-[#3A2121] mb-5 tracking-tight">Enterprise</h3>
                      
                      <div className="flex items-end gap-1.5 mb-1.5">
                        <span className="text-[52px] font-bold text-[#3A2121] leading-[0.9] tracking-tighter">$249</span>
                        <span className="text-[14px] text-gray-500 mb-1.5 font-medium">/month</span>
                      </div>
                      <p className="text-[12.5px] text-[#A29795] font-medium pb-8 border-b border-transparent">Per user/month, billed annually</p>
                      
                      <div className="mt-8 mb-6 text-[13.5px] font-bold text-[#3A2121]">For Large Organizations</div>
                      
                      <div className="flex-1 flex flex-col space-y-4.5 mb-10">
                        {['Private Lists', 'No Seat Limits', 'Advanced Chatbots'].map((feature, i) => (
                           <div key={i} className="flex items-center gap-3.5">
                              <div className="w-[18px] h-[18px] rounded-full bg-[#FFF0F2] flex items-center justify-center shrink-0">
                                 <Check className="w-2.5 h-2.5 text-[#FF5A5F] stroke-[3px]" />
                              </div>
                              <span className="text-[13.5px] font-medium text-[#6B7280]">{feature}</span>
                           </div>
                        ))}
                      </div>

                      <button className="mt-auto w-full bg-gradient-to-b from-[#4A4A4A] to-[#2B2B2B] text-white py-4 rounded-[14px] text-[14px] font-bold shadow-[0_8px_16px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform">
                        Talk to Sales
                      </button>
                   </div>
                </div>

            </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full max-w-[1300px] mx-auto px-4 sm:px-6 mb-16 pt-12 z-20">
        <div className="relative w-full rounded-[48px] bg-gradient-to-b from-[#FFF2F4] to-[#FCE6E9] border-[6px] border-white shadow-[0_16px_48px_-12px_rgba(255,90,95,0.06)] overflow-hidden py-24 sm:py-[130px] flex flex-col items-center text-center group">
          
          {/* Decorative Corner Spheres with Neumorphic edge */}
          <div className="absolute -bottom-[160px] -left-[100px] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-[#FAE3E6] to-[#FAD4D9] shadow-[inset_16px_16px_32px_rgba(255,255,255,0.7),inset_-16px_-16px_32px_rgba(240,180,190,0.5),0_-8px_32px_rgba(220,100,110,0.1)] border border-white/60 pointer-events-none transition-transform duration-1000 group-hover:scale-105"></div>
          <div className="absolute -bottom-[160px] -right-[100px] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-[#FAE3E6] to-[#FAD4D9] shadow-[inset_16px_16px_32px_rgba(255,255,255,0.7),inset_-16px_-16px_32px_rgba(240,180,190,0.5),0_-8px_32px_rgba(220,100,110,0.1)] border border-white/60 pointer-events-none transition-transform duration-1000 group-hover:scale-105"></div>

          {/* Floating 3D Elements */}
          {/* Left Chat */}
          <div className="hidden md:flex absolute left-[15%] top-[25%] rotate-[-12deg] w-[88px] h-[88px] bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-[26px] items-center justify-center border-[2px] border-white/80 shadow-[0_24px_40px_-8px_rgba(255,90,95,0.4),inset_0_8px_16px_rgba(255,255,255,0.5)] transition-transform duration-700 hover:-translate-y-3 hover:rotate-[-6deg] z-10 hover:shadow-[0_32px_48px_-12px_rgba(255,90,95,0.5),inset_0_8px_16px_rgba(255,255,255,0.5)] cursor-pointer">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
               <path d="M26 12H10C7.79086 12 6 13.7909 6 16V26C6 28.2091 7.79086 30 10 30H14V34L20 30H26C28.2091 30 30 28.2091 30 26V16C30 13.7909 28.2091 12 26 12Z" fill="white"/>
               <path d="M30 8H16C16 8 16 11 16 12H26C29.3137 12 32 14.6863 32 18V24C33.1046 24 34 23.1046 34 22V12C34 9.79086 32.2091 8 30 8Z" fill="rgba(255,255,255,0.5)"/>
            </svg>
          </div>
          {/* Right Rocket */}
          <div className="hidden md:flex absolute right-[15%] top-[20%] rotate-[18deg] w-[88px] h-[88px] bg-gradient-to-br from-[#FFA5A8] to-[#FF5A5F] rounded-[26px] items-center justify-center border-[2px] border-white/80 shadow-[0_24px_40px_-8px_rgba(255,90,95,0.4),inset_0_8px_16px_rgba(255,255,255,0.5)] transition-transform duration-700 hover:-translate-y-3 hover:rotate-[12deg] z-10 hover:shadow-[0_32px_48px_-12px_rgba(255,90,95,0.5),inset_0_8px_16px_rgba(255,255,255,0.5)] cursor-pointer">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="white" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                <path d="M12 2.5a20.015 20.015 0 0 1 7.42 2.215L22 4.5l-1.025 2.1c-.845 1.517-2.613 3.8-5.32 5.097L17 19l-4.5-2.5L9.5 20 8 16.5l-5.5-3 1.5-2.5L7.48 9.5c.783-1.619 2.05-3.393 3.32-4.52a26.837 26.837 0 0 1 1.2-1.01V2.5zm1.5 5.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5z"/>
             </svg>
          </div>

          <div className="relative z-20 max-w-2xl px-4">
            <h2 className="text-[44px] md:text-[52px] font-bold text-[#3A2121] leading-[1.05] tracking-tight mb-6">
              Ready to Meet Your<br/>New AI Employee?
            </h2>
            <p className="text-[16px] md:text-[17px] text-[#6B7280] leading-[1.6] max-w-[420px] mx-auto font-medium mb-10">
              Start today with a free trial period and experience<br className="hidden sm:block" />the difference of a real AI agent.
            </p>
            <button className="bg-gradient-to-b from-[#ff6d72] to-[#FE4E54] text-white px-8 py-4 rounded-[14px] text-[15px] font-bold shadow-[0_12px_28px_rgba(255,90,95,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_rgba(255,90,95,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)] ring-1 ring-white/20 transition-all">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#FFFFFF] pt-24 pb-16 relative z-10 border-t border-gray-100">
         <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-16 md:gap-8">
           
           {/* Left Brand */}
           <div className="flex flex-col max-w-[280px]">
              <div className="flex items-center gap-2 mb-6">
                {/* Embedded the Nousu 'N' geometric logo SVG matched from hero */}
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="shrink-0 -translate-y-[1px]">
                  <path d="M8 8C8 5.79086 9.79086 4 12 4H14V28H12C9.79086 28 8 26.2091 8 24V8Z" fill="#ff9094"/>
                  <path d="M24 24C24 26.2091 22.2091 28 20 28H18V4H20C22.2091 4 24 5.79086 24 8V24Z" fill="#FF5A5F"/>
                  <path d="M12 4H14L20 28H18L12 4Z" fill="#FFA5A8" className="mix-blend-multiply opacity-80"/>
                </svg>
                <span className="text-[28px] font-bold text-[#111111] tracking-tight ml-1">Nousu</span>
              </div>
              <p className="text-[14.5px] text-[#6B7280] font-medium leading-[1.6]">
                The AI agent that truly works as a<br/>team member
              </p>
           </div>
           
           {/* Right Links Grid */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 lg:gap-[120px]">
              
              {/* Product */}
              <div className="flex flex-col">
                 <h4 className="text-[15px] font-bold text-[#111111] mb-6">Product</h4>
                 <ul className="flex flex-col space-y-4">
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Features</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Integrations</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">API</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Security</a></li>
                 </ul>
              </div>

              {/* Company */}
              <div className="flex flex-col">
                 <h4 className="text-[15px] font-bold text-[#111111] mb-6">Company</h4>
                 <ul className="flex flex-col space-y-4">
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">About Us</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Careers</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Blog</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Contact Us</a></li>
                 </ul>
              </div>

              {/* Support */}
              <div className="flex flex-col">
                 <h4 className="text-[15px] font-bold text-[#111111] mb-6">Support</h4>
                 <ul className="flex flex-col space-y-4">
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Status</a></li>
                    <li><a href="#" className="text-[14px] text-[#6B7280] hover:text-[#FF5A5F] font-medium transition-colors">Privacy</a></li>
                 </ul>
              </div>

           </div>
         </div>
      </footer>

    </main>
  );
}
