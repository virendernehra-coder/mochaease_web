'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import { getCategoryPerformance, getCategoryTrend } from '@/utils/supabase/queries-client';
import { 
    ArrowLeft, Filter, 
    MapPin, TrendingUp,
    Coffee, Utensils, IceCream, Pizza, GlassWater, 
    Zap, Sparkles, LayoutGrid, PieChart as PieChartIcon, TrendingDown, Clock, 
    ArrowUpRight, ArrowDownRight, Target, Download, Activity,
    DollarSign, BarChart3, Search, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useFilterStore } from '@/store/filter-store';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, formatCompactCurrency, formatPercentage } from '@/utils/format';

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
    const { selectedRange } = useFilterStore();
    
    const isGlobal = activeContextId === 'business';
    const businessId = user?.business_id;
    const outletId = isGlobal ? null : activeContextId;
    const currency = businessConfig?.currency || 'USD';
    const startDate = selectedRange.from.toISOString();
    const endDate = selectedRange.to.toISOString();
    
    // Pagination State
    const [performancePage, setPerformancePage] = React.useState(1);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const [trendPage, setTrendPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const ITEMS_PER_PAGE = 10;

    const { data: rawData, isLoading: loadingPerformance } = useQuery({
        queryKey: ['category-performance', businessId, outletId, startDate, endDate],
        queryFn: () => getCategoryPerformance(businessId!, outletId, startDate, endDate),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 15,
    });

    const { data: trendData, isLoading: loadingTrend } = useQuery({
        queryKey: ['category-trend', businessId, outletId, startDate, endDate],
        queryFn: () => getCategoryTrend(businessId!, outletId, startDate, endDate),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 15,
    });

    const isLoading = loadingPerformance || loadingTrend;

    const contextName = isGlobal ? 'Global Business' : 'Selected Outlet';

    const chartData = useMemo(() => {
        if (!rawData) return [];
        return rawData.map((item: any, idx: any) => {
            const val = Number(item.net_sales);
            // RPC uses margin_pct for dynamic calculations
            const margin = item.margin_pct !== undefined ? Number(item.margin_pct) : 0;
            const profit = item.estimated_category_profit ? parseFloat(item.estimated_category_profit) : (val * (margin / 100));
            
            return {
                name: item.category_name,
                value: val,
                share: item.sales_share_pct ? parseFloat(item.sales_share_pct) : 0,
                profit: profit,
                margin: margin,
                qty: item.total_qty || 0,
                color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
                insights: {
                    noInventory: margin === 100,
                    dangerZone: margin < 15 && margin > 0
                }
            };
        });
    }, [rawData]);

    // Aggregate Data for Viz (Top 10 + Others)
    const vizData = useMemo(() => {
        if (chartData.length <= 10) return chartData;
        
        const top10 = chartData.slice(0, 10);
        const others = chartData.slice(10);
        const othersValue = others.reduce((acc, curr) => acc + curr.value, 0);
        const othersShare = others.reduce((acc, curr) => acc + curr.share, 0);
        const othersQty = others.reduce((acc, curr) => acc + curr.qty, 0);
        
        return [
            ...top10,
            {
                name: 'Others',
                value: othersValue,
                share: parseFloat(othersShare.toFixed(2)),
                qty: othersQty,
                color: '#333333',
                insights: { noInventory: false, dangerZone: false }
            }
        ];
    }, [chartData]);

    const opportunities = useMemo(() => 
        chartData.filter(c => c.insights.noInventory && c.value > 0), [chartData]
    );

    const paginatedPerformance = useMemo(() => {
        const start = (performancePage - 1) * ITEMS_PER_PAGE;
        return chartData.slice(start, start + ITEMS_PER_PAGE);
    }, [chartData, performancePage]);

    const totalRevenue = useMemo(() => 
        chartData.reduce((acc: any, curr: any) => acc + curr.value, 0), [chartData]
    );

    const filteredTrendData = useMemo(() => {
        if (!trendData) return [];
        if (!searchTerm) return trendData;
        const lowerSearched = searchTerm.toLowerCase();
        return trendData.filter((item: any) => 
            item.category_name.toLowerCase().includes(lowerSearched)
        );
    }, [trendData, searchTerm]);

    // Reset page when search changes
    React.useEffect(() => {
        setTrendPage(1);
    }, [searchTerm]);

    // --- CSV Export Handlers ---
    const handleExportMarketShareCSV = () => {
        if (chartData.length === 0) return;

        const headers = ["Category Name", "Net Revenue", "Market Share %", "Units Sold"];
        const csvRows = chartData.map((c: any) => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            `${c.share}%`,
            c.qty
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map((r: any) => r.join(","))].join("\n");
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
        const csvRows = chartData.map((c: any) => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            c.profit.toFixed(2),
            `${c.margin.toFixed(1)}%`
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map((r: any) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `category_profitability_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    const handleExportTrendCSV = () => {
        if (!trendData || trendData.length === 0) return;

        const headers = ["Category Name", "Net Sales", "Growth %", "Avg Unit Price", "Margin %"];
        const csvRows = trendData.map((t: any) => [
            `"${t.category_name.replace(/"/g, '""')}"`,
            t.net_sales.toFixed(2),
            `${t.growth_pct.toFixed(2)}%`,
            t.avg_unit_price.toFixed(2),
            `${t.margin_pct.toFixed(2)}%`
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map((r: any) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `category_trend_analysis_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    const handleExportUntrackedCSV = () => {
        const untracked = chartData.filter(c => c.insights.noInventory && c.value > 0);
        if (untracked.length === 0) return;

        const headers = ["Category Name", "Net Revenue", "Units Sold", "Issue Detected"];
        const csvRows = untracked.map(c => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            c.qty,
            "100% Margin (Missing COGS/Inventory Sync)"
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map((r: any) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `untracked_categories_audit_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    const handleExportCategorySalesCSV = () => {
        if (chartData.length === 0) return;

        const headers = ["Category Name", "Net Revenue", "Units Sold", "Market Share %", "Estimated Profit", "Profit Margin %"];
        const csvRows = chartData.map((c: any) => [
            `"${c.name.replace(/"/g, '""')}"`,
            c.value.toFixed(2),
            c.qty,
            `${c.share}%`,
            c.profit.toFixed(2),
            `${c.margin.toFixed(1)}%`
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map((r: any) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `comprehensive_category_sales_${timestamp}.csv`);
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
        <div className="space-y-6 md:space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#C3EB7A]" />
                            <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[2px] md:tracking-[3px] truncate">{contextName}</span>
                        </div>
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-black text-white tracking-tighter truncate">
                            Category <span className="text-white/30">Force.</span>
                        </h1>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
                    <div className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                        <Zap className="w-3 h-3 text-[#C3EB7A]" />
                        <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">Real-time Sync Active</span>
                    </div>
                    <button 
                        onClick={handleExportCategorySalesCSV}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl bg-[#C3EB7A] text-black font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] whitespace-nowrap"
                    >
                        <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Export Report
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all whitespace-nowrap">
                        <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Range: {selectedRange.from.toLocaleDateString()}
                    </button>
                </div>
            </div>


            {/* Top Categories Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <AnimatePresence>
                    {chartData.slice(0, 4).map((cat: any, i: any) => {
                        const Icon = getCategoryIcon(cat.name);
                        return (
                            <motion.div 
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-4 md:p-5 rounded-3xl bg-[#111111] border border-white/5 hover:border-[#C3EB7A]/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C3EB7A]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-start justify-between mb-4 md:mb-8 relative z-10">
                                    <div className="p-2.5 md:p-4 rounded-xl md:rounded-[22px] bg-white/5 border border-white/10 text-[#C3EB7A] group-hover:bg-[#C3EB7A] group-hover:text-black transition-all duration-500">
                                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[8px] md:text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest mb-0.5 md:mb-1">{formatPercentage(cat.share)}</p>
                                        <div className="hidden md:flex items-center gap-1 text-[10px] font-black text-white/20">
                                            <ArrowUpRight className="w-3 h-3" />
                                            LEADER
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[2px] mb-1 md:mb-2 truncate">{cat.name}</h3>
                                <p className="text-lg md:text-xl font-black text-white tracking-tight leading-none mb-4">
                                    {formatCurrency(cat.value, currency)}
                                </p>
                                
                                <div className="mt-auto flex items-center justify-between pt-3 md:pt-4 border-t border-white/5">
                                    <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-widest">{cat.qty} Units</span>
                                    <span className="hidden md:inline text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest">Healthy</span>
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
                    className="lg:col-span-3 bg-[#0F0F0F] border border-white/10 rounded-[32px] md:rounded-[48px] p-4 md:p-10 relative overflow-hidden group"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <PieChartIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base md:text-xl font-black text-white tracking-tight">Market Share</h3>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mt-1">Revenue Distribution</p>
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

                    <div className="flex flex-col xl:flex-row items-center gap-8 md:gap-12">
                        <div className="relative w-full aspect-square max-w-[240px] md:max-w-[440px] mx-auto xl:mx-0">
                            {/* Center Text - Background Layer */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center z-0">
                                <p className="text-[6px] md:text-[10px] font-black text-white/10 md:text-white/20 uppercase tracking-[1px] md:tracking-[3px] mb-0.5 md:mb-1">NET REVENUE</p>
                                <p className="text-[10px] md:text-2xl font-black text-white/40 md:text-white leading-tight">
                                    <span className="md:hidden">{formatCompactCurrency(totalRevenue, currency)}</span>
                                    <span className="hidden md:inline">{formatCurrency(totalRevenue, currency)}</span>
                                </p>
                            </div>

                            <div className="relative z-10 w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={vizData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={isMobile ? 65 : 100}
                                            outerRadius={isMobile ? 85 : 145}
                                            paddingAngle={isMobile ? 4 : 8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {vizData.map((entry: any, index: any) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={entry.color}
                                                    className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            content={<CustomTooltip currency={currency} />}
                                            wrapperStyle={{ zIndex: 100 }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-4 md:space-y-5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h4 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[2px] md:tracking-[3px]">CATEGORY PERFORMANCE</h4>
                                <div className="flex items-center gap-2">
                                    <button 
                                        disabled={performancePage === 1}
                                        onClick={() => setPerformancePage(p => Math.max(1, p - 1))}
                                        className="flex-1 md:flex-none p-1 px-3 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-white/40 hover:text-white disabled:opacity-30 transition-all"
                                    >
                                        PREV
                                    </button>
                                    <span className="text-[10px] font-black text-[#C3EB7A] px-2">{performancePage}</span>
                                    <button 
                                        disabled={performancePage * ITEMS_PER_PAGE >= chartData.length}
                                        onClick={() => setPerformancePage(p => p + 1)}
                                        className="flex-1 md:flex-none p-1 px-3 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-white/40 hover:text-white disabled:opacity-30 transition-all"
                                    >
                                        NEXT
                                    </button>
                                </div>
                            </div>

                            {paginatedPerformance.map((cat: any, i: any) => (
                                <div key={cat.name} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <div className="min-w-0">
                                            <p className="text-sm md:text-base font-black text-white/40 uppercase tracking-widest mb-1 group-hover:text-white transition-colors truncate">{cat.name}</p>
                                            <p className="text-[8px] md:text-[10px] font-bold text-white/10 uppercase tracking-widest leading-none">{cat.qty} Units</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm md:text-base font-black text-white transition-all group-hover:text-[#C3EB7A]">{formatCurrency(cat.value, currency)}</p>
                                        <p className="text-[8px] md:text-[9px] font-black text-blue-400 uppercase tracking-widest mt-1">{formatPercentage(cat.share)} Share</p>
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
                    className="lg:col-span-2 space-y-6 md:space-y-8"
                >
                    <div className="bg-[#0F0F0F] border border-white/10 rounded-[32px] md:rounded-[48px] p-4 md:p-10 flex flex-col h-full overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
                            <Target className="w-32 h-32" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight">Est. Category Profit</h3>
                                </div>
                                <button 
                                    onClick={handleExportProfitabilityCSV}
                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#C3EB7A] hover:bg-[#C3EB7A]/5 transition-all group/dl"
                                >
                                    <Download className="w-5 h-5 group-hover/dl:scale-110 transition-transform" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-8">
                                {chartData.slice(0, 5).map((cat: any, i: any) => (
                                    <div key={cat.name} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-sm md:text-base font-black text-white/40 uppercase tracking-widest mb-1">{cat.name}</p>
                                                <p className="text-sm md:text-base font-black text-white">{formatCurrency(cat.profit, currency)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest">Profit Margin</p>
                                                <p className="text-xs font-bold text-white/40">~{formatPercentage((cat.profit / cat.value) * 100)}</p>
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


            {/* Opportunities Hub - Dynamic Insights */}
            {opportunities.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-[#C3EB7A]" />
                            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">Operational Gains</h2>
                        </div>
                        <button 
                            onClick={handleExportUntrackedCSV}
                            className="px-6 py-2.5 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[#C3EB7A] font-black text-[10px] uppercase tracking-widest hover:bg-[#C3EB7A] hover:text-black transition-all"
                        >
                            Export Untracked Audit
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {opportunities.map((opt, i) => (
                            <motion.div 
                                key={`opt-${opt.name}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-5 md:p-8 rounded-3xl bg-[#111111] border border-orange-500/20 relative overflow-hidden group shadow-xl"
                            >
                                <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Activity className="w-16 md:w-20 h-16 md:h-20 text-orange-400" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[2px]">Sync Found</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight mb-2 truncate">{opt.name}</h3>
                                    <p className="text-[11px] font-bold text-white/30 leading-relaxed mb-6 line-clamp-2">
                                        COGS missing for {formatCurrency(opt.value, currency)} net sales.
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Impact</span>
                                            <span className="text-[10px] font-black text-orange-400 uppercase">Audit Needed</span>
                                        </div>
                                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Growth & Velocity Matrix */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F0F0F] border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden group"
            >
                <div className="p-4 md:p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base md:text-xl font-black text-white tracking-tight">Velocity & Growth</h3>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mt-1">Performance Matrix</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-64 group/search">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/search:text-[#C3EB7A] transition-colors" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search category..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/50 focus:bg-[#C3EB7A]/5 transition-all"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 w-full md:w-auto justify-center">
                            <button 
                                disabled={trendPage === 1}
                                onClick={() => setTrendPage(p => Math.max(1, p - 1))}
                                className="p-1 px-3 rounded-lg bg-white/10 text-[10px] font-black text-white hover:bg-[#C3EB7A] hover:text-black disabled:opacity-20 transition-all"
                            >
                                PREV
                            </button>
                            <span className="text-[10px] font-black text-[#C3EB7A] min-w-[3ch] text-center">PAGE {trendPage}</span>
                            <button 
                                disabled={!filteredTrendData || trendPage * ITEMS_PER_PAGE >= filteredTrendData.length}
                                onClick={() => setTrendPage(p => p + 1)}
                                className="p-1 px-3 rounded-lg bg-white/10 text-[10px] font-black text-white hover:bg-[#C3EB7A] hover:text-black disabled:opacity-20 transition-all"
                            >
                                NEXT
                            </button>
                        </div>
                        <button 
                            onClick={handleExportTrendCSV}
                            className="w-full md:w-auto flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#C3EB7A] hover:bg-[#C3EB7A]/5 transition-all group/dl"
                        >
                            <Download className="w-5 h-5 group-hover/dl:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-full md:min-w-[700px]">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-3 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Category</th>
                                <th className="px-3 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Revenue</th>
                                <th className="hidden lg:table-cell px-5 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Growth</th>
                                <th className="hidden md:table-cell px-5 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Avg Order</th>
                                <th className="hidden lg:table-cell px-5 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Profit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredTrendData?.slice((trendPage - 1) * ITEMS_PER_PAGE, trendPage * ITEMS_PER_PAGE).map((trend: any, idx: any) => (
                                <motion.tr 
                                    key={trend.category_name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group/row hover:bg-white/[0.03] transition-all"
                                >
                                    <td className="px-3 md:px-10 py-5 md:py-7">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover/row:text-[#C3EB7A] group-hover/row:bg-[#C3EB7A]/10 transition-all shrink-0">
                                                <LayoutGrid className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[11px] md:text-sm font-black text-white block mb-0.5 truncate">{trend.category_name}</span>
                                                {trend.margin_pct === 100 && (
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-1 h-1 rounded-full bg-orange-400" />
                                                        <span className="text-[7px] font-black text-orange-400 uppercase tracking-widest shrink-0">Incomplete COGS</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 md:px-10 py-5 md:py-7 text-right">
                                        <span className="text-[11px] md:text-sm font-black text-white truncate inline-block">
                                            {formatCompactCurrency(trend.net_sales, currency)}
                                        </span>
                                    </td>
                                    <td className="hidden lg:table-cell px-5 md:px-10 py-5 md:py-7">
                                        <div className={`flex items-center gap-1.5 text-xs font-black ${trend.growth_pct >= 0 ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                            {trend.growth_pct >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {formatPercentage(Math.abs(trend.growth_pct))}
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-5 md:px-10 py-5 md:py-7">
                                        <span className="text-sm font-black text-white/60">{formatCurrency(trend.avg_unit_price, currency)}</span>
                                    </td>
                                    <td className="hidden lg:table-cell px-5 md:px-10 py-5 md:py-7 text-right">
                                        <div className="inline-flex flex-col items-end">
                                            <span className={`text-sm font-black ${trend.margin_pct < 15 ? 'text-red-400' : 'text-[#C3EB7A]'}`}>
                                                {formatPercentage(trend.margin_pct)}
                                            </span>
                                            <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${trend.margin_pct}%` }}
                                                    className={`h-full ${trend.margin_pct < 15 ? 'bg-red-500' : 'bg-[#C3EB7A]'}`}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

function CustomTooltip({ active, payload, currency }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1A1A1A]/95 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-2xl backdrop-blur-2xl flex flex-col items-center min-w-[180px] md:min-w-[240px] z-[100]">
                <p className="text-[10px] md:text-xs font-black text-white/20 uppercase tracking-[2px] mb-6 text-center w-full truncate">{data.name}</p>
                
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-2 border-white/5 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full opacity-20" style={{ backgroundColor: data.color }} />
                        <span className="text-xs md:text-base font-black text-white">{formatPercentage(data.share)}</span>
                    </div>

                    <div className="text-center">
                        <p className="text-lg md:text-3xl font-black text-white leading-none">{formatCompactCurrency(data.value, currency)}</p>
                        <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">Net Sales</p>
                    </div>

                    <div className="w-full pt-6 border-t border-white/5 text-center">
                        <p className="text-sm md:text-xl font-black text-[#C3EB7A]">{data.profit > 0 ? '+' : ''}{formatCompactCurrency(data.profit, currency)}</p>
                        <p className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-widest mt-1.5">Profit Est</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
