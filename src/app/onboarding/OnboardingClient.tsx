'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Building, Mail, Lock, CheckCircle2, 
    ArrowRight, ArrowLeft, Loader2, Sparkles,
    Smartphone, Store, Globe, Users, ChevronDown,
    Activity, ShieldCheck, Zap
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createClient } from '@/utils/supabase/client';
import { COUNTRIES } from '@/lib/countries';
import { SOLUTIONS } from '@/data/solutions';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });

type Step = 'account' | 'business' | 'preferences' | 'success';

export default function OnboardingClient() {
    const [step, setStep] = useState<Step>('account');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        business_name: '',
        business_type: 'Cafe',
        country: 'India'
    });

    const handleNext = () => {
        if (step === 'account') setStep('business');
        else if (step === 'business') setStep('preferences');
        else if (step === 'preferences') handleFinalSubmit();
    };

    const handleBack = () => {
        if (step === 'business') setStep('account');
        else if (step === 'preferences') setStep('business');
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // 1. Sign Up the User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.full_name,
                    }
                }
            });

            if (authError) throw authError;

            // 2. Insert User Profile via Secure API
            if (authData.user) {
                const response = await fetch('/api/onboarding', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: authData.user.id,
                        business_name: formData.business_name,
                        business_type: formData.business_type.toLowerCase(),
                        full_name: formData.full_name,
                        email: formData.email,
                        country: formData.country
                    })
                });

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || 'Failed to initialize business profile');
                }
            }

            setStep('success');
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Derived Data
    const industries = SOLUTIONS.map(s => s.title);

    return (
        <main className="flex min-h-screen bg-[#050505] selection:bg-[#C3EB7A]/30 relative overflow-hidden font-sans">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0">
                <NetworkBackground />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#4A90E2]/20 blur-[180px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#C3EB7A]/15 blur-[200px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[250px] rounded-full" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col min-h-screen pt-32 pb-20 px-6">
                
                <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto">
                    
                    {/* Centered Hero Text */}
                    <div className="w-full text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tighter">
                                Claim your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">
                                    Digital Empire.
                                </span>
                            </h1>
                            <p className="text-xl text-white/50 font-medium mb-12 max-w-2xl mx-auto text-balance">
                                You're seconds away from a unified ecosystem. <br className="hidden md:block" />
                                No tablets, no chaos—just pure operational speed.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t border-white/5 pt-12 max-w-3xl mx-auto">
                                <HeroFeature icon={<Zap className="w-5 h-5" />} title="60s Launch" desc="Fully provisioned." />
                                <HeroFeature icon={<ShieldCheck className="w-5 h-5" />} title="Bank-Grade" desc="Encrypted data." />
                                <HeroFeature icon={<Smartphone className="w-5 h-5" />} title="Multi-Platform" desc="Sync instantly." />
                                <HeroFeature icon={<Activity className="w-5 h-5" />} title="AI-Native" desc="Predictive edge." />
                            </div>
                        </motion.div>
                    </div>

                    {/* Centered Onboarding Card */}
                    <div className="relative group w-full max-w-[500px] mx-auto">
                        {/* Card Glow Background */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#C3EB7A]/20 to-[#4A90E2]/20 rounded-[40px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        
                        <div className="relative w-full bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[550px] flex flex-col p-8 md:p-10">
                            
                            {/* Step Progress Bar */}
                            <div className="flex gap-2 mb-8">
                                {['account', 'business', 'preferences'].map((s, idx) => (
                                    <div 
                                        key={s} 
                                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                                            (step === s || (step === 'success')) ? 'bg-[#C3EB7A]' : 
                                            idx === 0 || (idx === 1 && step === 'preferences') ? 'bg-[#C3EB7A]/50' : 'bg-white/10'
                                        }`} 
                                    />
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 'account' && (
                                    <motion.div
                                        key="step-account"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div>
                                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Step 1: Identity</h2>
                                            <p className="text-white/40 text-sm font-medium">Create your central administrator account.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <InputGroup 
                                                label="Full Name" 
                                                icon={<User className="w-4 h-4" />} 
                                                type="text" 
                                                placeholder="Alex Thompson"
                                                value={formData.full_name}
                                                onChange={(v) => updateFormData('full_name', v)}
                                            />
                                            <InputGroup 
                                                label="Work Email" 
                                                icon={<Mail className="w-4 h-4" />} 
                                                type="email" 
                                                placeholder="alex@enterprise.com"
                                                value={formData.email}
                                                onChange={(v) => updateFormData('email', v)}
                                            />
                                            <InputGroup 
                                                label="Master Password" 
                                                icon={<Lock className="w-4 h-4" />} 
                                                type="password" 
                                                placeholder="••••••••••••"
                                                value={formData.password}
                                                onChange={(v) => updateFormData('password', v)}
                                            />
                                        </div>

                                        <button 
                                            onClick={handleNext}
                                            disabled={!formData.full_name || !formData.email || !formData.password}
                                            className="w-full bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50 disabled:scale-100 disabled:shadow-none mt-4"
                                        >
                                            Next Stage
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 'business' && (
                                    <motion.div
                                        key="step-business"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div>
                                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Step 2: Brand</h2>
                                            <p className="text-white/40 text-sm font-medium">Configure your primary business entity.</p>
                                        </div>

                                        <div className="space-y-5">
                                            <InputGroup 
                                                label="Business Name" 
                                                icon={<Building className="w-4 h-4" />} 
                                                type="text" 
                                                placeholder="The Daily Grind"
                                                value={formData.business_name}
                                                onChange={(v) => updateFormData('business_name', v)}
                                            />
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Industry</label>
                                                <div className="relative group/select">
                                                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/select:text-[#C3EB7A] transition-colors z-10" />
                                                    <select 
                                                        value={formData.business_type}
                                                        onChange={(e) => updateFormData('business_type', e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white appearance-none focus:outline-none focus:border-[#C3EB7A]/50 transition-all cursor-pointer font-bold text-sm"
                                                    >
                                                        {industries.map(ind => (
                                                            <option key={ind} value={ind} className="bg-zinc-900">{ind}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Region</label>
                                                <div className="relative group/select">
                                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/select:text-[#4A90E2] transition-colors z-10" />
                                                    <select 
                                                        value={formData.country}
                                                        onChange={(e) => updateFormData('country', e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white appearance-none focus:outline-none focus:border-[#4A90E2]/50 transition-all cursor-pointer font-bold text-sm"
                                                    >
                                                        {COUNTRIES.map(c => (
                                                            <option key={c} value={c} className="bg-zinc-900">{c}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                            <button 
                                                onClick={handleBack}
                                                className="w-20 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!formData.business_name}
                                                className="flex-1 bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50"
                                            >
                                                Continue
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'preferences' && (
                                    <motion.div
                                        key="step-prefs"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-[#C3EB7A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Sparkles className="w-8 h-8 text-[#C3EB7A]" />
                                            </div>
                                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Ready to Launch?</h2>
                                            <p className="text-white/40 text-sm font-medium">Review your system orchestration.</p>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-4">
                                            <SummaryItem icon={<User className="w-4 h-4 text-[#C3EB7A]" />} label="Administrator" value={formData.full_name} />
                                            <SummaryItem icon={<Building className="w-4 h-4 text-[#4A90E2]" />} label="Business" value={formData.business_name} />
                                            <SummaryItem icon={<Globe className="w-4 h-4 text-purple-400" />} label="Country" value={formData.country} />
                                        </div>

                                        {error && (
                                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex gap-4 mt-4">
                                            <button 
                                                onClick={handleBack}
                                                className="w-20 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={loading}
                                                className="flex-1 bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(195,235,122,0.4)]"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Orchestrate Now'}
                                                {!loading && <ArrowRight className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'success' && (
                                    <motion.div
                                        key="step-success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div className="relative mx-auto w-24 h-24">
                                            <div className="absolute inset-0 bg-[#C3EB7A] blur-[40px] opacity-20 rounded-full" />
                                            <CheckCircle2 className="relative w-full h-full text-[#C3EB7A] drop-shadow-[0_0_15px_rgba(195,235,122,0.5)]" />
                                        </div>
                                        
                                        <div>
                                            <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">System Active.</h2>
                                            <p className="text-white/50 font-medium">Your MochaEase ecosystem has been provisioned and is ready for sync.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-8">
                                            <Link href="https://backoffice.mochaease.com" target="_blank" className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <Smartphone className="w-8 h-8 text-[#4A90E2] mx-auto mb-4 group-hover:scale-110 transition-transform relative z-10" />
                                                <span className="block text-xs font-black text-white uppercase tracking-widest relative z-10">Backoffice</span>
                                            </Link>
                                            <Link href="/guides" className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <Store className="w-8 h-8 text-[#C3EB7A] mx-auto mb-4 group-hover:scale-110 transition-transform relative z-10" />
                                                <span className="block text-xs font-black text-white uppercase tracking-widest relative z-10">Guidebook</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Footer Copy */}
                <footer className="mt-20 flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-[4px]">
                    <div>&copy; 2026 MOCHAEASE TECH</div>
                    <div className="hidden md:block">ISO 27001 :: AICPA SOC 2 COMPLIANT</div>
                    <div>SECURED BY AES-256</div>
                </footer>
            </div>
        </main>
    );
}

function InputGroup({ label, icon, type, placeholder, value, onChange }: { label: string, icon: React.ReactNode, type: string, placeholder: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C3EB7A] transition-colors">
                    {icon}
                </div>
                <input 
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

function HeroFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#C3EB7A] group-hover:border-[#C3EB7A]/30 transition-all shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-wider">{title}</h4>
                <p className="text-white/30 text-[9px] mt-1 leading-tight hidden md:block">{desc}</p>
            </div>
        </div>
    );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-xs font-bold text-white/40">{label}</span>
            </div>
            <span className="text-sm font-black text-white">{value}</span>
        </div>
    );
}
