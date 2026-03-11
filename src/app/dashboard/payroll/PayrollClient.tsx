'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    PieChart, Calendar, Users, 
    ArrowUpRight, ChevronRight, Sparkles, 
    DollarSign, TrendingDown,
    Download, Clock, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function PayrollClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    // Simulated context-specific data
    const totalPayout = isGlobal ? "$42,850" : "$14,240";
    const staffCount = isGlobal ? "48" : "12";
    const laborPerc = isGlobal ? "18.2%" : "16.5%";
    
    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Payroll Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <PieChart className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Capital Management</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-purple-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Payroll <span className="text-white/30">Command.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Centralize compensation, track pay cycles, and optimize labor costs with AI-driven insights.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-purple-500 text-white text-xs font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        Run New Cycle
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Payout" value={totalPayout} sub="Next Cycle: Mar 15" trend="+2.4%" icon={<DollarSign className="w-5 h-5" />} color="emerald" />
                <KPICard title="Staff Count" value={staffCount} sub="Active this cycle" trend="0%" icon={<Users className="w-5 h-5" />} color="blue" />
                <KPICard title="Labor %" value={laborPerc} sub="Target: 20%" trend="-1.5%" icon={<TrendingDown className="w-5 h-5" />} color="purple" trendColor="emerald" />
                <KPICard title="Variable Pay" value={isGlobal ? "$6,240" : "$1,850"} sub="Tips & Commissions" trend="+8.1%" icon={<Sparkles className="w-5 h-5" />} color="amber" />
            </div>

            {/* Pay Cycle & Distribution Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Pay Cycle Monitor */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Calendar className="w-24 h-24 text-purple-500" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-8">Pay Cycle Monitor</h3>
                    
                    <div className="space-y-8">
                        <CycleStage title="Initialization" date="Mar 01" status="Completed" complete={true} />
                        <CycleStage title="Verification" date="Mar 10" status="In Progress" active={true} />
                        <CycleStage title="Disbursement" date="Mar 15" status="Pending" />
                    </div>

                    <div className="mt-12 p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Action Required</span>
                        </div>
                        <p className="text-xs text-white/60 mb-4 leading-relaxed">Verification window closes in 48 hours for the current cycle.</p>
                        <button className="text-[10px] font-black text-white uppercase tracking-[2px] hover:text-[#C3EB7A] transition-colors">Start Verification →</button>
                    </div>
                </div>

                {/* Staff Compensation Breakdown */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Staff Compensation Breakdown</h3>
                        <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Payout ▾</p>
                    </div>
                    
                    <div className="space-y-4">
                        <StaffRow name="Alex Johnson" role="Store Manager" base="$4,200" variable="$850" total="$5,050" status="Verified" />
                        <StaffRow name="Sarah Miller" role="Senior Barista" base="$3,100" variable="$420" total="$3,520" status="Verified" />
                        <StaffRow name="David Chen" role="Head Chef" base="$3,800" variable="$610" total="$4,410" status="Pending" />
                        <StaffRow name="Emily Wilson" role="Floor Lead" base="$2,900" variable="$380" total="$3,280" status="Verified" />
                        <StaffRow name="James Rodriguez" role="Cashier" base="$2,400" variable="$150" total="$2,550" status="Pending" />
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View All Staff (48)
                    </button>
                </div>
            </div>

            {/* Moza AI Payroll Insights */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Moza Payroll Insights</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">PREDICTIVE LOGIC ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Labor Compression" 
                        text="Shifting 2 baristas from AM to PM on Outlet #2 will reduce labor hours by 12% without affecting throughput." 
                        saving="$840/mo"
                    />
                    <InsightCard 
                        title="Automated Deductions" 
                        text="Detected 4 tax-saving opportunities for the current cycle based on regional compliance updates." 
                        saving="$1,200/mo"
                    />
                    <InsightCard 
                        title="Early Payout Risk" 
                        text="Current variable pay in Outlet #4 is +20% above trend. Suggesting review of commission triggers." 
                        saving="Risk Mitigation"
                    />
                </div>
            </div>

        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color, trendColor }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string, trendColor?: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`w-12 h-12 text-${color}-500`}>{icon}</div>
            </div>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-3xl font-black text-white mb-1 tracking-tighter">{value}</h4>
            <div className="flex items-center gap-2 mt-4">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-${trendColor || color}-500/10 text-${trendColor || color}-400`}>{trend}</span>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{sub}</span>
            </div>
        </div>
    );
}

function CycleStage({ title, date, status, active, complete }: { title: string, date: string, status: string, active?: boolean, complete?: boolean }) {
    return (
        <div className="relative pl-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 ${complete ? 'bg-purple-500 border-purple-500' : active ? 'bg-black border-purple-500' : 'bg-black border-white/10'} z-10`} />
                <div className="absolute top-[100%] w-0.5 h-16 bg-white/5 -z-0" />
            </div>
            <div className="flex justify-between items-center group cursor-default">
                <div>
                    <h4 className={`text-sm font-black ${active ? 'text-white' : 'text-white/40'} transition-colors`}>{title}</h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">{date}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${complete ? 'text-purple-400 border-purple-400/20' : active ? 'text-[#C3EB7A] border-[#C3EB7A]/20' : 'text-white/10 border-white/10'}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

function StaffRow({ name, role, base, variable, total, status }: { name: string, role: string, base: string, variable: string, total: string, status: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-white group-hover:bg-purple-500 group-hover:border-purple-500 transition-all">
                {name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{role}</p>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Base / Var</p>
                <p className="text-xs font-bold text-white/60">{base} / {variable}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Total</p>
                <p className="text-sm font-black text-[#C3EB7A]">{total}</p>
            </div>
            <div className={`hidden lg:flex px-3 py-1 rounded-full border ${status === 'Verified' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 'text-amber-400 border-amber-400/20 bg-amber-400/5'} text-[9px] font-black uppercase tracking-widest`}>
                {status}
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, saving }: { title: string, text: string, saving: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-purple-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    {saving}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-purple-400 uppercase tracking-widest hover:gap-2 transition-all">
                Analyze Optimization <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
