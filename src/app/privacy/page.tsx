'use client';

import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import { FileText } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A90E2]/10 via-[#C3EB7A]/5 to-transparent pointer-events-none" />

            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-40 pb-20 z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <FileText className="w-4 h-4 text-[#4A90E2]" />
                    <span className="text-xs font-bold text-white/80 tracking-wide uppercase">MochaEase Policies</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white text-center"
                >
                    Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3EB7A] to-[#4A90E2] drop-shadow-[0_0_20px_rgba(195,235,122,0.1)]">Policy</span>
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A90E2]/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C3EB7A]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Welcome to MochaEase ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data and the business data you process through our platform. This Privacy Policy will inform you as to how we look after your personal data when you visit our website (mochaease.com) or use our SmartPOS, AI Analytics, CRM, and related services (collectively, the "Services").
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
                            <p className="text-white/70 leading-relaxed mb-4">We may collect, use, store and transfer different kinds of data about you or your business, grouped as follows:</p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-[#C3EB7A]">
                                <li><strong className="text-white/90">Identity Data:</strong> First name, last name, username or similar identifier.</li>
                                <li><strong className="text-white/90">Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
                                <li><strong className="text-white/90">Business Data:</strong> Information regarding your café, restaurant, or retail store, including inventory metadata and staff scheduling info required for MochaEase services.</li>
                                <li><strong className="text-white/90">Transaction Data:</strong> Details about payments to and from you, processed securely via our payment partners (note: we do not store raw credit card numbers).</li>
                                <li><strong className="text-white/90">Technical Data:</strong> IP address, login data, browser type and version, time zone setting, operating system, and platform.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                            <p className="text-white/70 leading-relaxed mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your data in the following circumstances:</p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-[#4A90E2]">
                                <li>To register you as a new customer and set up your SmartPOS and backoffice.</li>
                                <li>To process and deliver your subscription to the MochaEase platform.</li>
                                <li>To power the AI Demand Forecasting and Analytics features (using aggregated, anonymized business data).</li>
                                <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
                                <li>To improve our website, products/services, marketing, customer relationships, and experiences.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                            </p>
                            <p className="text-white/70 leading-relaxed mb-4">
                                All our cloud infrastructure is encrypted at rest and in transit, utilizing industry-standard TLS protocols.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Your Legal Rights</h2>
                            <p className="text-white/70 leading-relaxed mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-[#C3EB7A]">
                                <li>Request access to your personal data.</li>
                                <li>Request correction of your personal data.</li>
                                <li>Request erasure of your personal data.</li>
                                <li>Object to processing of your personal data.</li>
                                <li>Request restriction of processing your personal data.</li>
                                <li>Request transfer of your personal data.</li>
                                <li>Right to withdraw consent.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Privacy Officer in the following ways:
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 inline-block">
                                <p className="text-white/90 font-medium">Email: <a href="mailto:privacy@mochaease.com" className="text-[#4A90E2] hover:text-[#C3EB7A] transition-colors">privacy@mochaease.com</a></p>
                                <p className="text-white/90 font-medium mt-2">Postal Address: MochaEase Tech, Block A, Cyber Hub, Gurugram, India</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
