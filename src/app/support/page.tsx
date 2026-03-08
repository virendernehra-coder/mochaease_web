'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, ChevronDown, CheckCircle2, Search, Zap, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import NetworkBackground from '@/components/NetworkBackground';
import Chatbot from '@/components/Chatbot';

// FAQ Data
const FAQS = [
    {
        question: "How do I connect my existing hardware?",
        answer: "MochaEase is hardware agnostic. You can download our app on any iOS or Android tablet, and connect your existing receipt printers and cash drawers via Bluetooth or network."
    },
    {
        question: "Do you offer on-site training for staff?",
        answer: "Yes! Our Enterprise plans include dedicated on-site onboarding. For Lite and Core plans, we provide comprehensive video tutorials and 24/7 live chat support to get your team up to speed in under an hour."
    },
    {
        question: "How does the AI Demand Forecasting work?",
        answer: "Our AI analyzes your historical sales data, local weather patterns, and upcoming holidays to predict footfall and optimal stock levels, reducing wastage and preventing stockouts."
    },
    {
        question: "Can I manage multiple outlets from one account?",
        answer: "Absolutely. The MochaCore and MochaMax plans are designed for multi-location businesses, giving you a centralized dashboard to track all your stores in real-time."
    },
    {
        question: "What happens if my internet goes down?",
        answer: "MochaEase SmartPOS has full offline capabilities. You can continue taking orders and printing receipts. Once the connection is restored, all data automatically syncs to the cloud."
    }
];

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const filteredFaqs = FAQS.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/15 via-[#C3EB7A]/5 to-transparent pointer-events-none" />

            {/* Hero Section */}
            <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-24 flex flex-col items-center text-center z-10">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
                    <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A90E2]/20 to-purple-500/20 border border-white/10 mb-8 backdrop-blur-sm shadow-[0_0_30px_rgba(74,144,226,0.2)]">
                        <HelpCircle className="w-4 h-4 text-[#4A90E2]" />
                        <span className="text-xs font-bold text-white tracking-wide uppercase">MochaEase Support</span>
                    </motion.div>

                    <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1]">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_30px_rgba(195,235,122,0.2)]">help you?</span>
                    </motion.h1>

                    <motion.p variants={fadeUpVariant} className="max-w-2xl text-lg text-white/70 font-medium mb-10 leading-relaxed">
                        Search our knowledge base, get in touch with our experts, or ask Moza, our AI assistant, for instant answers.
                    </motion.p>

                    <motion.div variants={fadeUpVariant} className="w-full max-w-2xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90E2] to-[#C3EB7A] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-[#1A1A1A] border border-white/10 rounded-full p-2 shadow-inner">
                            <Search className="w-6 h-6 text-white/40 ml-4 hidden sm:block" />
                            <input
                                type="text"
                                placeholder="Search for answers (e.g., 'hardware setup')"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-white/30 text-lg outline-none"
                            />
                            <button className="px-6 py-3 rounded-full bg-[#C3EB7A] text-black font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(195,235,122,0.3)]">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Contact Channels */}
            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10 relative">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Support Ticket */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden group hover:border-[#4A90E2]/50 hover:shadow-[0_0_40px_rgba(74,144,226,0.15)] flex flex-col items-center text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A90E2]/10 blur-[40px] rounded-full group-hover:bg-[#4A90E2]/20 transition-colors" />
                        <div className="w-16 h-16 rounded-2xl bg-[#4A90E2]/20 border border-[#4A90E2]/30 flex items-center justify-center mb-6 text-[#4A90E2] shadow-[0_0_20px_rgba(74,144,226,0.2)]">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                        <p className="text-white/60 mb-6 text-sm">Send us an email anytime. We typically respond within 2-4 hours.</p>
                        <Link href="mailto:support@mochaease.com" className="mt-auto px-6 py-2 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">support@mochaease.com</Link>
                    </motion.div>

                    {/* Quick Chat / AI */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-gradient-to-b from-[#C3EB7A]/10 to-[#1A1A1A] border border-[#C3EB7A]/30 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_40px_rgba(195,235,122,0.1)] transform md:-translate-y-4">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#C3EB7A]/5 -z-10" />
                        <div className="absolute top-0 right-10 w-24 h-24 bg-[#C3EB7A]/20 blur-[40px] rounded-full" />

                        <div className="w-16 h-16 rounded-2xl bg-[#C3EB7A] flex items-center justify-center mb-6 text-black shadow-[0_0_30px_rgba(195,235,122,0.5)]">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Live Chat & AI</h3>
                        <p className="text-white/60 mb-6 text-sm">Get instant answers from Moza, or connect with a human agent 24/7.</p>
                        <button className="mt-auto w-full py-3 rounded-full bg-[#C3EB7A] text-black font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(195,235,122,0.4)]">Chat Now</button>
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={fadeUpVariant} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <Phone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                        <p className="text-white/60 mb-6 text-sm">Available Mon-Fri, 9am - 6pm EST for emergency assistance.</p>
                        <Link href="tel:+18005550199" className="mt-auto px-6 py-2 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">+1 (800) 555-0199</Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32 z-10 relative">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Frequently Asked <span className="text-[#C3EB7A]">Questions</span></h2>
                    <p className="text-lg text-white/50">Can't find what you're looking for? Reach out to our team.</p>
                </motion.div>

                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                                    <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform ${openFaq === index ? 'rotate-180 bg-[#C3EB7A]/20 text-[#C3EB7A]' : 'text-white/50'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5 mt-2">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-white/60 mb-4">No results found for "{searchQuery}"</p>
                            <button onClick={() => setSearchQuery("")} className="text-[#C3EB7A] font-bold hover:underline">Clear Search</button>
                        </div>
                    )}
                </div>
            </section>

            {/* Global Chatbot */}
            <Chatbot />
        </main>
    );
}
