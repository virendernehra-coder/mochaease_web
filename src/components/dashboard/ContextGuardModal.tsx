'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ArrowRight, Info, ShieldAlert } from 'lucide-react';
import { useThemeStore } from '@/store/theme-store';

interface ContextGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    actionName: string;
}

export default function ContextGuardModal({ isOpen, onClose, actionName }: ContextGuardModalProps) {
    const { primaryColor } = useThemeStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-not-allowed"
            />
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                <div 
                    className="absolute -right-20 -top-20 w-64 h-64 blur-3xl opacity-10" 
                    style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                        <ShieldAlert className="w-8 h-8 text-amber-500" />
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">
                        Specific Outlet <span className="text-amber-500">Required.</span>
                    </h3>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[3px] mb-6">Action: {actionName}</p>

                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 mb-8 w-full text-left">
                        <div className="flex gap-4">
                            <div className="p-2 rounded-xl bg-white/5 h-fit text-white/40">
                                <Info className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-white/50 leading-relaxed">
                                You are currently in <span className="text-white font-bold">Global Business</span> view. To perform this update, please select a specific outlet using the <span className="text-white font-bold whitespace-nowrap">Control Hub</span> at the top of your dashboard.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                        I Understand <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={onClose}
                        className="mt-4 text-[10px] font-black text-white/20 uppercase tracking-[2px] hover:text-white/40 transition-colors"
                    >
                        Dismiss Overlay
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
