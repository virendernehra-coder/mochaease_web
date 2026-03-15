'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, Boxes, AlertTriangle, ArrowUpRight, 
    Search, Filter, Plus, MoreHorizontal,
    TrendingDown, BarChart3, Clock, MapPin, LayoutGrid
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { getInventoryStock } from '@/utils/supabase/queries-client';
import { type InventoryStock } from '@/utils/supabase/queries';

export default function InventoryClient() {
    const { user } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    const isGlobal = activeContextId === 'business';
    const businessId = user?.business_id;
    const outletId = isGlobal ? null : activeContextId;

    // Fetch Inventory Data
    const { data: inventory = [], isLoading } = useQuery({
        queryKey: ['inventory-stock', businessId, activeContextId],
        queryFn: () => getInventoryStock(businessId!, activeContextId === 'business' ? null : activeContextId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    // Derived Metrics
    const metrics = React.useMemo(() => {
        const totalValue = inventory.reduce((sum, item) => sum + Number(item.stock_value || 0), 0);
        const lowStock = inventory.filter(item => item.stock_health_color === 'RED').length;
        const totalCategories = new Set(inventory.map(item => item.suggested_category)).size;
        
        return {
            totalSkus: inventory.length,
            stockValue: totalValue,
            lowStockCount: lowStock,
            categoriesCount: totalCategories
        };
    }, [inventory]);

    const categories = React.useMemo(() => {
        return Array.from(new Set(inventory.map(item => item.suggested_category))).sort();
    }, [inventory]);

    const filteredInventory = React.useMemo(() => {
        return inventory.filter(item => {
            const matchesSearch = item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                item.sku.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || item.suggested_category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [inventory, searchQuery, selectedCategory]);

    const criticalItems = React.useMemo(() => {
        return inventory
            .filter(item => item.stock_health_color === 'RED')
            .sort((a, b) => Number(a.days_until_stockout) - Number(b.days_until_stockout))
            .slice(0, 5);
    }, [inventory]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const contextName = isGlobal ? 'Global Business' : (inventory[0]?.outlet_name || 'Selected Outlet');

    if (isLoading) {
        return (
            <div className="max-w-[1600px] mx-auto space-y-12 pb-20 animate-pulse">
                <div className="h-48 bg-white/5 rounded-[40px] border border-white/5" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-[32px] border border-white/5" />)}
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-1 h-96 bg-white/5 rounded-[40px] border border-white/5" />
                    <div className="col-span-2 space-y-4">
                        {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/5" />)}
                    </div>
                </div>
            </div>
        );
    }

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
                    <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/search:text-amber-400 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search SKU or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-xs font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400/50 w-64 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 text-black text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                        <Plus className="w-4 h-4" strokeWidth={3} /> Add Item
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total SKUs" value={metrics.totalSkus.toLocaleString()} sub="Active items" trend="Live" icon={<Package className="w-5 h-5" />} color="blue" />
                <KPICard title="Stock Value" value={formatCurrency(metrics.stockValue)} sub="Current asset value" trend="Market" icon={<BarChart3 className="w-5 h-5" />} color="emerald" />
                <KPICard title="Critical items" value={metrics.lowStockCount.toString()} sub="High stockout risk" trend="Alert" icon={<AlertTriangle className="w-5 h-5" />} color="red" />
                <KPICard title="Categories" value={metrics.categoriesCount.toString()} sub="Active sectors" trend="Diverse" icon={<LayoutGrid className="w-5 h-5" />} color="purple" />
            </div>

            {/* List & Detailed View */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Critical Alerts */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-red-500" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-8">Stock Alerts</h3>
                    
                    <div className="space-y-6">
                        {criticalItems.length > 0 ? (
                            criticalItems.map(item => (
                                <AlertItem 
                                    key={item.inventory_id}
                                    title={item.item_name} 
                                    stock={`${item.current_stock}${item.base_unit_of_measure}`} 
                                    status={`${item.days_until_stockout}d remain`} 
                                    color="text-red-400" 
                                />
                            ))
                        ) : (
                            <div className="py-8 text-center text-white/20 italic text-xs">No critical inventory alerts in this sector.</div>
                        )}
                    </div>

                    <button className="w-full mt-12 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[3px] hover:bg-red-500/20 transition-all">
                        Generate Optimized Order
                    </button>
                </div>

                {/* SKU Tracker */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Active SKU Movements</h3>
                        <div className="flex flex-wrap items-center gap-2">
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {filteredInventory.slice(0, 10).map(item => (
                            <SKURow 
                                key={item.inventory_id}
                                name={item.item_name} 
                                sku={item.sku} 
                                stock={`${item.current_stock} ${item.base_unit_of_measure}`} 
                                usage={item.business_impact_level.split('_')[0]} 
                                trend={`${item.days_until_stockout} Days`}
                                healthColor={item.stock_health_color}
                            />
                        ))}
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Complete Inventory ({inventory.length})
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

function SKURow({ name, sku, stock, usage, trend, healthColor }: { name: string, sku: string, stock: string, usage: string, trend: string, healthColor: string }) {
    const colorMap: Record<string, string> = {
        'GREEN': 'text-emerald-400',
        'YELLOW': 'text-amber-400',
        'RED': 'text-red-400'
    };
    const bgMap: Record<string, string> = {
        'GREEN': 'bg-emerald-500/10 border-emerald-500/20',
        'YELLOW': 'bg-amber-500/10 border-amber-500/20',
        'RED': 'bg-red-500/10 border-red-500/20'
    };

    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${bgMap[healthColor] || 'bg-white/5 border-white/10 text-white/20'}`}>
                <Package className={`w-5 h-5 ${colorMap[healthColor] || 'text-white/20'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{sku}</p>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Impact</p>
                <p className={`text-xs font-bold ${usage === 'HIGH' ? 'text-amber-400' : 'text-white/60'}`}>{usage}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">In Stock</p>
                <p className="text-sm font-black text-white">{stock}</p>
            </div>
            <div className="hidden lg:block text-right w-16">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <p className={`text-[10px] font-black ${colorMap[healthColor] || 'text-white/20'}`}>{trend}</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
    );
}
