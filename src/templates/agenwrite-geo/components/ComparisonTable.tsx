import React from 'react';
import { Check, X } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
    return (
        <div className="w-full overflow-x-auto bg-black">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs uppercase bg-zinc-950 border-b border-zinc-800/80 font-mono">
                    <tr>
                        <th className="w-1/3 px-6 md:px-12 lg:px-16 py-4 font-medium tracking-widest text-zinc-500">
                            SPECIFICATION_KEY
                        </th>
                        <th className="w-1/3 px-6 md:px-12 py-4 font-medium tracking-widest text-zinc-500 border-l border-zinc-800/80">
                            GENERIC GPT WRAPPER
                        </th>
                        <th className="w-1/3 px-6 md:px-12 lg:px-16 py-4 font-medium tracking-widest text-zinc-200 bg-zinc-900/50 border-l border-zinc-800/80">
                            <div className="flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-zinc-300" />
                                <span>AGENWRITE RUNTIME</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 md:px-12 lg:px-16 py-5 font-mono text-xs text-zinc-400">
                            Execution Pipeline
                        </td>
                        <td className="px-6 md:px-12 py-5 text-zinc-500 border-l border-zinc-800/80">
                            Single-shot prompt with context truncation
                        </td>
                        <td className="px-6 md:px-12 lg:px-16 py-5 text-zinc-100 font-medium bg-zinc-950/40 border-l border-zinc-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 shrink-0">
                                    <Check size={10} strokeWidth={2.5} />
                                </div>
                                <span>Recursive multi-agent graph with memory loop</span>
                            </div>
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 md:px-12 lg:px-16 py-5 font-mono text-xs text-zinc-400">
                            Knowledge Grounding
                        </td>
                        <td className="px-6 md:px-12 py-5 text-zinc-500 border-l border-zinc-800/80">
                            Static pre-training data only (Hallucination risk)
                        </td>
                        <td className="px-6 md:px-12 lg:px-16 py-5 text-zinc-100 font-medium bg-zinc-950/40 border-l border-zinc-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 shrink-0">
                                    <Check size={10} strokeWidth={2.5} />
                                </div>
                                <span>Real-time autonomous web scraping &amp; fact-check audit</span>
                            </div>
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 md:px-12 lg:px-16 py-5 font-mono text-xs text-zinc-400">
                            Voice &amp; Syntax Matching
                        </td>
                        <td className="px-6 md:px-12 py-5 text-zinc-500 border-l border-zinc-800/80">
                            Adjective prompt modifiers ("be professional")
                        </td>
                        <td className="px-6 md:px-12 lg:px-16 py-5 text-zinc-100 font-medium bg-zinc-950/40 border-l border-zinc-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 shrink-0">
                                    <Check size={10} strokeWidth={2.5} />
                                </div>
                                <span>Style DNA entropy extraction from top publications</span>
                            </div>
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 md:px-12 lg:px-16 py-5 font-mono text-xs text-zinc-400">
                            Search Engine Adaptation
                        </td>
                        <td className="px-6 md:px-12 py-5 text-zinc-500 border-l border-zinc-800/80">
                            Legacy 2018 keyword stuffing
                        </td>
                        <td className="px-6 md:px-12 lg:px-16 py-5 text-zinc-100 font-medium bg-zinc-950/40 border-l border-zinc-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 shrink-0">
                                    <Check size={10} strokeWidth={2.5} />
                                </div>
                                <span>Modern AIO, Perplexity &amp; Google AI Overview indexing</span>
                            </div>
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 md:px-12 lg:px-16 py-5 font-mono text-xs text-zinc-400">
                            Citation Probability
                        </td>
                        <td className="px-6 md:px-12 py-5 text-zinc-500 border-l border-zinc-800/80">
                            Low (Filtered as regurgitated synthetic text)
                        </td>
                        <td className="px-6 md:px-12 lg:px-16 py-5 text-zinc-100 font-medium bg-zinc-950/40 border-l border-zinc-800/80">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 shrink-0">
                                    <Check size={10} strokeWidth={2.5} />
                                </div>
                                <span>High authority, primary source verified references</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};