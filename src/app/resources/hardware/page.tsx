'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu, TabletSmartphone, MonitorDot,
    Zap, BadgeCheck, Cloud, Headset,
    CreditCard, ArrowRight, ShieldCheck,
    Smartphone, Laptop
} from 'lucide-react';
import Link from 'next/link';
import NetworkBackground from '@/components/NetworkBackground';
import Chatbot from '@/components/Chatbot';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function HardwarePage() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-[#C3EB7A]/30 font-sans relative overflow-hidden">
            <NetworkBackground />

            {/* Top Glow */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/20 via-[#050505]/40 to-transparent pointer-events-none -z-0" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-2relative z-10">
                <Breadcrumbs 
                    items={[
                        { label: 'Resources' },
                        { label: 'Hardware' }
                    ]} 
                    className="mb-8"
                />
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mb-24 relative"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <Cpu className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-sm font-medium text-white/80">100% Hardware Agnostic</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                        Run on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Any Device.</span><br />
                        Zero Locked Hardware.
                    </h1>

                    <p className="text-xl text-white/60 mb-10 leading-relaxed font-medium">
                        Whether you want to bring your existing iPads, use cheap Android tablets, run on Windows terminals, or buy sleek new registers from us—MochaEase flows like butter everywhere.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/demo" className="px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] flex items-center gap-2">
                            Book a Demo <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="#buy-new" className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 hover:scale-105 transition-all">
                            View Hardware Packages
                        </Link>
                    </div>
                </motion.div>

                {/* Platforms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="bg-[#0A0A0A] p-8 rounded-[23px] h-full flex flex-col relative">
                            <TabletSmartphone className="w-12 h-12 text-[#4A90E2] mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-3">iOS & Android Apps</h3>
                            <p className="text-white/50 mb-6">Native applications designed for maximum speed and offline resilience on iPads, Android tablets, and mobile phones.</p>
                            <div className="mt-auto space-y-2">
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> iPad Pro, Air, & Mini</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> Galaxy Tabs & Lenovo</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> iPhone & Android Mobile POS</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/20 to-emerald-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="bg-[#0A0A0A] p-8 rounded-[23px] h-full flex flex-col relative">
                            <MonitorDot className="w-12 h-12 text-[#C3EB7A] mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-3">Windows & macOS</h3>
                            <p className="text-white/50 mb-6">Turn your existing desktop setups into powerful Enterprise POS terminals or back-office management hubs via browser or native wrapper.</p>
                            <div className="mt-auto space-y-2">
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> Windows 10/11 Touch Displays</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> MacBooks & iMacs</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> Legacy Legacy PC Registers</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-orange-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="bg-[#0A0A0A] p-8 rounded-[23px] h-full flex flex-col relative">
                            <CreditCard className="w-12 h-12 text-pink-500 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-3">Peripherals & Card Readers</h3>
                            <p className="text-white/50 mb-6">Seamless integration with over 40+ receipt printers, cash drawers, scanners, and global payment processors (Stripe, Square, Adyen).</p>
                            <div className="mt-auto space-y-2">
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> Bluetooth & LAN Printers (Epson/Star)</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> USB & Wireless Scanners</div>
                                <div className="flex items-center gap-2 text-sm text-white/70"><BadgeCheck className="w-4 h-4 text-[#C3EB7A]" /> Tap-to-Pay (iPhone/Android)</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Two Paths Section */}
                <div className="space-y-6 mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-white mb-4">You have ultimate choice.</h2>
                        <p className="text-white/50 text-xl font-medium">Unlike legacy players, we never force you to buy expensive, proprietary hardware clunkers.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* BYOD */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Smartphone className="w-64 h-64 text-white -rotate-12 translate-x-12 -translate-y-12" />
                            </div>
                            <div className="relative z-10 w-3/4">
                                <div className="w-14 h-14 bg-[#4A90E2]/20 rounded-2xl flex items-center justify-center border border-[#4A90E2]/30 mb-8">
                                    <Cloud className="w-7 h-7 text-[#4A90E2]" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Bring Your Own Device (BYOD)</h3>
                                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                    Already have iPads from your previous POS system? Perfect. Factory reset them, download MochaEase from the App Store, log in, and you are taking orders in 45 seconds. Zero switching costs.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-white/80">
                                        <ShieldCheck className="w-6 h-6 text-[#4A90E2] shrink-0" />
                                        <span>Works with 95% of existing modern receipt printers (Star Micronics, Epson, Munbyn).</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white/80">
                                        <ShieldCheck className="w-6 h-6 text-[#4A90E2] shrink-0" />
                                        <span>No restrictive hardware contracts or leasing fees. </span>
                                    </li>
                                </ul>
                                <button className="text-[#4A90E2] font-bold hover:text-white transition-colors flex items-center gap-2">
                                    Check compatibility guide <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Buy New (Managed) */}
                        <div id="buy-new" className="bg-gradient-to-br from-[#1A2E1A] to-[#0A1A0A] border border-[#C3EB7A]/20 rounded-3xl p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Laptop className="w-64 h-64 text-[#C3EB7A] rotate-12 translate-x-12 -translate-y-12" />
                            </div>
                            <div className="relative z-10 w-3/4">
                                <div className="w-14 h-14 bg-[#C3EB7A]/20 rounded-2xl flex items-center justify-center border border-[#C3EB7A]/30 mb-8">
                                    <Zap className="w-7 h-7 text-[#C3EB7A]" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Turnkey Hardware Kits</h3>
                                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                    Need a sleek, fully engineered setup for your new flagship outlet? Our hardware team ships pre-configured, beautiful Android registers and dual-screen displays directly to your door.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3 text-white/80">
                                        <BadgeCheck className="w-6 h-6 text-[#C3EB7A] shrink-0" />
                                        <span>Pre-loaded software. Plug into the wall and start selling immediately.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-white/80">
                                        <Headset className="w-6 h-6 text-[#C3EB7A] shrink-0" />
                                        <span>24/7 priority hardware replacement and remote diagnostic support.</span>
                                    </li>
                                </ul>
                                <button className="text-[#C3EB7A] font-bold hover:text-white transition-colors flex items-center gap-2">
                                    Talk to Sales for custom quote <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="bg-gradient-to-r from-[#4A90E2]/20 to-[#C3EB7A]/20 rounded-3xl p-[1px] relative overflow-hidden mt-32">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
                    <div className="bg-[#050505] rounded-3xl p-12 lg:p-20 text-center relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2]/20 to-[#C3EB7A]/20 rounded-full blur-2xl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Stop paying hardware hostage fees.</h2>
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                            Book a quick 10-minute discovery call to see if your current setup is compatible (it probably is), or let us build you a custom hardware bundle.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg">
                                Talk to Hardware Sales <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            <Chatbot />
        </main>
    );
}
