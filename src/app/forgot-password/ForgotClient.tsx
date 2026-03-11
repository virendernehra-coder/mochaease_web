'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, ArrowRight, ArrowLeft, Loader2, Sparkles,
    ShieldCheck, Zap, AlertCircle, CheckCircle2, Lock, KeyIcon
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createClient } from '@/utils/supabase/client';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });

type RecoveryStep = 'email' | 'otp' | 'success';

export default function ForgotClient() {
    const [step, setStep] = useState<RecoveryStep>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const supabase = createClient();

    const handleSendResetEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/login/update-password`,
            });

            if (resetError) throw resetError;
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send recovery pulse.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Verify the OTP
            const { error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'recovery',
            });

            if (verifyError) throw verifyError;

            // 2. Update the password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) throw updateError;

            setStep('success');
        } catch (err: any) {
            setError(err.message || 'Verification failed. Please check your OTP.');
        } finally {
            setLoading(false);
        }
    };

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
                                {step === 'otp' ? 'Verify your' : 'Recover your'} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">
                                    {step === 'otp' ? 'Identity.' : 'Access.'}
                                </span>
                            </h1>
                            <p className="text-xl text-white/50 font-medium mb-12 max-w-2xl mx-auto text-balance">
                                {step === 'otp' ? 
                                    "Enter the 8-digit code we sent to your inbox and set your new master password." : 
                                    "Locked out of the engine room? No worries. We'll send a recovery pulse to your inbox instantly."
                                }
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t border-white/5 pt-12 max-w-3xl mx-auto">
                                <HeroFeature icon={<Zap className="w-5 h-5" />} title="Instant Pulse" desc="Code sent in seconds." />
                                <HeroFeature icon={<ShieldCheck className="w-5 h-5" />} title="Safe Reset" desc="Encrypted session." />
                                <HeroFeature icon={<Sparkles className="w-5 h-5" />} title="Verified" desc="Email confirmation." />
                                <HeroFeature icon={<KeyIcon className="w-5 h-5" />} title="New Key" desc="Update password." />
                            </div>
                        </motion.div>
                    </div>

                    {/* Centered Forgot Card */}
                    <div className="relative group w-full max-w-[480px] mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#C3EB7A]/20 to-[#4A90E2]/20 rounded-[40px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        
                        <div className="relative w-full bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[400px] flex flex-col p-8 md:p-10">
                            
                            <AnimatePresence mode="wait">
                                {step === 'email' && (
                                    <motion.div
                                        key="step-email"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">System Recovery</h2>
                                            <p className="text-white/40 text-sm font-medium">Enter your registered email address.</p>
                                        </div>

                                        <form onSubmit={handleSendResetEmail} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Registered Email</label>
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <input 
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                                                        placeholder="you@company.com"
                                                    />
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    {error}
                                                </div>
                                            )}

                                            <div className="flex gap-4">
                                                <Link href="/login" className="w-20 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors group">
                                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                                </Link>
                                                <button 
                                                    type="submit"
                                                    disabled={loading || !email}
                                                    className="flex-1 bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50"
                                                >
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Recovery'}
                                                    {!loading && <ArrowRight className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                                {step === 'otp' && (
                                    <motion.div
                                        key="step-otp"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 flex-1 flex flex-col justify-center"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Security Vault</h2>
                                            <p className="text-white/40 text-sm font-medium">Verify the code and set your new key.</p>
                                        </div>

                                        <form onSubmit={handleVerifyAndReset} className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Recovery Code (OTP)</label>
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
                                                        <KeyIcon className="w-4 h-4" />
                                                    </div>
                                                    <input 
                                                        type="text"
                                                        required
                                                        maxLength={8}
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-black text-center tracking-[8px] text-lg"
                                                        placeholder="00000000"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">New Master Password</label>
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
                                                        <Lock className="w-4 h-4" />
                                                    </div>
                                                    <input 
                                                        type="password"
                                                        required
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                                                        placeholder="••••••••••••"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Confirm Password</label>
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
                                                        <ShieldCheck className="w-4 h-4" />
                                                    </div>
                                                    <input 
                                                        type="password"
                                                        required
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                                                        placeholder="••••••••••••"
                                                    />
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    {error}
                                                </div>
                                            )}

                                            <button 
                                                type="submit"
                                                disabled={loading || !otp || !newPassword || !confirmPassword}
                                                className="w-full bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Override System Key'}
                                                {!loading && <ArrowRight className="w-5 h-5" />}
                                            </button>

                                            <button 
                                                type="button"
                                                onClick={() => setStep('email')}
                                                className="w-full text-center text-[10px] font-black text-white/30 uppercase tracking-[2px] hover:text-[#C3EB7A] transition-colors"
                                            >
                                                Back to Request
                                            </button>
                                        </form>
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
                                            <h2 className="text-4xl font-black text-white mb-3 tracking-tighter">System Repaired.</h2>
                                            <p className="text-white/50 font-medium">Your master password has been updated. Secure access to your dashboard is now restored.</p>
                                        </div>

                                        <Link href="/login" className="inline-flex items-center gap-2 text-[#C3EB7A] font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                                            Return to Login <ArrowRight className="w-4 h-4" />
                                        </Link>
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
