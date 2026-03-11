'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, ChevronDown, Check, Clock, 
    ArrowRight, Sparkles 
} from 'lucide-react';
import { format, subDays, startOfWeek, startOfMonth, subMonths, endOfMonth, endOfWeek } from 'date-fns';

const presets = [
    { label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) },
    { label: 'Yesterday', getValue: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
    { label: 'This Week', getValue: () => ({ from: startOfWeek(new Date()), to: new Date() }) },
    { label: 'Last Week', getValue: () => {
        const start = startOfWeek(subDays(new Date(), 7));
        return { from: start, to: endOfWeek(start) };
    }},
    { label: 'This Month', getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
    { label: 'Last Month', getValue: () => {
        const start = startOfMonth(subMonths(new Date(), 1));
        return { from: start, to: endOfMonth(start) };
    }},
];

export default function DateRangePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(presets[4].getValue());
    const [activePreset, setActivePreset] = useState('This Month');

    const toggle = () => setIsOpen(!isOpen);

    const handlePresetSelect = (preset: typeof presets[0]) => {
        setSelectedRange(preset.getValue());
        setActivePreset(preset.label);
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

                            <div className="mt-4 p-4 border-t border-white/5">
                                <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-[#4A90E2]" />
                                        <span className="text-xs font-bold tracking-tight">Custom Date Range</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
