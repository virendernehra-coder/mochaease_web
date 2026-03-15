'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, Boxes, AlertTriangle, ArrowUpRight, 
    Search, Filter, Plus, MoreHorizontal,
    TrendingDown, BarChart3, Clock, MapPin, LayoutGrid,
    X, TrendingUp, History, Info, Activity,
    Building2, User, Save, FileText, Check, ChevronLeft
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useBusinessStore } from '@/store/business-store';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, formatCompactCurrency } from '@/utils/format';
import { getInventoryStock, getBusinessOutlets } from '@/utils/supabase/queries-client';
import { type InventoryStock } from '@/utils/supabase/queries';
import jsPDF from 'jspdf';

export default function InventoryClient() {
    const { user, businessConfig } = useUserStore();
    const { activeContextId } = useBusinessStore();
    const currency = businessConfig?.currency || 'USD';
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
    const [selectedItem, setSelectedItem] = React.useState<InventoryStock | null>(null);
    const [isWizardOpen, setIsWizardOpen] = React.useState(false);
    const [poCart, setPoCart] = React.useState<InventoryStock[]>([]);
    const [pageSize, setPageSize] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    const isGlobal = activeContextId === 'business';
    const businessId = user?.business_id;
    const outletId = isGlobal ? null : activeContextId;
    const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

    // Fetch Inventory Data
    const { data: inventory = [], isLoading } = useQuery({
        queryKey: ['inventory-stock', businessId, activeContextId],
        queryFn: () => getInventoryStock(businessId!, activeContextId === 'business' ? null : activeContextId),
        enabled: !!businessId,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    // CSV Export Logics
    const handleExportCSV = (dataToExport: InventoryStock[], filename: string) => {
        if (dataToExport.length === 0) return;

        const headers = [
            "Item Name", "SKU", "Category", "Current Stock", 
            "Unit Of Measure", "Stock Value", "Stock Status", 
            "Days Until Stockout", "Daily Consumption"
        ];

        const csvRows = dataToExport.map(item => [
            `"${(item.item_name || 'Unknown').replace(/"/g, '""')}"`,
            `"${(item.sku || 'N/A').replace(/"/g, '""')}"`,
            `"${(item.suggested_category || 'Uncategorized').replace(/"/g, '""')}"`,
            item.current_stock || 0,
            `"${(item.base_unit_of_measure || '').replace(/"/g, '""')}"`,
            item.stock_value || 0,
            `"${(item.stock_status || '').replace(/"/g, '""')}"`,
            item.days_until_stockout || 0,
            item.daily_consumption_rate || 0
        ]);

        const csvContent = "\uFEFF" + [headers.join(","), ...csvRows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.setAttribute("download", `${filename}_${timestamp}.csv`);
        link.click();
        
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
    };

    // Derived Metrics
    const metrics = React.useMemo(() => {
        const totalValue = inventory.reduce((sum, item) => sum + Number(item?.stock_value || 0), 0);
        const lowStock = inventory.filter(item => item?.stock_health_color === 'RED').length;
        const totalCategories = new Set(inventory.map(item => item?.suggested_category || 'Uncategorized')).size;
        
        return {
            totalSkus: inventory.length,
            stockValue: totalValue,
            lowStockCount: lowStock,
            categoriesCount: totalCategories
        };
    }, [inventory]);

    const categories = React.useMemo(() => {
        return Array.from(new Set(inventory.map(item => item?.suggested_category || 'Uncategorized'))).sort();
    }, [inventory]);

    const filteredInventory = React.useMemo(() => {
        return inventory.filter(item => {
            const matchesSearch = (item?.item_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                                (item?.sku || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !selectedStatus || item?.stock_health_color === selectedStatus;
            return matchesSearch && matchesStatus;
        });
    }, [inventory, searchQuery, selectedStatus]);

    const totalPages = Math.ceil(filteredInventory.length / pageSize);
    const paginatedInventory = React.useMemo(() => {
        return filteredInventory.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );
    }, [filteredInventory, currentPage, pageSize]);

    const criticalItems = React.useMemo(() => {
        return inventory
            .filter(item => item?.stock_health_color === 'RED')
            .sort((a, b) => Number(a?.days_until_stockout || 0) - Number(b?.days_until_stockout || 0));
    }, [inventory]);


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
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
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
                <KPICard title="Stock Value" value={formatCurrency(metrics.stockValue, currency)} sub="Current asset value" trend="Market" icon={<BarChart3 className="w-5 h-5" />} color="emerald" />
                <KPICard title="Critical items" value={metrics.lowStockCount.toString()} sub="High stockout risk" trend="Alert" icon={<AlertTriangle className="w-5 h-5" />} color="red" />
                <KPICard title="Categories" value={metrics.categoriesCount.toString()} sub="Active sectors" trend="Diverse" icon={<LayoutGrid className="w-5 h-5" />} color="purple" />
            </div>

            {/* List & Detailed View */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Critical Alerts */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group flex flex-col">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-red-500" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h3 className="text-xl font-black text-white">Stock Alerts</h3>
                        {criticalItems.length > 0 && (
                            <button 
                                onClick={() => handleExportCSV(criticalItems, 'urgent_stock_alerts')}
                                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all group/dl"
                            >
                                <TrendingDown className="w-4 h-4 transition-transform group-hover/dl:scale-110" />
                            </button>
                        )}
                    </div>
                    
                    <div className="space-y-6 flex-1">
                        {criticalItems.slice(0, 5).length > 0 ? (
                            criticalItems.slice(0, 5).map(item => (
                                <AlertItem 
                                    key={item.inventory_id}
                                    title={item.item_name || 'Unknown Item'} 
                                    stock={`${item.current_stock || 0}${item.base_unit_of_measure || ''}`} 
                                    status={`${item.days_until_stockout || 0}d remain`} 
                                    color="text-red-400" 
                                />
                            ))
                        ) : (
                            <div className="py-8 text-center text-white/20 italic text-xs">No critical inventory alerts in this sector.</div>
                        )}
                    </div>

                    <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="w-full mt-12 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[3px] hover:bg-red-500/20 transition-all relative z-10"
                    >
                        Generate Optimized Order
                    </button>
                </div>

                {/* SKU Tracker */}
                <div className="xl:col-span-2 space-y-10">
                    <div className="space-y-8">
                        <div className="flex flex-row items-center justify-between gap-4">
                            <h3 className="text-2xl font-black text-white tracking-tight">Active SKU Movements</h3>
                            <div className="flex items-center gap-3">
                                {poCart.length > 0 && (
                                    <button 
                                        onClick={() => setIsWizardOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-black text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        Cart ({poCart.length})
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleExportCSV(filteredInventory, 'inventory_full_list')}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                                >
                                    <TrendingDown className="w-3.5 h-3.5 rotate-180" />
                                    Export Full
                                </button>
                                <div className="md:hidden">
                                    <button 
                                        onClick={() => handleExportCSV(filteredInventory, 'inventory_full_list')}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
                                    >
                                        <TrendingDown className="w-4 h-4 rotate-180" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
                            <button 
                                onClick={() => {
                                    setSelectedStatus(null);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!selectedStatus ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                            >
                                All Status
                            </button>
                            {[
                                { key: 'RED', label: 'Critical', color: 'bg-red-500/10 text-red-400' },
                                { key: 'YELLOW', label: 'Warning', color: 'bg-amber-500/10 text-amber-400' },
                                { key: 'GREEN', label: 'Healthy', color: 'bg-emerald-500/10 text-emerald-400' }
                            ].map(status => (
                                <button 
                                    key={status.key}
                                    onClick={() => {
                                        setSelectedStatus(selectedStatus === status.key ? null : status.key);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedStatus === status.key ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {paginatedInventory.length > 0 ? (
                            paginatedInventory.map(item => (
                                <SKURow 
                                    key={item.inventory_id}
                                    name={item.item_name || 'Unknown Item'} 
                                    sku={item.sku || 'N/A'} 
                                    stock={`${item.current_stock || 0} ${item.base_unit_of_measure || ''}`} 
                                    usage={(item.business_impact_level || 'LOW').split('_')[0]} 
                                    trend={`${item.days_until_stockout || 0} Days`}
                                    healthColor={item.stock_health_color || 'GREEN'}
                                    unitCost={Number(item.unit_cost)}
                                    stockValue={Number(item.stock_value)}
                                    currency={currency}
                                    onViewDetails={() => setSelectedItem(item)}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest text-xs">
                                No items found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {filteredInventory.length > 0 && (
                        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Show</span>
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                        {PAGE_SIZE_OPTIONS.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => {
                                                    setPageSize(size);
                                                    setCurrentPage(1);
                                                }}
                                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black transition-all ${pageSize === size ? 'bg-amber-500 text-black' : 'text-white/40 hover:text-white'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                    {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, filteredInventory.length)} of {filteredInventory.length}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white disabled:opacity-30 transition-all font-black text-[9px] uppercase tracking-widest"
                                >
                                    Prev
                                </button>
                                <div className="flex items-center gap-1.5">
                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) return null;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-8 h-8 rounded-lg text-[9px] font-black transition-all ${currentPage === page ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-white/20 hover:text-white'}`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all font-black text-[9px] uppercase tracking-widest"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <AnimatePresence>
                {selectedItem && (
                    <SKUDetailsModal 
                        item={selectedItem} 
                        onClose={() => setSelectedItem(null)} 
                        onAddToCart={(item) => {
                            setPoCart(prev => {
                                if (prev.some(i => i.inventory_id === item.inventory_id)) return prev;
                                return [...prev, item];
                            });
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isWizardOpen && (
                    <PurchaseOrderWizard 
                        defaultItems={poCart.length > 0 ? poCart : criticalItems}
                        onClose={() => setIsWizardOpen(false)}
                        onClearCart={() => setPoCart([])}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}

function PurchaseOrderWizard({ defaultItems, onClose, onClearCart }: { defaultItems: InventoryStock[], onClose: () => void, onClearCart: () => void }) {
    const { user, businessConfig } = useUserStore();
    const userName = user ? `${user.first_name} ${user.last_name}` : 'MochaEase User';
    const { activeContextId } = useBusinessStore();
    const currency = businessConfig?.currency || 'USD';
    const [step, setStep] = React.useState(1);
    const [selectedOutletId, setSelectedOutletId] = React.useState<string | null>(activeContextId === 'business' ? null : activeContextId);
    const [outlets, setOutlets] = React.useState<any[]>([]);
    const [loadingOutlets, setLoadingOutlets] = React.useState(false);
    const [orderLines, setOrderLines] = React.useState<any[]>(defaultItems.map(item => ({
        ...item,
        orderQty: Number(item.suggested_reorder_quantity) || 10,
        approved: true
    })));

    React.useEffect(() => {
        if (user?.business_id) {
            setLoadingOutlets(true);
            getBusinessOutlets(user.business_id)
                .then(setOutlets)
                .finally(() => setLoadingOutlets(false));
        }
    }, [user?.business_id]);

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const selectedOutlet = outlets.find(o => o.id === selectedOutletId || o.business_id === selectedOutletId);
        
        // --- PDF Generation Logic ---
        doc.setFontSize(24);
        doc.text("PURCHASE ORDER", 105, 25, { align: "center" });
        
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Ref: ${new Date().getTime()}`, 190, 15, { align: "right" });

        // Left Column: Business Details
        doc.setTextColor(60);
        doc.setFontSize(10);
        doc.text("FROM:", 20, 50);
        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(user?.business_name || "MochaEase Partner", 20, 58);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Contact: ${userName}`, 20, 65);
        if (selectedOutlet?.address) {
            doc.text(selectedOutlet.address, 20, 72, { maxWidth: 80 });
        }

        // Right Column: Summary
        doc.setTextColor(60);
        doc.text("ORDER SUMMARY:", 120, 50);
        doc.setTextColor(0);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, 58);
        doc.text(`Status: OPTIMIZED`, 120, 65);
        doc.text(`Items: ${orderLines.filter(l => l.approved).length}`, 120, 72);

        // Header Table
        doc.setFillColor(30, 30, 30);
        doc.rect(20, 95, 170, 10, 'F');
        doc.setTextColor(255);
        doc.setFontSize(9);
        doc.text("ITEM DESCRIPTION", 25, 101);
        doc.text("SKU", 100, 101);
        doc.text("QTY", 150, 101);
        doc.text("UNIT", 175, 101);

        // Lines
        let y = 115;
        doc.setTextColor(0);
        orderLines.filter(l => l.approved).forEach((line, i) => {
            if (i % 2 === 0) {
                doc.setFillColor(248, 248, 248);
                doc.rect(20, y - 6, 170, 10, 'F');
            }
            doc.text(line.item_name || 'Unknown', 25, y);
            doc.text(line.sku || 'N/A', 100, y);
            doc.text(line.orderQty.toString(), 150, y);
            doc.text(line.base_unit_of_measure || 'units', 175, y);
            y += 10;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Generated via MochaEase Intelligence Vault", 105, 285, { align: "center" });

        doc.save(`PurchaseOrder_${new Date().toISOString().split('T')[0]}.pdf`);
        onClearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
            
            <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="relative w-full max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Order Optimizer</h2>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">Step {step} of 3</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                <h4 className="text-sm font-black text-white mb-6 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-red-500" />
                                    Review Business Context
                                </h4>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Requester</p>
                                        <p className="text-sm font-bold text-white">{userName}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Business</p>
                                        <p className="text-sm font-bold text-white">{user?.business_name || 'MochaEase Partner'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[3px] mb-2">Primary Destination (Optional Selection)</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {loadingOutlets ? (
                                        <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                                    ) : (
                                        outlets.map(outlet => (
                                            <button 
                                                key={outlet.id}
                                                onClick={() => setSelectedOutletId(outlet.id)}
                                                className={`p-4 rounded-[24px] border transition-all text-left flex items-center justify-between ${selectedOutletId === outlet.id ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2.5 rounded-xl ${selectedOutletId === outlet.id ? 'bg-red-500 text-black' : 'bg-white/5 text-white/40'}`}>
                                                        <MapPin className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-white">{outlet.name}</p>
                                                        <p className="text-[10px] font-bold text-white/20 truncate max-w-[200px]">{outlet.address || 'Global Distribution Hub'}</p>
                                                    </div>
                                                </div>
                                                {selectedOutletId === outlet.id && <Check className="w-5 h-5 text-red-400" />}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[3px]">Line Item Review</h4>
                            <div className="space-y-3">
                                {orderLines.map((line, idx) => (
                                    <div key={idx} className="p-4 rounded-[28px] bg-white/[0.02] border border-white/5 flex items-center gap-6">
                                        <button 
                                            onClick={() => {
                                                const newLines = [...orderLines];
                                                newLines[idx].approved = !newLines[idx].approved;
                                                setOrderLines(newLines);
                                            }}
                                            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${line.approved ? 'bg-red-500 border-red-400 text-black' : 'bg-white/5 border-white/10 text-transparent'}`}
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <div className="flex-1">
                                            <p className="text-xs font-black text-white">{line.item_name}</p>
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">SKU: {line.sku}</p>
                                        </div>
                                        <div className="text-right flex items-center gap-3">
                                            <div className="flex flex-col items-end">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Quantity</p>
                                                <input 
                                                    type="number"
                                                    value={line.orderQty}
                                                    onChange={(e) => {
                                                        const newLines = [...orderLines];
                                                        newLines[idx].orderQty = Number(e.target.value);
                                                        setOrderLines(newLines);
                                                    }}
                                                    className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-black text-white text-right focus:border-red-500/50 focus:outline-none"
                                                />
                                            </div>
                                            <p className="text-[9px] font-black text-white/20 uppercase pt-4">{line.base_unit_of_measure}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                            <div className="w-24 h-24 rounded-[32px] bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                                <Save className="w-12 h-12 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Purchase Order Ready.</h3>
                            <p className="text-white/40 text-sm max-w-md font-medium">
                                We've generated a professional P.O. document with <strong>{orderLines.filter(l => l.approved).length} line items</strong>. Review finalized data and export as PDF.
                            </p>
                            
                            <div className="w-full max-w-md p-6 rounded-3xl bg-white/[0.02] border border-white/5 mt-8 text-left">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-white/20 uppercase italic">Preview Summary</span>
                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">PO-LITE-PRO</span>
                                </div>
                                <div className="space-y-3">
                                    {orderLines.filter(l => l.approved).slice(0, 3).map((l, i) => (
                                        <div key={i} className="flex justify-between text-xs font-bold text-white/60">
                                            <span>{l.item_name} × {l.orderQty}</span>
                                            <span className="text-white/20">{l.base_unit_of_measure}</span>
                                        </div>
                                    ))}
                                    {orderLines.filter(l => l.approved).length > 3 && (
                                        <p className="text-[9px] font-black text-white/20 uppercase pt-2">+ {orderLines.filter(l => l.approved).length - 3} additional items</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-white/5 bg-black/40 flex items-center justify-between">
                    <button 
                        onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
                        className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[2px] hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {step === 1 ? 'Cancel' : 'Back'}
                    </button>
                    
                    <button 
                        onClick={() => step < 3 ? setStep(s => s + 1) : handleGeneratePDF()}
                        className="px-10 py-4 rounded-2xl bg-red-500 text-black text-[11px] font-black uppercase tracking-[2px] hover:bg-red-600 transition-all shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                    >
                        {step === 3 ? 'Download P.O. PDF' : 'Continue to Next Step'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

function KPICard({ title, value, sub, trend, icon, color }: { title: string, value: string, sub: string, trend: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="p-6 sm:p-8 lg:px-7 lg:py-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative group overflow-hidden flex flex-col justify-between min-h-[160px] md:min-h-auto">
            <div className={`absolute top-0 right-0 p-6 sm:px-6 sm:py-8 opacity-20 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`w-10 h-10 md:w-16 md:h-16 text-${color}-500/80`}>{icon}</div>
            </div>
            <div>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1.5">{title}</p>
                <h4 className="text-xl sm:text-2xl md:text-[clamp(1.1rem,2.4vw,1.6rem)] font-black text-white mb-1 tracking-tighter leading-tight" title={value}>{value}</h4>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-6">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>{trend}</span>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{sub}</span>
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

function SKURow({ 
    name, sku, stock, usage, trend, healthColor, unitCost, stockValue, currency, onViewDetails 
}: { 
    name: string, sku: string, stock: string, usage: string, trend: string, healthColor: string, 
    unitCost: number, stockValue: number, currency: string, onViewDetails: () => void 
}) {
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
            <div className="hidden lg:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Value / Cost</p>
                <p className="text-[10px] font-black text-white">{formatCurrency(stockValue, currency)}</p>
                <p className="text-[8px] font-bold text-white/20">{formatCurrency(unitCost, currency)} / unit</p>
            </div>
            <div className="hidden lg:block text-right w-16">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <p className={`text-[10px] font-black ${colorMap[healthColor] || 'text-white/20'}`}>{trend}</p>
            </div>
            <button 
                onClick={onViewDetails}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
    );
}

function SKUDetailsModal({ item, onClose, onAddToCart }: { item: InventoryStock, onClose: () => void, onAddToCart: (item: InventoryStock) => void }) {
    const { businessConfig } = useUserStore();
    const currency = businessConfig?.currency || 'USD';
    const sections = [
        {
            title: 'Supply Vitality',
            icon: <TrendingUp className="w-4 h-4" />,
            color: 'blue',
            metrics: [
                { label: 'EOQ', value: item.economic_order_quantity, unit: item.base_unit_of_measure },
                { label: 'Safety Stock', value: item.safety_stock, unit: item.base_unit_of_measure },
                { label: 'Reorder Point', value: item.reorder_point, unit: item.base_unit_of_measure },
                { label: 'Lead Time', value: `${item.lead_time_days} days` },
            ]
        },
        {
            title: 'Consumption Analytics',
            icon: <Activity className="w-4 h-4" />,
            color: 'amber',
            metrics: [
                { label: 'Daily Rate', value: item.daily_consumption_rate, unit: item.base_unit_of_measure },
                { label: '30d Volume', value: item.consumption_30_days, unit: item.base_unit_of_measure },
                { label: 'Avg / Order', value: item.avg_consumption_per_order, unit: item.base_unit_of_measure },
                { label: 'Volatility', value: `${item.consumption_volatility}%` },
            ]
        },
        {
            title: 'Quality & Risk',
            icon: <AlertTriangle className="w-4 h-4" />,
            color: 'red',
            metrics: [
                { label: 'Expiry Date', value: item.expiry_date || 'N/A' },
                { label: 'Loss Value', value: formatCurrency(Number(item.total_loss_value_30_days), currency) },
                { label: 'Disposed', value: item.disposed_quantity, unit: item.base_unit_of_measure },
                { label: 'Stockout Risk', value: item.stockout_risk },
            ]
        },
        {
            title: 'Audit Intelligence',
            icon: <History className="w-4 h-4" />,
            color: 'emerald',
            metrics: [
                { label: 'Last Audit', value: item.last_audit_date || 'N/A' },
                { label: '30d Adjust.', value: item.audit_adjustment_30_days, unit: item.base_unit_of_measure },
                { label: 'Audit Count', value: item.audit_count_30_days },
                { label: 'Needs Review', value: item.needs_review ? 'YES' : 'NO' },
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-8 border-b border-white/5 flex items-start justify-between bg-gradient-to-br from-white/[0.03] to-transparent">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border bg-white/5 border-white/10`}>
                            <Package className="w-8 h-8 text-[#C3EB7A]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-3xl font-black text-white tracking-tighter">{item.item_name}</h2>
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                                    {item.stock_status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-white/30 text-xs font-bold uppercase tracking-widest">
                                <span>SKU: {item.sku}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span>{item.suggested_category}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-xl bg-${section.color}-500/10 border border-${section.color}-500/20 text-${section.color}-400`}>
                                        {section.icon}
                                    </div>
                                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[3px]">{section.title}</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {section.metrics.map((metric, mIdx) => (
                                        <div key={mIdx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1.5">{metric.label}</p>
                                            <p className="text-sm font-black text-white">
                                                {metric.value} <span className="text-[10px] text-white/20 uppercase">{metric.unit}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Extended Description / Logic */}
                    <div className="mt-12 p-8 rounded-[32px] bg-[#C3EB7A]/5 border border-[#C3EB7A]/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Info className="w-12 h-12 text-[#C3EB7A]" />
                        </div>
                        <h4 className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-[3px] mb-4">AI Projections & Strategy</h4>
                        <p className="text-sm text-white/60 leading-relaxed font-medium">
                            {item.stock_status_description}. {item.reorder_timing !== 'NO_ORDER_NEEDED' ? `Supply chain intelligence recommends preparing an order for ${item.suggested_reorder_quantity} ${item.base_unit_of_measure} to maintain optimal service levels.` : `Consumption is currently tracking within safety buffers. No immediate replenishment required.`}
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-white/5 flex items-center justify-between bg-black/20">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Current Stock</p>
                            <p className="text-lg font-black text-white">{item.current_stock} <span className="text-xs text-white/20">{item.base_unit_of_measure}</span></p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/5" />
                        <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Asset Value</p>
                            <p className="text-lg font-black text-[#C3EB7A]">{formatCurrency(Number(item.stock_value), currency)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            Audit SKU
                        </button>
                        <button 
                            onClick={() => {
                                onAddToCart(item);
                                onClose();
                            }}
                            className="px-10 py-4 rounded-2xl bg-amber-500 text-black text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                        >
                            Add to PO Cart
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
