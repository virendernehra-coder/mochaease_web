'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ChevronRight, Zap, Coffee, ShoppingBag, Building, Info, MessageSquare, HelpCircle, Sparkles } from 'lucide-react';
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

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            clearTimeout(useCasesTimeout);
            clearTimeout(resourcesTimeout);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.nav
            style={{ backgroundColor: `rgba(0, 0, 0, ${navBgOpacity.get()})`, backdropFilter: navBackdropBlur.get() }}
            className="w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between z-[999] fixed top-0 border-b border-white/5 transition-all duration-300"
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="text-[#C3EB7A] font-extrabold text-2xl md:text-3xl tracking-tighter shrink-0 m-0 leading-none group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(195,235,122,0.5)]">m</div>
                    <div className="text-white font-extrabold text-2xl md:text-3xl tracking-tighter shrink-0 m-0 leading-none">E.</div>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Link href="/#features" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">Features</Link>
                <Link href="/experience" className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] hover:opacity-80 transition-opacity flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#4A90E2]" />
                    Experience
                </Link>

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
                    className="text-xs font-bold bg-[#C3EB7A] text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.5)]"
                >
                    Get Started
                </Link>
                <Link href="/login" className="text-xs font-bold text-white hover:text-[#C3EB7A] transition-colors hidden sm:block ml-2">
                    Sign In
                </Link>
                <div className="hidden md:flex items-center gap-1 ml-2 text-white/50 hover:text-white transition-colors cursor-pointer group">
                    <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-xs font-bold">EN</span>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="lg:hidden text-white hover:text-[#C3EB7A] transition-colors p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Overlay - Upgraded Visuals */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="fixed inset-x-0 bottom-0 top-[72px] h-[calc(100dvh-72px)] bg-[#050505]/98 backdrop-blur-2xl z-[90] lg:hidden overflow-y-auto pb-32 overscroll-contain"
                    >
                        {/* Background glowing orbs */}
                        <div className="absolute top-10 right-0 w-72 h-72 bg-[#C3EB7A]/15 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4A90E2]/15 blur-[120px] rounded-full pointer-events-none" />

                        <motion.div
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                            }}
                            className="flex flex-col p-6 gap-6 relative z-10"
                        >
                            <div className="flex flex-col gap-2 text-xl font-medium tracking-tight">
                                {/* Features */}
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                                    <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white hover:text-[#C3EB7A] transition-colors py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" /> Features</div>
                                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                    <Link href="/experience" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] font-bold hover:opacity-80 transition-opacity py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-[#4A90E2] group-hover:scale-110 transition-transform" /> Experience</div>
                                        <ChevronRight className="w-4 h-4 text-[#4A90E2]/50 group-hover:text-[#4A90E2] transition-colors" />
                                    </Link>
                                </motion.div>

                                {/* Use Cases Segment */}
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="py-4 border-b border-white/5">
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Use Cases</span>
                                    <div className="flex flex-col gap-2">
                                        <Link href="/use-cases/cafe" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all p-3.5 rounded-2xl group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                                                    <Coffee className="w-5 h-5 text-orange-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base">Cafe & Coffee</span>
                                                    <span className="text-xs text-white/40 font-normal">For single shops</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        </Link>

                                        <Link href="/use-cases/qsr" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all p-3.5 rounded-2xl group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                                    <Zap className="w-5 h-5 text-red-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base">Quick Service</span>
                                                    <span className="text-xs text-white/40 font-normal">Fast-paced QSR</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        </Link>

                                        <Link href="/use-cases/fashion" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all p-3.5 rounded-2xl group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                                    <ShoppingBag className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base">Fashion</span>
                                                    <span className="text-xs text-white/40 font-normal">Retail & Boutique</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                        </Link>

                                        <Link href="/use-cases/enterprise" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center text-[#4A90E2] hover:text-[#4A90E2] bg-[#4A90E2]/10 hover:bg-[#4A90E2]/20 border border-[#4A90E2]/20 transition-all p-3.5 rounded-2xl group mt-2 shadow-[0_0_15px_rgba(74,144,226,0.1)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#4A90E2]/20 flex items-center justify-center border border-[#4A90E2]/30 group-hover:bg-[#4A90E2]/30 transition-colors">
                                                    <Building className="w-5 h-5 text-[#4A90E2]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-base">Enterprise</span>
                                                    <span className="text-xs text-[#4A90E2]/70 font-normal">Multi-outlet chains</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-[#4A90E2]/50 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </div>
                                </motion.div>

                                {/* Pricing */}
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                                    <Link href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white hover:text-[#C3EB7A] transition-colors py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><span className="text-xl">💳</span> Pricing</div>
                                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                </motion.div>

                                {/* Info */}
                                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} className="flex flex-col">
                                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white hover:text-[#C3EB7A] transition-colors py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><Info className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> About Us</div>
                                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                    <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white hover:text-[#C3EB7A] transition-colors py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#4A90E2] group-hover:scale-110 transition-transform" /> Support Center</div>
                                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white hover:text-[#C3EB7A] transition-colors py-4 border-b border-white/5 w-full group">
                                        <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" /> Contact Us</div>
                                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                </motion.div>
                            </div>

                            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="flex flex-col gap-4 mt-8 relative z-10">
                                <Link
                                    href="/calculator"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center font-bold text-[#4A90E2] bg-[#4A90E2]/10 border border-[#4A90E2]/30 px-5 py-4 rounded-xl hover:bg-[#4A90E2]/20 active:scale-95 transition-all shadow-[0_0_20px_rgba(74,144,226,0.1)]"
                                >
                                    Savings Calculator
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center font-bold text-white bg-white/10 border border-white/20 px-5 py-4 rounded-xl hover:bg-white/20 active:scale-95 transition-all sm:hidden backdrop-blur-md"
                                >
                                    Sign In
                                </Link>
                                <div className="flex items-center justify-center gap-2 mt-4 text-white/50 bg-black/20 py-2 rounded-full border border-white/5 backdrop-blur-md w-max mx-auto px-4">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">English</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
