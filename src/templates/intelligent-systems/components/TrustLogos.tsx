import { Box, BarChart2, Shield, Figma, Slack, Music, Youtube, Gamepad2 } from 'lucide-react';

export default function TrustLogos() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex flex-col items-center pb-20 relative z-20">
      <div className="inner-shadow-dark px-6 py-2 rounded-full border border-black/50 mb-8">
        <span className="text-xs font-medium text-gray-400">Trusted by leading technology companies</span>
      </div>
      
      <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-60">
        <Box className="w-8 h-8" />
        <BarChart2 className="w-8 h-8" />
        <Shield className="w-8 h-8" />
        <Figma className="w-8 h-8" />
        <Slack className="w-8 h-8" />
        <Music className="w-8 h-8" />
        <Youtube className="w-8 h-8" />
        <div className="flex flex-col items-center justify-center font-bold text-[10px] leading-none border-2 border-current p-1 rounded-sm">
          <span>EPIC</span>
          <span>GAMES</span>
        </div>
      </div>
    </div>
  )
}
