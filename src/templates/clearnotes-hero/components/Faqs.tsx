'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "WHERE IS MY DATA STORED?",
    answer: "On the Free plan, everything is stored entirely locally on your device. On the Pro plan, your notes are securely end-to-end encrypted and synced across our cloud infrastructure."
  },
  {
    question: "CAN I EXPORT MY NOTES?",
    answer: "Yes. You can export all your notes as standard Markdown files at any time with a single click. We believe in your data ownership, which means absolutely no vendor lock-in."
  },
  {
    question: "DO YOU HAVE MOBILE APPS?",
    answer: "We currently offer a fully responsive web experience and desktop apps for Mac and Windows. Native iOS and Android apps are actively in development and on our roadmap for later this year."
  },
  {
    question: "IS THERE A FREE TRIAL FOR CLOUD PRO?",
    answer: "Absolutely. You can try Cloud Pro completely free for 14 days to see if the cross-platform sync fits your workflow. No credit card is required to start your trial."
  }
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="font-bebas text-[36px] md:text-[48px] font-black uppercase text-brand-text-dark tracking-[1.5px] leading-none">
          FREQUENTLY ASKED <span className="text-brand-blue">QUESTIONS.</span>
        </h2>
      </motion.div>

      <div className="max-w-[700px] mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-brand-pill-bg rounded-[20px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 md:py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="font-bebas text-[20px] md:text-[24px] text-[#555] tracking-wide pr-4 group-hover:text-brand-blue transition-colors pt-0.5">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-full bg-white border-[2px] border-[#E8E8E8] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(189,189,189,0.08)] group-hover:border-brand-blue/30 transition-colors"
                >
                  <Plus size={16} className={isOpen ? "text-brand-blue" : "text-[#777]"} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="font-inter text-[14px] text-[#777] font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
