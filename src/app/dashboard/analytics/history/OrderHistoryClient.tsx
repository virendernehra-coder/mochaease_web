'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Search, Download,
    CheckCircle2, Clock, XCircle,
    MapPin, MoreVertical
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';

export default function OrderHistoryClient() {
    const router = useRouter();
    const { activeContextId } = useUserStore();
    const [searchQuery, setSearchQuery] = useState('');
    
    const contextName = activeContextId === 'business' ? 'Global Business' : 'Selected Outlet';

    const orders = [
        { id: '#ME-8904', date: 'Oct 24, 2024, 02:30 PM', customer: 'Walk-in Customer', items: '2 Items', total: '$24.50', status: 'Completed', type: 'Dine-in' },
        { id: '#ME-8903', date: 'Oct 24, 2024, 02:15 PM', customer: 'Saritha K.', items: '1 Item', total: '$8.20', status: 'Completed', type: 'Delivery (GoFood)' },
        { id: '#ME-8902', date: 'Oct 24, 2024, 01:45 PM', customer: 'Michael R.', items: '4 Items', total: '$56.00', status: 'Pending', type: 'Takeaway' },
        { id: '#ME-8901', date: 'Oct 24, 2024, 01:10 PM', customer: 'Anonymous', items: '2 Items', total: '$18.90', status: 'Cancelled', type: 'Dine-in' },
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
                        <h1 className="text-3xl font-black text-white tracking-tighter">Order <span className="text-white/30">Vault.</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-6 p-2 rounded-[32px] bg-[#0F0F0F]/80 border border-white/5 backdrop-blur-3xl">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Order ID, Customer, or Status..."
                        className="w-full bg-transparent border-none rounded-2xl py-5 pl-16 pr-6 text-sm font-bold text-white focus:outline-none placeholder:text-white/10"
                    />
                </div>
                
                <div className="flex items-center gap-2 pr-4 border-l border-white/5 pl-6">
                    <FilterButton label="Today" active />
                    <FilterButton label="Status" />
                    <FilterButton label="Type" />
                </div>
            </div>

            {/* Table Area */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0F0F0F]/80 border border-white/10 rounded-[32px] overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/[0.02] text-left">
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Order ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Timestamp</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Payload</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Value</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-white/20 uppercase tracking-[2px] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order, i) => (
                                <motion.tr 
                                    key={order.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 rounded-full bg-[#C3EB7A]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="text-sm font-black text-white">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[11px] font-bold">{order.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="text-xs font-black text-white">{order.customer}</p>
                                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{order.type}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-white/40">{order.items}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-[#C3EB7A]">{order.total}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 rounded-xl text-white/10 hover:text-white hover:bg-white/5 transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Showing 4 of 1,240 records</p>
                    <div className="flex items-center gap-2">
                         <PaginationButton label="Prev" />
                         <PaginationButton label="Next" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isCompleted = status === 'Completed';
    const isPending = status === 'Pending';
    
    return (
        <span className={`flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
            isCompleted ? 'bg-[#C3EB7A]/10 text-[#C3EB7A] border-[#C3EB7A]/20' : 
            isPending ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
            'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
            {isCompleted ? <CheckCircle2 className="w-2.5 h-2.5" /> : 
             isPending ? <Clock className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
            {status}
        </span>
    );
}

function FilterButton({ label, active = false }: { label: string, active?: boolean }) {
    return (
        <button className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
            active ? 'bg-[#C3EB7A] text-black border-[#C3EB7A]' : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10'
        }`}>
            {label}
        </button>
    );
}

function PaginationButton({ label }: { label: string }) {
    return (
        <button className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
            {label}
        </button>
    );
}
