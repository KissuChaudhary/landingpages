import { motion } from 'motion/react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference"
    >
      <div className="text-brand-orange font-bold text-2xl tracking-tighter flex items-start cursor-pointer">
        create<span className="text-[10px] leading-none mt-1 ml-0.5">®</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
        <a href="#" className="flex items-start hover:text-brand-orange transition-colors">
          WORK <span className="text-[9px] bg-white/20 rounded-full w-4 h-4 flex items-center justify-center ml-1 -mt-1">5</span>
        </a>
        <a href="#" className="hover:text-brand-orange transition-colors">STUDIO</a>
        <a href="#" className="flex items-start hover:text-brand-orange transition-colors">
          WHISPERS <span className="text-[9px] bg-white/20 rounded-full w-4 h-4 flex items-center justify-center ml-1 -mt-1">7</span>
        </a>
      </div>

      <div className="hidden md:block text-sm font-medium tracking-wide">
        <a href="#" className="hover:text-brand-orange transition-colors">CONTACT</a>
      </div>

      <button className="md:hidden text-white">
        <Menu size={28} />
      </button>
    </motion.nav>
  );
}
