'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    MapPin,
    Briefcase,
    ChevronRight,
    Search,
    Sparkles,
    ShieldCheck,
    Cpu,
    Zap,
    Globe2,
    Heart,
    Terminal as TerminalIcon,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';

// --- Types ---

type Job = {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    level: string;
};

const VALUES = [
    { icon: ShieldCheck, title: "Radical Reliability", description: "Our systems power real-world businesses. We value stability and precision over speed and hype." },
    { icon: Cpu, title: "AI-Native Core", description: "We don't 'add' AI. We build intelligence into the very fabric of global commerce." },
    { icon: Heart, title: "User Obsession", description: "Every line of code should reduce friction for a merchant half way across the world." }
];

const PERKS = [
    { icon: Globe2, title: "Remote-First", label: "Work from anywhere" },
    { icon: Zap, title: "Learning Sync", label: "$2k Annual Budget" },
    { icon: Users, title: "Equity Plan", label: "Be a true owner" },
    { icon: Sparkles, title: "Health & Wellness", label: "Premium Coverage" }
];

// --- Components ---

const FilterSelect = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2 min-w-[160px]">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">{label}</label>
        <div className="relative group">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C3EB7A]/50 transition-all appearance-none cursor-pointer"
            >
                <option value="All" className="bg-[#0D0D0D]">All {label}s</option>
                {options.map(opt => (
                    <option key={opt} value={opt} className="bg-[#0D0D0D]">{opt}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
        </div>
    </div>
);

const JobCard = ({ job, index }: { job: Job, index: number }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative p-6 md:p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden"
    >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 text-[10px] font-bold text-[#4A90E2] uppercase tracking-wider">
                        {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        {job.level}
                    </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#C3EB7A] transition-colors">
                    {job.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-white/40">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.type}
                    </div>
                </div>
            </div>
            <Link href={`/careers/${job.id}`} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-[#C3EB7A] hover:text-black transition-all flex items-center gap-2 group/btn">
                Apply Now <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

export default function CareersClient({ initialJobs }: { initialJobs: Job[] }) {
    const [deptFilter, setDeptFilter] = useState('All');
    const [countryFilter, setCountryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredJobs = useMemo(() => {
        return initialJobs.filter(job => {
            const matchesDept = deptFilter === 'All' || job.department === deptFilter;
            const matchesCountry = countryFilter === 'All' || job.location.includes(countryFilter);
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDept && matchesCountry && matchesSearch;
        });
    }, [initialJobs, deptFilter, countryFilter, searchQuery]);

    const departments = Array.from(new Set(initialJobs.map(j => j.department)));
    const countries = Array.from(new Set(initialJobs.map(j => {
        if (j.location.includes('Indonesia')) return 'Indonesia';
        if (j.location.includes('India')) return 'India';
        if (j.location.includes('Singapore')) return 'Singapore';
        if (j.location.includes('UAE') || j.location.includes('Dubai')) return 'UAE';
        if (j.location.includes('Remote') || j.location.includes('Global')) return 'Remote';
        return j.location;
    })));

    return (
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 overflow-x-hidden">
            <NetworkBackground />

            {/* Top Edge Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none translate-x-1/3" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 mb-8">
                            <Sparkles className="w-4 h-4 text-[#C3EB7A]" />
                            <span className="text-xs font-black uppercase tracking-widest text-[#C3EB7A]">We're Hiring Globally</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            Join the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">Global Mission.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
                            MochaEase is scaling fast. We're looking for architects, designers, and visionaries to help us define the next generation of commerce infrastructure.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C3EB7A]/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#4A90E2]/5 blur-[120px] rounded-full -z-10 animate-pulse" />
            </section>

            {/* Values Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {VALUES.map((val, i) => (
                        <motion.div
                            key={val.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#C3EB7A]/10 flex items-center justify-center mb-6">
                                <val.icon className="w-6 h-6 text-[#C3EB7A]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{val.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Jobs Hub */}
            <section className="relative py-24 px-4 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Open Roles</h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] rounded-full mb-8" />
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#C3EB7A] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search for your next mission..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#C3EB7A]/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <FilterSelect
                                label="Department"
                                options={departments}
                                value={deptFilter}
                                onChange={setDeptFilter}
                            />
                            <FilterSelect
                                label="Country"
                                options={countries}
                                value={countryFilter}
                                onChange={setCountryFilter}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job, i) => (
                                    <JobCard key={job.id} job={job} index={i} />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-20 text-center rounded-[3rem] border border-dashed border-white/10"
                                >
                                    <Users className="w-12 h-12 text-white/10 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold mb-2">No roles found matching your filters</h3>
                                    <p className="text-slate-400 mb-8">But don't let that stop you. We're always looking for geniuses.</p>
                                    <Link
                                        href="/contact"
                                        className="px-8 py-4 bg-[#C3EB7A] text-black font-black rounded-full hover:brightness-110 active:scale-95 transition-all inline-block"
                                    >
                                        Send us an Open Pitch
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Perks Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PERKS.map((perk, i) => (
                            <motion.div
                                key={perk.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white/5 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <perk.icon className="w-7 h-7 text-[#C3EB7A]" />
                                </div>
                                <h4 className="text-lg font-bold mb-1">{perk.title}</h4>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{perk.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-4 overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-[#4A90E2] to-[#C3EB7A] text-center text-black relative group"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] tracking-tighter">
                            The Future won't <br /> build itself.
                        </h2>
                        <p className="text-lg font-bold mb-10 opacity-80">Ready to do the best work of your life?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-10 py-5 bg-black text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                                View All Roles <ArrowUpRight className="w-5 h-5" />
                            </button>
                            <button className="px-10 py-5 bg-white/20 backdrop-blur-md text-black font-black border border-black/10 rounded-full hover:bg-white/40 transition-all">
                                Talk to a MochaEasean
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C3EB7A]/20 blur-[150px] rounded-full -z-10" />
            </section>
        </main>
    );
}
