export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
      {/* Background Lines SVG */}
      <svg width="100%" height="100%" className="absolute top-0">
        <line x1="0" y1="70" x2="100%" y2="70" stroke="#000" strokeWidth="2" />
        <line x1="0" y1="71" x2="100%" y2="71" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        <line x1="0" y1="520" x2="100%" y2="520" stroke="#000" strokeWidth="2" />
        <line x1="0" y1="521" x2="100%" y2="521" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </svg>
      
      <svg width="1200" height="100%" viewBox="0 0 1200 1000" className="absolute top-0 hidden md:block">
        {/* Top Panel */}
        <path d="M 150 520 L 150 250 L 250 150 L 450 150 L 470 120 L 730 120 L 750 150 L 950 150 L 1050 250 L 1050 520" 
              stroke="#000" strokeWidth="2" fill="none" />
        <path d="M 151 520 L 151 250 L 251 151 L 451 151 L 471 121 L 729 121 L 749 151 L 949 151 L 1049 251 L 1049 520" 
              stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
              
        {/* Bottom Panel */}
        <path d="M 150 520 L 150 900 L 250 1000 L 450 1000 L 470 930 L 730 930 L 750 1000 L 950 1000 L 1050 900 L 1050 520" 
              stroke="#000" strokeWidth="2" fill="none" />
        <path d="M 151 520 L 151 900 L 251 999 L 451 999 L 471 931 L 729 931 L 749 999 L 949 999 L 1049 899 L 1049 520" 
              stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
              
        {/* Little chip details */}
        <g transform="translate(150, 280)">
           <rect x="-15" y="0" width="30" height="40" rx="4" fill="#1a1a1c" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="10" x2="-15" y2="10" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="20" x2="-15" y2="20" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="30" x2="-15" y2="30" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="10" x2="20" y2="10" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="20" x2="20" y2="20" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="30" x2="20" y2="30" stroke="#000" strokeWidth="2" />
        </g>
        <g transform="translate(1050, 280)">
           <rect x="-15" y="0" width="30" height="40" rx="4" fill="#1a1a1c" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="10" x2="-15" y2="10" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="20" x2="-15" y2="20" stroke="#000" strokeWidth="2" />
           <line x1="-20" y1="30" x2="-15" y2="30" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="10" x2="20" y2="10" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="20" x2="20" y2="20" stroke="#000" strokeWidth="2" />
           <line x1="15" y1="30" x2="20" y2="30" stroke="#000" strokeWidth="2" />
        </g>
        <g transform="translate(1050, 480)">
           <rect x="-15" y="0" width="30" height="20" rx="4" fill="#1a1a1c" stroke="#000" strokeWidth="2" />
           <rect x="-25" y="5" width="10" height="10" rx="2" fill="#1a1a1c" stroke="#000" strokeWidth="2" />
           <rect x="15" y="5" width="10" height="10" rx="2" fill="#1a1a1c" stroke="#000" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}
