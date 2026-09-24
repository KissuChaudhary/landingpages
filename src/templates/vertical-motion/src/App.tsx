/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  tags: string[];
  img: string;
  align: "left" | "right";
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full flex flex-col md:flex-row items-center gap-8 md:gap-20 ${project.align === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Container */}
      <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-white/5 group">
        <motion.img 
          src={project.img} 
          alt={project.title}
          initial={{ scale: 1.2, filter: "grayscale(100%)" }}
          whileInView={{ scale: 1, filter: "grayscale(0%)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Overlay Info */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-2">
          <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#84FF00]">
            {project.tags[0]}
          </div>
          <div className="h-[1px] w-10 bg-[#84FF00]" />
        </div>
      </div>

      {/* Details */}
      <div className={`flex flex-col gap-6 md:w-2/5 px-4 md:px-0 ${project.align === 'right' ? 'md:items-end md:text-right' : ''}`}>
        <div className={`flex items-center gap-4 ${project.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
          <span className="text-[#84FF00] font-mono font-bold text-xl md:text-2xl">{project.id}</span>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-[#84FF00]/60"
          />
        </div>
        
        <h4 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase">
          {project.title.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h4>

        <div className={`flex flex-wrap gap-3 mt-2 ${project.align === 'right' ? 'md:justify-end' : ''}`}>
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white/60 hover:bg-[#84FF00] hover:text-black transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>

        <motion.a 
          href="#"
          whileHover={{ x: project.align === 'left' ? 10 : -10 }}
          className={`group flex items-center gap-4 mt-6 text-[#84FF00] font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs ${project.align === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
          Explore Case Study
          <div className="relative w-10 h-[1px] bg-[#84FF00] overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full bg-white/50"
            />
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax for Footer
  const footerBg = useTransform(scrollYProgress, [0.9, 0.95], ["#050505", "#84FF00"]);
  const footerTextColor = useTransform(scrollYProgress, [0.9, 0.95], ["#ffffff", "#000000"]);

  const projects: Project[] = [
    {
      id: "01",
      title: "NEON ARCHIVE",
      tags: ["DIGITAL LIGHT", "PHASE 01", "2026"],
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
      align: "left"
    },
    {
      id: "02",
      title: "KINETIC FORM",
      tags: ["STRUCTURAL MOTION", "PHASE 02", "2026"],
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      align: "right"
    },
    {
      id: "03",
      title: "GHOST SIGNAL",
      tags: ["AV SYNTHESIS", "PHASE 03", "2026"],
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop",
      align: "left"
    }
  ];

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: footerBg }}
      className="relative w-full min-h-screen text-white overflow-x-hidden font-sans selection:bg-[#84FF00] selection:text-black transition-colors duration-500 bg-[#050505]"
    >
      {/* Noise Overlay Global */}
      <div className="fixed inset-0 z-[300] pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#84FF00] origin-left z-[100]"
      />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-full md:w-[70vw] h-full z-0 origin-right"
        >
          <img 
            src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2000&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
        </motion.div>

        {/* Top Navigation */}
        <nav className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[100]">
          <div className="text-lg md:text-xl font-bold tracking-tighter uppercase">vertical</div>
          <div className="hidden md:flex gap-12 text-[9px] font-bold tracking-[0.4em] uppercase">
            {['Work', 'About', 'Thoughts', 'Contact'].map((item) => (
              <motion.a 
                key={item}
                href="#" 
                whileHover={{ y: -2, color: "#84FF00" }}
                className="transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="relative w-10 h-10 flex items-center justify-center group z-[210]"
          >
            <motion.div 
              animate={isMenuOpen ? { scale: 0.8, rotate: 45 } : { scale: 1, rotate: 0 }}
              className="w-2.5 h-2.5 bg-white rounded-full group-hover:bg-[#84FF00] transition-colors duration-300" 
            />
            <motion.div 
              initial={false}
              animate={isMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              className="absolute inset-0 border border-white/10 rounded-full"
            />
          </button>
        </nav>

        {/* Massive Text with whileInView Parallax */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            <motion.h1 
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[18%] left-[8%] text-[12vw] leading-[0.8] font-bold tracking-tighter text-[#84FF00] select-none hidden md:block"
            >
              VER
            </motion.h1>
            <motion.h1 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[40%] left-[38%] text-[12vw] leading-[0.8] font-bold tracking-tighter text-[#84FF00] select-none hidden md:block"
            >
              TI
            </motion.h1>
            <motion.h1 
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[18%] right-[8%] text-[12vw] leading-[0.8] font-bold tracking-tighter text-[#84FF00] select-none hidden md:block"
            >
              CAL
            </motion.h1>
            <div className="md:hidden flex flex-col items-center justify-center h-full gap-1">
              {['VER', 'TI', 'CAL'].map((text, i) => (
                <motion.h1 
                  key={text}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[16vw] font-bold tracking-tighter text-[#84FF00] leading-none"
                >
                  {text}
                </motion.h1>
              ))}
            </div>
          </div>
        </div>

        {/* Text Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-16 left-6 md:bottom-auto md:top-48 md:right-[12%] md:left-auto z-20 text-left md:text-right"
        >
          <h2 className="text-[7vw] md:text-3xl font-bold tracking-tighter leading-[0.9] text-[#84FF00]">I BREAK THINGS</h2>
          <h2 className="text-[7vw] md:text-3xl font-bold tracking-tighter leading-[0.9] text-white">TO SEE WHAT</h2>
          <h2 className="text-[7vw] md:text-3xl font-bold tracking-tighter leading-[0.9] text-white">THEY ARE MADE OF</h2>
        </motion.div>

        {/* Grid Lines */}
        <div className="absolute inset-x-[5%] top-0 bottom-0 z-0 flex justify-between pointer-events-none opacity-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="w-[1px] h-full bg-white/30" />
          ))}
        </div>
      </section>

      {/* SECTION 1.5: SERVICES / PHILOSOPHY */}
      <section className="relative w-full px-6 md:px-20 py-40 flex flex-col md:flex-row gap-20 items-start border-y border-white/5">
        <div className="md:w-1/3">
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#84FF00] mb-6">PHILOSOPHY</div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none uppercase">
            WE BUILD <br /> <span className="text-[#84FF00]">DIGITAL</span> <br /> EXPERIENCES
          </h3>
        </div>
        <div className="md:w-2/3 flex flex-col gap-12">
          <p className="text-lg md:text-2xl font-medium text-white/60 leading-relaxed max-w-2xl">
            Pushing the boundaries of digital interaction through precise motion and bold aesthetics. We don't just design; we engineer emotions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {['Creative Direction', 'Motion Design', 'Web Development', 'Brand Identity'].map((service, i) => (
              <motion.div 
                key={service}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 group cursor-default"
              >
                <span className="text-[#84FF00] font-mono text-sm">0{i+1}</span>
                <span className="text-xl font-bold tracking-tight group-hover:text-[#84FF00] transition-colors">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SELECTED WORKS */}
      <section className="relative w-full px-6 md:px-20 py-40 bg-[#050505] z-20 overflow-hidden">
        {/* Sticky Side Text */}
        <div className="absolute left-10 top-40 h-full hidden xl:block">
          <div className="sticky top-40 text-[10px] font-bold tracking-[0.5em] uppercase vertical-text opacity-20 origin-left -rotate-90">
            SELECTED PROJECTS / 2026
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-40 md:ml-[10%]"
        >
          <h3 className="text-[14vw] md:text-[9vw] font-bold tracking-tighter leading-none">SELECTED</h3>
          <h3 className="text-[14vw] md:text-[9vw] font-bold tracking-tighter leading-none text-[#84FF00] ml-[10%]">/ WORKS</h3>
        </motion.div>

        <div className="flex flex-col gap-60">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* SECTION 3: CONTACT */}
      <motion.section 
        style={{ color: footerTextColor }}
        className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 z-30"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div>
            <h2 className="text-[20vw] md:text-[15vw] font-bold tracking-tighter leading-[0.8] uppercase">LET'S</h2>
            <h2 className="text-[20vw] md:text-[15vw] font-bold tracking-tighter leading-[0.8] uppercase ml-[10%]">TALK</h2>
          </div>
          <div className="flex flex-col gap-8 md:text-right">
            <div className="text-xs font-bold tracking-widest uppercase opacity-60">GET IN TOUCH</div>
            <a href="mailto:hello@vertical.studio" className="text-3xl md:text-6xl font-bold tracking-tighter hover:opacity-60 transition-opacity">
              HELLO@VERTICAL.STUDIO
            </a>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-current/20 flex flex-col md:flex-row justify-between gap-10">
          <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">© 2026 VERTICAL STUDIO</div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-bold tracking-widest uppercase hover:text-[#84FF00]">BACK TO TOP</button>
        </div>
      </motion.section>

      {/* Mobile Menu Overlay */}
      {/* SECTION 4: FOOTER */}
      <footer className="relative w-full px-6 md:px-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-white/40">
        <div>© 2026 VERTICAL STUDIO. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-10">
          {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((social) => (
            <motion.a 
              key={social}
              href="#" 
              whileHover={{ color: "#84FF00" }}
              className="transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
        <div>DESIGNED BY VERTICAL</div>
      </footer>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#84FF00] text-black flex flex-col justify-center items-center p-10"
          >
            <div className="flex flex-col items-center gap-4">
              {['HOME', 'WORK', 'ABOUT', 'THOUGHTS', 'CONTACT'].map((item, i) => (
                <motion.a 
                  key={item} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  href="#" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl md:text-8xl font-bold tracking-tighter hover:italic transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex gap-10 text-[10px] font-bold tracking-widest"
            >
              <span>TWITTER</span>
              <span>INSTAGRAM</span>
              <span>LINKEDIN</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
