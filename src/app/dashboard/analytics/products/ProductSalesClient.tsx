'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, ArrowLeft, 
    ArrowUpRight, ArrowDownRight, Search,
    Sparkles, ShoppingBag, Zap, Award,
    MapPin, ChevronRight, Filter, Download,
    AlertCircle, ArrowRight, Activity,
    Star, Coins, TrendingUp, Ghost
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';
import { useUserStore } from '@/store/user-store';
import { useFilterStore } from '@/store/filter-store';
import { useQuery } from '@tanstack/react-query';
import { getProductPerformance, getNetProfitPerformance, getProductElitePerformance } from '@/utils/supabase/queries-client';
import { formatCurrency, formatCompactCurrency, formatCompactNumber } from '@/utils/format';

// --- Pagination & Formatting Constants ---
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function ProductSalesClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    const { user, businessConfig } = useUserStore();
    const { selectedRange } = useFilterStore();
    const currency = businessConfig?.currency || 'USD';
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;
    const startDate = selectedRange.from.toISOString();
    const endDate = selectedRange.to.toISOString();

    const { data: productPerf = [], isLoading: loadingProducts } = useQuery({
        queryKey: ['productPerformance', businessId, outletId, startDate, endDate],
        queryFn: () => getProductPerformance(
            businessId!,
            outletId,
            startDate,
            endDate
        ),
        enabled: !!businessId,
    });

    const { data: profitData, isLoading: loadingProfit } = useQuery({
        queryKey: ['netProfit', businessId, outletId, startDate, endDate],
        queryFn: () => getNetProfitPerformance(
            businessId!,
            outletId,
            startDate,
            endDate
        ),
        enabled: !!businessId,
    });

    const { data: elitePerf = [], isLoading: loadingElite } = useQuery({
        queryKey: ['productElitePerformance', businessId, outletId],
        queryFn: () => getProductElitePerformance(
            businessId!,
            outletId
        ),
        enabled: !!businessId,
    });

    // --- Table State: Search & Pagination ---
    const [searchQuery, setSearchQuery] = React.useState('');
    const [pageSize, setPageSize] = React.useState(5);
    const [currentPage, setCurrentPage] = React.useState(1);

    const isLoading = loadingProducts || loadingProfit || loadingElite;

    // --- CSV Export Handler ---
    const handleExportCSV = () => {
        if (filteredProducts.length === 0) return;

        // 1. Prepare Headers
        const headers = [
            "Product Name", "Units Sold", "Net Sales", 
            "Gross Profit", "Margin %", "Market Share %"
        ];

        // 2. Prepare Data Rows
        const csvRows = filteredProducts.map(p => {
            const margin = p.net_sales > 0 ? ((p.gross_profit / p.net_sales) * 100).toFixed(1) : "0";
            const share = netRevenue > 0 ? ((p.net_sales / netRevenue) * 100).toFixed(1) : "0";
            
            return [
                `"${p.product_name.replace(/"/g, '""')}"`,
                p.total_quantity,
                p.net_sales.toFixed(2),
                p.gross_profit.toFixed(2),
                `${margin}%`,
                `${share}%`
            ];
        });

        // 3. Combine with BOM for Excel compatibility
        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");

        // 4. Trigger Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `product_performance_${timestamp}.csv`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    // --- Export Missing Recipes Handler ---
    const handleExportMissingRecipes = () => {
        const missingItems = sortedProducts.filter(p => (p as any).food_cost_pct === 0);
        if (missingItems.length === 0) return;

        const headers = ["Product Name", "Units Sold", "Net Sales", "Potential Profit (Missing)"];
        const csvRows = missingItems.map(p => [
            `"${p.product_name.replace(/"/g, '""')}"`,
            p.total_quantity,
            p.net_sales.toFixed(2),
            p.net_sales.toFixed(2) // Since cost is zero, net sales is the potential "gross" profit gap
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `missing_recipes_audit_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    // Calculate aggregated stats
    const netRevenue = profitData?.net_sales || 0;
    const totalCogs = profitData?.total_cogs || 0;
    const grossProfit = profitData?.gross_profit || 0;
    const totalOpex = profitData?.total_opex || 0;
    const trueNetProfit = profitData?.true_net_profit || 0;
    const grossMargin = profitData?.gross_margin_pct || 0;
    
    // Logic: Sort -> Search Filter -> Pagination
    const sortedProducts = [...productPerf].sort((a, b) => (b.net_sales || 0) - (a.net_sales || 0));
    
    const filteredProducts = sortedProducts.filter(p => 
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // --- Health Score Calculations ---
    const healthStats = React.useMemo(() => {
        if (!productPerf || productPerf.length === 0) return null;

        // Context-aware unique products
        const globalProducts = productPerf.filter(p => p.outlet_id === null);
        const outletProducts = productPerf.filter(p => p.outlet_id !== null);
        
        // Items in CURRENT context
        const currentItems = productPerf.filter(r => 
            outletId && outletId !== 'business' 
                ? r.outlet_id === outletId 
                : r.outlet_id === null
        );

        const totalItems = currentItems.length;
        const trackedItems = currentItems.filter(p => (p as any).food_cost_pct > 0).length;
        const missingRecipes = currentItems.filter(p => (p as any).food_cost_pct === 0);
        
        const score = totalItems > 0 ? Math.round((trackedItems / totalItems) * 100) : 0;

        return {
            score,
            totalItems,
            trackedItems,
            missingCount: missingRecipes.length,
            missingItems: missingRecipes.slice(0, 3).map(p => p.product_name),
            globalCount: globalProducts.length,
            allOutletCount: Array.from(new Set(outletProducts.map(p => p.product_name))).length,
        };
    }, [productPerf, outletId]);

    // Apply filtering to the sorted list for display
    const contextFilteredProducts = sortedProducts.filter(r => 
        outletId && outletId !== 'business' 
            ? r.outlet_id === outletId 
            : r.outlet_id === null
    );

    const searchedProducts = contextFilteredProducts.filter(p => 
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentPaginatedProducts = searchedProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const topPerformer = sortedProducts[0]?.product_name || 'N/A';

    // Identify products with missing recipes (food_cost_pct === 0)
    const missingRecipesCount = sortedProducts.filter(p => (p as any).food_cost_pct === 0).length;

    const stats = [
        { 
            title: "Net Revenue", 
            numericValue: netRevenue, 
            subtitle: "Post-tax Earnings", 
            icon: <ShoppingBag className="w-4 h-4 text-[#C3EB7A]" />, 
            color: "from-[#C3EB7A]/20 to-transparent",
            isCurrency: true
        },
        { 
            title: "Cost of Sales", 
            numericValue: totalCogs + totalOpex, 
            subtitle: `COGS: ${formatCurrency(totalCogs, currency)}`, 
            icon: <Zap className="w-4 h-4 text-orange-400" />, 
            color: "from-orange-400/20 to-transparent",
            isCurrency: true
        },
        { 
            title: "Gross Profit", 
            numericValue: grossProfit, 
            subtitle: "Before Operational Costs", 
            icon: <Award className="w-4 h-4 text-blue-400" />, 
            color: "from-blue-400/20 to-transparent",
            isCurrency: true
        },
        { 
            title: "True Net Profit", 
            numericValue: trueNetProfit, 
            subtitle: "Actual Bottom Line", 
            icon: <Sparkles className="w-4 h-4 text-purple-400" />, 
            color: "from-purple-400/20 to-transparent",
            isCurrency: true
        },
        { 
            title: "Margin Efficiency", 
            numericValue: grossMargin, 
            subtitle: "Efficiency Index", 
            icon: <Package className="w-4 h-4 text-pink-400" />, 
            color: "from-pink-400/20 to-transparent",
            isCurrency: false,
            // Custom formatter handled inside the card
            isMargin: true 
        },
    ];

    return (
        <div className="space-y-6 md:space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-5">
                    <motion.button 
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.back()}
                        className="p-2.5 md:p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all backdrop-blur-xl"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                            <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#C3EB7A]" />
                            <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                        </div>
                        <h1 className="text-xl md:text-4xl font-black text-white tracking-tighter">Product <span className="text-white/30 font-extrabold">Throughput.</span></h1>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <MetricCard 
                        key={stat.title} 
                        {...stat} 
                        numericValue={stat.isMargin ? Number(stat.numericValue.toFixed(1)) : stat.numericValue}
                        delay={idx * 0.1} 
                    />
                ))}
            </div>

            {/* Product Health Score Section */}
            <HealthScoreSection stats={healthStats} isLoading={isLoading} />

            {/* Performance Matrix Section (Elite V1) */}
            <PerformanceMatrixSection data={elitePerf} isLoading={isLoading} />

            {/* Recipe Insight Alert - Refined & Detached */}
            <AnimatePresence>
                {missingRecipesCount > 0 && !isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-orange-400/[0.03] border border-orange-400/10 backdrop-blur-3xl shadow-2xl"
                    >
                        {/* Inner Gradient Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/5 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                        
                        <div className="p-5 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(251,146,60,0.1)]">
                                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-orange-400 animate-pulse" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-[2px] md:tracking-[3px] mb-1.5 flex items-center justify-center md:justify-start gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                                    Inventory Opportunity Detected
                                </h4>
                                <p className="text-[11px] md:text-xs font-bold text-white/40 leading-relaxed max-w-2xl">
                                    We identified <span className="text-orange-400 font-black">{missingRecipesCount} unique items</span> selling without recipe data. Mapping these recipes will enable <span className="text-white/60 font-black">True Net Profit</span> tracking and automated stock depletion.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleExportMissingRecipes}
                                    className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Export List
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push('/dashboard/inventory/settings')}
                                    className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-orange-400 text-black font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_0_40px_rgba(251,146,60,0.2)] active:shadow-inner"
                                >
                                    Setup Recipes
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Product Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden group"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3EB7A]/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                
                <div className="relative bg-[#0F0F0F]/80 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="p-5 md:p-10 border-b border-white/5 flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-base md:text-xl font-black text-white tracking-tight">Individual Item Metrics</h3>
                                <p className="text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[2px] mt-1.5 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A] animate-pulse" />
                                    Real-time sales velocity & performance
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <button 
                                    onClick={handleExportCSV}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl bg-white/5 text-white/40 font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-white/10 hover:bg-white/10 hover:text-white transition-all active:scale-95 whitespace-nowrap"
                                >
                                    <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    Export CSV
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-[#C3EB7A]/20 hover:bg-[#C3EB7A]/20 transition-all active:scale-95 group/ai shadow-[0_0_20px_rgba(195,235,122,0.1)] whitespace-nowrap">
                                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/ai:rotate-12 transition-transform" />
                                    Run AI Forecast
                                </button>
                            </div>
                        </div>

                        {/* Search Input Relocated here */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search by product name..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-2 md:py-3.5 pl-10 md:pl-12 pr-4 text-[11px] md:text-sm font-bold text-white focus:outline-none focus:border-[#C3EB7A]/40 transition-all"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto no-scrollbar scroll-smooth">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="bg-white/[0.01] text-left border-b border-white/5">
                                    <th className="px-5 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Rank</th>
                                    <th className="px-5 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Product</th>
                                    <th className="hidden md:table-cell px-6 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Units Sold</th>
                                    <th className="px-5 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Revenue</th>
                                    <th className="hidden md:table-cell px-4 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Market Trend</th>
                                    <th className="hidden lg:table-cell px-6 md:px-10 py-5 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Deep Dive</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={6} className="px-10 py-7 h-20 bg-white/5" />
                                        </tr>
                                    ))
                                ) : currentPaginatedProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-10 py-20 text-center text-white/20 font-black uppercase tracking-widest text-xs">
                                            {searchQuery ? `No products matching "${searchQuery}"` : 'No product data found'}
                                        </td>
                                    </tr>
                                ) : (
                                    currentPaginatedProducts.map((product: import('@/utils/supabase/queries').ProductPerformance, idx: number) => {
                                        // Absolute rank calculation
                                        const rank = ((currentPage - 1) * pageSize) + idx + 1;
                                        return (
                                            <motion.tr 
                                                key={product.product_name} 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + (idx * 0.05) }}
                                                className="group/row hover:bg-white/[0.03] transition-all"
                                            >
                                                <td className="px-5 md:px-10 py-5 md:py-7">
                                                    <span className={`text-[11px] md:text-sm font-black ${rank <= 3 ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                                        #{rank.toString().padStart(2, '0')}
                                                    </span>
                                                </td>
                                            <td className="px-5 py-5 md:py-7">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover/row:bg-[#C3EB7A]/10 group-hover/row:text-[#C3EB7A] transition-all shadow-lg group-hover/row:scale-110 shrink-0">
                                                        <Package className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] md:text-sm font-black text-white group-hover/row:text-[#C3EB7A] transition-colors truncate">{product.product_name}</p>
                                                        <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                                                            <p className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest truncate">
                                                                {(product as any).profit_margin_pct ?? 0}% Margin
                                                            </p>
                                                            {(product as any).food_cost_pct === 0 && (
                                                                <span className="flex items-center gap-1 text-[8px] font-black text-orange-400/60 uppercase tracking-tighter bg-orange-400/5 px-1.5 py-0.5 rounded border border-orange-400/10">
                                                                    <AlertCircle className="w-2.5 h-2.5" />
                                                                    No Recipe
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                </td>
                                            <td className="hidden md:table-cell px-6 py-5 md:py-7">
                                                <div className="flex flex-col">
                                                    <span className="text-xs md:text-sm font-black text-white">{product.total_quantity.toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 md:py-7">
                                                <p className="text-[11px] md:text-sm font-black text-[#C3EB7A] whitespace-nowrap">{formatCurrency(product.net_sales, currency)}</p>
                                            </td>
                                            <td className="hidden md:table-cell px-4 py-5 md:py-7">
                                                <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-black text-[#C3EB7A]">
                                                    <ArrowUpRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                                                    {(product as any).market_share_pct ?? 0}% Share
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell px-6 md:px-10 py-7 text-right">
                                                <div className="flex items-center justify-end gap-3 md:gap-5">
                                                    <button 
                                                        onClick={() => router.push('/dashboard/offers')}
                                                        className="text-[9px] md:text-[10px] font-black text-[#C3EB7A] hover:brightness-125 uppercase tracking-widest transition-all whitespace-nowrap"
                                                    >
                                                        Add Promo
                                                    </button>
                                                    <button className="p-2 md:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- SMART TABLE FOOTER: Pagination & Limits --- */}
                {!isLoading && searchedProducts.length > 0 && (
                    <div className="p-5 md:p-8 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                                <span className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-widest">Rows per page</span>
                                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                                    {PAGE_SIZE_OPTIONS.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setPageSize(size);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black transition-all ${
                                                pageSize === size 
                                                    ? 'bg-[#C3EB7A] text-black' 
                                                    : 'text-white/40 hover:text-white'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest text-center w-full md:w-auto">
                                {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, searchedProducts.length)} of {searchedProducts.length}
                            </p>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 w-full md:w-auto">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white disabled:opacity-30 disabled:hover:text-white/40 transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1.5 md:gap-2">
                                {[...Array(Math.ceil(searchedProducts.length / pageSize))].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-7 h-7 md:w-8 md:h-8 rounded-lg text-[9px] md:text-[10px] font-black transition-all ${
                                            currentPage === i + 1
                                                ? 'bg-[#C3EB7A]/20 text-[#C3EB7A] border border-[#C3EB7A]/30'
                                                : 'text-white/20 hover:text-white'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                )).filter((_, i) => {
                                    const tPages = Math.ceil(searchedProducts.length / pageSize);
                                    if (tPages <= 5) return true;
                                    return i === 0 || i === tPages - 1 || Math.abs(i + 1 - currentPage) <= 1;
                                })}
                            </div>
                            <button
                                disabled={currentPage === Math.ceil(searchedProducts.length / pageSize)}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[#C3EB7A] hover:bg-[#C3EB7A]/20 transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    </div>
);
}

function PerformanceMatrixSection({ data, isLoading }: { data: any[], isLoading: boolean }) {
    if (isLoading) return null;

    const categories = [
        { 
            id: 'Star', 
            label: 'Stars', 
            icon: <Star className="w-4 h-4 text-yellow-400" />, 
            color: 'border-yellow-400/20 bg-yellow-400/5 text-yellow-400',
            description: 'High Growth & Market Share'
        },
        { 
            id: 'Cash Cow', 
            label: 'Cash Cows', 
            icon: <Coins className="w-4 h-4 text-[#C3EB7A]" />, 
            color: 'border-[#C3EB7A]/20 bg-[#C3EB7A]/5 text-[#C3EB7A]',
            description: 'Stable & Consistent Profit'
        },
        { 
            id: 'Rising Star', 
            label: 'Rising Stars', 
            icon: <TrendingUp className="w-4 h-4 text-blue-400" />, 
            color: 'border-blue-400/20 bg-blue-400/5 text-blue-400',
            description: 'Accelerating Momentum'
        },
        { 
            id: 'Dog', 
            label: 'Dogs', 
            icon: <Ghost className="w-4 h-4 text-red-400" />, 
            color: 'border-red-400/20 bg-red-400/5 text-red-400',
            description: 'Underperforming Items'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <Award className="w-5 h-5 text-[#C3EB7A]" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white tracking-tight">Product Performance Matrix</h2>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">Strategic BCG Classification</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((cat) => (
                    <ElitePerformanceCard 
                        key={cat.id}
                        {...cat}
                        products={data.filter(p => p.product_classification === cat.id)}
                    />
                ))}
            </div>
        </div>
    );
}

function ElitePerformanceCard({ label, icon, color, description, products }: { 
    label: string, 
    icon: React.ReactNode, 
    color: string, 
    description: string,
    products: any[]
}) {
    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';

    const handleExportCSV = () => {
        if (products.length === 0) return;

        const headers = ["Product Name", "Units Sold", "Net Sales", "Growth %", "Classification"];
        const csvRows = products.map(p => [
            `"${p.product_name.replace(/"/g, '""')}"`,
            p.current_qty,
            p.current_net_sales.toFixed(2),
            `${p.growth_pct}%`,
            p.product_classification
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `${label.toLowerCase().replace(/\s+/g, '_')}_performance_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-[32px] border ${color.split(' ')[0]} ${color.split(' ')[1]} p-1 transition-all group`}
        >
            <div className="bg-[#0A0A0A] rounded-[31px] p-4 md:p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${color.split(' ')[2]}`}>
                            {icon}
                        </div>
                        <button 
                            onClick={handleExportCSV}
                            className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all group/dl"
                        >
                            <Download className="w-3.5 h-3.5 group-hover/dl:scale-110 transition-transform" />
                        </button>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{products.length} Items</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-black text-white tracking-tight mb-1">{label}</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">{description}</p>
                </div>

                <div className="flex-1 space-y-3">
                    {products.length > 0 ? (
                        products.slice(0, 3).map((product, i) => (
                            <div key={product.product_name} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-[11px] font-black text-white truncate max-w-[120px]">{product.product_name}</p>
                                    <p className="text-[10px] font-black text-[#C3EB7A]">{formatCompactCurrency(product.current_net_sales, currency)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{product.current_qty} sold</p>
                                    <div className="flex items-center gap-1">
                                        <ArrowUpRight className="w-2.5 h-2.5 text-[#C3EB7A]" />
                                        <span className="text-[9px] font-black text-[#C3EB7A]">{product.growth_pct}%</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center py-6 border border-dashed border-white/5 rounded-2xl">
                            <Package className="w-6 h-6 text-white/10 mb-2" />
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">No data mapped</p>
                        </div>
                    )}
                    {products.length > 3 && (
                        <button className="w-full py-2 text-[9px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">
                            + {products.length - 3} more products
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function HealthScoreSection({ stats, isLoading }: { stats: any, isLoading: boolean }) {
    if (isLoading || !stats) return null;

    const recommendations = [
        stats.score < 100 && {
            title: "Recipe Sync",
            desc: `Found ${stats.missingCount} items without recipes.`,
            action: "Fix Now"
        },
        stats.allOutletCount > stats.globalCount && {
            title: "Global Inventory",
            desc: "Outlet items missing from Global catalog.",
            action: "Sync Catalog"
        },
        stats.score >= 90 && {
            title: "Elite Status",
            desc: "Outstanding data hygiene achieved.",
            action: "View Badge"
        }
    ].filter(Boolean);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
            <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[40px] p-5 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#C3EB7A]/10 blur-[100px] rounded-full -ml-32 -mt-32 pointer-events-none group-hover:bg-[#C3EB7A]/20 transition-all duration-700" />
                
                <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                        <motion.circle
                            cx="50" cy="50" r="45" fill="none"
                            stroke={stats.score > 80 ? '#C3EB7A' : stats.score > 50 ? '#FACC15' : '#EF4444'}
                            strokeWidth="8" strokeDasharray="282.7"
                            initial={{ strokeDashoffset: 282.7 }}
                            animate={{ strokeDashoffset: 282.7 - (282.7 * stats.score) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl md:text-5xl font-black text-white">{stats.score}</span>
                        <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[2px]">Index</span>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <div className="p-2 rounded-xl bg-[#C3EB7A]/10 text-[#C3EB7A]">
                            <Activity className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-base md:text-xl font-black text-white tracking-tight">Product Health Score</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                        <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-1.5">Unique Catalog</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl md:text-2xl font-black text-white">{stats.globalCount}</span>
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Global</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-1.5">Outlet Range</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl md:text-2xl font-black text-blue-400">{stats.allOutletCount}</span>
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                        <div className="col-span-2 pt-4 border-t border-white/5">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-2">Operational Status</p>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-white/50">
                                <Zap className="w-3.5 h-3.5 text-[#C3EB7A]" />
                                {stats.trackedItems} of {stats.totalItems} products have recipes mapped.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="px-6 py-4 border-b border-white/5">
                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[2px] flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#C3EB7A]" />
                        Critical Recommendations
                    </h4>
                </div>
                <div className="flex flex-col gap-3 px-2">
                    {recommendations.map((rec: any, i: number) => (
                        <motion.div 
                            key={rec.title}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/rec"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h5 className="text-[11px] font-black text-white group-hover/rec:text-[#C3EB7A] transition-colors">{rec.title}</h5>
                                <button className="text-[9px] font-black text-[#C3EB7A] uppercase tracking-widest opacity-0 group-hover/rec:opacity-100 transition-all">
                                    {rec.action}
                                </button>
                            </div>
                            <p className="text-[10px] font-bold text-white/30 leading-relaxed">{rec.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function MetricCard({ title, numericValue, icon, color, delay, isCurrency, isMargin }: { 
    title: string, 
    numericValue: number, 
    icon: React.ReactNode, 
    color: string, 
    delay: number,
    isCurrency?: boolean,
    isMargin?: boolean
}) {
    const { businessConfig } = useUserStore();
    const { activePreset } = useFilterStore();
    const currency = businessConfig?.currency || 'USD';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "circOut" }}
            className="relative group overflow-hidden rounded-3xl bg-[#111111] border border-white/5 p-4 md:p-5 hover:border-white/10 transition-all duration-500"
        >
            <AnimatePresence>
                <motion.div 
                    key={activePreset + numericValue}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${color} transition-opacity duration-700 pointer-events-none`} 
                />
            </AnimatePresence>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className="p-2 rounded-xl bg-white/5 text-white/20 group-hover:text-inherit transition-all duration-500 border border-white/5 group-hover:border-white/10 flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[1px] md:tracking-[2px] mb-1">{title}</h3>
                <div className="flex items-baseline gap-2 overflow-hidden h-6 md:h-7">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={activePreset + numericValue}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="text-lg md:text-xl font-black text-white tracking-tight"
                        >
                            <span className="md:hidden">
                                {isCurrency ? formatCompactCurrency(numericValue, currency) : formatCompactNumber(numericValue)}{isMargin && '%'}
                            </span>
                            <span className="hidden md:inline">
                                {isCurrency ? formatCurrency(numericValue, currency) : numericValue.toLocaleString()}{isMargin && '%'}
                            </span>
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
