import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <Globe size={24} strokeWidth={2.5} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xl font-bold tracking-tight text-white opacity-90 group-hover:opacity-100 transition-opacity">
                                RankEngine
                            </span>
                        </Link>
                        <p className="text-white/50 max-w-sm">
                            The first truly autonomous SEO engineer.
                            Monitors, analyzes, and executes growth strategies 24/7 without human intervention.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white/90 mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="#waitlist" className="text-white/50 hover:text-white transition-colors">Join Waitlist</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white/90 mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} RankEngine, Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                        <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse" />
                        Systems Operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
