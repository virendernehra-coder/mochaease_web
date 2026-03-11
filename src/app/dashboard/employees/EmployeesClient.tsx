'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, UserPlus, Shield, Star, 
    ArrowUpRight, ChevronRight, Sparkles, 
    Search, Filter, MoreHorizontal,
    Briefcase, GraduationCap, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function EmployeesClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Employees Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[3px]">Human Capital</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-blue-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Team <span className="text-white/30">Force.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Manage roles, track performance, and empower your staff with dedicated growth paths.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Search className="w-4 h-4" /> Search Directory
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-500 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <UserPlus className="w-4 h-4" /> Onboard Staff
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Headcount" value="48" sub="Full ecosystem" trend="+3" icon={<Users className="w-5 h-5" />} color="blue" />
                <KPICard title="Happiness Index" value="4.8/5" sub="Quarterly average" trend="+0.2" icon={<Star className="w-5 h-5" />} color="amber" />
                <KPICard title="Certifications" value="124" sub="Active skills" trend="+12" icon={<Shield className="w-5 h-5" />} color="emerald" />
                <KPICard title="Retention" value="94%" sub="Annual rate" trend="+2.1%" icon={<Sparkles className="w-5 h-5" />} color="purple" />
            </div>

            {/* Team Distribution & Growth */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Role Composition */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 group relative overflow-hidden">
                    <h3 className="text-xl font-black text-white mb-8">Role Composition</h3>
                    
                    <div className="space-y-6">
                        <RoleBar label="Management" count={12} total={48} color="blue" />
                        <RoleBar label="Service Staff" count={24} total={48} color="emerald" />
                        <RoleBar label="Kitchen Team" count={8} total={48} color="amber" />
                        <RoleBar label="Support" count={4} total={48} color="purple" />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Growth Forecast</p>
                            <p className="text-sm font-bold text-[#C3EB7A]">+5 New Positions Need</p>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-[#C3EB7A]" />
                    </div>
                </div>

                {/* Performance Feed */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Top Performance Feed</h3>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                            <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Rank ▾</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <EmployeeRow name="Alex Miller" role="Store Manager" rank="#1" rating="4.95" status="Active" />
                        <EmployeeRow name="Sarah Chen" role="Head Barista" rank="#2" rating="4.92" status="Active" />
                        <EmployeeRow name="Emily Rodriguez" role="Senior Cashier" rank="#3" rating="4.88" status="Active" />
                        <EmployeeRow name="James Wilson" role="Barista" rank="#4" rating="4.85" status="Active" />
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Directory (48)
                    </button>
                </div>
            </div>

            {/* Smart HR Insights */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">HR Intelligence</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                        <Shield className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">SECURE AUDIT ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Skill Matching" 
                        text="James (Outlet #2) exhibits high leadership traits. Candidate for Store Manager vacancy in Downtown." 
                        area="Promotion Path"
                    />
                    <InsightCard 
                        title="Churn Risk" 
                        text="Outlet #4 turnover increased by 15%. Suggesting engagement review for the management there." 
                        area="Retention Strategy"
                    />
                    <InsightCard 
                        title="Compliance Audit" 
                        text="4 staff members have health certifications expiring within 30 days. Reminders sent." 
                        area="Legal Safety"
                    />
                </div>
            </div>

        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`w-12 h-12 text-${color}-500`}>{icon}</div>
            </div>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-3xl font-black text-white mb-1 tracking-tighter">{value}</h4>
            <div className="flex items-center gap-2 mt-4">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-${color}-500/10 text-${color}-400`}>{trend}</span>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{sub}</span>
            </div>
        </div>
    );
}

function RoleBar({ label, count, total, color }: { label: string, count: number, total: number, color: string }) {
    const percentage = (count / total) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold text-white">{count} Staff</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--${color}-rgb),0.5)]`}
                />
            </div>
        </div>
    );
}

function EmployeeRow({ name, role, rank, rating, status }: { name: string, role: string, rank: string, rating: string, status: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-black text-sm text-white transition-all group-hover:scale-105">
                {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                    <span className="text-[9px] font-black text-[#C3EB7A] px-1.5 py-0.5 rounded-md bg-[#C3EB7A]/10 border border-[#C3EB7A]/20">{rank}</span>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{role}</p>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" /> {rating}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <span className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {status}
                </span>
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <Briefcase className="w-4 h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, area }: { title: string, text: string, area: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-blue-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    {area}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:gap-2 transition-all">
                Staff Review <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
