'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, 
    Zap, 
    TrendingUp,
    Activity,
    Info,
    ArrowRight
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getHourlyPerformance } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';

export default function PeakHourInsights() {
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;
    const currency = businessConfig?.currency || 'USD';

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['hourly-performance', businessId, outletId],
        queryFn: () => getHourlyPerformance(businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 15, // 15 minute cache
    });

    // Process data for chart
    const chartData = React.useMemo(() => {
        if (!rawData) return Array.from({ length: 24 }, (_, i) => ({ 
            hour: `${i.toString().padStart(2, '0')}:00`, 
            sales: 0 
        }));

        return rawData.map(item => ({
            hour: `${item.hour_of_day.toString().padStart(2, '0')}:00`,
            sales: Number(item.avg_hourly_revenue || 0)
        }));
    }, [rawData]);

    // Derived Insights
    const { peakHourRange, avgSales, peakSales } = React.useMemo(() => {
        if (!rawData || rawData.length === 0) return { peakHourRange: 'N/A', avgSales: 0, peakSales: 0 };
        
        const sorted = [...rawData].sort((a, b) => Number(b.avg_hourly_revenue) - Number(a.avg_hourly_revenue));
        const peak = sorted[0];
        const nextHour = (peak.hour_of_day + 1) % 24;
        
        const total = rawData.reduce((sum, item) => sum + Number(item.avg_hourly_revenue), 0);
        
        return {
            peakHourRange: `${peak.hour_of_day.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`,
            avgSales: total / 24,
            peakSales: Number(peak.avg_hourly_revenue)
        };
    }, [rawData]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[40px] bg-[#0F0F0F] border border-white/5 p-10 overflow-hidden relative group"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[24px] bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white/40 uppercase tracking-[3px]">Temporal Dynamics</h3>
                        <h2 className="text-3xl font-black text-white tracking-tighter">Peak Hour Insights</h2>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <InsightTag label="Peak" value={peakHourRange} color="text-[#C3EB7A]" />
                    <div className="hidden sm:block w-[1px] h-8 bg-white/10 mx-2" />
                    <InsightTag label="Avg. Hourly" value={formatCurrency(avgSales, currency)} color="text-white" />
                </div>
            </div>

            <div className="h-[250px] md:h-[350px] w-full relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] rounded-3xl animate-pulse">
                        <div className="text-white/20 font-black tracking-widest text-xs uppercase italic">Syncing Temporal Metrics...</div>
                    </div>
                ) : rawData?.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl">
                        <Activity className="w-8 h-8 text-white/10 mb-3" />
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">No Temporal Data Found</p>
                    </div>
                ) : (
                    <>
                        <style jsx global>{`
                            .recharts-cartesian-grid-horizontal line,
                            .recharts-cartesian-grid-vertical line {
                                stroke: rgba(255, 255, 255, 0.03);
                            }
                        `}</style>
                        
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C3EB7A" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#C3EB7A" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    dataKey="hour" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800 }} 
                                    dy={10}
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
                                    fill="url(#colorSales)" 
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </>
                )}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-start gap-4 group/insight hover:bg-white/[0.04] transition-all">
                    <div className="p-2.5 rounded-xl bg-[#C3EB7A]/10 text-[#C3EB7A]">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Temporal Optimization</h4>
                        <p className="text-sm font-bold text-white/40 leading-relaxed">
                            {peakSales > 0 
                                ? `Your maximum performance spikes at ${peakHourRange.split(' - ')[0]}. Ensure staffing is optimized for high orders.`
                                : "No temporal spikes detected yet. Continue tracking to identify your business's Golden Hours."}
                        </p>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-start gap-4 group/insight hover:bg-white/[0.04] transition-all">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Revenue Distribution</h4>
                        <p className="text-sm font-bold text-white/40 leading-relaxed">
                            {avgSales > 0 
                                ? `Maintaining an average of ${formatCurrency(avgSales, currency)} per hour. Focus on low-volume hours for targeted promos.`
                                : "Aggregating revenue distribution data to provide actionable growth insights."}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function InsightTag({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="px-4 py-2">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[2px] mb-0.5">{label}</p>
            <p className={`text-xs font-black ${color}`}>{value}</p>
        </div>
    );
}

function CustomTooltip({ active, payload, label, currency }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1A1A1A] border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C3EB7A]" />
                    <p className="text-xl font-black text-white">{formatCurrency(payload[0].value, currency)}</p> 
                </div>
            </div>
        );
    }
    return null;
}
