'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ChevronDown, Check, Globe } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';

import { BusinessOutlet } from '@/utils/supabase/queries-client';

export default function ContextSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUserStore();
    const { outlets, setActiveContext, activeContextId } = useBusinessStore();

    // Map static options + dynamic outlets
    const options = [
        { id: 'business', name: 'Global Business', type: 'Level 1', icon: Globe, color: 'text-[#C3EB7A]' },
        ...outlets.map((o: BusinessOutlet) => ({
            id: o.outlet_id,
            name: o.outlet_name,
            type: `Outlet #${o.id}`,
            icon: Store,
            color: o.id % 2 === 0 ? 'text-[#4A90E2]' : 'text-purple-400'
        }))
    ];

    const selected = options.find(opt => opt.id === activeContextId) || options[0];

    const handleSelect = (option: typeof options[0]) => {
        setActiveContext(option.id, option.name, option.type);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 hover:bg-white/10 transition-all text-left w-full sm:w-auto"
            >
                <div className={`p-2 rounded-xl bg-black/40 ${selected.color}`}>
                    <selected.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-white leading-none mb-1 truncate">{selected.name}</h4>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none truncate">{selected.type}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/20 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute left-0 mt-3 w-80 bg-[#0F0F0F]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl z-[70] overflow-hidden p-2"
                        >
                            <div className="p-4 border-b border-white/5 mb-2">
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">Select Viewpoint</h4>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-1">
                                {options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                                            selected.id === option.id 
                                            ? 'bg-white/10' 
                                            : 'hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 text-left">
                                            <div className={`p-2 rounded-xl bg-black/40 ${option.color}`}>
                                                <option.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-bold text-white leading-none mb-1">{option.name}</h5>
                                                <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest leading-none">{option.type}</p>
                                            </div>
                                        </div>
                                        {selected.id === option.id && <Check className="w-4 h-4 text-[#C3EB7A]" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

ContextSwitcher.MobileHub = function MobileHub() {
    const { user } = useUserStore();
    const { outlets, setActiveContext, activeContextId } = useBusinessStore();

    const options = [
        { id: 'business', name: 'Global Business', type: 'Level 1', icon: Globe, color: 'text-[#C3EB7A]' },
        ...outlets.map((o: BusinessOutlet) => ({
            id: o.outlet_id,
            name: o.outlet_name,
            type: `Outlet #${o.id}`,
            icon: Store,
            color: o.id % 2 === 0 ? 'text-[#4A90E2]' : 'text-purple-400'
        }))
    ];

    const selected = options.find(opt => opt.id === activeContextId) || options[0];

    return (
        <div className="grid grid-cols-1 gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setActiveContext(option.id, option.name, option.type)}
                    className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all border ${
                        selected.id === option.id 
                        ? 'bg-white/10 border-white/10 shadow-inner' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                    }`}
                >
                    <div className="flex items-center gap-4 text-left">
                        <div className={`p-2.5 rounded-2xl bg-black/40 ${option.color}`}>
                            <option.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h5 className="text-[15px] font-black text-white leading-none mb-1 uppercase tracking-tight">{option.name}</h5>
                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none">{option.type}</p>
                        </div>
                    </div>
                    {selected.id === option.id && (
                        <div className="w-8 h-8 rounded-full bg-[#C3EB7A]/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#C3EB7A]" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};
