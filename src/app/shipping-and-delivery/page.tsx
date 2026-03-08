'use client';

import { motion } from 'framer-motion';
import NetworkBackground from '@/components/NetworkBackground';
import { Truck } from 'lucide-react';

export default function ShippingAndDeliveryPolicy() {
    return (
        <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative bg-[#050505] selection:bg-[#C3EB7A]/30">
            <NetworkBackground />
            <div className="absolute top-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-[#4A90E2]/5 to-transparent pointer-events-none" />

            <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-40 pb-20 z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <Truck className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white/80 tracking-wide uppercase">MochaEase Policies</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-white text-center"
                >
                    Shipping & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-teal-400 drop-shadow-[0_0_20px_rgba(74,144,226,0.1)]">Delivery</span>
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
                    <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4A90E2]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Digital Delivery (Software Subscriptions)</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                MochaEase is primarily a cloud-based Software-as-a-Service (SaaS) platform. Upon successful registration and payment processing, your account will be activated immediately. You will receive an email confirmation containing your setup instructions and access credentials.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Physical Goods (Hardware)</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                If you order POS hardware bundles, card readers, or custom hardware from the MochaEase marketplace, the following shipping terms apply:
                            </p>
                            <ul className="list-disc pl-6 text-white/70 space-y-2 marker:text-teal-400">
                                <li><strong>Processing Time:</strong> Orders are typically processed and handed over to our shipping partners within 1-2 business days.</li>
                                <li><strong>Domestic Shipping:</strong> We offer Standard (3-5 business days) and Expedited (1-2 business days) shipping options for domestic addresses.</li>
                                <li><strong>International Shipping:</strong> Delivery times vary between 7 to 21 business days depending on customs and the destination country. Important: You are responsible for any applicable import duties or taxes.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Order Tracking</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Once your physical hardware order has shipped, you will receive an email confirmation containing a tracking number and a link to trace the journey of your package.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Damaged or Lost Packages</h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                If your hardware arrives damaged, or if it has been marked as "delivered" but you have not received it, please contact us within 48 hours of the delivery date so we can initiate an investigation with the carrier and send a replacement if necessary.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 inline-block">
                                <p className="text-white/90 font-medium">Contact Shipping Support: <a href="mailto:logistics@mochaease.com" className="text-[#4A90E2] hover:text-teal-400 transition-colors">logistics@mochaease.com</a></p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
