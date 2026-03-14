'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Filter, 
    MapPin, TrendingUp,
    Coffee, Utensils, IceCream, Pizza, GlassWater, 
    Zap, Sparkles, LayoutGrid, PieChart as PieChartIcon,
    ArrowUpRight, Target, Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getCategoryPerformance } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const CATEGORY_COLORS = ['#C3EB7A', '#4A90E2', '#F59E0B', '#8B5CF6', '#EC4899', '#10B981', '#F43F5E'];

const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('coffee') || lower.includes('espresso')) return Coffee;
    if (lower.includes('bakery') || lower.includes('food')) return Utensils;
    if (lower.includes('dessert') || lower.includes('ice cream')) return IceCream;
    if (lower.includes('pizza')) return Pizza;
    if (lower.includes('drink') || lower.includes('beverage')) return GlassWater;
    return LayoutGrid;
};

export default function CategorySalesClient() {
    const router = useRouter();
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    
    const isGlobal = activeContextId === 'business';
    const businessId = user?.business_id;
    const outletId = isGlobal ? null : activeContextId;
    const currency = businessConfig?.currency || 'USD';

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['category-performance', businessId, outletId],
        queryFn: () => getCategoryPerformance(businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 15, // 15 minutes
    });

    const contextName = isGlobal ? 'Global Business' : 'Selected Outlet';

    const chartData = useMemo(() => {
        if (!rawData) return [];
        return rawData.map((item, idx) => ({
            name: item.category_name,
            value: Number(item.net_sales),
            share: parseFloat(item.sales_share_pct),
            profit: parseFloat(item.estimated_category_profit),
            qty: item.total_qty,
            color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
        }));
    }, [rawData]);

    const totalRevenue = useMemo(() => 
        chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]
    );

    // --- CSV Export Handlers ---
    const handleExportMarketShareCSV = () => {
        if (chartData.length === 0) return;

        const headers = ["Category Name", "Net Revenue", "Market Share %", "Units Sold"];
        const csvRows = chartData.map(c => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            `${c.share}%`,
            c.qty
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `category_market_share_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    const handleExportProfitabilityCSV = () => {
        if (chartData.length === 0) return;

        const headers = ["Category Name", "Net Revenue", "Estimated Profit", "Margin %"];
        const csvRows = chartData.map(c => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            c.profit.toFixed(2),
            `${((c.profit / c.value) * 100).toFixed(1)}%`
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `category_profitability_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    if (isLoading) {
        return (
            <div className="h-[600px] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C3EB7A]/20 border-t-[#C3EB7A] rounded-full animate-spin" />
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[4px] animate-pulse">Aggregating Category Intelligence...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3 h-3 text-[#C3EB7A]" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[3px]">{contextName}</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">
                            Category <span className="text-white/30">Force.</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                        <Zap className="w-3 h-3 text-[#C3EB7A]" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Real-time Sync Active</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                        Timeframe: 30D
                    </button>
                </div>
            </div>

            {/* Top Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {chartData.slice(0, 4).map((cat, i) => {
                        const Icon = getCategoryIcon(cat.name);
                        return (
                            <motion.div 
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-8 rounded-[32px] bg-[#0F0F0F] border border-white/5 hover:border-[#C3EB7A]/30 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C3EB7A]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-start justify-between mb-8 relative z-10">
                                    <div className="p-4 rounded-[22px] bg-white/5 border border-white/10 text-[#C3EB7A] group-hover:bg-[#C3EB7A] group-hover:text-black transition-all duration-500">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest mb-1">{cat.share}% Share</p>
                                        <div className="flex items-center gap-1 text-[10px] font-black text-white/20">
                                            <ArrowUpRight className="w-3 h-3" />
                                            LEADER
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[2px] mb-2">{cat.name}</h3>
                                <p className="text-3xl font-black text-white tracking-tight leading-none mb-4">{formatCurrency(cat.value, currency)}</p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{cat.qty} Units Sold</span>
                                    <span className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest">Healthy</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Deep Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Revenue Distribution Donut */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-3 bg-[#0F0F0F] border border-white/10 rounded-[48px] p-10 relative overflow-hidden group"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <PieChartIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Market Share Distribution</h3>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mt-1">Segmented by category revenue</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleExportMarketShareCSV}
                                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#C3EB7A] hover:bg-[#C3EB7A]/5 transition-all group/dl"
                            >
                                <Download className="w-5 h-5 group-hover/dl:scale-110 transition-transform" />
                            </button>
                            <Sparkles className="w-5 h-5 text-[#C3EB7A] animate-pulse" />
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row items-center gap-12">
                        <div className="relative w-full aspect-square max-w-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.color}
                                                className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        content={<CustomTooltip currency={currency} />}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[3px] mb-1">Total</p>
                                <p className="text-3xl font-black text-white">{formatCurrency(totalRevenue, currency)}</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-5">
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[3px] mb-6">CATEGORY PERFORMANCE</h4>
                            {chartData.map((cat, i) => (
                                <div key={cat.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <div>
                                            <p className="text-sm font-black text-white group-hover:text-[#C3EB7A] transition-colors">{cat.name}</p>
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{cat.qty} Orders</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">{formatCurrency(cat.value, currency)}</p>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{cat.share}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Profitability Analysis */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="bg-[#0F0F0F] border border-white/10 rounded-[48px] p-10 flex flex-col h-full overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
                            <Target className="w-32 h-32" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Est. Category Profit</h3>
                                </div>
                                <button 
                                    onClick={handleExportProfitabilityCSV}
                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#C3EB7A] hover:bg-[#C3EB7A]/5 transition-all group/dl"
                                >
                                    <Download className="w-5 h-5 group-hover/dl:scale-110 transition-transform" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-8">
                                {chartData.slice(0, 5).map((cat, i) => (
                                    <div key={cat.name} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{cat.name}</p>
                                                <p className="text-lg font-black text-white">{formatCurrency(cat.profit, currency)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest">Profit Margin</p>
                                                <p className="text-xs font-bold text-white/40">~{((cat.profit / cat.value) * 100).toFixed(0)}%</p>
                                            </div>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(cat.profit / cat.value) * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="h-full bg-gradient-to-r from-[#C3EB7A]/40 to-[#C3EB7A] shadow-[0_0_15px_rgba(195,235,122,0.3)]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-10 w-full py-4 rounded-3xl bg-white text-black font-black text-[10px] uppercase tracking-[3px] hover:scale-[0.98] active:scale-95 transition-all shadow-xl">
                                Detailed COGS Audit
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function CustomTooltip({ active, payload, currency }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1A1A1A] border border-white/10 p-5 rounded-[28px] shadow-2xl backdrop-blur-2xl">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mb-4">{data.name} Breakdown</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: data.color }} />
                        <div>
                            <p className="text-2xl font-black text-white leading-none mb-1">{formatCurrency(data.value, currency)}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Revenue Impact</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div>
                            <p className="text-sm font-black text-white">{data.share}%</p>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Global Share</p>
                        </div>
                        <div>
                            <p className="text-sm font-black text-[#C3EB7A]">{data.profit > 0 ? '+' : ''}{formatCurrency(data.profit, currency)}</p>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Est. Profit</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
