'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ShieldCheck,
    Cpu,
    Zap,
    Users,
    Sparkles,
    Briefcase,
    Upload,
    CheckCircle2,
    ArrowRight,
    Terminal as TerminalIcon,
    Globe2,
    Loader2
} from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

import { submitApplication } from '../../actions';

type Job = {
    id: string;
    title: string;
    department: string;
};

export default function ApplyClient({ initialJob }: { initialJob: Job }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedin: '',
        github: '',
        portfolio: '',
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();

            let resumeUrl = '';
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `resumes/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('mochaease_job_applications')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('mochaease_job_applications')
                    .getPublicUrl(filePath);

                resumeUrl = publicUrl;
            }

            // Using Server Action for the Database Insert
            const submissionData = new FormData();
            submissionData.append('job_id', initialJob.id);
            submissionData.append('job_title', initialJob.title);
            submissionData.append('department', initialJob.department);
            submissionData.append('full_name', formData.name);
            submissionData.append('email', formData.email);
            submissionData.append('linkedin_url', formData.linkedin);
            submissionData.append('github_url', formData.github);
            submissionData.append('portfolio_url', formData.portfolio);
            submissionData.append('resume_url', resumeUrl);

            const result = await submitApplication(submissionData);

            if (!result.success) throw new Error(result.error);

            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Submission failed:', err);
            alert(`Mission transmission failed: ${err.message || 'Please try again.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
                <NetworkBackground />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl w-full text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-[#C3EB7A] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(195,235,122,0.3)]">
                        <CheckCircle2 className="w-12 h-12 text-black" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">MISSION ACCEPTED.</h1>
                    <p className="text-xl text-white/60 font-medium">
                        Your dossier has been securely transmitted. Our intelligence team will review your profile and contact you if there is a match for this mission.
                    </p>
                    <div className="pt-8">
                        <Link href="/careers" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-bold">
                            Return to Base
                        </Link>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 overflow-x-hidden">
            <NetworkBackground />

            {/* Stepper */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50 flex">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-full transition-all duration-500 ease-out ${step >= s ? 'bg-[#C3EB7A] opacity-100' : 'bg-white/10 opacity-30'} flex-1`}
                    />
                ))}
            </div>

            <section className="relative pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-[#C3EB7A] transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Abort Mission</span>
                    </button>

                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[10px] font-black text-[#C3EB7A] uppercase tracking-widest">
                                Mission Application
                            </span>
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Step {step} of 3</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            Deploy for <br />
                            <span className="text-[#C3EB7A]">{initialJob.title}</span>
                        </h1>
                        <p className="text-white/40 font-medium">{initialJob.department} Division</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#C3EB7A] transition-all"
                                            placeholder="Enter your full legal name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Secure Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#C3EB7A] transition-all"
                                            placeholder="you@protocol.com"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!formData.name || !formData.email}
                                        className="w-full py-5 bg-[#C3EB7A] text-black font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                    >
                                        Next Component <ArrowRight className="w-4 h-4" />
                                    </button>
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
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">LinkedIn</label>
                                            <input
                                                type="url"
                                                value={formData.linkedin}
                                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#C3EB7A] transition-all"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">GitHub</label>
                                            <input
                                                type="url"
                                                value={formData.github}
                                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#C3EB7A] transition-all"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Portfolio / Personal Site</label>
                                        <input
                                            type="url"
                                            value={formData.portfolio}
                                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-[#C3EB7A] transition-all"
                                            placeholder="https://yourwork.com"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex-[2] py-5 bg-[#C3EB7A] text-black font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            Final Protocol <ArrowRight className="w-4 h-4" />
                                        </button>
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
                                    <div className="space-y-2 text-center pb-6">
                                        <h3 className="text-xl font-bold">Transmit Dossier</h3>
                                        <p className="text-sm text-white/40">Upload your resume/CV (PDF preferred)</p>
                                    </div>

                                    <div
                                        className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all ${file ? 'border-[#C3EB7A] bg-[#C3EB7A]/5' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'}`}
                                    >
                                        <input
                                            type="file"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                                                <Upload className={`w-8 h-8 ${file ? 'text-[#C3EB7A]' : 'text-white/20'}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold">{file ? file.name : 'Click or drag to upload'}</p>
                                                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Maximum file size: 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={handleBack}
                                            className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !file}
                                            className="flex-[2] py-5 bg-[#C3EB7A] text-black font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" /> Transmitting...
                                                </>
                                            ) : (
                                                <>
                                                    Initialize Transmission <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </section>
        </main>
    );
}
