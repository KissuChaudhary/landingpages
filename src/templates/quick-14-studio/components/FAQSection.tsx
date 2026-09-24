import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const FAQS = [
    {
      question: "WILL GOOGLE PENALIZE THIS CONTENT?",
      answer: "No. Google rewards helpful, authoritative content regardless of how it's produced. Unlike generic AI that hallucinates, our engine performs deep research, cites real sources, and focuses on 'Information Gain'—the exact signals Google's algorithms prioritize."
    },
    {
      question: "HOW IS THIS DIFFERENT FROM OTHER AI BLOG WRITERS?",
      answer: "Other AI writers are just tools. FlipAEO is a system that grows your SEO muscle over time. Every article we create links back to your previous articles, cites authoritative sources, and strengthens your entire site's authority. The more you publish, the more powerful each new article becomes. It's not just writing—it's a system that grows your SEO muscle over time."
    },
    {
      question: "WHY DOES THE CONTENT FEEL SO HUMAN?",
      answer: "We built an 'Anti-AI Filter' into every article. It blocks robotic words like 'unleash', 'seamless', and 'cutting-edge'. It forces sentence variety—short punches mixed with longer thoughts. Every paragraph starts with a direct answer, not fluff. And we pull real data from live research, so there's no hallucination. The result? Content that reads like a senior marketer wrote it, not a chatbot."
    },
    {
      question: "DO I NEED TO EDIT THE ARTICLES?",
      answer: "Our users typically spend 2-5 minutes polishing. Because we handle the research, formatting, and internal linking automatically, you're acting more like an Editor-in-Chief than a writer. The heavy lifting is 100% done for you."
    },
    {
      question: "DOES IT INTEGRATE WITH MY SITE?",
      answer: "Yes. We have direct 1-click publishing integrations for WordPress, Shopify and Webflow. Images, formatting, and meta tags are all synced automatically."
    },
    {
      question: "CAN I CANCEL IF IT'S NOT FOR ME?",
      answer: "Absolutely. We offer a 14-day money-back guarantee. If you don't see the quality in your initial articles, we'll refund you. No questions asked."
    },
    {
      question: "IS THE CONTENT PLAGIARISM-FREE?",
      answer: "Yes. Every article is generated from scratch based on real-time research. We also run a built-in uniqueness check to ensure your content is original and safe to publish."
    },
    {
      question: "WHAT LANGUAGES DO YOU SUPPORT?",
      answer: "Currently, we specialize in high-quality English (US/UK) content to ensure maximum nuance and authority. Multi-language support is on our roadmap for Q4."
    },
];

const FAQItem: React.FC<{ item: typeof FAQS[0] }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Outer Container (The "Halo" or "Frame")
        <div 
            className={`
                group w-full rounded-[24px] p-2 transition-all duration-300 cursor-pointer
                ${isOpen 
                    ? 'bg-orange-100 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)]' 
                    : 'bg-white border border-stone-200 hover:border-orange-200 hover:shadow-sm'
                }
            `}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Inner Container (The "Canvas") */}
            <div className={`
                w-full bg-white rounded-[18px] border transition-all duration-300 overflow-hidden relative
                ${isOpen ? 'border-orange-100/50' : 'border-stone-100'}
            `}>
                
                {/* Clickable Header Area - Adjusted padding for better vertical balance */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h3 className={`font-sans font-medium text-base md:text-lg pr-8 leading-snug transition-colors duration-300 ${isOpen ? 'text-stone-900' : 'text-stone-600 group-hover:text-stone-900'}`}>
                        {item.question}
                    </h3>
                    
                    {/* Interactive Icon */}
                    <div className={`
                        flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300
                        ${isOpen 
                            ? 'bg-orange-50 border-orange-200 text-orange-600 rotate-90' 
                            : 'bg-stone-50 border-stone-200 text-stone-400 rotate-0 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-500'}
                    `}>
                        {isOpen ? <X size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                    </div>
                </div>

                {/* Expandable Content Area */}
                <div 
                    className={`
                        grid transition-all duration-500 ease-in-out
                        ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                    `}
                >
                    <div className="overflow-hidden px-6 pb-6">
                      
                            <p className="text-stone-500 leading-relaxed text-base font-medium">
                                {item.answer}
                            </p>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-20 md:py-32">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4 tracking-tight">
                <span className="italic">Questions?</span> Answers
            </h2>
            <p className="font-sans text-stone-500 text-lg leading-relaxed max-w-lg">
                Everything you need to know about the product and billing.
            </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
            {FAQS.map((faq, index) => (
                <FAQItem key={index} item={faq} />
            ))}
        </div>

    </section>
  );
};

export default FAQSection;