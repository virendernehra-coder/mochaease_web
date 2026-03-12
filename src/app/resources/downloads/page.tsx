'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Download, Smartphone, Tablet, BarChart3, ShoppingCart,
    Shield, Zap, ArrowRight, CheckCircle2, Monitor,
    Wifi, Bell, Users, Package, Receipt, ChevronRight,
    Clock, Globe
} from 'lucide-react';
import Link from 'next/link';
import NetworkBackground from '@/components/NetworkBackground';
import Chatbot from '@/components/Chatbot';
import Breadcrumbs from '@/components/Breadcrumbs';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const BACKOFFICE_FEATURES = [
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Real-Time Analytics', desc: 'Live dashboards for sales, inventory, and staff performance across all outlets.' },
    { icon: <Package className="w-5 h-5" />, title: 'Inventory Management', desc: 'AI-powered stock tracking with automated low-level alerts and purchase orders.' },
    { icon: <Users className="w-5 h-5" />, title: 'Staff & HR', desc: 'Manage shifts, attendance, payroll calculations, and employee performance scores.' },
    { icon: <Bell className="w-5 h-5" />, title: 'Smart Notifications', desc: 'Get instant alerts for low stock, high void rates, overtime, and anomalies.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Multi-Outlet Control', desc: 'Manage menus, pricing, and promotions across all locations from one place.' },
    { icon: <Receipt className="w-5 h-5" />, title: 'Expense Tracking', desc: 'Track vendor payments, generate invoices, and manage your complete P&L.' },
];

const CASHIER_FEATURES = [
    { icon: <ShoppingCart className="w-5 h-5" />, title: 'Lightning-Fast Billing', desc: 'Process orders in under 3 seconds with intuitive touch-optimized interface.' },
    { icon: <Wifi className="w-5 h-5" />, title: '100% Offline Mode', desc: 'Never lose a sale — works completely offline and auto-syncs when reconnected.' },
    { icon: <Receipt className="w-5 h-5" />, title: 'Smart Receipts', desc: 'Print thermal receipts via Bluetooth/LAN or send digital receipts via WhatsApp.' },
    { icon: <Monitor className="w-5 h-5" />, title: 'KDS Integration', desc: 'Orders flow directly to kitchen display screens for seamless preparation.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Secure Access', desc: 'Role-based permissions with biometric login and shift-based cash management.' },
    { icon: <Clock className="w-5 h-5" />, title: 'Shift Management', desc: 'Clock in/out, track breaks, and hand over shifts with automated cash reconciliation.' },
];

function PlayStoreBadge({ href }: { href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-bold rounded-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] group"
        >
            {/* Google Play SVG Icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4" />
                <path d="M17.556 8.237L5.126.758a1.003 1.003 0 00-1.517 1.056l9.184 10.18 4.763-3.757z" fill="#34A853" />
                <path d="M17.556 15.763l-4.763-3.757-9.184 10.18a1.003 1.003 0 001.517 1.056l12.43-7.479z" fill="#FBBC04" />
                <path d="M20.997 12c0-.37-.148-.74-.444-.998l-3.007-1.765-5.753 4.757 5.753 4.757 3.007-1.765c.296-.258.444-.629.444-.998v-3.988z" fill="#EA4335" />
            </svg>
            <div className="flex flex-col">
                <span className="text-[10px] font-medium text-black/60 leading-none uppercase tracking-wider">Get it on</span>
                <span className="text-base font-black leading-tight tracking-tight">Google Play</span>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        </a>
    );
}

function AppStoreBadge() {
    return (
        <div className="relative inline-flex items-center gap-3 px-6 py-3.5 bg-white/10 text-white/50 font-bold rounded-2xl border border-white/10 cursor-default group">
            {/* Apple SVG Icon */}
            <svg className="w-7 h-7 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 13.974c0-3.187 2.651-4.755 2.766-4.832-1.503-2.147-3.834-2.435-4.664-2.47-1.956-.192-3.824 1.134-4.82 1.134-1.006 0-2.541-1.11-4.14-1.08-2.071.028-3.987 1.187-5.048 3.011-2.158 3.665-.552 9.074 1.545 12.046 1.026 1.455 2.245 3.1 3.82 3.042 1.517-.058 2.091-.968 3.916-.968 1.815 0 2.341.968 3.935.94 1.634-.03 2.668-1.488 3.684-2.923 1.173-1.674 1.656-3.296 1.674-3.376-.037-.015-3.168-1.189-3.168-4.524zm-2.73-8.814c.83-.984 1.385-2.348 1.233-3.71-.143-.021-.295-.032-.442-.032-1.39 0-2.887.65-3.774 1.696-.78.916-1.385 2.313-1.215 3.66 1.52.115 2.97-.565 3.847-1.614z" />
            </svg>
            <div className="flex flex-col">
                <span className="text-[10px] font-medium text-white/30 leading-none uppercase tracking-wider">Coming Soon on</span>
                <span className="text-base font-black leading-tight tracking-tight">App Store</span>
            </div>
            <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#4A90E2] text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(74,144,226,0.4)]">
                Soon
            </div>
        </div>
    );
}

