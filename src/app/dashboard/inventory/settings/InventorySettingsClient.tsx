'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Trash2, Edit3, MapPin,
    Database, Utensils, ClipboardCheck, History,
    Package, Plus, Search, ChevronRight, Sparkles
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import Link from 'next/link';

// Mock Data
const initialIngredients = [
    { id: '1', name: 'Arabica Coffee Beans', unit: 'kg', stock: 45, cost: 22.50, category: 'Coffee' },
    { id: '2', name: 'Whole Milk', unit: 'Gallon', stock: 12, cost: 4.20, category: 'Dairy' },
    { id: '3', name: 'Raw Sugar', unit: 'kg', stock: 80, cost: 1.50, category: 'Pantry' },
    { id: '4', name: 'Oat Milk', unit: 'Gallon', stock: 8, cost: 5.80, category: 'Dairy' },
];

export default function InventorySettingsClient() {
    const { activeContextId } = useBusinessStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    const [ingredients, setIngredients] = useState(initialIngredients);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes' | 'audit'>('ingredients');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredItems = ingredients.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <Link href="/dashboard/inventory" className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4 hover:text-[#C3EB7A] transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Inventory
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Database className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[3px]">Supply Operations</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-blue-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Inventory <span className="text-white/30">Master.</span>
                    </h1>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                            type="text" 
                            placeholder="Search catalog..."
                            className="pl-11 pr-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-[#C3EB7A]/50 transition-all w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#C3EB7A] text-black text-xs font-black uppercase tracking-widest hover:bg-[#A8D45C] transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]"
                    >
                        <Plus className="w-4 h-4" strokeWidth={3} /> Add Ingredient
                    </button>
                </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex items-center gap-8 border-b border-white/5 pb-1">
                <TabButton label="Ingredients" active={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')} icon={<Package className="w-4 h-4" />} />
                <TabButton label="Recipes" active={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')} icon={<Utensils className="w-4 h-4" />} />
                <TabButton label="Audit Log" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} icon={<ClipboardCheck className="w-4 h-4" />} />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* Catalog List */}
                <div className="xl:col-span-3 space-y-6">
                    {activeTab === 'ingredients' && (
                        <div className="space-y-4">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group flex items-center gap-8">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#C3EB7A] group-hover:bg-[#C3EB7A]/10 transition-all">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-white tracking-tight">{item.name}</h4>
                                        <p className="text-[10px] text-white/20 uppercase tracking-widest leading-none mt-1">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Stock Level</p>
                                        <span className="text-xl font-black text-white">{item.stock} <span className="text-xs text-white/20">{item.unit}</span></span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Unit Cost</p>
                                        <span className="text-xl font-black text-[#C3EB7A]">${item.cost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'recipes' && (
                        <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                            <Utensils className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <h3 className="text-xl font-black text-white mb-2">Recipe Builder</h3>
                            <p className="text-white/40 max-w-sm mx-auto mb-8 font-medium italic">Link ingredients to menu items for real-time stock deductions during sales.</p>
                            <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                                Create First Recipe
                            </button>
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div className="space-y-4">
                            <AuditRow date="Mar 11, 2026" user="Alex Miller" outlet="Downtown Cafe" variance="-1.2kg" status="Resolved" />
                            <AuditRow date="Mar 10, 2026" user="Sarah Chen" outlet="Uptown Bistro" variance="+0.4kg" status="Auto-Updated" />
                            <AuditRow date="Mar 08, 2026" user="David Lee" outlet="Downtown Cafe" variance="-4.5kg" status="Flagged" />
                        </div>
                    )}
                </div>

                {/* Automation Panel */}
                <div className="xl:col-span-1 space-y-8">
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Moza Auto-Fill</span>
                        </div>
                        <h3 className="text-sm font-black text-white mb-4">Stock Intelligence</h3>
                        <p className="text-[11px] text-white/40 leading-relaxed italic mb-8">
                            &quot;Expected stock-out for <span className="text-white font-bold">Arabica Beans</span> in 48h based on current consumption velocity. Generating auto-PO...&quot;
                        </p>
                        <button className="w-full py-4 rounded-2xl bg-blue-500 text-white text-[10px] font-black uppercase tracking-[3px] hover:bg-blue-600 transition-all">
                            Review PO-3490
                        </button>
                    </div>

                    <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                        <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest">Inventory Health</h3>
                        <div className="space-y-6">
                            <HealthMetric label="Stock Accuracy" value="98.2%" trend="+0.5%" />
                            <HealthMetric label="Waste Reduction" value="12%" trend="+4%" />
                            <HealthMetric label="Asset Value" value="$42,850" trend="-2%" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Modals... (Simplified placeholders) */}

        </div>
    );
}

function TabButton({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 pb-4 transition-all relative ${active ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
        >
            {icon}
            <span className="text-[11px] font-black uppercase tracking-[3px]">{label}</span>
            {active && (
                <motion.div 
                    layoutId="active-inventory-tab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C3EB7A]"
                />
            )}
        </button>
    );
}

function HealthMetric({ label, value, trend }: { label: string, value: string, trend: string }) {
    const isPositive = trend.startsWith('+');
    return (
        <div>
            <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{label}</span>
                <span className={`text-[10px] font-black ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>{trend}</span>
            </div>
            <p className="text-xl font-black text-white">{value}</p>
        </div>
    );
}

function AuditRow({ date, user, outlet, variance, status }: { date: string, user: string, outlet: string, variance: string, status: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                <History className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-black text-white tracking-tight">{date}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest leading-none mt-1">{user} • {outlet}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Variance</p>
                <span className={`text-sm font-black ${variance.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{variance}</span>
            </div>
            <div className="text-right min-w-[100px]">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Status</p>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                    status === 'Resolved' ? 'text-emerald-400 border-emerald-400/20' :
                    status === 'Flagged' ? 'text-rose-400 border-rose-400/20' :
                    'text-blue-400 border-blue-400/20'
                }`}>
                    {status}
                </span>
            </div>
            <button className="p-2 text-white/20 hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
