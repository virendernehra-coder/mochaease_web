'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, ArrowLeft, 
    ArrowUpRight, ArrowDownRight, Search,
    Sparkles, ShoppingBag, Zap, Award,
    MapPin, ChevronRight, Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';
import { useUserStore } from '@/store/user-store';
import { formatCurrency } from '@/utils/format';

export default function ProductSalesClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    // Data for products - potentially from Supabase in the future
    const topProducts = [
        { name: 'Cold Brew Oat Latte', sku: 'BV-001', sales: 1420, revenue: 7810, trend: '+12%', isUp: true },
        { name: 'Truffle Mushroom Toast', sku: 'FD-042', sales: 840, revenue: 14280, trend: '+24%', isUp: true },
        { name: 'Double Espresso', sku: 'BV-005', sales: 2100, revenue: 6300, trend: '-2%', isUp: false },
        { name: 'Butter Croissant', sku: 'BK-012', sales: 980, revenue: 3920, trend: '+5%', isUp: true },
    ];

    const stats = [
        { title: "Total Units Sold", value: "56,241", subtitle: "Across all SKUs", icon: <ShoppingBag className="w-4 h-4 text-[#C3EB7A]" />, color: "from-[#C3EB7A]/20 to-transparent" },
        { title: "Average Basket Size", value: "2.4 Items", subtitle: "+0.2 from last week", icon: <Zap className="w-4 h-4 text-orange-400" />, color: "from-orange-400/20 to-transparent" },
        { title: "Top Performer", value: "Oat Latte", subtitle: "Revenue leader", icon: <Award className="w-4 h-4 text-blue-400" />, color: "from-blue-400/20 to-transparent" },
        { title: "Low Stock Alerts", value: "12 SKUs", subtitle: "Action required", icon: <Package className="w-4 h-4 text-red-500" />, color: "from-red-500/20 to-transparent" },
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
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all backdrop-blur-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </motion.button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-3 h-3 text-[#C3EB7A]" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter">Product <span className="text-white/30 font-extrabold">Throughput.</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group flex-1 md:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search SKU..."
                            className="w-full md:w-[240px] bg-white/5 border border-white/10 rounded-2xl py-2 pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-[#C3EB7A]/40 transition-all backdrop-blur-xl"
                        />
                    </div>
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid rounded to align with SummaryMetricCards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                    <MetricCard key={stat.title} {...stat} delay={idx * 0.1} />
                ))}
            </div>

            {/* Product Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden group"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3EB7A]/5 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                
                <div className="relative bg-[#0F0F0F]/80 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="p-6 md:p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight">Individual Item Metrics</h3>
                            <p className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mt-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C3EB7A] animate-pulse" />
                                Real-time sales velocity & performance
                            </p>
                        </div>
                        <button className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-[#C3EB7A]/10 text-[#C3EB7A] font-black text-[10px] uppercase tracking-widest border border-[#C3EB7A]/20 hover:bg-[#C3EB7A]/20 transition-all active:scale-95 group/ai shadow-[0_0_20px_rgba(195,235,122,0.1)]">
                            <Sparkles className="w-4 h-4 group-hover/ai:rotate-12 transition-transform" />
                            Run AI Forecast
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.02] text-left">
                                    <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Rank</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Product Details</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Units Sold</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Revenue</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Market Trend</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Deep Dive</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {topProducts.map((product, idx) => (
                                    <motion.tr 
                                        key={product.sku} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (idx * 0.1) }}
                                        className="group/row hover:bg-white/[0.03] transition-all"
                                    >
                                        <td className="px-10 py-7">
                                            <span className={`text-sm font-black ${idx < 3 ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                                #{(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-7">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover/row:bg-[#C3EB7A]/10 group-hover/row:text-[#C3EB7A] transition-all shadow-lg group-hover/row:scale-110">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white group-hover/row:text-[#C3EB7A] transition-colors">{product.name}</p>
                                                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">SKU: {product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-7">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-white">{product.sales.toLocaleString()}</span>
                                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Total Sales</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-7">
                                            <p className="text-sm font-black text-[#C3EB7A]">{formatCurrency(product.revenue, currency)}</p>
                                        </td>
                                        <td className="px-6 py-7">
                                            <div className={`flex items-center gap-1.5 text-[11px] font-black ${product.isUp ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                                {product.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                                {product.trend}
                                            </div>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <div className="flex items-center justify-end gap-5">
                                                <button 
                                                    onClick={() => router.push('/dashboard/offers')}
                                                    className="text-[10px] font-black text-[#C3EB7A] hover:brightness-125 uppercase tracking-widest transition-all"
                                                >
                                                    Add Promo
                                                </button>
                                                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function MetricCard({ title, value, subtitle, icon, color, delay }: { title: string, value: string, subtitle: string, icon: React.ReactNode, color: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "circOut" }}
            className="p-6 md:p-8 rounded-[32px] bg-[#0F0F0F]/80 border border-white/5 group hover:border-white/10 transition-all duration-500 relative overflow-hidden backdrop-blur-xl"
        >
            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 text-white/20 group-hover:text-inherit transition-all duration-500 border border-white/5 group-hover:border-white/10">
                        {icon}
                    </div>
                </div>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-2">{title}</h3>
                <p className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1.5">{value}</p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{subtitle}</p>
            </div>
        </motion.div>
    );
}
