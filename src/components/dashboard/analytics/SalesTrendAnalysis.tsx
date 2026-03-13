'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    CalendarDays,
    Info
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getDailyTrendLine } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { AnimatePresence } from 'framer-motion';

export default function SalesTrendAnalysis() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const [chartType, setChartType] = React.useState<'area' | 'bar'>('area');
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['sales-trend-30d', businessId, outletId],
        queryFn: () => getDailyTrendLine(businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });

    const chartData = useMemo(() => {
        if (!rawData) return [];
        return rawData.map(item => ({
            date: format(parseISO(item.sale_date), 'MMM dd'),
            fullDate: format(parseISO(item.sale_date), 'EEEE, MMMM dd, yyyy'),
            sales: item.total_sales,
        }));
    }, [rawData]);

    const stats = useMemo(() => {
        if (!rawData || rawData.length < 2) return null;
        
        const total = rawData.reduce((acc, curr) => acc + curr.total_sales, 0);
        const avg = total / rawData.length;
        
        // Calculate growth between first half and second half
        const mid = Math.floor(rawData.length / 2);
        const firstHalf = rawData.slice(0, mid).reduce((acc, curr) => acc + curr.total_sales, 0);
        const secondHalf = rawData.slice(mid).reduce((acc, curr) => acc + curr.total_sales, 0);
        const growth = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;

        return { total, avg, growth };
    }, [rawData]);

    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';

    if (isLoading) {
        return (
            <div className="h-[450px] w-full bg-[#111111] rounded-[40px] border border-white/5 animate-pulse flex items-center justify-center">
                <div className="text-white/20 font-black uppercase tracking-[4px] text-xs">Simulating Historical Trends...</div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] bg-[#0F0F0F] border border-white/5 p-10 relative overflow-hidden group mb-8"
        >
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-30 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C3EB7A]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[24px] bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-black text-white/40 uppercase tracking-[3px]">Financial Velocity</h3>
                            <Sparkles className="w-4 h-4 text-yellow-500/50" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter">30-Day Sales Trend</h2>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* View Toggle */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 p-1 mr-4">
                        <button 
                            onClick={() => setChartType('area')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartType === 'area' ? 'bg-[#C3EB7A] text-black shadow-lg shadow-[#C3EB7A]/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Line
                        </button>
                        <button 
                            onClick={() => setChartType('bar')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartType === 'bar' ? 'bg-[#C3EB7A] text-black shadow-lg shadow-[#C3EB7A]/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Bar
                        </button>
                    </div>

                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mb-1">Rolling Avg</p>
                        <p className="text-xl font-black text-white">{formatCurrency(stats?.avg || 0, currency)}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mb-1">Month Growth</p>
                        <div className={`flex items-center gap-1.5 font-black text-xl ${stats && stats.growth >= 0 ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                            {stats && stats.growth >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                            {Math.abs(stats?.growth || 0).toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={chartType}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="h-full w-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'area' ? (
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSalesTrend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#C3EB7A" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#C3EB7A" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800 }} 
                                        interval={4}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        content={<CustomTooltip currency={currency} />}
                                        cursor={{ stroke: 'rgba(195, 235, 122, 0.2)', strokeWidth: 2 }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="sales" 
                                        stroke="#C3EB7A" 
                                        strokeWidth={4}
                                        fillOpacity={1} 
                                        fill="url(#colorSalesTrend)" 
                                        animationDuration={1000}
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800 }} 
                                        interval={4}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        content={<CustomTooltip currency={currency} />}
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    />
                                    <Bar 
                                        dataKey="sales" 
                                        radius={[8, 8, 0, 0]}
                                        fill="#C3EB7A"
                                        fillOpacity={0.8}
                                        animationDuration={1000}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill="#C3EB7A"
                                                fillOpacity={0.4 + (index / chartData.length) * 0.6}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                <div className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 text-white/20" />
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">
                        Last synchronization: {format(new Date(), 'hh:mm a')}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-400/50" />
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[1px]">
                        Data aggregated from validated transactional logs
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function CustomTooltip({ active, payload, currency }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1A1A1A] border border-white/10 p-5 rounded-[24px] shadow-2xl backdrop-blur-2xl">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[2px] mb-3">{data.fullDate}</p>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 rounded-full bg-[#C3EB7A]" />
                    <div>
                        <p className="text-2xl font-black text-white leading-none mb-1">{formatCurrency(data.sales, currency)}</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Revenue Recorded</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
