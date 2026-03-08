"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactUsPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#C3EB7A]/30 relative overflow-hidden flex flex-col pt-32 pb-20">
            {/* Background Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C3EB7A]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Header Section */}
            <section className="w-full max-w-7xl mx-auto px-6 mb-20 relative z-10 flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C3EB7A]/10 border border-[#C3EB7A]/20 text-[#C3EB7A] text-sm font-bold mb-6">
                    <MessageSquare className="w-4 h-4" />
                    <span>Get in Touch</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    Let's start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2]">conversation.</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
                    Whether you need a custom enterprise quote, technical support, or just want to learn more about MochaEase—our team is ready to assist.
                </motion.p>
            </section>

            {/* Main Content: Info & Form */}
            <section className="w-full max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left: Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:w-1/3 space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-white mb-8">How can we help?</h2>

                            <div className="space-y-6">
                                {/* Sales & General */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-[#C3EB7A]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-[#C3EB7A]" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Sales & General Inquiries</h3>
                                    <p className="text-white/50 text-sm mb-4">Looking for pricing, custom plans, or general info.</p>
                                    <a href="mailto:hello@mochaease.com" className="text-[#C3EB7A] font-medium hover:underline flex items-center gap-2">
                                        hello@mochaease.com <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Support */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-[#4A90E2]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-6 h-6 text-[#4A90E2]" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Human Support When You Need It</h3>
                                    <p className="text-white/50 text-sm mb-4">If you need deeper help or face a unique issue, our support team is just a message away.</p>
                                    <a href="mailto:support@mochaease.com" className="text-[#4A90E2] font-medium hover:underline flex items-center gap-2">
                                        Email: support@mochaease.com <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Prefer Talking to a Person */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Prefer Talking to a Person?</h3>
                                    <p className="text-white/50 text-sm mb-4">Start with our AI Agent for quick answers, or connect with a real support expert — we're here either way.</p>
                                    <div className="space-y-3">
                                        <a href="https://wa.me/6281316078832" target="_blank" rel="noopener noreferrer" className="text-pink-400 font-medium hover:underline flex items-center gap-2 text-sm">
                                            Indonesia WhatsApp: +62-813-1607-8832
                                        </a>
                                        <a href="tel:+9198960797324" className="text-pink-400 font-medium hover:underline flex items-center gap-2 text-sm">
                                            India Phone: +91-989-6079-7324
                                        </a>
                                    </div>
                                </div>

                                {/* Address Placeholder */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-white/50" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Global HQ</h3>
                                            <p className="text-white/50 text-sm leading-relaxed">
                                                Built for businesses worldwide.<br />
                                                Fully remote & distributed team.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:w-2/3">
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Decorative elements behind form */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3EB7A]/5 blur-[60px] rounded-full pointer-events-none" />

                            {formStatus === 'success' ? (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-[#C3EB7A]/20 flex items-center justify-center mb-2">
                                        <CheckCircle2 className="w-10 h-10 text-[#C3EB7A]" />
                                    </motion.div>
                                    <h3 className="text-3xl font-black text-white">Message Received!</h3>
                                    <p className="text-white/50 max-w-md">
                                        Thank you for reaching out to MochaEase. One of our team members will get back to you within 24 business hours.
                                    </p>
                                    <button
                                        onClick={() => setFormStatus('idle')}
                                        className="mt-4 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium text-white/70">First Name</label>
                                            <input type="text" id="firstName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all" placeholder="Jane" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium text-white/70">Last Name</label>
                                            <input type="text" id="lastName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-white/70">Work Email</label>
                                            <input type="email" id="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all" placeholder="jane@company.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-medium text-white/70">Company Name</label>
                                            <input type="text" id="company" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all" placeholder="Your Business" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="topic" className="text-sm font-medium text-white/70">What are you interested in?</label>
                                        <div className="relative">
                                            <select id="topic" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all cursor-pointer">
                                                <option value="demo" className="bg-[#1A1A1A] text-white">Book a Demo</option>
                                                <option value="pricing" className="bg-[#1A1A1A] text-white">Pricing & Quotes</option>
                                                <option value="support" className="bg-[#1A1A1A] text-white">Technical Support</option>
                                                <option value="partnership" className="bg-[#1A1A1A] text-white">Partnerships</option>
                                                <option value="other" className="bg-[#1A1A1A] text-white">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-white/70">Message</label>
                                        <textarea id="message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C3EB7A]/50 focus:ring-1 focus:ring-[#C3EB7A]/50 transition-all resize-y" placeholder="Tell us about your requirements..."></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="w-full py-4 bg-[#C3EB7A] text-black font-black text-lg rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(195,235,122,0.2)]"
                                    >
                                        {formStatus === 'submitting' ? (
                                            <span className="flex items-center gap-2">Sending...</span>
                                        ) : (
                                            <>
                                                Send Message <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
