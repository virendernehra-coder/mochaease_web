'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    ArrowLeft, Wallet, Plus, Search, 
    Calendar, User, DollarSign, Trash2,
    Filter, Sparkles, MapPin, X, Check, XCircle, AlertCircle
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useThemeStore } from '@/store/theme-store';
import { useFilterStore } from '@/store/filter-store';
import Link from 'next/link';
import { getAdvancePayments, createAdvancePayment, deleteAdvancePayment, getEmployees, updateAdvanceStatus, type AdvancePayment } from '@/utils/supabase/queries-client';
import { type EmployeeDetails } from '@/utils/supabase/queries';
import Portal from '@/components/Portal';
import ConfirmationModal from '@/components/ConfirmationModal';

// Simple toast mock since sonner is not available
const toast = {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(msg)
};

export default function AdvancesClient() {
    const { activeContextId, user, businessConfig } = useUserStore();
    const { primaryColor } = useThemeStore();
    const { selectedRange, activePreset } = useFilterStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? (user?.business_name || 'Global Business') : 
                       (user?.outlet_name || 'Outlet Context');

    const queryClient = useQueryClient();
    const queryContextId = isGlobal ? user?.business_id : activeContextId;
    const startStr = selectedRange.from.toISOString();
    const endStr = selectedRange.to.toISOString();

    const { data: advances = [], isLoading: isLoadingAdvances } = useQuery({
        queryKey: ['advances', queryContextId, isGlobal, startStr, endStr],
        queryFn: () => getAdvancePayments(queryContextId!, isGlobal, startStr, endStr),
        enabled: !!user?.business_id && !!queryContextId,
    });

    const { data: employees = [], isLoading: isLoadingEmployees } = useQuery({
        queryKey: ['employees', queryContextId, isGlobal],
        queryFn: () => getEmployees(queryContextId!, isGlobal),
        enabled: !!user?.business_id && !!queryContextId,
    });

    const isLoading = isLoadingAdvances || isLoadingEmployees;
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null }>({ isOpen: false, id: null });
    const [approvalModal, setApprovalModal] = useState<{ isOpen: boolean; advance: AdvancePayment | null; type: 'approved' | 'rejected' }>({ isOpen: false, advance: null, type: 'approved' });

    // Form state
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [approvalNotes, setApprovalNotes] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [issuedAmount, setIssuedAmount] = useState<number>(0);
    const [issuedEmployee, setIssuedEmployee] = useState<string>('');
    const [authorizationType, setAuthorizationType] = useState<'approved' | 'rejected'>('approved');

    // Mutations
    const invalidateAdvances = () => {
        queryClient.invalidateQueries({ queryKey: ['advances'] });
    };

    const createAdvanceMutation = useMutation({
        mutationFn: createAdvancePayment,
        onSuccess: () => {
            invalidateAdvances();
            setIsAddModalOpen(false);
            setSelectedEmployeeId('');
            setAmount('');
            setShowSuccessModal(true);
        },
        onError: (err) => {
            console.error('Failed to issue advance:', err);
            toast.error('Migration failed: Database rejected disbursement');
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: (vars: { id: number; status: 'approved' | 'rejected'; userId: string; notes?: string }) => 
            updateAdvanceStatus(vars.id, vars.status, vars.userId, vars.notes),
        onSuccess: (_, vars) => {
            invalidateAdvances();
            const employeeName = approvalModal.advance?.employee_name || 'Staff member';
            const amountStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(approvalModal.advance?.advance_payment || 0);
            
            setIssuedAmount(approvalModal.advance?.advance_payment || 0);
            setIssuedEmployee(employeeName);
            setAuthorizationType(vars.status);
            
            setApprovalModal({ isOpen: false, advance: null, type: 'approved' });
            setApprovalNotes('');
            setShowSuccessModal(true);
        },
        onError: () => {
            toast.error('Failed to update status');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAdvancePayment,
        onSuccess: () => {
            invalidateAdvances();
            toast.success('Disbursement voided');
            setDeleteModal({ isOpen: false, id: null });
        },
        onError: () => {
            toast.error('Failed to delete record');
        }
    });

    const isSubmitting = createAdvanceMutation.isPending || updateStatusMutation.isPending || deleteMutation.isPending;


    const filteredAdvances = advances.filter(adv => 
        adv.employee_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalOutstanding = advances.reduce((sum, adv) => sum + (adv.advance_payment || 0), 0);

    const handleIssueAdvance = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployeeId || !amount || parseFloat(amount) <= 0) {
            toast.error('Please select an employee and enter a valid amount');
            return;
        }

        const employee = employees.find(emp => emp.employee_id === selectedEmployeeId);
        if (!employee) return;

        setIssuedAmount(parseFloat(amount));
        setIssuedEmployee(`${employee.first_name} ${employee.last_name}`);

        createAdvanceMutation.mutate({
            employee_id: selectedEmployeeId,
            employee_name: `${employee.first_name} ${employee.last_name}`,
            advance_payment: parseFloat(amount),
            business_id: employee.business_id || user?.business_id || '',
            outlet_id: employee.outlet_id || '',
            outlet_name: employee.outlet_id ? (user?.outlet_name || 'Outlet') : (user?.business_name || 'Global'),
            user_id: user?.id || '',
            status: 'pending'
        });
        setAuthorizationType('approved');
    };

    const handleUpdateStatus = async () => {
        if (!approvalModal.advance || !user?.id) return;
        updateStatusMutation.mutate({
            id: approvalModal.advance.id,
            status: approvalModal.type,
            userId: user.id,
            notes: approvalNotes
        });
    };

    const handleDelete = async () => {
        if (!deleteModal.id) return;
        deleteMutation.mutate(deleteModal.id);
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <Link href="/dashboard/payroll/settings" className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4 hover:text-[#C3EB7A] transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Settings
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Wallet className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Financial Liquidity</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-purple-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Advance <span className="text-white/30">Manager.</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                            type="text" 
                            placeholder="Search employee..."
                            className="pl-11 pr-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-[#C3EB7A]/50 transition-all w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-[#C3EB7A] text-black text-xs font-black uppercase tracking-widest hover:bg-[#A8D45C] transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)] w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4" /> Issue Advance
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                        <h3 className="text-xl font-black text-white mb-6">Overview</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Total Outstanding</p>
                                <p className="text-2xl xl:text-3xl font-black text-[#C3EB7A] tabular-nums leading-none tracking-tighter">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(totalOutstanding)}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Active Requests</p>
                                <p className="text-3xl font-black text-white tabular-nums">{advances.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Moza Insight</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            &quot;Advances represent {advances.length > 0 ? 'active' : '0%'} of your current cycle payroll wealth. Risk levels are {advances.length > 5 ? 'Elevated' : 'Minimal'}.&quot;
                        </p>
                    </div>
                </div>

                {/* List Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-black text-white tracking-tight">Recent Disbursements</h3>
                        <button className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">
                            <Filter className="w-3 h-3" /> Filter Records
                        </button>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-24 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
                            ))
                        ) : filteredAdvances.length === 0 ? (
                            <div className="p-20 rounded-[40px] bg-white/[0.01] border border-dashed border-white/5 flex flex-col items-center justify-center text-center">
                                <div className="p-5 rounded-3xl bg-white/5 mb-6">
                                    <Wallet className="w-10 h-10 text-white/10" />
                                </div>
                                <h4 className="text-lg font-black text-white mb-2">No active advances</h4>
                                <p className="text-xs text-white/20 max-w-xs">Financial history is clear. All employees are currently operating on their standard base cycles.</p>
                            </div>
                        ) : filteredAdvances.map((adv) => (
                            <motion.div 
                                layout
                                key={adv.id} 
                                className="p-4 md:p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                                        <User className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-base md:text-lg font-black text-white tracking-tight truncate">{adv.employee_name}</h4>
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                                            <div className="flex items-center gap-1.5 opacity-40 shrink-0">
                                                <Calendar className="w-3 h-3 text-white" />
                                                <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">{new Date(adv.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
                                            <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-[2px] truncate">{isGlobal ? adv.outlet_name : 'Authorized'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-items-center justify-between md:justify-end gap-6 md:gap-12 text-right">
                                    <div className="flex flex-col items-start md:items-center gap-2 shrink-0">
                                        <div className={`px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                            adv.status === 'approved' ? 'bg-[#C3EB7A]/10 text-[#C3EB7A]' :
                                            adv.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                                            'bg-amber-500/10 text-amber-400'
                                        }`}>
                                            {adv.status === 'pending' && <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />}
                                            {adv.status || 'pending'}
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Disbursement</p>
                                        <p className="text-xl md:text-2xl font-black text-[#C3EB7A] tabular-nums leading-none">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(adv.advance_payment || 0)}
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 shrink-0">
                                        {adv.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => setApprovalModal({ isOpen: true, advance: adv, type: 'approved' })}
                                                    className="p-3 rounded-2xl bg-[#C3EB7A]/5 border border-[#C3EB7A]/10 text-[#C3EB7A]/20 hover:text-[#C3EB7A] hover:bg-[#C3EB7A]/10 transition-all outline-none"
                                                    title="Approve"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => setApprovalModal({ isOpen: true, advance: adv, type: 'rejected' })}
                                                    className="p-3 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all outline-none"
                                                    title="Reject"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                        <button 
                                            onClick={() => setDeleteModal({ isOpen: true, id: adv.id })}
                                            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all outline-none"
                                            title="Void Record"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Approval Notes Modal */}
            <Portal>
                <AnimatePresence>
                    {approvalModal.isOpen && (
                        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setApprovalModal({ isOpen: false, advance: null, type: 'approved' })}
                                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-[92%] sm:max-w-md bg-[#0A0A0A] border border-white/10 rounded-[40px] p-6 sm:p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setApprovalModal({ isOpen: false, advance: null, type: 'approved' })}
                                    className="absolute top-8 right-8 p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 ${
                                        approvalModal.type === 'approved' ? 'bg-[#C3EB7A]/10 text-[#C3EB7A]' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {approvalModal.type === 'approved' ? <Check className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase">
                                        {approvalModal.type === 'approved' ? 'Authorize' : 'Reject'} Advance
                                    </h3>
                                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2">
                                        {approvalModal.advance?.employee_name} • {new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(approvalModal.advance?.advance_payment || 0)}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Internal Notes (Optional)</label>
                                        <textarea 
                                            value={approvalNotes}
                                            onChange={(e) => setApprovalNotes(e.target.value)}
                                            placeholder="Specify reason for decision..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white outline-none focus:border-[#C3EB7A]/50 transition-all font-medium h-32 resize-none"
                                        />
                                    </div>
                                    
                                    <button 
                                        onClick={handleUpdateStatus}
                                        disabled={isSubmitting}
                                        className={`w-full py-5 rounded-3xl font-black uppercase tracking-[3px] text-[11px] transition-all disabled:opacity-50 ${
                                            approvalModal.type === 'approved' 
                                            ? 'bg-[#C3EB7A] text-black shadow-[0_0_30px_rgba(195,235,122,0.3)] hover:bg-[#A8D45C]' 
                                            : 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:bg-red-600'
                                        }`}
                                    >
                                        {isSubmitting ? 'Processing...' : `Confirm ${approvalModal.type}`}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Add Advance Modal */}
            <Portal>
                <AnimatePresence>
                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-[92%] sm:max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[40px] p-6 sm:p-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="absolute top-8 right-8 p-2 rounded-xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <h3 className="text-3xl font-black text-white tracking-tighter mb-8 uppercase">Issue Advance</h3>
                                <form onSubmit={handleIssueAdvance} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Select Employee</label>
                                        <select 
                                            value={selectedEmployeeId}
                                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-[#C3EB7A]/50 transition-all appearance-none cursor-pointer font-bold"
                                        >
                                            <option value="" className="bg-[#0A0A0A]">Choose staff member...</option>
                                            {employees.map(emp => (
                                                <option key={emp.employee_id} value={emp.employee_id} className="bg-[#0A0A0A]">
                                                    {emp.first_name} {emp.last_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Advance Amount</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input 
                                                type="number" 
                                                required
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:border-[#C3EB7A]/50 transition-all font-black" 
                                                placeholder="0.00" 
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full py-5 rounded-3xl bg-[#C3EB7A] text-black font-black uppercase tracking-[3px] text-[11px] shadow-[0_0_30px_rgba(195,235,122,0.3)] hover:bg-[#A8D45C] transition-all mt-4 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Authorizing...' : 'Authorize Disbursement'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Void Confirmation Modal */}
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
                                    {authorizationType === 'approved' ? 'Disbursement Authorized' : 'Authorization Rejected'}
                                </h3>
                                <p className="text-white/40 font-medium text-sm leading-relaxed mb-8">
                                    {authorizationType === 'approved' ? (
                                        <>A liquidity advance for <span className="text-white font-bold">{issuedEmployee}</span> in the amount of <span className="text-[#C3EB7A] font-black tracking-tight">{new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(issuedAmount)}</span> has been successfully logged and processed into the current payroll cycle.</>
                                    ) : (
                                        <>The advance request for <span className="text-white font-bold">{issuedEmployee}</span> in the amount of <span className="text-red-400 font-black tracking-tight">{new Intl.NumberFormat('en-US', { style: 'currency', currency: businessConfig.currency, maximumFractionDigits: 0 }).format(issuedAmount)}</span> has been rejected and the record has been updated.</>
                                    )}
                                </p>

                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setShowSuccessModal(false)}
                                        className="w-full py-5 rounded-3xl bg-white text-black font-black uppercase tracking-[3px] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                    >
                                        Return to Dashboard
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

            <ConfirmationModal 
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Void Disbursement?"
                message="This will permanently nullify the advance record. Are you certain you want to proceed with this recovery action?"
                confirmText="Void Record"
                cancelText="Keep Record"
                variant="danger"
            />
        </div>
    );
}
