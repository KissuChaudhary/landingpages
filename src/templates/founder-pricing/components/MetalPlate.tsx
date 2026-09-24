import React from 'react';

interface MetalPlateProps {
  type: 'silver' | 'gold';
  line1: string;
  line2?: string;
  rotation: number;
  className?: string;
}

const MetalPlate: React.FC<MetalPlateProps> = ({ type, line1, line2, rotation, className = '' }) => {
  const isGold = type === 'gold';
  
  // High-fidelity gradients mimicking brushed metal/plastic
  const bgClass = isGold 
    ? "bg-gradient-to-br from-[#ffe082] via-[#ffd54f] to-[#ffb300]" 
    : "bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1]";
    
  // Subtle border for depth
  const borderClass = isGold
    ? "border-[#d4a017]/40"
    : "border-[#94a3b8]/40";

  // Text colors
  const textClass = isGold ? "text-[#78350f]" : "text-[#334155]";
  
  // Screws: usually stainless steel look for both, or matching material
  const screwBg = "bg-[#f1f5f9]";
  const screwBorder = "border-[#94a3b8]";

  return (
    <div 
      className={`
        absolute z-10 select-none shadow-plate rounded-[4px] border-[1px] 
        ${bgClass} ${borderClass} ${className} 
        flex flex-col items-center justify-center py-3 px-8 min-w-[180px]
      `}
      style={{ 
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Decorative Dots on the left side */}
      <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-30`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-[1.5px] h-[1.5px] rounded-full ${isGold ? 'bg-black' : 'bg-black'}`} />
        ))}
      </div>

      {/* Screws */}
      <Screw top left bg={screwBg} border={screwBorder} />
      <Screw top right bg={screwBg} border={screwBorder} />
      <Screw bottom left bg={screwBg} border={screwBorder} />
      <Screw bottom right bg={screwBg} border={screwBorder} />

      {/* Text Content */}
      <div className={`font-mono text-[11px] tracking-[0.25em] font-extrabold ${textClass} leading-tight text-center uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]`}>
        {line1}
      </div>
      {line2 && (
        <div className={`font-mono text-[9px] tracking-[0.15em] ${textClass} opacity-80 mt-1 text-center font-bold uppercase`}>
          {line2}
        </div>
      )}
    </div>
  );
};

const Screw = ({ top, bottom, left, right, bg, border }: any) => (
  <div className={`
    absolute w-2 h-2 rounded-full border-[1px] flex items-center justify-center shadow-sm
    ${top ? 'top-1.5' : ''} ${bottom ? 'bottom-1.5' : ''}
    ${left ? 'left-1.5' : ''} ${right ? 'right-1.5' : ''}
    ${bg} ${border}
  `}>
    <div className="w-full h-[0.5px] bg-slate-400 rotate-45 transform origin-center"></div>
  </div>
);

export default MetalPlate;