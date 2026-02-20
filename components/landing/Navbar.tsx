"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-4 shadow-sm" : "bg-transparent py-6"}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
                <Link href="/" className="flex items-center gap-2 group">
                    <Globe size={24} strokeWidth={2.5} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xl font-bold tracking-tight text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        RankEngine
                    </span>
                </Link>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center">
                    <Button asChild className="rounded-full bg-white hover:bg-gray-100 text-black px-6 font-semibold transition-all">
                        <a href="#waitlist" onClick={scrollToWaitlist}>
                            Join Waitlist
                        </a>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white/80 hover:text-white transition-colors flex items-center"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            <Button asChild className="w-full bg-white hover:bg-gray-100 text-black rounded-full font-semibold">
                                <a href="#waitlist" onClick={scrollToWaitlist}>
                                    Join Waitlist
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
