'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tag, Plus, Search, Calendar,
    Percent, Gift, DollarSign, Check, AlertCircle, ShoppingBag,
    X, Trash2, Edit3, Power
} from 'lucide-react';
import Image from 'next/image';
import { useUserStore } from '@/store/user-store';
import { createClient } from '@/utils/supabase/client';
import { createPortal } from 'react-dom';

interface Offer {
    id: number;
    promo_name: string;
    promo_code?: string;
    start_date: string;
    end_date?: string;
    discount_type: 'percentage' | 'flat' | 'bogo';
    discount_value?: number;
    bogo_buy_qty?: number;
    bogo_get_qty?: number;
    min_order_amount: number;
    applicable_product_ids: number[];
    status: boolean;
    outlet_id?: string;
}

interface Product {
    id: number;
    product_name: string;
    product_price: number;
    product_image?: string;
}

export default function OffersClient() {
    const { activeContextId, user } = useUserStore();
    const isGlobal = activeContextId === 'business';

    // Simple context name resolution
    const contextName = isGlobal ? 'Global Business' : 'Selected Outlet';

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [outlets, setOutlets] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        promo_name: '',
        promo_code: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        discount_type: 'percentage' as 'percentage' | 'flat' | 'bogo',
        discount_value: '',
        bogo_buy_qty: '',
        bogo_get_qty: '',
        min_order_amount: '0',
        applicable_product_ids: [] as number[],
        status: true
    });

    const supabase = createClient();

    const filteredProducts = products.filter(p =>
        (p.product_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = () => {
        if (formData.applicable_product_ids.length === products.length) {
            setFormData(prev => ({ ...prev, applicable_product_ids: [] }));
        } else {
            setFormData(prev => ({
                ...prev,
                applicable_product_ids: products.map(p => p.id)
            }));
        }
    };
    const fetchData = React.useCallback(async () => {
        if (!user?.business_id) return;
        setLoading(true);
        try {
            // Fetch Offers
            let offersQuery = supabase.from('business_offers').select('*').order('created_at', { ascending: false });
            if (isGlobal) {
                offersQuery = offersQuery.eq('business_id', user.business_id);
            } else {
                offersQuery = offersQuery.eq('outlet_id', activeContextId);
            }
            const { data: offersData } = await offersQuery;
            setOffers(offersData || []);

            // Fetch Products
            let productsQuery = supabase.from('add_new_products').select('*');
            if (isGlobal) {
                productsQuery = productsQuery.eq('business_id', user.business_id);
            } else {
                productsQuery = productsQuery.eq('outlet_id', activeContextId);
            }
            const { data: productsData } = await productsQuery;
            setProducts(productsData || []);

            // Fetch Outlets for naming
            const { data: outletsData } = await supabase
                .from('business_details')
                .select('outlet_id, outlet_name')
                .eq('business_id', user.business_id);
            setOutlets(outletsData || []);

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    }, [activeContextId, isGlobal, supabase, user?.business_id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const currentOutletName = isGlobal
        ? 'Global Business'
        : outlets.find(o => o.outlet_id === activeContextId)?.outlet_name || 'Selected Outlet';

    const handleCreateOffer = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/create-offer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    business_id: user?.business_id, // Always send the master business ID
                    outlet_id: isGlobal ? null : activeContextId, // Send outlet ID if not global
                    outlet_name: currentOutletName,
                    discount_value: formData.discount_value ? parseFloat(formData.discount_value) : null,
                    min_order_amount: parseFloat(formData.min_order_amount),
                    bogo_buy_qty: formData.bogo_buy_qty ? parseInt(formData.bogo_buy_qty) : null,
                    bogo_get_qty: formData.bogo_get_qty ? parseInt(formData.bogo_get_qty) : null,
                    applicable_product_ids: formData.applicable_product_ids
                })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            setIsWizardOpen(false);
            setStep(1);
            fetchData();
            setFormData({
                promo_name: '',
                promo_code: '',
                start_date: new Date().toISOString().split('T')[0],
                end_date: '',
                discount_type: 'percentage',
                discount_value: '',
                bogo_buy_qty: '',
                bogo_get_qty: '',
                min_order_amount: '0',
                applicable_product_ids: [],
                status: true
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleProductSelection = (productId: number) => {
        setFormData(prev => ({
            ...prev,
            applicable_product_ids: prev.applicable_product_ids.includes(productId)
                ? prev.applicable_product_ids.filter(id => id !== productId)
                : [...prev.applicable_product_ids, productId]
        }));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20">
                            <Tag className="w-5 h-5 text-[#C3EB7A]" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter">OFFERS & PROMOS</h1>
                    </div>
                    <p className="text-white/40 text-sm font-medium">
                        Manage discounts for <span className="text-[#C3EB7A]">@{currentOutletName}</span>
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsWizardOpen(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#C3EB7A] text-black rounded-2xl font-black text-sm shadow-[0_0_30px_rgba(195,235,122,0.3)]"
                >
                    <Plus className="w-4 h-4" />
                    CREATE NEW OFFER
                </motion.button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Active Promotions', value: offers.filter(o => o.status).length, icon: Power, color: '#C3EB7A' },
                    { label: 'Total Offers', value: offers.length, icon: Tag, color: '#4A90E2' },
                    { label: 'Products Targeted', value: products.filter(p => offers.some(o => o.applicable_product_ids?.includes(p.id))).length, icon: ShoppingBag, color: '#F59E0B' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden group">
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1">{stat.label}</p>
                                <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                ))}
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
                        ))
                    ) : offers.length === 0 ? (
                        <div className="lg:col-span-2 p-20 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center text-center">
                            <Tag className="w-12 h-12 text-white/10 mb-4" />
                            <h3 className="text-xl font-bold mb-2">No promotions found</h3>
                            <p className="text-white/40 max-w-sm mb-8">Start by creating your first discount offer to boost your sales.</p>
                            <button
                                onClick={() => setIsWizardOpen(true)}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-black text-xs transition-all"
                            >
                                START BUILDING
                            </button>
                        </div>
                    ) : (
                        offers.map((offer) => (
                            <motion.div
                                key={offer.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-[#C3EB7A]/30 transition-all group relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${offer.status ? 'bg-[#C3EB7A]/20 text-[#C3EB7A]' : 'bg-white/10 text-white/30'
                                                }`}>
                                                {offer.status ? 'Active' : 'Paused'}
                                            </span>
                                            <span className="text-white/20 text-[10px] font-black tracking-widest uppercase">
                                                ID: {offer.id}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-[#C3EB7A] transition-colors uppercase">
                                            {offer.promo_name}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-xs font-bold text-white/40 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(offer.start_date).toLocaleDateString()} - {offer.end_date ? new Date(offer.end_date).toLocaleDateString() : 'Forever'}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                Min: ${offer.min_order_amount}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        {offer.discount_type === 'percentage' && (
                                            <div className="text-4xl font-black text-[#C3EB7A] leading-none mb-1">
                                                {offer.discount_value}%<br />
                                                <span className="text-[10px] uppercase tracking-[3px] text-white/40">OFF</span>
                                            </div>
                                        )}
                                        {offer.discount_type === 'flat' && (
                                            <div className="text-4xl font-black text-[#4A90E2] leading-none mb-1">
                                                ${offer.discount_value}<br />
                                                <span className="text-[10px] uppercase tracking-[3px] text-white/40">OFF</span>
                                            </div>
                                        )}
                                        {offer.discount_type === 'bogo' && (
                                            <div className="text-4xl font-black text-[#F59E0B] leading-none mb-1">
                                                BOGO<br />
                                                <span className="text-[10px] uppercase tracking-[3px] text-white/40">BUY {offer.bogo_buy_qty} GET {offer.bogo_get_qty}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                    <div className="flex -space-x-2">
                                        {offer.applicable_product_ids?.length > 0 ? (
                                            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/60">
                                                {offer.applicable_product_ids.length} PRODUCTS SELECTED
                                            </div>
                                        ) : (
                                            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/30">
                                                STORE-WIDE OFFER
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <Edit3 className="w-4 h-4 text-white/60" />
                                        </button>
                                        <button className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-colors">
                                            <Trash2 className="w-4 h-4 text-red-500/60" />
                                        </button>
                                    </div>
                                </div>

                                {/* Abstract background patterns */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-[#C3EB7A]/10 transition-colors" />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Wizard Modal */}
            {mounted && isWizardOpen && createPortal(
                <AnimatePresence mode="wait">
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsWizardOpen(false)}
                            className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl z-0"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-10 max-h-[95vh] flex flex-col my-auto"
                        >
                            {/* Wizard Progress */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 flex gap-1 flex-shrink-0">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`flex-1 transition-all duration-500 ${step >= i ? 'bg-[#C3EB7A]' : 'bg-transparent'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setIsWizardOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/30 hover:text-white transition-all z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 pt-14">
                                <AnimatePresence mode="wait">

                                    {/* Step 1: Identity */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <h2 className="text-3xl font-black tracking-tighter mb-2">OFFER IDENTITY</h2>
                                                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Step 1 of 3: Name & Duration</p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Promotion Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Summer Weekend Sale"
                                                        value={formData.promo_name}
                                                        onChange={e => setFormData({ ...formData, promo_name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-[#C3EB7A]/50 outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Promo Code (Optional)</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. SUMMER50"
                                                        value={formData.promo_code}
                                                        onChange={e => setFormData({ ...formData, promo_code: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-[#C3EB7A]/50 outline-none transition-all uppercase"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Start Date</label>
                                                        <input
                                                            type="date"
                                                            value={formData.start_date}
                                                            onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-[#C3EB7A]/50 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">End Date</label>
                                                        <input
                                                            type="date"
                                                            value={formData.end_date}
                                                            onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-[#C3EB7A]/50 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)}
                                                disabled={!formData.promo_name}
                                                className="w-full py-5 bg-white text-black rounded-3xl font-black text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30"
                                            >
                                                Next: Define Logic
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Logic */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <h2 className="text-3xl font-black tracking-tighter mb-2">OFFER LOGIC</h2>
                                                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Step 2 of 3: Type & Value</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                {[
                                                    { id: 'percentage', label: 'PERCENT', icon: Percent },
                                                    { id: 'flat', label: 'FLAT OFF', icon: DollarSign },
                                                    { id: 'bogo', label: 'BOGO', icon: Gift },
                                                ].map(type => (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => setFormData({ ...formData, discount_type: type.id as any })}
                                                        className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${formData.discount_type === type.id
                                                                ? 'bg-[#C3EB7A]/10 border-[#C3EB7A] text-[#C3EB7A]'
                                                                : 'bg-white/5 border-white/10 text-white/20 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <type.icon className="w-8 h-8" />
                                                        <span className="text-[10px] font-black tracking-widest">{type.label}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-6">
                                                {formData.discount_type !== 'bogo' ? (
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">
                                                            {formData.discount_type === 'percentage' ? 'Percentage Value (%)' : 'Flat Amount ($)'}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            value={formData.discount_value}
                                                            onChange={e => setFormData({ ...formData, discount_value: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-3xl font-black focus:border-[#C3EB7A]/50 outline-none transition-all text-center"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Buy Quantity</label>
                                                            <input
                                                                type="number"
                                                                value={formData.bogo_buy_qty}
                                                                onChange={e => setFormData({ ...formData, bogo_buy_qty: e.target.value })}
                                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl font-black outline-none"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Get Quantity</label>
                                                            <input
                                                                type="number"
                                                                value={formData.bogo_get_qty}
                                                                onChange={e => setFormData({ ...formData, bogo_get_qty: e.target.value })}
                                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl font-black outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-4">Minimum Order Amount</label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                        <input
                                                            type="number"
                                                            value={formData.min_order_amount}
                                                            onChange={e => setFormData({ ...formData, min_order_amount: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="flex-1 py-5 bg-white/5 text-white rounded-3xl font-black text-sm tracking-widest uppercase"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={() => setStep(3)}
                                                    className="flex-[2] py-5 bg-white text-black rounded-3xl font-black text-sm tracking-widest uppercase"
                                                >
                                                    Next: Select Products
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Targeted Products */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <h2 className="text-3xl font-black tracking-tighter mb-2">TARGETING</h2>
                                                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Step 3 of 3: Select Products</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[#C3EB7A] font-black text-sm">{formData.applicable_product_ids.length}</span>
                                                    <span className="text-white/20 font-black text-[10px] ml-1 uppercase">Selected</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        placeholder="SEARCH PRODUCTS..."
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black tracking-widest outline-none transition-all flex-1"
                                                    />
                                                </div>

                                                <div className="h-64 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                                    {products.length === 0 ? (
                                                        <div className="text-center py-10 text-white/20 font-bold text-xs">No products found in this context.</div>
                                                    ) : filteredProducts.length === 0 ? (
                                                        <div className="text-center py-10 text-white/20 font-bold text-xs">No products match &quot;{searchTerm}&quot;</div>
                                                    ) : (
                                                        filteredProducts.map(product => (
                                                            <div
                                                                key={product.id}
                                                                onClick={() => toggleProductSelection(product.id.toString())}
                                                                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${formData.applicable_product_ids.includes(product.id.toString())
                                                                        ? 'bg-[#C3EB7A]/10 border-[#C3EB7A]/30'
                                                                        : 'bg-white/5 border-transparent hover:border-white/10'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden relative">
                                                                        {product.product_image ? (
                                                                            <Image
                                                                                src={product.product_image}
                                                                                alt={product.product_name}
                                                                                fill
                                                                                className="object-cover"
                                                                            />
                                                                        ) : (
                                                                            <ShoppingBag className="w-4 h-4 text-white/20" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-black">{product.product_name}</p>
                                                                        <p className="text-[10px] text-white/30 font-bold uppercase">${product.product_price}</p>
                                                                    </div>
                                                                </div>
                                                                {formData.applicable_product_ids.includes(product.id.toString()) && (
                                                                    <div className="w-6 h-6 rounded-full bg-[#C3EB7A] flex items-center justify-center">
                                                                        <Check className="w-4 h-4 text-black" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                                <button
                                                    onClick={handleSelectAll}
                                                    className="w-full text-center text-[10px] font-black text-[#C3EB7A] hover:text-white uppercase tracking-widest transition-colors"
                                                >
                                                    {formData.applicable_product_ids.length === products.length ? 'Clear All Selection' : 'Select All Available Products'}
                                                </button>
                                            </div>

                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500"
                                                >
                                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                                    <p className="text-xs font-bold leading-tight">{error}</p>
                                                </motion.div>
                                            )}

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="flex-1 py-5 bg-white/5 text-white rounded-3xl font-black text-sm tracking-widest uppercase"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={handleCreateOffer}
                                                    disabled={isSubmitting}
                                                    className="flex-[2] py-5 bg-[#C3EB7A] text-black rounded-3xl font-black text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(195,235,122,0.4)] transition-all"
                                                >
                                                    {isSubmitting ? 'GENERATING...' : 'PUBLISH OFFER'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
