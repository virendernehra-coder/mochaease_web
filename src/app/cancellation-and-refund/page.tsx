'use client';

import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import { RefreshCcw } from 'lucide-react';

export default function CancellationAndRefundPolicy() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-[#C3EB7A]/5 to-transparent pointer-events-none" />

            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-40 pb-20 z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <RefreshCcw className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white/80 tracking-wide uppercase">MochaEase Policies</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white text-center"
                >
                    Cancellation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#C3EB7A] drop-shadow-[0_0_20px_rgba(195,235,122,0.1)]">Refund Policy</span>
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C3EB7A]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Subscription Cancellations</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                You may cancel your MochaEase subscription at any time through your account dashboard or by contacting our support team.
                            </p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-amber-400">
                                <li><strong>Monthly Subscriptions:</strong> Cancellations will take effect at the end of the current billing cycle. You will not be charged for the subsequent month.</li>
                                <li><strong>Annual Subscriptions:</strong> If you cancel an annual subscription mid-term, access to the platform will continue until the end of your paid year.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Software Subscriptions Refund Policy</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                As a general rule, MochaEase subscriptions are non-refundable. We offer a 14-day free trial on our Lite and Core plans for you to evaluate the platform prior to making a commitment.
                            </p>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Exceptions to this policy may be granted at the sole discretion of our billing department under extraordinary circumstances, such as accidental duplicate charges or major technical failures preventing access to the service for an extended period during your first 30 days.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Hardware Purchases</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                If you have purchased supported hardware (printers, card readers, cash drawers) directly through MochaEase alongside your subscription, the following applies:
                            </p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-[#C3EB7A]">
                                <li><strong>Returns:</strong> Unopened and unused hardware can be returned within 14 days of delivery for a full refund (minus shipping and handling costs).</li>
                                <li><strong>Defective Hardware:</strong> Defective items will be replaced or refunded within 30 days of receipt, subject to inspection.</li>
                                <li><strong>Restocking Fee:</strong> Opened but fully functional hardware returns may be subject to a 15% restocking fee.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Process for Adjustments</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                To initiate a cancellation, return, or request a refund evaluation, please reach out to our billing team.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 inline-block">
                                <p className="text-white/90 font-medium">Email: <a href="mailto:billing@mochaease.com" className="text-[#C3EB7A] hover:text-amber-400 transition-colors">billing@mochaease.com</a></p>
                                <p className="text-white/90 font-medium mt-2">Make sure to include your Account ID and reason for the request.</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
