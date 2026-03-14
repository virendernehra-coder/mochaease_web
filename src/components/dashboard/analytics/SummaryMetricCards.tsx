'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Coins, 
    Banknote, 
    ShoppingCart, 
    Receipt, 
    XCircle,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useFilterStore } from '@/store/filter-store';
import { useQuery } from '@tanstack/react-query';
import { getSalesPerformance, SalesPeriod } from '@/utils/supabase/queries-client';
import { formatCurrency, formatCompactNumber } from '@/utils/format';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    delay: number;
    isCurrency?: boolean;
}

const MetricCard = ({ title, value, icon, color, delay, isCurrency }: MetricCardProps) => {
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
            {/* Hover & Active Glow Effect */}
            <motion.div 
                key={activePreset}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`absolute inset-0 bg-gradient-to-br ${color} transition-opacity duration-700`} 
            />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className={`p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-500 flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
                
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[1px] md:tracking-[2px] mb-1">{title}</h3>
                <div className="flex items-baseline gap-2 overflow-hidden h-6 md:h-7">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activePreset + value}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="text-lg md:text-xl font-black text-white tracking-tight block"
                        >
                            {isCurrency ? formatCurrency(Number(value), currency) : value.toLocaleString()}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default function SummaryMetricCards() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const { activePreset, selectedRange } = useFilterStore();
    
    const businessId = user?.business_id;
    const isGlobal = activeContextId === 'business';
    const outletId = isGlobal ? null : activeContextId;

    // Map preset label to SalesPeriod
    const period = activePreset.toLowerCase().replace(' ', '_') as SalesPeriod;

    // Extract ISO strings for the custom range
    const startDate = selectedRange.from.toISOString();
    const endDate = selectedRange.to.toISOString();

    const { data: salesData, isLoading } = useQuery({
        // We include the full range and period in the key for accurate caching
        queryKey: ['sales', period, businessId, outletId, startDate, endDate],
        queryFn: () => getSalesPerformance(
            period, 
            businessId!, 
            outletId, 
            // Only pass explicit dates for non-standard/custom periods or when explicitly selected
            (period !== 'today' && period !== 'yesterday') ? startDate : undefined,
            (period !== 'today' && period !== 'yesterday') ? endDate : undefined
        ),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 2, // 2 minute cache
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
                ))}
            </div>
        );
    }

    const metrics = [
        {
            title: "Gross Sales",
            value: salesData?.gross_sales || 0,
            icon: <Coins className="w-4 h-4 text-[#C3EB7A]" />,
            color: "from-[#C3EB7A] to-transparent",
            isCurrency: true
        },
        {
            title: "Net Sales",
            value: salesData?.net_sales || 0,
            icon: <Banknote className="w-4 h-4 text-blue-400" />,
            color: "from-blue-400/20 to-transparent",
            isCurrency: true
        },
        {
            title: "Total Orders",
            value: salesData?.order_count || 0,
            icon: <ShoppingCart className="w-4 h-4 text-purple-400" />,
            color: "from-purple-400/20 to-transparent"
        },
        {
            title: "Total Expenses",
            value: salesData?.total_expanses || 0,
            icon: <Receipt className="w-4 h-4 text-orange-400" />,
            color: "from-orange-400/20 to-transparent",
            isCurrency: true
        },
        {
            title: "Canceled",
            value: salesData?.canceled_orders || 0,
            icon: <XCircle className="w-4 h-4 text-red-400" />,
            color: "from-red-400/20 to-transparent"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {metrics.map((metric, idx) => (
                <MetricCard
                    key={metric.title}
                    {...metric}
                    delay={idx * 0.1}
                />
            ))}
        </div>
    );
}
