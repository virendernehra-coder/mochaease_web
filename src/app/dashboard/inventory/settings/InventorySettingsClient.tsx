'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Trash2, Edit3, MapPin,
    Database, Utensils, ClipboardCheck, History,
    Package, Plus, Search, ChevronRight, Sparkles, 
    AlertTriangle, Info, X
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTrackInventory, getInventoryAuditLogs, updateTrackInventory } from '@/utils/supabase/queries-client';
import { formatCurrency } from '@/utils/format';
import { type TrackInventory } from '@/utils/supabase/queries';
import Portal from '@/components/Portal';

// Simple toast mock since sonner is not available
const toast = {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(msg)
};

// Mock Data
const initialIngredients = [
    { id: '1', name: 'Arabica Coffee Beans', unit: 'kg', stock: 45, cost: 22.50, category: 'Coffee' },
    { id: '2', name: 'Whole Milk', unit: 'Gallon', stock: 12, cost: 4.20, category: 'Dairy' },
    { id: '3', name: 'Raw Sugar', unit: 'kg', stock: 80, cost: 1.50, category: 'Pantry' },
    { id: '4', name: 'Oat Milk', unit: 'Gallon', stock: 8, cost: 5.80, category: 'Dairy' },
];

export default function InventorySettingsClient() {
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const currency = businessConfig?.currency || 'IDR';
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? 'Global Business' : 
                       activeContextId === 'outlet-1' ? 'Downtown Cafe' : 'Uptown Bistro';

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [needsReviewOnly, setNeedsReviewOnly] = useState(false);
    const [catalogPage, setCatalogPage] = useState(1);
    const [auditPage, setAuditPage] = useState(1);
    const ITEMS_PER_PAGE = 15;

    const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes' | 'audit'>('ingredients');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TrackInventory | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', detail: '' });

    const queryClient = useQueryClient();

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, updates }: { id: number, updates: Partial<TrackInventory> }) => 
            updateTrackInventory(id, updates),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trackInventory'] });
            setEditingItem(null);
            setSuccessMessage({
                title: 'Inventory Synchronized',
                detail: `The metadata for ${editingItem?.item_name || 'the item'} has been successfully updated and hardened in the global registry.`
            });
            setShowSuccessModal(true);
        },
        onError: (error) => {
            console.error('Update failed:', error);
            toast.error('Failed to sync changes with registry');
        }
    });

    // Simple debounce for search
    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset page when search/filter changes
    React.useEffect(() => {
        setCatalogPage(1);
    }, [debouncedSearch, selectedCategory, needsReviewOnly]);

    // Fetch Master Inventory
    const { data: catalogResponse, isLoading: isLoadingInventory } = useQuery({
        queryKey: ['track_inventory', activeContextId, catalogPage, debouncedSearch, selectedCategory, needsReviewOnly],
        queryFn: () => getTrackInventory(
            user?.business_id || '', 
            isGlobal ? null : activeContextId,
            catalogPage,
            ITEMS_PER_PAGE,
            debouncedSearch,
            selectedCategory,
            needsReviewOnly
        ),
        enabled: !!user?.business_id
    });

    const inventory = catalogResponse?.data || [];
    const totalCatalogCount = catalogResponse?.count || 0;
    const totalCatalogPages = Math.ceil(totalCatalogCount / ITEMS_PER_PAGE);

    // Fetch Audit Logs
    const { data: auditResponse, isLoading: isLoadingAudit } = useQuery({
        queryKey: ['inventory_audit_log', activeContextId, auditPage],
        queryFn: () => getInventoryAuditLogs(
            user?.business_id || '', 
            isGlobal ? null : activeContextId,
            auditPage,
            ITEMS_PER_PAGE
        ),
        enabled: !!user?.business_id && activeTab === 'audit'
    });

    const auditLogs = auditResponse?.data || [];
    const totalAuditCount = auditResponse?.count || 0;
    const totalAuditPages = Math.ceil(totalAuditCount / ITEMS_PER_PAGE);


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
                            {/* Category Filter Chips */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        !selectedCategory
                                            ? 'bg-[#C3EB7A] text-black border-[#C3EB7A]'
                                            : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    All
                                </button>
                                {Array.from(new Set(inventory.map(item => item.suggested_category).filter(Boolean))).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                            selectedCategory === cat
                                                ? 'bg-[#C3EB7A] text-black border-[#C3EB7A]'
                                                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}

                                <div className="h-6 w-[1px] bg-white/10 mx-2" />

                                <button
                                    onClick={() => setNeedsReviewOnly(!needsReviewOnly)}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        needsReviewOnly
                                            ? 'bg-rose-500 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                                            : 'bg-white/5 text-white/40 border-white/10 hover:border-rose-500/20 hover:text-rose-400'
                                    }`}
                                >
                                    <AlertTriangle className={`w-3 h-3 ${needsReviewOnly ? 'animate-pulse' : ''}`} />
                                    Needs Review
                                </button>
                            </div>

                            {isLoadingInventory ? (
                                [1,2,3].map(i => <div key={i} className="h-32 rounded-3xl bg-white/5 animate-pulse" />)
                            ) : inventory.length > 0 ? (
                                <>
                                    {inventory.map((item) => {
                                        const attributes = typeof item.extracted_attributes === 'string' 
                                            ? JSON.parse(item.extracted_attributes) 
                                            : item.extracted_attributes;
                                        
                                        return (
                                            <div key={item.id} className={`p-6 rounded-3xl bg-white/[0.02] border transition-all group flex items-center gap-8 ${
                                                item.needs_review ? 'border-rose-500/30 bg-rose-500/[0.02] hover:bg-rose-500/[0.04]' : 'border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                                            }`}>
                                                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${
                                                    item.needs_review ? 'text-rose-500 bg-rose-500/10' : 'text-white/20 group-hover:text-[#C3EB7A] group-hover:bg-[#C3EB7A]/10'
                                                }`}>
                                                    <Package className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-lg font-black text-white tracking-tight">{item.item_name}</h4>
                                                        {item.needs_review && (
                                                            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] font-black uppercase tracking-tighter animate-pulse">Needs Review</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-[10px] text-white/20 uppercase tracking-widest leading-none">{item.suggested_category}</p>
                                                        {attributes && Object.entries(attributes).map(([key, val]) => (
                                                            <span key={key} className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-white/40 uppercase tracking-tighter">
                                                                {key}: {String(val)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Stock Level</p>
                                                    <span className="text-xl font-black text-white">{Number(item.quantity_on_hand).toLocaleString()} <span className="text-xs text-white/20">{item.base_unit_of_measure}</span></span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Avg. Cost</p>
                                                    <span className="text-xl font-black text-[#C3EB7A]">{formatCurrency(Number(item.average_cost_per_base_unit), currency)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => setEditingItem(item)}
                                                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all hover:bg-white/10"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Pagination Controls */}
                                    {totalCatalogPages > 1 && (
                                        <div className="flex justify-center items-center gap-4 mt-8 pb-4">
                                            <button 
                                                onClick={() => setCatalogPage(p => Math.max(1, p - 1))}
                                                disabled={catalogPage === 1}
                                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <span className="text-[10px] font-black text-white uppercase tracking-[4px]">
                                                Page {catalogPage} <span className="text-white/20">of {totalCatalogPages}</span>
                                            </span>
                                            <button 
                                                onClick={() => setCatalogPage(p => Math.min(totalCatalogPages, p + 1))}
                                                disabled={catalogPage === totalCatalogPages}
                                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                                    <Package className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                    <h3 className="text-xl font-black text-white mb-2">No Items Found</h3>
                                    <p className="text-white/40 max-w-sm mx-auto mb-8 font-medium italic">Your primary inventory level is clear. Add items to track stock adjustments.</p>
                                </div>
                            )}
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
                            {isLoadingAudit ? (
                                [1,2,3].map(i => <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse" />)
                            ) : auditLogs.length > 0 ? (
                                <>
                                    {auditLogs.map((log) => (
                                        <AuditRow 
                                            key={log.id}
                                            date={new Date(log.audit_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            user={log.audited_by_user_id.slice(0, 8)} // Mock name since we don't have user name in log
                                            item={log.item_name}
                                            outlet={log.outlet_name} 
                                            variance={`${Number(log.variance_quantity) >= 0 ? '+' : ''}${log.variance_quantity}`} 
                                            status={log.is_approved ? 'Resolved' : 'Pending'} 
                                        />
                                    ))}

                                    {/* Audit Pagination */}
                                    {totalAuditPages > 1 && (
                                        <div className="flex justify-center items-center gap-4 mt-8 pb-4">
                                            <button 
                                                onClick={() => setAuditPage(p => Math.max(1, p - 1))}
                                                disabled={auditPage === 1}
                                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <span className="text-[10px] font-black text-white uppercase tracking-[4px]">
                                                Page {auditPage} <span className="text-white/20">of {totalAuditPages}</span>
                                            </span>
                                            <button 
                                                onClick={() => setAuditPage(p => Math.min(totalAuditPages, p + 1))}
                                                disabled={auditPage === totalAuditPages}
                                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                                    <History className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                    <h3 className="text-xl font-black text-white mb-2">No Audits Recorded</h3>
                                    <p className="text-white/40 max-w-sm mx-auto italic font-medium">History is clean. All stock adjustments will appear here after approval.</p>
                                </div>
                            )}
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

            {/* Modals */}
            <AnimatePresence>
                {editingItem && (
                    <Portal>
                        <EditModal 
                            item={editingItem} 
                            onClose={() => setEditingItem(null)} 
                            onSave={(updates) => updateMutation.mutate({ id: editingItem.id, updates })}
                            isSaving={updateMutation.isPending}
                        />
                    </Portal>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <Portal>
                <AnimatePresence>
                    {showSuccessModal && (
                        <div className="fixed inset-0 z-[100001] flex items-center justify-center p-6 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                                className="relative w-[92%] sm:max-w-md bg-[#0A0A0A] border border-white/5 rounded-[50px] p-8 sm:p-12 overflow-hidden shadow-[0_0_150px_rgba(195,235,122,0.1)]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#C3EB7A] to-transparent opacity-20" />

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                    className="w-24 h-24 bg-[#C3EB7A]/10 rounded-[35px] flex items-center justify-center mb-8 mx-auto border border-[#C3EB7A]/20"
                                >
                                    <Sparkles className="w-10 h-10 text-[#C3EB7A]" />
                                </motion.div>

                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-4 uppercase">
                                    {successMessage.title}
                                </h3>
                                <p className="text-white/40 font-medium text-sm leading-relaxed mb-8">
                                    {successMessage.detail}
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowSuccessModal(false)}
                                        className="w-full py-5 rounded-3xl bg-white text-black font-black uppercase tracking-[3px] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                    >
                                        Return to Catalog
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

        </div>
    );
}

function EditModal({ item, onClose, onSave, isSaving }: { 
    item: TrackInventory, 
    onClose: () => void, 
    onSave: (updates: Partial<TrackInventory>) => void,
    isSaving: boolean 
}) {
    const [formData, setFormData] = useState<Partial<TrackInventory>>({
        sku: item.sku,
        base_unit_of_measure: item.base_unit_of_measure,
        user_defined_purchase_unit: item.user_defined_purchase_unit,
        quantity_on_hand: item.quantity_on_hand,
        suggested_category: item.suggested_category,
        user_defined_conversion_factor: item.user_defined_conversion_factor,
        lead_time_days: item.lead_time_days,
        target_stock_days: item.target_stock_days,
        needs_review: false // Reset on edit
    });

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="w-full max-w-2xl bg-[#0A0A0B] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tighter">Edit <span className="text-[#C3EB7A]">Ingredient.</span></h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mt-1">Refine Catalog Metadata</p>
                    </div>
                    <button onClick={onClose} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                        <X className="w-5 h-5 text-white/40" />
                    </button>
                </div>

                <div className="p-8 grid grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <EditField 
                        label="SKU" 
                        value={formData.sku || ''} 
                        onChange={v => setFormData({...formData, sku: v})}
                        description="A unique identifier for internal tracking."
                        example="COF-ARB-001"
                    />
                    <EditField 
                        label="Category" 
                        value={formData.suggested_category || ''} 
                        onChange={v => setFormData({...formData, suggested_category: v})}
                        description="Broad group for better organization."
                        example="Dairy, Grains, etc."
                    />
                    <EditField 
                        label="Base Unit" 
                        value={formData.base_unit_of_measure || ''} 
                        onChange={v => setFormData({...formData, base_unit_of_measure: v})}
                        description="Smallest unit used for recipes/audit."
                        example="ml, gram, piece"
                    />
                    <EditField 
                        label="Purchase Unit" 
                        value={formData.user_defined_purchase_unit || ''} 
                        onChange={v => setFormData({...formData, user_defined_purchase_unit: v})}
                        description="The unit you use when placing orders."
                        example="Sack, Box, Pack"
                    />
                    <EditField 
                        label="Qty on Hand" 
                        value={String(formData.quantity_on_hand || 0)} 
                        onChange={v => setFormData({...formData, quantity_on_hand: v})}
                        description="Current stock level in base units."
                        example="1500 (ml)"
                    />
                    <EditField 
                        label="Conversion Factor" 
                        value={String(formData.user_defined_conversion_factor || 1)} 
                        onChange={v => setFormData({...formData, user_defined_conversion_factor: v})}
                        description="Units in one purchase unit."
                        example="1 Sack = 25000 grams"
                    />
                    <EditField 
                        label="Lead Time (Days)" 
                        value={String(formData.lead_time_days || 0)} 
                        onChange={v => setFormData({...formData, lead_time_days: Number(v)})}
                        description="Days from order to arrival."
                        example="3 days"
                    />
                    <EditField 
                        label="Target Stock Days" 
                        value={String(formData.target_stock_days || 0)} 
                        onChange={v => setFormData({...formData, target_stock_days: Number(v)})}
                        description="Ideal buffer stock duration."
                        example="14 days"
                    />
                </div>

                <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onSave(formData)}
                        disabled={isSaving}
                        className="flex-[2] py-4 rounded-2xl bg-[#C3EB7A] text-black text-[10px] font-black uppercase tracking-[3px] hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]"
                    >
                        {isSaving ? 'Saving...' : 'Update Records'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function EditField({ label, value, onChange, description, example }: { 
    label: string, 
    value: string, 
    onChange: (v: string) => void,
    description: string,
    example: string
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</label>
                <div className="relative group/tip">
                    <Info className="w-3.5 h-3.5 text-white/20 hover:text-[#C3EB7A] cursor-help transition-all" />
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-3 rounded-2xl bg-[#1A1A1B] border border-white/10 shadow-2xl opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all z-10">
                        <p className="text-[9px] text-white/80 leading-relaxed font-bold">{description}</p>
                        <p className="text-[8px] text-[#C3EB7A] mt-2 font-black uppercase tracking-tighter">EG: {example}</p>
                    </div>
                </div>
            </div>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-[#C3EB7A]/50 transition-all"
            />
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

function AuditRow({ date, user, item, outlet, variance, status }: { date: string, user: string, item: string, outlet: string, variance: string, status: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                <History className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-black text-white tracking-tight">{item}</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest leading-none mt-1">{date} • {user} • {outlet}</p>
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
