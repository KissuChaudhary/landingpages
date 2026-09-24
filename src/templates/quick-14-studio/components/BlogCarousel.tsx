import React from 'react';
import BlogExampleCard from './BlogExampleCard';

const BLOG_EXAMPLES = [
  {
    title: "How to Promote Your Chrome Extension Online",
    category: "SaaS Growth",
    href: "https://launchdirectories.com",
    imageSrc: "https://cdn.dribbble.com/userupload/13010323/file/original-5975440746d859187a530f2c41768832.png?resize=1200x900" 
  },
  {
    title: "Can You Animate Photos of Deceased Relatives?",
    category: "AI Technology",
    href: "https://bringback.pro",
    imageSrc: "https://cdn.dribbble.com/userupload/10461872/file/original-b98a339906d5079857908b8b3901416e.jpg?resize=1200x900" 
  },
  {
    title: "The Complete Guide to AI SEO & AEO in 2026",
    category: "Strategy",
    href: "https://flipaeo.com",
    imageSrc: "https://cdn.dribbble.com/userupload/12592548/file/original-3e582846171542387140416b9231268c.png?resize=1200x900" 
  },
  {
    title: "How to Use AI Headshots to Level Up Your Resume",
    category: "Career",
    href: "https://unrealshot.com",
    imageSrc: "https://cdn.dribbble.com/userupload/4267499/file/original-a7447938367a84e3183d258289436442.png?resize=1200x900" 
  }
];

const BlogCarousel: React.FC = () => {
  return (
    <div className="w-full mt-24">
        
        {/* 
            Container constrained to match the GridBackground inner width.
            GridBackground sidebars are: w-3 (12px) on mobile, w-5 (20px) on sm.
            mx-3 sm:mx-5 aligns this container exactly between the vertical strips.
        */}
        <div className="mx-3 sm:mx-5 relative overflow-hidden group">

            {/* Carousel Track */}
            {/* Added py-10 to allow vertical space for hover effects/shadows without clipping */}
            <div className="flex gap-8 w-max animate-infinite-scroll hover:[animation-play-state:paused] py-10">
                {/* Original Set */}
                {BLOG_EXAMPLES.map((post, i) => (
                    <BlogExampleCard 
                        key={`original-${i}`}
                        {...post}
                    />
                ))}
                {/* Duplicated Set for infinite scroll */}
                {BLOG_EXAMPLES.map((post, i) => (
                    <BlogExampleCard 
                        key={`dupe-${i}`}
                        {...post}
                    />
                ))}
                {/* Duplicated Set 2 for large screens */}
                {BLOG_EXAMPLES.map((post, i) => (
                    <BlogExampleCard 
                        key={`dupe2-${i}`}
                        {...post}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default BlogCarousel;