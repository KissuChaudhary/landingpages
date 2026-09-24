'use client';

import Image from 'next/image';
import {Store} from 'lucide-react'
import { ReactNode } from 'react';
import HowItWorks from './components/HowItWorks';
import AestheticLens from './components/AestheticLens';
import Showcase from './components/Showcase';
import TargetAudience from './components/TargetAudience';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';



// --- Custom SVGs ---

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" />
    <path d="M12 7.5V10.5M12 13.5V16.5M7.5 12H10.5M13.5 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
    <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- App Icon Replicas ---

const DropboxIcon = () => (
  <div className="w-12 h-12 bg-[#0061FF] rounded-[10px] shadow-lg flex items-center justify-center transform -rotate-6">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 7.2L12 12.4L20 7.2L12 2Z" fill="white"/>
      <path d="M4 17.6L12 12.4L4 7.2L4 17.6Z" fill="white" fillOpacity="0.8"/>
      <path d="M20 17.6L12 12.4L20 7.2L20 17.6Z" fill="white" fillOpacity="0.8"/>
      <path d="M12 22L4 16.8L12 12.4L20 16.8L12 22Z" fill="white" fillOpacity="0.6"/>
    </svg>
  </div>
);

const NotesIcon = () => (
  <div className="w-12 h-12 bg-white rounded-[10px] shadow-lg overflow-hidden flex flex-col transform rotate-3 border border-gray-100">
    <div className="h-3 bg-[#FFD500] w-full border-b border-gray-200"></div>
    <div className="flex-1 flex flex-col justify-evenly px-2 py-1">
      <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
      <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
      <div className="h-0.5 w-3/4 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const GmailIcon = () => (
  <div className="w-12 h-12 bg-white rounded-[10px] shadow-lg flex items-center justify-center transform -rotate-3 border border-gray-100">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="white"/>
      <path d="M2 6L12 13L22 6" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 18V6" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 18V6" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 18H22" stroke="#FBBC04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const SafariIcon = () => (
  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transform rotate-6 border border-gray-100 p-0.5">
    <div className="w-full h-full bg-[#007AFF] rounded-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 border-2 border-white/20 rounded-full m-1"></div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
        <path d="M12 2L15 15L2 12L12 2Z" fill="white"/>
        <path d="M12 22L9 9L22 12L12 22Z" fill="#FF3B30"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
      </svg>
    </div>
  </div>
);

const SlackIcon = () => (
  <div className="w-12 h-12 bg-white rounded-[10px] shadow-lg flex items-center justify-center transform -rotate-12 border border-gray-100">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4C9 2.89543 8.10457 2 7 2C5.89543 2 5 2.89543 5 4V7H8C8.55228 7 9 6.55228 9 6V4Z" fill="#E01E5A"/>
      <path d="M10 7C10 8.10457 10.8954 9 12 9H15C15.5523 9 16 8.55228 16 8V5C16 3.89543 15.1046 3 14 3C12.8954 3 12 3.89543 12 5V7H10Z" fill="#36C5F0"/>
      <path d="M15 20C15 21.1046 15.8954 22 17 22C18.1046 22 19 21.1046 19 20V17H16C15.4477 17 15 17.4477 15 18V20Z" fill="#2EB67D"/>
      <path d="M14 17C14 15.8954 13.1046 15 12 15H9C8.44772 15 8 15.4477 8 16V19C8 20.1046 8.89543 21 10 21C11.1046 21 12 20.1046 12 19V17H14Z" fill="#ECB22E"/>
      <path d="M9 10C7.89543 10 7 10.8954 7 12C7 13.1046 7.89543 14 9 14H12C12.5523 14 13 13.5523 13 13V10C13 8.89543 12.1046 8 11 8C9.89543 8 9 8.89543 9 10Z" fill="#E01E5A"/>
      <path d="M15 14C16.1046 14 17 13.1046 17 12C17 10.8954 16.1046 10 15 10H12C11.4477 10 11 10.4477 11 11V14C11 15.1046 11.8954 16 13 16C14.1046 16 15 15.1046 15 14Z" fill="#2EB67D"/>
    </svg>
  </div>
);

