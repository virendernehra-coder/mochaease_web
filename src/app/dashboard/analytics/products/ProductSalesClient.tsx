'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, ArrowLeft, 
    ArrowUpRight, ArrowDownRight, Search,
    Sparkles, ShoppingBag, Zap, Award
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';

export default function ProductSalesClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    const topProducts = [
        { name: 'Cold Brew Oat Latte', sku: 'BV-001', sales: 1420, revenue: '$7,810', trend: '+12%', isUp: true },
        { name: 'Truffle Mushroom Toast', sku: 'FD-042', sales: 840, revenue: '$14,280', trend: '+24%', isUp: true },
        { name: 'Double Espresso', sku: 'BV-005', sales: 2100, revenue: '$6,300', trend: '-2%', isUp: false },
        { name: 'Butter Croissant', sku: 'BK-012', sales: 980, revenue: '$3,920', trend: '+5%', isUp: true },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPinIcon className="w-3 h-3 text-[#C3EB7A]" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">Product <span className="text-white/30">Throughput.</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search SKU or Name..."
                            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-[#C3EB7A]/40 min-w-[240px] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Top Performers Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuickStat cardTitle="Total Units Sold" value="56,241" subtitle="Across all SKUs" icon={<ShoppingBag className="w-4 h-4" />} />
                <QuickStat cardTitle="Average Basket Size" value="2.4 Items" subtitle="+0.2 from last week" icon={<Zap className="w-4 h-4" />} />
                <QuickStat cardTitle="Top Performer" value="Oat Latte" subtitle="Revenue leader" icon={<Award className="w-4 h-4" />} />
                <QuickStat cardTitle="Low Stock Alerts" value="12 SKUs" subtitle="Immediate action required" icon={<Package className="w-4 h-4" />} />
            </div>

            {/* Product Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F0F0F]/80 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl"
            >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-white tracking-tight">Individual Item Metrics</h3>
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mt-1">Real-time sales velocity</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C3EB7A]/10 text-[#C3EB7A] font-black text-[10px] uppercase tracking-widest border border-[#C3EB7A]/20">
                        <Sparkles className="w-3 h-3" />
                        AI Forecast
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/[0.02] text-left">
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Product Details</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Units Sold</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Revenue</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Market Trend</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {topProducts.map((product) => (
                                <tr key={product.sku} className="group hover:bg-white/[0.03] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-[#C3EB7A]/10 group-hover:text-[#C3EB7A] transition-all">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white group-hover:underline underline-offset-4">{product.name}</p>
                                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-white">{product.sales.toLocaleString()}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-[#C3EB7A]">{product.revenue}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`flex items-center gap-1 text-[11px] font-black ${product.isUp ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                            {product.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {product.trend}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <button 
                                                onClick={() => router.push('/dashboard/offers')}
                                                className="text-[10px] font-black text-[#C3EB7A] hover:underline uppercase tracking-widest transition-colors"
                                            >
                                                Promo
                                            </button>
                                            <button className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-widest transition-colors">
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

function QuickStat({ cardTitle, value, subtitle, icon }: { cardTitle: string, value: string, subtitle: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-[28px] bg-[#0F0F0F]/80 border border-white/5 group hover:border-[#C3EB7A]/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-white/40 group-hover:text-[#C3EB7A] transition-colors">
                    {icon}
                </div>
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest">{cardTitle}</h3>
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
            <p className="text-[10px] font-bold text-white/40 mt-1">{subtitle}</p>
        </div>
    );
}

function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
    )
}