export default function DownloadsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-[#C3EB7A]/30 font-sans relative overflow-hidden">
            <NetworkBackground />

            {/* Top Glow */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C3EB7A]/15 via-[#050505]/40 to-transparent pointer-events-none -z-0" />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-2relative z-10">
                <Breadcrumbs 
                    items={[
                        { label: 'Resources' },
                        { label: 'Downloads' }
                    ]} 
                    className="mb-8"
                />

                {/* ─── HERO ─── */}
                <motion.div
                    initial="hidden" animate="visible" variants={stagger}
                    className="text-center max-w-4xl mx-auto mb-28 relative"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <Download className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-sm font-medium text-white/80">Download MochaEase Apps</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                        Your Business in <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">Your Pocket.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl text-white/60 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                        Two purpose-built apps, one powerful ecosystem. The <strong className="text-white">Backoffice</strong> app gives owners total control, while the <strong className="text-white">Cashier</strong> app powers lightning-fast front-of-house billing.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 font-medium">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C3EB7A]" /> Free to Download</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C3EB7A]" /> Works Offline</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C3EB7A]" /> No Ads</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C3EB7A]" /> Enterprise-Grade Security</div>
                    </motion.div>
                </motion.div>

                {/* ─── APP 1: BACKOFFICE ─── */}
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
                    className="mb-32"
                >
                    <motion.div variants={fadeUp} className="relative p-[1px] rounded-[40px] bg-gradient-to-br from-[#C3EB7A]/40 via-white/5 to-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[40px]" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3EB7A]/8 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A90E2]/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="p-8 md:p-14 lg:p-20">
                            {/* App Header */}
                            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-16">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[#C3EB7A] text-xs font-bold uppercase tracking-wider mb-6">
                                        <BarChart3 className="w-3.5 h-3.5" /> For Business Owners & Managers
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                        MochaEase <span className="text-[#C3EB7A]">Backoffice</span>
                                    </h2>
                                    <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                                        The command center for your entire business. Monitor real-time sales, manage inventory across outlets, track staff performance, control expenses, and make data-driven decisions — all from your phone or tablet.
                                    </p>

                                    {/* Download Badges */}
                                    <div className="flex flex-wrap gap-4">
                                        <PlayStoreBadge href="https://play.google.com/store/apps/details?id=com.mycompany.mochaease&pcampaignid=web_share" />
                                        <AppStoreBadge />
                                    </div>
                                </div>

                                {/* App Preview Illustration */}
                                <div className="w-full lg:w-[320px] shrink-0">
                                    <div className="relative mx-auto w-[220px] h-[440px] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] rounded-[36px] border-2 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                                        {/* Phone notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
                                        {/* Screen content */}
                                        <div className="absolute inset-3 top-8 rounded-[24px] bg-gradient-to-b from-[#111] to-[#0A0A0A] overflow-hidden">
                                            <div className="p-4 space-y-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="text-[10px] font-bold text-white/80">Dashboard</div>
                                                    <div className="w-6 h-6 rounded-full bg-[#C3EB7A]/20 flex items-center justify-center">
                                                        <Bell className="w-3 h-3 text-[#C3EB7A]" />
                                                    </div>
                                                </div>
                                                {/* Revenue card */}
                                                <div className="bg-gradient-to-r from-[#C3EB7A]/10 to-transparent rounded-xl p-3 border border-[#C3EB7A]/20">
                                                    <div className="text-[8px] text-white/50 uppercase tracking-wider">Today&apos;s Revenue</div>
                                                    <div className="text-lg font-black text-[#C3EB7A]">₹42,850</div>
                                                    <div className="text-[8px] text-emerald-400">↑ 12% vs yesterday</div>
                                                </div>
                                                {/* Mini cards */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                                                        <div className="text-[7px] text-white/40">Orders</div>
                                                        <div className="text-sm font-bold text-white">147</div>
                                                    </div>
                                                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                                                        <div className="text-[7px] text-white/40">Avg Bill</div>
                                                        <div className="text-sm font-bold text-white">₹291</div>
                                                    </div>
                                                </div>
                                                {/* Chart bars */}
                                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                                    <div className="text-[7px] text-white/40 mb-2">Weekly Trend</div>
                                                    <div className="flex items-end gap-1.5 h-12">
                                                        {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
                                                            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, #C3EB7A40, #C3EB7A${Math.min(h + 20, 99)})` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Staff row */}
                                                <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex items-center gap-2">
                                                    <Users className="w-3 h-3 text-[#4A90E2]" />
                                                    <div className="text-[8px] text-white/60">8 staff clocked in</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {BACKOFFICE_FEATURES.map((f, i) => (
                                    <motion.div key={i} variants={fadeUp} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C3EB7A]/20 hover:bg-white/[0.06] transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 flex items-center justify-center text-[#C3EB7A] mb-4 group-hover:scale-110 transition-transform">
                                            {f.icon}
                                        </div>
                                        <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* ─── APP 2: CASHIER ─── */}
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
                    className="mb-32"
                >
                    <motion.div variants={fadeUp} className="relative p-[1px] rounded-[40px] bg-gradient-to-br from-[#4A90E2]/40 via-white/5 to-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-[#0A0A0A] -z-10 rounded-[40px]" />
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4A90E2]/8 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="p-8 md:p-14 lg:p-20">
                            {/* App Header */}
                            <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-start mb-16">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 text-[#4A90E2] text-xs font-bold uppercase tracking-wider mb-6">
                                        <Zap className="w-3.5 h-3.5" /> For Cashiers & Front-of-House
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                        MochaEase <span className="text-[#4A90E2]">Cashier</span>
                                    </h2>
                                    <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                                        Purpose-built for speed. Your front-of-house staff can take orders, process payments, print receipts, and manage tables — even without internet. Designed for tablets and touch-screen terminals.
                                    </p>

                                    {/* Download Badges */}
                                    <div className="flex flex-wrap gap-4">
                                        <PlayStoreBadge href="https://play.google.com/store/apps/details?id=com.mochaease.cashier&pcampaignid=web_share" />
                                        <AppStoreBadge />
                                    </div>
                                </div>

                                {/* Cashier App Preview */}
                                <div className="w-full lg:w-[380px] shrink-0">
                                    <div className="relative mx-auto w-[340px] h-[240px] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] rounded-[20px] border-2 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                                        {/* Tablet screen */}
                                        <div className="absolute inset-2 rounded-[14px] bg-gradient-to-b from-[#111] to-[#0A0A0A] overflow-hidden">
                                            <div className="p-3 h-full flex gap-2">
                                                {/* Menu grid */}
                                                <div className="flex-1 space-y-1.5">
                                                    <div className="text-[8px] font-bold text-white/60 uppercase tracking-wider mb-1">Menu</div>
                                                    <div className="grid grid-cols-3 gap-1">
                                                        {['Latte', 'Mocha', 'Espresso', 'Cappuccino', 'Cold Brew', 'Matcha', 'Croissant', 'Muffin', 'Bagel'].map((item, i) => (
                                                            <div key={i} className={`rounded-lg p-1.5 text-center border ${i === 1 ? 'bg-[#4A90E2]/20 border-[#4A90E2]/40' : 'bg-white/5 border-white/5'}`}>
                                                                <div className="text-[7px] font-bold text-white/80 truncate">{item}</div>
                                                                <div className="text-[6px] text-white/40">₹{(i + 1) * 45 + 100}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Cart sidebar */}
                                                <div className="w-[90px] bg-white/5 rounded-lg border border-white/5 p-2 flex flex-col">
                                                    <div className="text-[7px] font-bold text-white/50 uppercase mb-1">Order #47</div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex justify-between text-[6px] text-white/70"><span>1× Latte</span><span>₹190</span></div>
                                                        <div className="flex justify-between text-[6px] text-white/70"><span>2× Mocha</span><span>₹580</span></div>
                                                        <div className="flex justify-between text-[6px] text-white/70"><span>1× Muffin</span><span>₹145</span></div>
                                                    </div>
                                                    <div className="border-t border-white/10 pt-1 mt-1">
                                                        <div className="flex justify-between text-[7px] font-bold text-white"><span>Total</span><span>₹915</span></div>
                                                    </div>
                                                    <div className="mt-1.5 bg-[#C3EB7A] rounded-md py-1 text-center text-[7px] font-black text-black">
                                                        Pay →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-white/30 mt-4 font-medium">Optimized for tablets & touch terminals</p>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {CASHIER_FEATURES.map((f, i) => (
                                    <motion.div key={i} variants={fadeUp} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#4A90E2]/20 hover:bg-white/[0.06] transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-xl bg-[#4A90E2]/10 border border-[#4A90E2]/20 flex items-center justify-center text-[#4A90E2] mb-4 group-hover:scale-110 transition-transform">
                                            {f.icon}
                                        </div>
                                        <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* ─── SYSTEM REQUIREMENTS ─── */}
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                    className="mb-32"
                >
                    <motion.div variants={fadeUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">System Requirements</h2>
                        <p className="text-lg text-white/50">Runs on virtually any modern device.</p>
                    </motion.div>

                    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Android */}
                        <motion.div variants={fadeUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#C3EB7A]/30 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 flex items-center justify-center">
                                    <Smartphone className="w-7 h-7 text-[#C3EB7A]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Android</h3>
                                    <p className="text-sm text-white/50">Available Now</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Android 8.0 (Oreo) or higher',
                                    'Minimum 2GB RAM',
                                    '100MB free storage',
                                    'Works on phones & tablets',
                                    'Compatible with Bluetooth printers',
                                ].map((req, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                        <CheckCircle2 className="w-4 h-4 text-[#C3EB7A] shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* iOS */}
                        <motion.div variants={fadeUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#4A90E2]/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-[#4A90E2]/20 text-[#4A90E2] text-[10px] font-bold rounded-full border border-[#4A90E2]/30">
                                Coming Soon
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#4A90E2]/10 border border-[#4A90E2]/20 flex items-center justify-center">
                                    <Tablet className="w-7 h-7 text-[#4A90E2]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">iOS</h3>
                                    <p className="text-sm text-white/50">Coming Soon</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'iOS 15.0 or higher',
                                    'iPhone 8 and later',
                                    'iPad (6th generation) and later',
                                    'iPad Pro, Air & Mini supported',
                                    'Compatible with AirPrint & BT printers',
                                ].map((req, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                        <CheckCircle2 className="w-4 h-4 text-[#4A90E2] shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </motion.section>

                {/* ─── BOTTOM CTA ─── */}
                <div className="bg-gradient-to-r from-[#4A90E2]/20 to-[#C3EB7A]/20 rounded-3xl p-[1px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
                    <div className="bg-[#050505] rounded-3xl p-12 lg:p-20 text-center relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2]/20 to-[#C3EB7A]/20 rounded-full blur-2xl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Need Help Getting Started?</h2>
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                            Our team will walk you through the setup, configure your menu, and have you taking orders in under 24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg shadow-[0_0_30px_rgba(195,235,122,0.3)]">
                                Book a Free Demo <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="/support" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 hover:scale-105 transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            <Chatbot />
        </main>
    );
}
