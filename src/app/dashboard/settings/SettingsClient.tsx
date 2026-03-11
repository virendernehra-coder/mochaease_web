'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Store, PackageSearch, TicketPercent, Target, 
    TrendingUp, Globe, Utensils, Bike, 
    Smartphone, ShieldCheck, MessageSquarePlus, Mail,
    Sparkles, Settings as SettingsIcon, User,
    ArrowUpRight, X, MapPin, Phone, DollarSign,
    CheckCircle2, ArrowRight, ArrowLeft, Loader2
} from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'next/navigation';
import Portal from '@/components/Portal';

const settingSections = [
    {
        title: "Operations Command",
        description: "Manage your physical footprint and catalog.",
        cards: [
            { id: 'outlet', title: "Add New Outlet", desc: "Expand your physical presence.", icon: Store, color: "#C3EB7A" },
            { id: 'import', title: "Import Products", desc: "Batch upload inventory items.", icon: PackageSearch, color: "#4A90E2" },
        ]
    },
    {
        title: "Growth & Sales Engine",
        description: "Configure revenue targets and incentives.",
        cards: [
            { id: 'discounts', title: "Create Discounts", desc: "Setup promotional campaigns.", icon: TicketPercent, color: "#F59E0B" },
            { id: 'business-goal', title: "Business Sales Goal", desc: "Set global revenue targets.", icon: Target, color: "#8B5CF6" },
            { id: 'outlet-goal', title: "Outlet Sales Goal", desc: "Configure per-location KPIs.", icon: TrendingUp, color: "#EC4899" },
        ]
    },
    {
        title: "Global Integration Suite",
        description: "Connect to the world's leading food platforms.",
        cards: [
            { id: 'gofood', title: "GoFood Integration", desc: "Sync with GoFood ecosystem.", icon: Globe, color: "#10B981" },
            { id: 'zomato', title: "Zomato Integration", desc: "Activate Zomato ordering.", icon: Utensils, color: "#EF4444", comingSoon: true },
            { id: 'swiggy', title: "Swiggy Integration", desc: "Connect Swiggy delivery fleet.", icon: Bike, color: "#F97316", comingSoon: true },
            { id: 'grabfood', title: "Grabfood Integration", desc: "Universal Grabfood sync.", icon: Smartphone, color: "#06B6D4", comingSoon: true },
        ]
    },
    {
        title: "Ecosystem Preferences",
        description: "Customize your MochaEase experience.",
        cards: [
            { id: 'feature-access', title: "Feature Access", desc: "Manage business capabilities.", icon: ShieldCheck, color: "#64748B" },
            { id: 'request-feature', title: "Request Feature", desc: "Suggest new capabilities.", icon: MessageSquarePlus, color: "#C3EB7A" },
            { id: 'profile', title: "User Profile", desc: "Manage your identity & bio.", icon: User, color: "#C3EB7A" },
            { id: 'email-prefs', title: "Email Preferences", desc: "Manage communications.", icon: Mail, color: "#4A90E2" },
        ]
    }
];

interface OutletForm {
    outlet_name: string;
    outlet_address: string;
    outlet_phone: string;
    outlet_email: string;
    outlet_currency: string;
}

