'use client';

import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import { ShieldAlert } from 'lucide-react';

export default function TermsOfService() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-[#4A90E2]/5 to-transparent pointer-events-none" />

            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-40 pb-20 z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white/80 tracking-wide uppercase">Legal Agreement</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white text-center"
                >
                    Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-purple-500 drop-shadow-[0_0_20px_rgba(74,144,226,0.1)]">Service</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-white/50 text-center mb-16"
                >
                    Last Updated: October 24, 2024
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4A90E2]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                By accessing or using the MochaEase platform, including our website (mochaease.com), SmartPOS iOS/Android applications, and the web-based backoffice (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you do not have permission to access the Service.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                MochaEase provides a comprehensive point-of-sale (POS), inventory management, staff scheduling, and AI analytics platform designed for cafés, QSRs, and retail businesses.
                            </p>
                            <p className="text-white/70 leading-relaxed mb-4">
                                We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Subscriptions and Accounts</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (such as monthly or annually), depending on the type of subscription plan you select when purchasing a Subscription.
                            </p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-[#4A90E2]">
                                <li><strong>Account Security:</strong> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</li>
                                <li><strong>Accuracy of Information:</strong> You must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</li>
                                <li><strong>Hardware Compatibility:</strong> While MochaEase is hardware agnostic, you are responsible for ensuring your devices meet the minimum specifications outlined in our Support Center.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                You agree not to use the Service:
                            </p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-purple-400">
                                <li>In any way that violates any applicable national or international law or regulation.</li>
                                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                                <li>To impersonate or attempt to impersonate MochaEase, a MochaEase employee, another user, or any other person or entity.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of MochaEase and its licensors. The Service is protected by copyright, trademark, and other laws of both the Republic of India and foreign countries.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                In no event shall MochaEase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Changes to Terms</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 inline-block">
                                <p className="text-white/90 font-medium">For Legal Inquiries: <a href="mailto:legal@mochaease.com" className="text-purple-400 hover:text-[#4A90E2] transition-colors">legal@mochaease.com</a></p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
