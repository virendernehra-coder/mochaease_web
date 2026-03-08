"use client";

import React from 'react';
import { Coffee, Store, Users, Clock, CheckCircle2, ArrowRight, TerminalSquare, Calculator, Package, Cpu, LineChart, AlertOctagon, EyeOff, Wallet, Smartphone, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import ExperienceJourney from '@/components/ExperienceJourney';
import { motion } from 'framer-motion';

// Metadata is removed here because this is a client component.

export default function CafeUseCasePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 relative overflow-hidden flex flex-col pt-32 pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C3EB7A]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#4A90E2]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Hero Section */}
            <section className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-20 z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                    <Coffee className="w-4 h-4 text-[#C3EB7A]" />
                    <span className="text-xs font-bold text-[#C3EB7A] tracking-wider uppercase">Built for Cafes & Coffee Shops</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
                    Stop pouring <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">profits</span> down the drain. <br className="hidden md:block" />
                    Start running <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">smarter.</span>
                </h1>

                <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium mb-12 leading-relaxed">
                    MochaEase is the all-in-one AI platform for cafés. We combine lightning-fast order processing, intelligent ingredient tracking, and real-time analytics to help you reduce waste and scale your coffee empire.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.4)] flex items-center justify-center gap-2 group">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A] border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all">
                        Book a Demo
                    </Link>
                </div>
            </section>

            {/* What's Holding Cafes Back - Redesigned Grid */}
            <section className="w-full max-w-7xl mx-auto px-6 py-32 z-10 relative mt-10">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="text-center mb-20 relative">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">What's Holding Your Café Back?</h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                        Running a café is more than brewing great coffee.<br />
                        Without the right systems, even the best café can struggle with:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {[
                        { title: "Staffing Chaos", desc: "Chaotic staff scheduling or payroll errors", icon: Users, color: "from-pink-500/20 to-transparent", text: "text-pink-400", border: "group-hover:border-pink-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" },
                        { title: "Financial Blind Spots", desc: "No real view of profits, losses, or wastage", icon: EyeOff, color: "from-red-500/20 to-transparent", text: "text-red-400", border: "group-hover:border-red-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]" },
                        { title: "Cash Flow Struggles", desc: "Struggling to pay salaries or manage shifts", icon: Wallet, color: "from-orange-500/20 to-transparent", text: "text-orange-400", border: "group-hover:border-orange-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]" },
                        { title: "Delivery Sync Fails", desc: "Delivery menus showing out-of-stock items", icon: Smartphone, color: "from-blue-500/20 to-transparent", text: "text-blue-400", border: "group-hover:border-blue-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
                        { title: "Growing Pains", desc: "Growing operations without losing control", icon: TrendingDown, color: "from-yellow-500/20 to-transparent", text: "text-yellow-400", border: "group-hover:border-yellow-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]" },
                        { title: "Service Bottlenecks", desc: "Manual order taking and long wait times", icon: Clock, color: "from-purple-500/20 to-transparent", text: "text-purple-400", border: "group-hover:border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" }
                    ].map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            key={i}
                            className={`relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 group ${item.border} ${item.glow}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className={`w-7 h-7 ${item.text}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/80 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center max-w-3xl mx-auto"
                >
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] mb-10 shadow-[0_0_40px_rgba(195,235,122,0.2)]">
                        <div className="px-8 py-4 rounded-full bg-[#050505] text-white font-bold text-xl md:text-2xl tracking-tight">
                            MochaEase ends the chaos. Once and for all.
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/demo" className="px-10 py-5 rounded-full bg-[#C3EB7A] text-black font-black text-xl hover:brightness-110 hover:shadow-[0_0_40px_rgba(195,235,122,0.5)] active:scale-95 transition-all flex items-center gap-3 group">
                            Book a Free Demo <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Feature Highlight */}
            <section className="w-full max-w-6xl mx-auto px-6 py-20 z-10 relative">
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[40px] border border-[#C3EB7A]/20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C3EB7A]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#C3EB7A]/10 transition-colors duration-700" />

                    <div className="md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Zero Waste.<br />Complete Control.</h2>
                        <ul className="space-y-6">
                            {[
                                "Track ingredients down to the milliliter",
                                "Automated low-stock alerts sent to suppliers",
                                "Real-time dashboards for multi-outlet visibility",
                                "Staff shift management & performance tracking"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-[#C3EB7A] shrink-0 mt-0.5" />
                                    <span className="text-lg text-white/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-white font-bold">Today's Insights (Bandung Outlet)</h4>
                            <span className="px-3 py-1 bg-[#C3EB7A]/20 text-[#C3EB7A] text-xs font-bold rounded-full">Live</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">Oat Milk Stock</p>
                                    <p className="text-white font-bold text-lg">12 Liters</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-400 text-xs mb-1 font-bold">Depleting Fast</p>
                                    <p className="text-white/50 text-xs">Reorder triggering soon</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">Bestseller Today</p>
                                    <p className="text-white font-bold text-lg">Iced Caramel Macchiato</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[#C3EB7A] text-xs font-bold">+24% vs last week</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Day-to-Day Operations Detailed Grid */}
            <section className="w-full max-w-7xl mx-auto px-6 py-32 z-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(74,144,226,0.05)_0,transparent_70%)] pointer-events-none -z-10" />

                <div className="text-center mb-20 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <TerminalSquare className="w-4 h-4 text-[#4A90E2]" />
                        <span className="text-xs font-bold text-[#4A90E2] tracking-wider uppercase">Features Overview</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Built for Your Day-to-Day Operations.</h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-4xl mx-auto font-medium">
                        MochaEase is your full-stack café & restaurant management system <br className="hidden md:block" />
                        — designed to work as hard as you do.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {/* Glowing nodes behind grid */}
                    <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#C3EB7A]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                    <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#4A90E2]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                    {/* POS & Order Management */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#C3EB7A]/50 hover:shadow-[0_0_30px_rgba(195,235,122,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C3EB7A]/10 transition-all duration-500">
                            <Calculator className="w-7 h-7 text-[#C3EB7A]" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">POS & Order Management</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Unified POS for dine-in, takeaway, and delivery", "Table view with real-time status and occupancy", "Order routing to kitchen, barista, or prep stations", "Split billing, tips tracking, and modifiers", "Offline mode for uninterrupted service"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A]/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Staff & Payroll Management */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4A90E2]/10 transition-all duration-500">
                            <Users className="w-7 h-7 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Staff & Payroll Management</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Staff attendance and biometric-ready check-in", "Smart shift scheduling with clash alerts", "Role-based access control", "Automated payroll with overtime, advances, and tips", "Multi-location staff tracking for chains", "Set Employee Shift Sales Goal", "Individual Employee Performance Report Card"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Inventory & Vendor Control */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 group relative overflow-hidden row-span-2 lg:row-span-1 xl:row-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all duration-500">
                            <Package className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Inventory & Vendor Control</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Track raw materials (coffee beans, milk, cups, etc.)", "Expiry tracking and FIFO stock usage", "Purchase orders and vendor reconciliation", "Auto alerts for low or near-expiry stock", "Ingredient-level usage reports", "AI Updates Inventory with a click of button", "Compare System Records with Physical Stock Through Weekly Inventory Audits", "Actionable Weekly Audit Reports Revealing Waste, Loss & Theft Patterns"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* AI Automation & Smart Alerts */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#C3EB7A]/50 hover:shadow-[0_0_30px_rgba(195,235,122,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all duration-500">
                            <Cpu className="w-7 h-7 text-orange-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">AI Automation & Smart Alerts</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Forecast ingredient demand based on sales trends", "Auto-suggest reorders and supplier prioritization", "Predict staff needs based on peak hours", "Alert if key items (milk, beans) are depleting too fast", "Auto-sync food delivery menus (Zomato, Swiggy, etc.) with real-time stock"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Reporting & Business Health */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.1)] transition-all duration-500 group relative overflow-hidden md:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4A90E2]/10 transition-all duration-500">
                            <LineChart className="w-7 h-7 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Reporting & Business Health</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Daily, weekly, and monthly profit & loss reports", "Visual dashboards for sales vs. targets", "Track cost of goods sold (COGS) by menu item", "Expense tracking by category (rent, wages, supplies)", "Branch performance comparison (if multi-location)"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="w-full max-w-4xl mx-auto px-6 py-20 z-10 text-center">
                <svg className="w-12 h-12 text-[#C3EB7A] mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                    "Before MochaEase, inventory was a nightmare. We'd over-order milk and under-order beans. Now AI tells me exactly when to order everything. It pays for itself in saved waste alone."
                </p>
                <div className="flex items-center justify-center gap-4">
                    <div className="font-bold text-white text-lg">Anjali</div>
                    <div className="text-[#C3EB7A] text-sm font-bold">Owner, Brew & Co.</div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="w-full relative z-20 border-t border-white/5 bg-black/50">
                <ExperienceJourney role="Cafe" hideBackButton />
            </section>

        </main>
    );
}
