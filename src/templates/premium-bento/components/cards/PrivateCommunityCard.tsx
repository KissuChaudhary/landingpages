'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import CardWrapper from './CardWrapper';

export default function PrivateCommunityCard() {
  return (
    <CardWrapper title="Access to private community of entrepreneurs">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center "You" */}
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/20 z-20 border-4 border-white">
          <span className="text-white text-[11px] font-bold">You</span>
        </div>

        {/* Orbiting Rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {/* Inner Ring */}
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-red-100 opacity-60" />
          
          {/* Outer Ring */}
          <div className="absolute w-52 h-52 rounded-full border border-dashed border-gray-100">
            {/* Avatars on Outer Ring */}
            <AvatarOrbit angle={45} src="https://picsum.photos/seed/user1/100/100" radius={104} />
            <AvatarOrbit angle={135} src="https://picsum.photos/seed/user2/100/100" radius={104} />
            <AvatarOrbit angle={225} src="https://picsum.photos/seed/user3/100/100" radius={104} />
            <AvatarOrbit angle={315} src="https://picsum.photos/seed/user4/100/100" radius={104} />
          </div>
        </motion.div>
      </div>
    </CardWrapper>
  );
}

function AvatarOrbit({ angle, src, radius }: { angle: number, src: string, radius: number }) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div 
      className="absolute w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-50"
      style={{ 
        left: '50%', 
        top: '50%',
        marginLeft: '-18px',
        marginTop: '-18px',
        transform: `translate(${x}px, ${y}px)`
      }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        <Image src={src} alt="Member" fill className="object-cover" />
      </motion.div>
    </div>
  );
}
