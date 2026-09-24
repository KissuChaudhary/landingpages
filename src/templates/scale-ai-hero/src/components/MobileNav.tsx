import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = ['Works', 'Services', 'Insights', 'Pricing', 'Company'];

  return (
    <div className="md:hidden relative w-full h-[54px] z-50 pointer-events-auto">
      <motion.div 
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 54,
          backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)'
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.25 }}
        className="absolute top-0 left-0 right-0 w-full backdrop-blur-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden flex flex-col rounded-[27px]"
      >
        <div 
          className="flex items-center justify-between p-1.5 h-[54px] shrink-0 cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-[40px] h-[20px] border-[3px] border-gray-900 rounded-full ml-1.5 shrink-0" />
          <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center shrink-0">
            <div className="relative w-[22px] h-[14px] flex flex-col justify-between items-end">
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} 
                transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                className="w-full h-[2px] bg-gray-900 rounded-full origin-center" 
              />
              <motion.span 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? '100%' : '65%' }} 
                transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                className="h-[2px] bg-gray-900 rounded-full origin-center" 
              />
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col px-4 pb-4 pt-2"
            >
              <div className="flex flex-col space-y-1 mb-6">
                  {links.map((link, i) => (
                    <motion.a
                      initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: i * 0.02, duration: 0.2 }}
                      key={link}
                      href="#"
                      className="text-[32px] font-medium tracking-tight text-gray-900 py-3 border-b border-gray-100/50 last:border-0 hover:text-gray-500 transition-colors flex justify-between items-center group"
                    >
                      {link}
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.a>
                  ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="bg-gray-900 rounded-[20px] flex items-center justify-center p-3.5 cursor-pointer hover:bg-black transition-colors"
              >
                 <span className="text-white font-medium text-[16px]">Hire Team</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
