'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, Lock, ArrowRight, Loader2, Sparkles,
    ShieldCheck, Zap, Chrome, Apple, AlertCircle,
    Activity
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });

export default function LoginClient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // Redirection is handled by AuthInitializer globally to ensure role-based routing
        } catch (err: any) {
            setError(err.message || 'Invalid login credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (provider: 'google' | 'apple') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
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
                                Welcome <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">
                                    Back home.
                                </span>
                            </h1>
                            <p className="text-xl text-white/50 font-medium mb-12 max-w-2xl mx-auto text-balance">
                                Sign in to your command center and keep your ecosystem hummin'. <br className="hidden md:block" />
                                Your data is ready, the empire awaits.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t border-white/5 pt-12 max-w-3xl mx-auto">
                                <HeroFeature icon={<Zap className="w-5 h-5" />} title="Fast Sync" desc="Real-time data." />
                                <HeroFeature icon={<ShieldCheck className="w-5 h-5" />} title="Secure" desc="AES-256 Auth." />
                                <HeroFeature icon={<Sparkles className="w-5 h-5" />} title="AI Ready" desc="Insights active." />
                                <HeroFeature icon={<Activity className="w-5 h-5" />} title="Uptime" desc="99.9% Reliable." />
                            </div>
                        </motion.div>
                    </div>

                    {/* Centered Login Card */}
                    <div className="relative group w-full max-w-[480px] mx-auto">
                        {/* Card Glow Background */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#C3EB7A]/20 to-[#4A90E2]/20 rounded-[40px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        
                        <div className="relative w-full bg-[#0F0F0F]/80 border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-3xl overflow-hidden min-h-[500px] flex flex-col p-8 md:p-10">
                            
                            <div className="mb-10 text-center">
                                <h2 className="text-3xl font-black text-white mb-2 tracking-tight text-center">Authorized Access</h2>
                                <p className="text-white/40 text-sm font-medium">Verify your credentials to enter the dashboard.</p>
                            </div>

                            <div className="space-y-6 flex-1">
                                {/* OAuth Options */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleOAuth('google')}
                                        className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group"
                                    >
                                        <Chrome className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button 
                                        onClick={() => handleOAuth('apple')}
                                        className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group"
                                    >
                                        <Apple className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                        <span className="text-sm">Apple</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[2px]">OR EMAIL LOGIN</span>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                </div>

                                <form onSubmit={handleLogin} className="space-y-5">
                                    <InputGroup 
                                        label="Work Email" 
                                        icon={<Mail className="w-4 h-4" />} 
                                        type="email" 
                                        placeholder="alex@enterprise.com"
                                        value={email}
                                        onChange={setEmail}
                                    />
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1 text-left">Password</label>
                                            <Link href="/forgot-password" className="text-[10px] font-black text-[#4A90E2] uppercase tracking-[1px] hover:text-[#C3EB7A] transition-colors">
                                                Forgot?
                                            </Link>
                                        </div>
                                        <div className="relative group/input">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                                                placeholder="••••••••••••"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2"
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={loading || !email || !password}
                                        className="w-full bg-[#C3EB7A] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50 disabled:scale-100 disabled:shadow-none mt-4"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Command Center'}
                                        {!loading && <ArrowRight className="w-5 h-5" />}
                                    </button>
                                </form>
                            </div>

                            <p className="text-center text-sm text-white/40 mt-10 font-medium">
                                No account? <Link href="/onboarding" className="text-[#C3EB7A] font-black hover:underline underline-offset-4 decoration-2">Begin Onboarding</Link>
                            </p>
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
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1 text-left block w-full">{label}</label>
            <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-[#C3EB7A] transition-colors">
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
