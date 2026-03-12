'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    MapPin,
    Briefcase,
    Clock,
    Zap,
    ShieldCheck,
    Globe2,
    Sparkles,
    Cpu,
    CheckCircle2,
    ArrowUpRight,
    Terminal as TerminalIcon,
    Layers,
    Share2,
    Linkedin,
    Link as LinkIcon,
    Check
} from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';
import Link from 'next/link';

type Job = {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    level: string;
    salary: string;
    mission: string;
    challenges: string[];
    requirements: string[];
    stack?: string[];
};

export default function JobDescriptionClient({ job }: { job: Job }) {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = async () => {
        const shareData = {
            title: `Mission: ${job.title} at MochaEase`,
            text: `Check out this mission-critical role at MochaEase: ${job.title} (${job.department})`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share aborted or failed');
            }
        } else {
            // Fallback: Copy to Clipboard
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`Mission: ${job.title} at MochaEase`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent(`Check out this mission: ${job.title} at MochaEase - ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 overflow-x-hidden">
            <NetworkBackground />

            {/* Top Glow Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none translate-x-1/3" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32">
                <div className="max-w-4xl mx-auto z-10 relative">
                    <motion.button
                        onClick={() => router.back()}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-white/40 hover:text-[#C3EB7A] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Careers</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <span className="px-4 py-1.5 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[10px] font-black text-[#C3EB7A] uppercase tracking-[0.2em]">
                                {job.department}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                                {job.level}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            {job.title}
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-10 border-y border-white/5">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Location</span>
                                <span className="text-sm font-bold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C3EB7A]" /> {job.location}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Type</span>
                                <span className="text-sm font-bold flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[#C3EB7A]" /> {job.type}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Experience</span>
                                <span className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#C3EB7A]" /> {job.level} Level</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Rewards</span>
                                <span className="text-sm font-bold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#C3EB7A]" /> {job.salary}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative pb-32 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
                    {/* Main Body */}
                    <div className="space-y-20">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-black text-[#C3EB7A] uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Globe2 className="w-5 h-5" /> The Mission
                            </h2>
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                                {job.mission}
                            </p>
                        </motion.div>

                        {/* Challenges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-black text-[#C3EB7A] uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Zap className="w-5 h-5" /> The Challenge
                            </h2>
                            <div className="space-y-6">
                                {job.challenges.map((challenge, i) => (
                                    <div key={i} className="flex gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-[#C3EB7A]/20 transition-colors">
                                        <div className="w-8 h-8 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center text-xs font-black text-[#C3EB7A]">
                                            0{i + 1}
                                        </div>
                                        <p className="text-lg text-white/60 leading-relaxed group-hover:text-white transition-colors">
                                            {challenge}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack if Engineer */}
                        {job.stack && job.stack.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-black text-[#C3EB7A] uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <TerminalIcon className="w-5 h-5" /> The Stack
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {job.stack.map(tech => (
                                        <span key={tech} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm group hover:border-[#4A90E2]/30 transition-all">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Requirements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-black text-[#C3EB7A] uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Cpu className="w-5 h-5" /> What you bring
                            </h2>
                            <div className="grid gap-4">
                                {job.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-3 text-white/60">
                                        <CheckCircle2 className="w-5 h-5 text-[#C3EB7A] mt-1 flex-shrink-0" />
                                        <p className="text-lg">{req}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar / Sticky CTA */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#050505] shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-xl font-bold mb-6 relative z-10">Build the future with us.</h4>
                                <Link
                                    href={`/careers/${job.id}/apply`}
                                    className="block w-full py-4 bg-[#C3EB7A] text-black font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all mb-4 relative z-10 text-center"
                                >
                                    Apply for this Role
                                </Link>

                                <div className="space-y-3 relative z-10">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/share"
                                    >
                                        {copied ? (
                                            <>System Link Copied <Check className="w-4 h-4 text-[#C3EB7A]" /></>
                                        ) : (
                                            <>Share this Job <Share2 className="w-4 h-4 group-hover/share:rotate-12 transition-transform" /></>
                                        )}
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={shareOnLinkedIn}
                                            className="py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30 transition-all flex items-center justify-center gap-2 text-xs"
                                        >
                                            LinkedIn <Linkedin className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={shareOnWhatsApp}
                                            className="py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all flex items-center justify-center gap-2 text-xs"
                                        >
                                            WhatsApp <Globe2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/30 text-center mt-6 uppercase font-black tracking-widest relative z-10">MochaEase is an equal opportunity builder.</p>
                            </div>

                            <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01]">
                                <h5 className="text-xs font-black uppercase text-white/30 tracking-widest mb-4">Core Perks</h5>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <ShieldCheck className="w-4 h-4 text-[#4A90E2]" /> Premium Insurance
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <Layers className="w-4 h-4 text-[#4A90E2]" /> Equity & Ownership
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <Globe2 className="w-4 h-4 text-[#4A90E2]" /> Global Offsites
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 p-4 bg-[#050505]/80 backdrop-blur-2xl border-t border-white/10 z-[100] lg:hidden"
                    >
                        <Link
                            href={`/careers/${job.id}/apply`}
                            className="block w-full py-4 bg-[#C3EB7A] text-black font-black rounded-2xl shadow-xl text-center"
                        >
                            Apply for {job.title}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
