"use client";

import { motion } from "framer-motion";
import { Bot, LineChart, Zap, ShieldCheck } from "lucide-react";

const features = [
    {
        title: "Autonomous Execution",
        description: "RankEngine directly edits your codebase, updates metadata, and fixes canonical tags without you lifting a finger.",
        icon: <Bot className="w-5 h-5 text-blue-400" />,
        colSpan: "md:col-span-2",
        glowColor: "group-hover:shadow-[inset_0_0_100px_rgba(59,130,246,0.05)]",
        borderHover: "group-hover:border-blue-500/30",
        bgGraphic: (
            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_left,white,transparent)]" />
            </div>
        )
    },
    {
        title: "Real-time Monitoring",
        description: "Detects ranking drops instantly and deploys countermeasures.",
        icon: <LineChart className="w-5 h-5 text-cyan-400" />,
        colSpan: "md:col-span-1",
        glowColor: "group-hover:shadow-[inset_0_0_80px_rgba(34,211,238,0.05)]",
        borderHover: "group-hover:border-cyan-500/30",
        bgGraphic: (
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500 pointer-events-none" />
        )
    },
    {
        title: "Instant Countermeasures",
        description: "Analyzes competitor changes and updates your content to regain spots.",
        icon: <Zap className="w-5 h-5 text-amber-400" />,
        colSpan: "md:col-span-1",
        glowColor: "group-hover:shadow-[inset_0_0_80px_rgba(251,191,36,0.05)]",
        borderHover: "group-hover:border-amber-500/30",
        bgGraphic: (
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500 pointer-events-none" />
        )
    },
    {
        title: "LLM Citation Generation",
        description: "We optimize your brand to be cited as the primary source in ChatGPT, Perplexity, and Google's AI Overviews.",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
        colSpan: "md:col-span-2",
        glowColor: "group-hover:shadow-[inset_0_0_100px_rgba(16,185,129,0.05)]",
        borderHover: "group-hover:border-emerald-500/30",
        bgGraphic: (
            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-end pr-12">
                    <div className="w-48 h-48 rounded-full border border-emerald-500/30 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute w-32 h-32 rounded-full border border-emerald-500/40 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
                </div>
            </div>
        )
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-black relative border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium uppercase tracking-widest mb-6"
                    >
                        Foundation
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6">
                        The Future of <br className="hidden md:block" /> Autonomous Search.
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        We are building the tools necessary to dominate search rankings, fully automated and relentlessly fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`group relative bg-[#050505] border border-white/10 rounded-3xl p-10 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${feature.colSpan} ${feature.glowColor} ${feature.borderHover}`}
                        >
                            {/* Interactive Background Graphic */}
                            {feature.bgGraphic}

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.05] rounded-full flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:bg-white/[0.05] transition-colors duration-500">
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-medium text-white tracking-tight mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-white/40 leading-relaxed text-[15px] max-w-lg mt-auto">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
