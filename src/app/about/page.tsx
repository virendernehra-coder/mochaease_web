'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, Users } from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const teamMembers = [
        { name: "Virender Nehra", role: "Co-Founder & CEO", desc: "Former cafe owner turned builder, driving the practical, AI-powered vision of MochaEase.", initials: "VN", color: "from-[#4A90E2]" },
        { name: "Avina Kantaatmadja", role: "Co-Founder & COO", desc: "Serial entrepreneur obsessed with building smart systems that kill manual spreadsheets.", initials: "AK", color: "from-[#C3EB7A]" },
        { name: "Ritwik Sondhi", role: "Creative Director", desc: "Filmmaker with 13+ years transforming products into compelling, human-centered stories.", initials: "RS", color: "from-purple-500" }
    ];

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />

            {/* Top Edge Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none translate-x-1/3" />

            {/* Hero Section */}
            <section className="relative w-full max-w-5xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center text-center z-10">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
                    <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-transparent border border-white/10 mb-8 backdrop-blur-sm">
                        <Globe className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-xs font-bold text-white tracking-wide uppercase">Our Mission</span>
                    </motion.div>

                    <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1]">
                        Making Business <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">Effortless.</span>
                    </motion.h1>

                    <motion.p variants={fadeUpVariant} className="max-w-2xl text-lg md:text-xl text-white/70 font-medium leading-relaxed">
                        We believe that all businesses, from local entrepreneurs to large chains, deserve reliable, smart tools that provide the power to manage operations with confidence, clarity, and ease.
                    </motion.p>
                </motion.div>
            </section>

            {/* The Story Grid */}
            <section className="w-full max-w-6xl mx-auto px-6 py-20 z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <motion.div variants={fadeUpVariant} className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3EB7A]/5 blur-[80px] rounded-full group-hover:bg-[#C3EB7A]/10 transition-colors duration-500" />
                        <Users className="w-10 h-10 text-[#C3EB7A] mb-8" />
                        <h3 className="text-3xl font-black text-white mb-4">Built for Founders,<br />by Founders.</h3>
                        <p className="text-white/60 leading-relaxed">
                            The idea for MochaEase was born when our founder, Virender Nehra, opened a coffee shop and experienced firsthand how outdated, manual, and disconnected existing POS systems were. We aren't just software developers; we are builders, baristas, and business nerds designing for the real world.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-10 relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A90E2]/5 blur-[80px] rounded-full group-hover:bg-[#4A90E2]/10 transition-colors duration-500" />
                        <TrendingUp className="w-10 h-10 text-[#4A90E2] mb-8" />
                        <h3 className="text-3xl font-black text-white mb-4">Revolutionizing<br />Commerce.</h3>
                        <p className="text-white/60 leading-relaxed">
                            We are building the future of business infrastructure, starting in Asia and scaling globally. Our focus is on empowering millions of entrepreneurs in developing markets with global-brand-level intelligence so they can run faster and smarter every single day.
                        </p>
                    </motion.div>

                </motion.div>
            </section>

            {/* Team Section */}
            <section className="w-full max-w-6xl mx-auto px-6 py-32 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Meet the <span className="text-[#C3EB7A]">Leadership</span></h2>
                </div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, i) => (
                        <motion.div key={i} variants={fadeUpVariant} className="group relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/10 to-transparent hover:from-white/30 transition-colors duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[32px] -z-10" />
                            <div className="p-8 h-full flex flex-col items-center text-center">
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${member.color} to-white/10 p-[2px] mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-black text-white/80">{member.initials}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-[#C3EB7A] text-sm font-bold mb-4">{member.role}</p>
                                <p className="text-white/50 text-sm leading-relaxed">{member.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>


        </main>
    );
}
