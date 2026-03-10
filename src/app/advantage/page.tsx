'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Cpu, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import NetworkBackground from '@/components/NetworkBackground';

const ComparisonCard = ({ title, legacy, mochaEase, icon: Icon, delay }: { title: string, legacy: string, mochaEase: string, icon: any, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className="group relative grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:border-[#C3EB7A]/30 transition-all duration-500"
    >
        {/* Left Side: Legacy */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 opacity-60 group-hover:opacity-40 transition-opacity">
            <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-red-500/50" />
                <span className="text-sm font-bold tracking-widest uppercase text-white/30">Traditional Systems</span>
            </div>
            <p className="text-xl md:text-2xl font-medium text-slate-400 leading-relaxed italic">
                "{legacy}"
            </p>
        </div>

        {/* Right Side: MochaEase Advantage */}
        <div className="p-8 md:p-12 bg-gradient-to-br from-[#C3EB7A]/[0.02] to-transparent">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#C3EB7A]" />
                    <span className="text-sm font-black tracking-widest uppercase text-[#C3EB7A]">The MochaEase Way</span>
                </div>
                <div className="p-3 bg-[#4A90E2]/10 rounded-2xl">
                    <Icon className="w-6 h-6 text-[#4A90E2]" />
                </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {mochaEase}
            </h3>
            <div className="h-1 w-12 bg-[#4A90E2]/30 rounded-full group-hover:w-full transition-all duration-700" />
        </div>

        {/* Absolute Title (Centered on Grid Line) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] px-6 py-2 border border-white/10 rounded-full hidden md:block z-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{title}</span>
        </div>
    </motion.div>
);

export default function AdvantagePage() {
    return (
        <main className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#C3EB7A]/30">
            <NetworkBackground />

            {/* Top Edge Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none translate-x-1/3" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 mb-8"
                    >
                        <Zap className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#C3EB7A]">Enterprise Grade</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                    >
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">Enterprise POS.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed"
                    >
                        Why top-tier cafes, QSRs, and retail chains are ditching fragmented legacy software for MochaEase's unified ecosystem.
                    </motion.p>
                </div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full -z-10 blur-[120px] opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4A90E2] rounded-full" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C3EB7A] rounded-full" />
                </div>
            </section>

            {/* Comparison Grid */}
            <section className="relative py-20 px-4 md:py-32">
                <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-32">

                    <ComparisonCard
                        title="Intelligence"
                        legacy="Reports that only tell you yesterday's data, leaving you to guess tomorrow's needs."
                        mochaEase="AI demand forecasting that anticipates every rush and optimizes your inventory in real-time."
                        icon={Cpu}
                        delay={0.1}
                    />

                    <ComparisonCard
                        title="Reliability"
                        legacy="Operations halt the moment the internet connection dips or server lag occurs."
                        mochaEase="Native offline-first architecture. Your business never stops, even if the world does."
                        icon={Shield}
                        delay={0.2}
                    />

                    <ComparisonCard
                        title="Infrastructure"
                        legacy="Fragmented systems—one for POS, one for inventory, another for loyalty."
                        mochaEase="A single unified ecosystem where every transaction, stock update, and customer interaction is natively synced."
                        icon={Globe}
                        delay={0.3}
                    />

                    <ComparisonCard
                        title="Scalability"
                        legacy="Heads-up expansion costs with per-device licensing that punishes your growth."
                        mochaEase="Flexible enterprise licensing designed for multi-brand portfolios and massive franchising."
                        icon={Zap}
                        delay={0.4}
                    />

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative py-32 px-4 overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-20 rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl relative overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                            Stop Managing Software. <br />
                            <span className="text-[#C3EB7A]">Start Scaling.</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
                            Join the next generation of retailers who value speed, intelligence, and absolute reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/demo">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-[#C3EB7A] text-black font-black text-lg rounded-full shadow-[0_20px_40px_rgba(195,235,122,0.3)] hover:shadow-[0_25px_50px_rgba(195,235,122,0.5)] transition-all flex items-center gap-2"
                                >
                                    Experience the Advantage <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <Link href="/pricing" className="text-white font-bold hover:text-[#C3EB7A] transition-colors">
                                View Enterprise Pricing
                            </Link>
                        </div>

                        {/* Decor */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4A90E2]/10 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C3EB7A]/10 blur-[60px] rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* Subtle Footer spacer */}
            <div className="h-20" />
        </main>
    );
}
