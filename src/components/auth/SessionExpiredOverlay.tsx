'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, LogIn, Lock, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';

export default function SessionExpiredOverlay() {
    const router = useRouter();
    const { clearSession } = useUserStore();

    const handleBackToLogin = () => {
        clearSession();
        router.push('/login');
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/80 backdrop-blur-2xl">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#4A90E2]/5 blur-[100px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-lg mx-6"
            >
                {/* Main Card */}
                <div className="relative overflow-hidden bg-[#111111]/90 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    
                    <div className="flex flex-col items-center text-center">
                        {/* Icon Hexagon/Box */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
                            <div className="relative w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group">
                                <Lock className="w-10 h-10 text-white/20 group-hover:text-purple-400 transition-colors duration-500" />
                                <ShieldAlert className="absolute -top-2 -right-2 w-8 h-8 text-purple-500 animate-bounce" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                            Session <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-white/50">Secured.</span>
                        </h2>
                        
                        <p className="text-white/40 text-sm md:text-base font-medium mb-10 leading-relaxed max-w-xs">
                            System idle detected. Your session has been locked for your protection. Please re-authenticate to continue.
                        </p>

                        <div className="w-full space-y-4">
                            <button
                                onClick={handleBackToLogin}
                                className="group relative w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <LogIn className="w-5 h-5" />
                                    Return to Command Center
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 font-bold text-sm hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Quick Refresh
                            </button>
                        </div>

                        {/* Audit Details */}
                        <div className="mt-12 pt-8 border-t border-white/5 w-full">
                            <div className="flex justify-between items-center text-[10px] font-black text-white/10 uppercase tracking-[3px]">
                                <span>Status: Encrypted</span>
                                <span>Ref: SE-2026-X</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle outer glow */}
                <div className="absolute -inset-4 bg-purple-500/5 blur-3xl -z-10 rounded-[60px]" />
            </motion.div>
        </div>
    );
}
