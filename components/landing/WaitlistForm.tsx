"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Zap, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { waitlistSchema, type WaitlistFormData } from "@/lib/validations";

export default function WaitlistForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm<WaitlistFormData>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            full_name: "",
            email: "",
            company_name: "",
            company_size: "",
            seo_spend: "",
            frustration: "",
        },
    });

    const onSubmit = async (data: WaitlistFormData) => {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong.");
            }

            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag('event', 'waitlist_signup', {
                    position: result.position
                });
            }

            setIsSuccess(true);
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="waitlist" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Centered Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-6 leading-tight"
                    >
                        Secure Your <br className="hidden md:block" /> Early Access.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto"
                    >
                        We&apos;re onboarding beta users in cohorts. Join now to lock in founders pricing and shape the product roadmap.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* Left: Form Content */}
                    <div className="relative z-10 w-full h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative h-full flex flex-col justify-center"
                        >
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
                                            <CheckCircle2 size={40} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-serif text-white mb-4">You&apos;re on the list!</h3>
                                        <p className="text-white/60 text-lg max-w-sm mx-auto">
                                            Check your email for confirmation and waitlist position. We&apos;ll be in touch soon.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >

                                        {errorMessage && (
                                            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="full_name" className="text-white/80 font-medium text-sm">Full Name *</Label>
                                                <Input
                                                    id="full_name"
                                                    placeholder="Jane Doe"
                                                    className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 transition-colors h-12 text-white placeholder:text-white/30 rounded-xl"
                                                    {...form.register("full_name")}
                                                />
                                                {form.formState.errors.full_name && (
                                                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.full_name.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white/80 font-medium text-sm">Work Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="jane@company.com"
                                                    className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 transition-colors h-12 text-white placeholder:text-white/30 rounded-xl"
                                                    {...form.register("email")}
                                                />
                                                {form.formState.errors.email && (
                                                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="company_name" className="text-white/80 font-medium text-sm">Company *</Label>
                                                <Input
                                                    id="company_name"
                                                    placeholder="Acme AGI"
                                                    className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 transition-colors h-12 text-white placeholder:text-white/30 rounded-xl"
                                                    {...form.register("company_name")}
                                                />
                                                {form.formState.errors.company_name && (
                                                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.company_name.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-white/80 font-medium text-sm">Size *</Label>
                                                <Select onValueChange={(val) => form.setValue("company_size", val)}>
                                                    <SelectTrigger className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 h-12 text-white rounded-xl">
                                                        <SelectValue placeholder="Size" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#111] border-white/10 text-white rounded-xl">
                                                        <SelectItem value="1-10">1-10</SelectItem>
                                                        <SelectItem value="11-50">11-50</SelectItem>
                                                        <SelectItem value="51-200">51-200</SelectItem>
                                                        <SelectItem value="201-1000">201-1000</SelectItem>
                                                        <SelectItem value="1000+">1000+</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {form.formState.errors.company_size && (
                                                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.company_size.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-white/80 font-medium text-sm">SEO Spend *</Label>
                                                <Select onValueChange={(val) => form.setValue("seo_spend", val)}>
                                                    <SelectTrigger className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 h-12 text-white rounded-xl">
                                                        <SelectValue placeholder="Spend" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#111] border-white/10 text-white rounded-xl">
                                                        <SelectItem value="<$2K/mo">&lt;$2K</SelectItem>
                                                        <SelectItem value="$2K-$10K/mo">$2K-$10K</SelectItem>
                                                        <SelectItem value="$10K-$30K/mo">$10K-$30K</SelectItem>
                                                        <SelectItem value="$30K+/mo">$30K+</SelectItem>
                                                        <SelectItem value="None">None</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {form.formState.errors.seo_spend && (
                                                    <p className="text-red-400 text-xs mt-1">{form.formState.errors.seo_spend.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="frustration" className="text-white/80 font-medium text-sm">What&apos;s your biggest SEO frustration? (Optional)</Label>
                                            <Textarea
                                                id="frustration"
                                                placeholder="Waiting months for agency reports..."
                                                className="bg-black/50 border-white/10 focus:border-white focus:ring-white/20 transition-colors min-h-[100px] resize-none text-white placeholder:text-white/30 rounded-xl p-4"
                                                {...form.register("frustration")}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-14 bg-white hover:bg-gray-200 text-black font-semibold text-base rounded-full transition-all mt-4 flex items-center justify-center"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                "Claim Early Access Spot"
                                            )}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Right: Abstract Graphics / Product Preview */}
                    <div className="relative hidden lg:block h-full min-h-[500px]">
                        <div className="absolute inset-0 bg-[#050505] rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center relative shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 mix-blend-screen opacity-50 z-10" />

                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                                alt="RankEngine Dashboard Preview"
                                className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-700"
                            />

                            {/* Glass overlay fade at the bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />

                            {/* Simulated UI Overlay */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="absolute bottom-10 right-10 z-30 w-72 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Bot className="w-5 h-5 text-blue-400" />
                                        <span className="font-semibold text-white/90 text-sm tracking-tight">System Status</span>
                                    </div>
                                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Active
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-white/50">
                                        <span>Citations Updated</span>
                                        <span className="text-white">14,204</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[85%] relative">
                                            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