export default function SettingsClient() {
    const { user } = useUserStore();
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Form State
    const [newOutlet, setNewOutlet] = useState<OutletForm>({
        outlet_name: '',
        outlet_address: '',
        outlet_phone: '',
        outlet_email: '',
        outlet_currency: 'USD',
    });

    const handleCreateOutlet = async () => {
        setErrorMessage('');
        
        if (!user?.business_id) {
            setErrorMessage(`USER_SESSION_ERROR: Business identity is missing from your session.`);
            return;
        }
        
        setIsLoading(true);

        try {
            const payload = {
                business_id: user.business_id,
                business_name: user.business_name || 'My Business',
                role_id: user.role || 'owner',
                outlet_name: newOutlet.outlet_name,
                outlet_address: newOutlet.outlet_address,
                outlet_phone: newOutlet.outlet_phone,
                outlet_email: newOutlet.outlet_email,
                outlet_currency: newOutlet.outlet_currency,
                country_code: 'US',
                timezone: 'UTC'
            };

            const res = await fetch('/api/create-outlet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsCreateModalOpen(false);
                    setIsSuccess(false);
                    setStep(1);
                    setNewOutlet({
                        outlet_name: '',
                        outlet_address: '',
                        outlet_phone: '',
                        outlet_email: '',
                        outlet_currency: 'USD',
                    });
                }, 2000);
            } else {
                setErrorMessage(data.error || 'The business gateway rejected the request.');
            }
        } catch (error) {
            console.error('Outlet creation error:', error);
            setErrorMessage('Network error. Please verify your connection to the Moza ecosystem.');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleCardClick = (id: string) => {
        if (id === 'outlet') {
            setIsCreateModalOpen(true);
        } else if (id === 'profile') {
            router.push('/dashboard/settings/profile');
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            
            {/* Settings Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-[#C3EB7A]/10 border border-[#C3EB7A]/20">
                            <SettingsIcon className="w-5 h-5 text-[#C3EB7A]" />
                        </div>
                        <span className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-[3px]">System Gateway</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        Control <span className="text-white/30">Center.</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Optimize your ecosystem, manage global integrations, and set performance targets from a single unified workspace.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-purple-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">AI Optimizer</h4>
                        <p className="text-[10px] text-white/40 leading-tight">3 recommended configurations<br />ready for deployment.</p>
                    </div>
                </div>
            </div>

            {/* Categorized Grid */}
            <div className="space-y-16">
                {settingSections.map((section, sectionIdx) => (
                    <section key={section.title} className="space-y-8">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                                {section.title}
                                <div className="h-[1px] flex-1 bg-white/5 ml-4" />
                            </h2>
                            <p className="text-sm text-white/40">{section.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {section.cards.map((card, cardIdx) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (sectionIdx * 0.1) + (cardIdx * 0.05) }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onClick={() => handleCardClick(card.id)}
                                    className="group relative"
                                >
                                    {/* Hover Glow */}
                                    <div 
                                        className="absolute -inset-0.5 rounded-[32px] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
                                        style={{ backgroundColor: card.color }}
                                    />
                                    
                                    <div className="relative h-full bg-[#0A0A0A]/60 border border-white/5 hover:border-white/10 p-8 rounded-[32px] backdrop-blur-2xl transition-all flex flex-col items-start gap-6 cursor-pointer">
                                        <div className="w-full flex justify-between items-start">
                                            <div 
                                                className="p-4 rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:bg-white/10"
                                                style={{ borderColor: `${card.color}20` }}
                                            >
                                                <card.icon 
                                                    className="w-8 h-8 transition-transform group-hover:scale-110 duration-500" 
                                                    style={{ color: card.color }}
                                                />
                                            </div>

                                            {card.comingSoon && (
                                                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">COMING SOON</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-[#C3EB7A] transition-colors">{card.title}</h3>
                                            <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[2px] group-hover:text-white group-hover:tracking-[3px] transition-all">
                                            {card.comingSoon ? 'Notify Me' : 'Configure'} <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Outlet Wizard Modal - Portal for Perfect Viewport Centering */}
            <Portal>
                <AnimatePresence>
                    {isCreateModalOpen && (
                        <div 
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
                            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
                        >
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => !isLoading && setIsCreateModalOpen(false)}
                                className="absolute inset-0 cursor-pointer"
                            />
                            
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 100 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 100 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-[48px] shadow-[0_0_200px_rgba(0,0,0,1)] overflow-hidden z-20"
                            >
                                {/* Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step / 3) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]"
                                    />
                                </div>

                                <div className="p-10 md:p-12">
                                    <div className="flex justify-between items-start mb-12 relative z-10">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-black text-[#C3EB7A] uppercase tracking-[3px]">Instantiation Wizard</span>
                                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[3px]">Step {step} of 3</span>
                                            </div>
                                            <h3 className="text-4xl font-black text-white tracking-tighter">
                                                {step === 1 && <>Core <span className="text-white/30">Identity.</span></>}
                                                {step === 2 && <>Global <span className="text-white/30">Presence.</span></>}
                                                {step === 3 && <>Final <span className="text-white/30">Confirmation.</span></>}
                                            </h3>
                                        </div>
                                        <button 
                                            onClick={() => setIsCreateModalOpen(false)}
                                            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all hover:rotate-90 duration-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="relative min-h-[300px]">
                                        {errorMessage && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mb-8 p-4 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm font-bold"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                {errorMessage}
                                            </motion.div>
                                        )}
                                        <AnimatePresence mode="wait">
                                            {isSuccess ? (
                                                <motion.div 
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex flex-col items-center justify-center text-center py-12"
                                                >
                                                    <div className="w-32 h-32 rounded-full border-4 border-[#C3EB7A] flex items-center justify-center mb-8 relative">
                                                        <motion.div 
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute inset-0 bg-[#C3EB7A] rounded-full opacity-20 animate-ping"
                                                        />
                                                        <CheckCircle2 className="w-16 h-16 text-[#C3EB7A]" />
                                                    </div>
                                                    <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">SUCCESSFULLY INSTANTIATED</h4>
                                                    <p className="text-white/40 font-medium">Your new physical node is now syncing with the global ecosystem.</p>
                                                </motion.div>
                                            ) : step === 1 ? (
                                                <motion.div 
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <WizardInput 
                                                        label="Outlet Designation" 
                                                        icon={<Store className="w-5 h-5" />} 
                                                        placeholder="e.g. Neo-Tokyo Hub" 
                                                        value={newOutlet.outlet_name}
                                                        onChange={(val) => setNewOutlet({...newOutlet, outlet_name: val})}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <WizardInput 
                                                            label="Sync Endpoint (Email)" 
                                                            icon={<Mail className="w-5 h-5" />} 
                                                            placeholder="hub@mochaease.com" 
                                                            type="email"
                                                            value={newOutlet.outlet_email}
                                                            onChange={(val) => setNewOutlet({...newOutlet, outlet_email: val})}
                                                        />
                                                        <WizardInput 
                                                            label="Communication Direct" 
                                                            icon={<Phone className="w-5 h-5" />} 
                                                            placeholder="+1 (555) 000-0000" 
                                                            type="tel"
                                                            value={newOutlet.outlet_phone}
                                                            onChange={(val) => setNewOutlet({...newOutlet, outlet_phone: val})}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ) : step === 2 ? (
                                                <motion.div 
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <WizardInput 
                                                        label="Geographic Coordinates" 
                                                        icon={<MapPin className="w-5 h-5" />} 
                                                        placeholder="Enter full physical address" 
                                                        value={newOutlet.outlet_address}
                                                        onChange={(val) => setNewOutlet({...newOutlet, outlet_address: val})}
                                                    />
                                                    <WizardInput 
                                                        label="Economic Standard (Currency)" 
                                                        icon={<DollarSign className="w-5 h-5" />} 
                                                        placeholder="USD" 
                                                        value={newOutlet.outlet_currency}
                                                        onChange={(val) => setNewOutlet({...newOutlet, outlet_currency: val})}
                                                    />
                                                </motion.div>
                                            ) : (
                                                <motion.div 
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-8"
                                                >
                                                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-4">
                                                        <div className="flex justify-between items-center text-sm font-medium">
                                                            <span className="text-white/40 uppercase tracking-widest text-[10px]">Name</span>
                                                            <span className="text-white font-black">{newOutlet.outlet_name}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm font-medium">
                                                            <span className="text-white/40 uppercase tracking-widest text-[10px]">Location</span>
                                                            <span className="text-white font-black">{newOutlet.outlet_address}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm font-medium">
                                                            <span className="text-white/40 uppercase tracking-widest text-[10px]">Contact</span>
                                                            <span className="text-white font-black">{newOutlet.outlet_phone}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm font-medium">
                                                            <span className="text-white/40 uppercase tracking-widest text-[10px]">Standard</span>
                                                            <span className="text-white font-black">{newOutlet.outlet_currency}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {!isSuccess && (
                                        <div className="mt-12 flex gap-4 relative z-10">
                                            {step > 1 && (
                                                <button 
                                                    disabled={isLoading}
                                                    onClick={prevStep}
                                                    className="px-8 py-5 rounded-[24px] bg-white/5 border border-white/10 text-white font-black uppercase tracking-[2px] text-[11px] hover:bg-white/10 transition-all flex items-center gap-3 disabled:opacity-50"
                                                >
                                                    <ArrowLeft className="w-4 h-4" /> Back
                                                </button>
                                            )}
                                            {step < 3 ? (
                                                <button 
                                                    onClick={nextStep}
                                                    disabled={!newOutlet.outlet_name && step === 1}
                                                    className="flex-1 py-5 rounded-[24px] bg-white text-black font-black uppercase tracking-[3px] text-[11px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    Continue Journey <ArrowRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={handleCreateOutlet}
                                                    disabled={isLoading}
                                                    className="flex-1 py-5 rounded-[24px] bg-[#C3EB7A] text-black font-black uppercase tracking-[3px] text-[11px] shadow-[0_0_50px_rgba(195,235,122,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" /> Synchronizing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Instantiate Now <Sparkles className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Portal>

            {/* Support/Footer Action */}
            <div className="pt-20 pb-10">
                <div className="relative p-12 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden text-center">
                    <div className="absolute top-0 right-0 p-8">
                        <Sparkles className="w-12 h-12 text-[#C3EB7A]/10" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Need specialized configuration?</h3>
                    <p className="text-white/40 mb-8 max-w-xl mx-auto">
                        Our engineering team can build custom integrations or features tailored exclusively for your business scale.
                    </p>
                    <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all uppercase tracking-widest">
                        Contact Enterprise Support
                    </button>
                </div>
            </div>

        </div>
    );
}

function WizardInput({ label, icon, placeholder, value, onChange, type = "text" }: {
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    value: string,
    onChange: (val: string) => void,
    type?: string
}) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase tracking-[2px] ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors">
                    {icon}
                </div>
                <input 
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[28px] pl-16 pr-8 py-5 text-sm text-white outline-none focus:border-[#C3EB7A]/30 focus:bg-[#C3EB7A]/5 transition-all placeholder:text-white/10 font-bold" 
                    placeholder={placeholder} 
                />
            </div>
        </div>
    );
}
