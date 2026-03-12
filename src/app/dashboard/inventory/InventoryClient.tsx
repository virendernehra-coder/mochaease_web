'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, Boxes, AlertTriangle, ArrowUpRight, 
    Search, Filter, Plus, MoreHorizontal,
    TrendingDown, BarChart3, Clock, MapPin
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';

export default function InventoryClient() {
    const { activeContextId } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Inventory Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <Boxes className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[3px]">Stock & Supply</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-amber-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Inventory <span className="text-white/30">Vault.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Monitor stock levels, track SKU movement, and optimize procurement across your ecosystem.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Search className="w-4 h-4" /> Search SKU
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 text-black text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        <Plus className="w-4 h-4" strokeWidth={3} /> Add Item
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total SKUs" value="1,240" sub="Active items" trend="+12" icon={<Package className="w-5 h-5" />} color="blue" />
                <KPICard title="Stock Value" value="$84,200" sub="Estimated asset value" trend="+2.4%" icon={<BarChart3 className="w-5 h-5" />} color="emerald" />
                <KPICard title="Low Stock" value="14" sub="Requires immediate attention" trend="-2" icon={<AlertTriangle className="w-5 h-5" />} color="amber" />
                <KPICard title="Turnover Rate" value="4.2x" sub="Monthly standard" trend="+0.5" icon={<TrendingDown className="w-5 h-5" />} color="purple" />
            </div>

            {/* List & Detailed View */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Critical Alerts */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-amber-500" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-8">Stock Alerts</h3>
                    
                    <div className="space-y-6">
                        <AlertItem title="Organic Espresso Beans" stock="12kg" status="Critical" color="text-red-400" />
                        <AlertItem title="Oat Milk (Barista Ed.)" stock="48L" status="Low" color="text-amber-400" />
                        <AlertItem title="Eco-friendly Cups (L)" stock="240pcs" status="Low" color="text-amber-400" />
                        <AlertItem title="Paper Straws" stock="1,200pcs" status="Approaching" color="text-blue-400" />
                    </div>

                    <button className="w-full mt-12 py-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[3px] hover:bg-amber-500/20 transition-all">
                        Generate Restock Order
                    </button>
                </div>

                {/* SKU Tracker */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Active SKU Movements</h3>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                            <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Usage ▾</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <SKURow name="Mocha Blend (Premium)" sku="SKU-ME-001" stock="142kg" usage="High" trend="+12%" />
                        <SKURow name="Single Origin - Ethiopia" sku="SKU-ME-012" stock="24kg" usage="Medium" trend="-4%" />
                        <SKURow name="Almond Milk" sku="SKU-ME-045" stock="184L" usage="High" trend="+18%" />
                        <SKURow name="Brown Sugar" sku="SKU-ME-089" stock="92kg" usage="Low" trend="0%" />
                        <SKURow name="Cleaning Tablets" sku="SKU-ME-112" stock="14pcs" usage="High" trend="+5%" alert={true} />
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Complete Inventory (1,240)
                    </button>
                </div>
            </div>

        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`w-12 h-12 text-${color}-500`}>{icon}</div>
            </div>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-3xl font-black text-white mb-1 tracking-tighter">{value}</h4>
            <div className="flex items-center gap-2 mt-4">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-${color}-500/10 text-${color}-400`}>{trend}</span>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{sub}</span>
            </div>
        </div>
    );
}

function AlertItem({ title, stock, status, color }: { title: string, stock: string, status: string, color: string }) {
    return (
        <div className="flex items-center justify-between group cursor-default">
            <div>
                <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">{title}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest">Curr: {stock}</p>
            </div>
            <div className={`px-2 py-0.5 rounded-full border border-current/10 ${color} text-[9px] font-black uppercase tracking-widest`}>
                {status}
            </div>
        </div>
    );
}

function SKURow({ name, sku, stock, usage, trend, alert }: { name: string, sku: string, stock: string, usage: string, trend: string, alert?: boolean }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className={`w-10 h-10 rounded-full ${alert ? 'bg-red-500/20 border-red-500/20 text-red-400' : 'bg-white/5 border border-white/10 text-white/20'} flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black transition-all`}>
                <Package className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{sku}</p>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Usage Vel.</p>
                <p className={`text-xs font-bold ${usage === 'High' ? 'text-amber-400' : 'text-white/60'}`}>{usage}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">In Stock</p>
                <p className="text-sm font-black text-white">{stock}</p>
            </div>
            <div className="hidden lg:block text-right w-16">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Trend</p>
                <p className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-400' : trend === '0%' ? 'text-white/20' : 'text-red-400'}`}>{trend}</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
    );
}
