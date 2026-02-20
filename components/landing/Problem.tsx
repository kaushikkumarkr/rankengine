"use client";

import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
    {
        icon: <Clock className="w-6 h-6 text-amber-500" />,
        glowColor: "group-hover:shadow-[inset_0_0_80px_rgba(245,158,11,0.05)]",
        borderHover: "group-hover:border-amber-500/30",
        title: "Agencies Are Too Slow",
        description: "Waiting weeks for an SEO audit while competitors steal your traffic. Traditional agencies can't keep up with real-time algorithm shifts.",
    },
    {
        icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
        glowColor: "group-hover:shadow-[inset_0_0_80px_rgba(239,68,68,0.05)]",
        borderHover: "group-hover:border-red-500/30",
        title: "Technical Issues Kill Rank",
        description: "A single broken canonical tag or rogue robots.txt edit can tank your revenue overnight. Manual monitoring usually catches bugs too late.",
    },
    {
        icon: <TrendingDown className="w-6 h-6 text-purple-500" />,
        glowColor: "group-hover:shadow-[inset_0_0_80px_rgba(168,85,247,0.05)]",
        borderHover: "group-hover:border-purple-500/30",
        title: "AI Search Is Evolving",
        description: "ChatGPT and Perplexity don't care about your backlinks or keyword density. They care about entity citations, which traditional SEO ignores.",
    },
];

export default function Problem() {
    return (
        <section className="py-24 bg-black relative border-t border-white/[0.05]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/80 text-xs font-medium uppercase tracking-widest mb-6"
                        >
                            The Problem
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white leading-tight">
                            The Rules Have <br className="hidden md:block" /> Rewritten Themselves.
                        </h2>
                    </div>
                    <p className="text-lg text-white/50 max-w-sm md:text-right pb-2">
                        Traditional SEO is dead. Paying an agency for manual keyword research and PDF reports is a losing game.
                    </p>
                </div>

                {/* Professional Context Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full aspect-[21/9] md:aspect-[4/1] rounded-3xl overflow-hidden mb-16 relative border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.03)]"
                >
                    <div className="absolute inset-0 bg-black/50 overflow-hidden mix-blend-multiply z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Analytics Data Decline"
                        className="w-full h-full object-cover opacity-40 grayscale mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20" />

                    {/* Simulated contextual overlay */}
                    <div className="absolute bottom-6 left-8 z-30">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs text-white/80 font-mono tracking-widest uppercase">Traffic Drop Detected</span>
                        </div>
                        <p className="text-white/40 text-sm font-medium">-42% Visibility (Algorithm Update)</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`group bg-[#050505] border border-white/10 rounded-2xl p-10 transition-all duration-500 flex flex-col hover:-translate-y-1 ${problem.glowColor} ${problem.borderHover}`}
                        >
                            <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.05] rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                                {problem.icon}
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-white mb-4">{problem.title}</h3>
                            <p className="text-white/40 leading-relaxed text-[15px]">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
