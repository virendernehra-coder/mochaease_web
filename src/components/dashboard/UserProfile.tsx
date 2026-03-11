'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    UserCircle, Settings, LogOut, Shield, 
    ChevronDown, Mail, Building2, Store,
    ArrowRightCircle, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/user-store';
import { createClient } from '@/utils/supabase/client';

export default function UserProfile() {
    const { user, clearSession } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // clearSession() is handled by AuthInitializer's onAuthStateChange listener
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Trigger */}
            <motion.button 
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#4A90E2] to-purple-500 flex items-center justify-center border border-white/10 relative">
                    {user.profile_pic ? (
                        <img 
                            src={user.profile_pic} 
                            alt={user.first_name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UserCircle className="w-6 h-6 text-white" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity" />
                </div>
                
                <div className="hidden md:block text-left">
                    <p className="text-xs font-black text-white tracking-tight">{user.first_name} {user.last_name}</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider flex items-center gap-1">
                        {user.role === 'owner' ? (
                            <Shield className="w-2.5 h-2.5 text-[#C3EB7A]" />
                        ) : (
                            <Store className="w-2.5 h-2.5 text-blue-400" />
                        )}
                        {user.role}
                    </p>
                </div>
                
                <ChevronDown className={`w-4 h-4 text-white/20 group-hover:text-white transition-all ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Dropdown Popover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[100]"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-white/5 relative bg-gradient-to-br from-white/[0.02] to-transparent">
                            <div className="absolute top-0 right-0 p-4">
                                <Sparkles className="w-8 h-8 text-[#C3EB7A]/10" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#C3EB7A]/10 border-2 border-[#C3EB7A]/20 flex items-center justify-center">
                                    {user.profile_pic ? (
                                        <img src={user.profile_pic} alt="" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <UserCircle className="w-8 h-8 text-[#C3EB7A]" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white tracking-tight leading-tight">
                                        {user.first_name} {user.last_name}
                                    </h4>
                                    <p className="text-xs text-white/40 font-medium lowercase flex items-center gap-1.5 mt-1">
                                        <Mail className="w-3 h-3" /> {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="p-2 rounded-lg bg-[#4A90E2]/10">
                                        <Building2 className="w-4 h-4 text-[#4A90E2]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Managing</p>
                                        <p className="text-xs font-bold text-white truncate">{user.business_name || 'Individual'}</p>
                                    </div>
                                </div>
                                {user.outlet_name && (
                                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="p-2 rounded-lg bg-[#C3EB7A]/10">
                                            <Store className="w-4 h-4 text-[#C3EB7A]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Outlet</p>
                                            <p className="text-xs font-bold text-white truncate">{user.outlet_name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions Section */}
                        <div className="p-4 bg-black/40">
                            <Link href="/dashboard/settings/profile">
                                <DropdownItem icon={<Settings className="w-4 h-4" />} label="Profile Settings" />
                            </Link>
                            <DropdownItem icon={<ArrowRightCircle className="w-4 h-4" />} label="Security Hub" />
                            <div className="h-[1px] bg-white/5 my-2 mx-4" />
                            <button 
                                onClick={handleLogout}
                                className="w-full group flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all text-sm font-black tracking-tight"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                System Exit
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DropdownItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="w-full group flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm font-black tracking-tight">
            <div className="text-white/20 group-hover:text-[#C3EB7A] transition-colors">{icon}</div>
            {label}
        </button>
    );
}
