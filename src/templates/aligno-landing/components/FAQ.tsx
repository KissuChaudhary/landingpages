import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Aligno, and how does it help with project management?",
    answer: "Aligno is a powerful project management tool built to simplify and optimize the way teams handle their work. It provides a centralized platform for task management, team collaboration, and real-time project tracking. With Aligno, you can streamline workflows, keep all communication in one place, and ensure everyone is aligned with clear goals and priorities. Its intuitive design helps teams of all sizes organize tasks, deadlines, and deliverables in a way that reduces complexity and boosts productivity."
  },
  {
    question: "Can Aligno be customized for different teams and projects?",
    answer: "Yes, Aligno is highly customizable. You can tailor workflows, create custom fields, and adjust views (Kanban, List, Timeline) to match the specific needs of your team and projects, ensuring flexibility for any working style."
  },
  {
    question: "Does Aligno support real-time collaboration across multiple locations?",
    answer: "Absolutely. Aligno is designed for remote and distributed teams. Changes are synced instantly across all devices, ensuring everyone stays up-to-date regardless of their location, facilitating seamless global teamwork."
  },
  {
    question: "What features does Aligno offer for managing sprints?",
    answer: "Aligno includes comprehensive sprint management tools such as backlog grooming, sprint planning, burndown charts, and velocity tracking. These features help agile teams plan effectively and stay on target throughout their development cycles."
  },
  {
    question: "How does Aligno help with tracking project performance?",
    answer: "We offer advanced analytics dashboards that visualize key metrics like task completion rates, time tracking, and resource allocation. This real-time data enables stakeholders to make informed, data-driven decisions to improve efficiency."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-[#030303] py-20 px-4 md:py-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-[20%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header - Using the style from screenshot */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
                How <span className="font-serif italic text-[#FFDAC2] font-light">Aligno</span> helps you?
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                Aligno offers ready-made solutions to get you going fast. Easily customize as your team's needs expand.
            </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const blobPosition = index % 2 === 0 ? "top-left" : "bottom-right";

            return (
              <div 
                key={index}
                className={cn(
                    "group rounded-[1.5rem] border transition-all duration-500 overflow-hidden relative",
                    isOpen 
                        ? "bg-[#0A0A0A] border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
                        : "bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                )}
              >
                {/* Shiny Blob Effect */}
                <div className={cn(
                    "absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-all duration-700 ease-in-out mix-blend-screen",
                    "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[80px]",
                    "opacity-20 group-hover:opacity-40",
                    blobPosition === "top-left" && "-top-[100px] -left-[100px]",
                    blobPosition === "bottom-right" && "-bottom-[100px] -right-[100px]"
                )} />

                {/* Active State Glow Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-b from-[#FFDAC2]/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                    isOpen && "opacity-100"
                )} />

                {/* Question Header (Button) */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left relative z-10"
                >
                  <span className={cn(
                      "text-base md:text-lg font-medium transition-colors duration-300 pr-8",
                      isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                  )}>
                    {faq.question}
                  </span>
                  
                  {/* Icon Wrapper */}
                  <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0",
                      isOpen ? "bg-white/10 text-white rotate-90" : "bg-transparent text-white/60 group-hover:text-white"
                  )}>
                    {isOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Answer Content - Smooth Height Animation */}
                <div 
                    className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-10",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;