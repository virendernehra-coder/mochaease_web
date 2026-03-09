'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Rocket, CheckCircle2, Building2, User, Mail, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DemoForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        business_name: '',
        email: '',
        phone: '',
        business_type: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const res = await fetch('/api/demo-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 relative overflow-hidden flex flex-col pt-32 pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C3EB7A]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4A90E2]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 pt-10">

                {/* Left Section: Value Prop */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 self-start backdrop-blur-sm">
                        <Calendar className="w-4 h-4 text-[#C3EB7A]" />
                        <span className="text-xs font-bold text-[#C3EB7A] tracking-wider uppercase">Free 30-Min Demo</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
                        Experience the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">MochaEase</span> difference.
                    </h1>

                    <p className="text-xl text-white/60 mb-12 font-medium leading-relaxed max-w-lg">
                        See exactly how our AI-powered platform unifies your POS, inventory, and staff management to plug profit leaks and scale operations.
                    </p>

                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold border-b border-white/10 pb-4">What to expect on our call:</h3>

                        <div className="flex gap-5">
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C3EB7A]/20 to-transparent border border-[#C3EB7A]/30 flex items-center justify-center">
                                <Rocket className="w-6 h-6 text-[#C3EB7A]" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Live Platform Tour</h4>
                                <p className="text-white/50 text-base leading-relaxed">A guided walkthrough of the SmartPOS, analytics dashboard, and automated inventory systems.</p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-transparent border border-[#4A90E2]/30 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-[#4A90E2]" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Tailored Assessment</h4>
                                <p className="text-white/50 text-base leading-relaxed">We&apos;ll discuss your specific workflow challenges and calculate potential ROI.</p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Quick Setup Reality Check</h4>
                                <p className="text-white/50 text-base leading-relaxed">See how our hardware-agnostic setup gets you running in under 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="lg:w-1/2 flex items-center justify-center lg:justify-end lg:pl-10">
                    <div className="w-full max-w-lg bg-[#1A1A1A]/90 p-8 md:p-10 rounded-[40px] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group">
                        {/* Form Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C3EB7A]/5 to-transparent pointer-events-none transition-colors duration-700 group-hover:from-[#C3EB7A]/10" />

                        {submitStatus === 'success' ? (
                            /* ── Success State ── */
                            <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 gap-6">
                                <div className="w-20 h-20 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/30 flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-[#C3EB7A]" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black mb-3">You&apos;re In!</h2>
                                    <p className="text-white/60 text-base leading-relaxed max-w-sm">
                                        Our team will reach out within <strong className="text-white">24 hours</strong> to schedule your personalised demo. Check your inbox for a confirmation.
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="mt-4 px-8 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/10"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        ) : (
                            /* ── Form State ── */
                            <>
                                <h2 className="text-3xl font-bold mb-2 relative z-10">Book a Time</h2>
                                <p className="text-white/50 mb-8 relative z-10 text-sm">Fill in your details, and we&apos;ll instantly schedule your session.</p>

                                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Full Name</label>
                                        <div className="relative flex items-center">
                                            <User className="absolute left-4 w-5 h-5 text-white/30" />
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                required
                                                placeholder="E.g. Sarah Jenkins"
                                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Business Name</label>
                                        <div className="relative flex items-center">
                                            <Building2 className="absolute left-4 w-5 h-5 text-white/30" />
                                            <input
                                                type="text"
                                                name="business_name"
                                                value={formData.business_name}
                                                onChange={handleChange}
                                                required
                                                placeholder="E.g. The Daily Grind"
                                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Work Email</label>
                                            <div className="relative flex items-center">
                                                <Mail className="absolute left-4 w-5 h-5 text-white/30" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="you@company.com"
                                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Phone Number</label>
                                            <div className="relative flex items-center">
                                                <Phone className="absolute left-4 w-5 h-5 text-white/30" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="+91 98765 43210"
                                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-1">Business Type</label>
                                        <select
                                            name="business_type"
                                            value={formData.business_type}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all font-medium appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select your industry</option>
                                            <optgroup label="Food & Beverage">
                                                <option value="cafe">Coffee Shops & Cafes</option>
                                                <option value="qsr">Quick Service (QSR)</option>
                                                <option value="full-service">Full Service Dining</option>
                                                <option value="bars">Bars & Breweries</option>
                                                <option value="food-trucks">Food Trucks & Pop-ups</option>
                                                <option value="bakeries">Bakeries & Patisseries</option>
                                            </optgroup>
                                            <optgroup label="Retail & Boutiques">
                                                <option value="fashion">Apparel & Fashion</option>
                                                <option value="beauty">Health & Beauty</option>
                                                <option value="grocery">Grocery & Convenience</option>
                                                <option value="home">Home & Lifestyle</option>
                                                <option value="vape">Vape & Smoke Shops</option>
                                            </optgroup>
                                            <optgroup label="Enterprise">
                                                <option value="franchise">Franchise Management</option>
                                                <option value="multi-brand">Multi-Brand Portfolios</option>
                                                <option value="stadiums">Stadiums & Large Venues</option>
                                                <option value="airports">Airports & Travel Retail</option>
                                            </optgroup>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {submitStatus === 'error' && (
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm font-medium">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-6 py-4 rounded-xl bg-[#C3EB7A] text-black font-black text-lg hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.4)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Schedule My Demo
                                                <span className="text-xl leading-none translate-y-[-1px]">→</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-white/40 text-xs mt-4">
                                        By booking, you agree to our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
