'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, PieChart, Package, 
    Settings, Sparkles, X, LogOut,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContextSwitcher from './ContextSwitcher';
import DateRangePicker from './DateRangePicker';
import { createClient } from '@/utils/supabase/client';

export default function MobileNavbar() {
    const pathname = usePathname();
    const [isHubOpen, setIsHubOpen] = useState(false);
    const supabase = createClient();

    const navItems = [
        { name: 'Analytics', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <>
            {/* Bottom Nav Bar */}
            <motion.nav 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0A0A]/80 backdrop-blur-3xl border-t border-white/5 z-[60] lg:hidden px-4 pb-safe"
            >
                <div className="flex items-center justify-around h-full max-w-md mx-auto">
                    {navItems.slice(0, 1).map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 group py-2 flex-1">
                                <item.icon className={`w-5 h-5 transition-all ${isActive ? 'text-[#C3EB7A] scale-110' : 'text-white/20 group-hover:text-white/40'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    {/* Center Pulse Button */}
                    <div className="relative -top-6 px-8">
                        <motion.button
                            onClick={() => setIsHubOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C3EB7A] to-[#A8D352] flex items-center justify-center shadow-[0_10px_30px_rgba(195,235,122,0.4)] relative group overflow-hidden"
                        >
                            <Sparkles className="w-6 h-6 text-black relative z-10" />
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C3EB7A] blur-[2px]" />
                    </div>

                    {navItems.slice(1).map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 group py-2 flex-1">
                                <item.icon className={`w-5 h-5 transition-all ${isActive ? 'text-[#C3EB7A] scale-110' : 'text-white/20 group-hover:text-white/40'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>

            {/* Mobile Control Hub Drawer */}
            <AnimatePresence>
                {isHubOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsHubOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] rounded-t-[40px] border-t border-white/10 z-[80] lg:hidden p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Handle Bar */}
                            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />

                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Control Center</h2>
                                    <button 
                                        onClick={() => setIsHubOpen(false)}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Context Switcher Section */}
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[3px] ml-1">Context Switching</p>
                                    <ContextSwitcher.MobileHub />
                                </div>

                                {/* Date Selection Section */}
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[3px] ml-1">Time Windows</p>
                                    <DateRangePicker.MobileHub />
                                </div>

                                {/* AI Quick Status */}
                                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#C3EB7A]/10 to-purple-500/10 border border-[#C3EB7A]/20 relative overflow-hidden group">
                                     <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-[2px]">Moza AI Intelligence</h4>
                                        <Sparkles className="w-4 h-4 text-[#C3EB7A]" />
                                     </div>
                                     <p className="text-sm font-bold text-white/80 tracking-tight leading-relaxed">Predictive payroll forecasting and inventory optimization is active for this view.</p>
                                </div>

                                {/* Bottom Grid Actions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <a 
                                        href="https://mochaease.com/help" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" /> Support Hub
                                    </a>
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" /> System Exit
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
