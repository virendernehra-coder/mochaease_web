'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome, Building, User } from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';

import type { Variants } from 'framer-motion';

export default function RegisterClient() {
    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <main className="flex min-h-screen bg-[#050505] selection:bg-[#C3EB7A]/30 relative overflow-hidden">

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <NetworkBackground />
                {/* Subtle ambient glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4A90E2]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C3EB7A]/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Left: Ambient Visuals / Feature Highlights */}
            <div className="hidden lg:flex w-1/2 bg-[#0A0A0A] border-r border-white/5 relative items-center justify-center overflow-hidden">
                {/* Glass Abstract Shapes */}
                <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#C3EB7A]/10 to-[#4A90E2]/10 blur-[80px] z-0 animate-pulse-slow object-center" />

                <div className="relative z-10 max-w-lg p-12 transition-all">
                    <h2 className="text-4xl text-white font-black mb-8 leading-tight">
                        Stop guessing.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Start dominating.</span>
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-[#C3EB7A]/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#C3EB7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Unified Dashboard</h4>
                                <p className="text-white/50 text-sm leading-relaxed">Control inventory, staff, and sales across all your locations from a single screen.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <div className="w-10 h-10 rounded-full bg-[#4A90E2]/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">AI Insights</h4>
                                <p className="text-white/50 text-sm leading-relaxed">Predict exactly how much stock you need to avoid waste and never run out of bestsellers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-10 relative">

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-md w-full mx-auto mt-20">
                    <motion.div variants={fadeUpVariant}>
                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Create Account</h1>
                        <p className="text-white/60 mb-8">Start your 14-day free trial. No credit card required.</p>
                    </motion.div>

                    {/* Form */}
                    <motion.form variants={staggerContainer} className="space-y-4">

                        <div className="flex gap-4">
                            <motion.div variants={fadeUpVariant} className="space-y-2 flex-1">
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">Full Name</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20 text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeUpVariant} className="space-y-2">
                            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">Business Name</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building className="h-4 w-4 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20 text-sm"
                                    placeholder="The Daily Grind Cafe"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUpVariant} className="space-y-2">
                            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">Work Email</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20 text-sm"
                                    placeholder="john@dailygrind.com"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUpVariant} className="space-y-2">
                            <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">Password</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20 text-sm"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            variants={fadeUpVariant}
                            type="submit"
                            className="w-full py-3.5 rounded-2xl bg-[#C3EB7A] text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] mt-6 flex justify-center items-center gap-2 group"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.form>

                    <motion.div variants={fadeUpVariant} className="flex items-center gap-4 my-8">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">or sign up with</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </motion.div>

                    {/* OAuth Buttons */}
                    <motion.div variants={fadeUpVariant} className="flex gap-4 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all group">
                            <Chrome className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                            <span className="text-sm">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all group">
                            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" className="hidden" /><path d="M16.5 13.974c0-3.187 2.651-4.755 2.766-4.832-1.503-2.147-3.834-2.435-4.664-2.47-1.956-.192-3.824 1.134-4.82 1.134-1.006 0-2.541-1.11-4.14-1.08-2.071.028-3.987 1.187-5.048 3.011-2.158 3.665-.552 9.074 1.545 12.046 1.026 1.455 2.245 3.1 3.82 3.042 1.517-.058 2.091-.968 3.916-.968 1.815 0 2.341.968 3.935.94 1.634-.03 2.668-1.488 3.684-2.923 1.173-1.674 1.656-3.296 1.674-3.376-.037-.015-3.168-1.189-3.168-4.524zm-2.73-8.814c.83-.984 1.385-2.348 1.233-3.71-.143-.021-.295-.032-.442-.032-1.39 0-2.887.65-3.774 1.696-.78.916-1.385 2.313-1.215 3.66 1.52.115 2.97-.565 3.847-1.614z" /></svg>
                            <span className="text-sm">Apple</span>
                        </button>
                    </motion.div>

                    <motion.p variants={fadeUpVariant} className="text-center text-sm text-white/50">
                        Already have an account? <a href="https://backoffice.mochaease.com" target="_blank" rel="noreferrer" className="text-[#C3EB7A] font-bold hover:underline underline-offset-4 decoration-2">Sign in instead</a>
                    </motion.p>
                </motion.div>
            </div>

        </main>
    );
}
