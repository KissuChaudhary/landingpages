import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl mb-4 shadow-sm border border-white/60 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-lg text-slate-900">{question}</span>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-600 leading-relaxed font-medium">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 relative inline-block">
            FAQ
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-400/30 -rotate-2 rounded-full"></div>
          </h2>
          <p className="mt-4 text-slate-700 font-medium">Got questions? We've got answers.</p>
        </div>

        <div>
          <FAQItem 
            question="Is the content detected as AI?"
            answer="We use a proprietary humanization layer that varies sentence structure and vocabulary. While no tool is 100% undetectable, our users consistently bypass standard AI detectors."
          />
          <FAQItem 
            question="Does it write factual content?"
            answer="Yes. SkyWrite performs real-time web searches to gather facts, statistics, and sources before writing a single word."
          />
          <FAQItem 
            question="Can I export to WordPress?"
            answer="Absolutely. Our Pro and Agency plans verify a 1-click integration with WordPress, Webflow, and Shopify."
          />
           <FAQItem 
            question="How is this different from ChatGPT?"
            answer="ChatGPT is a generalist. SkyWrite is a specialist built specifically for long-form SEO content, with built-in competitor analysis and keyword optimization tools that ChatGPT lacks out of the box."
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;