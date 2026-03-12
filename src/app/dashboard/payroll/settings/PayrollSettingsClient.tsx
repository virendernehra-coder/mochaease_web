'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Trash2, Edit3, MapPin, Shield, ArrowLeft, 
    Search, UserPlus, Wallet, Plus, Sparkles
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import Link from 'next/link';

// Mock Data
const initialEmployees = [
    { id: '1', name: 'Alex Johnson', role: 'Store Manager', salary: 4200, advance: 0, joinDate: '2024-01-15' },
    { id: '2', name: 'Sarah Miller', role: 'Senior Barista', salary: 3100, advance: 200, joinDate: '2024-03-20' },
    { id: '3', name: 'David Chen', role: 'Head Chef', salary: 3800, advance: 0, joinDate: '2023-11-10' },
    { id: '4', name: 'Emily Wilson', role: 'Floor Lead', salary: 2900, advance: 500, joinDate: '2024-02-05' },
];

export default function PayrollSettingsClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    const [employees] = useState(initialEmployees);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<typeof initialEmployees[0] | null>(null);

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic would go here
        setIsAddModalOpen(false);
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <Link href="/dashboard/payroll" className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4 hover:text-[#C3EB7A] transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Payroll
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Shield className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Payroll Governance</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-purple-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        System <span className="text-white/30">Settings.</span>
                    </h1>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                            type="text" 
                            placeholder="Search staff..."
                            className="pl-11 pr-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-[#C3EB7A]/50 transition-all w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-purple-500 text-white text-xs font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                        <UserPlus className="w-4 h-4" /> Add Staff
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Employee Directory List */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Ecosystem Directory</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{filteredEmployees.length} Active Records</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredEmployees.map((emp) => (
                            <div key={emp.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                                <div className="flex flex-wrap items-center gap-8">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform">
                                        {emp.name.charAt(0)}
                                    </div>
                                    
                                    <div className="flex-1 min-w-[200px]">
                                        <h4 className="text-lg font-black text-white tracking-tight">{emp.name}</h4>
                                        <p className="text-[10px] text-white/20 uppercase tracking-widest">{emp.role}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Base Salary</p>
                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-xl font-black text-[#C3EB7A]">${emp.salary.toLocaleString()}</span>
                                            <button 
                                                onClick={() => setEditingEmployee(emp)}
                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right min-w-[120px]">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Advance Debt</p>
                                        <span className={`text-xl font-black ${emp.advance > 0 ? 'text-amber-400' : 'text-white/10'}`}>
                                            ${emp.advance.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Panels */}
                <div className="space-y-8">
                    
                    {/* Advance Request Portal Indicator */}
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#C3EB7A]/10 to-transparent border border-[#C3EB7A]/20 relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-8 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Wallet className="w-24 h-24 text-[#C3EB7A]" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">Advance Portal</h3>
                        <p className="text-sm text-white/40 mb-6 leading-relaxed italic">Manage and approve mid-cycle liquidity requests for your team.</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <span className="text-xs font-bold text-white/60">Pending Requests</span>
                                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black">2</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50">
                                <span className="text-xs font-bold text-white/60">Total Disbursed</span>
                                <span className="text-xs font-black text-white">$4,200</span>
                            </div>
                        </div>

                        <button className="w-full py-4 rounded-2xl bg-[#C3EB7A] text-black text-[10px] font-black uppercase tracking-[3px] hover:bg-[#A8D45C] transition-all">
                            Open Advance Manager
                        </button>
                    </div>

                    {/* MOZA AI Governance */}
                    <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Moza Intelligence</span>
                        </div>
                        <h4 className="text-sm font-black text-white mb-4">Salary Optimizations</h4>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                                <p className="text-[11px] text-white/60 leading-relaxed">
                                    &quot;Sarah&apos;s performance metrics suggest a <span className="text-[#C3EB7A] font-bold">+8% market correction</span> is due for the next cycle.&quot;
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                <p className="text-[11px] text-white/60 leading-relaxed">
                                    &quot;Advise limiting further advances for Emily until the current $500 balance recovers below 50%.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modals (Logic Placeholders) */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <UserPlus className="w-32 h-32 text-purple-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white tracking-tighter mb-8">Add Staff Member</h3>
                            <form onSubmit={handleAddEmployee} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Full Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" placeholder="e.g. Michael Scott" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Role</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" placeholder="Barista" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Base Salary</label>
                                        <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all" placeholder="3000" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-5 rounded-3xl bg-purple-500 text-white font-black uppercase tracking-[3px] text-[11px] shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-purple-600 transition-all">
                                    Confirm Onboarding
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {editingEmployee && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingEmployee(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10"
                        >
                            <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Update Salary</h3>
                            <p className="text-white/30 text-xs font-bold mb-8 uppercase tracking-widest">{editingEmployee.name}</p>
                            
                            <div className="space-y-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[3px] mb-2">Current Base</p>
                                    <span className="text-4xl font-black text-white">${editingEmployee.salary.toLocaleString()}</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[2px] hover:bg-white/10 hover:text-white transition-all">Decrease</button>
                                        <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[2px] hover:bg-white/10 hover:text-white transition-all">Increase</button>
                                    </div>
                                    <button 
                                        onClick={() => setEditingEmployee(null)}
                                        className="w-full py-5 rounded-3xl bg-[#C3EB7A] text-black font-black uppercase tracking-[3px] text-[11px] shadow-[0_0_30px_rgba(195,235,122,0.3)] hover:bg-[#A8D45C] transition-all"
                                    >
                                        Seal Updates
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
