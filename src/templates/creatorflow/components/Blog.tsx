import React from 'react';
import { Sparkles } from 'lucide-react';

const posts = [
  {
    title: "How YouTube Creators Can Build a Personal Brand Website",
    description: "You're more than just a youtube channel — you're a brand yourself.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800", // Female creator / creative setup
  },
  {
    title: "Why Every YouTube Creator Needs a Personal Website",
    description: "As a creator, your YouTube channel is only one piece of the puzzle.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", // Male creator / collaboration
  },
  {
    title: "5 Website Must-Haves for Serious YouTube Creators",
    description: "You can turn your passion into a profitable career like everyone!",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", // Tech/Coding setup
  },
  {
    title: "Why Every YouTube Creator Needs an Email List",
    description: "The smartest creators don't just build audiences — they own them.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", // Camera gear
  }
];

export default function Blog() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full" id="blog">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
                <Sparkles size={14} className="text-brand-orange fill-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Blog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Creator Insights & Tips
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                Stay ahead of the game with fresh insights on editing trends, YouTube growth strategies.
            </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {posts.map((post, index) => (
                <div key={index} className="group cursor-pointer flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-[32px] mb-6 aspect-[4/3] md:aspect-[16/10]">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-orange transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {post.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>

    </section>
  );
}