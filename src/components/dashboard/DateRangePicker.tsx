'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, ChevronDown, Check, Clock, 
    ArrowRight, Sparkles 
} from 'lucide-react';
import { format, subDays, startOfWeek, startOfMonth, subMonths, endOfMonth, endOfWeek, startOfDay, endOfDay } from 'date-fns';

import { useFilterStore, presets } from '@/store/filter-store';

export default function DateRangePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedRange, activePreset, setDateRange } = useFilterStore();

    const toggle = () => setIsOpen(!isOpen);

    const handlePresetSelect = (preset: typeof presets[0]) => {
        setDateRange(preset.getValue(), preset.label);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={toggle}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-bold text-sm"
            >
                <div className="p-1.5 rounded-lg bg-[#4A90E2]/20 text-[#4A90E2]">
                    <Calendar className="w-4 h-4" />
                </div>
                <span>
                    {format(selectedRange.from, 'MMM d')} - {format(selectedRange.to, 'MMM d, yyyy')}
                </span>
                <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for click-away */}
                        <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-80 bg-[#0F0F0F]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[70] overflow-hidden p-2"
                        >
                            <div className="p-4 border-b border-white/5 mb-2">
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">Select Time Window</h4>
                            </div>

                            <div className="grid grid-cols-1 gap-1">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => handlePresetSelect(preset)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                                            activePreset === preset.label 
                                            ? 'bg-[#C3EB7A]/10 text-[#C3EB7A]' 
                                            : 'text-white/40 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${activePreset === preset.label ? 'bg-[#C3EB7A]' : 'bg-transparent border border-white/20'}`} />
                                            <span className="text-sm font-bold tracking-tight">{preset.label}</span>
                                        </div>
                                        <div className="text-[10px] font-medium opacity-40">
                                            {format(preset.getValue().from, 'MMM d')}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 p-4 border-t border-white/5 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-widest pl-1">Start Date</label>
                                        <input 
                                            type="date" 
                                            value={format(selectedRange.from, 'yyyy-MM-dd')}
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                if (!isNaN(date.getTime())) {
                                                    setDateRange({ ...selectedRange, from: startOfDay(date) }, 'Custom Range');
                                                }
                                            }}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-purple-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-widest pl-1">End Date</label>
                                        <input 
                                            type="date" 
                                            value={format(selectedRange.to, 'yyyy-MM-dd')}
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                if (!isNaN(date.getTime())) {
                                                    setDateRange({ ...selectedRange, to: endOfDay(date) }, 'Custom Range');
                                                }
                                            }}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-purple-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] shadow-purple-500/20 active:scale-[0.98]"
                                >
                                    Apply Custom Range
                                </button>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-[#C3EB7A]/5 to-[#4A90E2]/5 text-center">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Sparkles className="w-3 h-3" /> Predictive Insights active
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
