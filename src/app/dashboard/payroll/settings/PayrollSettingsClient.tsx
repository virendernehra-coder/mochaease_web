'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Shield, UserPlus, Search, 
    Trash2, Edit3, MapPin, Wallet, Sparkles, Plus, Calendar, User, Filter, DollarSign,
    X, Check, AlertCircle
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useThemeStore } from '@/store/theme-store';
import Link from 'next/link';
import { getAdvancePayments, createAdvancePayment, deleteAdvancePayment, getEmployees, updateEmployeeSalary, updateEmployeeGovernance, updateEmployeePayDetails, type AdvancePayment } from '@/utils/supabase/queries-client';
import { type EmployeeDetails } from '@/utils/supabase/queries';
import Portal from '@/components/Portal';
const toast = {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(msg)
};

export default function PayrollSettingsClient() {
    const { activeContextId, user } = useUserStore();
    const { primaryColor } = useThemeStore();
    const isGlobal = activeContextId === 'business';
    const contextName = isGlobal ? (user?.business_name || 'Global Business') : 
                       (user?.outlet_name || 'Outlet Context');

    const [employees, setEmployees] = useState<EmployeeDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [wizardFormData, setWizardFormData] = useState({
        first_name: '', // used as employee_id
        employee_fix_pay: '',
        employee_variable_pay: '',
        employee_bonus: ''
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successData, setSuccessData] = useState({ name: '', pay: 0 });

    useEffect(() => {
        async function loadData() {
            if (!user?.business_id) return;
            setIsLoading(true);
            try {
                const queryContextId = isGlobal ? user.business_id : activeContextId;
                
                const empData = await getEmployees(queryContextId, isGlobal);
                
                setEmployees(empData);
            } catch (err) {
                console.error('Failed to load payroll data:', err);
                toast.error('Failed to load staff records');
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [activeContextId, user?.business_id, isGlobal]);

    const filteredEmployees = employees.filter(emp => 
        `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role_id_employee?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePayUpdate = async () => {
        if (!wizardFormData.first_name) return; // first_name stores employee_id in this pivot
        setIsSubmitting(true);
        try {
            const payData = {
                employee_fix_pay: parseFloat(wizardFormData.employee_fix_pay) || 0,
                employee_variable_pay: parseFloat(wizardFormData.employee_variable_pay) || 0,
                employee_bonus: parseFloat(wizardFormData.employee_bonus) || 0
            };
            
            await updateEmployeePayDetails(wizardFormData.first_name, payData);
            
            const employee = employees.find(emp => emp.employee_id === wizardFormData.first_name);
            
            setEmployees(prev => prev.map(emp => 
                emp.employee_id === wizardFormData.first_name 
                ? { ...emp, ...payData } 
                : emp
            ));
            
            setSuccessData({
                name: employee ? `${employee.first_name} ${employee.last_name}` : 'Employee',
                pay: payData.employee_fix_pay
            });
            setIsAddModalOpen(false);
            setShowSuccessModal(true);
        } catch (err: any) {
            console.error('Full update error:', err);
            const errorMsg = err.message || err.details || 'Database rejected update';
            toast.error(`Sync failed: ${errorMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleGovernance = async (empId: string, field: 'daily_shift_status' | 'backup_shift', value: boolean) => {
        try {
            await updateEmployeeGovernance(empId, { [field]: value });
            setEmployees(prev => prev.map(emp => 
                emp.employee_id === empId ? { ...emp, [field]: value } : emp
            ));
            toast.success('Governance updated');
        } catch (err) {
            toast.error('Failed to update governance');
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <Link href="/dashboard/payroll" className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[2px] mb-4 hover:text-[#C3EB7A] transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Payroll
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Shield className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-[3px]">Payroll Governance</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-purple-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        System <span className="text-white/30">Settings.</span>
                    </h1>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                            type="text" 
                            placeholder="Search staff..."
                            className="pl-11 pr-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-[#C3EB7A]/50 transition-all w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#C3EB7A] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]"
                    >
                        <DollarSign className="w-4 h-4" /> Update Employee Pay
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Employee Directory List */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Ecosystem Directory</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{filteredEmployees.length} Active Records</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-24 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
                            ))
                        ) : filteredEmployees.length === 0 ? (
                            <div className="p-20 rounded-[40px] bg-white/[0.01] border border-dashed border-white/5 text-center">
                                <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No staff records found in this context</p>
                            </div>
                        ) : filteredEmployees.map((emp) => (
                            <div key={emp.employee_id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                                <div className="flex flex-wrap items-center gap-8">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform">
                                        {emp.first_name?.charAt(0)}
                                    </div>
                                    
                                    <div className="flex-1 min-w-[150px]">
                                        <h4 className="text-lg font-black text-white tracking-tight">{emp.first_name} {emp.last_name}</h4>
                                        <p className="text-[10px] text-white/20 uppercase tracking-widest">{emp.role_id_employee || 'Unassigned'}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Base Salary</p>
                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-xl font-black text-[#C3EB7A]">${(emp.employee_fix_pay || 0).toLocaleString()}</span>
                                            <button 
                                                onClick={() => {
                                                    setWizardFormData({
                                                        first_name: emp.employee_id,
                                                        employee_fix_pay: emp.employee_fix_pay?.toString() || '',
                                                        employee_variable_pay: emp.employee_variable_pay?.toString() || '',
                                                        employee_bonus: emp.employee_bonus?.toString() || '',
                                                    });
                                                    setIsAddModalOpen(true);
                                                }}
                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/20 hover:text-white transition-all"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-[140px]">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Governance</p>
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => toggleGovernance(emp.employee_id, 'daily_shift_status', !emp.daily_shift_status)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-[9px] font-black uppercase tracking-wider ${emp.daily_shift_status ? 'bg-[#C3EB7A]/10 border-[#C3EB7A]/20 text-[#C3EB7A]' : 'bg-white/5 border-white/10 text-white/20'}`}
                                            >
                                                OT
                                            </button>
                                            <button 
                                                onClick={() => toggleGovernance(emp.employee_id, 'backup_shift', !emp.backup_shift)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-[9px] font-black uppercase tracking-wider ${emp.backup_shift ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-white/5 border-white/10 text-white/20'}`}
                                            >
                                                Tax
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Panels */}
                <div className="space-y-8">
                    
                    {/* Advance Request Portal Indicator */}
                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#C3EB7A]/10 to-transparent border border-[#C3EB7A]/20 relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-8 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Wallet className="w-24 h-24 text-[#C3EB7A]" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">Advance Portal</h3>
                        <p className="text-sm text-white/40 mb-6 leading-relaxed italic">Manage and approve mid-cycle liquidity requests for your team.</p>
                        
                        <div className="space-y-4 mb-8 text-white/40 text-[10px] uppercase font-black tracking-widest">
                            {/* This would be real stats in future */}
                            System Active. Secure.
                        </div>

                        <Link 
                            href="/dashboard/payroll/advances"
                            className="block w-full text-center py-4 rounded-2xl bg-[#C3EB7A] text-black text-[10px] font-black uppercase tracking-[3px] hover:bg-[#A8D45C] transition-all"
                        >
                            Open Advance Manager
                        </Link>
                    </div>

                    {/* MOZA AI Governance */}
                    <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Moza Intelligence</span>
                        </div>
                        <h4 className="text-sm font-black text-white mb-4">Salary Optimizations</h4>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                                <p className="text-[11px] text-white/60 leading-relaxed">
                                    &quot;Sarah&apos;s performance metrics suggest a <span className="text-[#C3EB7A] font-bold">+8% market correction</span> is due for the next cycle.&quot;
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                <p className="text-[11px] text-white/60 leading-relaxed">
                                    &quot;Advise limiting further advances for Emily until the current $500 balance recovers below 50%.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modals */}
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
                                className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,1)] z-10 flex flex-col overflow-hidden max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-10 space-y-8">
                                    <div>
                                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">Update Employee Pay</h3>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[3px]">Configure active compensation matrix</p>
                                    </div>

                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handlePayUpdate();
                                    }} className="space-y-6">
                                        {/* Employee Selection */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Verified Member</label>
                                            <select 
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-[#C3EB7A]/50 transition-all font-black appearance-none"
                                                value={wizardFormData.first_name || ''} 
                                                onChange={(e) => {
                                                    const emp = employees.find(emp => emp.employee_id === e.target.value);
                                                    if (emp) {
                                                        setWizardFormData({
                                                            ...wizardFormData,
                                                            first_name: emp.employee_id,
                                                            employee_fix_pay: emp.employee_fix_pay?.toString() || '',
                                                            employee_variable_pay: emp.employee_variable_pay?.toString() || '',
                                                            employee_bonus: emp.employee_bonus?.toString() || ''
                                                        });
                                                    }
                                                }}
                                            >
                                                <option value="" className="bg-[#0A0A0A]">Choose Staff Member...</option>
                                                {employees.map(emp => (
                                                    <option key={emp.employee_id} value={emp.employee_id} className="bg-[#0A0A0A]">
                                                        {emp.first_name} {emp.last_name} ({emp.role_id_employee})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Fixed Pay */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Fixed Pay</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <input 
                                                        type="number"
                                                        value={wizardFormData.employee_fix_pay}
                                                        onChange={(e) => setWizardFormData({...wizardFormData, employee_fix_pay: e.target.value})}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:border-[#C3EB7A]/50 transition-all font-black"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            {/* Variable Pay */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Variable Pay</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <input 
                                                        type="number"
                                                        value={wizardFormData.employee_variable_pay}
                                                        onChange={(e) => setWizardFormData({...wizardFormData, employee_variable_pay: e.target.value})}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all font-black"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>

                                            {/* Bonus */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Performance Bonus</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                    <input 
                                                        type="number"
                                                        value={wizardFormData.employee_bonus}
                                                        onChange={(e) => setWizardFormData({...wizardFormData, employee_bonus: e.target.value})}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white outline-none focus:border-blue-500/50 transition-all font-black"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button 
                                                type="submit"
                                                disabled={isSubmitting || !wizardFormData.first_name}
                                                className="w-full py-5 rounded-3xl bg-[#C3EB7A] text-black font-black uppercase tracking-[3px] text-[11px] hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_20px_40px_rgba(195,235,122,0.2)] disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Syncing Records...' : 'Seal Compensation Updates'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Success Confirmation Modal */}
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
                                className="relative w-full max-w-md bg-[#0A0A0A] border border-white/5 rounded-[50px] p-12 overflow-hidden shadow-[0_0_150px_rgba(195,235,122,0.1)]"
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

                                <h3 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">Matrix Synchronized</h3>
                                <p className="text-white/40 font-medium text-sm leading-relaxed mb-8">
                                    The compensation structure for <span className="text-white font-bold">{successData.name}</span> has been successfully updated to <span className="text-[#C3EB7A] font-black tracking-tight">${successData.pay.toLocaleString()}</span> and synced with active payroll governance.
                                </p>

                                <button 
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full py-5 rounded-3xl bg-white text-black font-black uppercase tracking-[3px] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                                >
                                    Return to Directory
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

        </div>
    );
}
