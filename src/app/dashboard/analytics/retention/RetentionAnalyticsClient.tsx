'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    UserMinus, 
    TrendingUp, 
    RefreshCcw, 
    ArrowLeft,
    Filter,
    Sparkles,
    ChevronRight,
    Star,
    AlertCircle,
    Calendar,
    MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { formatCurrency } from '@/utils/format';

export default function RetentionAnalyticsClient() {
    const router = useRouter();
    const { businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const currency = businessConfig?.currency || 'USD';
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    // Mock Data for Retention Metrics
    const metrics = [
        { title: "Net Retention Rate", value: "84.2%", subtitle: "+2.4% from last month", icon: <RefreshCcw className="w-4 h-4 text-[#C3EB7A]" />, color: "from-[#C3EB7A]/20 to-transparent" },
        { title: "Customer Churn", value: "3.1%", subtitle: "-0.5% optimization", icon: <UserMinus className="w-4 h-4 text-red-400" />, color: "from-red-400/20 to-transparent" },
        { title: "Avg. Customer LTV", value: 1450, subtitle: "Total lifetime value", icon: <TrendingUp className="w-4 h-4 text-blue-400" />, color: "from-blue-400/20 to-transparent", isCurrency: true },
        { title: "Loyalty Index", value: "92/100", subtitle: "Customer sentiment score", icon: <Star className="w-4 h-4 text-yellow-400" />, color: "from-yellow-400/20 to-transparent" },
    ];

    // Cohort Data for Heatmap
    const cohortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const cohortData = [
        [100, 85, 72, 68, 62, 58],
        [100, 82, 75, 70, 65],
        [100, 88, 80, 75],
        [100, 92, 85],
        [100, 94],
        [100]
    ];

    const getHeatmapColor = (value: number) => {
        if (value >= 90) return 'bg-[#C3EB7A] text-black';
        if (value >= 80) return 'bg-[#C3EB7A]/80 text-black/80';
        if (value >= 70) return 'bg-[#C3EB7A]/60 text-white/80';
        if (value >= 60) return 'bg-[#C3EB7A]/40 text-white/60';
        return 'bg-white/5 text-white/30';
    };

    const atRiskCustomers = [
        { name: "Johnathan Smith", lastActive: "12 days ago", ltv: 4200, risk: "High", reason: "Expired Subscription" },
        { name: "Sarah Williams", lastActive: "18 days ago", ltv: 2800, risk: "Medium", reason: "Lower Frequency" },
        { name: "Michael Chen", lastActive: "24 days ago", ltv: 8500, risk: "High", reason: "Zero Activity" },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <motion.button 
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.back()}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all backdrop-blur-xl shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </motion.button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3 h-3 text-[#C3EB7A]" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter">Retention <span className="text-white/30 font-extrabold">Dynamics.</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/40">
                        <Calendar className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Last 6 Months</span>
                    </div>
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {metrics.map((metric, idx) => (
                    <MetricCard key={metric.title} {...metric} delay={idx * 0.1} currency={currency} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cohort Analysis Section (Span 2) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 relative group"
                >
                    <div className="absolute inset-0 bg-[#C3EB7A]/5 blur-[100px] rounded-full -z-10 group-hover:bg-[#C3EB7A]/10 transition-colors" />
                    
                    <div className="bg-[#0F0F0F]/80 border border-white/5 rounded-[40px] p-8 md:p-10 backdrop-blur-3xl overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Cohort Analysis</h3>
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mt-1.5 flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5 text-[#C3EB7A]" />
                                    Monthly Customer Retention Stickiness
                                </p>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                Percentage (%)
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <div className="min-w-[500px]">
                                {/* Header Months */}
                                <div className="grid grid-cols-7 gap-3 mb-6">
                                    <div className="text-[10px] font-black text-white/10 uppercase tracking-widest pl-2">Cohort</div>
                                    {cohortMonths.map((m, i) => (
                                        <div key={m} className="text-center text-[10px] font-black text-white/20 uppercase tracking-widest">
                                            Month {i}
                                        </div>
                                    ))}
                                </div>

                                {/* Cohort Rows */}
                                <div className="space-y-3">
                                    {cohortMonths.map((month, rowIdx) => (
                                        <div key={month} className="grid grid-cols-7 gap-3 items-center">
                                            <div className="text-sm font-black text-white/80 pl-2">{month} 24</div>
                                            {cohortData[rowIdx].map((val, colIdx) => (
                                                <motion.div 
                                                    key={colIdx}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (rowIdx * 0.1) + (colIdx * 0.05) }}
                                                    className={`aspect-square sm:aspect-auto sm:h-12 flex items-center justify-center rounded-xl text-xs font-black transition-transform hover:scale-110 shadow-lg ${getHeatmapColor(val)}`}
                                                >
                                                    {val}%
                                                </motion.div>
                                            ))}
                                            {/* Fill remaining empty cells */}
                                            {Array.from({ length: 6 - cohortData[rowIdx].length }).map((_, i) => (
                                                <div key={`empty-${i}`} className="aspect-square sm:aspect-auto sm:h-12 bg-white/[0.02] border border-white/5 rounded-xl" />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Churn Risk Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                >
                    <div className="bg-[#0F0F0F]/80 border border-white/5 rounded-[40px] p-8 md:p-10 backdrop-blur-3xl h-full">
                        <div className="mb-10">
                            <h3 className="text-xl font-black text-white tracking-tight">Churn Radar</h3>
                            <p className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mt-1.5 flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                                High Value At-Risk Customers
                            </p>
                        </div>

                        <div className="space-y-6">
                            {atRiskCustomers.map((customer, idx) => (
                                <motion.div 
                                    key={customer.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + (idx * 0.1) }}
                                    className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group overflow-hidden relative"
                                >
                                    <div className={`absolute top-0 right-0 w-16 h-16 blur-xl -z-10 opacity-20 ${customer.risk === 'High' ? 'bg-red-500' : 'bg-orange-500'}`} />
                                    
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-sm font-black text-white group-hover:text-[#C3EB7A] transition-colors">{customer.name}</h4>
                                            <p className="text-[10px] text-white/30 font-bold mt-0.5">Last Activity: {customer.lastActive}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${customer.risk === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                            {customer.risk} Risk
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white">{formatCurrency(customer.ltv, currency)}</span>
                                            <span className="text-[9px] font-bold text-white/30 uppercase">LTV Value</span>
                                        </div>
                                        <button className="p-2 rounded-xl bg-white/5 text-white/20 group-hover:bg-[#C3EB7A]/20 group-hover:text-[#C3EB7A] transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-4 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] font-black text-[10px] uppercase tracking-[2px] border border-[#C3EB7A]/20 hover:bg-[#C3EB7A]/20 transition-all flex items-center justify-center gap-3 group">
                            <Sparkles className="w-4 h-4" />
                            Run Retention AI Campaign
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, subtitle, icon, color, delay, isCurrency, currency }: { title: string, value: string | number, subtitle: string, icon: React.ReactNode, color: string, delay: number, isCurrency?: boolean, currency: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "circOut" }}
            className="p-6 md:p-8 rounded-[32px] bg-[#0F0F0F]/80 border border-white/5 group hover:border-white/10 transition-all duration-500 relative overflow-hidden backdrop-blur-xl"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 text-white/20 group-hover:text-inherit transition-all duration-500 border border-white/5 group-hover:border-white/10">
                        {icon}
                    </div>
                </div>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-2">{title}</h3>
                <p className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1.5">
                    {isCurrency ? formatCurrency(Number(value), currency) : value}
                </p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{subtitle}</p>
            </div>
        </motion.div>
    );
}
