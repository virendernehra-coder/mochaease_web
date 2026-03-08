'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import Chatbot from '@/components/Chatbot';
import ExperienceJourney, { Role, ROLES } from '@/components/ExperienceJourney';

export default function ExperiencePage() {
    const [role, setRole] = useState<Role>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                            {ROLES.map((r) => (
                                <motion.button
                                    key={r.id}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setRole(r.id as Role)}
                                    className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/30 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[#0A0A0A] rounded-3xl -z-10" />
                                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${r.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`} />

                                    <div className="p-8 flex flex-col items-start gap-4 h-full relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/10 transition-colors">
                                            <r.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{r.label}</h3>
                                            <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors font-medium">See my experience &rarr;</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.section>
                ) : (
                    <ExperienceJourney role={role} onBack={() => setRole(null)} />
                )}
            </AnimatePresence>
            <Chatbot />
        </main>
    );
}
