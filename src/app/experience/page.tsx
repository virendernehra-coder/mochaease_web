'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import NetworkBackground from '@/components/NetworkBackground';
import Chatbot from '@/components/Chatbot';
import ExperienceJourney from '@/components/ExperienceJourney';
import { ROLES, type Role } from '@/data/experience';

function ExperiencePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryRole = searchParams.get('role') as Role;

    // Initialize role state with the query parameter if it exists and is a valid role
    const isValidQueryRole = ROLES.some(r => r.id === queryRole);
    const [role, setRole] = useState<Role>(isValidQueryRole ? queryRole : null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Listen to query param changes if user navigates while already on the page via Navbar
    useEffect(() => {
        if (mounted) {
            if (isValidQueryRole) {
                setRole(queryRole);
            } else if (!queryRole) {
                // If the URL has no role parameter, reset the state
                setRole(null);
            }
        }
    }, [queryRole, mounted, isValidQueryRole]);

    if (!mounted) return null;

    return (
        <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-[#C3EB7A]/30 font-sans">
            <NetworkBackground />

            {/* Top Gradient */}
            <div className="fixed top-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/10 via-[#050505]/40 to-transparent pointer-events-none -z-0" />

            {/* Role Selection Screen */}
            <AnimatePresence mode="wait">
                {!role ? (
                    <motion.section
                        key="selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-40 pb-20 flex flex-col items-center justify-center min-h-screen relative z-10"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C3EB7A]/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                                Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">MochaEase.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium">
                                We believe that once you have MochaEase, you don't need any other software. <br className="hidden md:block" />Tell us what you run, and we'll prove it.
                            </p>
                        </div>

                        <div className="w-full max-w-6xl flex flex-col gap-16 mt-8">
                            {/* Food & Beverage */}
                            <div className="flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4 tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C3EB7A]/20 flex items-center justify-center text-[#C3EB7A] text-sm">1</span>
                                    Food & Beverage
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {ROLES.filter(r => ['cafe', 'qsr', 'full-service', 'bars', 'food-trucks', 'bakeries'].includes(r.id!)).map((r) => (
                                        <motion.button
                                            key={r.id}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setRole(r.id as Role)}
                                            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/30 transition-all duration-300 text-left overflow-hidden h-full flex flex-col"
                                        >
                                            <div className="absolute inset-0 bg-[#0A0A0A] rounded-3xl -z-10" />
                                            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${r.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`} />

                                            <div className="p-8 flex flex-col items-start gap-4 h-full relative z-10 w-full">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/10 transition-colors">
                                                    <r.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                                                </div>
                                                <div className="flex flex-col h-full justify-between w-full">
                                                    <h3 className="text-xl font-bold text-white mb-2">{r.label}</h3>
                                                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors font-medium mt-auto relative z-20">See my experience &rarr;</p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Retail & Boutiques */}
                            <div className="flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4 tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#4A90E2]/20 flex items-center justify-center text-[#4A90E2] text-sm">2</span>
                                    Retail & Boutiques
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {ROLES.filter(r => ['fashion', 'beauty', 'grocery', 'home', 'vape'].includes(r.id!)).map((r) => (
                                        <motion.button
                                            key={r.id}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setRole(r.id as Role)}
                                            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/30 transition-all duration-300 text-left overflow-hidden h-full flex flex-col"
                                        >
                                            <div className="absolute inset-0 bg-[#0A0A0A] rounded-3xl -z-10" />
                                            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${r.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`} />

                                            <div className="p-8 flex flex-col items-start gap-4 h-full relative z-10 w-full">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/10 transition-colors">
                                                    <r.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                                                </div>
                                                <div className="flex flex-col h-full w-full justify-end flex-grow">
                                                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{r.label}</h3>
                                                    <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors font-medium">Explore &rarr;</p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Enterprise & Venues */}
                            <div className="flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4 tracking-tight flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">3</span>
                                    Enterprise & Venues
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {ROLES.filter(r => ['enterprise', 'multi-brand', 'stadiums', 'airports'].includes(r.id!)).map((r) => (
                                        <motion.button
                                            key={r.id}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setRole(r.id as Role)}
                                            className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/30 transition-all duration-300 text-left overflow-hidden h-full flex flex-col text-center items-center"
                                        >
                                            <div className="absolute inset-0 bg-[#0A0A0A] rounded-3xl -z-10" />
                                            <div className={`absolute left-1/2 -translate-x-1/2 -top-10 w-32 h-32 bg-gradient-to-br ${r.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`} />

                                            <div className="p-8 flex flex-col items-center gap-4 h-full relative z-10 w-full justify-center">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/10 transition-colors">
                                                    <r.icon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{r.label}</h3>
                                                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors font-medium">View Systems &rarr;</p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <ExperienceJourney role={role} onBack={() => {
                        // Clear the URL query param so we return to pure /experience
                        router.push('/experience', { scroll: false });
                        setRole(null);
                    }} />
                )}
            </AnimatePresence>
            <Chatbot />
        </main>
    );
}

export default function ExperiencePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505] w-full" />}>
            <ExperiencePageContent />
        </Suspense>
    );
}
