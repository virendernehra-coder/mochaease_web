"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Tags, ShoppingBag, Shirt, Gift, UserCheck, Smartphone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ExperienceJourney from '@/components/ExperienceJourney';

export default function FashionUseCasePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 relative overflow-hidden flex flex-col pt-32 pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Hero Section */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-24 relative z-10 flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-bold mb-8">
                    <Tags className="w-4 h-4" />
                    <span>Designed for Retail & Boutiques</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight">
                    Sync <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-[#4A90E2]">offline</span> <br />
                    with online.
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-white/50 max-w-3xl mb-12 font-medium leading-relaxed">
                    Unify your physical boutique and e-commerce store. Manage unlimited variants, launch loyalty programs, and check out customers from anywhere on the floor.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
                    <Link href="/register" className="px-8 py-4 rounded-full bg-pink-400 text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 text-lg group">
                        Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/demo" className="px-8 py-4 rounded-full bg-white/5 text-white font-bold hover:bg-white/10 hover:border-white/20 border border-white/10 transition-all flex items-center justify-center text-lg">
                        Book a Demo
                    </Link>
                </motion.div>
            </section>

            {/* Problem Statements (Bento Grid) */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">What's Holding Your Boutique Back?</h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">Retail is detail. If your systems are siloed, you're losing customers to out-of-stock errors and slow checkout.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Item 1 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-pink-500/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <ShoppingBag className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Overselling Online</h3>
                        <p className="text-white/50 text-sm relative z-10">You sold the last dress in-store, but it's still available on your Shopify. Queue the angry customer emails.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <Shirt className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Variant Nightmares</h3>
                        <p className="text-white/50 text-sm relative z-10">Tracking 5 sizes and 4 colors for 100 SKUs using simple point-of-sale systems or spreadsheets.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.15)] transition-all duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A90E2]/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-[#4A90E2]/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                            <UserCheck className="w-6 h-6 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 relative z-10">Lost VIPs</h3>
                        <p className="text-white/50 text-sm relative z-10">Failing to recognize your top online spenders when they finally visit your physical location.</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <span className="text-white font-medium">MochaEase bridges the physical to digital gap.</span>
                    </div>
                </div>
            </section>

            {/* Solutions - Horizontal Scrolls */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-32 relative z-10 space-y-32">

                {/* Visual Section 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16 group">
                    <div className="md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Omnichannel <br className="hidden md:block" />Inventory Sync.</h2>
                        <ul className="space-y-6">
                            {[
                                "Real-time sync between POS and eCommerce (Shopify, Woo)",
                                "Manage complex matrix variants (Size, Color, Material)",
                                "Automated purchase orders for low-stock items",
                                "Print custom barcode labels directly from the system"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
                                    <span className="text-lg text-white/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-white font-bold">Item: Silk Evening Dress</h4>
                            <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full">Syncing...</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">In-Store Stock (NYC)</p>
                                    <p className="text-white font-bold text-lg">2 Remaining</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-400 text-xs mb-1 font-bold">Just Sold 1</p>
                                    <p className="text-white/50 text-xs">updating web...</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center relative overflow-hidden">
                                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" />
                                <div>
                                    <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-bold">Online Store (Shopify)</p>
                                    <p className="text-white font-bold text-lg">2 Remaining</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-pink-400 text-xs font-bold">Synced Successfully</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Section 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
                    <div className="md:w-1/2 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Clienteling & <br className="hidden md:block" />Loyalty Built-in.</h2>
                        <ul className="space-y-6">
                            {[
                                "Access full customer purchase history at checkout",
                                "Add notes to profiles (e.g., 'Prefers size Medium, loves blue')",
                                "Issue physical and digital gift cards instantly",
                                "Automated points and rewards tied to their phone number"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                                    <span className="text-lg text-white/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:w-1/2 relative z-10 bg-black/50 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">ES</div>
                                <h4 className="text-white font-bold">Elena S. (VIP Tier)</h4>
                            </div>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">1,450 Points</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <p className="text-white/50 text-xs mb-2 uppercase tracking-wider font-bold">Past Purchases</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white">Summer Linen Tote</span>
                                    <span className="text-white/50">Online • 2 wks ago</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-2">
                                    <span className="text-white">Cashmere Scarf</span>
                                    <span className="text-white/50">In-Store • 1 mo ago</span>
                                </div>
                            </div>

                            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="text-purple-300 font-bold">Available Reward</p>
                                    <p className="text-white/70 text-sm">-$15 off today's purchase</p>
                                </div>
                                <button className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg text-sm hover:bg-purple-600 transition-colors">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* All Features Layout */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Shirt className="w-4 h-4 text-pink-400" />
                        <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">Retail Features</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">The Omnichannel Arsenal.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {/* Glowing nodes behind grid */}
                    <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                    {/* POS */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-pink-400/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-400/10 transition-all duration-500">
                            <Smartphone className="w-7 h-7 text-pink-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Mobile POS & Registers</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Check out customers anywhere on the floor via tablet", "Scan barcodes via mobile camera or bluetooth scanner", "Send digital receipts via email or SMS", "Return or exchange items effortlessly", "Split payments and store credit handling"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Inventory */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 group relative overflow-hidden row-span-2 lg:row-span-1 xl:row-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-400/10 transition-all duration-500">
                            <ShoppingBag className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Matrix Inventory</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Create items with multiple variants (Size, Color, Material)", "Generate and print custom barcode labels", "Perform stocktakes efficiently using scanners", "Transfer inventory between multiple store locations", "Track COGS against retail price for margin analysis", "Automate purchase orders when thresholds are met"].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Loyalty */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-gradient-to-b from-[#1A1A1A]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#4A90E2]/50 hover:shadow-[0_0_30px_rgba(74,144,226,0.1)] transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4A90E2]/10 transition-all duration-500">
                            <Gift className="w-7 h-7 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-white font-bold text-2xl mb-6">Loyalty & Gift Cards</h3>
                        <ul className="space-y-4 relative z-10">
                            {["Sell and redeem physical or digital gift cards (eGift cards)", "Award points for purchases (in-store and online)", "Tiered loyalty programs (Gold, Platinum, etc.)", "Customer credit accounts for rich VIPs"].map((item, i) => (
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
                <svg className="w-12 h-12 text-pink-400 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                    "Before MochaEase, managing our Shopify and physical store inventory was a nightmare. Now, when a sweater sells online, our in-store POS updates instantly. It's flawless."
                </p>
                <div className="flex items-center justify-center gap-4">
                    <div className="font-bold text-white text-lg">Sarah J.</div>
                    <div className="text-pink-400 text-sm font-bold">Owner, The Velvet Hanger</div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="w-full relative z-20 border-t border-white/5 bg-black/50">
                <ExperienceJourney role="fashion" hideBackButton />
            </section>

        </main>
    );
}
