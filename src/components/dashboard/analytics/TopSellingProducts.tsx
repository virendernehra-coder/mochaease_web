'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, 
    TrendingUp, 
    ArrowUpRight,
    ShoppingBag,
    Star,
    Sparkles
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { formatCurrency } from '@/utils/format';

interface Product {
    id: string;
    name: string;
    category: string;
    sales: number;
    revenue: number;
    growth: string;
    rating: number;
}

export default function TopSellingProducts() {
    // Mock data for top 10 products
    const products: Product[] = [
        { id: '1', name: 'Cold Brew Oat Latte', category: 'Beverages', sales: 1240, revenue: 6820, growth: '+14%', rating: 4.9 },
        { id: '2', name: 'Truffle Mushroom Toast', category: 'Food', sales: 840, revenue: 14280, growth: '+22%', rating: 4.8 },
        { id: '3', name: 'Double Espresso', category: 'Beverages', sales: 2100, revenue: 6300, growth: '-2%', rating: 4.7 },
        { id: '4', name: 'Butter Croissant', category: 'Bakery', sales: 980, revenue: 3920, growth: '+5%', rating: 4.6 },
        { id: '5', name: 'Caramel Macchiato', category: 'Beverages', sales: 750, revenue: 4500, growth: '+18%', rating: 4.9 },
        { id: '6', name: 'Acai Bowl Special', category: 'Food', sales: 420, revenue: 5880, growth: '+30%', rating: 4.7 },
        { id: '7', name: 'Iced Matcha Latte', category: 'Beverages', sales: 890, revenue: 4895, growth: '+12%', rating: 4.8 },
        { id: '8', name: 'Avocado Smashed', category: 'Food', sales: 560, revenue: 7840, growth: '+8%', rating: 4.5 },
        { id: '9', name: 'Almond Pain au Choc', category: 'Bakery', sales: 620, revenue: 2790, growth: '+11%', rating: 4.6 },
        { id: '10', name: 'Vanilla Bean Frappé', category: 'Beverages', sales: 780, revenue: 4680, growth: '+15%', rating: 4.4 },
    ];

    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[32px] bg-[#0F0F0F]/80 border border-white/5 backdrop-blur-3xl p-5 md:p-8 overflow-hidden group"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2.5 md:p-3 rounded-2xl bg-[#4A90E2]/10 text-[#4A90E2] border border-[#4A90E2]/20">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-[10px] md:text-sm font-black text-white/40 uppercase tracking-[2px]">Market Leaderboard</h3>
                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            Top Selling Products
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </h2>
                    </div>
                </div>
                <button className="w-full sm:w-auto px-6 py-3 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    Full Analysis
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b border-white/5">
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Rank</th>
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Product Details</th>
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Units Sold</th>
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Revenue</th>
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px] hidden sm:table-cell">Growth</th>
                            <th className="pb-4 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right hidden md:table-cell">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.map((product, idx) => (
                            <motion.tr 
                                key={product.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (idx * 0.05) }}
                                className="group/row hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="py-5">
                                    <span className={`text-sm font-black ${idx < 3 ? 'text-[#C3EB7A]' : 'text-white/20'}`}>
                                        #{(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                </td>
                                <td className="py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10 group-hover/row:border-[#C3EB7A]/30 group-hover/row:text-[#C3EB7A]/50 transition-all">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white group-hover/row:text-[#C3EB7A] transition-colors">{product.name}</p>
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-5">
                                    <span className="text-sm font-black text-white">{product.sales.toLocaleString()} <span className="text-[10px] text-white/20 ml-1 font-bold">Units</span></span>
                                </td>
                                <td className="py-5">
                                    <span className="text-sm font-black text-[#C3EB7A]">{formatCurrency(product.revenue, currency)}</span>
                                </td>
                                <td className="py-5 hidden sm:table-cell">
                                    <div className={`flex items-center gap-1 text-[11px] font-black ${product.growth.startsWith('+') ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                        {product.growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                                        {product.growth}
                                    </div>
                                </td>
                                <td className="py-5 text-right hidden md:table-cell">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-black text-white">{product.rating}</span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
