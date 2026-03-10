'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Menu, X, ChevronRight, ArrowRight, Zap, Coffee, ShoppingBag, Building, Info, MessageSquare, HelpCircle, Sparkles, CreditCard, BookOpen, Calculator, FileText, LogIn } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

type MegaCategory = 'fnb' | 'retail' | 'enterprise';

const BUSINESS_CATEGORIES = {
    fnb: {
        title: "Food & Beverage",
        discover: [
            { name: "Coffee Shops & Cafes", href: "/experience?role=cafe" },
            { name: "Quick Service (QSR)", href: "/experience?role=qsr" },
            { name: "Full Service Dining", href: "/experience?role=full-service" },
            { name: "Bars & Breweries", href: "/experience?role=bars" },
            { name: "Food Trucks & Pop-ups", href: "/experience?role=food-trucks" },
            { name: "Bakeries & Patisseries", href: "/experience?role=bakeries" },
        ],
        capabilities: [
            { name: "POS & Offline Payments", href: "#" },
            { name: "Kitchen Display System", href: "#" },
            { name: "Ingredient Tracking", href: "#" },
            { name: "Loyalty & CRM", href: "#" },
            { name: "Online Ordering Sync", href: "#" }
        ]
    },
    retail: {
        title: "Retail & Boutiques",
        discover: [
            { name: "Apparel & Fashion", href: "/experience?role=fashion" },
            { name: "Health & Beauty", href: "/experience?role=beauty" },
            { name: "Grocery & Convenience", href: "/experience?role=grocery" },
            { name: "Home & Lifestyle", href: "/experience?role=home" },
            { name: "Vape & Smoke Shops", href: "/experience?role=vape" },
        ],
        capabilities: [
            { name: "Multi-Location Inventory", href: "#" },
            { name: "Barcode Scanning", href: "#" },
            { name: "Purchase Orders", href: "#" },
            { name: "Staff Commissions", href: "#" },
            { name: "E-commerce Integration", href: "#" }
        ]
    },
    enterprise: {
        title: "Enterprise Chains",
        discover: [
            { name: "Franchise Management", href: "/experience?role=enterprise" },
            { name: "Multi-Brand Portfolios", href: "/experience?role=multi-brand" },
            { name: "Stadiums & Large Venues", href: "/experience?role=stadiums" },
        ],
        capabilities: [
            { name: "Centralized Head Office", href: "#" },
            { name: "Global Reporting API", href: "#" },
            { name: "Custom Permissions", href: "#" },
            { name: "White-labeled App", href: "#" },
            { name: "Dedicated Account Rep", href: "#" }
        ]
    }
};

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();
    const navBgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
    const navBackdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

    // Dropdown states with delay
    const [isBusinessTypesOpen, setIsBusinessTypesOpen] = useState(false);
    const [activeMegaCategory, setActiveMegaCategory] = useState<MegaCategory>('fnb');
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const businessTypesTimeout = useRef<NodeJS.Timeout | null>(null);
    const resourcesTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleBusinessTypesEnter = () => {
        if (businessTypesTimeout.current) clearTimeout(businessTypesTimeout.current);
        setIsBusinessTypesOpen(true);
    };
    const handleBusinessTypesLeave = () => {
        businessTypesTimeout.current = setTimeout(() => setIsBusinessTypesOpen(false), 200); // 200ms delay
    };

    const handleResourcesEnter = () => {
        if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
        setIsResourcesOpen(true);
    };
    const handleResourcesLeave = () => {
        resourcesTimeout.current = setTimeout(() => setIsResourcesOpen(false), 200);
    };

    // Mobile menu expanding states
    const [isMobileBusinessExpanded, setIsMobileBusinessExpanded] = useState(false);
    const [isMobileResourcesExpanded, setIsMobileResourcesExpanded] = useState(false);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset mobile accordions when closing the menu
            setIsMobileBusinessExpanded(false);
            setIsMobileResourcesExpanded(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
            if (businessTypesTimeout.current) clearTimeout(businessTypesTimeout.current);
            if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
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

                {/* Business Types Mega Menu with Framer Motion */}
                <div className="relative py-2" onMouseEnter={handleBusinessTypesEnter} onMouseLeave={handleBusinessTypesLeave}>
                    <button className={`text-sm font-semibold transition-colors flex items-center gap-1 focus:outline-none ${isBusinessTypesOpen ? 'text-[#C3EB7A]' : 'text-white/70 hover:text-[#C3EB7A]'}`}>
                        Business Types
                        <motion.svg animate={{ rotate: isBusinessTypesOpen ? 180 : 0 }} className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>
                    </button>

                    <AnimatePresence>
                        {isBusinessTypesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] z-[110]"
                            >
                                <div className="bg-[#1A1A1A]/95 border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex backdrop-blur-2xl">
                                    {/* Left Column: Categories */}
                                    <div className="w-[30%] border-r border-white/5 p-6 flex flex-col gap-1 bg-black/20">
                                        <div className="mb-6 px-4">
                                            <h3 className="text-[#C3EB7A] text-xs font-black uppercase tracking-widest mb-1">Business Types</h3>
                                            <p className="text-white/40 text-xs">Select your industry</p>
                                        </div>
                                        {Object.entries(BUSINESS_CATEGORIES).map(([key, data]) => (
                                            <button
                                                key={key}
                                                onMouseEnter={() => setActiveMegaCategory(key as MegaCategory)}
                                                className={`text-left px-4 py-3.5 rounded-2xl transition-all font-bold text-[15px] flex items-center justify-between group ${activeMegaCategory === key ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                            >
                                                {data.title}
                                                <ChevronRight className={`w-4 h-4 transition-transform ${activeMegaCategory === key ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'}`} />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Middle Column: Discover */}
                                    <div className="w-[35%] py-6 pl-8 pr-4 flex flex-col gap-2">
                                        <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4 px-3">Discover</h3>
                                        <div className="flex flex-col">
                                            {BUSINESS_CATEGORIES[activeMegaCategory].discover.map((item, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={item.href}
                                                    onClick={() => setIsBusinessTypesOpen(false)}
                                                    className="px-3 py-2.5 text-[15px] font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3 group"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#C3EB7A] transition-colors"></span>
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <div className="mt-4 pt-4 border-t border-white/5 mx-3">
                                                <Link href="/experience" onClick={() => setIsBusinessTypesOpen(false)} className="text-sm font-bold text-[#4A90E2] hover:text-[#6AB0FF] transition-colors flex items-center gap-1 group">
                                                    View all sub-types <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Capabilities */}
                                    <div className="w-[35%] py-6 pr-8 pl-4 flex flex-col gap-2 bg-gradient-to-br from-transparent to-[#C3EB7A]/[0.03]">
                                        <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4 px-3">Capabilities</h3>
                                        <div className="flex flex-col">
                                            {BUSINESS_CATEGORIES[activeMegaCategory].capabilities.map((item, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={item.href}
                                                    onClick={() => setIsBusinessTypesOpen(false)}
                                                    className="px-3 py-2.5 text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3 group"
                                                >
                                                    <Zap className="w-4 h-4 text-[#4A90E2]/60 group-hover:text-[#4A90E2] transition-colors shrink-0" />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link href="/pricing" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors">Pricing</Link>

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
                                    <Link href="/resources/hardware" onClick={() => setIsResourcesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Supported Hardware</Link>
                                    <Link href="/support" onClick={() => setIsResourcesOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-[#C3EB7A] hover:bg-white/5 rounded-xl transition-colors">Support Center</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors hidden xl:block">About Us</Link>
                <Link href="/contact" className="text-sm font-semibold text-white/70 hover:text-[#C3EB7A] transition-colors hidden xl:block">Contact Us</Link>
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
                <a href="https://backoffice.mochaease.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-[#C3EB7A] transition-colors hidden sm:block ml-2">
                    Sign In
                </a>
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
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3, ease: "easeInOut" } }}
                        className="fixed inset-0 top-[72px] h-[calc(100dvh-72px)] bg-[#050505]/80 z-[90] lg:hidden overflow-y-auto overscroll-contain"
                    >
                        {/* Dynamic Background Elements */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            className="absolute top-10 right-0 w-72 h-72 bg-[#C3EB7A]/15 blur-[100px] rounded-full pointer-events-none"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-20 left-0 w-80 h-80 bg-[#4A90E2]/15 blur-[120px] rounded-full pointer-events-none"
                        />

                        {/* Staggered Orchestration Container */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                            }}
                            className="flex flex-col p-6 gap-8 relative z-10 min-h-full pb-32"
                        >
                            <div className="flex flex-col gap-6 mt-4">
                                {/* Primary Navigation Grid - 2x2 */}
                                <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.3 } } }} className="grid grid-cols-2 gap-3">
                                    <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors p-5 rounded-3xl flex flex-col gap-3 group">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C3EB7A]/20 to-transparent flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-[#C3EB7A]" />
                                        </div>
                                        <span className="text-lg font-bold text-white tracking-tight">Features</span>
                                    </Link>

                                    {/* Business Types Expandable */}
                                    <button
                                        onClick={() => setIsMobileBusinessExpanded(!isMobileBusinessExpanded)}
                                        className={`bg-white/5 border border-white/10 hover:bg-white/10 transition-colors p-5 rounded-3xl flex flex-col gap-3 group text-left ${isMobileBusinessExpanded ? 'ring-1 ring-[#4A90E2]/50 bg-white/10' : ''}`}
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-transparent flex items-center justify-center">
                                            <Building className="w-5 h-5 text-[#4A90E2]" />
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-lg font-bold text-white tracking-tight">Business Types</span>
                                            <ChevronRight className={`w-4 h-4 text-white/50 transition-transform ${isMobileBusinessExpanded ? 'rotate-90' : ''}`} />
                                        </div>
                                    </button>

                                    <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors p-5 rounded-3xl flex flex-col gap-3 group">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-lg font-bold text-white tracking-tight">Pricing</span>
                                    </Link>

                                    {/* Resources Expandable */}
                                    <button
                                        onClick={() => setIsMobileResourcesExpanded(!isMobileResourcesExpanded)}
                                        className={`bg-white/5 border border-white/10 hover:bg-white/10 transition-colors p-5 rounded-3xl flex flex-col gap-3 group text-left ${isMobileResourcesExpanded ? 'ring-1 ring-orange-500/50 bg-white/10' : ''}`}
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500/20 to-transparent flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-lg font-bold text-white tracking-tight">Resources</span>
                                            <ChevronRight className={`w-4 h-4 text-white/50 transition-transform ${isMobileResourcesExpanded ? 'rotate-90' : ''}`} />
                                        </div>
                                    </button>
                                </motion.div>

                                {/* Expandable Sub-menus */}
                                <AnimatePresence>
                                    {isMobileBusinessExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-[#111] rounded-3xl border border-white/5 -mt-3"
                                        >
                                            <div className="p-2 flex flex-col gap-1">
                                                <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-widest">Select Category</div>
                                                <Link href="/experience" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center justify-between group">
                                                    All Business Types <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#4A90E2]" />
                                                </Link>
                                                <Link href="/experience?role=cafe" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-[#4A90E2]/50"></span> Food & Beverage
                                                </Link>
                                                <Link href="/experience?role=fashion" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-purple-500/50"></span> Retail & Boutiques
                                                </Link>
                                                <Link href="/experience?role=enterprise" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-[#C3EB7A]/50"></span> Enterprise Chains
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}

                                    {isMobileResourcesExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-[#111] rounded-3xl border border-white/5 -mt-3"
                                        >
                                            <div className="p-2 flex flex-col gap-1">
                                                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center justify-between group">
                                                    Blog <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400" />
                                                </Link>
                                                <Link href="/guides" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center justify-between group">
                                                    Guides <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400" />
                                                </Link>
                                                <Link href="/resources/hardware" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center justify-between group">
                                                    Supported Hardware <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400" />
                                                </Link>
                                                <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/80 font-medium flex items-center justify-between group">
                                                    Support Center <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Secondary Links - Horizontal Scroll Pills */}
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } } }} className="py-2">
                                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">More</h3>
                                    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-2 px-2">
                                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-full whitespace-nowrap transition-colors border border-white/5">
                                            <Info className="w-4 h-4 text-white/60" />
                                            <span className="text-sm font-semibold text-white/80">About Us</span>
                                        </Link>
                                        <Link href="/guides" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-full whitespace-nowrap transition-colors border border-white/5">
                                            <FileText className="w-4 h-4 text-white/60" />
                                            <span className="text-sm font-semibold text-white/80">Guides</span>
                                        </Link>
                                        <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-full whitespace-nowrap transition-colors border border-white/5">
                                            <HelpCircle className="w-4 h-4 text-white/60" />
                                            <span className="text-sm font-semibold text-white/80">Support</span>
                                        </Link>
                                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-full whitespace-nowrap transition-colors border border-white/5">
                                            <MessageSquare className="w-4 h-4 text-white/60" />
                                            <span className="text-sm font-semibold text-white/80">Contact</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sticky Bottom Actions */}
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5 } } }} className="mt-auto flex flex-col gap-3 sticky bottom-6 z-20">
                                <Link
                                    href="/calculator"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 text-center font-bold text-white text-[15px] bg-[#4A90E2]/20 border border-[#4A90E2]/30 py-4 rounded-2xl hover:bg-[#4A90E2]/30 active:scale-[0.98] transition-all backdrop-blur-md"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Calculate Savings
                                </Link>
                                <a
                                    href="https://backoffice.mochaease.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 text-center font-bold text-black text-[15px] bg-[#C3EB7A] py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Sign In to Dashboard
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
