'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Smartphone, Banknote, QrCode,
    MapPin, DollarSign, CreditCard, ArrowLeft,
    PieChart as PieChartIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/store/business-store';

export default function PaymentBreakdownClient() {
    const router = useRouter();
    const { activeContextId } = useBusinessStore();
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    const paymentMethods = [
        { name: 'Credit/Debit Card', amount: '$42,850', share: '48%', icon: CreditCard, color: '#4A90E2' },
        { name: 'QRIS / Digital Pay', amount: '$28,400', share: '32%', icon: QrCode, color: '#C3EB7A' },
        { name: 'Cash Transactions', amount: '$14,200', share: '16%', icon: Banknote, color: '#F59E0B' },
        { name: 'Mobile Wallet', amount: '$3,550', share: '4%', icon: Smartphone, color: '#8B5CF6' },
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
                        <h1 className="text-3xl font-black text-white tracking-tighter">Payment <span className="text-white/30">Dynamics.</span></h1>
                    </div>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C3EB7A] text-black font-black text-xs uppercase tracking-widest hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(195,235,122,0.2)]">
                    <DollarSign className="w-4 h-4" />
                    Payout Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Summary Cards */}
                <div className="space-y-6">
                    {paymentMethods.map((method, i) => (
                        <motion.div 
                            key={method.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-[32px] bg-[#0F0F0F]/80 border border-white/5 backdrop-blur-3xl group cursor-pointer hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:text-white transition-colors">
                                        <method.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-black text-white/60 tracking-tight">{method.name}</h3>
                                        <p className="text-xl font-black text-white">{method.amount}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Share</p>
                                    <p className="text-sm font-black text-[#C3EB7A]">{method.share}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Visual Insights */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] p-10 relative overflow-hidden h-full min-h-[500px]">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <PieChartIcon className="w-48 h-48" />
                        </div>
                        
                        <h3 className="text-xl font-black text-white mb-2">Settlement Distribution</h3>
                        <p className="text-white/30 text-sm font-medium mb-12">Visualizing how your customers prefer to pay.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Animated Donut */}
                            <div className="relative aspect-square flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                                    <motion.circle 
                                        cx="50" cy="50" r="40" 
                                        fill="transparent" 
                                        stroke="#C3EB7A;" 
                                        strokeWidth="12" 
                                        strokeDasharray="251.2"
                                        initial={{ strokeDashoffset: 251.2 }}
                                        animate={{ strokeDashoffset: 125.6 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute text-center">
                                    <p className="text-4xl font-black text-white">48%</p>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Card Dominance</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <InsightCard title="Digital Growth" detail="+14.2% Adoption of QRIS over last month." color="text-[#C3EB7A]" />
                                <InsightCard title="Cash Handling" detail="16% decrease in cash handling fees due to digital shifts." color="text-[#4A90E2]" />
                                <InsightCard title="Refund Rate" detail="0.2% - Payment processing stability is optimal." color="text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InsightCard({ title, detail, color }: { title: string, detail: string, color: string }) {
    return (
        <div className="group">
            <h4 className={`text-sm font-black ${color} flex items-center gap-3 uppercase tracking-widest mb-2 transition-all group-hover:gap-4`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                {title}
            </h4>
            <p className="text-xs font-bold text-white/40 leading-relaxed pl-4.5 border-l border-white/5 group-hover:text-white/60 transition-colors">
                {detail}
            </p>
        </div>
    );
}
