"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-black pb-20 pt-32">

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2940&auto=format&fit=crop"
                    alt="Dark Cinematic NYC Skyline"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 animate-pulse duration-10000" />
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-40" />

                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-white/90 text-xs font-medium tracking-widest uppercase mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00] shadow-[0_0_10px_#FF5C00] animate-pulse" />
                    RankEngine Waitlist Open
                </motion.div>

                {/* Serif Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="relative text-5xl md:text-7xl lg:text-[5.5rem] font-serif tracking-tight text-white mb-8 leading-[1.05]"
                >
                    AI that reasons like <br className="hidden md:block" />
                    <span className="text-white/80">an SEO engineer.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
                >
                    Autonomous AI agents for enterprise search growth. RankEngine monitors, fixes, and optimizes your site and brand citations natively 24/7.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110 opacity-50" />
                    <Button asChild className="relative rounded-full bg-white text-black hover:bg-gray-100 hover:scale-[1.02] px-9 py-7 text-base font-semibold transition-all duration-300 min-w-[200px] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] border border-white/20">
                        <a href="#waitlist" onClick={scrollToWaitlist}>
                            Join the Waitlist
                        </a>
                    </Button>
                </motion.div>



            </div>
        </section>
    );
}