const DiscordIcon = () => (
  <div className="w-12 h-12 bg-[#5865F2] rounded-[10px] shadow-lg flex items-center justify-center transform rotate-6">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.82 4.33 14.61 4.75 14.46 5.11C12.85 4.87 11.25 4.87 9.66 5.11C9.5 4.75 9.29 4.33 9.11 4C7.61 4.26 6.17 4.71 4.84 5.33C2.17 9.33 1.44 13.22 1.81 17.06C3.59 18.38 5.31 19.18 7 19.71C7.42 19.14 7.8 18.53 8.13 17.89C7.52 17.66 6.94 17.38 6.39 17.06C6.54 16.95 6.68 16.83 6.82 16.71C10.15 18.25 13.97 18.25 17.27 16.71C17.41 16.83 17.55 16.95 17.7 17.06C17.15 17.38 16.57 17.66 15.96 17.89C16.29 18.53 16.67 19.14 17.09 19.71C18.78 19.18 20.5 18.38 22.28 17.06C22.71 12.63 21.57 8.75 19.27 5.33ZM8.5 14.11C7.52 14.11 6.72 13.22 6.72 12.14C6.72 11.06 7.5 10.17 8.5 10.17C9.5 10.17 10.3 11.06 10.28 12.14C10.28 13.22 9.5 14.11 8.5 14.11ZM15.5 14.11C14.52 14.11 13.72 13.22 13.72 12.14C13.72 11.06 14.5 10.17 15.5 10.17C16.5 10.17 17.3 11.06 17.28 12.14C17.28 13.22 16.5 14.11 15.5 14.11Z" fill="white"/>
    </svg>
  </div>
);

const AsanaIcon = () => (
  <div className="w-12 h-12 bg-white rounded-[10px] shadow-lg flex items-center justify-center transform -rotate-6 border border-gray-100">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="3" fill="#F06A6A"/>
      <circle cx="7" cy="15" r="3" fill="#F06A6A"/>
      <circle cx="17" cy="15" r="3" fill="#F06A6A"/>
    </svg>
  </div>
);


const SectionContainer = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className="self-stretch border-t border-[rgba(55,50,47,0.12)] border-b border-[rgba(55,50,47,0.12)] flex justify-center items-stretch relative z-10 -mt-[1px]">
    <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden shrink-0">
      {/* Left decorative pattern */}
      <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
          ></div>
        ))}
      </div>
    </div>

    <div className={`flex-1 flex flex-col items-center py-24 px-4 sm:px-8 md:px-12 border-l border-r border-[rgba(55,50,47,0.12)] ${className}`}>
      {children}
    </div>

    <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden shrink-0">
      {/* Right decorative pattern */}
      <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      
      {/* Main Grid Container */}
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1000px] lg:w-[1000px] relative flex flex-col justify-start items-center">
        {/* Left vertical line */}
        <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

        {/* Right vertical line */}
        <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

        {/* Navbar */}
        <nav className="absolute top-8 z-50 flex items-center gap-6 bg-[#EFEFEF]/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5">
          <div className="flex items-center justify-center w-8 h-8">
            <LogoIcon />
          </div>
          <div className="flex items-center gap-5 pr-2 text-[13px] font-medium text-[#4A4A4A]">
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <a href="#" className="hover:text-black transition-colors">News</a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col items-center w-full relative z-10 mt-40">
          
          <div className="w-full border-b border-[rgba(55,50,47,0.12)] pb-12 relative flex flex-col items-center">
            <div className="text-center flex flex-col items-center z-10 px-6">
              <h1 className="font-serif text-4xl sm:text-7xl leading-[1.1] tracking-[-0.03em] text-[#111]">
               Pinterest Automation for E-Commerce Brands.
              </h1>
              <p className="text-sm sm:text-md text-[#444] mt-3 font-normal tracking-tight max-w-2xl">
It is a visual asset generator and scheduling tool for Shopify and Etsy merchants. It helps e-commerce owners organize their product catalogs, format lifestyle imagery, and schedule organic Pinterest Pins via a content calendar to maintain consistent, high-quality brand presence.              </p>
            </div>

            <div className="absolute bottom-0 translate-y-1/2 flex justify-center w-full z-20">
              <button className="bg-[#111] hover:bg-black text-white px-4 py-3 rounded-full flex items-center gap-2 text-[15px] font-medium shadow-md">
                <Store />
                Connect Your Store
              </button>
            </div>
          </div>

          {/* Hero Image Composition */}
          <AestheticLens />

        </main>

        <SectionContainer>
          {/* Case Study Section */}
          <section className="w-full max-w-[640px] mx-auto flex flex-col items-center">
        
        <div className="w-10 h-10 bg-[#EFEFEF] rounded-xl flex items-center justify-center mb-16">
          <LogoIcon />
        </div>

        <div className="w-full space-y-8 text-[17px] leading-[1.6] text-[#111] tracking-[-0.01em]">
          
          <p>
Everyone tells you Pinterest is a goldmine for e-commerce traffic, but actually growing an account feels like a second full-time job. You are told you need to post beautifully staged photos every single day, but as a busy store owner, you are exhausted just trying to keep up.
          </p>

          <div className="relative pl-12">
            <div className="absolute left-0 top-1">
              <div className="w-6 h-6 bg-white rounded-md shadow-sm overflow-hidden flex flex-col border border-gray-100">
                <div className="h-1.5 bg-[#FFD500] w-full border-b border-gray-200"></div>
                <div className="flex-1 flex flex-col justify-evenly px-1 py-0.5">
                  <div className="h-[1px] w-full bg-gray-200 rounded-full"></div>
                  <div className="h-[1px] w-full bg-gray-200 rounded-full"></div>
                  <div className="h-[1px] w-3/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
            <p>
