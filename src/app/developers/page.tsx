'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Database, Cpu, Send, CheckCircle2, Terminal as TerminalIcon, ArrowRight, Layers, Share2 } from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';

const Terminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const allLines = [
        '> Initializing MochaEase Hub API...',
        '> AUTHENTICATED: partner_token_v2',
        '> WATCHING: order.created',
        '> WATCHING: inventory.threshold_reached',
        '> NEW EVENT: order_177308',
        '> Payload: { amount: 42.50, items: 3, location: "Cafe-01" }',
        '> SYNCING: external_delivery_platform...',
        '> SUCCESS: Event pushed to webhook [https://api.partner.io/v1]',
        '> FETCHING: ai.inventory.forecast',
        '> DATA: { suggestion: "Increase Milk supply by 15%", confidence: 0.98 }',
        '> PUSHING: supplier_portal...',
        '> READY: Awaiting next interaction.'
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setLines(prev => [...prev.slice(-10), allLines[i]]);
            i = (i + 1) % allLines.length;
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-[#0D0D0D] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 ml-4 opacity-40">
                    <TerminalIcon className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono text-white tracking-widest uppercase">MochaEase-Hub-Debug</span>
                </div>
            </div>
            <div className="p-8 font-mono text-sm min-h-[300px]">
                {lines.map((line, idx) => (
                    <motion.div
                        key={`${line}-${idx}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-2 ${line.startsWith('>') ? 'text-white/40' : line.startsWith('SUCCESS') ? 'text-[#C3EB7A]' : 'text-[#4A90E2]'}`}
                    >
                        <span className="mr-2 text-[#C3EB7A] opacity-50">$</span>
                        {line}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const PartnershipCard = ({ title, description, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="group p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:border-[#4A90E2]/30 transition-all duration-500"
    >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-transparent flex items-center justify-center mb-8">
            <Icon className="w-7 h-7 text-[#4A90E2]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed mb-6">{description}</p>
        <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-[#C3EB7A] transition-colors uppercase tracking-[0.2em]">
            Explore Docs <ArrowRight className="w-4 h-4" />
        </div>
    </motion.div>
);

export default function DevelopersPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => setFormState('success'), 2000);
    };

    return (
        <main className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#C3EB7A]/30">
            <NetworkBackground />

            {/* Top Edge Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none translate-x-1/3" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 mb-8">
                            <Cpu className="w-4 h-4 text-[#4A90E2]" />
                            <span className="text-xs font-black uppercase tracking-widest text-[#4A90E2]">Open Hub Ecosystem</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            One Hub. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">Infinite Reach.</span>
                        </h1>
                        <p className="max-w-xl text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-10">
                            Integrate with MochaEase to reach thousands of high-growth retailers. Sync orders, automate supply chains, and build native commerce experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-black font-black rounded-full hover:bg-[#C3EB7A] transition-colors">
                                Become a Partner
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                                View API Documentation
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <Terminal />
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#4A90E2]/10 rounded-full blur-[100px] -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#C3EB7A]/10 rounded-full blur-[100px] -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Integration Tracks */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Partnership Tracks</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PartnershipCard
                            title="Delivery & Order Hubs"
                            description="Sync third-party orders (Zomato, Swiggy, UberEats) directly into our KDS with native status tracking."
                            icon={Globe}
                            delay={0.1}
                        />
                        <PartnershipCard
                            title="Financial Systems"
                            description="Bridge the gap between daily transactions and head-office accounting with SAP, Xero, or Tally."
                            icon={Database}
                            delay={0.2}
                        />
                        <PartnershipCard
                            title="Supply Chain Sync"
                            description="Automate procurement by connecting supplier portals directly to our AI-powered inventory forecasts."
                            icon={Share2}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section id="partner-form" className="relative py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-12 md:p-20 rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl"
                    >
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                                <Layers className="w-4 h-4 text-white/50" />
                                <span className="text-xs font-black uppercase tracking-widest text-white/60">Partner Application</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Let's Build Together.</h2>
                            <p className="text-slate-400 text-lg">Send us a request to join the integration ecosystem.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-24 h-24 rounded-full bg-[#C3EB7A]/20 flex items-center justify-center mb-8">
                                        <CheckCircle2 className="w-12 h-12 text-[#C3EB7A]" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Request Sent</h3>
                                    <p className="text-slate-400">Our partnership team will reach out within 2 business days.</p>
                                    <button onClick={() => setFormState('idle')} className="mt-8 text-sm font-bold text-[#4A90E2] uppercase tracking-widest">Send another request</button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-4">Company Name</label>
                                        <input required className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors" placeholder="e.g. Acme Tech" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-4">Partnership Focus</label>
                                        <select className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors appearance-none">
                                            <option className="bg-[#1A1A1A]">Delivery & Ordering</option>
                                            <option className="bg-[#1A1A1A]">Accounting & Finance</option>
                                            <option className="bg-[#1A1A1A]">Supply Chain & Inventory</option>
                                            <option className="bg-[#1A1A1A]">Hardware & IoT</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-4">Business Email</label>
                                        <input required type="email" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors" placeholder="partner@company.com" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-4">Technical Lead</label>
                                        <input className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors" placeholder="Name or Title" />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-4">Brief Use Case</label>
                                        <textarea className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors h-32 resize-none" placeholder="How do you plan to integrate with MochaEase?" />
                                    </div>

                                    <div className="md:col-span-2 pt-6">
                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-5 bg-[#C3EB7A] text-black font-black text-lg rounded-2xl shadow-[0_20px_40px_rgba(195,235,122,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                        >
                                            {formState === 'submitting' ? 'Processing...' : (
                                                <>Submit Request <Send className="w-5 h-5" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#C3EB7A]/5 blur-[120px] rounded-full -z-10" />
        </main>
    );
}
