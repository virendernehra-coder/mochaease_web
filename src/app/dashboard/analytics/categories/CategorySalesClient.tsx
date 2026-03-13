'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Filter, 
    MapPin,
    Utensils, Coffee, IceCream
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';

export default function CategorySalesClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    const categories = [
        { name: 'Coffee & Espresso', sales: '$12,450', growth: '+14%', icon: Coffee, color: '#C3EB7A' },
        { name: 'House Bakery', sales: '$8,200', growth: '+8%', icon: Utensils, color: '#4A90E2' },
        { name: 'Seasonal Specials', sales: '$4,100', growth: '+22%', icon: IceCream, color: '#F59E0B' },
        { name: 'Signature Blends', sales: '$3,800', growth: '-2%', icon: Coffee, color: '#8B5CF6' },
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
                            <MapPin className="w-3 h-3 text-[#C3EB7A]" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[2px]">{contextName}</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">Category <span className="text-white/30">Analytics.</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Filter className="w-4 h-4" />
                        Timeframe: 30D
                    </button>
                </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <motion.div 
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[28px] bg-[#0F0F0F]/80 border border-white/5 backdrop-blur-xl relative group overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-[#C3EB7A] group-hover:text-black transition-all duration-500">
                                <cat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-black ${cat.growth.startsWith('+') ? 'text-[#C3EB7A]' : 'text-red-400'}`}>
                                {cat.growth}
                            </span>
                        </div>
                        <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{cat.name}</h3>
                        <p className="text-2xl font-black text-white tracking-tight">{cat.sales}</p>
                    </motion.div>
                ))}
            </div>

            {/* Visual breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] p-8 min-h-[400px]">
                    <h3 className="text-lg font-black text-white mb-8">Revenue Distribution</h3>
                    <div className="flex items-center gap-12">
                        {/* Simplified Donut Chart */}
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-white/5 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[16px] border-[#C3EB7A] border-t-transparent border-r-transparent rotate-45" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-white">$28.5k</p>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Total Sales</p>
                            </div>
                        </div>
                        <div className="space-y-4 flex-1">
                            {categories.map(cat => (
                                <div key={cat.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                        <span className="text-xs font-bold text-white/60">{cat.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-white">45%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] p-8">
                    <h3 className="text-lg font-black text-white mb-8">Growth Velocity</h3>
                    <div className="space-y-8">
                        {categories.map((cat, i) => (
                            <div key={cat.name} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-white/40">{cat.name}</span>
                                    <span className="text-white">{cat.growth}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${60 + (i * 10)}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1 }}
                                        className="h-full bg-gradient-to-r from-[#C3EB7A]/20 to-[#C3EB7A]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
