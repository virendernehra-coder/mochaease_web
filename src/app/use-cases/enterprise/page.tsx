"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Globe, Building2, Network, Database, ShieldCheck, MapPin, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseUseCasePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 relative overflow-hidden flex flex-col pt-32 pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4A90E2]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Hero Section */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-24 relative z-10 flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A90E2]/10 border border-[#4A90E2]/20 text-[#4A90E2] text-sm font-bold mb-8">
                    <Globe className="w-4 h-4" />
                    <span>Built for Global Franchises & Chains</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight">
                    One system. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-blue-500 to-indigo-400">Unlimited scale.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-white/50 max-w-3xl mb-12 font-medium leading-relaxed">
                    Deploy new outlets in minutes. Standardize menus globally while allowing local pricing. Get a real-time, consolidated headquarters view of your entire empire.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
                    <Link href="/demo" className="px-8 py-4 rounded-full bg-[#4A90E2] text-white font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(74,144,226,0.3)] flex items-center justify-center gap-2 text-lg group">
                        Talk to Enterprise Sales <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>

            {/* Problem Statements (Bento Grid) */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The High Cost of Fragmentation</h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">When you run 100+ locations, small inefficiencies compound into millions of dollars in lost revenue and operational drag.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Item 1 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A90E2]/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-[#4A90E2]/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <Database className="w-6 h-6 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Data Silos</h3>
                        <p className="text-white/50 text-sm relative z-10">Waiting 3 weeks for end-of-month reconciliations because every franchise uses a slightly different POS setup.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <Building2 className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Menu Maintenance</h3>
                        <p className="text-white/50 text-sm relative z-10">Manually updating pricing and adding new seasonal items across 250 individual store databases.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <Network className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Supply Chain Blindness</h3>
                        <p className="text-white/50 text-sm relative z-10">Central kitchens flying blind, resulting in massive over-prep waste or stockouts across satellite locations.</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <span className="text-white font-medium">MochaEase unifies the enterprise architecture.</span>
                    </div>
                </div>
            </section>

            {/* Solutions - Horizontal Scrolls */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-10 space-y-32">

                {/* Visual Section 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <div className="md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Central HQ <br className="hidden md:block" />Command Center.</h2>
                        <ul className="space-y-6">
                            {[
                                "Push master menu updates to all locations instantly",
                                "Configure region-specific pricing and taxation rules",
                                "Consolidated real-time dashboards for franchise health",
                                "Secure, role-based access for regional managers"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-[#4A90E2] shrink-0 mt-0.5" />
                                    <span className="text-lg text-white/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-white font-bold">Global Dashboard</h4>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">All Systems Operational</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">Total Sales (Today)</p>
                                    <p className="text-white font-bold text-2xl">$1.24M</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-400 text-xs mb-1 font-bold">+12.4% vs Last Week</p>
                                    <p className="text-white/50 text-xs">Across 324 locations</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <p className="text-white/50 text-xs mb-3 uppercase tracking-wider font-bold">Regional Performance</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-24 text-white/70">North America</div>
                                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#4A90E2] w-[85%] rounded-full" />
                                        </div>
                                        <div className="text-white font-bold">$780k</div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-24 text-white/70">EMEA</div>
                                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-400 w-[60%] rounded-full" />
                                        </div>
                                        <div className="text-white font-bold">$460k</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Section 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
                    <div className="md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Central Kitchen & <br className="hidden md:block" />Supply Routing.</h2>
                        <ul className="space-y-6">
                            {[
                                "Consolidated demand forecasting across branches",
                                "Automated dispatch routes from central kitchen to outlets",
                                "Internal transfer tracking (Warehouse to Store)",
                                "Waste tracking across the entire supply chain"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-lg text-white/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center text-orange-400 font-bold border border-orange-500/30">CK</div>
                                <h4 className="text-white font-bold">Central Commissary</h4>
                            </div>
                            <span className="px-3 py-1 bg-[#4A90E2]/20 text-[#4A90E2] text-xs font-bold rounded-full">Dispatching</span>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-white/50" />
                                    <span className="text-sm font-medium text-white">Route 1: Downtown Hub</span>
                                </div>
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Delivered (5 Outlets)</span>
                            </div>
                            <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 flex items-center justify-between relative overflow-hidden">
                                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                                <div className="flex items-center gap-3 relative z-10">
                                    <MapPin className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-bold text-white">Route 2: Suburban Loop</span>
                                </div>
                                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded relative z-10">In Transit (ETA: 14m)</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-white/50" />
                                    <span className="text-sm font-medium text-white">Route 3: Airport Terminal</span>
                                </div>
                                <span className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded">Queued for 06:00 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* All Features Layout */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Building2 className="w-4 h-4 text-[#4A90E2]" />
                        <span className="text-xs font-bold text-[#4A90E2] tracking-wider uppercase">Enterprise Capabilities</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Engineered for Scale.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {/* Glowing nodes behind grid */}
                    <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#4A90E2]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                    {/* Data & APIs */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4A90E2]/10 transition-all duration-500">
                            <Database className="w-7 h-7 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Open API & Integrations</h3>
                        <ul className="space-y-4 relative z-10">
                            {["REST API access to push/pull catalog, inventory, and sales data", "Webhooks for real-time order routing to custom ERPs", "Pre-built connectors for SAP, NetSuite, and Oracle", "Custom SSO (Single Sign-On) implementation"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Financials */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-500 group relative overflow-hidden row-span-2 lg:row-span-1 xl:row-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-500/10 transition-all duration-500">
                            <BarChart3 className="w-7 h-7 text-green-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Franchise Financials</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Automated percentage-based royalty calculations", "Consolidated P&L statements across the entire network", "Drill-down gross margin analysis by category/item", "Automated payouts directly to franchisee bank accounts", "Audit logs and variance reporting", "Multi-currency and multi-tax rate support for cross-border expansion"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Security */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
                            <ShieldCheck className="w-7 h-7 text-indigo-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Enterprise Security</h3>
                        <ul className="space-y-4 relative z-10">
                            {["SOC2 Type II Compliant infrastructure", "Strict Role-Based Access Controls (RBAC)", "End-to-end encryption for all transaction data", "Custom SLAs and dedicated Technical Account Managers (TAMs)"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* CTA/Testimonial */}
            <section className="w-full max-w-4xl mx-auto px-6 py-20 z-10 text-center">
                <svg className="w-12 h-12 text-[#4A90E2] mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                    "When we expanded to 120 locations across 3 countries, our old system broke under the data weight. MochaEase handles our global daily transactions without breaking a sweat, and Headquarters gets real-time numbers."
                </p>
                <div className="flex items-center justify-center gap-4">
                    <div className="font-bold text-white text-lg">David Chen</div>
                    <div className="text-[#4A90E2] text-sm font-bold">CTO, Global Bite Group</div>
                </div>
            </section>

        </main>
    );
}
