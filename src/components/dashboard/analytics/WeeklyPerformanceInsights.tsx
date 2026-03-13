'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    TrendingUp, 
    TrendingDown, 
    ChevronRight,
    Trophy,
    Target,
    Activity
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getDOWPerformance } from '@/utils/supabase/queries-client';
import { formatCurrency, formatCompactNumber } from '@/utils/format';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import { AnimatePresence } from 'framer-motion';

export default function WeeklyPerformanceInsights() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const [chartType, setChartType] = React.useState<'bar' | 'area'>('bar');
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['dow-performance', businessId, outletId],
        queryFn: () => getDOWPerformance(businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 60, // 1 hour (DOW patterns are stable)
    });

    const chartData = useMemo(() => {
        if (!rawData) return [];
        return rawData.map(item => ({
            name: item.dow_name,
            sales: item.total_sales_for_dow,
            orders: item.total_orders_for_dow,
            aov: item.average_order_value_for_dow,
            raw: item
        }));
    }, [rawData]);

    const stats = useMemo(() => {
        if (!rawData || rawData.length === 0) return null;
        const sorted = [...rawData].sort((a, b) => b.total_sales_for_dow - a.total_sales_for_dow);
        return {
            bestDay: sorted[0],
            worstDay: sorted[sorted.length - 1],
            avgSales: rawData.reduce((acc, curr) => acc + curr.total_sales_for_dow, 0) / rawData.length
        };
    }, [rawData]);

    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';

    if (isLoading) {
        return (
            <div className="h-[400px] w-full bg-[#111111] rounded-[40px] border border-white/5 animate-pulse flex items-center justify-center">
                <div className="text-white/20 font-black uppercase tracking-[4px] text-xs">Analyzing Weekly Cycles...</div>
            </div>
        );
    }

    if (!rawData || rawData.length === 0) {
        return (
            <div className="h-[400px] w-full bg-[#111111] rounded-[40px] border border-white/5 flex flex-col items-center justify-center">
                <Calendar className="w-12 h-12 text-white/5 mb-4" />
                <p className="text-sm font-black text-white/20 uppercase tracking-[2px]">No Weekly Data Available</p>
                <p className="text-xs font-bold text-white/10 mt-2">Check back after a few weeks of operations.</p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group"
        >
            {/* Glossy Background Accent */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mt-40 pointer-events-none" />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[24px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white/40 uppercase tracking-[3px]">Weekly Rhythm</h3>
                        <h2 className="text-3xl font-black text-white tracking-tighter">Day of Week Performance</h2>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Perspective Toggle */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 p-1">
                        <button 
                            onClick={() => setChartType('bar')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartType === 'bar' ? 'bg-[#C3EB7A] text-black shadow-lg shadow-[#C3EB7A]/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Bar
                        </button>
                        <button 
                            onClick={() => setChartType('area')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartType === 'area' ? 'bg-[#C3EB7A] text-black shadow-lg shadow-[#C3EB7A]/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Line
                        </button>
                    </div>

                    {stats && (
                        <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <div className="px-4 py-2 text-center border-r border-white/10">
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-[2px] mb-0.5">Prime Day</p>
                                <p className="text-xs font-black text-[#C3EB7A]">{stats.bestDay.dow_name}</p>
                            </div>
                            <div className="px-4 py-2 text-center">
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-[2px] mb-0.5">Avg Revenue</p>
                                <p className="text-xs font-black text-white">{formatCurrency(stats.avgSales, currency)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Visual Chart - Left Side (3/4 width) */}
                <div className="lg:col-span-3 h-[400px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={chartType}
                            initial={{ opacity: 0, x: chartType === 'bar' ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: chartType === 'bar' ? 10 : -10 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="h-full w-full"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'bar' ? (
                                    <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
                                        <XAxis type="number" hide />
                                        <YAxis 
                                            dataKey="name" 
                                            type="category" 
                                            axisLine={false} 
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 800 }}
                                        />
                                        <Tooltip 
                                            content={<CustomTooltip currency={currency} />}
                                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                        />
                                        <Bar 
                                            dataKey="sales" 
                                            radius={[0, 12, 12, 0]}
                                            barSize={30}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={entry.name === stats?.bestDay.dow_name ? '#C3EB7A' : 'rgba(195, 235, 122, 0.3)'} 
                                                    style={{ transition: 'all 0.5s ease' }}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                ) : (
                                    <AreaChart data={chartData} margin={{ left: 40, right: 20 }}>
                                        <defs>
                                            <linearGradient id="colorSalesDow" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C3EB7A" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#C3EB7A" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 800 }}
                                        />
                                        <YAxis hide />
                                        <Tooltip 
                                            content={<CustomTooltip currency={currency} />}
                                            cursor={{ stroke: '#C3EB7A', strokeOpacity: 0.2 }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="sales" 
                                            stroke="#C3EB7A" 
                                            strokeWidth={4}
                                            fillOpacity={1} 
                                            fill="url(#colorSalesDow)" 
                                            animationDuration={1000}
                                        />
                                    </AreaChart>
                                )}
                            </ResponsiveContainer>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Insight Column - Right Side (stacked) */}
                <div className="flex flex-col gap-5">
                    <InsightCard 
                        title="Peak Velocity"
                        icon={<Trophy className="w-4 h-4" />}
                        value={stats?.bestDay.dow_name || "-"}
                        subValue={`${formatCurrency(stats?.bestDay.total_sales_for_dow || 0, currency)} Revenue`}
                        color="text-[#C3EB7A]"
                        bg="bg-[#C3EB7A]/10"
                    />
                    <InsightCard 
                        title="Order Density"
                        icon={<Activity className="w-4 h-4" />}
                        value={`${stats?.bestDay.total_orders_for_dow || 0} Orders`}
                        subValue="Typical volume on peak"
                        color="text-blue-400"
                        bg="bg-blue-400/10"
                    />
                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-center mt-auto">
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="w-4 h-4 text-orange-400" />
                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Growth Opportunity</h4>
                        </div>
                        <p className="text-[11px] font-bold text-white/40 leading-relaxed italic">
                            {stats?.worstDay.dow_name} is your slow day. Try loyalist boosters.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function InsightCard({ title, icon, value, subValue, color, bg }: any) {
    return (
        <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${bg} ${color}`}>
                    {icon}
                </div>
                <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[2px]">{title}</h4>
            </div>
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-[10px] font-bold text-white/40">{subValue}</p>
        </div>
    );
}

function CustomTooltip({ active, payload, currency }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#1A1A1A] border border-white/10 p-5 rounded-[24px] shadow-2xl backdrop-blur-2xl">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-3">{data.name}</p>
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Sales</span>
                        <span className="text-sm font-black text-[#C3EB7A]">{formatCurrency(data.sales, currency)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Orders</span>
                        <span className="text-sm font-black text-white">{data.orders}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Avg Value</span>
                        <span className="text-sm font-black text-blue-400">{formatCurrency(data.aov, currency)}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
