'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Shield, Rocket } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();
    const navBgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
    const navBackdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

    // Dropdown states with delay
    const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    let useCasesTimeout: NodeJS.Timeout;
    let resourcesTimeout: NodeJS.Timeout;

    const handleUseCasesEnter = () => {
        clearTimeout(useCasesTimeout);
        setIsUseCasesOpen(true);
    };
    const handleUseCasesLeave = () => {
        useCasesTimeout = setTimeout(() => setIsUseCasesOpen(false), 200); // 200ms delay
    };

    const handleResourcesEnter = () => {
        clearTimeout(resourcesTimeout);
        setIsResourcesOpen(true);
    };
    const handleResourcesLeave = () => {
        resourcesTimeout = setTimeout(() => setIsResourcesOpen(false), 200);
    };

    useEffect(() => {
        setMounted(true);
        return () => {
            clearTimeout(useCasesTimeout);
            clearTimeout(resourcesTimeout);
        };
    }, []);

    if (!mounted) return null;

    return (
        <motion.nav
            style={{ backgroundColor: `rgba(0, 0, 0, ${navBgOpacity.get()})`, backdropFilter: navBackdropBlur.get() }}
            className="w-full mx-auto px-6 py-4 flex items-center justify-between z-[100] fixed top-0 border-b border-white/5 transition-all duration-300"
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center group">
                    <div className="text-[#C3EB7A] font-extrabold text-3xl tracking-tighter shrink-0 m-0 leading-none group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                    <div className="text-white font-extrabold text-3xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Link href="/#features" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">Features</Link>

                {/* Use Cases Dropdown with Framer Motion */}
                <div className="relative py-2" onMouseEnter={handleUseCasesEnter} onMouseLeave={handleUseCasesLeave}>
                    <button className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors flex items-center gap-1 focus:outline-none">
                        Use Cases
                        <motion.svg animate={{ rotate: isUseCasesOpen ? 180 : 0 }} className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>
                    </button>

                    <AnimatePresence>
                        {isUseCasesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 z-[110]"
                            >
                                <div className="bg-[#1A1A1A]/95 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden p-2 backdrop-blur-xl hover:shadow-[0_0_20px_rgba(195,235,122,0.1)]">
                                    <Link href="/use-cases/cafe" onClick={() => setIsUseCasesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Cafe & Coffee Shops</Link>
                                    <Link href="/use-cases/qsr" onClick={() => setIsUseCasesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Quick Service (QSR)</Link>
                                    <Link href="/use-cases/fashion" onClick={() => setIsUseCasesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Fashion & Boutique</Link>
                                    <div className="border-t border-white/5 my-1"></div>
                                    <Link href="/use-cases/enterprise" onClick={() => setIsUseCasesOpen(false)} className="block px-4 py-2.5 text-sm font-bold text-[#4A90E2] hover:bg-[#4A90E2]/10 rounded-xl transition-colors">Enterprise Chains</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link href="/#pricing" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">Pricing</Link>

                {/* Resources Dropdown with Framer Motion */}
                <div className="relative py-2" onMouseEnter={handleResourcesEnter} onMouseLeave={handleResourcesLeave}>
                    <button className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors flex items-center gap-1 focus:outline-none">
                        Resources
                        <motion.svg animate={{ rotate: isResourcesOpen ? 180 : 0 }} className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>
                    </button>

                    <AnimatePresence>
                        {isResourcesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 z-[110]"
                            >
                                <div className="bg-[#1A1A1A]/95 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden p-2 backdrop-blur-xl hover:shadow-[0_0_20px_rgba(195,235,122,0.1)]">
                                    <Link href="/blog" onClick={() => setIsResourcesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Blog</Link>
                                    <Link href="/guides" onClick={() => setIsResourcesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Guides</Link>
                                    <Link href="/support" onClick={() => setIsResourcesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Support Center</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">About Us</Link>
                <Link href="/contact" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">Contact Us</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/calculator"
                    className="text-xs font-bold text-[#4A90E2] bg-[#4A90E2]/10 border border-[#4A90E2]/30 px-5 py-2.5 rounded-full hover:bg-[#4A90E2]/20 hover:shadow-[0_0_15px_rgba(74,144,226,0.3)] transition-all hidden lg:block"
                >
                    Savings Calculator
                </Link>
                <Link
                    href="/demo"
                    className="text-xs font-bold bg-[#C3EB7A] text-black px-6 py-2.5 rounded-full hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.5)]"
                >
                    Get Started
                </Link>
                <Link href="/login" className="text-xs font-bold text-white hover:text-[#C3EB7A] transition-colors hidden sm:block ml-2">
                    Sign In
                </Link>
                <div className="flex items-center gap-1 ml-2 text-white/50 hover:text-white transition-colors cursor-pointer group">
                    <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-xs font-bold hidden md:block">EN</span>
                </div>
            </div>
        </motion.nav>
    );
}
