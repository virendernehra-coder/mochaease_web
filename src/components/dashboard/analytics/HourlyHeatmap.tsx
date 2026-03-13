'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    TrendingUp, 
    ShoppingCart, 
    Package, 
    ArrowUpRight,
    LucideIcon
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getHourlyPerformance } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';

interface ChartDataPoint {
    hourLabel: string;
    avgRevenue: number;
    avgOrders: number;
    totalOrders: number;
}

export default function HourlyHeatmap() {
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;
    const currency = businessConfig?.currency || 'USD';

    const { data: rawData, isLoading } = useQuery({
        queryKey: ['hourly-heatmap', businessId, outletId],
        queryFn: () => getHourlyPerformance(businessId!, outletId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 30, // 30 minute cache for averages
    });

    // Process data for heatmap (Using high-accuracy averages from the new view)
    const chartData: ChartDataPoint[] = React.useMemo(() => {
        if (!rawData || rawData.length === 0) return Array.from({ length: 24 }, (_, i) => ({ 
            hourLabel: `${i.toString().padStart(2, '0')}:00`,
            avgRevenue: 0,
            avgOrders: 0,
            totalOrders: 0
        }));

        return rawData.map(item => {
            return {
                hourLabel: `${item.hour_of_day.toString().padStart(2, '0')}:00`,
                avgRevenue: Number(item.avg_hourly_revenue || 0),
                avgOrders: Number(item.avg_hourly_orders || 0),
                totalOrders: Number(item.total_90d_orders || 0)
            };
        });
    }, [rawData]);

    // Find max value for color scaling based on average revenue
    const maxRevenueValue = Math.max(...chartData.map(d => d.avgRevenue), 1);

    const getBarColor = (value: number) => {
        if (value === 0) return '#1A1A1A'; // Empty state
        const intensity = value / maxRevenueValue;
        
        // High-contrast palette for visibility
        if (intensity > 0.8) return '#C3EB7A'; // Peak Revenue
        if (intensity > 0.5) return '#99BC5A';
        if (intensity > 0.2) return '#6B8241';
        return '#3E4A28';
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-[40px] bg-[#0F0F0F] border border-white/5 p-10 overflow-hidden relative group"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[24px] bg-[#C3EB7A]/10 text-[#C3EB7A] border border-[#C3EB7A]/20">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white/40 uppercase tracking-[3px]">Operation Intelligence</h3>
                        <h2 className="text-3xl font-black text-white tracking-tighter">Avg. Hourly Revenue Heatmap</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-[#3E4A28]" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-wider">Lean</span>
                        <div className="w-4 h-[1px] bg-white/10 mx-1" />
                        <div className="w-2 h-2 rounded-full bg-[#C3EB7A]" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-wider">Premium</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] rounded-3xl animate-pulse">
                        <div className="text-[#C3EB7A]/20 font-black tracking-[5px] text-xs uppercase italic">Syncing Operational Data...</div>
                    </div>
                ) : rawData?.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl">
                        <Activity className="w-8 h-8 text-white/10 mb-3" />
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">No Temporal Data Found</p>
                        <p className="text-[9px] font-bold text-white/10 mt-1 max-w-[200px] text-center">Verify operating hours exist in Shift Details for this context.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                            <XAxis 
                                dataKey="hourLabel" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 800 }} 
                                interval={2}
                            />
                            <YAxis hide />
                            <Tooltip 
                                content={<OperationalTooltip currency={currency} />}
                                cursor={{ fill: 'rgba(195, 235, 122, 0.05)', radius: 12 }}
                            />
                            <Bar 
                                dataKey="avgRevenue" 
                                radius={[6, 6, 6, 6]}
                                barSize={16}
                                animationDuration={1500}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.avgRevenue)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
               <MetaInsight 
                icon={TrendingUp} 
                label="Peak Revenue Hours" 
                value="17:00 - 21:00" 
                color="text-orange-400"
               />
               <MetaInsight 
                icon={Activity} 
                label="Operational Core" 
                value="Revenue Optimized" 
                color="text-[#C3EB7A]"
               />
            </div>
        </motion.div>
    );
}

function OperationalTooltip({ active, payload, label, currency }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload as ChartDataPoint;
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111111] border border-white/10 p-6 rounded-[32px] shadow-2xl backdrop-blur-2xl w-64"
            >
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[3px]">{label}</p>
                    <div className="px-2 py-1 rounded-lg bg-[#C3EB7A]/10 text-[#C3EB7A] text-[10px] font-black uppercase tracking-wider">
                        Averages
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-black text-white/30 uppercase mb-1">Avg. Hourly Revenue</p>
                        <p className="text-2xl font-black text-white tracking-tighter">
                            {formatCurrency(data.avgRevenue, currency)}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                        <TooltipMetric 
                            icon={ShoppingCart} 
                            label="Avg. Orders" 
                            value={data.avgOrders.toFixed(1)} 
                        />
                        <TooltipMetric 
                            icon={Package} 
                            label="Total Orders" 
                            value={data.totalOrders?.toLocaleString()} 
                        />
                    </div>

                    <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-relaxed">
                            {data.avgRevenue > 0 
                                ? "Historical data indicates consistent throughput during this window." 
                                : "Operational metrics are still calibrating for this window."}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }
    return null;
}

function TooltipMetric({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1 text-white/40">
                <Icon className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm font-black text-white">{value}</p>
        </div>
    );
}

function MetaInsight({ icon: Icon, label, value, color }: { icon: LucideIcon, label: string, value: string, color: string }) {
    return (
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <Icon className={`w-4 h-4 ${color}`} />
            <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</p>
                <p className="text-xs font-black text-white">{value}</p>
            </div>
        </div>
    );
}
