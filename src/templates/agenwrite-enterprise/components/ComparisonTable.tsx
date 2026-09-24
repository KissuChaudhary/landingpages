import React from 'react';

export const ComparisonTable: React.FC = () => {
    return (
        <div className="overflow-x-auto w-full max-w-4xl mx-auto border border-border bg-white mb-32">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-zinc-50 border-b border-border font-mono">
                    <tr>
                        <th className="px-6 py-4 font-medium">Feature</th>
                        <th className="px-6 py-4 font-medium text-zinc-400">Generic GPT Wrapper</th>
                        <th className="px-6 py-4 font-medium text-primary bg-zinc-100/50">AgenWrite Agent</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    <tr className="hover:bg-zinc-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-muted">Architecture</td>
                        <td className="px-6 py-4 text-zinc-500">Single-shot prompt</td>
                        <td className="px-6 py-4 font-medium text-primary bg-zinc-50/30">Multi-step Agentic Chain</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-muted">Research</td>
                        <td className="px-6 py-4 text-zinc-500">Training data only (Outdated)</td>
                        <td className="px-6 py-4 font-medium text-primary bg-zinc-50/30">Live Web Search + Fact Check</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-muted">Tone</td>
                        <td className="px-6 py-4 text-zinc-500">Robot / Generic</td>
                        <td className="px-6 py-4 font-medium text-primary bg-zinc-50/30">Brand-Tuned Replica</td>
                    </tr>
                     <tr className="hover:bg-zinc-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-muted">Optimization Target</td>
                        <td className="px-6 py-4 text-zinc-500">SEO Keywords (Old)</td>
                        <td className="px-6 py-4 font-medium text-primary bg-zinc-50/30">AIO + SEO (Modern)</td>
                    </tr>
                     <tr className="hover:bg-zinc-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-muted">Citation Rate</td>
                        <td className="px-6 py-4 text-zinc-500">Low Probability</td>
                        <td className="px-6 py-4 font-medium text-primary bg-zinc-50/30">High Authority</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};