'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, UserPlus, Shield, Star, 
    ArrowUpRight, ChevronRight, Sparkles, 
    Search, Filter, MoreHorizontal,
    Briefcase, GraduationCap, MapPin,
    Plus, Mail, Phone, Clock, Calendar, Check, AlertCircle, X, Trash2, Edit3, Camera, DollarSign
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const generateSecurePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role_id_employee: string;
    outlet_name: string;
    outlet_id: string;
    profile_pic?: string;
    employee_fix_pay: number;
    employee_variable_pay: number;
    employee_bonus: number;
    preferred_shift: string;
    weekly_off_days: number;
}

export default function EmployeesClient() {
    const { activeContextId, user } = useUserStore();
    const isGlobal = activeContextId === 'business';
    const supabase = createClient();

    const [mounted, setMounted] = useState(false);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState<any[]>([]);
    const [outlets, setOutlets] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        role_id_employee: '',
        outlet_id: isGlobal ? '' : activeContextId,
        profile_pic: '',
        employee_fix_pay: '',
        employee_variable_pay: '',
        employee_bonus: '',
        preferred_shift: 'Morning',
        weekly_off_days: '1',
        daily_shift_status: true,
        backup_shift: false
    });

    const fetchData = React.useCallback(async () => {
        if (!user?.business_id) return;
        setLoading(true);
        try {
            // Fetch Employees
            let employeeQuery = supabase.from('employee_details').select('*');
            if (isGlobal) {
                employeeQuery = employeeQuery.eq('business_id', user.business_id);
            } else {
                employeeQuery = employeeQuery.eq('outlet_id', activeContextId);
            }
            const { data: employeeData } = await employeeQuery;
            setEmployees(employeeData || []);

            // Fetch Roles
            const { data: rolesData } = await supabase.from('roles').select('*');
            setRoles(rolesData || []);

            // Fetch Outlets
            const { data: outletsData } = await supabase
                .from('business_details')
                .select('outlet_id, outlet_name')
                .eq('business_id', user.business_id);
            setOutlets(outletsData || []);

        } catch (err) {
            console.error('Error fetching employee data:', err);
        } finally {
            setLoading(false);
        }
    }, [activeContextId, isGlobal, supabase, user?.business_id]);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, [fetchData]);

    const handleCreateEmployee = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const currentOutlet = outlets.find(o => o.outlet_id === formData.outlet_id);
            
            const response = await fetch('/api/create-employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    business_id: user?.business_id,
                    business_name: user?.business_name,
                    outlet_name: currentOutlet?.outlet_name || 'Global',
                    password: generateSecurePassword(),
                    role_id_creator: user?.role || 'owner',
                    employee_fix_pay: parseFloat(formData.employee_fix_pay) || 0,
                    employee_variable_pay: parseFloat(formData.employee_variable_pay) || 0,
                    employee_bonus: parseFloat(formData.employee_bonus) || 0,
                    weekly_off_days: parseInt(formData.weekly_off_days) || 1
                })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to create employee');

            setStep(4); // Move to success step
            fetchData();
            // Reset form
            setFormData({
                first_name: '', last_name: '', email: '', phone_number: '',
                role_id_employee: '', outlet_id: isGlobal ? '' : activeContextId,
                profile_pic: '', employee_fix_pay: '', employee_variable_pay: '',
                employee_bonus: '', preferred_shift: 'Morning', weekly_off_days: '1',
                daily_shift_status: true, backup_shift: false
            });
        } catch (err: any) {
            let userFriendlyError = err.message;
            if (
                err.message.toLowerCase().includes('already exists') || 
                err.message.toLowerCase().includes('duplicate') ||
                err.message.includes('non-2xx status code')
            ) {
                userFriendlyError = "An account with this email address already exists. Please use a different email.";
            }
            setError(userFriendlyError);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredEmployees = employees.filter(e => 
        `${e.first_name} ${e.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const contextName = isGlobal ? 'Global Business' : 
                       outlets.find(o => o.outlet_id === activeContextId)?.outlet_name || 'Selected Outlet';

    if (!mounted) return null;

    return (
        <>
            <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Employees Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[3px]">Human Capital</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-blue-400/40" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{contextName}</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Team <span className="text-white/30">Force.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Manage roles, track performance, and empower your staff with dedicated growth paths.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                        <input 
                            type="text"
                            placeholder="SEARCH TEAM..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black tracking-widest text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-full md:w-[240px]"
                        />
                    </div>
                    <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-500 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95"
                    >
                        <UserPlus className="w-4 h-4" /> Onboard Staff
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Headcount" value={loading ? "..." : employees.length.toString()} sub={isGlobal ? "Global" : "Current Outlet"} trend={employees.length > 0 ? `+${employees.length}` : "0"} icon={<Users className="w-5 h-5" />} color="blue" />
                <KPICard title="Happiness Index" value="4.8/5" sub="Quarterly average" trend="+0.2" icon={<Star className="w-5 h-5" />} color="amber" />
                <KPICard title="Certifications" value="12" sub="Active skills" trend="+2" icon={<Shield className="w-5 h-5" />} color="emerald" />
                <KPICard title="Retention" value="98%" sub="Annual rate" trend="+1.1%" icon={<Sparkles className="w-5 h-5" />} color="purple" />
            </div>

            {/* Team Distribution & Growth */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Role Composition */}
                <div className="xl:col-span-1 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 group relative overflow-hidden">
                    <h3 className="text-xl font-black text-white mb-8">Role Composition</h3>
                    
                    <div className="space-y-6">
                        <RoleBar label="Management" count={12} total={48} color="blue" />
                        <RoleBar label="Service Staff" count={24} total={48} color="emerald" />
                        <RoleBar label="Kitchen Team" count={8} total={48} color="amber" />
                        <RoleBar label="Support" count={4} total={48} color="purple" />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Growth Forecast</p>
                            <p className="text-sm font-bold text-[#C3EB7A]">+5 New Positions Need</p>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-[#C3EB7A]" />
                    </div>
                </div>

                {/* Performance Feed */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white tracking-tight">Top Performance Feed</h3>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                            <p className="text-xs font-bold text-white/20 uppercase tracking-[2px]">Sort by Rank ▾</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
                            ))
                        ) : filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <EmployeeRow 
                                    key={emp.id}
                                    name={`${emp.first_name} ${emp.last_name}`}
                                    role={emp.role_id_employee}
                                    rank={`ID: ${emp.id}`}
                                    rating="4.9"
                                    status="Active"
                                    img={emp.profile_pic}
                                />
                            ))
                        ) : (
                            <div className="p-12 text-center border border-dashed border-white/10 rounded-[32px] bg-white/[0.01]">
                                <Users className="w-8 h-8 text-white/10 mx-auto mb-4" />
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">No team members found</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all">
                        View Directory (48)
                    </button>
                </div>
            </div>

            {/* Smart HR Insights */}
            <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">HR Intelligence</h2>
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                        <Shield className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider">SECURE AUDIT ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard 
                        title="Skill Matching" 
                        text="James (Outlet #2) exhibits high leadership traits. Candidate for Store Manager vacancy in Downtown." 
                        area="Promotion Path"
                    />
                    <InsightCard 
                        title="Churn Risk" 
                        text="Outlet #4 turnover increased by 15%. Suggesting engagement review for the management there." 
                        area="Retention Strategy"
                    />
                    <InsightCard 
                        title="Compliance Audit" 
                        text="4 staff members have health certifications expiring within 30 days. Reminders sent." 
                        area="Legal Safety"
                    />
                </div>
            </div>

        </div>            {/* Onboarding Wizard Portal */}
            {mounted && isWizardOpen && createPortal(
                <AnimatePresence mode="wait">
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsWizardOpen(false)}
                            className="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-2xl z-0"
                        />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#09090B] border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
                        >
                            {/* Wizard Header */}
                            <div className="relative p-10 pt-14 border-b border-white/5 flex flex-col items-center justify-center flex-shrink-0">
                                {/* Wizard Progress */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 flex gap-1">
                                    {[1, 2, 3].map((i) => (
                                        <div 
                                            key={i} 
                                            className={`flex-1 transition-all duration-500 ${
                                                step >= i ? 'bg-blue-500' : 'bg-transparent'
                                            } ${step === 4 ? 'bg-emerald-500' : ''}`} 
                                        />
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setIsWizardOpen(false)} 
                                    className="absolute right-8 top-8 p-3 hover:bg-white/5 rounded-2xl text-white/20 hover:text-white transition-all z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                                        <UserPlus className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase mt-4">EMPLOYEE IDENTITY</h2>
                                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Step {step <= 3 ? step : 3} of 3: {step === 1 ? 'EMPLOYEE DETAILS' : step === 2 ? 'ROLE & OUTLET' : 'COMPENSATION'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Wizard Content */}
                            <div className="p-10 text-center overflow-y-auto custom-scrollbar flex-1">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div 
                                            key="step1" 
                                            initial={{ opacity: 0, x: 20 }} 
                                            animate={{ opacity: 1, x: 0 }} 
                                            exit={{ opacity: 0, x: -20 }} 
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">FIRST NAME</label>
                                                    <input 
                                                        type="text" 
                                                        value={formData.first_name} 
                                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} 
                                                        placeholder="First Name" 
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">LAST NAME</label>
                                                    <input 
                                                        type="text" 
                                                        value={formData.last_name} 
                                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} 
                                                        placeholder="Last Name" 
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">EMAIL ADDRESS</label>
                                                <input 
                                                    type="email" 
                                                    value={formData.email} 
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                                    placeholder="email@example.com" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">PHONE NUMBER</label>
                                                <input 
                                                    type="tel" 
                                                    value={formData.phone_number} 
                                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} 
                                                    placeholder="Phone Number" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div 
                                            key="step2" 
                                            initial={{ opacity: 0, x: 20 }} 
                                            animate={{ opacity: 1, x: 0 }} 
                                            exit={{ opacity: 0, x: -20 }} 
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">ASSIGN ROLE</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {roles.map((role) => (
                                                        <button 
                                                            key={role.id} 
                                                            onClick={() => setFormData({ ...formData, role_id_employee: role.role_id })} 
                                                            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                                                formData.role_id_employee === role.role_id 
                                                                    ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                                                                    : 'bg-white/5 border-white/10 text-white/20 hover:border-white/20'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Shield className="w-4 h-4" />
                                                                <span className="text-xs font-black tracking-widest uppercase">{role.role_id}</span>
                                                            </div>
                                                            {formData.role_id_employee === role.role_id && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">ASSIGN OUTLET</label>
                                                <select 
                                                    value={formData.outlet_id} 
                                                    onChange={(e) => setFormData({ ...formData, outlet_id: e.target.value })} 
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-[#09090B] text-center">Select an Outlet</option>
                                                    {outlets.map((outlet) => (
                                                        <option key={outlet.outlet_id} value={outlet.outlet_id} className="bg-[#09090B] text-center">{outlet.outlet_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div 
                                            key="step3" 
                                            initial={{ opacity: 0, x: 20 }} 
                                            animate={{ opacity: 1, x: 0 }} 
                                            exit={{ opacity: 0, x: -20 }} 
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">FIXED PAY (MONTHLY)</label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                        <input 
                                                            type="number" 
                                                            value={formData.employee_fix_pay} 
                                                            onChange={(e) => setFormData({ ...formData, employee_fix_pay: e.target.value })} 
                                                            placeholder="30000" 
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-widest text-white/40 uppercase block text-center">VARIABLE / BONUS</label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                                        <input 
                                                            type="number" 
                                                            value={formData.employee_variable_pay} 
                                                            onChange={(e) => setFormData({ ...formData, employee_variable_pay: e.target.value })} 
                                                            placeholder="5000" 
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div 
                                            key="step4" 
                                            initial={{ opacity: 0, scale: 0.95 }} 
                                            animate={{ opacity: 1, scale: 1 }} 
                                            className="py-10 flex flex-col items-center text-center space-y-6"
                                        >
                                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                                <Check className="w-10 h-10 text-emerald-400" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Onboarding Successful!</h3>
                                                <p className="text-white/40 font-medium text-sm max-w-sm mx-auto">
                                                    The employee record has been created. An invitation email with secure login credentials has been sent to <span className="text-blue-400">{formData.email}</span>.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        className="mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-xs font-bold"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </div>

                            {/* Wizard Footer */}
                            <div className="p-8 bg-white/5 border-t border-white/5 flex items-center justify-between flex-shrink-0">
                                {step < 4 ? (
                                    <>
                                        <button 
                                            onClick={() => step > 1 ? setStep(step - 1) : setIsWizardOpen(false)} 
                                            className="px-8 py-5 rounded-3xl font-black tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase text-sm"
                                        >
                                            {step === 1 ? 'CANCEL' : 'BACK'}
                                        </button>
                                        <button 
                                            onClick={() => step < 3 ? setStep(step + 1) : handleCreateEmployee()} 
                                            disabled={isSubmitting} 
                                            className="bg-white text-black px-10 py-5 rounded-3xl font-black tracking-widest transition-all flex items-center gap-2 active:scale-95 uppercase text-sm hover:scale-[1.02] disabled:opacity-30"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    {step === 3 ? (
                                                        <>CONFIRM ONBOARDING <Check className="w-5 h-5" /></>
                                                    ) : (
                                                        'CONTINUE'
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setIsWizardOpen(false);
                                            setStep(1);
                                            setFormData({
                                                first_name: '', last_name: '', email: '', phone_number: '',
                                                role_id_employee: '', outlet_id: isGlobal ? '' : activeContextId,
                                                profile_pic: '', employee_fix_pay: '', employee_variable_pay: '',
                                                employee_bonus: '', preferred_shift: 'Morning', weekly_off_days: '1',
                                                daily_shift_status: true, backup_shift: false
                                            });
                                        }} 
                                        className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black tracking-tighter uppercase text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-[0.98]"
                                    >
                                        DONE & CLOSE
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}
        </>
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

function RoleBar({ label, count, total, color }: { label: string, count: number, total: number, color: string }) {
    const percentage = (count / total) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold text-white">{count} Staff</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--${color}-rgb),0.5)]`}
                />
            </div>
        </div>
    );
}

