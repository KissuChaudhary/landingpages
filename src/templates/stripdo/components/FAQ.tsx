import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What types of videos do you edit?",
    answer: "We specialize in YouTube content — from tech reviews and vlogs to shorts, tutorials, podcasts, and cinematic storytelling. If it's for YouTube, we've got it covered."
  },
  {
    question: "How fast is the delivery?",
    answer: "Our standard turnaround is 48-72 hours for most edits. For complex projects, we'll provide a custom timeline upfront."
  },
  {
    question: "Can I request revisions?",
    answer: "Absolutely! We offer unlimited revisions during the review window to ensure the video aligns perfectly with your vision."
  },
  {
    question: "Do I need to provide all the footage and assets?",
    answer: "Yes, you provide the raw footage. We can source stock music, sound effects, and B-roll if needed as part of the package."
  },
  {
    question: "What if I'm not happy with the result?",
    answer: "We have a satisfaction guarantee. We'll work with you until you love it, or offer a refund if we can't meet your standards."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full" id="faq">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Header Content */}
        <div className="flex flex-col items-start sticky top-24">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
                <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Got Questions? <br/> We Got Answers
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Straightforward, no-fluff answers to help you feel confident about working with us.
            </p>
        </div>

        {/* Right Side: Accordion */}
        <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div 
                        key={index}
                        onClick={() => toggleFAQ(index)}
                        className={`
                            rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 border
                            ${isOpen 
                                ? 'bg-[#0F172A] border-slate-900 text-white shadow-xl shadow-slate-900/10' 
                                : 'bg-white border-slate-100 text-slate-900 hover:border-slate-200'
                            }
                        `}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <h3 className={`text-lg font-bold ${isOpen ? 'text-white' : 'text-slate-800'}`}>
                                {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                        
                        <div 
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <p className={`text-base leading-relaxed ${isOpen ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

      </div>
    </section>
  );
}