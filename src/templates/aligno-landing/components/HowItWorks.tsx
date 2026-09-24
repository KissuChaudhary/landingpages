import React from 'react';
import { Clock, Users, BarChart3, ArrowUpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureCardProps {
  icon: React.ElementType;
  titlePrefix?: string;
  titleItalic?: string;
  titleSuffix?: string;
  description: string;
  blobPosition?: "top-left" | "bottom-right";
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  titlePrefix, 
  titleItalic, 
  titleSuffix, 
  description,
  blobPosition = "top-left",
  delay = "0s"
}) => {
  return (
    <div 
      className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10 group hover:border-white/20 transition-all duration-500 min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
      style={{ animationDelay: delay }}
    >
      {/* Background Gradients */}
      {/* 1. Static Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      {/* 2. Shiny Blob Effect - Updated to Orange/Vibrant */}
      <div className={cn(
        "absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
        "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]", // Saturated orange gradient
        blobPosition === "top-left" && "-top-[120px] -left-[120px]",
        blobPosition === "bottom-right" && "-bottom-[120px] -right-[120px]"
      )} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm mx-auto">
        
        {/* Icon Container */}
        <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 ease-out relative">
          {/* Small inner glow for icon */}
          <div className="absolute inset-0 bg-[#FF8F70]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Icon className="w-6 h-6 text-white/90 relative z-10" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl text-white font-sans tracking-tight">
          {titlePrefix && <span>{titlePrefix} </span>}
          {titleItalic && <span className="font-serif italic text-[#FFDAC2]">{titleItalic} </span>}
          {titleSuffix && <span>{titleSuffix}</span>}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#030303] py-20 px-4 md:py-32 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
            How <span className="font-serif italic text-white">Elpino</span> helps you
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
            Elpino offers ready-made solutions to get you going fast. Easily customize as your team's needs expand.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Top Left */}
          <FeatureCard 
            icon={Clock}
            titleItalic="Effortless"
            titleSuffix="Task Management"
            description="Keep all your tasks organized and visible in one place. Elpino helps you assign, track, and prioritize tasks easily, ensuring nothing falls through the cracks."
            blobPosition="top-left"
          />

          {/* Card 2: Bottom Right */}
          <FeatureCard 
            icon={Users}
            titleItalic="Seamless"
            titleSuffix="Team Collaboration"
            description="Work together with your team in real time, no matter where they are. Elpino's collaborative tools make it easy to communicate, share files, and keep everyone in sync."
            blobPosition="bottom-right"
          />

          {/* Card 3: Top Left */}
          <FeatureCard 
            icon={BarChart3}
            titleItalic="Comprehensive"
            titleSuffix="Project Insights"
            description="Stay on top of your projects with advanced analytics and reporting. Elpino gives you the insights you need to make data-driven decisions and improve overall efficiency."
            blobPosition="top-left"
          />

          {/* Card 4: Bottom Right */}
          <FeatureCard 
            icon={ArrowUpCircle}
            titlePrefix="Smart"
            titleItalic="Deadline"
            titleSuffix="Tracking"
            description="Never miss a deadline again! Elpino automatically tracks due dates, sends timely reminders, and keeps your team on schedule with seamless progress updates."
            blobPosition="bottom-right"
          />

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;