function EmployeeRow({ name, role, rank, rating, status, img }: { name: string, role: string, rank: string, rating: string, status: string, img?: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-white transition-all group-hover:scale-105 overflow-hidden">
                {img ? (
                    <Image src={img} alt={name} width={48} height={48} className="object-cover" />
                ) : (
                    name.split(' ').map(n => n[0]).join('')
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-black text-white tracking-tight truncate">{name}</h4>
                    <span className="text-[9px] font-black text-[#C3EB7A] px-1.5 py-0.5 rounded-md bg-[#C3EB7A]/10 border border-[#C3EB7A]/20">{rank}</span>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest truncate">{role}</p>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" /> {rating}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block text-right">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Status</p>
                <span className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {status}
                </span>
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/20 group-hover:text-white transition-all">
                <Briefcase className="w-4 h-4" />
            </button>
        </div>
    );
}

function InsightCard({ title, text, area }: { title: string, text: string, area: string }) {
    return (
        <div className="p-8 rounded-[32px] bg-[#0A0A0A]/60 border border-white/5 hover:border-blue-500/20 transition-all flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white uppercase tracking-[2px]">{title}</h4>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    {area}
                </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic group-hover:text-white/60 transition-colors">
                &quot;{text}&quot;
            </p>
            <button className="flex items-center gap-1 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:gap-2 transition-all">
                Staff Review <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    );
}
