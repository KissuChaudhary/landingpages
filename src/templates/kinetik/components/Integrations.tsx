import React from 'react';
import { ArrowRight, Gamepad2, Youtube, Music, Zap, Twitch, Slack, Box, Video } from 'lucide-react';

const IntegrationIcon = ({ icon: Icon, bg, color }: any) => (
  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${bg} flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer`}>
    <Icon className={color} size={32} />
  </div>
);

export const Integrations: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-kinetik-black mb-6 leading-tight">
              Powerful integrations
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Seamlessly integrate with your favorite tools to streamline workflows and keep everything in sync.
            </p>
          </div>

          <button className="bg-black text-white pl-6 pr-2 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-3 group shadow-lg">
            Get started
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={14} className="text-black" />
            </div>
          </button>

          <div className="space-y-6 pt-4">
             {[
               "Explore 50+ supported integrations",
               "Securely link your account",
               "Sync and streamline your workflow"
             ].map((text, idx) => (
               <div key={idx} className="flex items-center gap-4 group cursor-default">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 group-hover:scale-110 transition-transform">
                    {`0${idx + 1}`}
                  </div>
                  <span className="text-gray-600 font-medium group-hover:text-black transition-colors">{text}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Visuals - Icon Grid */}
        <div className="flex-1 relative">
           {/* Decorative background blurs */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>

           <div className="grid grid-cols-3 gap-4 md:gap-6 transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
              {/* Row 1 */}
              <IntegrationIcon icon={Gamepad2} bg="bg-red-50" color="text-red-500" />
              <IntegrationIcon icon={Youtube} bg="bg-red-50" color="text-red-600" />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center"></div>
              
              {/* Row 2 */}
              <IntegrationIcon icon={Music} bg="bg-green-50" color="text-green-500" />
              <IntegrationIcon icon={Zap} bg="bg-gray-100" color="text-black" />
              <IntegrationIcon icon={Twitch} bg="bg-purple-50" color="text-purple-600" />

              {/* Row 3 */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center"></div>
              <IntegrationIcon icon={Slack} bg="bg-amber-50" color="text-amber-600" />
              <IntegrationIcon icon={Video} bg="bg-blue-50" color="text-blue-500" />
           </div>
           
           {/* Floating + signs */}
           <div className="absolute top-0 left-0 text-gray-200 text-2xl font-light">+</div>
           <div className="absolute top-0 right-1/3 text-gray-200 text-2xl font-light">+</div>
           <div className="absolute bottom-1/3 left-1/4 text-gray-200 text-2xl font-light">+</div>
        </div>

      </div>
    </div>
  );
};