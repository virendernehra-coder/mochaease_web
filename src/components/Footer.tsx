'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Linkedin, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOTER_BUSINESS_TYPES = [
    {
        title: 'Food & Beverage',
        color: '#C3EB7A',
        links: [
            { name: 'Coffee Shops & Cafes', href: '/experience?role=cafe' },
            { name: 'Quick Service (QSR)', href: '/experience?role=qsr' },
            { name: 'Full Service Dining', href: '/experience?role=full-service' },
            { name: 'Bars & Breweries', href: '/experience?role=bars' },
            { name: 'Food Trucks & Pop-ups', href: '/experience?role=food-trucks' },
            { name: 'Bakeries & Patisseries', href: '/experience?role=bakeries' },
        ],
    },
    {
        title: 'Retail & Boutiques',
        color: '#C3EB7A',
        links: [
            { name: 'Apparel & Fashion', href: '/experience?role=fashion' },
            { name: 'Health & Beauty', href: '/experience?role=beauty' },
            { name: 'Grocery & Convenience', href: '/experience?role=grocery' },
            { name: 'Home & Lifestyle', href: '/experience?role=home' },
            { name: 'Vape & Smoke Shops', href: '/experience?role=vape' },
        ],
    },
    {
        title: 'Enterprise Chains',
        color: '#4A90E2',
        links: [
            { name: 'Franchise Management', href: '/experience?role=enterprise' },
            { name: 'Multi-Brand Portfolios', href: '/experience?role=multi-brand' },
            { name: 'Stadiums & Large Venues', href: '/experience?role=stadiums' },
        ],
    },
];

function FooterAccordion({ category }: { category: typeof FOOTER_BUSINESS_TYPES[number] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-3 group cursor-pointer"
            >
                <span
                    className="text-xs font-bold uppercase tracking-wider transition-colors"
                    style={{ color: isOpen ? category.color : 'rgba(255,255,255,0.4)' }}
                >
                    {category.title}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                    <ChevronDown
                        className="w-3.5 h-3.5 transition-colors"
                        style={{ color: isOpen ? category.color : 'rgba(255,255,255,0.25)' }}
                    />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden space-y-1 pb-3"
                    >
                        {category.links.map((link, idx) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.2 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2 py-1.5 pl-2 rounded-lg hover:bg-white/5 group/link"
                                >
                                    <span
                                        className="w-1 h-1 rounded-full transition-colors"
                                        style={{ backgroundColor: category.color + '60' }}
                                    />
                                    {link.name}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-10 relative overflow-hidden z-10">
            {/* Background Ambience */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C3EB7A]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#4A90E2]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Top CTA Banner */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[40px] p-10 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3EB7A]/10 blur-[80px] rounded-full group-hover:bg-[#C3EB7A]/20 transition-colors duration-500" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Run a Smoother Business?</h2>
                        <p className="text-white/60 text-lg md:text-xl max-w-xl">Join thousands of businesses managing their daily chaos with MochaEase.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                        <Link href="/register" className="inline-flex px-8 py-4 rounded-full bg-[#C3EB7A] text-black font-black hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] gap-2 group/btn">
                            Start Free Trial <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center group mb-6 inline-flex">
                            <div className="text-[#C3EB7A] font-extrabold text-4xl tracking-tighter shrink-0 m-0 leading-none group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                            <div className="text-white font-extrabold text-4xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                        </Link>
                        <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                            The all-in-one, AI-powered POS platform built for modern businesses across every vertical. Stop guessing. Start dominating.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://www.youtube.com/@MochaEase" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/mochaeasetech" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.linkedin.com/company/mochaease/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C3EB7A] hover:bg-white/10 hover:border-[#C3EB7A]/30 transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/#features" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Pricing</Link></li>
                            <li><Link href="/demo" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Book a Demo</Link></li>
                            <li><Link href="/calculator" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Savings Calculator</Link></li>
                            <li><Link href="/resources/downloads" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Download Apps</Link></li>
                        </ul>
                    </div>

                    {/* Business Types — Expandable Accordion */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Business Types</h4>
                        <div className="space-y-0">
                            {FOOTER_BUSINESS_TYPES.map((cat) => (
                                <FooterAccordion key={cat.title} category={cat} />
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Blog</Link></li>
                            <li><Link href="/security" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Security & Compliance</Link></li>
                            <li><Link href="/support" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Support Center</Link></li>
                            <li><Link href="/contact" className="text-white/50 hover:text-[#C3EB7A] text-sm font-medium transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col xl:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-sm font-medium text-center xl:text-left">
                        &copy; {new Date().getFullYear()} MochaEase Tech Private Limited. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                        <Link href="/privacy" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors">Terms of Service</Link>
                        <Link href="/cookie-policy" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors whitespace-nowrap">Cookie Policy</Link>
                        <Link href="/cancellation-and-refund" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors whitespace-nowrap">Cancellation & Refund</Link>
                        <Link href="/shipping-and-delivery" className="text-white/30 hover:text-white/70 text-sm font-medium transition-colors whitespace-nowrap">Shipping & Delivery</Link>
                        <div className="flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors cursor-pointer group ml-2">
                            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-xs font-bold">English (US)</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
