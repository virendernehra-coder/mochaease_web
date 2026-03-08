'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';
import type { Variants } from 'framer-motion';

export default function LoginPage() {
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
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#4A90E2]/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C3EB7A]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Left: Interactive Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-10 relative">

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-md w-full mx-auto mt-20">
                    <motion.div variants={fadeUpVariant}>
                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-white/60 mb-10">Sign in to control your empire.</p>
                    </motion.div>

                    {/* OAuth Buttons */}
                    <motion.div variants={fadeUpVariant} className="flex gap-4 mb-8">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all group">
                            <Chrome className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            <span className="text-sm">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all group">
                            <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" className="hidden" /><path d="M16.5 13.974c0-3.187 2.651-4.755 2.766-4.832-1.503-2.147-3.834-2.435-4.664-2.47-1.956-.192-3.824 1.134-4.82 1.134-1.006 0-2.541-1.11-4.14-1.08-2.071.028-3.987 1.187-5.048 3.011-2.158 3.665-.552 9.074 1.545 12.046 1.026 1.455 2.245 3.1 3.82 3.042 1.517-.058 2.091-.968 3.916-.968 1.815 0 2.341.968 3.935.94 1.634-.03 2.668-1.488 3.684-2.923 1.173-1.674 1.656-3.296 1.674-3.376-.037-.015-3.168-1.189-3.168-4.524zm-2.73-8.814c.83-.984 1.385-2.348 1.233-3.71-.143-.021-.295-.032-.442-.032-1.39 0-2.887.65-3.774 1.696-.78.916-1.385 2.313-1.215 3.66 1.52.115 2.97-.565 3.847-1.614z" /></svg>
                            <span className="text-sm">Apple</span>
                        </button>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-xs text-white/30 uppercase font-bold tracking-widest">or continue with email</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </motion.div>

                    {/* Form */}
                    <motion.form variants={staggerContainer} className="space-y-5">
                        <motion.div variants={fadeUpVariant} className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Email Address</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUpVariant} className="space-y-2">
                            <div className="flex justify-between items-center pl-1 pr-2">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Password</label>
                                <Link href="/forgot" className="text-xs font-bold text-[#4A90E2] hover:text-white transition-colors">Forgot?</Link>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/30 group-focus-within/input:text-[#4A90E2] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#4A90E2]/50 focus:bg-white/10 transition-all group-hover/input:border-white/20"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            variants={fadeUpVariant}
                            type="submit"
                            className="w-full py-4 rounded-2xl bg-[#C3EB7A] text-black font-black text-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] mt-8 flex justify-center items-center gap-2 group"
                        >
                            Sign In to Dashboard
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.form>

                    <motion.p variants={fadeUpVariant} className="text-center text-sm text-white/50 mt-8">
                        Don't have an account? <Link href="/register" className="text-[#C3EB7A] font-bold hover:underline underline-offset-4 decoration-2">Start your free trial</Link>
                    </motion.p>
                </motion.div>
            </div>

            {/* Right: Ambient Visuals / Quote */}
            <div className="hidden lg:flex w-1/2 bg-[#0A0A0A] border-l border-white/5 relative items-center justify-center overflow-hidden">
                {/* Glass Abstract Shapes */}
                <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#4A90E2]/10 to-[#C3EB7A]/10 blur-[80px] z-0 animate-pulse-slow" />

                <div className="relative z-10 max-w-lg p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    <svg className="w-12 h-12 text-[#C3EB7A] mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-2xl text-white font-medium mb-8 leading-relaxed">
                        "We transitioned 42 outlets to MochaEase in one weekend. The visibility into our stock and revenue numbers has completely changed how we operate."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-[#4A90E2] p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <span className="text-[#4A90E2] font-black text-lg">SJ</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Sarah Jenkins</h4>
                            <p className="text-[#C3EB7A] text-sm">VP Operations, The Daily Grind</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