You are trapped by a double-edged sword: You don&apos;t have thousands of dollars to hire a lifestyle photographer, and you don&apos;t have hours to manually schedule posts every week. So, you occasionally pin your plain, white-background catalog photos when you have a spare minute—and shoppers scroll right past them.
            </p>
          </div>

          <div className="relative pl-12">
            <div className="absolute left-0 top-1">
              <div className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100 p-px">
                <div className="w-full h-full bg-[#007AFF] rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-full m-[1px]"></div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                    <path d="M12 2L15 15L2 12L12 2Z" fill="white"/>
                    <path d="M12 22L9 9L22 12L12 22Z" fill="#FF3B30"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <p>
EcomPin is a complete autonomous engine that replaces both the photographer and the social media manager. First, it takes your plain product photos and instantly surrounds them with stunning, photorealistic lifestyle environments.
            </p>
          </div>

          <p>
Your basic chair is suddenly resting in a beautifully decorated living room, complete with perfect lighting and shadows. But EcomPin doesn&apos;t just hand you an image and leave you to do the work. It writes the SEO metadata and automatically builds your entire content calendar.
          </p>

          <p>
You never have to scramble for content or manually schedule a pin again. Every Monday, you simply open your inbox, approve a fresh batch of gorgeous lifestyle pins in 60 seconds, and let our engine safely pace them out to your boards all week.
          </p>

          <p className="text-[#888]">
Your feed transforms into a high-end lifestyle magazine, and the traffic finally starts compounding.
          </p>

          <p className="text-[#888]">
You didn&apos;t just find a better scheduling tool. You hired a world-class marketing team that runs on autopilot.
          </p>

        </div>

        <div className="w-full flex justify-start mt-12">
          <button className="bg-[#F5F5F5] hover:bg-[#EAEAEA] text-[#888] hover:text-[#666] px-4 py-2 rounded-full flex items-center gap-2 text-[13px] font-medium transition-colors">
            <SparkleIcon />
✦ See how it works
          </button>
        </div>

      </section>
        </SectionContainer>

        <SectionContainer className="!max-w-[1000px] !px-0">
          <HowItWorks />
        </SectionContainer>

        <SectionContainer className="!max-w-[1000px] !px-0">
          {/* Why Choose EcomPin Section */}
          <section className="w-full flex flex-col items-center">
        
            <div className="text-center mb-16 px-6">
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-[#111] mb-4">
                Why Choose EcomPin
              </h2>
              <p className="text-[1.1rem] text-[#555] font-normal tracking-tight">
                The difference between hoping for traffic and actually getting it.
              </p>
            </div>

            <div className="w-full border-t border-b border-[rgba(55,50,47,0.12)] grid grid-cols-1 md:grid-cols-2">
              
              {/* Without EcomPin */}
              <div className="flex flex-col p-8 md:p-12 bg-[#FAFAFA] md:border-r border-[rgba(55,50,47,0.12)]">
                <h3 className="font-mono text-xs tracking-widest text-[#888] uppercase mb-8 pb-4 border-b border-[rgba(55,50,47,0.12)]">
                  Without EcomPin
                </h3>
                
                <ul className="flex flex-col gap-5">
                  {[
                    'Frustrated store owner',
                    'Flat organic traffic',
                    'Manual design in Canva',
                    'Scattered product photos',
                    'Inconsistent posting schedule',
                    'No lifestyle imagery',
                    'Site looks like a basic catalog',
                    'Marketing takes hours'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.95rem] text-[#666] leading-[1.5]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* With EcomPin */}
              <div className="flex flex-col p-8 md:p-12 bg-white">
                <h3 className="font-mono text-xs tracking-widest text-[#111] uppercase mb-8 pb-4 border-b border-[rgba(55,50,47,0.12)]">
                  With EcomPin
                </h3>
                
                <ul className="flex flex-col gap-5">
                  {[
                    'Automated organic engine',
                    'Compounding Pinterest traffic',
                    'Zero graphic design required',
                    'Instant lifestyle scenes',
                    'Autonomous content calendar',
                    'SEO-optimized metadata',
                    'High-end brand presence',
                    'Marketing done in 60 seconds'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.95rem] text-[#111] leading-[1.5]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                        <path d="M20 6L9 17l-5-5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>
        </SectionContainer>

        <SectionContainer className="!max-w-[1000px] !px-0">
          <Showcase />
        </SectionContainer>

        <SectionContainer className="!max-w-[1400px] !px-0 !py-0">
          <TargetAudience />
        </SectionContainer>

        <SectionContainer className="!max-w-[1400px] !px-0 !py-0">
          <Pricing />
        </SectionContainer>

        <SectionContainer className="!max-w-full !px-0 !py-0">
           <CTA />
        </SectionContainer>

        <Footer />

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-10px) rotate(calc(var(--tw-rotate) + 2deg)); }
        }
        .mask-image-bottom {
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
      `}</style>
    </div>
  );
}
