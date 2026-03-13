'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    CreditCard, Wallet, Receipt, TrendingUp, 
    ArrowUpRight, ChevronRight, Sparkles, 
    Search, Filter, Plus, MoreHorizontal,
    TrendingDown, BarChart3, Clock, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';

export default function ExpensesClient() {
    const { activeContextId } = useBusinessStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Expenses Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <CreditCard className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-rose-400 uppercase tracking-[3px]">Capital Outflow</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-rose-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Expense <span className="text-white/30">Hub.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Monitor operating costs, manage vendor payments, and automate tax-ready expense tracking.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Receipt className="w-4 h-4" /> Scan Receipt
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#C3EB7A] text-black text-xs font-black uppercase tracking-widest hover:bg-[#A8D45C] transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]">
                        <Plus className="w-4 h-4" strokeWidth={3} /> Record Expense
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Opex" value="$24,850" sub="Month to date" trend="+4.2%" icon={<Wallet className="w-5 h-5" />} color="blue" />
                <KPICard title="Burn Rate" value="$840" sub="Daily ecosystem avg" trend="-2.1%" icon={<TrendingDown className="w-5 h-5" />} color="emerald" />
                <KPICard title="Pending Audit" value="12" sub="Flagged transactions" trend="+3" icon={<Clock className="w-5 h-5" />} color="amber" />
                <KPICard title="Tax Savings" value="$1,420" sub="Moza identified" trend="+15%" icon={<Sparkles className="w-5 h-5" />} color="purple" />
            </div>

            {/* Expenses Breakdown & Log */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Category Mix */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 group relative overflow-hidden">
                    <h3 className="text-xl font-black text-white mb-8">Category Mix</h3>
                    
                    <div className="space-y-6">
                        <ExpenseBar label="Supply Chain" value="$12,400" percentage={50} color="blue" />
                        <ExpenseBar label="Labor Extras" value="$6,200" percentage={25} color="emerald" />
                        <ExpenseBar label="Maintenance" value="$4,150" percentage={18} color="amber" />
                        <ExpenseBar label="Marketing" value="$2,100" percentage={7} color="purple" />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Audit Score</p>
                        <p className="text-sm font-bold text-emerald-400 leading-tight">98.5% High Accuracy</p>
                    </div>
                </div>

                {/* Transaction Log */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Recent Transactions</h3>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                            <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Date ▾</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <ExpenseRow vendor="Star Supply Co." category="Supply Chain" amount="$1,240.50" date="Mar 11" status="Paid" />
                        <ExpenseRow vendor="Local Repairs" category="Maintenance" amount="$450.00" date="Mar 11" status="Audited" />
                        <ExpenseRow vendor="Digital Marketing" category="Ads" amount="$800.00" date="Mar 10" status="Paid" />
                        <ExpenseRow vendor="Fresh Produce Ltd" category="Supply Chain" amount="$610.20" date="Mar 09" status="Pending" />
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Complete Ledger
                    </button>
                </div>
            </div>

            {/* Smart Expense Optimization */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">Tax & Cost Insights</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">MOZA OPTIMIZER ON</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Vendor Duplication" 
                        text="Outlet #1 and #4 are using different vendors for similar stock. Consolidating to 'Global Supply' will save 12%." 
                        area="Procurement"
                    />
                    <InsightCard 
                        title="Tax Deduction" 
                        text="Identified $4,200 in R&D tax credit eligibility based on your recent 'Green-Energy' upgrades." 
                        area="Compliance"
                    />
                    <InsightCard 
                        title="Waste reduction" 
                        text="Fresh produce expenses in Downtown Cafe are +25% above usage. Suggesting 48h inventory check." 
                        area="Efficiency"
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

function ExpenseBar({ label, value, percentage, color }: { label: string, value: string, percentage: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold text-white">{value}</span>
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

function ExpenseRow({ vendor, category, amount, date, status }: { vendor: string, category: string, amount: string, date: string, status: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-[#C3EB7A] group-hover:border-[#C3EB7A] group-hover:text-black transition-all`}>
                <Receipt className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white tracking-tight truncate">{vendor}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{category} • {date}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Amount</p>
                <p className="text-sm font-black text-white">{amount}</p>
            </div>
            <div className="hidden lg:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                    status === 'Paid' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                    status === 'Audited' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                    'text-amber-400 border-amber-400/20 bg-amber-400/5'
                }`}>
                    {status}
                </span>
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, area }: { title: string, text: string, area: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-rose-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400 uppercase tracking-widest">
                    {area}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-rose-400 uppercase tracking-widest hover:gap-2 transition-all">
                Financial Audit <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
