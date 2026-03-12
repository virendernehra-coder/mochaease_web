'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, Mail, Shield, Building2, 
    ArrowLeft, Loader2, Camera, CheckCircle2,
    Sparkles, Save
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { createClient } from '@/utils/supabase/client';

export default function ProfileSettingsClient() {
    const router = useRouter();
    const { user, setUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const supabase = createClient();

    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        profile_pic: user?.profile_pic || '',
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setErrorMessage('');
        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('profile_pics')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('profile_pics')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, profile_pic: publicUrl }));
            
            // Proactive save if image uploaded successfully
            const res = await fetch('/api/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    ...formData,
                    profile_pic: publicUrl
                }),
            });

            if (res.ok) {
                setUser({ ...user, ...formData, profile_pic: publicUrl });
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        setErrorMessage('');
        setIsLoading(true);
        setIsSuccess(false);

        try {
            const res = await fetch('/api/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    ...formData
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsSuccess(true);
                // Update local store
                if (user) {
                    setUser({
                        ...user,
                        ...formData
                    });
                }
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                setErrorMessage(data.error || 'Failed to update profile');
            }
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                <button 
                    onClick={() => router.back()}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter">Profile <span className="text-white/30">Hub.</span></h1>
                    <p className="text-sm text-white/40 font-medium">Manage your personal identity and system role.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Identity Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#C3EB7A]/20 to-[#4A90E2]/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative aspect-square rounded-[40px] bg-[#0A0A0A] border border-white/10 overflow-hidden flex items-center justify-center">
                            {formData.profile_pic ? (
                                <img src={formData.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-20 h-20 text-white/10" />
                            )}
                            
                            <input 
                                type="file" 
                                id="profile-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                            />
                            
                            <button 
                                onClick={() => document.getElementById('profile-upload')?.click()}
                                disabled={isUploading}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white disabled:opacity-100"
                            >
                                {isUploading ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-[#C3EB7A]" />
                                ) : (
                                    <Camera className="w-8 h-8" />
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {isUploading ? 'Uploading...' : 'Update Photo'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#C3EB7A]/10">
                                <Shield className="w-4 h-4 text-[#C3EB7A]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">System Role</p>
                                <p className="text-sm font-bold text-white uppercase">{user?.role || 'User'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#4A90E2]/10">
                                <Building2 className="w-4 h-4 text-[#4A90E2]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Business</p>
                                <p className="text-sm font-bold text-white">{user?.business_name || 'Individual'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0A0A0A]/60 border border-white/5 rounded-[40px] p-8 md:p-10 space-y-8 backdrop-blur-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup 
                                label="First Name" 
                                value={formData.first_name} 
                                onChange={(v) => setFormData(p => ({ ...p, first_name: v }))} 
                            />
                            <InputGroup 
                                label="Last Name" 
                                value={formData.last_name} 
                                onChange={(v) => setFormData(p => ({ ...p, last_name: v }))} 
                            />
                        </div>


                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">Email Address (Primary)</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
                                <input 
                                    type="text" 
                                    value={user?.email || ''} 
                                    readOnly 
                                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white/40 font-bold text-sm cursor-not-allowed"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                    <span className="text-[8px] font-black text-white/20 border border-white/10 px-2 py-1 rounded-md uppercase tracking-widest">System Locked</span>
                                </div>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                                {errorMessage}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-3">
                                {isSuccess ? (
                                    <motion.div 
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex items-center gap-2 text-[#C3EB7A] text-xs font-bold"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Identity Updated
                                    </motion.div>
                                ) : (
                                    <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-wider">
                                        <Sparkles className="w-3 h-3 text-[#C3EB7A]" />
                                        Auto-sync enabled
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-8 py-4 bg-[#C3EB7A] text-black font-black rounded-2xl flex items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_30px_rgba(195,235,122,0.3)] disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Commit Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputGroup({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] ml-1">{label}</label>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/10 focus:outline-none focus:border-[#C3EB7A]/40 transition-all font-bold text-sm"
                placeholder={`Enter ${label}...`}
            />
        </div>
    );
}
