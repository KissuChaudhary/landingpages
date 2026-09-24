import React, { useState } from 'react';
import { Sparkles, Loader2, Play } from 'lucide-react';
import { generateBlogPreview } from '../services/geminiService';

const LiveDemo: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);
    
    // Simulate a tiny bit of "thinking" time for UX if API is too fast
    const content = await generateBlogPreview(topic);
    
    setResult(content);
    setLoading(false);
  };

  return (
    <section id="demo" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-6 md:p-16 text-white overflow-hidden relative shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Input */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-blue-300 mb-4">
                  <Sparkles size={14} />
                  <span>Live Interactive Demo</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">See the magic happen.</h2>
                <p className="text-slate-400 text-lg">
                  Test our engine right now. Enter a topic and see how we structure a human-like, SEO-optimized intro.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="E.g., How to grow tomatoes indoors..." 
                    className="bg-transparent text-white placeholder-slate-500 px-6 py-4 flex-1 outline-none text-lg"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <button 
                    disabled={loading || !topic}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[160px]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Generate <Play size={18} fill="currentColor" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 text-center md:text-left pl-4">
                  * Powered by Gemini 2.5 Flash for demo purposes.
                </p>
              </form>
            </div>

            {/* Right: Output */}
            <div className="bg-white rounded-3xl min-h-[400px] text-slate-900 overflow-hidden flex flex-col shadow-xl">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                </div>
                <div className="text-xs text-slate-400 font-medium ml-2">Preview Output</div>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Loader2 size={40} className="animate-spin text-blue-500" />
                    <p className="animate-pulse">Analyzing search intent...</p>
                  </div>
                ) : result ? (
                  <div className="prose prose-slate max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                     <Sparkles size={48} />
                     <p>Results will appear here</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;