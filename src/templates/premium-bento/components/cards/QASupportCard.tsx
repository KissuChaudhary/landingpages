'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import CardWrapper from './CardWrapper';

type Message = { id: number; type: 'q' | 'a'; text: string };

export default function QASupportCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let msgId = 0;
    let isMounted = true;
    
    const sequence = async () => {
      while (isMounted) {
        // Add Q
        setMessages(prev => [...prev.slice(-2), { id: msgId++, type: 'q', text: 'How do I structure my first module?' }]);
        await new Promise(r => setTimeout(r, 1500));
        if (!isMounted) break;
        
        // Show typing
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500));
        if (!isMounted) break;
        
        // Add A
        setIsTyping(false);
        setMessages(prev => [...prev.slice(-2), { id: msgId++, type: 'a', text: 'Start with a quick win. Keep it under 10 mins.' }]);
        await new Promise(r => setTimeout(r, 3500));
      }
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <CardWrapper title="Unlimited support and Q&A from the creator success team">
      <div className="w-full max-w-[260px] h-[220px] flex flex-col justify-end gap-4 relative overflow-hidden pb-4">
        {/* Top fade mask */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className={`flex items-end gap-3 ${msg.type === 'a' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm ${msg.type === 'a' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {msg.type === 'a' ? 'A' : 'Q'}
              </div>
              <div className={`px-4 py-3 rounded-[1.25rem] shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-2 ${msg.type === 'a' ? 'bg-white border-white text-red-900 rounded-br-none ring-4 ring-red-500/5' : 'bg-white border-white text-gray-800 rounded-bl-none'}`}>
                <div className="space-y-2 w-32">
                  <div className={`h-1.5 rounded-full w-full ${msg.type === 'a' ? 'bg-red-100' : 'bg-gray-100'}`} />
                  <div className={`h-1.5 rounded-full w-2/3 ${msg.type === 'a' ? 'bg-red-100' : 'bg-gray-100'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-end gap-3 flex-row-reverse"
          >
            <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0">
              A
            </div>
            <div className="px-4 py-3 rounded-[1.25rem] bg-white border border-red-50 rounded-br-none flex gap-1.5 shadow-sm">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-red-200 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-red-200 rounded-full" />
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-red-200 rounded-full" />
            </div>
          </motion.div>
        )}
      </div>
    </CardWrapper>
  );
}
