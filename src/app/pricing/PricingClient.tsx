'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import type { PricingPlan } from '@/utils/supabase/queries';

interface PricingClientProps {
    initialPlans: PricingPlan[];
}

export default function PricingClient({ initialPlans }: PricingClientProps) {
    const [mounted, setMounted] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    const [country, setCountry] = useState('us'); // 'us' -> USD, 'in' -> INR, 'id' -> IDR

    useEffect(() => {
        setMounted(true);

        // Auto-detect user's country for default pricing currency
        fetch('/api/geo')
            .then(res => res.json())
            .then(data => {
                if (data.currency && ['us', 'in', 'id'].includes(data.currency.toLowerCase())) {
                    setCountry(data.currency.toLowerCase());
                }
            })
            .catch(() => {
                // Silent fallback — keeps default 'us'
            });
    }, []);

    // Helper map to convert dropdown values to exact DB string matches
    const currencyMap: Record<string, { dbString: string; symbol: string }> = {
        'us': { dbString: 'USD', symbol: '$' },
        'in': { dbString: 'INR', symbol: '₹' },
        'id': { dbString: 'IDR', symbol: 'Rp ' }
    };

    const getPricing = (tier: 'MochaLite' | 'MochaCore' | 'MochaMax') => {
        const billingCycle = isAnnual ? 'yearly' : 'monthly';
        const currencyData = currencyMap[country] || currencyMap['us'];

        // Find the matching plan from Supabase data
        const plan = initialPlans.find(
            p => p.plan_name === tier &&
                p.billing_cycle === billingCycle &&
                p.currency === currencyData.dbString
        );

        if (!plan) {
            // Fallback if data is missing from DB
            return { symbol: currencyData.symbol, amount: '---', originalAmount: null, isAnnualDiscount: false };
        }

        // The user specified that the DB `price` already holds the discounted per-month price for yearly plans.
        // We will show that exact price field.

        // For visual crossed-out price, we can find the equivalent 'monthly' price
        let originalAmount = null;
        if (isAnnual && plan.discount_percent > 0) {
            const monthlyEquivalent = initialPlans.find(
                p => p.plan_name === tier &&
                    p.billing_cycle === 'monthly' &&
                    p.currency === currencyData.dbString
            );
            if (monthlyEquivalent) {
                originalAmount = monthlyEquivalent.price.toLocaleString('en-US');
            }
        }

        return {
            symbol: currencyData.symbol,
            amount: plan.price.toLocaleString('en-US'),
            originalAmount,
            isAnnualDiscount: isAnnual && plan.discount_percent > 0
        };
    };

    if (!mounted) return null;

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    // Feature matrix data
    const features = [
        {
            category: "Operations",
            items: [
                { name: "SmartPOS System", lite: true, core: true, max: true },
                { name: "Basic Inventory Tracking", lite: true, core: true, max: true },
                { name: "Digital Menu (QR Menu)", lite: true, core: true, max: true },
                { name: "Offline Mode", lite: false, core: true, max: true },
                { name: "Multi-Store Sync", lite: false, core: true, max: true },
                { name: "Franchise Management Hub", lite: false, false: true, max: true }
            ]
        },
        {
            category: "Intelligence & Growth",
            items: [
                { name: "Daily Sales Reports", lite: true, core: true, max: true },
                { name: "AI Demand Forecasting", lite: false, core: true, max: true },
                { name: "Customer CRM & Loyalty", lite: false, core: true, max: true },
                { name: "Real-time Footfall Analytics", lite: false, false: false, max: true },
                { name: "Custom API & Webhooks", lite: false, false: false, max: true }
            ]
        },
        {
            category: "Staffing & Users",
            items: [
                { name: "Register Accounts / Locations", lite: "1", core: "Unlimited", max: "Unlimited" },
                { name: "Staff Shifts & Scheduling", lite: false, core: true, max: true },
                { name: "Biometric Clock-in", lite: false, false: false, max: true },
                { name: "Payroll Export Integrations", lite: false, core: true, max: true }
            ]
        },
        {
            category: "Support & Services",
            items: [
                { name: "Email Support", lite: true, core: true, max: true },
                { name: "24/7 Priority Live Chat", lite: false, core: true, max: true },
                { name: "Dedicated Account Manager", lite: false, false: false, max: true },
                { name: "On-site Installation", lite: false, false: false, max: true },
                { name: "White-labeled Branded App", lite: false, false: false, max: true }
            ]
        }
    ];

    const renderCheck = (value: boolean | string | undefined) => {
        if (value === true) return <CheckCircle2 className="w-5 h-5 mx-auto text-[#C3EB7A]" />;
        if (value === false) return <X className="w-5 h-5 mx-auto text-white/20" />;
        return <span className="text-white/80 font-medium">{value}</span>;
    };

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <Navbar />
            <NetworkBackground />

            <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C3EB7A]/10 via-transparent to-transparent pointer-events-none -z-0" />

            {/* Pricing Section */}
            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-20 z-10 relative">
                <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Simple, transparent pricing.</h1>
                    <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">Start free, scale infinitely. No hidden fees, cancel anytime.</p>

                    {/* Region Selector */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <select
                            className="bg-black/40 border border-white/10 rounded-xl px-6 py-3 text-sm text-white focus:outline-none focus:border-[#C3EB7A]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="text-black" value="us">🌎 Global (USD)</option>
                            <option className="text-black" value="in">🇮🇳 India (INR)</option>
                            <option className="text-black" value="id">🇮🇩 Indonesia (IDR)</option>
                        </select>
                    </div>

                    {/* Working Toggle Switch */}
                    <div className="inline-flex items-center bg-white/5 p-1.5 rounded-full border border-white/10 relative">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${!isAnnual ? "text-black" : "text-white/70 hover:text-white"}`}
                        >
                            {`Monthly`}
                            {!isAnnual && (
                                <motion.div
                                    layoutId="pricing-pill"
                                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] z-[-1]"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`relative z-10 px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${isAnnual ? "text-black" : "text-white/70 hover:text-white"}`}
                        >
                            {`Annually (Save 20%)`}
                            {isAnnual && (
                                <motion.div
                                    layoutId="pricing-pill"
                                    className="absolute inset-0 bg-[#C3EB7A] rounded-full shadow-[0_0_15px_rgba(195,235,122,0.4)] z-[-1]"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                            )}
                        </button>
                    </div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lite */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col relative overflow-hidden">
                        <h3 className="text-2xl font-bold text-white mb-2">MochaLite</h3>
                        <p className="text-white/50 text-sm mb-6">For single-location cafes & shops.</p>
                        <div className="flex flex-col mb-8 min-h-[50px]">
                            {getPricing('MochaLite').isAnnualDiscount && (
                                <span className="text-xs text-white/40 line-through mb-1">{getPricing('MochaLite').symbol}{getPricing('MochaLite').originalAmount}/mo</span>
                            )}
                            <div className="flex items-baseline">
                                <span className="text-4xl font-black text-white">{getPricing('MochaLite').symbol}{getPricing('MochaLite').amount}</span>
                                <span className="text-lg text-white/50 font-normal ml-1">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['SmartPOS System', 'Basic Inventory', 'Digital Menu (QR)', '1 Register Account'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" /><span className="text-white/80">{feat}</span></li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors z-10">Start Free Trial</button>
                    </motion.div>

                    {/* Core */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-gradient-to-b from-[#C3EB7A]/10 to-[#1A1A1A] border border-[#C3EB7A]/30 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(195,235,122,0.1)]">
                        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#C3EB7A] text-black text-xs font-bold px-3 py-1 rounded-full z-20">MOST POPULAR</div>
                        <h3 className="text-2xl font-bold text-white mb-2">MochaCore</h3>
                        <p className="text-white/50 text-sm mb-6">For growing multi-outlet brands.</p>
                        <div className="flex flex-col mb-8 min-h-[50px]">
                            {getPricing('MochaCore').isAnnualDiscount && (
                                <span className="text-xs text-[#C3EB7A]/40 line-through mb-1">{getPricing('MochaCore').symbol}{getPricing('MochaCore').originalAmount}/mo</span>
                            )}
                            <div className="flex items-baseline">
                                <span className="text-4xl font-black text-[#C3EB7A]">{getPricing('MochaCore').symbol}{getPricing('MochaCore').amount}</span>
                                <span className="text-lg text-white/50 font-normal ml-1">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['Everything in Lite, plus:', 'AI Demand Forecasting', 'CRM & Loyalty Program', 'Staff Scheduling', 'Unlimited Registers'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#C3EB7A] shrink-0" /><span className="text-white/80">{feat}</span></li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-[#C3EB7A] text-black font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(195,235,122,0.4)] z-10">Get Started Now</button>
                    </motion.div>

                    {/* Max */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col relative overflow-hidden">
                        <h3 className="text-2xl font-bold text-white mb-2">MochaMax</h3>
                        <p className="text-white/50 text-sm mb-6">For enterprise retail chains.</p>
                        <div className="flex flex-col mb-8 min-h-[50px]">
                            {getPricing('MochaMax').isAnnualDiscount && (
                                <span className="text-xs text-white/40 line-through mb-1">{getPricing('MochaMax').symbol}{getPricing('MochaMax').originalAmount}/mo</span>
                            )}
                            <div className="flex items-baseline">
                                <span className="text-4xl font-black text-white">{getPricing('MochaMax').symbol}{getPricing('MochaMax').amount}</span>
                                <span className="text-lg text-white/50 font-normal ml-1">/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['Everything in Core, plus:', 'Custom API Access', 'Dedicated Account Manager', 'Advanced Franchise Controls', 'White-labeled App'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" /><span className="text-white/80">{feat}</span></li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors z-10">Contact Sales</button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Comprehensive Feature Matrix */}
            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 z-10 relative">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Compare all features</h2>
                    <p className="text-lg text-white/60">Dive into the granular details of what makes MochaEase the most powerful platform on the market.</p>
                </motion.div>

                <div className="w-full overflow-x-auto pb-8">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-4 px-6 w-1/3 text-lg font-bold text-white/90">Feature</th>
                                <th className="py-4 px-6 w-1/5 text-center font-bold text-white/70">Lite</th>
                                <th className="py-4 px-6 w-1/5 text-center font-bold text-[#C3EB7A]">Core</th>
                                <th className="py-4 px-6 w-1/5 text-center font-bold text-white/70">Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((category, idx) => (
                                <React.Fragment key={idx}>
                                    <tr className="bg-white/[0.02]">
                                        <td colSpan={4} className="py-4 px-6 text-sm font-black text-white uppercase tracking-widest">{category.category}</td>
                                    </tr>
                                    {category.items.map((item, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                                            <td className="py-4 px-6 text-white/70">{item.name}</td>
                                            <td className="py-4 px-6 text-center">{renderCheck(item.lite)}</td>
                                            <td className="py-4 px-6 text-center">{renderCheck(item.core)}</td>
                                            <td className="py-4 px-6 text-center">{renderCheck(item.max)}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}
