'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Target, 
    TrendingUp, 
    TrendingDown, 
    Zap, 
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getSalesPerformance, getBusinessInfo } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';

interface SalesMetric {
    label: string;
    amount: number;
    delta: number;
    isPositive: boolean;
}

export default function PerformanceDashboard() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;

    // Fetch Performance Data
    const { data: thisWeekData, isLoading: loadingThisWeek } = useQuery({
        queryKey: ['sales', 'this_week', businessId, outletId],
        queryFn: () => getSalesPerformance('this_week', businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    const { data: lastWeekData, isLoading: loadingLastWeek } = useQuery({
        queryKey: ['sales', 'last_week', businessId, outletId],
        queryFn: () => getSalesPerformance('last_week', businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 60, // Last week data is static, cache for 1 hour
    });

    const { data: thisMonthData, isLoading: loadingThisMonth } = useQuery({
        queryKey: ['sales', 'this_month', businessId, outletId],
        queryFn: () => getSalesPerformance('this_month', businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5,
    });

    const { data: bizInfo } = useQuery({
        queryKey: ['business-info', businessId],
        queryFn: () => getBusinessInfo(businessId!),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 30, // Business settings change rarely
    });

    const { data: todayData } = useQuery({
        queryKey: ['sales', 'today', businessId, outletId],
        queryFn: () => getSalesPerformance('today', businessId!, outletId),
        enabled: !!businessId
    });

    const { data: yesterdayData } = useQuery({
        queryKey: ['sales', 'yesterday', businessId, outletId],
        queryFn: () => getSalesPerformance('yesterday', businessId!, outletId),
        enabled: !!businessId
    });

    // Derived State
    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';
    const monthlyGoal = bizInfo?.business_monthly_revenue_goal || 100000;
    const currentProgress = thisMonthData?.gross_sales || 0;
    const progressPercent = Math.min((currentProgress / monthlyGoal) * 100, 100);

    const thisWeekAmount = thisWeekData?.gross_sales || 0;
    const lastWeekAmount = lastWeekData?.gross_sales || 0;

    const todayAmount = todayData?.gross_sales || 0;
    const yesterdayAmount = yesterdayData?.gross_sales || 0;

    const calculateDelta = (curr: number, prev: number) => {
        if (prev === 0) return curr > 0 ? 100 : 0;
        return ((curr - prev) / prev) * 100;
    };

    const weekDelta = calculateDelta(thisWeekAmount, lastWeekAmount);
    const dayDelta = calculateDelta(todayAmount, yesterdayAmount);
    const dayDiff = todayAmount - yesterdayAmount;

    const metrics: SalesMetric[] = [
        { 
            label: 'This Week', 
            amount: thisWeekAmount, 
            delta: parseFloat(weekDelta.toFixed(1)), 
            isPositive: weekDelta >= 0 
        },
        { 
            label: 'Last Week', 
            amount: lastWeekAmount, 
            delta: 0, 
            isPositive: true 
        },
    ];

    if (loadingThisWeek || loadingLastWeek || loadingThisMonth) {
        return <div className="h-48 flex items-center justify-center text-white/20 animate-pulse font-black uppercase tracking-widest">Hydrating Performance Layer...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Monthly Goal Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 relative overflow-hidden rounded-[32px] bg-[#111111] border border-white/5 p-5 md:p-8 group"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C3EB7A]/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-[#C3EB7A]/10 transition-colors duration-700" />
                
                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 md:p-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white/40 uppercase tracking-[2px]">Revenue Milestone</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl md:text-2xl font-black text-white tracking-tight">Monthly Target</span>
                                    <Sparkles className="w-4 h-4 text-[#C3EB7A] animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
                            <span className="px-3 py-1 rounded-full bg-[#C3EB7A]/10 text-[#C3EB7A] text-[10px] font-black border border-[#C3EB7A]/20 uppercase tracking-widest whitespace-nowrap">
                                On Track
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <p className="text-2xl md:text-5xl font-black text-white tracking-tighter mb-1 flex flex-wrap items-baseline gap-x-2">
                                    <span>{formatCurrency(currentProgress, currency)}</span>
                                    <span className="text-sm md:text-xl text-white/20">/ {formatCurrency(monthlyGoal, currency)}</span>
                                </p>
                                <p className="text-xs md:text-sm font-bold text-white/40">You've reached {progressPercent.toFixed(1)}% of your monthly goal.</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className={`text-sm font-black flex items-center gap-1 justify-end ${dayDiff >= 0 ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                    {dayDiff >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    {dayDiff >= 0 ? '+' : '-'}{formatCurrency(Math.abs(dayDiff), currency)}
                                </p>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Vs Yesterday ({dayDelta.toFixed(1)}%)</p>
                            </div>
                        </div>

                        {/* Progress Visualization */}
                        <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C3EB7A] to-[#A3D94A] shadow-[0_0_20px_rgba(195,235,122,0.4)]"
                            />
                            {/* Decorative Grid on Bar */}
                            <div className="absolute inset-0 flex justify-between px-1 opacity-20">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-[1px] h-full bg-black/50" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Weekly Comparison Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[32px] bg-[#111111] border border-white/5 p-5 md:p-8 flex flex-col justify-between group overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-black text-white/40 uppercase tracking-[2px]">Weekly Velocity</h3>
                    </div>

                    <div className="space-y-6">
                        {metrics.map((metric, idx) => (
                            <div key={metric.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{metric.label}</p>
                                    <p className="text-xl font-black text-white">{formatCurrency(metric.amount, currency)}</p>
                                </div>
                                <div className={`flex flex-col items-end ${metric.isPositive ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                    <div className="flex items-center gap-1 font-black text-xs">
                                        {metric.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        {metric.delta}%
                                    </div>
                                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">Delta</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="relative z-10 mt-6 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[2px] transition-all hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-2">
                    Deep Performance Analysis
                    <ChevronRight className="w-4 h-4" />
                </button>
            </motion.div>
        </div>
    );
}
