'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import Portal from './Portal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger'
}: ConfirmationModalProps) {
    const colors = {
        danger: {
            accent: '#EF4444',
            bg: 'rgba(239, 68, 68, 0.1)',
            border: 'rgba(239, 68, 68, 0.2)',
            shadow: 'rgba(239, 68, 68, 0.3)'
        },
        warning: {
            accent: '#F59E0B',
            bg: 'rgba(245, 158, 11, 0.1)',
            border: 'rgba(245, 158, 11, 0.2)',
            shadow: 'rgba(245, 158, 11, 0.3)'
        },
        info: {
            accent: '#3B82F6',
            bg: 'rgba(59, 130, 246, 0.1)',
            border: 'rgba(59, 130, 246, 0.2)',
            shadow: 'rgba(59, 130, 246, 0.3)'
        }
    };

    const activeColor = colors[variant];

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-[92%] sm:max-w-md bg-[#0A0A0A] border border-white/10 rounded-[40px] p-6 sm:p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Glow */}
                            <div 
                                className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 pointer-events-none"
                                style={{ backgroundColor: activeColor.accent }}
                            />

                            <div className="flex flex-col items-center text-center">
                                <div 
                                    className="p-5 rounded-3xl mb-6 border transition-all"
                                    style={{ 
                                        backgroundColor: activeColor.bg, 
                                        borderColor: activeColor.border,
                                        color: activeColor.accent
                                    }}
                                >
                                    <AlertCircle className="w-8 h-8" />
                                </div>

                                <button 
                                    onClick={onClose}
                                    className="absolute top-8 right-8 p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <h3 className="text-2xl font-black text-white tracking-tighter mb-3 uppercase">
                                    {title}
                                </h3>
                                <p className="text-xs text-white/40 leading-relaxed max-w-[280px]">
                                    {message}
                                </p>

                                <div className="grid grid-cols-2 gap-4 w-full mt-10">
                                    <button 
                                        onClick={onClose}
                                        className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[2px] hover:bg-white/10 transition-all font-black"
                                    >
                                        {cancelText}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            onConfirm();
                                            onClose();
                                        }}
                                        className="py-4 rounded-2xl text-black text-[10px] font-black uppercase tracking-[2px] transition-all shadow-lg font-black"
                                        style={{ 
                                            backgroundColor: activeColor.accent,
                                            boxShadow: `0 0 20px ${activeColor.shadow}`
                                        }}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}
