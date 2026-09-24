import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  avatar: string;
  username: string;
}

const projects: ProjectCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=10",
    username: "kia_dances"
  },
  {
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=11",
    username: "sarah_rides"
  },
  {
    image: "https://images.unsplash.com/photo-1622163642998-1ea14b60c57e?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=12",
    username: "tennis_tips"
  },
  {
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=13",
    username: "business_chats"
  },
  {
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=14",
    username: "golf_with_jess"
  },
  {
    image: "https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?q=80&w=800&auto=format&fit=crop",
    avatar: "https://picsum.photos/32/32?random=15",
    username: "zoe_gardens"
  }
];

const Projects: React.FC = () => {
  return (
    <section className="py-24 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-pink-50 border border-pink-100 text-pink-600 font-bold text-[10px] tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6 max-w-3xl">
            Where strategy meets <br className="hidden md:block" />
            scroll-stopping content.
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
            A curated look at how we turned raw footage into viral-worthy moments — and real audience growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative w-full aspect-[9/14] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-neutral-900"
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.username} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* User Info */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 transform translate-y-0 transition-transform duration-300">
                <div className="relative">
                    <img 
                        src={project.avatar} 
                        alt={project.username} 
                        className="w-8 h-8 rounded-full border border-white/50" 
                    />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm tracking-wide">{project.username}</span>
                  <BadgeCheck className="w-4 h-4 text-white fill-blue-500" />
                </div>
              </div>

              {/* Play Button Overlay (Optional subtle interaction) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
